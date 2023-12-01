const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const calibrationSum = (calibrations: string[], regex: RegExp) =>
  calibrations.reduce((acc, curr) => {
    let match;
    const numbers = [];

    while ((match = regex.exec(curr))) {
      numbers.push(match[0]);
      regex.lastIndex = match.index + 1;
    }

    const first = (words as Record<string, number>)[numbers[0]] || numbers[0];
    const last = (words as Record<string, number>)[numbers[numbers.length - 1]] || numbers[numbers.length - 1];
    return acc + parseInt(`${first}${last}`);
  }, 0);

export const part1 = (calibrations: string[]) => calibrationSum(calibrations, /\d/g);
export const part2 = (calibrations: string[]) =>
  calibrationSum(calibrations, new RegExp(["\\d", ...Object.keys(words)].join("|"), "g"));
