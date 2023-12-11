export const expandUniverse = (image: string, expansion = 1) => {
  const universe = image.split("\n").map((row) => row.split(""));
  const GALAXY_EXPANSION = expansion > 1 ? expansion - 1 : expansion;
  const height = universe.length;
  const width = universe[0].length;
  const emptyRows: number[] = [];
  const emptyColumns: number[] = [];
  // Find rows with no galaxies
  for (let y = 0; y < height; y++) {
    if (universe[y].every((cell) => cell === ".")) emptyRows.push(y);
  }
  // Find columns with no galaxies
  for (let x = 0; x < width; x++) {
    if (universe.every((row) => row[x] === ".")) emptyColumns.push(x);
  }
  // Find galaxy coordinates and expand them
  let expandY = 0;
  const galaxies: number[][] = [];
  for (let y = 0; y < height; y++) {
    let expandX = 0;
    expandY += emptyRows.includes(y) ? GALAXY_EXPANSION : 0;

    for (let x = 0; x < width; x++) {
      expandX += emptyColumns.includes(x) ? GALAXY_EXPANSION : 0;

      if (universe[y][x] === "#") galaxies.push([x + expandX, y + expandY]);
    }
  }
  // Calculate Manhattan distance between expanded galaxies
  return galaxies.reduce((sum, [x1, y1], i) => {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum += Math.abs(x1 - galaxies[j][0]) + Math.abs(y1 - galaxies[j][1]);
    }
    return sum;
  }, 0);
};

export const part1 = (image: string) => expandUniverse(image);
export const part2 = (image: string, expansion = 1) => expandUniverse(image, expansion);
