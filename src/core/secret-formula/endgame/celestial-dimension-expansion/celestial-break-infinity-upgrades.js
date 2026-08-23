function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost * Math.pow(config.costIncrease, player.endgame.celDimExpansion.celestialInfinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.endgame.celDimExpansion.celestialInfinityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect ||
      (value => {
        return (value === config.maxUpgrades
          ? `当前：${formatX(10 - value)}`
          : `当前：${formatX(10 - value)} | 下一级：${formatX(10 - value - 1)}`);
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const celestialBreakInfinityUpgrades = {
  autoCD1: {
    id: "autoCD1",
    cost: 5e4,
    description: "解锁第1-4天界维度自动购买器"
  },
  autoCD2: {
    id: "autoCD2",
    cost: 1e5,
    description: "解锁第5-8天界维度自动购买器"
  },
  autoCDPlus: {
    id: "autoCDPlus",
    cost: 1e6,
    description: "解锁天界维度的计数频率、维度提升、星系和大坍缩的自动购买器"
  },
  betterAuto: {
    id: "betterAuto",
    cost: 1e9,
    description: () => `天界自动购买器速度提升 ${formatX(3)} 倍`,
    effect: 3
  },
  bulkCelDimBoosts: {
    id: "bulkCelDimBoosts",
    cost: 1e15,
    description: "天界维度提升自动购买器可购买最大"
  },
  celInfGen: {
    id: "celInfGen",
    cost: 1e24,
    description: () => `基于最快的天界无限速度的 ${formatPercents(0.5)} 生成天界无限次数`
  },
  celTickspeedCostMult: rebuyable({
    id: 0,
    initialCost: 1e5,
    costIncrease: 20,
    maxUpgrades: 8,
    description: "降低天界无限后天界计数频率升级的价格增长倍率",
    noLabel: true,
    onPurchased: () => GameCache.celestialTickSpeedMultDecrease.invalidate()
  }),
  celDimCostMult: rebuyable({
    id: 1,
    initialCost: 4e5,
    costIncrease: 100,
    maxUpgrades: 7,
    description: "降低天界无限后天界维度提升的价格增长倍率",
    noLabel: true,
    onPurchased: () => GameCache.celestialDimensionMultDecrease.invalidate()
  }),
  cipGen: rebuyable({
    id: 2,
    initialCost: 1e6,
    costIncrease: 10,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? DC.D0 : Player.bestRunCIPPM.times(value / 20),
    description: () => {
      let generation = `${formatInt(5 * player.endgame.celDimExpansion.celestialInfinityRebuyables[2])}%`;
      if (!CelestialBreakInfinityUpgrade.cipGen.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.endgame.celDimExpansion.celestialInfinityRebuyables[2]))}%`;
      }
      return `基于前 10 次天界无限中最快天界无限点数获取速度的 ${generation} 生成天界无限点数`;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} 天界无限点数/分`,
    noLabel: false
  }),
  celDimPurchaseBuff: rebuyable({
    id: 3,
    initialCost: 1e9,
    costIncrease: 1e3,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? 1 : Math.pow(1.2, value),
    description: () => `将每次购买天界维度的倍率提高 ${formatPercents(0.2)}`,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  celDimboostBuff: rebuyable({
    id: 4,
    initialCost: 1e12,
    costIncrease: 1e6,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? 1 : Math.pow(1.5, value),
    description: () => `将每次天界维度提升的倍率提高 ${formatPercents(0.5)}`,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  }),
  celGalaxyBuff: rebuyable({
    id: 5,
    initialCost: 1e15,
    costIncrease: 1e9,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? 1 : Math.pow(1.1, value),
    description: () => `天界星系对每个天界计数频率的加成 + ${formatPercents(0.1)}`,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    noLabel: false
  })
};
