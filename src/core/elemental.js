import { Quotes } from "./celestials/quotes";

import wordShift from "./word-shift";

export const Elemental = {
  get displayName() {
    return false ? "源初之神" : wordShift.randomCrossWords("源初之神");
  },
  possessiveName: "源初之神",
  get isUnlocked() {
    return false;
  },
  quotes: Quotes.elemental,
  symbol: "Ω"
};
