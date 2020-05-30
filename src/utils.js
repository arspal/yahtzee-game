export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sum(arr) {
  return arr.reduce((total, n) => total + n, 0);
}

export function sumOfN(arr, number) {
  return arr.reduce((total, n) => {
    if (n === number) {
      return total + number;
    }
    return total;
  }, 0);
}

export function sameN(arr, amount) {
  const same = [];

  arr.forEach(num => {
    if (same[num]) {
      same[num] += 1;
    } else {
      same[num] = 1;
    }
  });

  const sameNumber = same.findIndex(a => a >= amount);

  if (sameNumber !== -1) return sameNumber;

  return false;
}

export function includes(arr, searchVals) {
  for (let val of searchVals) {
    if (!arr.includes(val)) return false;
  }

  return true;
}

export function classNames(classes) {
  const result = [];

  for (let [className, condition] of Object.entries(classes)) {
    if (condition) result.push(className);
  }

  return result.join(" ");
}
