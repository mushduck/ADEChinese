const formatCost = c => format(c, 2);
// eslint-disable-next-line max-params
const expWithIncreasedScale = (base1, base2, incScale, coeff, x) =>
  Decimal.pow(base1, x).times(Decimal.pow(base2, x - incScale).max(1)).times(coeff);

const rebuyable = config => {
  const { id, description, cost, effect, formatEffect, cap } = config;
  return {
    id,
    description,
    cost: () => expWithIncreasedScale(...cost, player.celestials.pelle.rebuyables[id]),
    formatCost,
    cap,
    effect: (x = player.celestials.pelle.rebuyables[id]) => effect(x),
    formatEffect,
    rebuyable: true
  };
};

export const pelleUpgrades = {
  antimatterDimensionMult: rebuyable({
    id: "antimatterDimensionMult",
    description: "Gain a multiplier to Antimatter Dimensions",
    cost: [10, 250, 41, 10],
    effect: x => Pelle.antimatterDimensionMult(x),
    formatEffect: x => formatX(x, 2, 2),
    cap: 47
  }),
  timeSpeedMult: rebuyable({
    id: "timeSpeedMult",
    description: "提高游戏速度倍率",
    cost: [20, 1e3, 30, 1e5],
    effect: x => Decimal.pow(1.3, x),
    formatEffect: x => formatX(x, 2, 2),
    cap: 35
  }),
  glyphLevels: rebuyable({
    id: "glyphLevels",
    description: "提高佩勒内符文的等级上限",
    cost: [30, 1e3, 25, 1e15],
    effect: x => Math.floor(((3 * (x + 1)) - 2) ** 1.6),
    formatEffect: x => formatInt(x),
    cap: 26
  }),
  infConversion: rebuyable({
    id: "infConversion",
    description: "提高无限之力提升反物质维度的指数",
    cost: [40, 1e3, 20, 1e18],
    effect: x => (x * 3.5) ** 0.37,
    formatEffect: x => `+${format(x, 2, 2)}`,
    cap: 21
  }),
  galaxyPower: rebuyable({
    id: "galaxyPower",
    description: "提高星系的效果",
    cost: [1000, 1e3, 10, 1e30],
    effect: x => 1 + x / 50,
    formatEffect: x => formatX(x, 2, 2),
    cap: 9
  }),
  antimatterDimAutobuyers1: {
    id: 0,
    description: "重获自动购买第一至第四反物质维度",
    cost: 1e5,
    formatCost,
  },
  dimBoostAutobuyer: {
    id: 1,
    description: "重获自动购买维度提升",
    cost: 5e5,
    formatCost,
  },
  keepAutobuyers: {
    id: 2,
    description: "末日之后不会重置自动购买器升级",
    cost: 5e6,
    formatCost,
  },
  antimatterDimAutobuyers2: {
    id: 3,
    description: "重获自动购买第五至第八反物质维度",
    cost: 2.5e7,
    formatCost,
  },
  galaxyAutobuyer: {
    id: 4,
    description: "重获自动购买反物质星系",
    cost: 1e8,
    formatCost,
  },
  tickspeedAutobuyer: {
    id: 5,
    description: "重获自动购买计数频率升级",
    cost: 1e9,
    formatCost,
  },
  keepInfinityUpgrades: {
    id: 6,
    description: "末日之后不会重置无限升级",
    cost: 1e10,
    formatCost,
  },
  dimBoostResetsNothing: {
    id: 7,
    description: "维度提升不再重置任何东西",
    cost: 1e11,
    formatCost,
  },
  keepBreakInfinityUpgrades: {
    id: 8,
    description: "末日之后不会重置打破无限升级",
    cost: 1e12,
    formatCost,
  },
  IDAutobuyers: {
    id: 9,
    description: "重获自动购买无限维度",
    cost: 1e14,
    formatCost,
  },
  keepInfinityChallenges: {
    id: 10,
    description: "末日后不再重置无限挑战的解锁状态和完成状态",
    cost: 1e15,
    formatCost,
  },
  galaxyNoResetDimboost: {
    id: 11,
    description: "购买星系不再重置维度提升",
    cost: 1e16,
    formatCost
  },
  replicantiAutobuyers: {
    id: 12,
    description: "重获自动购买复制器升级",
    cost: 1e17,
    formatCost,
  },
  replicantiGalaxyNoReset: {
    id: 13,
    description: "无限后不再重置复制器星系",
    cost: 1e19,
    formatCost,
  },
  eternitiesNoReset: {
    id: 14,
    description: "末日之后不会重置永恒次数",
    cost: 1e20,
    formatCost,
  },
  timeStudiesNoReset: {
    id: 15,
    description: "末日之后不会重置时间之理的数量和时间研究",
    cost: 1e21,
    formatCost,
  },
  replicantiStayUnlocked: {
    id: 16,
    description: "复制器永久解锁",
    cost: 1e22,
    formatCost,
  },
  keepEternityUpgrades: {
    id: 17,
    description: "末日之后不会重置永恒升级",
    cost: 1e24,
    formatCost,
  },
  TDAutobuyers: {
    id: 18,
    description: "重获自动购买时间维度",
    cost: 1e25,
    formatCost,
  },
  keepEternityChallenges: {
    id: 19,
    description: "末日后不再重置各个永恒挑战的完成次数",
    cost: 1e26,
    formatCost,
  },
  dilationUpgradesNoReset: {
    id: 20,
    description: "末日之后不会重置膨胀升级",
    cost: 1e45,
    formatCost,
  },
  tachyonParticlesNoReset: {
    id: 21,
    description: "末日之后不会重置超光速粒子的数量",
    cost: 1e50,
    formatCost,
  },
  replicantiGalaxyEM40: {
    id: 22,
    description: "复制器星系不再重置任何东西",
    cost: 1e30,
    formatCost,
  }
};
