export const expansionPacks = {
  teresaPack: {
    name: "Teresa's Expansion Pack",
    id: "teresaPack",
    symbol: "Ϟ",
    description: () =>
      `Uncap Teresa's Canister. Teresa's Canister now affects the Reality Machine cap as well as Reality Machine gain.
      Unlock Charged Perk Upgrades in the Teresa Tab. Automatically pour RM into Teresa.`,
    cost: Decimal.pow(10, 1e30),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  effarigPack: {
    name: "Effarig's Expansion Pack",
    id: "effarigPack",
    symbol: "Ϙ",
    description: () =>
      `Multiply Relic Shard gain by the logarithm of your Antimatter amount. The Effarig Level ${formatInt(10)} reward in Ra
      is improved so that Effarig Glyphs are always generated with ${formatInt(7)} effects. Increase Glyph Alchemy caps to one-third
      of your all-time maximum Glyph Level. Alchemy resources are kept on Endgame, and making a Reality Glyph no longer spends
      Reality resources. Effarig's Shop starts completed. Layers of Effarig's Reality will automatically complete at one-tenth the
      time of your fastest Endgame.`,
    cost: Decimal.pow(10, 1e50),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  enslavedPack: {
    name: "The Nameless Ones' Expansion Pack",
    id: "enslavedPack",
    symbol: "\uf0c1",
    description: () =>
      `Charging your Black Hole always only takes ${formatPercents(0.99)} of your total Game Speed. Unlock optimizers for
      for adjusting the amount of your stored time you desire to discharge as well as the interval at which you want to discharge
      your Stored Time. Double the strength of all Effective Tesseracts. Tesseracts multiply Endgames as well as reducing the Infinity
      Dimension Compression Magnitude slightly. Start Endgames with the Nameless Ones completed. Unlock an autobuyer for Tesseracts.`,
    cost: Decimal.pow(10, 1e70),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  vPack: {
    name: "V's Expansion Pack",
    id: "vPack",
    symbol: "⌬",
    description: () =>
      `Start with V's Reality unlocked. Automatically unlock one V-Achievement every ${TimeSpan.fromSeconds(new Decimal(60))},
      which can be reduced by spending Celestial Points. This includes Hard V-Achievements. Double all gained Space Theorems.`,
    cost: Decimal.pow(10, 1e90),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  raPack: {
    name: "Ra's Expansion Pack",
    id: "raPack",
    symbol: "\uf185",
    description: () =>
      `Ra is kept on Endgame. Raise the level cap of all Celestials to the double-logarithm of your record Antimatter amount.
      Unlock ${formatInt(7)} new effects for each Celestial which can be obtained by increasing the level of each Celestial.
      Multiply Memory and Memory Chunk gain by ${formatX(10)}.`,
    cost: Decimal.pow(10, 1e110),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  laitelaPack: {
    name: "Lai'tela's Expansion Pack",
    id: "laitelaPack",
    symbol: "ᛝ",
    description: () =>
      `Unlock an autobuyer that will increase/decrease the bulk Singularity level based on an inputted time for each. While in
      Lai'tela's Reality, Game Speed returns to normal twice as fast. Square the Annihilation to ${formatInt(8)}th DMD multiplier
      if Annihilation multiplier currently affects the ${formatInt(8)}th DMD. Reduce the DMD Interval increase on Ascension
      by ${formatInt(200)}. Multiply Dark Matter gain by the double-logarithm of your Antimatter amount or the logarithm of
      your Imaginary Machine amount, whichever is bigger. Start Endgames with ${formatInt(10)} Singularities. Multiply Dark Energy
      gain by the logarithm of your Singularity amount squared. Raise the Annhilation effect to a power based on Dark Matter.
      Improve the Annihilation autobuyer. Unlock the ability to Hadronize Lai'tela's Reality. The reward for destabilizing Lai'tela's
      Reality now affects the Dark Matter Cap as well. The maximum gain of Entropy per second is multiplied by ${formatInt(10)}.`,
    cost: Decimal.pow(10, 1e130),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  pellePack: {
    name: "Pelle's Expansion Pack",
    id: "pellePack",
    symbol: "♅",
    description: () =>
      `Reduce the Galaxy Generator Instability Magnitude by ${formatInt(1)}, raise the first three types of Dimensions to
      a power based on your all-time record Galaxy amount, and unlock autobuyers for the repeatable Galaxy Generator upgrades.`,
    cost: Decimal.pow(10, 1e150),
    formatCost: value => formatPostBreak(value, 2, 0)
  }
};
