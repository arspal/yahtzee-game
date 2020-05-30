import React from "react";
import { classNames } from "../utils";

export default function YahtzeeScore({
  score,
  name,
  details,
  isRolling,
  onClick
}) {
  const isScoreSet = score !== null;

  const detail = isScoreSet ? `${score} points` : details;

  return (
    <li
      className={classNames({
        "Yahtzee-Strat": true,
        "Yahtzee-Strat--used": isScoreSet
      })}
    >
      <button disabled={isRolling || isScoreSet} onClick={onClick}>
        <strong>{name}</strong>
        <em>{detail}</em>
      </button>
    </li>
  );
}
