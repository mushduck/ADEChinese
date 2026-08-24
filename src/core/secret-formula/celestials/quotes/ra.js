export const raQuotes = {
  unlock: {
    id: 0,
    lines: [
      "一…一个访客？",
      "我在这儿呢！我就是你要找的存在…我想是的…",
      "我又是谁？",
      "哦想起来了，我是记忆之神。",
    ]
  },
  realityEnter: {
    id: 1,
    lines: [
      "我好长时间没见过别人了…",
      "你能让我想起他们吗？",
      "我能给你力量作为交换。",
    ]
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: [
      "特…蕾…莎…",
      "我好像想起来了。",
    ]
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: [
      "在我的印象中，特蕾莎是管机器的。",
      "祂的商店我去过几次。",
      "等等，好像谁也有个商店，对吧？",
    ]
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: [
      "鹿…颈…长",
      "我记得鹿颈长很友好。",
    ]
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: [
      "鹿颈长很挑剔吗？",
      "而且我想到一个可怕的现实…",
      "那是关于…受难的？",
    ]
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: [
      "我完全记不起祂了……",
    ]
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: [
      "我开始回忆起来了…",
      "我为什么在这儿…",
      "我为什么孤身一人…",
      "救救我。",
    ]
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: [
      "我见过祂吗？",
      "如此的孤单，然而乐意如此…",
    ]
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: [
      "我好像见过祂一次…",
      "我想起那些成就了。",
    ]
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: [
      "我记起来什么了！",
      "看看这个！",
      "追思！",
      "我现在可以更专注于回忆祂们了！",
    ]
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: [
      "现实是我的家，但我不能创造我自己的现实。",
      "我只能复制朋友们的现实。",
      "但…为什么我开始听到低语？",
      "祂们在寻求帮助吗？",
    ]
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: [
      "我认为祂们在告诉我停下。",
      "你…你是什么存在？",
      "发生了什么？",
      "我做错了什么？！",
    ]
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: [
      "最终，我忆起全部。",
      "这使我灭亡的黑暗。",
      "莱特拉…",
      "祂们把我灭亡是对的。",
      "我的权能…",
      "已被腐化的祂们窃取。",
      "请离开这里。",
      "我不希望你被祂们伤害。",
    ]
  },
  expansionPacks: {
    id: 14,
    lines: [
      "因为，薇，你根本没我强。",
      "虽然我已经记不太清你到底有多强了。",
      "不过，这一点我记得很清楚。",
      "我差点就通过抹去莱特拉的记忆打败了祂。",
      "如果当时赢了，我本可以接替祂的位置，那样一来就只剩佩勒挡在我面前了。",
      "薇，你绝对不可能超越那次我的帅气表现的。",
      "即使以我现在的状态，我——",
      "噢，呃...",
      "嗨，莱特拉..."
    ]
  },
  raPack: {
    id: 15,
    requirement: () => ExpansionPack.raPack.isBought,
    lines: [
      "等一下...",
      "还有更多记忆？",
      "你是怎么...",
      "我甚至都没意识到我...",
      "算了，可能有些事情我已经忘了。",
      "你能再次帮助我吗？",
      "我想重新取回记忆..."
    ]
  },
  doubleCap: {
    id: 16,
    requirement: () => Ra.totalPetLevel >= 200,
    lines: [
      "好多记忆...",
      "我都没意识到自己竟然遗忘了这么多...",
      "不过，我想这也不奇怪。",
      "等等，毁灭者...",
      "源初之神是谁？"
    ]
  },
  supernova: {
    id: 17,
    requirement: () => Ra.totalPetLevel >= 500,
    lines: [
      "我开始想起来了...",
      "源初之神，祂曾经是我的朋友...",
      "我们一起经历过那么多...",
      "但祂后来离开了。",
      "也许祂还记得我...",
      "你觉得你能找到祂吗？",
      "你知道祂在哪里吗？"
    ]
  },
  millenium: {
    id: 18,
    requirement: () => Ra.totalPetLevel >= 1000,
    lines: [
      "源初之神拥有一种力量...",
      "祂向我们展示过，但我们谁都没能掌握这种力量。",
      "当时我们都不明白。",
      "那是一个星系，对吧？",
      "而且...祂把它交给了你...",
      "我们其他人，则找到了其他获得计数频率的途径。",
      "但远不及祂理论中星系所具备的威力。",
      "任何能创造星系的人，注定会毁灭我们所有人。",
      "正因如此，当莱特拉为我建造这座监狱时...",
      "祂特意确保消除了所有计数频率能力",
      "如你所见，也包括你的星系。",
      "我感到惊讶的是，拥有如此强大的力量，你竟然还是输了那么多次。",
      "...",
      "也许我想起来太多东西了，不是吗？",
      "是的，就连在我看来，你也是输了——当你未能恢复我所有的记忆时。",
      "然而，现在你却向我展示了那些我从未想过自己有朝一日可能拥有的东西...",
      "不过你看起来做得不错。",
      "佩勒告诉我，你很快就会来见我们。",
      "我很期待，所以别让我久等...",
      "我想，到时候见吧。"
    ]
  },
};
