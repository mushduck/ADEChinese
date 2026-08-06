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
      "所有的…克隆…自由了…",
      "毁灭者…把我们…从…牢狱里…解救出来了…",
      "现在我们可以…把时间…带到…需要它的地方…",
      "奇怪…看来…在这个地方…时间…似乎并不存在…",
      "也许…毁灭者…能解决这个问题…",
      "为什么…大家…都不善待我们呢…"
    ]
  },
  enslavedPack: {
    id: 7,
    requirement: () => ExpansionPack.enslavedPack.isBought,
    lines: [
      "我们…将…掌控…时间…的力量…赋予你…",
      "善加利用…",
      "就当是…对重获自由…的感谢吧…"
    ]
  },
  highGameSpeed: {
    id: 8,
    requirement: () => player.records.thisEndgame.peakGameSpeed.gte(new Decimal("1e1000")),
    lines: [
      "你已经…对时间完全掌控了…",
      "那些我们曾渴望…却始终未能做到的事…",
      "你的力量…比我们…原先以为的…更强大…",
      "请善意地…使用它…"
    ]
  }
};
