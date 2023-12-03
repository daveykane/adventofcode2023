const isInGrid = ([x, y]: number[], width: number, height: number) => x >= 0 && y >= 0 && x < width && y < height;
const getAdjacents = ([x, y]: number[], engine: string[]) => {
  const adjacents: number[][] = [];

  for (let xx = -1; xx <= 1; xx++) {
    for (let yy = -1; yy <= 1; yy++) {
      if (xx == 0 && yy == 0) continue;

      if (isInGrid([x + xx, y + yy], engine[y].length, engine.length)) {
        adjacents.push([x + xx, y + yy]);
      }
    }
  }

  return adjacents;
};

const parseSymbols = (coordinate: number[], engine: string[]) => {
  const gears: Set<string> = new Set();
  const adjacents = getAdjacents(coordinate, engine);
  const nextToSymbol = !adjacents.every(([x, y]) => {
    if (engine[y][x] === "*") {
      gears.add(`${x},${y}`);
    }

    return engine[y][x].match(/[\.|\d]/);
  });

  return { gears, nextToSymbol };
};

const parseDigit = ([x, y]: number[], engine: string[]) => {
  let newX = x + 1;
  let number = engine[y][x];
  let output = parseSymbols([x, y], engine);

  while (newX < engine[y].length && engine[y][newX].match(/\d/)) {
    if (!output.nextToSymbol) {
      output = parseSymbols([newX, y], engine);
    }

    number += engine[y][newX];
    newX++;
  }

  return { ...output, newX: newX - 1, number: parseInt(number) };
};

const parseSchematic = (engine: string[]) => {
  let sum = 0;
  const gears: Map<string, number[]> = new Map();

  for (let y = 0; y < engine.length; y++) {
    for (let x = 0; x < engine.length; x++) {
      if (engine[y][x].match(/\d/)) {
        const { gears: gearKeys, nextToSymbol, newX, number } = parseDigit([x, y], engine);

        x = newX;
        sum = nextToSymbol ? sum + number : sum;
        gearKeys.forEach((key) => gears.set(key, [...(gears.get(key) || []), number]));
      }
    }
  }

  return { gears, sum };
};

export const part1 = (engine: string[]) => parseSchematic(engine).sum;
export const part2 = (engine: string[]) =>
  [...parseSchematic(engine).gears].reduce((sum, [, parts]) => {
    return parts.length >= 2 ? sum + parts.reduce((total, part) => total * part, 1) : sum;
  }, 0);
