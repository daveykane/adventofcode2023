const findStart = (str: string | string[]) => str.includes("S");
const isInGrid = ([x, y]: number[], width: number, height: number) => x >= 0 && y >= 0 && x < width && y < height;

const compass: Record<string, { start: string[]; end: string[]; xy: number[] }> = {
  N: { start: ["|", "J", "L", "S"], end: ["|", "F", "7", "S"], xy: [0, -1] },
  E: { start: ["-", "L", "F", "S"], end: ["-", "J", "7", "S"], xy: [1, 0] },
  S: { start: ["|", "F", "7", "S"], end: ["|", "J", "L", "S"], xy: [0, 1] },
  W: { start: ["-", "J", "7", "S"], end: ["-", "L", "F", "S"], xy: [-1, 0] },
};

const findLoop = (map: string[]) => {
  const loop: string[] = [];
  const grid = map.map((row) => row.split(""));
  const startY = grid.findIndex(findStart);
  const startX = grid[startY].findIndex(findStart);

  let [newX, newY] = track([startX, startY], map, loop);

  while (map[newY][newX] !== "S") {
    [newX, newY] = track([newX, newY], map, loop);
  }

  return { grid, loop, startX, startY };
};

const track = ([startX, startY]: number[], map: string[], loop: string[]): number[] => {
  const direction = Object.values(compass).find((direction) => {
    const [nextX, nextY] = [startX + direction.xy[0], startY + direction.xy[1]];
    // find one we've not been to, is inside the grid and the tile has a matching start and end
    return (
      (loop.length === 0 || loop[loop.length - 1] !== `${nextX},${nextY}`) &&
      isInGrid([nextX, nextY], map[startY].length, map.length) &&
      direction.start.includes(map[startY][startX]) &&
      direction.end.includes(map[nextY][nextX])
    );
  });

  if (!direction) return [startX, startY];
  const newX = startX + direction.xy[0];
  const newY = startY + direction.xy[1];
  loop.push(`${startX},${startY}`);

  return [newX, newY];
};

export const part1 = (map: string[]) => findLoop(map).loop.length / 2;
export const part2 = (map: string[]) => {
  const { grid, loop, startX, startY } = findLoop(map);
  // find the directions we start can go in
  const startDirections = Object.keys(compass)
    .filter((key) => {
      const [nextX, nextY] = [startX + compass[key].xy[0], startY + compass[key].xy[1]];
      return isInGrid([nextX, nextY], map[startY].length, map.length) && compass[key].end.includes(map[nextY][nextX]);
    })
    .join("");
  // replace the start and other ES, SW or NS parts with " " so we can count the intersections
  grid[startY][startX] = ["ES", "SW", "NS"].includes(startDirections) ? " " : grid[startY][startX];
  loop.forEach((position) => {
    const [x, y] = position.split(",").map(Number);
    grid[y][x] = ["|", "F", "7", " "].includes(grid[y][x]) ? " " : "X";
  });
  // return a count of the intersections, odd means we're inside the loop
  return grid.reduce((count, row) => {
    for (let x = 0; x < row.length; x += 1) {
      if (![" ", "X"].includes(row[x])) {
        count += Number(row.slice(x + 1).filter((tile) => tile === " ").length % 2 !== 0);
      }
    }

    return count;
  }, 0);
};
