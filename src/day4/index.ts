const checkCards = (cards: string[]) => {
  let sum = 0;
  const copies: Map<number, number> = new Map();

  cards.forEach((card, index) => {
    const [winners, numbers] = card.split(" | ").map((nums) => nums.replace(/Card \d+:\s+/, "").split(" "));
    const matches = numbers.filter((number) => number && winners.includes(number)).length;
    const count = (copies.get(index) || 0) + 1;

    copies.set(index, count);
    sum = matches > 0 ? sum + Math.pow(2, matches - 1) : sum;

    for (let i = 1; i <= matches && i < cards.length; i++) {
      copies.set(index + i, (copies.get(index + i) || 0) + count);
    }
  });

  return { copies, sum };
};

export const part1 = (cards: string[]) => checkCards(cards).sum;
export const part2 = (cards: string[]) => {
  const copies = [...checkCards(cards).copies.values()];
  return copies.reduce((sum, count) => sum + count, 0);
};
