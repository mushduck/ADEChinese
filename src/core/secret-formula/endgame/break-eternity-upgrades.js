function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => Decimal.pow(10, config.initialCost() * Math.pow(config.costIncrease(), player.breakEternityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => player.disablePostReality && !SlabdrillUnlocks.infinity.isUnlocked
      ? 1 : effectFunction(player.breakEternityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakEternityUpgrades = {
  antimatterDimensionPow: rebuyable({
    name: () => `${player.universes.current === 2 ? "正物质" : "反物质"}指数`,
    id: 0,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 100 : 1e15,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.01, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将你的${player.universes.current === 2 ? "正物质" : "反物质"}维度的倍率提升至 ${formatPow(1.01, 2, 2)}`
      : `所有${player.universes.current === 2 ? "正物质" : "反物质"}维度的倍率 ^ 2`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  infinityDimensionPow: rebuyable({
    name: "无限指数",
    id: 1,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e4 : 1e16,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.02, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将所有无限维度的倍率提升至 ${formatPow(1.02, 2, 2)}` : "所有无限维度的倍率 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  timeDimensionPow: rebuyable({
    name: "时间指数",
    id: 2,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e6 : 1e17,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.03, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将所有时间维度的倍率提升至 ${formatPow(1.03, 2, 2)}` : "所有时间维度的倍率 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiIntervalPow: rebuyable({
    name: "复制指数",
    id: 3,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 3e4 : 1e18,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(0.96, value) : Math.pow(0.5, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将复制器间隔提升至 ${formatPow(0.96, 2, 2)}` : "复制器间隔 ^ 0.5",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${format(value, 2, 3)}`,
    noLabel: false
  }),
  tachyonParticlePow: rebuyable({
    name: "膨胀指数",
    id: 4,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1.5e8 : 1e19,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 2 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.05, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将超光速粒子获取提升至 ${formatPow(1.05, 2, 2)}` : "超光速粒子获取 ^ 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  galaxyScaleDelay: rebuyable({
    name: "星系效力",
    id: 5,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e5 : 1e20,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? value * 10 : value * 10000,
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `推迟遥远星系/极远星系出现 +${formatInt(10)} 星系`
      : `推迟遥远星系/极远星系出现 +${formatInt(10000)} 星系`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatInt(value)} 星系`,
    noLabel: false
  }),
  infinityPowerConversion: rebuyable({
    name: "力量加成",
    id: 6,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 2e5 : 1e21,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将无限之力转换指数 × ${formatX(1.1, 1, 1)}` : "无限之力转换指数 × 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
    noLabel: false
  }),
  epMultiplierDelay: rebuyable({
    name: "软上限提高",
    id: 7,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 8e6 : 1e22,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(10, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将永恒点数倍增的价格加速增长起始值提高至 ${formatPow(1.1, 2, 2)}`
      : `将永恒点数倍增的价格加速增长起始值提高至 ${formatPow(10)}`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiGalaxyPower: rebuyable({
    name: "涨价延迟",
    id: 8,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 5e6 : 1e23,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 3 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将复制器星系成本加速增长起始值 × ${formatX(1.1, 1, 1)}` : "复制器星系成本加速增长起始值 × 2",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
    noLabel: false
  }),
  dilatedTimeMultiplier: rebuyable({
    name: "倍率强化",
    id: 9,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 2e8 : 1e24,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 2 : 1e10,
    maxUpgrades: 10,
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `将 2 倍膨胀时间升级的每次购买倍率 × ${formatX(1.1, 1, 1)}`
      : "将 2 倍膨胀时间升级的每次购买倍率 × 2 (仅限初始值为×2的那个)",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
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