const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const calibrationSum = (calibrations: string[], regex: string) =>
  calibrations.reduce((total, line) => {
    const matches = Array.from(line.matchAll(new RegExp(`(?=(${regex}))`, "g")));
    const numbers = matches.map((match) => match[1]);
    const first = (words as Record<string, number>)[numbers[0]] || numbers[0];
    const last = (words as Record<string, number>)[numbers[numbers.length - 1]] || numbers[numbers.length - 1];
    return total + parseInt(`${first}${last}`);
  }, 0);

export const part1 = (calibrations: string[]) => calibrationSum(calibrations, "\\d");
export const part2 = (calibrations: string[]) => calibrationSum(calibrations, ["\\d", ...Object.keys(words)].join("|"));
