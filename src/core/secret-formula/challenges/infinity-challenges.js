export const infinityChallenges = [
  {
    id: 1,
    description: `同时进行所有的普通挑战 (挑战9和挑战12除外)。`,
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `每个完成的无限挑战提供 ${formatX(2.3, 1, 1)} 的无限维度倍率`,
      effect: () => Math.pow(2.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => `在你拥有第八反物质维度之后，每隔 ${formatInt(400)}ms 自动进行一次维度献祭。`,
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `解锁自动献祭，并获得更强的献祭加成
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `计数频率的升级总是增加 ${formatX(1)} 。
      但你每次购买计数频率升级时，你的反物质维度会获得一个基于反物质星系数量的倍数加成。`,
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(player.galaxies.times(0.005).add(1.05), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: `反物质维度获得基于反物质星系和计数频率升级的购买数量的加成`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(player.galaxies.times(0.005).add(1.05), Tickspeed.continuumValue)
        : Decimal.pow(player.galaxies.times(0.005).add(1.05), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () =>
      `只有最近一次购买的反物质维度可以正常生产。
      所有其他的反物质维度的产量将下降 (${formatPow(0.25, 2, 2)})。`,
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => `所有反物质维度倍数加成变成原来的 ${formatPow(1.05, 2, 2)} `,
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description:
      `购买第 1-4 反物质维度时，会增加所有价格较小或相等的反物质维度价格。
      购买第 5-8 反物质维度时，会增加所有价格较大或相等的反物质维度价格。`,
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        `星系的加成提升 ${formatPercents(0.1)} ，
        维度提升和反物质星系的需求减少 ${formatInt(1)} 。`,
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () =>
      `一旦你拥有了 ${formatInt(1)} 个第二反物质维度，反物质维度的倍数加成就会被除以指数级增加的物质数量。`,
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "无限维度获得基于计数频率的加成",
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `你不能获得反物质星系，但维度提升的倍数加成增加，最高提升至 ${formatX(10)} 。
      (当前: ${formatX(mult, 2, 1)} )`;
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `维度提升的倍数加成提高到至少 ${formatX(4)}`,
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `购买任何东西后，你的产量会恢复为 ${formatPercents(1)} ，并从此开始迅速下降。`,
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Decimal.max(0, player.records.thisInfinity.time.sub(player.records.thisInfinity.lastBuyTime))),
    reward: {
      description:
        "基于第一和第八维度的倍数，获得第二至第七维度额外倍数",
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02).clampMax(DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11))).pow(Decimal.max(Decimal.pow(5, Decimal.log10(Decimal.log10(AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02)).div(Decimal.log10(DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11)))))), 1)),
      cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11)),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
