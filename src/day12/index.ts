const sum = (a: number, b: number) => a + b;
const cache = new Map<string, number>();

const memoizedArrangements = (pattern: string, counts: number[]) => {
  // return cached value if found
  const cacheKey = `${pattern}_${counts.join(",")}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey) || 0;
  // no more chars return 1 if no counts left, 0 otherwise
  if (!pattern) return counts.length === 0 ? 1 : 0;
  // no more counts return 1 if no damaged springs left, 0 otherwise
  if (!counts.length) return pattern.indexOf("#") === -1 ? 1 : 0;
  // count total arrangements
  let total = 0;
  const [char] = pattern;
  const [count] = counts;
  // recurse if the current char is an operational or assumed operational spring
  if ([".", "?"].includes(char)) {
    total += memoizedArrangements(pattern.slice(1), counts);
  }
  // recurse if the current char is a damaged or assumed damaged spring and pattern is valid to count
  if (
    ["#", "?"].includes(char) && // looking for the start of contiguous groups of damaged springs
    count <= pattern.length && // there needs to be enough chars left in the pattern to count
    pattern.slice(0, count).indexOf(".") === -1 && // looking only at contiguous groups of damaged springs
    pattern[count] !== "#" // needs to be operational to end the contiguous groups of damaged springs
  ) {
    total += memoizedArrangements(pattern.slice(count + 1), counts.slice(1));
  }
  // cache and return total arrangements
  cache.set(cacheKey, total);
  return total;
};

const arrangements = (row: string) => {
  const [pattern, counts] = row.split(" ");
  return memoizedArrangements(pattern, counts.split(",").map(Number));
};

const unfold = (row: string) => {
  const [pattern, counts] = row.split(" ");
  return `${new Array(5).fill(pattern).join("?")} ${new Array(5).fill(counts).join(",")}`;
};

export const part1 = (rows: string[]) => rows.map(arrangements).reduce(sum);
export const part2 = (rows: string[]) => rows.map(unfold).map(arrangements).reduce(sum);
