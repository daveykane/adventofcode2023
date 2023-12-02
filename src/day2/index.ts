const getAmount = (cube: string) => /(?<amount>\d+) (?<colour>red|green|blue)+/g.exec(cube)?.groups || {};
const parseGame = (game: string) => {
  const [id, subsets] = game.split(": ");
  return { id, cubes: subsets.match(/(\d+) (red|green|blue)/g) || [] };
};

export const part1 = (games: string[]) => {
  const bag: Record<string, number> = { red: 12, green: 13, blue: 14 };
  return games.reduce((sum, game) => {
    const { id, cubes } = parseGame(game);
    const isPossible = cubes.every((cube) => {
      const { amount, colour } = getAmount(cube);
      return bag[colour] >= parseInt(amount);
    });

    return isPossible ? sum + parseInt(id.replace("Game ", "")) : sum;
  }, 0);
};

export const part2 = (games: string[]) => {
  return games.reduce((sum, game) => {
    const { cubes } = parseGame(game);
    const amounts: Record<string, number[]> = { red: [], green: [], blue: [] };
    cubes.forEach((cube) => {
      const { amount, colour } = getAmount(cube);
      amounts[colour].push(parseInt(amount));
    });

    return sum + Object.values(amounts).reduce((pow, amount) => (pow *= Math.max(...amount)), 1);
  }, 0);
};
