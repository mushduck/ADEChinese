export const celestialInfinityUpgrades = {
  gameSpeedMultCIP: {
    id: "gameSpeedMultCIP",
    cost: 1,
    description: () => `基于未使用的天界无限点数提升游戏速度`,
    effect: () => player.disablePostReality ? DC.D1 : Currency.celestialInfinityPoints.value.plus(1).pow(308),
    formatEffect: value => formatX(value, 2, 1)
  },
  celDimPurchaseBoost: {
    id: "celDimPurchaseBoost",
    cost: 2,
    description: () => `提高天界维度每次购买倍率至 ${formatX(3)}`,
    effect: 3
  },
  alphaDecayStartBoost: {
    id: "alphaDecayStartBoost",
    cost: 5,
    description: () => `基于天界无限次数略微降低阿尔法诅咒的持续时间`,
    effect: () => Decimal.pow(player.endgame.celDimExpansion.celestialInfinities, 0.5).div(100).min(1).add(
      DC.D4.times(DC.D1.sub(Decimal.pow(0.8, player.endgame.celDimExpansion.celestialInfinities.max(1).log10().sub(4).max(0))))),
    formatEffect: value => `${TimeSpan.fromHours(value).toStringShort()}`
  },
  celDimBoostBuff: {
    id: "celDimBoostBuff",
    cost: 10,
    description: () => `提高天界维度提升的基础倍率至 ${formatX(100)}`,
    effect: 100
  },
  celGalaxyBuff: {
    id: "celGalaxyBuff",
    cost: 25,
    description: () => `将每个天界星系给天界计数频率的加成从 ${formatX(1.02, 2, 2)} 提升至 ${formatX(1.03, 2, 2)}`,
    effect: 1.03
  },
  celestialMatterConversionBuff: {
    id: "celestialMatterConversionBuff",
    cost: 50,
    description: () => `提高天界物质激发指数从 ${formatPow(2)} 至 ${formatPow(2.5, 1, 1)}`,
    effect: 2.5
  },
  antimatterCelestialDimBuff: {
    id: "antimatterCelestialDimBuff",
    cost: 100,
    description: "在阿尔法诅咒消散后为所有天界维度提供等同于反物质指数的指数的倍率",
    effect: () => Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).max(1)
  },
  cipGen: {
    id: "cipGen",
    cost: 300,
    description: () => `以最快天界大坍缩速度的 ${formatPercents(0.1)} 生成天界无限点数`,
    effect: () => player.records.bestCelestialInfinity.time.times(10)
  },
  buffedStart: {
    id: "buffedStart",
    cost: 1000,
    description: () => `开始天界无限时拥有 ${formatInt(4)} 个天界维度提升和 ${formatInt(2)} 个天界星系`,
    effect: 4
  }
};
