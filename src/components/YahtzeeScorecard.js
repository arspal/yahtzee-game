import React from "react";

import YahtzeeScore from "./YahtzeeScore";
import { classNames } from "../utils";

const strategies = [
  { id: "ones", name: "Ones", detail: "1 point per 1" },
  { id: "twos", name: "Twos", detail: "2 point per 2" },
  { id: "threes", name: "Threes", detail: "3 point per 3" },
  { id: "fours", name: "Fours", detail: "4 point per 4" },
  { id: "fives", name: "Fives", detail: "5 point per 5" },
  { id: "sixes", name: "Sixes", detail: "6 point per 6" },
  {
    id: "threeKind",
    name: "Three of a kind",
    detail: "Summ all dice if 3 are the same"
  },
  {
    id: "fourKind",
    name: "Four of a kind",
    detail: "Summ all dice if 4 are the same"
  },
  {
    id: "fullHouse",
    name: "Full house",
    detail: "25 points for a full house"
  },
  {
    id: "smallStraight",
    name: "Small straight",
    detail: "30 points for a small straight"
  },
  {
    id: "largeStraight",
    name: "Large straight",
    detail: "40 points for a large straight"
  },
  { id: "yahtzee", name: "Yahtzee", detail: "50 points for yahtzee" },
  { id: "chance", name: "Chance", detail: "Sum of all dice" }
];

export default function YahtzeeScorecard({
  scores,
  isPlaying,
  isRolling,
  selectStrat
}) {
  return (
    <div
      className={classNames({
        "Yahtzee-Scorecard": true,
        "Yahtzee-Scorecard--open": isPlaying
      })}
    >
      <ul>
        {strategies.map(strat => (
          <YahtzeeScore
            key={strat.id}
            score={scores[strat.id]}
            isRolling={isRolling}
            name={strat.name}
            details={strat.detail}
            onClick={() => selectStrat(strat.id)}
          />
        ))}
      </ul>
    </div>
  );
}
