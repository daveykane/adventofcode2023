const getWaysToWin = (details: string[]) => {
  const [times, distances] = details.map((detail) => detail.match(/\d+/g)?.map(Number) || []);
  return times.reduce((multiplier, time, index) => {
    const distance = distances[index];
    let counter = 0;

    for (let i = 0; i <= time; i++) {
      counter = i * (time - i) > distance ? counter + 1 : counter;
    }

    return multiplier * counter;
  }, 1);
};

export const part1 = (details: string[]) => getWaysToWin(details);
export const part2 = (details: string[]) => getWaysToWin(details.map((detail) => detail.replace(/\s+/g, "")));
