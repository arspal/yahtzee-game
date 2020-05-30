import React, { Component } from "react";
import { randomBetween, sum, sumOfN, sameN, includes } from "../utils";

import "./YahtzeeGame.css";
import YahtzeeBoard from "./YahtzeeBoard";
import YahtzeeScorecard from "./YahtzeeScorecard";

const NUMBER_OF_DICE = 5;
const ROLL_DURATION = 1000;

export default class YahtzeeGame extends Component {
  state = {
    isGameStarted: false,
    isGameEnded: false,
    dice: Array(NUMBER_OF_DICE),
    fixedDice: Array(NUMBER_OF_DICE).fill(false),
    rollingDice: Array(NUMBER_OF_DICE).fill(false),
    rollsLeft: 3,
    round: 1,
    totalScore: 0,
    stratScores: {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeKind: null,
      fourKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null
    }
  };

  componentDidMount() {
    this.rollDice();
    setTimeout(() => {
      this.setState({ isGameStarted: true });
    }, ROLL_DURATION);
  }

  componentDidUpdate() {
    if (Object.values(this.state.stratScores).every(score => score !== null)) {
      setTimeout(() => {
        this.setState({ isGameEnded: true });
      }, 0);
    }
  }

  rollDice = async () => {
    const { dice, fixedDice } = this.state;

    const unrolledDice = [];

    for (let i = 0, l = dice.length; i < l; i += 1) {
      if (fixedDice[i]) continue;
      unrolledDice.push(
        new Promise(resolve => {
          this.setState(prevState => {
            const rollingDice = [...prevState.rollingDice];
            rollingDice[i] = true;

            return { rollingDice };
          });

          setTimeout(() => {
            this.setState(prevState => {
              const dice = [...prevState.dice];
              dice[i] = randomBetween(1, 6);

              return { dice };
            });
          }, ROLL_DURATION * 0.3);

          setTimeout(() => {
            this.setState(prevState => {
              const rollingDice = [...prevState.rollingDice];
              rollingDice[i] = false;

              return { rollingDice };
            });

            resolve();
          }, ROLL_DURATION);
        })
      );
    }

    await Promise.all(unrolledDice);

    this.setState(prevState => {
      const rollsLeft = prevState.rollsLeft - 1;

      if (rollsLeft === 0) {
        return { rollsLeft, fixedDice: prevState.fixedDice.map(() => false) };
      }

      return { rollsLeft };
    });
  };

  toggleSave = dieIndex => {
    this.setState(prevState => {
      const fixedDice = prevState.fixedDice.slice();
      fixedDice[dieIndex] = !fixedDice[dieIndex];

      return { fixedDice };
    });
  };

  selectStrat = stratId => {
    const dice = this.state.dice;
    let stratScore = 0;

    switch (stratId) {
      case "ones":
        stratScore = sumOfN(dice, 1);
        break;
      case "twos":
        stratScore = sumOfN(dice, 2);
        break;
      case "threes":
        stratScore = sumOfN(dice, 3);
        break;
      case "fours":
        stratScore = sumOfN(dice, 4);
        break;
      case "fives":
        stratScore = sumOfN(dice, 5);
        break;
      case "sixes":
        stratScore = sumOfN(dice, 6);
        break;
      case "threeKind":
        stratScore = sameN(dice, 3) ? sum(dice) : 0;
        break;
      case "fourKind":
        stratScore = sameN(dice, 4) ? sum(dice) : 0;
        break;
      case "fullHouse":
        const same3 = sameN(dice, 3);

        if (same3) {
          const same2 = sameN(
            dice.filter(num => num !== same3),
            2
          );

          if (same2) stratScore = 25;
        }
        break;
      case "smallStraight":
        if (
          includes(dice, [1, 2, 3, 4]) ||
          includes(dice, [2, 3, 4, 5]) ||
          includes(dice, [3, 4, 5, 6])
        ) {
          stratScore = 30;
        }
        break;
      case "largeStraight":
        if (
          includes(dice, [1, 2, 3, 4, 5]) ||
          includes(dice, [2, 3, 4, 5, 6])
        ) {
          stratScore = 40;
        }
        break;
      case "yahtzee":
        if (sameN(dice, 5)) stratScore = 50;
        break;

      case "chance":
        stratScore = sum(dice);
        break;
      default:
        throw Error(`Unkown strategy selected: ${stratId}`);
    }

    this.setState(
      prevState => {
        const stratScores = { ...prevState.stratScores };
        stratScores[stratId] = stratScore;
        const totalScore = prevState.totalScore + stratScore;
        const round = prevState.round === 13 ? 13 : prevState.round + 1;

        return { rollsLeft: 3, stratScores, totalScore, round };
      },
      () => {
        if (this.state.isGameEnded) {
          this.setState({ fixedDice: this.state.fixedDice.map(() => false) });
          return;
        }

        if (this.state.fixedDice.some(v => v)) {
          this.setState({ fixedDice: this.state.fixedDice.map(() => false) });
          setTimeout(() => {
            this.rollDice();
          }, 400);
        } else {
          this.rollDice();
        }
      }
    );
  };

  render() {
    const {
      dice,
      fixedDice,
      rollingDice,
      stratScores,
      round,
      rollsLeft,
      totalScore,
      isGameStarted,
      isGameEnded
    } = this.state;

    const isPlaying = isGameStarted && !isGameEnded;
    const isRolling = rollingDice.some(v => v);

    return (
      <div className="Yahtzee">
        <YahtzeeBoard
          isPlaying={isPlaying}
          isGameEnded={isGameEnded}
          dice={dice}
          fixedDice={fixedDice}
          rollingDice={rollingDice}
          isRolling={isRolling}
          score={totalScore}
          round={round}
          maxRounds={13}
          rollsLeft={rollsLeft}
          rollDice={this.rollDice}
          toggleSave={this.toggleSave}
        />
        <YahtzeeScorecard
          isPlaying={isPlaying}
          isGame={isGameStarted}
          scores={stratScores}
          isRolling={isRolling}
          selectStrat={this.selectStrat}
        />
      </div>
    );
  }
}
