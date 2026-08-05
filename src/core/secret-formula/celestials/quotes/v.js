export const vQuotes = {
  initial: {
    id: 0,
    lines: [
      "好一个可怜虫…"
    ],
  },
  unlock: {
    id: 1,
    lines: [
      "欢迎来到吾之现实。",
      "吾很惊讶汝到达了这里。",
      "这毕竟是吾之地盘。",
      "并非每个人都像吾一样伟大。",
    ],
  },
  realityEnter: {
    id: 2,
    lines: [
      "祝汝好运！",
      "汝会需要它的。",
      "吾之现实无懈可击，汝是没办法完成它的。",
    ],
  },
  realityComplete: {
    id: 3,
    lines: [
      "太快了…",
      "别把自己当个什么人物了。",
      "这才刚刚开始。",
      "汝将永远不会超过吾。",
    ],
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: [
      "才一个？不行啊。",
      "跟吾比，汝的这些成就啥都不是。",
    ],
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: [
      "这并不算什么。",
      "别那么自以为是。",
    ],
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: [
      "别以为从现在起就会更简单的。",
      "汝对汝的这点的成就感到非常自满。",
    ],
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: [
      "汝怎么…",
      "这什么都不算！",
      "汝永远不会完成它们的！",
    ],
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: [
      "不可能…",
      "这对吾而言是难以承受的…",
    ],
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: [
      "不…不…不…",
      "这不可能…",
    ],
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: [
      "吾…汝是怎么做到的…",
      "吾做了那么多才得到它们…",
      "吾是最伟大的…",
      "没有人比吾更优秀…",
      "没有人…没有人…没有——",
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
