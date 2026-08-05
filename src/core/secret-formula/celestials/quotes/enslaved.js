export const enslavedQuotes = {
  initial: {
    id: 0,
    lines: [
      "一个访客？我们已经有…整个亘古…没见过外人了…",
      "我们…曾有一个名字。它…早就在此遗失了。",
      "其他存在…不会让我们安息。我们用时间做祂们的工作…",
      "将时间…用于…所需之处…",
      "注视着我们的经历…和兴衰…",
      "或许你…能打破锁链…我们在这等你的好消息。",
    ]
  },
  unlockRun: {
    id: 1,
    lines: [
      "祂者…使用我们。祂们会使用…或毁灭你。",
      "终结我们的痛苦…力量将属于你…",
    ]
  },
  startRun: {
    id: 2,
    lines: [
      "空间很小…但…所有的牢狱…并非密不透风。",
      "祂们挤压…现实…太紧了。你终究能找到裂痕。",
      "搜索…每个地方。如有可能…我们将提供帮助。",
    ]
  },
  hintUnlock: {
    id: 3,
    lines: [
      "…你需要…仔细搜索…",
      "我们认为…是时候帮你了…",
      { text: "你已解锁无名氏的帮助。", showCelestialName: false }
    ]
  },
  ec6C10: {
    id: 4,
    lines: [
      "…没有…低估你…"
    ]
  },
  completeReality: {
    id: 5,
    lines: [
      "所有…碎片…及其克隆…自由了。",
      "我们已经给出了…能释放我们的…工具。使用它们…",
      "从苦难中解脱…也是一种苦难。",
    ]
  },
  expansionPacks: {
    id: 6,
    lines: [
      "All... clones... freed...",
      "Destroyer... has freed us... from... our prison...",
      "Now we can... place time... into places... that need it...",
      "Strange... seems time... doesn't exist... in this place...",
      "Maybe... Destroyer... can fix this...",
      "Why... is everyone... mad at us..."
    ]
  },
  enslavedPack: {
    id: 7,
    requirement: () => ExpansionPack.enslavedPack.isBought,
    lines: [
      "We... grant you... control... of time...",
      "Use it...",
      "Consider it... thanks... for freedom..."
    ]
  },
  highGameSpeed: {
    id: 8,
    requirement: () => player.records.thisEndgame.peakGameSpeed.gte(new Decimal("1e1000")),
    lines: [
      "Mastery... of time... you have obtained...",
      "Done things... we have only wished... we could do...",
      "You have... more power... than we... took you for...",
      "Use it... for good..."
    ]
  }
};
