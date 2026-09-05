function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased, isDecimal } = config;
  return {
    rebuyable: true,
    id,
    cost: () => Decimal.pow(config.costIncrease, player.endgame.celDimExpansion.celestialEternityRebuyables[config.id]).times(config.initialCost),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.endgame.celDimExpansion.celestialEternityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect,
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased,
    isDecimal
  };
}

export const celestialEternityUpgrades = {
  betterCIP: rebuyable({
    id: 0,
    initialCost: 1,
    costIncrease: 1e4,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? 1 : Math.pow(0.99, value),
    description: () => `将天界无限点数转换公式的除数减少 ${formatPercents(0.01)}`,
    formatEffect: value => `${formatX(value, 2, 3)}`,
    noLabel: false
  }),
  largeCDMult: rebuyable({
    id: 1,
    initialCost: 10,
    costIncrease: 10,
    maxUpgrades: 1000,
    effect: value => player.disablePostReality ? DC.D1 : Decimal.pow(1000, value),
    description: () => `提升天界维度的购买倍率至 ${formatX(1000)}`,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  conversionFormulaImprovement: rebuyable({
    id: 2,
    initialCost: 1e100,
    costIncrease: 1e50,
    maxUpgrades: 25,
    effect: value => player.disablePostReality ? 1 : Math.pow(1.01, value),
    description: () => `将天界物质激发指数乘以 ${formatX(1.01, 2, 2)}`,
    formatEffect: value => `${formatX(value, 2, 3)}`,
    noLabel: false
  }),
  startBreak: {
    id: "startBreak",
    cost: 10,
    description: "开始天界永恒时打破天界无限"
  },
  bulkCelGalaxies: {
    id: "bulkCelGalaxies",
    cost: 1e3,
    description: "天界星系自动购买器可购买最大"
  },
  instaAutos: {
    id: "instaAutos",
    cost: 1e6,
    description: "天界自动购买器可立刻购买"
  },
  x2CIPAuto: {
    id: "x2CIPAuto",
    cost: 1e10,
    description: () => `解锁天界无限点数倍增升级自动购买器`
  },
  betterCelCrunchAuto: {
    id: "betterCelCrunchAuto",
    cost: 1e15,
    description: "解锁多样化自动天界大坍缩"
  },
  startInf: {
    id: "startInf",
    cost: 1e20,
    description: "开始时自动解锁所有天界无限升级"
  },
  startingBoosts: {
    id: "startingBoosts",
    cost: 1e30,
    description: () => `天界无限和天界永恒后初始拥有 ${format(5e25, 2, 2)} 天界物质，天界永恒后初始拥有 ${format(5e25, 2, 2)} 天界无限点数`,
    effect: 5e25
  },
  startBreakInf: {
    id: "startBreakInf",
    cost: 1e40,
    description: "开始时自动解锁所有打破天界无限升级"
  },
  celEternityAuto: {
    id: "celEternityAuto",
    cost: 1e50,
    description: "解锁天界永恒自动购买器"
  },
  freeDimBoost: {
    id: "freeDimBoost",
    cost: 1e65,
    description: "购买天界维度提升不再重置任何东西"
  },
  freeGalaxy: {
    id: "freeGalaxy",
    cost: 1e80,
    description: "购买天界星系不再重置任何东西"
  },
  betterCelEternityAuto: {
    id: "betterCelEternityAuto",
    cost: 1e100,
    description: "解锁多样化自动天界永恒"
  },
  celTickReduction: {
    id: "celTickReduction",
    cost: 1e150,
    description: () => `将打破天界无限后天界计数频率的价格增长降低至 ${formatX(1.65, 2, 2)}`,
    effect: 0.35
  },
  celDimReduction: {
    id: "celDimReduction",
    cost: 1e225,
    description: () => `将打破天界无限后天界维度的价格增长降低至${formatX(2)}`,
    effect: 1
  },
  passiveCIP: {
    id: "passiveCIP",
    cost: 1e300,
    description: () => `每秒生成天界大坍缩后所能获得的天界无限点数的 ${formatPercents(0.01)}`
  },
};
