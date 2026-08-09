export const celestialEternityPlusUpgrades = {
  megaCelTickspeedReduction: {
    id: "megaCelTickspeedReduction",
    cost: DC.E1000,
    description: () => `将天界计数频率的价格增长倍率降低至 ${formatX(1.5, 1, 1)}`,
    effect: 0.15,
    onPurchased: () => GameCache.celestialTickSpeedMultDecrease.invalidate()
  },
  megaCelDimReduction: {
    id: "megaCelDimReduction",
    cost: DC.E2000,
    description: () => `将天界维度提升的价格增长倍率降低至 ${formatX(1.8, 1, 1)}`,
    effect: 0.2,
    onPurchased: () => GameCache.celestialDimensionMultDecrease.invalidate()
  },
  betterCIPFormula: {
    id: "betterCIPFormula",
    cost: DC.E3000,
    description: () => `将天界无限点数转换公式的除数减少${formatPercents(0.1)}`,
    effect: 0.9
  },
  oldStoneSlabAndSteelDrill: {
    id: "oldStoneSlabAndSteelDrill",
    cost: DC.E4000,
    description: () => (false ? "解锁被诅咒的现实" : "解锁佩勒的领域"),
    onPurchased: () => Pelle.quotes.reachGoal.show()
  }
};
