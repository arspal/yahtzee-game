import React from "react";
import { classNames } from "../utils";

const strNum = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six"
};

export default function Die({
  value,
  isFixed,
  isRolling,
  disabled,
  toggleSave
}) {
  return (
    <button
      disabled={disabled || isRolling}
      className={classNames({
        "Yahtzee-Die": true,
        "Yahtzee-Die--fixed": isFixed,
        "Yahtzee-Die--rolling": isRolling
      })}
      onClick={toggleSave}
    >
      <i className={`fas  fa-dice-${strNum[value]}`}></i>
    </button>
  );
}
