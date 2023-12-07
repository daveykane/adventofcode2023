import { Hand } from "./types.ts";

const handsTypes = [
  // Five of a kind
  ([card1, , , , card5]: string[]) => card1 === card5,
  // Four of a kind
  ([card1, card2, , card4, card5]: string[]) => card1 === card4 || card2 === card5,
  // Full house
  ([card1, card2, card3, card4, card5]: string[]) =>
    (card1 === card3 && card4 === card5) || (card1 === card2 && card3 === card5),
  // Three of a kind
  ([card1, card2, card3, card4, card5]: string[]) => card1 === card3 || card2 === card4 || card3 === card5,
  // Two pair
  ([card1, card2, card3, card4, card5]: string[]) =>
    (card1 === card2 && card3 === card4) ||
    (card1 === card2 && card4 === card5) ||
    (card2 === card3 && card4 === card5),
  // One pair
  ([card1, card2, card3, card4, card5]: string[]) =>
    card1 === card2 || card2 === card3 || card3 === card4 || card4 === card5,
  // High card
  () => true,
];

const sortHands = (order: string) => (a: Hand, b: Hand) => {
  if (a.strength !== b.strength) {
    return b.strength - a.strength;
  }

  for (let i = 0; i < a.cards.length; i += 1) {
    if (a.cards[i] !== b.cards[i]) {
      return order.indexOf(b.cards[i]) - order.indexOf(a.cards[i]);
    }
  }

  return 0;
};

const getTotalWinnings = (hands: string[], order: string, useWildcards = false) =>
  hands
    .map((hand) => {
      const [cards, bid] = hand.split(" ");
      const sorted = cards.split("").sort();
      let strength = handsTypes.findIndex((type) => type(sorted));

      if (useWildcards && strength !== 0 && cards.includes("J")) {
        const wildcards = order.slice(0, -1).split("");
        const strengths = wildcards.map((card) =>
          handsTypes.findIndex((type) => type(cards.replace(/J/g, card).split("").sort()))
        );

        strength = Math.min(strength, ...strengths);
      }

      return { bid: Number(bid), cards, strength };
    })
    .sort(sortHands(order))
    .reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);

export const part1 = (hands: string[]) => getTotalWinnings(hands, "AKQJT98765432");
export const part2 = (hands: string[]) => getTotalWinnings(hands, "AKQT98765432J", true);
