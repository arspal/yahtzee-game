import React from "react";
import Die from "./Die";
import { classNames } from "../utils";

export default function YahtzeeBoard({
  dice,
  score,
  round,
  maxRounds,
  fixedDice,
  rollingDice,
  rollsLeft,
  rollDice,
  toggleSave,
  // rollDuration,
  isRolling,
  isPlaying,
  isGameEnded
}) {
  return (
    <div
      className={classNames({
        "Yahtzee-Board": true,
        "Yahtzee-Board--live": isPlaying,
        "Yahtzee-Board--end": isGameEnded
      })}
    >
      <p className="Yahtzee-BoardInfo">
        Round: {round}/{maxRounds} Score: {score}
      </p>
      {isGameEnded && (
        <div className="Yahtzee-EndScreen">
          <p className="Yahtzee-EndScreenText Yahtzee-BoardSymbols">
            <span className="Yahtzee-BoardSymbol">S</span>
            <span className="Yahtzee-BoardSymbol">C</span>
            <span className="Yahtzee-BoardSymbol">O</span>
            <span className="Yahtzee-BoardSymbol">R</span>
            <span className="Yahtzee-BoardSymbol">E</span>
          </p>
          <p className="Yahtzee-EndScreenScore Yahtzee-BoardSymbols">
            {String(score)
              .padStart(3, "0")
              .split("")
              .map((num, index) => (
                <span
                  key={index}
                  className="Yahtzee-BoardSymbol Yahtzee-BoardSymbol--filled"
                >
                  {num}
                </span>
              ))}
          </p>
        </div>
      )}
      <div className="Yahtzee-Dice">
        {dice.map((die, index) => (
          <Die
            key={index}
            value={die}
            disabled={rollsLeft === 0}
            isFixed={fixedDice[index]}
            isRolling={rollingDice[index]}
            toggleSave={() => toggleSave(index)}
            // rollDuration={rollDuration}
          />
        ))}
      </div>
      <button
        className="Yahtzee-RollBtn"
        disabled={isRolling || rollsLeft <= 0}
        onClick={rollDice}
      >
        Roll
      </button>
      <span className="Yahtzee-RollsLeft">
        {rollsLeft ? `${rollsLeft} left` : "Choose a strategy"}
      </span>
    </div>
  );
}
