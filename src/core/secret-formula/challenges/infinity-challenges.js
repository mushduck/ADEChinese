export const infinityChallenges = [
  {
    id: 1,
    description: `同时进行所有的普通挑战 (挑战9和挑战12除外)。`,
    goal: () => Slabdrill.isCursed ? DC.E420 : DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `每个完成的无限挑战提供 ${Slabdrill.isCursed ? formatX(666) : formatX(2.3, 1, 1)} 的无限维度倍率`,
      effect: () => Math.pow(Slabdrill.isCursed ? 666 : 2.3, InfinityChallenges.completed.length),
      formatEffect: value => (Slabdrill.isCursed ? formatX(value, 2) : formatX(value, 1, 1))
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E1000 : DC.E2000,
  },
  {
    id: 2,
    description: () => `每隔 ${formatInt(400)}ms 自动进行一次维度献祭${Slabdrill.isCursed ? "，其作用类似于没有加成的维度提升重置。" :
      `，前提是你拥有第八${player.universes.current === 2 ? "物质" : "反物质"}维度。`}`,
    goal: () => Slabdrill.isCursed ? DC.E1600 : DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `维度献祭自动购买器，并${Slabdrill.isCursed ? "解锁" : "强化"}维度献祭
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E1620 : DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `计数频率的升级总是增加 ${formatX(1)}。但你每次购买计数频率升级时，${Slabdrill.isCursed ? "你的反物质维度" : `所有${player.universes.current === 2 ? "物质" : "反物质"}维度`}会获得一个固定倍数加成，该加成基于${player.universes.current === 2 ? "物质" : "反物质"}星系数量。`,
    goal: () => Slabdrill.isCursed ? DC.E2600 : DC.E5000,
    isQuickResettable: false,
    effect: () => (Laitela.continuumActive
        ? Decimal.pow(player.galaxies.times(0.005).add(1.05), Tickspeed.continuumValue.times(Slabdrill.isCursed ? 12 : 1))
        : Decimal.pow(player.galaxies.times(0.005).add(1.05), player.totalTickBought.times(Slabdrill.isCursed ? 12 : 1))),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: () => `${player.universes.current === 2 ? "物质" : "反物质"}维度获得基于${player.universes.current === 2 ? "物质" : "反物质"}星系和计数频率购买数量的加成`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(player.galaxies.times(0.005).add(1.05), Tickspeed.continuumValue.times(Slabdrill.isCursed ? 12 : 1))
        : Decimal.pow(player.galaxies.times(0.005).add(1.05), player.totalTickBought.times(Slabdrill.isCursed ? 12 : 1))),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E2200 : DC.E12000,
  },
  {
    id: 4,
    description: () =>
      Slabdrill.isCursed ? `你的反物质维度产量下降（${formatPow(0.25, 2, 2)}）。` :
      `只有最近一次购买的${player.universes.current === 2 ? "物质" : "反物质"}维度可以正常生产。所有其他的${player.universes.current === 2 ? "物质" : "反物质"}维度的产量将下降（${formatPow(0.25, 2, 2)}）。`,
    goal: () => Slabdrill.isCursed ? DC.E600 : DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => Slabdrill.isCursed ? `你的反物质维度倍数加成变成原来的 ${formatPow(1.05, 2, 2)}` :
        `所有${player.universes.current === 2 ? "物质" : "反物质"}维度倍数加成变成原来的 ${formatPow(1.05, 2, 2)}`,
      effect: 1.05
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E3000 : DC.E14000,
  },
  {
    id: 5,
    description: () =>
      Slabdrill.isCursed ? `反物质维度和计数频率的价格增长大幅增加。` :
      `购买第 1-4 ${player.universes.current === 2 ? "物质" : "反物质"}维度时，会增加所有价格较小或相等的${player.universes.current === 2 ? "物质维度" : "反物质维度"}价格。
      购买第 5-8 ${player.universes.current === 2 ? "物质" : "反物质"}维度时，会增加所有价格较大或相等的${player.universes.current === 2 ? "物质维度" : "反物质维度"}价格。`,
    goal: () => Slabdrill.isCursed ? DC.E4750 : DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        Slabdrill.isCursed ? `所有星系的加成提升 ${formatX(6.66, 2, 2)}，且星系与维度提升的需求减少 ${formatInt(1)}。` :
        `星系的加成提升 ${formatPercents(0.1)}，且星系与维度提升的需求减少 ${formatInt(1)}。`,
      effect: () => Slabdrill.isCursed ? 6.66 : 1.1
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E6666 : DC.E18000,
  },
  {
    id: 6,
    description: () => Slabdrill.isCursed ? `指数级增加的物质数量会除以你的反物质维度倍数加成。` :
      `一旦你拥有了至少 ${formatInt(1)} 个第二${player.universes.current === 2 ? "物质" : "反物质"}维度，指数级增加的${player.universes.current === 2 ? "反物质" : "物质"}数量就会除以你所有${player.universes.current === 2 ? "物质" : "反物质"}维度的倍数加成。`,
    goal: () => Slabdrill.isCursed ? DC.E12500 : DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "无限维度获得基于计数频率的加成",
      effect: () => Slabdrill.isCursed
        ? Tickspeed.perSecond.pow(0.005)
        : Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E13000 : DC.E22500,
  },
  {
    id: 7,
    description: () => {
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `你不能获得${player.universes.current === 2 ? "物质" : "反物质"}星系，但维度提升的基础倍数加成增加，最高提升至 ${formatX(10)}。
      （当前基础倍数：${formatX(mult, 2, 2)}）`;
    },
    goal: () => Slabdrill.isCursed ? DC.E9600 : DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `维度提升的倍数加成提高到至少 ${Slabdrill.isCursed ? formatX(32) : formatX(4)}`,
      effect: () => Slabdrill.isCursed ? 32 : 4
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E17000 : DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `${player.universes.current === 2 ? "物质维度" : "反物质维度"}的产量会随时间快速且持续下降${Slabdrill.isCursed ? "。" : `。购买${player.universes.current === 2 ? "物质" : "反物质"}维度或计数频率升级会将产量恢复为 ${formatPercents(1)}，然后再次开始下降。`}`,
    goal: () => Slabdrill.isCursed ? DC.E15000 : DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Decimal.max(0, player.records.thisInfinity.time.sub(Slabdrill.isCursed ? 0 : player.records.thisInfinity.lastBuyTime))),
    reward: {
      description: () =>
        Slabdrill.isCursed ? `你的反物质维度指数提升 ${formatPow(1.125, 2, 3)}` :
        `基于第一和第八${player.universes.current === 2 ? "物质维度" : "反物质维度"}的倍数，获得第二至第七${player.universes.current === 2 ? "物质维度" : "反物质维度"}额外倍数。`,
      effect: () => Slabdrill.isCursed ? new Decimal(1.125) :
        AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02).clampMax(DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11))).pow(
        Alpha.isDestroyed ? Decimal.max(Decimal.pow(5, Decimal.log10(Decimal.log10(AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02)).div(
        Decimal.log10(DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11)))))), 1) : 1),
      cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E1E15.powEffectsOf(EndgameMastery(91), EndgameUpgrade(11)),
      formatEffect: value => Slabdrill.isCursed ? formatPow(value, 2, 3) : formatX(value, 2, 2)
    },
    unlockAM: () => Slabdrill.isCursed ? DC.E18000 : DC.E28000,
  },
];