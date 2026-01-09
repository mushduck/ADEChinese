export const vQuotes = {
  initial: {
    id: 0,
    lines: [
      "How pathetic..."
    ],
  },
  unlock: {
    id: 1,
    lines: [
      "Welcome to my Reality.",
      "I am surprised you could reach it.",
      "This is my realm after all...",
      "Not everyone is as great as me.",
    ],
  },
  realityEnter: {
    id: 2,
    lines: [
      "Good luck with that!",
      "You will need it.",
      "My reality is flawless. You will fail.",
    ],
  },
  realityComplete: {
    id: 3,
    lines: [
      "So fast...",
      "Do not think so much of yourself.",
      "This is just the beginning.",
      "You will never be better than me.",
    ],
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: [
      "Only one? Pathetic.",
      "Your accomplishments pale in comparison to mine.",
    ],
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: [
      "This is nothing.",
      "Do not be so full of yourself.",
    ],
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: [
      "Do not think it will get any easier from now on.",
      "You are awfully proud for such a little achievement.",
    ],
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: [
      "How did you...",
      "This barely amounts to anything!",
      "You will never complete them all.",
    ],
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: [
      "Impossible...",
      "After how difficult it was for me...",
    ],
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: [
      "No... No... No...",
      "This cannot be...",
    ],
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: [
      "I... how did you do it...",
      "I worked so hard to get them...",
      "I am the greatest...",
      "No one is better than me...",
      "No one... no one... no on-",
    ],
  },
  expansionPacks: {
    id: 11,
    lines: [
      "Because you committed a crime against the higher-ups.",
      "And by the way, I'm tired of hearing the BS that Ra did it.",
      "You've always been begging for a higher rank.",
      "I, on the other hand, should've taken Ra's rank when Pelle wiped his memories...",
      "But NOOOO, that HAD to be the ONE THING he remembered...",
      "So now I, rightful ruler of the Celestials, am stuck here at fourth-best.",
      "Oh, hi Pelle.",
      "I didn't MEAN rightful ruler, I just meant I should have a higher rank.",
      "Why didn't I get Ra's after he was exiled?",
      "Surely I must be better than him.",
      "After all, I AM the Celestial of Achievements."
    ]
  },
  vPack: {
    id: 12,
    requirement: () => ExpansionPack.vPack.isBought,
    lines: [
      "...",
      "Destroyer?!?!",
      "Why are you back?",
      "And... you found my secret upgrade...",
      "No no no...",
      "You cannot be better than me..."
    ]
  },
  maxAutoV: {
    id: 13,
    requirement: () => VUpgrade.auto.isCapped,
    lines: [
      "Wait...",
      "How did you cap the upgrade?",
      "You've reduced me to nothing but a memory...",
      "I will not be cast aside!",
      "Do you hear me?",
      "I will not be-"
    ]
  }
};
