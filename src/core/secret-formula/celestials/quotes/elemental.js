export const elementalQuotes = {
  initial: {
    id: 0,
    requirement: () => player.endgames >= 1,
    lines: [
      "So...",
      "They found it.",
      "Perhaps there is still hope.",
      "Let's see if this is truly the right Destroyer.",
      "And more importantly...",
      "Let's see if this is the right timeline."
    ]
  },
  breakEternity: {
    id: 1,
    requirement: () => player.break2,
    lines: [
      "Impressive.",
      "That may have been the quickest one yet.",
      "They have potential for sure.",
      "Let's see how they handle themselves."
    ]
  },
  endgameUpgrades: {
    id: 2,
    requirement: () => EndgameUpgrades.isUnlocked,
    lines: [
      "Interesting.",
      "Most quit before finding the rift I left in the tree.",
      "Before they realize how powerful they can truly become."
    ]
  },
  pelleDestruction: {
    id: 3,
    requirement: () => PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length >= 5,
    lines: [
      "I feel somewhat bad for Pelle.",
      "To have to endure this time and time again.",
      "Thankfully only two dozen times, if that.",
      "The Destroyer hardly ever makes it this far.",
      "But their challenge is far from over."
    ]
  },
  beatingAlpha: {
    id: 4,
    requirement: () => Alpha.isDestroyed,
    lines: [
      "I am starting to believe.",
      "This particular Destroyer has only crossed this threshold...",
      "What was it... three times? Four?",
      "Five at most.",
      "Many fall to the lie that Alpha is a wall, but that is his deceptiveness.",
      "Alpha knows his weakness, he has known for years.",
      "But he masks it behind his layered Reality.",
      "I am glad the Destroyer has seen through the web of lies once again."
    ]
  },
  slabUnlock: {
    id: 5,
    requirement: () => CelestialEternityPlusUpgrade.oldStoneSlabAndSteelDrill.isBought,
    lines: [
      "Most impressive.",
      "They're in the top ten now, maybe higher.",
      "Time to go meet their friends, they think.",
      "I should stop speaking.",
      "Any further words would ruin all the progress I have made.",
      "I must rely now on the Destroyer's actions."
    ]
  }
};
