const parseAlmanac = (almanac: string) => {
  const [seedsData, ...mapsData] = almanac.split("\n\n");
  const seeds = seedsData.match(/(\d+)/g)?.map(Number) || [];
  const maps = mapsData.map((mapData) =>
    (mapData.match(/(\d+ \d+ \d+)/g) || [])
      .map((range) => {
        const [destination, source, length] = range.split(" ").map(Number);
        return [source, source + length - 1, destination - source];
      })
      .sort(([start1], [start2]) => start1 - start2)
  );

  return { seeds, maps };
};

const parseRange = (from: number, to: number, map: number[][]) => {
  let ranges = [];

  for (const [start, end, delta] of map) {
    if (from > end || to < start) {
      continue;
    }

    if (from < start) {
      ranges.push([from, start - 1], [start + delta, Math.min(end, to) + delta]);
    } else {
      ranges.push([from + delta, Math.min(end, to) + delta]);
    }

    if (end > to) {
      return ranges;
    }

    from = end;
  }

  if (!ranges.length) {
    ranges = [[from, to]];
  }

  return ranges;
};

const convertSeeds = (from: number, to: number, maps: number[][][]) => {
  let range = [[from, to]];

  for (const map of maps) {
    let ranges: number[][] = [];

    for (const [from, to] of range) {
      ranges = ranges.concat(parseRange(from, to, map));
    }

    range = ranges;
  }

  return range;
};

export const part1 = (almanac: string) => {
  const locations = [];
  const { seeds, maps } = parseAlmanac(almanac);

  for (let i = 0; i < seeds.length; i += 1) {
    const range = convertSeeds(seeds[i], seeds[i], maps);
    locations.push(Math.min(...range.map((pair) => pair[0])));
  }

  return Math.min(...locations);
};

export const part2 = (almanac: string) => {
  const locations = [];
  const { seeds, maps } = parseAlmanac(almanac);

  for (let i = 0; i < seeds.length; i += 2) {
    const [seed, length] = seeds.slice(i, i + 2);
    const range = convertSeeds(seed, seed + length, maps);
    locations.push(Math.min(...range.map((pair) => pair[0])));
  }

  return Math.min(...locations);
};
