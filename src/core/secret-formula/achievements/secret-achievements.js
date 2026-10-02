export const secretAchievements = [
  {
    id: 11,
    name: "第一个成就永远那么简单。",
    description: "点击这个成就。"
  },
  {
    id: 12,
    name: "以防万一",
    get description() { return `手动存档 ${formatInt(100)} 次。`; }
  },
  {
    id: 13,
    name: "这是值得尊重的。",
    description: "敬礼！"
  },
  {
    id: 14,
    name: "俺也一样！",
    description: "说点淘气话。"
  },
  {
    id: 15,
    name: "做一个桶滚！",
    description: "做一个桶滚。",
  },
  {
    id: 16,
    name: "你享受痛苦吗？",
    get description() {
      return `一次永恒之后，使用一种“痛苦”的记数法在线游玩 ${formatInt(10)} 分钟。`;
    },
    checkRequirement: () => AchievementTimers.pain
      .check(PlayerProgress.eternityUnlocked() && Notations.current.isPainful, 600),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 17,
    name: "30 条命",
    description: "输入 konami 代码。"
  },
  {
    id: 18,
    name: "你觉得幸运吗？你是朋克吗？",
    get description() {
      return `你每秒获得这个成就的概率为 ${formatInt(1)}/${formatInt(1e5)}。`;
    }
  },
  {
    id: 21,
    name: "在现实生活中研究。",
    description: "购买隐藏的时间研究。"
  },
  {
    id: 22,
    name: "深度油炸",
    get description() { return `使用 Emoji 记数法时总共购买 ${formatInt(1e5)} 个反物质星系。`; },
    checkRequirement: () => player.requirementChecks.permanent.emojiGalaxies >= 1e5,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 23,
    name: "立即停下，罪犯渣滓！",
    description: "打开控制台。"
  },
  {
    id: 24,
    name: "新闻是真的。",
    description: "在新闻栏告诉你该点击它时，点击新闻栏。"
  },
  {
    id: 25,
    name: "嘘… 这是个秘密。",
    description: "发现一个隐藏主题。"
  },
  {
    id: 26,
    name: "你真失败。",
    get description() {
      return `在一个永恒挑战中连续失败 ${formatInt(10)} 次，这是何等悲催的人生啊……`;
    },
    checkRequirement: (function() {
      let count = 0;
      return () => ++count >= 10;
    }()),
    checkEvent: GAME_EVENT.CHALLENGE_FAILED
  },
  {
    id: 27,
    name: "这个游戏不叫物质维度？",
    description: "获得无限的物质。",
    checkRequirement: () => Currency.matter.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 28,
    name: "很好。",
    description: "别假装不知道你做了什么。"
  },
  {
    id: 31,
    name: "你需要更多的运行内存。",
    get description() { return `将游戏界面刷新速率设置为 ${formatInt(200)} 毫秒。`; }
  },
  {
    id: 32,
    name: "小于或等于 0.001",
    get description() {
      return `最快的无限或永恒时间小于等于${format(0.001, 3, 3)}秒。`;
    },
    checkRequirement: () =>
      Time.bestInfinity.totalMilliseconds.lte(1) ||
      Time.bestEternity.totalMilliseconds.lte(1),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.ETERNITY_RESET_AFTER]
  },
  {
    id: 33,
    name: "不错的财务决策。",
    description: "点击“购买硬币”按钮。"
  },
  {
    id: 34,
    name: "你确实知道这些东西是怎么用的吗？",
    description: "重置一个空的时间研究树。"
  },
  {
    id: 35,
    name: "我们应该告诉他们可以购买最大数量…",
    get description() { return `购买单个计数频率提升 ${formatInt(1e5)} 次。`; },
    checkRequirement: () => player.requirementChecks.permanent.singleTickspeed >= 1e5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 36,
    name: "当你离开时 … 什么事都没有发生。",
    description: "当你离开之后，什么都没看到。"
  },
  {
    id: 37,
    name: "你按指示操作了。",
    description: "按指示操作。"
  },
  {
    id: 38,
    name: "前途未卜",
    description: "在正确输入硬重置的确认后关闭弹窗。"
  },
  {
    id: 41,
    name: "该维度不存在",
    description: "尝试购买第九维。"
  },
  {
    id: 42,
    name: "丢人",
    description: "尝试通过永恒挑战 12 来加快时间。"
  },
  {
    id: 43,
    name: "混乱的合唱",
    description: "已装备的所有符文都是音乐符文",
    checkRequirement: () => Glyphs.active.length && Glyphs.active.every(x => Glyphs.isMusicGlyph(x)),
    checkEvent: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED
  },
  {
    id: 44,
    name: "您对统计数据很满意，是吧？",
    get description() { return `盯着统计页面 ${formatInt(15)} 分钟。`; },
    checkRequirement: () => AchievementTimers.stats.check(Tab.statistics.isOpen, 900),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 45,
    name: "牵丝攀藤",
    description: "拖动复兴节点一分钟。",
    checkRequirement: () => player.requirementChecks.permanent.perkTreeDragging++ / 100 >= 60
  },
  {
    id: 46,
    name: "未雨绸缪",
    description: "储存一天的现实时间。"
  },
  {
    id: 47,
    name: "ALT+",
    description: "隐藏尽可能多的标签页。"
  },
  {
    id: 48,
    name: "堆栈溢出",
    description: "使自动机的错误数量多于行数。"
  },
];
