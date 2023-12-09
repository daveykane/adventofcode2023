const getDifferences = (sequence: number[]) =>
  sequence.slice(0, -1).reduce(
    (acc: { allZeros: boolean; differences: number[] }, value: number, index: number) => {
      const diff = sequence[index + 1] - value;
      return { allZeros: acc.allZeros && diff === 0, differences: [...acc.differences, diff] };
    },
    { allZeros: true, differences: [] }
  );

const predict = (sequence: number[]): number => {
  const { allZeros, differences } = getDifferences(sequence);
  return sequence[sequence.length - 1] + (allZeros ? 0 : predict(differences));
};

const extrapolate = (report: string[], backwards = false) =>
  report.reduce((sum, line) => {
    const sequence = line.split(" ").map(Number);
    return sum + (backwards ? predict(sequence.reverse()) : predict(sequence));
  }, 0);

export const part1 = (report: string[]) => extrapolate(report);
export const part2 = (report: string[]) => extrapolate(report, true);
