function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => new Decimal(config.initialCost).times(
      Decimal.pow(config.costIncrease, player.endgame.largeHadronCollider.void.rebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.endgame.largeHadronCollider.void.rebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const nullUpgrades = {
  antimatterDimensionMult: rebuyable({
    name: "虚化之源",
    id: 0,
    initialCost: 100,
    costIncrease: 10,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow10(Math.pow(value, 2)),
    description: () => "为所有反物质维度提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  infinityPointMult: rebuyable({
    name: "无际虚空",
    id: 1,
    initialCost: 10000,
    costIncrease: 100,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow10(Math.pow(value, 2)),
    description: () => "为无限点数获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  infinityMult: rebuyable({
    name: "遗忘之藏",
    id: 2,
    initialCost: 1e6,
    costIncrease: 1000,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow(1.25, value),
    description: () => "为无限次数获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  infinityDimensionMult: rebuyable({
    name: "无边虚幻",
    id: 3,
    initialCost: 1e8,
    costIncrease: 10000,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow10(Math.pow(value, 2)),
    description: () => "为所有无限维度提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  replicantiSpeedMult: rebuyable({
    name: "枯衍之痕",
    id: 4,
    initialCost: 1e10,
    costIncrease: 100000,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow(1.25, value),
    description: () => "为复制速度提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  eternityPointMult: rebuyable({
    name: "永滞之怠",
    id: 5,
    initialCost: 1e12,
    costIncrease: 1e6,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow10(Math.pow(value, 2)),
    description: () => "为永恒点数获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  timeDimensionMult: rebuyable({
    name: "恒微之寂",
    id: 6,
    initialCost: 1e15,
    costIncrease: 1e7,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow10(Math.pow(value, 2)),
    description: () => "为所有时间维度提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  eternityMult: rebuyable({
    name: "不灭之朽",
    id: 7,
    initialCost: 1e18,
    costIncrease: 1e8,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow(1.25, value),
    description: () => "为永恒次数获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  dilatedTimeMult: rebuyable({
    name: "虚势归灭",
    id: 8,
    initialCost: 1e40,
    costIncrease: 1e9,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow(2, value),
    description: () => "为膨胀时间获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  tachyonParticleMult: rebuyable({
    name: "朽念延展",
    id: 9,
    initialCost: 1e45,
    costIncrease: 1e10,
    maxUpgrades: Number.MAX_VALUE,
    effect: value => Decimal.pow(2, value),
    description: () => "为超光速粒子获取量提供倍率加成",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  ncComp: {
    name: "常态破碎",
    id: "ncComp",
    cost: Decimal.pow10(5),
    description: "虚无时自动完成所有普通挑战",
    onPurchased: () => NormalChallenges.completeAll()
  },
  alwaysBroken: {
    name: "荒灭之墟",
    id: "alwaysBroken",
    cost: Decimal.pow10(10),
    description: "虚无时自动打破无限",
    onPurchased: () => player.break = true
  },
  icComp: {
    name: "堕天作战",
    id: "icComp",
    cost: Decimal.pow10(15),
    description: "虚无时自动完成所有无限挑战",
    onPurchased: () => InfinityChallenges.completeAll()
  },
  repUnl: {
    name: "镜像扬弃",
    id: "repUnl",
    cost: Decimal.pow10(20),
    description: "虚无时自动解锁复制器",
    onPurchased: () => Replicanti.unlock(true)
  },
  eterMiles: {
    name: "永恒假面",
    id: "eterMiles",
    cost: Decimal.pow10(25),
    description: () => `虚无时自动获得 ${formatInt(100)} 永恒次数`,
    onPurchased: () => Currency.eternities.bumpTo(100)
  },
  limerick1: {
    name: "尘铸灵枢",
    id: "limerick1",
    cost: Decimal.pow10(30),
    description: () => `虚无内重获成就${formatInt(111)}和成就${formatInt(118)}的奖励`
  },
  limerick2: {
    name: "诗动肺腑",
    id: "limerick2",
    cost: Decimal.pow10(45),
    description: () => `虚无内重获成就${formatInt(143)}的奖励`
  },
  limerick3: {
    name: "若生疑心",
    id: "limerick3",
    cost: Decimal.pow10(60),
    description: "虚无时自动完成所有永恒挑战",
    onPurchased: () => {
      player.eternityChalls = {
        eterc1: 5,
        eterc2: 5,
        eterc3: 5,
        eterc4: 5,
        eterc5: 5,
        eterc6: 5,
        eterc7: 5,
        eterc8: 5,
        eterc9: 5,
        eterc10: 5,
        eterc11: 5,
        eterc12: 5
      }
    }
  },
  limerick4: {
    name: "从其所虑",
    id: "limerick4",
    cost: Decimal.pow10(80),
    description: "虚无时自动解锁时间膨胀",
    onPurchased: () => {
      if (!player.dilation.studies.includes(1)) player.dilation.studies.push(1);
    }
  },
  limerick5: {
    name: "终归尘土",
    id: "limerick5",
    cost: Decimal.pow10(100),
    description: "虚无时自动启用所有现实前的自动化"
  }
};
