const greatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : greatestCommonDivisor(b, a % b));
const leastCommonMultiple = (a: number, b: number): number => (a * b) / greatestCommonDivisor(a, b);
const parse = ([directions, locations]: string[]) => {
  const paths: string[] = [];
  const steps = directions.replace(/L/g, "0").replace(/R/g, "1");
  const network = locations.split("\n").reduce((nodes, location) => {
    const [node, leftNode, rightNode] = location.match(/([1-9A-Z]{3})/g) || [];
    if (node.endsWith("A")) paths.push(node);
    return nodes.set(node, [leftNode, rightNode]);
  }, new Map<string, [string, string]>());

  return { network, paths, steps };
};

const walkPath = (network: Map<string, [string, string]>, steps: string, counter: number, current: string) => {
  while (!current.endsWith(current === "AAA" ? "ZZZ" : "Z")) {
    current = network.get(current)?.[Number(steps[counter % steps.length])] || current;
    counter++;
  }

  return counter;
};

export const part1 = ([directions, locations]: string[]) => {
  const { network, steps } = parse([directions, locations]);
  return walkPath(network, steps, 0, "AAA");
};

export const part2 = async ([directions, locations]: string[]) => {
  const { network, paths, steps } = parse([directions, locations]);
  const counts = await Promise.all(paths.map((path) => Promise.resolve(walkPath(network, steps, 0, path))));
  return counts.reduce((lcm, count) => leastCommonMultiple(lcm as number, count as number), 1);
};
