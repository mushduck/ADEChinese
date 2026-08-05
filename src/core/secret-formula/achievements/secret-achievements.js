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
    name: "30 Lives",
    description: "Input the konami code."
  },
  {
    id: 18,
    name: "Do you feel lucky? Well do ya punk?",
    get description() {
      return `You have a ${formatInt(1)}/${formatInt(1e5)} chance of getting this achievement every second.`;
    }
  },
  {
    id: 21,
    name: "Go study in real life instead",
    description: "Purchase the secret Time Study."
  },
  {
    id: 22,
    name: "Deep fried",
    get description() { return `Buy ${formatInt(1e5)} Antimatter Galaxies in total while using emoji notation.`; },
    checkRequirement: () => player.requirementChecks.permanent.emojiGalaxies >= 1e5,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 23,
    name: "Stop right there criminal scum!",
    description: "Open the console."
  },
  {
    id: 24,
    name: "Real news",
    description: "Click on a news ticker message that does something when you click on it."
  },
  {
    id: 25,
    name: "Shhh... It's a secret",
    description: "Discover a secret theme."
  },
  {
    id: 26,
    name: "You're a failure",
    get description() {
      return `Fail Eternity Challenges ${formatInt(10)} times without refreshing.
      What are you doing with your life...`;
    },
    checkRequirement: (function() {
      let count = 0;
      return () => ++count >= 10;
    }()),
    checkEvent: GAME_EVENT.CHALLENGE_FAILED
  },
  {
    id: 27,
    name: "It's not called matter dimensions is it?",
    description: "Get Infinite matter.",
    checkRequirement: () => Currency.matter.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 28,
    name: "Nice.",
    description: "Don't act like you don't know what you did."
  },
  {
    id: 31,
    name: "You should download some more RAM",
    get description() { return `Set your update rate to ${formatInt(200)}ms.`; }
  },
  {
    id: 32,
    name: "Less than or equal to 0.001",
    get description() {
      return `Get a fastest infinity or eternity time of less than or equal to ${format(0.001, 3, 3)} seconds.`;
    },
    checkRequirement: () =>
      Time.bestInfinity.totalMilliseconds.lte(1) ||
      Time.bestEternity.totalMilliseconds.lte(1),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.ETERNITY_RESET_AFTER]
  },
  {
    id: 33,
    name: "A sound financial decision",
    description: "Click on the button to purchase STD coins."
  },
  {
    id: 34,
    name: "You do know how these work, right?",
    description: "Respec with an empty Time Study Tree."
  },
  {
    id: 35,
    name: "Should we tell them about buy max...",
    get description() { return `Buy single Tickspeed upgrades ${formatInt(1e5)} times.`; },
    checkRequirement: () => player.requirementChecks.permanent.singleTickspeed >= 1e5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 36,
    name: "While you were away... Nothing happened.",
    description: "See nothing happen while you were away."
  },
  {
    id: 37,
    name: "You followed the instructions",
    description: "Follow instructions."
  },
  {
    id: 38,
    name: "Knife's edge",
    description: "Close the Hard Reset modal after typing in the confirmation."
  },
  {
    id: 41,
    name: "That dimension doesn’t exist",
    description: "Try to purchase the 9th dimension."
  },
  {
    id: 42,
    name: "SHAME ON ME",
    description: "Try to use EC12 to speed up time."
  },
  {
    id: 43,
    name: "A cacophonous chorus",
    description: "Have all equipped Glyphs be Music Glyphs.",
    checkRequirement: () => Glyphs.active.length && Glyphs.active.every(x => Glyphs.isMusicGlyph(x)),
    checkEvent: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED
  },
  {
    id: 44,
    name: "Are you statisfied now?",
    get description() { return `Stare intently at the statistics tab for ${formatInt(15)} real-time minutes.`; },
    checkRequirement: () => AchievementTimers.stats.check(Tab.statistics.isOpen, 900),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 45,
    name: "This dragging is dragging on",
    description: "Drag the Perks around for a minute.",
    checkRequirement: () => player.requirementChecks.permanent.perkTreeDragging++ / 100 >= 60
  },
  {
    id: 46,
    name: "For a rainy day",
    description: "Store a day of real time."
  },
  {
    id: 47,
    name: "ALT+",
    description: "Hide every possible tab."
  },
  {
    id: 48,
    name: "Stack overflow",
    description: "Have more Automator errors than lines."
  },
];
