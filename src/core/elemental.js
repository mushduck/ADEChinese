import { Quotes } from "./celestials/quotes";

import wordShift from "./word-shift";

export const Elemental = {
  get displayName() {
    return false ? "The Elemental" : wordShift.randomCrossWords("The Elemental");
  },
  possessiveName: "The Elemental's",
  get isUnlocked() {
    return false;
  },
  quotes: Quotes.elemental,
  symbol: "Ω"
};
