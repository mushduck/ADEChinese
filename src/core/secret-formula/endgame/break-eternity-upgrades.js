function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => Decimal.pow(10, config.initialCost * Math.pow(config.costIncrease, player.breakEternityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => player.disablePostReality ? 1 : effectFunction(player.breakEternityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakEternityUpgrades = {
  antimatterDimensionPow: rebuyable({
    name: "反物质指数",
    id: 0,
    initialCost: 1e15,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "所有反物质维度的倍率 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  infinityDimensionPow: rebuyable({
    name: "无限指数",
    id: 1,
    initialCost: 1e16,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "所有无限维度的倍率 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  timeDimensionPow: rebuyable({
    name: "时间指数",
    id: 2,
    initialCost: 1e17,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "所有时间维度的倍率 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiIntervalPow: rebuyable({
    name: "复制指数",
    id: 3,
    initialCost: 1e18,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(0.5, value),
    description: () => "复制器间隔 ^ 0.5",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${format(value, 2, 3)}`,
    noLabel: false
  }),
  tachyonParticlePow: rebuyable({
    name: "膨胀指数",
    id: 4,
    initialCost: 1e19,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "超光速粒子获取 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  galaxyScaleDelay: rebuyable({
    name: "星系效力",
    id: 5,
    initialCost: 1e20,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => value * 10000,
    description: () => "推迟遥远星系/极远星系出现",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatInt(value)} Galaxies`,
    noLabel: false
  }),
  infinityPowerConversion: rebuyable({
    name: "力量加成",
    id: 6,
    initialCost: 1e21,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "无限之力转换指数 × 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  epMultiplierDelay: rebuyable({
    name: "软上限提高",
    id: 7,
    initialCost: 1e22,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(10, value),
    description: () => `将永恒点数倍增的价格加速增长起始值提高至${formatPow(10)}`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiGalaxyPower: rebuyable({
    name: "涨价延迟",
    id: 8,
    initialCost: 1e23,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "复制器星系成本加速增长起始值 × 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  dilatedTimeMultiplier: rebuyable({
    name: "倍率强化",
    id: 9,
    initialCost: 1e24,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "膨胀时间倍增升级的每次购买倍率 × 2 (仅限初始值为×2的那个)",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  doubleIPUncap: {
    name: "无限强化",
    id: "doubleIPUncap",
    cost: Decimal.pow(10, 1e30),
    description: "去除无限点数倍增升级购买硬上限"
  },
  tgThresholdUncap: {
    name: "星系增长",
    id: "tgThresholdUncap",
    cost: Decimal.pow(10, 1e40),
    description: "去除超光速粒子星系阈值升级的购买上限并优化公式"
  },
  tesseractMultiplier: {
    name: "穿越立方",
    id: "tesseractMultiplier",
    cost: Decimal.pow(10, 1e50),
    description: "将所有有效超立方体数量 × 2",
    effect: 2
  },
  glyphSacrificeUncap: {
    name: "献祭补偿",
    id: "glyphSacrificeUncap",
    cost: Decimal.pow(10, 1e70),
    description: "去除符文献祭效果上限"
  },
  glyphSlotImprovement: {
    name: "效力扩增",
    id: "glyphSlotImprovement",
    cost: Decimal.pow(10, 1e100),
    description: "在被毁灭的现实外增加 3 个符文槽",
    effect: 3
  },
};
