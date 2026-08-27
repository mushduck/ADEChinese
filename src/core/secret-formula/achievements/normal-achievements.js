export const normalAchievements = [
  {
    id: 11,
    name: "从零开始",
    description: "购买第一维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    reward: "成就为第一维度提供的倍数为原来的平方。",
    effect: () => Achievements.power,
    progress: () => Achievement(11).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10(), 0, 1)
  },
  {
    id: 12,
    name: "100个反物质算多了",
    description: "购买第二维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第二维度获得等同于反物质维度指数的倍率。`; },
    effect: () => Currency.antimatter.value.add(1).log10(),
    progress: () => Achievement(12).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(2), 0, 1)
  },
  {
    id: 13,
    name: "《半条命 3》确认发布",
    description: "购买第三维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第三及更高维度增强 ${formatPercents(0.3)} 。`; },
    effect: 1.3,
    progress: () => Achievement(13).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(4), 0, 1)
  },
  {
    id: 14,
    name: "四里求生",
    description: "购买第四维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第四维度增强 ${formatInt(4)} 倍。`; },
    effect: 4,
    progress: () => Achievement(14).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(6), 0, 1)
  },
  {
    id: 15,
    name: "五维冲击",
    description: "购买第五维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第五及更高维度产量翻倍。`; },
    effect: 2,
    progress: () => Achievement(15).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(2).min(0.5).add(player.antimatter.max(1).log10().div(18).min(0.5)), 0, 1)
  },
  {
    id: 16,
    name: "6 不是 9",
    get description() {
      return Enslaved.isRunning
        ? "购买一个第六维度（这并没有什么特殊作用）"
        : "购买第六维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第六维度增强 ${formatInt(9)} 倍。`; },
    effect: 9,
    progress: () => Achievement(16).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(4).min(0.5).add(player.antimatter.max(1).log10().div(26).min(0.5)), 0, 1)
  },
  {
    id: 17,
    name: "幸运的 7",
    description: "购买第七维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第七维度增强 ${formatInt(7)} 倍。`; },
    effect: 7,
    progress: () => Achievement(17).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(6).min(0.5).add(player.antimatter.max(1).log10().div(36).min(0.5)), 0, 1)
  },
  {
    id: 18,
    name: "8 不是无限",
    get description() {
      return Enslaved.isRunning
        ? "购买一个第八反物质维度（别被骗了）"
        : "购买第八维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `所有维度增强 90° (π ÷ 2 - 1 ≈ 57%) 。`; },
    effect: 1.57,
    progress: () => Achievement(18).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(8).min(0.5).add(player.antimatter.max(1).log10().div(48).min(0.5)), 0, 1)
  },
  {
    id: 21,
    name: "永无止境！",
    description: "达到无限。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `每次无限从 ${formatInt(100)} 反物质开始。`; },
    effect: 100,
    progress: () => Achievement(21).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 22,
    name: "假新闻！",
    get description() { return `发现 ${formatInt(50)} 条不同的新闻消息。`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(22).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NewsHandler.uniqueTickersSeen).div(50), 0, 1)
  },
  {
    id: 23,
    name: "九九归一",
    get description() { return `正好有 ${formatInt(99)} 个第八维度。`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `第八维度增强${formatPercents(0.1)}。`; },
    effect: 1.1,
    progress: () => Achievement(23).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(8).amount.div(99), 0, 1)
  },
  {
    id: 24,
    name: "反物质末日",
    get description() { return `获得超过 ${format(DC.E80)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(80),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(24).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(80), 0, 1)
  },
  {
    id: 25,
    name: "加足马力",
    get description() { return `购买 ${formatInt(10)} 维度提升。`; },
    checkRequirement: () => DimBoost.purchasedBoosts.gte(10),
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    progress: () => Achievement(25).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(18).min(0.5).add(player.antimatter.max(1).log10().div(318).min(0.5)), 0, 1)
  },
  {
    id: 26,
    name: "翻越高墙",
    description: "购买一个反物质星系。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE,
    progress: () => Achievement(26).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(129), 0, 1)
  },
  {
    id: 27,
    name: "双子星系",
    get description() { return `购买 ${formatInt(2)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies.gte(2),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    progress: () => Achievement(27).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(2).min(0.5).add(player.antimatter.max(1).log10().div(438).min(0.5)), 0, 1)
  },
  {
    id: 28,
    name: "徒劳无功",
    get description() {
      return `当你有超过 ${format(DC.E150)} 个第一维度时，购买一个第一维度。`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.add(1).log10().gte(150),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第一维度增强 ${formatPercents(0.1)} `; },
    effect: 1.1,
    progress: () => Achievement(28).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(1).amount.add(1).log10().div(150), 0, 1)
  },
  {
    id: 31,
    name: "我忘记削弱它了",
    get description() { return `任一反物质维度倍率超过 ${formatX(DC.E31)}。`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.add(1).log10().gte(31)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `第一维度增强 ${formatPercents(0.05)} `; },
    effect: 1.05,
    progress: () => Achievement(31).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimensions.all.map(x => x.multiplier).reduce(Decimal.maxReducer).add(1).log10().div(31), 0, 1)
  },
  {
    id: 32,
    name: "诸神之乐",
    get description() { return `从维度献祭中获得超过 ${formatX(600)}倍的倍数加成。(第八维度自动购买挑战除外)`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
    progress: () => Achievement(32).isUnlocked ? DC.D1 : (NormalChallenge(8).isOnlyActiveChallenge ? DC.DM1 : Decimal.clamp(Sacrifice.totalBoost.div(600), 0, 1))
  },
  {
    id: 33,
    name: "很多无限",
    get description() { return `达到无限 ${formatInt(10)} 次。`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    progress: () => Achievement(33).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinities.value.div(10), 0, 1)
  },
  {
    id: 34,
    name: "你 8 需要",
    description: "没有第八维度时达到无限",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一到七维度增强 ${formatPercents(0.02)} 。`; },
    effect: 1.02,
    progress: () => Achievement(34).isUnlocked ? DC.D1 : (AntimatterDimension(8).totalAmount.neq(0) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 35,
    name: "你还真敢睡？",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `离线时间超过 ${formatInt(2)} 小时 (现实时间).`
        : `离线时间超过 ${formatInt(2)} 小时.`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 7200000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE,
    progress: () => Achievement(35).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Date.now() - player.lastUpdate).div(7200000), 0, 1)
  },
  {
    id: 36,
    name: "幽闭恐惧",
    get description() {
      return `只用 ${formatInt(1)} 反物质星系达到无限。大坍缩后重置反物质星系数量。`;
    },
    checkRequirement: () => player.galaxies.eq(1),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始计数频率提升 ${format(1.02, 2, 2)} 倍。`; },
    effect: 1 / 1.02,
    progress: () => Achievement(36).isUnlocked ? DC.D1 : (player.galaxies.neq(1) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 37,
    name: "那太快了！",
    get description() { return `在 ${formatInt(2)} 小时内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours.toNumber() <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `每次无限从 ${formatInt(5000)} 反物质开始。`; },
    effect: () => player.disablePostReality ? 100 : 5000,
    progress: () => Achievement(37).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalHours.gt(2) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 38,
    name: "破除迷信",
    get description() {
      return `不进行维度献祭，购买反物质星系。（反物质星系的数量在无限时重置。)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE,
    progress: () => Achievement(38).isUnlocked ? DC.D1 : (!player.requirementChecks.infinity.noSacrifice ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(129), 0, 1))
  },
  {
    id: 41,
    name: "无需 DLC",
    get description() { return `购买 ${formatInt(16)} 个无限升级。`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `解锁两个新的无限升级 - ${formatX(2)} 无限点数倍增器和离线时生成无限点数。`;
    },
    progress: () => Achievement(41).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.infinityUpgrades.size).div(16), 0, 1)
  },
  {
    id: 42,
    name: "超级疯子",
    get description() {
      return `在拥有多于 ${format(DC.E63)} 反物质时，你每秒获得的反物质数量超过你拥有的反物质数量。`;
    },
    checkRequirement: () =>
      Currency.antimatter.value.add(1).log10().gte(63) &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(42).isUnlocked ? DC.D1 : (Currency.antimatter.productionPerSecond.lte(Currency.antimatter.value) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(63), 0, 1))
  },
  {
    id: 43,
    name: "反客为主",
    description:
      "使第八反物质维度的加成倍数最高，第七反物质维度的加成倍数第二高，依此类推。",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `每个反物质维度获得与层数成比例的提升(第八维度获得 ${formatPercents(0.08)}, 第七维度获得 ${formatPercents(0.07)}, 依此类推)。`;
    },
    progress: () => {
      let done = 0;
      const rmultipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < rmultipliers.length - 1; i++) {
        if (rmultipliers[i].lt(rmultipliers[i + 1])) done++;
      }
      return Achievement(43).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(done).div(7), 0, 1);
    }
  },
  {
    id: 44,
    name: "30 秒完活",
    get description() {
      return `你每秒获得的反物质数量超过你拥有的反物质数量，并持续 ${formatInt(30)} 秒。`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => {
      //This is a rough estimate that should work but we'll see
      let sec = 0;
      if (AchievementTimers.marathon1.check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 1)) sec++;
      else sec = 0;
      return Achievement(44).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(sec).div(30), 0, 1);
    }
  },
  {
    id: 45,
    name: "比土豆还快",
    get description() { return `计数频率超过 ${format(DC.E29)} 每秒。`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-26),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `起始计数频率提升 ${formatX(1.02, 0, 2)} 倍。`; },
    effect: 0.98,
    progress: () => Achievement(45).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(29), 0, 1)
  },
  {
    id: 46,
    name: "多维度",
    get description() { return `除第八维度外的所有反物质维度达到 ${format(DC.E12)}。`; },
    checkRequirement: () => AntimatterDimension(7).amount.add(1).log10().gte(12),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(46).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(7).amount.add(1).log10().div(12), 0, 1)
  },
  {
    id: 47,
    name: "挑战狂魔",
    get description() { return `完成 ${formatInt(3)} 个普通挑战。`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(47).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NormalChallenges.all.countWhere(c => c.isCompleted)).div(3), 0, 1)
  },
  {
    id: 48,
    name: "初出茅庐",
    get description() { return `完成所有的普通挑战`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `所有反物质维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1,
    progress: () => Achievement(48).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NormalChallenges.all.countWhere(c => c.isCompleted)).div(12), 0, 1)
  },
  {
    id: 51,
    name: "极限突破",
    description: "打破无限。",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(51).isUnlocked ? DC.D1 : Decimal.clamp(Decimal.log2(1500).sub(new Decimal(player.auto.bigCrunch.interval).div(100).log2()).div(Decimal.log2(1500)), 0, 1)
  },
  {
    id: 52,
    name: "自动化时代",
    description: "维度和计数频率自动购买器工作的时间间隔达到最小值。",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(52).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed).filter(a => a.isUnlocked && a.hasMaxedInterval).length).div(9), 0, 1)
  },
  {
    id: 53,
    name: "这当然不值得",
    description: "所有自动购买器工作的时间间隔达到最小值。",
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(53).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyers.upgradeable.filter(a => a.isUnlocked && a.hasMaxedInterval).length).div(12), 0, 1)
  },
  {
    id: 54,
    name: "健步如飞",
    get description() { return `在 ${formatInt(10)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes.toNumber() <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `每次无限从 ${format(5e5)} 反物质开始。`; },
    effect: () => player.disablePostReality ? 100 : 5e5,
    progress: () => Achievement(54).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMinutes.gt(10) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 55,
    name: "永远没多远",
    get description() { return `在 ${formatInt(1)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes.toNumber() <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `每次无限从 ${format(5e10)} 反物质开始。`; },
    effect: () => player.disablePostReality ? 100 : 5e10,
    progress: () => Achievement(55).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMinutes.gt(1) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 56,
    name: "死伤枕藉",
    get description() {
      return `在 ${formatInt(3)} 分钟内完成第二维度自动购买器挑战（挑战2）`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(3)} 分钟内所有反物质维度更强。`;
    },
    effect: () => Decimal.max(new Decimal(6).div(Time.thisInfinity.totalMinutes.plus(3)), 1).toNumber(),
    effectCondition: () => Time.thisInfinity.totalMinutes.lt(3),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(56).isUnlocked ? DC.D1 : ((!NormalChallenge(2).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 57,
    name: "神授之礼",
    get description() {
      return `在 ${formatInt(3)} 分钟内完成第八维度自动购买器挑战（挑战8）`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1,
    progress: () => Achievement(57).isUnlocked ? DC.D1 : ((!NormalChallenge(8).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 58,
    name: "挺不错的",
    get description() { return `在 ${formatInt(3)} 分钟内完成计数频率自动购买器挑战（挑战9）。`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `每买 ${formatInt(10)} 个反物质维度的倍数增加 ${formatPercents(0.01)}.`;
    },
    effect: 1.01,
    progress: () => Achievement(58).isUnlocked ? DC.D1 : ((!NormalChallenge(9).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 61,
    name: "虎背熊腰",
    get description() {
      return `将所有自动购买器的批量购买提升至 ${formatInt(Autobuyer.antimatterDimension.bulkCap)}.`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "自动购买维度时，批量购买的数量不受限制。",
    progress: () => Achievement(61).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyer.antimatterDimension.zeroIndexed.filter(x => x.hasMaxedBulk).length).div(8), 0, 1)
  },
  {
    id: 62,
    name: "哦，你… 你还在这里吗？?",
    get description() { return `达到 ${format(DC.E8)} 无限点数/分钟。`; },
    checkRequirement: () => Player.bestRunIPPM.add(1).log10().gte(8),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    progress: () => Achievement(62).isUnlocked ? DC.D1 : Decimal.clamp(Player.bestRunIPPM.add(1).log10().div(8), 0, 1)
  },
  {
    id: 63,
    name: "新的开始",
    description: "开始产生无限之力。",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `所有无限维度的产量翻倍。`; },
    effect: 2,
    progress: () => Achievement(63).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(8), 0, 1)
  },
  {
    id: 64,
    name: "不死之身",
    description: "在普通挑战中，不购买维度提升和反物质星系达到无限。",
    checkRequirement: () => player.galaxies.eq(0) && DimBoost.purchasedBoosts.eq(0) && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度至第四维度增强 ${formatPercents(0.25)}.`; },
    effect: 1.25,
    progress: () => Achievement(64).isUnlocked ? DC.D1 : ((player.galaxies.neq(0) || DimBoost.purchasedBoosts.neq(0) || !NormalChallenge.isRunning) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 65,
    name: "小菜一碟",
    get description() { return `所有挑战的完成用时之和小于 ${formatInt(3)} 分钟。`; },
    checkRequirement: () => Time.challengeSum.totalMinutes.lt(3),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `在无限最初的 ${formatInt(3)} 分钟内所有反物质维度更强，但仅在挑战中生效。`;
    },
    effect: () => (Player.isInAnyChallenge && !player.disablePostReality ? Decimal.max(DC.D4.div(Time.thisInfinity.totalMinutes.plus(1)), 1) : DC.D1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes.lt(3) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(65).isUnlocked ? DC.D1 : Decimal.clamp(DC.D3.div(Time.challengeSum.totalMinutes), 0, 1)
  },
  {
    id: 66,
    name: "比方了的土豆还快。",
    get description() { return `计数频率超过 ${format(DC.E58)} 每秒。`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-55),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `起始计数频率提升 ${formatX(1.02, 0, 2)} 倍。`; },
    effect: 0.98,
    progress: () => Achievement(66).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(58), 0, 1)
  },
  {
    id: 67,
    name: "无限挑战",
    description: "完成一个无限挑战。",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(67).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.add(1).log10().div(4000).min(0.5).add(!InfinityChallenge.current ? 0 : player.antimatter.max(1).log10().div(InfinityChallenge.current.goal.log10().times(2)).min(0.5)), 0, 1)
  },
  {
    id: 68,
    name: "你再次这么做，就是为了正确地完成成就？",
    get description() {
      return `在 ${formatInt(10)} 秒内完成第三维度自动购买器挑战（挑战3）。`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度增强 ${formatPercents(0.5)}。`; },
    effect: 1.5,
    progress: () => Achievement(68).isUnlocked ? DC.D1 : ((!NormalChallenge(3).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalSeconds.gt(10)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
  id: 71,
  name: "错误909：找不到维度",
  get description() {
    return `在第二反物质维度自动购买器挑战（挑战2）中，仅有 ${formatInt(1)} 个第一维度且没有其他维度、维度提升和反物质星系时达到无限。`;
  },
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts.eq(0) &&
      player.galaxies.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度增强 ${formatInt(3)} 倍。`; },
    effect: 3,
    progress: () => Achievement(71).isUnlocked ? DC.D1 : ((!NormalChallenge(2).isOnlyActiveChallenge || AntimatterDimension(1).amount.neq(1) || DimBoost.purchasedBoosts.neq(0) || player.galaxies.neq(0)) ? DC.D0 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 72,
    name: "拿不住了",
    get description() {
      return `所有反物质维度的倍数超过 ${formatX(DC.NUMMAX, 1)}.`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(DC.NUMMAX)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `所有反物质维度增强 ${formatPercents(0.1)}.`; },
    effect: 1.1,
    progress: () => Achievement(72).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AntimatterDimensions.all.filter(x => x.multiplier.gte(DC.NUMMAX)).length).div(8), 0, 1)
  },
  {
    id: 73,
    name: "一个不存在的成就",
    get description() { return `获得 ${formatPostBreak(DC.D9_9999E9999, 4)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "未花费的反物质越多，反物质维度的效果越强。",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1).clampMax(Decimal.pow(10, 1e30)).pow(
      Decimal.max(Decimal.pow(2, Decimal.log10(Decimal.log10(Currency.antimatter.value.pow(0.00002).plus(1)).div(1e30))), 1)),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(73).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(10000), 0, 1)
  },
  {
    id: 74,
    name: "一秒都不给我",
    get description() { return `所有挑战的用时之和小于 ${formatInt(5)} 秒。`; },
    checkRequirement: () => Time.challengeSum.totalSeconds.lt(5),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `在挑战中，所有的反物质维度增强 ${formatPercents(0.4)}`; },
    effect: () => player.disablePostReality ? 1 : 1.4,
    effectCondition: () => Player.isInAnyChallenge && !player.disablePostReality,
    progress: () => Achievement(74).isUnlocked ? DC.D1 : Decimal.clamp(DC.D5.div(Time.challengeSum.totalSeconds), 0, 1)
  },
  {
    id: 75,
    name: "新的维度？？？",
    description: "解锁第四无限维度",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "你的成就提供的倍数加成作用于无限维度。",
    effect: () => Achievements.power,
    progress: () => Achievement(75).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(10500), 0, 1)
  },
  {
    id: 76,
    name: "每个维度都有一个",
    get description() { return `玩游戏 ${formatInt(8)} 天。`; },
    checkRequirement: () => Time.totalTimePlayed.totalHours.gte(8),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于游戏时长，给予反物质维度极小的倍数加成。",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max(Decimal.pow(Time.totalTimePlayed.totalDays.times(12), 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(76).isUnlocked ? DC.D1 : Decimal.clamp(Time.totalTimePlayed.totalHours.div(8), 0, 1)
  },
  {
    id: 77,
    name: "百万富翁",
    get description() { return `达到 ${format(1e6)} 无限之力。`; },
    checkRequirement: () => Currency.infinityPower.value.add(1).log10().gte(6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `所有无限维度获得基于当前无限点数的倍率。`;
    },
    effect: () => Currency.infinityPoints.value.add(1).log10().clampMin(1),
    progress: () => Achievement(77).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPower.value.add(1).log10().div(6), 0, 1)
  },
  {
    id: 78,
    name: "眨眼之间",
    get description() { return `在 ${formatInt(250)} 毫秒内完成无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds.toNumber() <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `每次无限从 ${format(5e25)} 反物质开始。`;
    },
    effect: () => player.disablePostReality ? 100 : 5e25,
    progress: () => Achievement(78).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMilliseconds.gt(250) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 81,
    name: "我超喜欢游戏设计的！",
    get description() { return `在 ${formatInt(15)} 秒内完成无限挑战 5。`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `复制器速度提高 ${formatInt(3)} 倍。`;
    },
    effect: () => player.disablePostReality ? 1 : 3,
    progress: () => Achievement(81).isUnlocked ? DC.D1 : ((!InfinityChallenge(5).isRunning || Time.thisInfinityRealTime.totalSeconds.gt(15)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(16500), 0, 1))
  },
  {
    id: 82,
    name: "梅开二度",
    get description() { return `完成 ${formatInt(8)} 个无限挑战。`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(82).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(InfinityChallenges.all.countWhere(c => c.isCompleted)).div(8), 0, 1)
  },
  {
    id: 83,
    name: "您可以获得50个反物质星系？！？！",
    get description() { return `获得 ${formatInt(50)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies.gte(50),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `每一个反物质星系使计数频率增加 ${formatPercents(0.05)}.`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`,
    progress: () => Achievement(83).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(50), 0, 1)
  },
  {
    id: 84,
    name: "这有点多",
    get description() { return `获得 ${formatPostBreak("1e35000")} 反物质。`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(35000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "未花费的反物质越多，反物质维度的效果越强。",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1).clampMax(Decimal.pow(10, 1e30)).pow(
      Decimal.max(Decimal.pow(2, Decimal.log10(Decimal.log10(Currency.antimatter.value.pow(0.00002).plus(1)).div(1e30))), 1)),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(84).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(35000), 0, 1)
  },
  {
    id: 85,
    name: "你的无限点数全归我们了",
    get description() { return `一次大坍缩获得超过 ${format(DC.E150)} 无限点数。`; },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(150),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `从大坍缩中获得额外 ${formatX(4)} 倍的无限点数。`; },
    effect: () => player.disablePostReality ? 1 : 4,
    progress: () => Achievement(85).isUnlocked ? DC.D1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(150), 0, 1)
  },
  {
    id: 86,
    name: "扭曲时间？",
    get description() { return `每次计数频率升级达到 ${formatX(1000)} 计数频率/秒。`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `星系增强 ${formatPercents(0.01)}.`; },
    effect: 1.01,
    progress: () => Achievement(86).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.multiplier.recip().div(1000), 0, 1)
  },
  {
    id: 87,
    name: "200万次无限",
    get description() { return `达到无限 ${format(DC.D2E6)} 次。`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `无限超过 ${formatInt(5)} 秒时，给予 ${formatX(250)} 倍无限次数。`;
    },
    effect: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23) ? 1 : 250,
    effectCondition: () => Time.thisInfinity.totalSeconds.gt(5) &&
      (!player.disablePostReality || (Alpha.isRunning && Alpha.currentStage >= 23)),
    progress: () => Achievement(87).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinities.value.div(2e6), 0, 1)
  },
  {
    id: 88,
    name: "另请高明",
    get description() {
      return `在一次维度献祭中获得一个 ${formatX(DC.NUMMAX, 1, 0)} 倍数加成。`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1,
    progress: () => Achievement(88).isUnlocked ? DC.D1 : Decimal.clamp(Sacrifice.nextBoost.log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 91,
    name: "神之速度",
    get description() {
      return `在 ${formatInt(2)} 秒内进行大坍缩并获得不少于 ${format(DC.E200)} 无限点数。`;
    },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(200) && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(5)} 秒内所有反物质维度更强。`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max((DC.D5.sub(Time.thisInfinity.totalSeconds)).times(60), 1),
    effectCondition: () => Time.thisInfinity.totalSeconds.lt(5) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(91).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalSeconds.gt(2) ? DC.DM1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(200), 0, 1))
  },
  {
    id: 92,
    name: "绝不刹车！",
    get description() {
      return `在 ${formatInt(20)} 秒内进行大坍缩并获得不少于 ${format(DC.E250)} 无限点数。`;
    },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(250) && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(60)} 秒内所有反物质维度更强。`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max((DC.D1.sub(Time.thisInfinity.totalMinutes)).times(100), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes.lt(1) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(92).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalSeconds.gt(20) ? DC.DM1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(250), 0, 1))
  },
  {
    id: 93,
    name: "极限超频",
    get description() { return `一次大坍缩获得超过 ${format(DC.E300)} 无限点数。`; },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(300),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `从大坍缩中获得额外 ${formatX(4)} 倍的无限点数。`; },
    effect: () => player.disablePostReality ? 1 : 4,
    progress: () => Achievement(93).isUnlocked ? DC.D1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(300), 0, 1)
  },
  {
    id: 94,
    name: "4.3333 分钟的无限",
    get description() { return `达到 ${format(DC.E260)} 无限之力。`; },
    checkRequirement: () => Currency.infinityPower.value.add(1).log10().gte(260),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "获得的无限之力加倍。",
    effect: 2,
    progress: () => Achievement(94).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPower.value.add(1).log10().div(260), 0, 1)
  },
  {
    id: 95,
    name: "这安全吗？",
    get description() { return `在 ${formatInt(1)} 小时内获得 ${format(DC.NUMMAX, 1, 0)} 个复制器。`; },
    get reward() { return `无限时保留复制器和${formatInt(1)}个复制器星系。`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(DC.NUMMAX) || player.replicanti.galaxies.gt(0)) &&
      Time.thisInfinityRealTime.totalHours.toNumber() <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER,
    progress: () => Achievement(95).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalHours.gt(1) ? DC.DM1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 96,
    name: "时间是相对的",
    description: "达到永恒",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(96).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 97,
    name: "如履薄冰",
    get description() { return `所有无限挑战的用时之和小于 ${format(6.66, 2, 2)} 秒。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds.lt(6.66),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(97).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(6.66).div(Time.infinityChallengeSum.totalSeconds), 0, 1)
  },
  {
    id: 98,
    name: "无限零度",
    description: "解锁第八无限维度",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(98).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(60000), 0, 1)
  },
  {
    id: 101,
    name: "缺一少七",
    description: "不购买第一维度至第七维度达到永恒。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(101).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.onlyAD8 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 102,
    name: "永恒的一英里",
    description: "获得所有的永恒里程碑。",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `多获得 ${formatX(2)} 倍的永恒次数`; },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(102).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternities.value.div(1000), 0, 1)
  },
  {
    id: 103,
    name: "又一个不存在的成就",
    get description() { return `达到 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `更好的无限点数公式。log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: () => player.disablePostReality ? 308 : 307.8,
    progress: () => Achievement(103).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 104,
    name: "这不是永恒",
    get description() { return `在 ${formatInt(30)} 秒内达到永恒。`; },
    checkRequirement: () => Time.thisEternity.totalSeconds.lte(30),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `开始永恒时拥有 ${format(5e25)} 无限点数。`; },
    effect: () => player.disablePostReality ? 0 : 5e25,
    progress: () => Achievement(104).isUnlocked ? DC.D1 : (Time.thisEternity.totalSeconds.gt(30) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 105,
    name: "无限时间",
    get description() { return `一次永恒中，从时间维度获得${formatInt(308)}个计数频率升级。`; },
    checkRequirement: () => player.totalTickGained.gte(308),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "时间维度略微从计数频率中获得倍数加成。",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(105).isUnlocked ? DC.D1 : Decimal.clamp(player.totalTickGained.div(308), 0, 1)
  },
  {
    id: 106,
    name: "蜂群",
    get description() { return `${formatInt(15)} 秒内获得 ${formatInt(10)} 个复制器星系。`; },
    checkRequirement: () => Replicanti.galaxies.total.gte(10) && Time.thisInfinity.totalSeconds.lte(15),
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER,
    progress: () => Achievement(106).isUnlocked ? DC.D1 : (Time.thisInfinity.totalSeconds.gt(15) ? DC.DM1 : Decimal.clamp(Replicanti.galaxies.total.div(10), 0, 1))
  },
  {
    id: 107,
    name: "无需指南",
    get description() { return `无限次数小于 ${formatInt(10)} 时，达到永恒。`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(107).isUnlocked ? DC.D1 : (Currency.infinities.gte(10) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 108,
    name: "9 是买得起的！",
    get description() { return `在 ${formatInt(9)} 个复制器时永恒。`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(107).isUnlocked ? DC.D1 : (Replicanti.amount.round().neq(9) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 111,
    name: "渐入佳境",
    get description() {
      return `在你过去的 ${formatInt(10)} 次无限中，每次无限至少比上一次无限的无限点数高 ${format(DC.NUMMAX, 1, 0)} 倍。`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(DC.NUMMAX))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "购买维度提升或反物质星系时，不会重置反物质的数量。",
    progress: () => {
      let infinf = 0;
      const rinfinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < rinfinities.length - 1; i++) {
        if (rinfinities[i].gte(rinfinities[i + 1].times(DC.NUMMAX))) infinf++;
      }
      return Achievement(111).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(infinf).div(9), 0, 1);
    }
  },
  {
    id: 112,
    name: "一去不返",
    get description() { return `所有无限挑战的用时之和小于 ${formatInt(750)} 毫秒。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds.lt(750),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(112).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(750).div(Time.infinityChallengeSum.totalMilliseconds), 0, 1)
  },
  {
    id: 113,
    name: "永恒是新的无限",
    get description() { return `在 ${formatInt(250)} 毫秒内达到永恒。`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds.lte(250),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `多获得 ${formatX(3)} 倍的永恒次数`; },
    effect: () => player.disablePostReality ? 1 : 3,
    progress: () => Achievement(113).isUnlocked ? DC.D1 : (Time.thisEternity.totalMilliseconds.gt(250) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 114,
    name: "折戟沉沙",
    description: "永恒挑战失败一次。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "成就感逐渐消失。",
    effect: () => "Sense of accomplishment (fading)",
    progress: () => {
      if (Achievement(114).isUnlocked) return DC.D1;
      if (!EternityChallenge(4).isRunning || !EternityChallenge(12).isRunning) return DC.DM1;
      if (EternityChallenge(4).isRunning) return Decimal.clamp(Currency.infinities.value.div(EternityChallenge(4)._config.restriction(EternityChallenge(4).completions).add(1)), 0, 1);
      return Decimal.clamp(Time.thisEternity.totalSeconds.div(EternityChallenge(12)._config.restriction(EternityChallenge(12).completions)), 0, 1);
    }
  },
  {
    id: 115,
    name: "双重挑战",
    description: "在一个永恒挑战中开始一个无限挑战。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    progress: () => Achievement(115).isUnlocked ? DC.D1 : (!EternityChallenge.current ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(2000), 0, 1))
  },
  {
    id: 116,
    name: "无需无限",
    get description() { return `无限次数小于或等于 ${formatInt(1)} 时，达到永恒。`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "无限点数获得基于无限次数的倍数加成。",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (购买时间研究 131 后：${mult})`
        : mult;
    },
    progress: () => Achievement(116).isUnlocked ? DC.D1 : (Currency.infinities.gte(1) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 117,
    name: "维度提升现已上架华润万家！",
    get description() { return `一次购买 ${formatInt(750)} 个维度提升。`; },
    checkRequirement: ([bulk]) => bulk.gte(750),
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `维度提升对反物质维度的倍率提升 ${formatPercents(0.01)}.`;
    },
    effect: () => player.disablePostReality ? 1 : 1.01,
    progress: () => Achievement(117).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.maxBuyableDimBoostsAfterCap.div(750), 0, 1)
  },
  {
    id: 118,
    name: "超过九千",
    get description() { return `维度献祭提供的倍数加成达到 ${formatPostBreak(DC.E9000)}.`; },
    checkRequirement: () => Sacrifice.totalBoost.add(1).log10().gte(9000),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `维度献祭不会重置反物质维度。已启用的自动购买器在每个时间间隔进行一次购买。`,
    progress: () => Achievement(118).isUnlocked ? DC.D1 : Decimal.clamp(Sacrifice.totalBoost.add(1).log10().div(9000), 0, 1)
  },
  {
    id: 121,
    name: "无限的无限点数",
    get description() { return `达到 ${formatPostBreak("1e30008")} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(30008),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(121).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(30008), 0, 1)
  },
  {
    id: 122,
    name: "你已经死了。",
    description: "不购买第二维度至第八维度达到永恒。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(122).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.onlyAD1 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 123,
    name: "5 个永恒后更新",
    get description() { return `完成 ${formatInt(50)} 个不同的永恒挑战。`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    progress: () => Achievement(123).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EternityChallenges.completions).div(50), 0, 1)
  },
  {
    id: 124,
    name: "细水长流",
    get description() {
      return `在单次无限中，你每秒获得的无限之力数量超过你拥有的无限之力，并持续 ${formatInt(60)} 秒。`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => {
      //This is a rough estimate that should work but we'll see
      let isec = 0;
      if (AchievementTimers.marathon2.check(!EternityChallenge(7).isRunning && InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value), 1)) isec++;
      else isec = 0;
      return Achievement(124).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(isec).div(60), 0, 1);
    }
  },
  {
    id: 125,
    name: "饕餮盛宴",
    get description() {
      return `没有任何无限次数，并且没有第一反物质维度，在当前永恒中达到 ${format(DC.E90)} 无限点数。`;
    },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(90) &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于本次无限中花费的时间，给予无限点倍数加成。",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds.times(10).plus(1);
      return player.disablePostReality ? DC.D1 : DC.D2.pow(Decimal.ln(thisInfinity).times(Decimal.min(Decimal.pow(thisInfinity, 0.11), 500)));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(125).isUnlocked ? DC.D1 : ((!player.requirementChecks.eternity.noAD1 || !Currency.infinities.eq(0)) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(90), 0, 1))
  },
  {
    id: 126,
    name: "流行音乐",
    get description() { return `复制器星系数量是反物质星系的 ${formatInt(180)} 倍。`; },
    checkRequirement: () => Replicanti.galaxies.total.gte(player.galaxies.times(180)) && player.galaxies.gt(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `获得复制器星系时，你的复制器数量将除以 ${format(DC.NUMMAX, 1, 0)} ，而不是重置为 ${formatInt(1)}.`;
    },
    progress: () => Achievement(126).isUnlocked ? DC.D1 : (player.galaxies.lte(0) ? DC.DM1 : Decimal.clamp(Replicanti.galaxies.total.div(player.galaxies.times(180)), 0, 1))
  },
  {
    id: 127,
    name: "天外有天？",
    get description() { return `达到 ${format(DC.NUMMAX, 1, 0)} 永恒点数。`; },
    checkRequirement: () => Currency.eternityPoints.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(127).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 128,
    name: "我怎么才能摆脱你呢？",
    get description() { return `无需任何时间研究达到 ${formatPostBreak("1e22000")} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(22000) && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "时间维度的当前产量等于原有产量和你拥有的时间研究数量的乘积。",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`,
    progress: () => Achievement(128).isUnlocked ? DC.D1 : (player.timestudy.studies.length !== 0 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(22000), 0, 1))
  },
  {
    id: 131,
    name: "不道德的消费",
    get description() { return `获得 ${format(DC.E9, 3)} 储存的无限次数。`; },
    checkRequirement: () => Currency.infinitiesBanked.gte(DC.E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `多获得 ${formatX(2)} 倍的无限次数，同时 ${formatPercents(0.05)} 的无限次数在永恒之后转化为储存的无限次数。`;
    },
    effects: {
      infinitiesGain: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23) ? 1 : 2,
      bankedInfinitiesGain: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23)
        ? DC.D0 : Currency.infinities.value.times(0.05).floor()
    },
    progress: () => Achievement(131).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinitiesBanked.value.div(1e9), 0, 1)
  },
  {
    id: 132,
    name: "独特雪花",
    get description() {
      return `在本次永恒中，获得${formatInt(569)}个反物质星系，且没有任何复制器星系。`;
    },
    checkRequirement: () => player.galaxies.gte(569) && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "超光速粒子和膨胀时间获得基于反物质星系的倍数加成。",
    effect: () => player.disablePostReality ? 1 : Decimal.max(Decimal.pow(player.galaxies, 0.04), 1).times(1.22).toNumber(),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(132).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.noRG ? DC.DM1 : Decimal.clamp(player.galaxies.div(569), 0, 1))
  },
  {
    id: 133,
    name: "反正我从来不喜欢无限这玩意",
    get description() {
      return `不购买无限维度和 ${formatX(2)} 无限点倍增升级，达到 ${formatPostBreak(DC.E200000)} 无限点数。`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount.eq(0)) &&
      player.IPMultPurchases.eq(0) &&
      Currency.infinityPoints.value.add(1).log10().gte(200000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "开始永恒时，所有无限挑战解锁且已完成。",
    progress: () => Achievement(133).isUnlocked ? DC.D1 : ((!Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) || player.IPMultPurchases.neq(0)) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(200000), 0, 1))
  },
  {
    id: 134,
    name: "得寸进尺",
    get description() { return `达到 ${formatPostBreak("1e15000")} 个复制器。`; },
    checkRequirement: () => Replicanti.amount.add(1).log10().gte(15000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `在少于${replicantiCap()}复制器时，你获得复制器的速度为${formatInt(2)}倍。`;
    },
    progress: () => Achievement(134).isUnlocked ? DC.D1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(15000), 0, 1)
  },
  {
    id: 135,
    name: "比土豆^286078还快。",
    get description() { return `计数频率超过 ${formatPostBreak("1e8296262")} 每秒。`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-8296262),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(135).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(8296262), 0, 1)
  },
  {
    id: 136,
    name: "我跟你讲，时间是相对的",
    description: "进入时间膨胀",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    progress: () => Achievement(136).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EternityChallenge(11).completions).div(20).min(0.25).add(new Decimal(EternityChallenge(12).completions).div(20).min(0.25)).add(player.timestudy.maxTheorem.div(51600).min(0.25)).add(player.timestudy.theorem.div(20000).min(0.25)), 0, 1)
  },
  {
    id: 137,
    name: "你终于考虑到时间膨胀了！",
    get description() {
      return `时间膨胀时，在 ${formatInt(1)} 分钟内获得 ${formatPostBreak("1e260000")} 反物质。`;
    },
    checkRequirement: () =>
      Currency.antimatter.value.add(1).log10().gte(260000) &&
      Time.thisEternity.totalMinutes.lte(1) &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `在时间膨胀中获得的膨胀时间和时间之理 ${formatX(2)}.`; },
    effect: () => player.disablePostReality ? 1 : (player.dilation.active ? 2 : 1),
    progress: () => Achievement(137).isUnlocked ? DC.D1 : ((!player.dilation.active || Time.thisEternity.totalMinutes.gt(1)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(260000), 0, 1))
  },
  {
    id: 138,
    name: "这是我为了摆脱你必须做的事。",
    get description() {
      return `时间膨胀时，无需任何时间研究达到 ${formatPostBreak("1e26000")} 无限点数。`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.value.add(1).log10().gte(26000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "移除活跃和挂机路径中时间研究 131 和 133 中的削弱项目。",
    progress: () => Achievement(138).isUnlocked ? DC.D1 : ((!player.dilation.active || player.timestudy.studies.length !== 0) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(26000), 0, 1))
  },
  {
    id: 141,
    name: "回归现实",
    description: "进行一次现实。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `无限点数 ${formatX(4)}, 购买 ${formatInt(10)} 个反物质维度的倍数加成 +${format(0.1, 0, 1)}.`;
    },
    effects: {
      ipGain: () => player.disablePostReality ? 1 : 4,
      buyTenMult: () => player.disablePostReality ? 0 : 0.1
    },
    progress: () => Achievement(141).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1)
  },
  {
    id: 142,
    name: "这怎么用？",
    description: "解锁自动机。",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `维度提升的效果增强 ${formatPercents(0.5)}.`; },
    effect: () => player.disablePostReality ? 1 : 1.5,
    progress: () => Achievement(142).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AutomatorPoints.totalPoints).div(100), 0, 1)
  },
  {
    id: 143,
    name: "出神入化",
    get description() {
      return `在你过去的 ${formatInt(10)} 次永恒中，每次永恒至少比上一次永恒后获得的永恒点数高 ${format(DC.NUMMAX, 1, 0)} 倍。`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(DC.NUMMAX))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "购买星系不再重置维度提升。",
    progress: () => {
      let infete = 0;
      const reternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < reternities.length - 1; i++) {
        if (reternities[i].gte(reternities[i + 1].times(DC.NUMMAX))) infete++;
      }
      return Achievement(143).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(infete).div(9), 0, 1);
    }
  },
  {
    id: 144,
    name: "这是《星际穿越》的梗吗？",
    description: "解锁黑洞。",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
    progress: () => Achievement(144).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.div(100), 0, 1)
  },
  {
    id: 145,
    name: "本末倒置",
    description: "单个黑洞的冷却时间小于其持续时间。",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `黑洞的冷却时间缩短 ${formatPercents(0.1)}.`; },
    effect: () => player.disablePostReality ? 1 : 0.9,
    progress: () => Achievement(145).isUnlocked ? DC.D1 : Decimal.clamp(Decimal.max(new Decimal(BlackHole(1).duration).div(new Decimal(BlackHole(1).interval).max(0.000001)), new Decimal(BlackHole(2).duration).div(new Decimal(BlackHole(2).interval).max(0.000001))), 0, 1)
  },
  {
    id: 146,
    name: "伟大复兴",
    description: "购买复兴树的所有节点。",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `符文稀有度 +${formatPercents(0.01)}.`; },
    effect: () => player.disablePostReality ? 0 : 1,
    progress: () => Achievement(146).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.reality.perks.size).div(Perks.all.length), 0, 1)
  },
  {
    id: 147,
    name: "现实专精",
    description: "购买所有的现实升级。",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "解锁现实之神特蕾莎。",
    progress: () => Achievement(147).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(RealityUpgrades.all.filter(u => u.isBought || u.boughtAmount > 0).length).div(RealityUpgrades.all.length), 0, 1)
  },
  {
    id: 148,
    name: "皇家同花顺",
    description: "装备每种基本类型的符文各一个时，达成现实。",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "基于已装备符文类型的数量，提升符文等级。",
    effect: () => player.disablePostReality ? 0 : (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`,
    progress: () => Achievement(148).isUnlocked ? DC.D1 : (!BASIC_GLYPH_TYPES.every(type => Glyphs.activeList.some(g => g.type === type)) ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 151,
    name: "你真的 8 需要",
    get description() {
      return `在一次无限中，不购买第八反物质维度，获得 ${formatInt(800)} 个反物质星系。`;
    },
    checkRequirement: () => player.galaxies.gte(800) && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "解锁成就之神薇。",
    progress: () => Achievement(151).isUnlocked ? DC.D1 : (!player.requirementChecks.infinity.noAD8 ? DC.DM1 : Decimal.clamp(player.galaxies.div(800), 0, 1))
  },
  {
    id: 152,
    name: "还有更多的符文吗？",
    get description() { return `符文仓库中有 ${formatInt(100)} 个符文。`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    progress: () => Achievement(152).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Glyphs.inventoryList.length).div(100), 0, 1)
  },
  {
    id: 153,
    name: "无需贵物",
    description: "在现实全程不生产反物质的情况下，进行现实。",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    progress: () => Achievement(153).isUnlocked ? DC.D1 : (!player.requirementChecks.reality.noAM ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 154,
    name: "多快才叫快",
    get description() { return `在游戏内时间 ${formatInt(5)} 秒内达成现实。`; },
    checkRequirement: () => Time.thisReality.totalSeconds.lte(5),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `现实时有 ${formatPercents(EndgameMastery(41).isBought ? 1 : 0.1)} 的概率，获得的现实次数和复兴点数 ${formatX(2)}.`;
    },
    effect: () => player.disablePostReality ? 0 : (EndgameMastery(41).isBought ? 1 : 0.1),
    progress: () => Achievement(154).isUnlocked ? DC.D1 : (Time.thisReality.totalSeconds.gt(5) ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 155,
    name: "成就 #15983",
    get description() { return `游戏内时间达到 ${formatInt(137, 1)} 亿年。`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears.gt(13.7e9),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `黑洞的持续时间延长 ${formatPercents(0.1)}。`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(155).isUnlocked ? DC.D1 : Decimal.clamp(Time.totalTimePlayed.totalYears.div(13.7e9), 0, 1)
  },
  {
    id: 156,
    name: "世界一流退学",
    description: "不购买时间之理，进行现实。",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `生产的时间之理 ${formatX(2.5, 0, 1)}, 同时获得一张免费的麦当劳™优惠券。`; },
    effect: () => player.disablePostReality ? 1 : 2.5,
    progress: () => Achievement(156).isUnlocked ? DC.D1 : (!player.requirementChecks.reality.noPurchasedTT ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 157,
    name: "效果拔群！",
    get description() { return `获得一个 ${formatInt(4)} 词条的符文。`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    progress: () => Achievement(157).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Glyphs.activeList.concat(Glyphs.inventoryList).map(glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0).filter(effect => effect.isGenerated).length).max()).div(4), 0, 1)
  },
  {
    id: 158,
    name: "无底深渊",
    description: "两个黑洞永久启动。",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `黑洞强度增加 ${formatPercents(0.1)}.`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(158).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(BlackHoles.list.filter(b => b.isPermanent).length).div(2), 0, 1)
  },
  {
    id: 161,
    name: "小伙子，你来错地儿了",
    get description() { return `时间膨胀时获得 ${formatPostBreak(DC.E1E8)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(100000000) && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(161).isUnlocked ? DC.D1 : (!player.dilation.active ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(100000000), 0, 1))
  },
  {
    id: 162,
    name: "终得圆满",
    description: "一次性购买所有的时间研究。",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(162).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.timestudy.studies.length).div(58), 0, 1)
  },
  {
    id: 163,
    name: "这其实超简单的！只是有亿点麻烦！",
    get description() {
      return `单次现实中，在游戏内时间 ${formatInt(1)} 秒内，完成所有的永恒挑战 ${formatInt(5)} 次。`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds.lte(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(163).isUnlocked ? DC.D1 : (Time.thisReality.totalSeconds.gt(1) ? DC.DM1 : Decimal.clamp(new Decimal(EternityChallenges.completions).div(60), 0, 1))
  },
  {
    id: 164,
    name: "无限的无限",
    get description() { return `无限次数达到 ${format(DC.NUMMAX, 1)}.`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `获得的无限次数 ${formatX(1024)}.`; },
    effect: () => player.disablePostReality ? 1 : 1024,
    progress: () => Achievement(164).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinitiesTotal.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 165,
    name: "完美平衡",
    get description() { return `各个符文等级因子的权重相等时，获得一个等级为 ${formatInt(5000)} 的符文。`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel.gte(5000) &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "你可以自动调整符文等级因子的权重。",
    progress: () => Achievement(165).isUnlocked ? DC.D1 : (!["repl", "dt", "eternities"].every(i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep) ? DC.DM1 : Decimal.clamp(gainedGlyphLevel().actualLevel.div(5000), 0, 1))
  },
  {
    id: 166,
    name: "不错不错。",
    get description() { return `获得一个等级恰好为 ${formatInt(6969)} 的符文。`; },
    checkRequirement: () => Decimal.modulo(gainedGlyphLevel().actualLevel, 10000).eq(6969),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `符文等级 +${formatInt(69)}.`; },
    effect: () => player.disablePostReality ? 0 : 69,
    progress: () => Achievement(166).isUnlocked ? DC.D1 : (gainedGlyphLevel().actualLevel.lte(6969) ? Decimal.clamp(gainedGlyphLevel().actualLevel.div(6969), 0, 1) : Decimal.clamp(Decimal.mod(gainedGlyphLevel().actualLevel.sub(6969), 10000).div(10000), 0, 1))
  },
  {
    id: 167,
    name: "层级先生？抱歉，您不在名单上。",
    get description() { return `达到 ${format(DC.NUMMAX, 1, 0)} 现实机器。`; },
    checkRequirement: () => Currency.realityMachines.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于当前现实机器的数量，获得更多的现实机器。",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.clampMin(1, Currency.realityMachines.value.add(1).log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(167).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 168,
    name: "行百里者半五十",
    get description() { return `太阳神的总记忆等级达到 ${formatInt(50)}.`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `你可以多获得 ${formatPercents(0.1)} 的记忆。`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(168).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Ra.totalPetLevel).div(50), 0, 1)
  },
  {
    id: 171,
    name: "诸神之悦",
    description: "献祭所有种类可献祭的符文至少一次。",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s.gt(0)),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `符文献祭的效果 ${formatX(2)}.`; },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(171).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Object.values(player.reality.glyphs.sac).filter(s => s.gt(0)).length).div(7), 0, 1)
  },
  {
    id: 172,
    name: "现实漫游指南",
    get description() {
      return `不充能无限升级、不装备符文、不购买任何三体研究时，一次现实获得至少${format(DC.NUMMAX, 1)}现实机器。`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(DC.NUMMAX) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    progress: () => Achievement(172).isUnlocked ? DC.D1 : ((player.celestials.ra.charged.size !== 0 || Glyphs.activeWithoutCompanion.length !== 0 || !player.requirementChecks.reality.noTriads) ? DC.DM1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 173,
    name: "还是一个不存在的成就",
    get description() { return `达到 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 现实机器。`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(173).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 174,
    name: "这个啊，您不是有两个了吗？",
    description: "获得一个奇点。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    progress: () => Achievement(174).isUnlocked ? DC.D1 : Decimal.clamp(Currency.darkEnergy.value.div(200), 0, 1)
  },
  {
    id: 175,
    name: "第一个反历史学家",
    get description() { return `所有的炼金资源达到 ${formatInt(25000)}。`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= 25000),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `炼金资源“协同”的效果可以大于 ${formatPercents(1)}, 炼金资源“动量”效果的增速 ${formatX(10)}.`;
    },
    effect: () => player.disablePostReality ? 1 : 10,
    progress: () => Achievement(175).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(21), 0, 1)
  },
  {
    id: 176,
    name: "妈妈已经数到 3 了",
    description: "进行一次暗物质湮灭",
    progress: () => Achievement(176).isUnlocked ? DC.D1 : Decimal.clamp((ImaginaryUpgrade(19).isBought ? new Decimal(2/3) : (player.requirementChecks.reality.maxStudies > 8 ? DC.D0 : Tickspeed.continuumValue.div(11.55e6).min(1/3)).add(Currency.imaginaryMachines.value.div(8.4e10).min(1/3))).add(Currency.darkMatter.value.add(1).log10().div(180).min(1/3)), 0, 1)
  },
  {
    id: 177,
    name: "难如登天的一英里",
    description: "解锁原版所有的奇点里程碑至少一次。",
    checkRequirement: () => SingularityMilestone.tesseractMultFromSingularities.completions.gt(0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
    progress: () => Achievement(177).isUnlocked ? DC.D1 : Decimal.clamp(Currency.singularities.value.add(1).log10().div(Decimal.log10(4e44)), 0, 1)
  },
  {
    id: 178,
    name: "灭世者",
    get description() { return `获得 ${formatInt(100000)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies.gte(100000),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `星系增强 ${formatPercents(0.01)}.`; },
    effect: () => player.disablePostReality ? 1 : 1.01,
    progress: () => Achievement(178).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(100000), 0, 1)
  },
  {
    id: 181,
    displayId: 666,
    name: "永恒的反物质维度",
    description: "毁灭你的现实。",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(181).isUnlocked ? DC.D1 : Decimal.clamp((ImaginaryUpgrade(25).isBought ? new Decimal(0.5) : Currency.imaginaryMachines.value.div(6.4e15).min(0.25).add((!Laitela.isRunning || Laitela.maxAllowedDimension !== 0 || Glyphs.activeWithoutCompanion.length > 1) ? DC.D0 : Currency.eternityPoints.value.add(1).log10().div(16000).min(0.25))).add(new Decimal(Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked))).div(68).min(0.25)).add(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(84).min(0.25)), 0, 1)
  },
  {
    id: 182,
    name: "再来一遍",
    description: "重获自动购买所有反物质维度的能力。",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(182).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp((PelleUpgrade.antimatterDimAutobuyers1.canBeApplied ? new Decimal(0.5) : DC.D0).add(PelleUpgrade.antimatterDimAutobuyers2.canBeApplied ? new Decimal(0.5) : DC.D0), 0, 1))
  },
  {
    id: 183,
    name: "似曾相识",
    description: "在被毁灭的现实中，完成无限挑战5.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    get reward() { return `所有的反物质维度 ${formatPow(1.1012920825630384, 0, 3)}`; },
    effect: () => player.disablePostReality ? 1 : 1.1012920825630384,
    progress: () => Achievement(183).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(36000).min(0.5).add(!InfinityChallenge(5).isRunning ? DC.D0 : player.antimatter.max(1).log10().div(33000).min(0.5)), 0, 1))
  },
  {
    id: 184,
    name: "三振出局！",
    description: "发生三次佩勒冲击。",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    progress: () => Achievement(184).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 185,
    name: "八十又七年前",
    description: "发生四次佩勒冲击。",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    progress: () => Achievement(185).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.timestudy.maxTheorem.div(115), 0, 1))
  },
  {
    id: 186,
    displayId: 181,
    name: "病态的爱",
    description: "在被毁灭的现实中，购买时间研究 181。",
    progress: () => Achievement(186).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp((TimeStudy(171).isBought ? new Decimal(0.5) : player.timestudy.maxTheorem.div(186).min(0.5)).add(!TimeStudy(171).isBought ? DC.D0 : player.timestudy.theorem.div(400).min(0.5)), 0, 1))
  },
  {
    id: 187,
    name: "膨胀时间持有者",
    description: "在被毁灭的现实中，解锁时间膨胀。",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    get reward() {
      return `可重复购买的膨胀升级的加成倍率 ${formatX(1.35, 0, 2)}。`;
    },
    effect: () => player.disablePostReality ? 1 : 1.35,
    progress: () => Achievement(187).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(new Decimal(EternityChallenge(11).completions).div(20).min(0.25).add(new Decimal(EternityChallenge(12).completions).div(20).min(0.25)).add(player.timestudy.maxTheorem.div(51600).min(0.25)).add(player.timestudy.theorem.div(20000).min(0.25)), 0, 1))
  },
  {
    id: 188,
    name: "剧终",
    description: "逃离被毁灭的现实。",
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(9e15) && Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(188).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().div(9e15), 0, 1))
  },
  {
    id: 191,
    name: "...先这样吧",
    description: "在第二次终局中购买第一维度。",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && AntimatterDimension(1).amount.gte(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(191).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(player.antimatter.max(1).log10().div(2).min(0.5)), 0, 1)
  },
  {
    id: 192,
    name: "对抗命运",
    description: "第二次毁灭你的现实。",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(192).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add((ImaginaryUpgrade(25).isBought ? new Decimal(0.5) : Currency.imaginaryMachines.value.div(6.4e15).min(0.25).add((!Laitela.isRunning || Laitela.maxAllowedDimension !== 0 || Glyphs.activeWithoutCompanion.length > 1) ? DC.D0 : Currency.eternityPoints.value.add(1).log10().div(16000).min(0.25))).add(new Decimal(Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked))).div(68).min(0.25)).add(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(84).min(0.25)).div(2)), 0, 1)
  },
  {
    id: 193,
    name: "永不停歇",
    description: "第二次逃离被毁灭的现实。",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && Currency.antimatter.value.add(1).log10().gte(9e15) && Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `星系增强 ${formatPercents(0.1)}。`;
    },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(193).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(!Pelle.isDoomed ? DC.D0 : player.antimatter.max(1).log10().div(18e15).min(0.5)), 0, 1)
  },
  {
    id: 194,
    name: "？！时间是相对的！？",
    description: "打破永恒。",
    checkRequirement: () => player.break2,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(194).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(player.antimatter.max(1).log10().div(18e15).min(0.5)), 0, 1)
  },
  {
    id: 195,
    name: "系统错误",
    description: "在一个小时内达成终局。",
    checkRequirement: () => player.records.bestEndgame.realTime < 3600000,
    checkEvent: GAME_EVENT.ENDGAME_RESET_AFTER,
    progress: () => Achievement(195).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(3600000).div(player.records.bestEndgame.realTime), 0, 1)
  },
  {
    id: 196,
    name: "终于回来了",
    description: "在被毁灭的现实中重获前18行成就。",
    checkRequirement: () => PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length >= 33,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `你可以装备鹿颈长和现实符文各 ${formatInt(2)} 个。`;
    },
    progress: () => Achievement(196).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length).div(33), 0, 1)
  },
  {
    id: 197,
    name: "停下，这不合法。",
    get description() { return `持有一个等级大于等于 ${formatInt(25001)} 的现实符文。` },
    checkRequirement: () => Glyphs.inventoryList.filter(g => g.type === 'reality' && g.level.gte(25001)).length > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(197).isUnlocked ? DC.D1 : Decimal.clamp(player.records.totalAntimatter.add(1).log10().add(1).log10().div(100).min(0.5).add(new Decimal(player.records.bestReality.glyphLevel).div(150006).min(0.5)), 0, 1)
  },
  {
    id: 198,
    name: "...漫漫岁月层层叠叠，又层层叠叠...",
    get description() { return `在停止激发天界物质时游戏速度达到 ${format(DC.NUMMAX, 1)} 。` },
    checkRequirement: () => getGameSpeedupForDisplay().gte(DC.NUMMAX) && player.endgame.celestialMatterMultiplier.isActive === false,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(198).isUnlocked ? DC.D1 : (player.endgame.celestialMatterMultiplier.isActive ? DC.DM1 : Decimal.clamp(getGameSpeedupForDisplay().max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 201,
    name: "又是新的开始",
    description: "开始生产星系之力。",
    checkRequirement: () => GalacticPower.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(201).isUnlocked ? DC.D1 : Decimal.clamp(Currency.singularities.value.add(1).log10().div(300), 0, 1)
  },
  {
    id: 202,
    name: "重装游戏...又重进了服务器",
    description: "购买所有终局专精。",
    checkRequirement: () => player.endgameMasteries.masteries.length >= 39,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(202).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgameMasteries.masteries.length).div(39), 0, 1)
  },
  {
    id: 203,
    name: "比膨胀的土豆还快",
    get description() { return `计数频率超过 ${formatPostBreak("ee29")} 每秒。`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-1e29),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(203).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(1e29), 0, 1)
  },
  {
    id: 204,
    name: "艰难的复原",
    description: "购买所有佩勒削弱升级。",
    checkRequirement: () => PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length >= 33 &&
      PelleDestructionUpgrade.all.filter(u => u.canBeApplied).length >= 50 &&
      PelleRealityUpgrade.all.filter(u => u.canBeApplied).length >= 20 &&
      PelleImaginaryUpgrade.all.filter(u => u.canBeApplied).length >= 19 &&
      PelleCelestialUpgrade.all.filter(u => u.canBeApplied).length >= 21 &&
      PellePerkUpgrade.all.filter(u => u.canBeApplied).length >= 29 &&
      PelleAlchemyUpgrade.all.filter(u => u.canBeApplied).length >= 21,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `解锁佩勒冲击升级。`;
    },
    progress: () => Achievement(204).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length).div(231).min(1/7).add(new Decimal(PelleDestructionUpgrade.all.filter(u => u.canBeApplied).length).div(350).min(1/7)).add(new Decimal(PelleRealityUpgrade.all.filter(u => u.canBeApplied).length).div(140).min(1/7)).add(new Decimal(PelleImaginaryUpgrade.all.filter(u => u.canBeApplied).length).div(133).min(1/7)).add(new Decimal(PelleCelestialUpgrade.all.filter(u => u.canBeApplied).length).div(147).min(1/7)).add(new Decimal(PellePerkUpgrade.all.filter(u => u.canBeApplied).length).div(203).min(1/7)).add(new Decimal(PelleAlchemyUpgrade.all.filter(u => u.canBeApplied).length).div(147).min(1/7)), 0, 1)
  },
  {
    id: 205,
    name: "仰望星空",
    description: "遁入缥缈。",
    checkRequirement: () => Ethereal.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(205).isUnlocked ? DC.D1 : Decimal.clamp(Currency.galacticPower.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 206,
    name: "主宰黑暗",
    description: "购买第八暗物质维度。",
    checkRequirement: () => ImaginaryUpgrade(29).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `降低星系生成器的不稳定性 ${formatInt(2)} 。`;
    },
    effect: () => player.disablePostReality ? 0 : 2,
    progress: () => Achievement(206).isUnlocked ? DC.D1 : Decimal.clamp((GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) : Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies)).add(1).log10().div(150).min(0.5).add(Currency.imaginaryMachines.value.add(1).log10().div(400).min(0.5)), 0, 1)
  },
  {
    id: 207,
    name: "一去不返...",
    description: "毁灭佩勒。",
    checkRequirement: () => PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length >= 5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `提高天界点数获取量。`;
    },
    progress: () => Achievement(207).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length).div(5), 0, 1)
  },
  {
    id: 208,
    name: "...但别忘了",
    get description() { return `达到 ${format(DC.NUMMAX, 1, 0)} 虚幻机器。` },
    checkRequirement: () => Currency.imaginaryMachines.value.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `基于稳定天界物质数量，给予天界物质转换指数很小的倍数。`;
    },
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.unnerfedCelestialMatter.value.add(1).log10().add(1)).add(1), 0.1).toNumber(),
    formatEffect: value => `${formatX(value, 2, 3)}`,
    progress: () => Achievement(208).isUnlocked ? DC.D1 : Decimal.clamp(Currency.imaginaryMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 211,
    name: "犯错了？",
    get description() { return `进入阿尔法的现实。` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(211).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length).div(10).min(0.5).add(Currency.imaginaryMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX).times(2)).min(0.5)), 0, 1)
  },
  {
    id: 212,
    name: "黑暗的坍缩",
    get description() { return `在阿尔法的现实中达到无限。` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `阿尔法削弱冷却减少 ${formatX(1.1, 1, 1)} 。`;
    },
    effect: 1.1,
    progress: () => Achievement(212).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 213,
    name: "永远不放弃",
    get description() { return `在阿尔法的现实中达到永恒。` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() {
      return `基于重构机器减少阿尔法削弱冷却。`;
    },
    effect: () => Decimal.max(Decimal.ln(Decimal.ln(Currency.dualMachines.value.add(1)).add(1)), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(213).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 214,
    name: "永不满足！",
    get description() { return `达到 ${formatPostBreak("e1e10")} 复制器。` },
    checkRequirement: () => player.replicanti.amount.gte("e1e10"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(214).isUnlocked ? DC.D1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(1e10), 0, 1)
  },
  {
    id: 215,
    name: "作用域错误",
    get description() { return `达到 ${format(DC.NUMMAX, 1, 0)} 天界点数。` },
    checkRequirement: () => Currency.celestialPoints.value.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(215).isUnlocked ? DC.D1 : Decimal.clamp(Currency.celestialPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 216,
    name: "又双叒叕是一个不存在的成就",
    get description() { return `达到 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 虚幻机器。` },
    checkRequirement: () => player.reality.imaginaryMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `基于虚幻机器基于缥缈之力一个很小的倍数加成。`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Decimal.log10(player.reality.imaginaryMachines.add(1)).div(1000), 5).times(1000),
    formatEffect: value => `${formatX(value, 3)}`,
    progress: () => Achievement(216).isUnlocked ? DC.D1 : Decimal.clamp(Currency.imaginaryMachines.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 217,
    name: "你怎么还在这里...",
    get description() { return `达成 ${format(1e12, 2, 2)} 次终局。` },
    checkRequirement: () => player.endgames >= 1e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(217).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(1e12), 0, 1)
  },
  {
    id: 218,
    name: "...只是为了受难吗？",
    get description() { return `在无名氏的现实内达到 ${formatPostBreak("ee50")} 反物质。` },
    checkRequirement: () => Currency.antimatter.value.gte("ee50") && Enslaved.isRunning,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(218).isUnlocked ? DC.D1 : (!Enslaved.isRunning ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(50), 0, 1))
  },
  {
    id: 221,
    name: "重见天日",
    get description() { return `击败阿尔法。` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `解锁天界维度扩展。`;
    },
    progress: () => Achievement(221).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 222,
    name: "时间是绝对的。",
    get description () { return `超光速粒子的数量超过膨胀时间, 且两者数量均超过 ${format("1e5000", 2)} 。` },
    checkRequirement: () => Currency.tachyonParticles.value.gt(Currency.dilatedTime.value) && Currency.dilatedTime.value.gt("1e5000"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `炼金资源“动量”效果的增速提高 ${formatX(10)} 倍。`;
    },
    effect: () => player.disablePostReality ? 1 : 10,
    progress: () => Achievement(222).isUnlocked ? DC.D1 : Decimal.clamp(Currency.dilatedTime.value.add(1).log10().div(10000).min(0.5).add(Currency.dilatedTime.value.lte("1e5000") ? DC.D0 : Currency.tachyonParticles.value.add(1).log10().div(Currency.dilatedTime.value.add(1).log10().times(2)).min(0.5)), 0, 1)
  },
  {
    id: 223,
    name: "力量！无限的力量！",
    get description() { return `无限维度的购买上限超过 ${format(DC.NUMMAX, 1, 0)} 。` },
    checkRequirement: () => InfinityDimensions.totalDimCap.gt(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `终局后保留无限升级充能。`;
    },
    progress: () => Achievement(223).isUnlocked ? DC.D1 : Decimal.clamp(InfinityDimensions.totalDimCap.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 224,
    name: "宇宙吞噬者",
    get description() { return `在佩勒的现实外达到 ${formatPostBreak(Decimal.pow10(1e100), 2)} 反物质。` },
    checkRequirement: () => Currency.antimatter.value.gte(Decimal.pow10(1e100)) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `天界物质的转换指数翻倍。`;
    },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(224).isUnlocked ? DC.D1 : (Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(100), 0, 1))
  },
  {
    id: 225,
    name: "299792458米每秒",
    description: "令天界物质的数量突破无限。",
    checkRequirement: () => player.endgame.celDimExpansion.isBroken,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `天界物质的软上限降低 ${formatPercents(0.05)} 。`;
    },
    effect: () => player.disablePostReality ? 1 : 0.95,
    progress: () => Achievement(225).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialInfinityPoints.div(10000), 0, 1)
  },
  {
    id: 226,
    name: "三万度",
    description: "解锁星辰。",
    checkRequirement: () => player.endgame.ethereal.isExtended,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(226).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.ethereal.power.add(1).log10().div(25), 0, 1)
  },
  {
    id: 227,
    name: "它们是怎么存在的？？？",
    description: "获得一个超五方体。",
    checkRequirement: () => player.endgame.hypercubes.penteracts >= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `解锁鹿颈长的第二商店。`;
    },
    progress: () => Achievement(227).isUnlocked ? DC.D1 : Decimal.clamp((DualityUpgrade(25).isBought ? new Decimal(0.75) : new Decimal(player.celestials.laitela.hadrons.dark).div(128).min(0.25).add(Hadrons.timeFactor.div(2000).min(0.25)).add(Currency.dualMachines.value.add(1).log10().div(80).min(0.25))).add(Currency.eternityPoints.value.add(1).log10().add(1).log10().div(420).min(0.25)), 0, 1)
  },
  {
    id: 228,
    name: "回望征途，至此已远",
    get description() { return `达到 ${formatPostBreak(DC.ENUMMAX, 2)} 反物质。` },
    checkRequirement: () => player.antimatter.gte(DC.ENUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `解锁神性。`;
    },
    progress: () => Achievement(228).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 231,
    name: "终局领域大神",
    get description() { return `购买 ${formatInt(1000)} 终局能力。` },
    checkRequirement: () => EndgameSkills.totalPurchased() >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `基于终局能力数量给予反物质维度一个巨大的指数加成，在被毁灭的现实内进一步增强。`;
    },
    effect: () => player.disablePostReality ? 1 : 1 + ((Math.min(EndgameSkills.totalPurchased(), 2000) + (Math.max(Math.log2(EndgameSkills.totalPurchased() / 2000), 0) * 1000)) / (Pelle.isDoomed ? 20000 : 100000)),
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    progress: () => Achievement(231).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EndgameSkills.totalPurchased()).div(1000), 0, 1)
  },
  {
    id: 232,
    name: "寂域千构",
    get description() { return `获得 ${formatInt(1000)} 免费超立方体。` },
    checkRequirement: () => new Decimal(Tesseracts.extra * Tesseracts.totalMult).gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `基于超五方体数量给予永恒点数一个小的指数加成`;
    },
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Penteracts.effectiveCount + 1).div(10).add(1).toNumber(),
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    progress: () => Achievement(232).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Tesseracts.extra * Tesseracts.totalMult).div(1000), 0, 1)
  },
  {
    id: 233,
    name: "永恒之外的终结",
    description: "购买所有打破永恒升级。",
    checkRequirement: () => BreakEternityUpgrade.all.filter(u => u.isCapped).length === 10 &&
      BreakEternityUpgrade.all.filter(u => u.isBought).length === 5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `在被毁灭的现实内反物质指数 ^ ${format(1.4, 2, 1)} 。`;
    },
    effect: () => player.disablePostReality || !Pelle.isDoomed ? 1 : 1.4,
    progress: () => Achievement(233).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(BreakEternityUpgrade.all.filter(u => u.isCapped).length + BreakEternityUpgrade.all.filter(u => u.isBought).length).div(15), 0, 1)
  },
  {
    id: 234,
    name: "和天界群星的最后时光...",
    description: "进行天界永恒。",
    checkRequirement: () => player.endgame.celDimExpansion.celestialEternities.gt(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(234).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialInfinityPoints.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 235,
    name: "无尽黑暗",
    get description() { return `强子化莱特拉的现实 ${formatInt(50)} 次。` },
    checkRequirement: () => Laitela.hadronizes >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `强子效力达到上限所需的时间减半。`;
    },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(235).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Laitela.hadronizes).div(50), 0, 1)
  },
  {
    id: 236,
    name: "超新星",
    get description() { return `太阳神的总记忆记忆达到 ${formatInt(500)}。` },
    checkRequirement: () => Ra.totalPetLevel >= 500,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `记忆获取速度${formatX(500)}`; },
    effect: () => player.disablePostReality ? 1 : 500,
    progress: () => Achievement(236).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Ra.totalPetLevel).div(500), 0, 1)
  },
  {
    id: 237,
    name: "超超新星",
    description: "解锁所有类型的星辰。",
    checkRequirement: () => EtherealStars.gray.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(237).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EtherealStars.all.filter(s => s.isUnlocked).length).div(9), 0, 1)
  },
  {
    id: 238,
    name: "现实的极限",
    get description() { return `达到 ${formatPostBreak(DC.E4000, 2)} 天界永恒点数。` },
    checkRequirement: () => player.endgame.celDimExpansion.celestialEternityPoints.gte(DC.E4000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(238).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialEternityPoints.add(1).log10().div(4000), 0, 1)
  }
];