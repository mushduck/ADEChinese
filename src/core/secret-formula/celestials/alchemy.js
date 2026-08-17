export const alchemyResources = {
  // T1 resources (Non-Effarig "base" resources)
  "power": {
    key: "power",
    id: ALCHEMY_RESOURCE.POWER,
    name: "力量",
    symbol: "Ω",
    isBaseResource: true,
    effect: amount => 1 + amount / 125000,
    tier: 1,
    uiOrder: 1,
    unlockedAt: 2,
    description: "为反物质维度提供加成",
    formatEffect: value => `反物质维度的加成 ${formatPow(value, 4, 4)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyPower.isBought
  },
  "infinity": {
    key: "infinity",
    id: ALCHEMY_RESOURCE.INFINITY,
    name: "无限",
    symbol: "∞",
    isBaseResource: true,
    effect: amount => 1 + amount / 125000,
    tier: 1,
    uiOrder: 2,
    unlockedAt: 3,
    description: "为无限维度提供加成",
    formatEffect: value => `无限维度的加成 ${formatPow(value, 4, 4)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyInfinity.isBought
  },
  "time": {
    key: "time",
    id: ALCHEMY_RESOURCE.TIME,
    name: "时间",
    symbol: "Δ",
    isBaseResource: true,
    effect: amount => 1 + amount / 125000,
    tier: 1,
    uiOrder: 3,
    unlockedAt: 4,
    description: "为时间维度提供加成",
    formatEffect: value => `时间维度的加成 ${formatPow(value, 4, 4)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyTime.isBought
  },
  "replication": {
    key: "replication",
    id: ALCHEMY_RESOURCE.REPLICATION,
    name: "复制",
    symbol: "Ξ",
    isBaseResource: true,
    effect: amount => Decimal.pow10(amount / 500),
    tier: 1,
    uiOrder: 4,
    unlockedAt: 5,
    description: "增加复制速度",
    formatEffect: value => `复制速度增加 ${formatX(value, 2, 2)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyReplication.isBought
  },
  "dilation": {
    key: "dilation",
    id: ALCHEMY_RESOURCE.DILATION,
    name: "膨胀",
    symbol: "Ψ",
    isBaseResource: true,
    effect: amount => Decimal.pow10(amount / 1000),
    tier: 1,
    uiOrder: 5,
    unlockedAt: 6,
    description: "增加膨胀时间的产量",
    formatEffect: value => `膨胀时间产量增加 ${formatX(value, 2, 2)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyDilation.isBought
  },

  // T2 resources (combinations of pairs of T1 resources)
  "cardinality": {
    key: "cardinality",
    id: ALCHEMY_RESOURCE.CARDINALITY,
    name: "基数",
    symbol: "α",
    isBaseResource: false,
    effect: amount => 1 + 0.2 / (1 + amount / 12500),
    tier: 2,
    uiOrder: 3,
    unlockedAt: 8,
    get description() { return `减少每 ${format(Decimal.NUMBER_MAX_VALUE, 2)} 复制器的减速`; },
    formatEffect: value => `每 ${format(Number.MAX_VALUE, 2)} 复制器，每个复制间隔升级成本增长 ${formatX(1.2, 1, 1)} ➜ ${formatX(value, 4, 4)} `,
    reagents: [
      { resource: ALCHEMY_RESOURCE.TIME, amount: 8 },
      { resource: ALCHEMY_RESOURCE.REPLICATION, amount: 7 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyCardinality.isBought
  },
  "eternity": {
    key: "eternity",
    id: ALCHEMY_RESOURCE.ETERNITY,
    name: "永恒",
    symbol: "τ",
    isBaseResource: false,
    effect: amount => 1 + amount / 12500,
    tier: 2,
    uiOrder: 2,
    unlockedAt: 9,
    description: "增加永恒次数加成",
    formatEffect: value => `永恒次数生成 ${formatPow(value, 4, 4)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.TIME, amount: 11 },
      { resource: ALCHEMY_RESOURCE.INFINITY, amount: 4 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyEternity.isBought
  },
  "dimensionality": {
    key: "dimensionality",
    id: ALCHEMY_RESOURCE.DIMENSIONALITY,
    name: "维度",
    symbol: "ρ",
    isBaseResource: false,
    effect: amount => Decimal.pow10(6 * amount),
    tier: 2,
    uiOrder: 1,
    unlockedAt: 10,
    description: "为所有维度提供加成",
    formatEffect: value => `所有维度 ${formatX(value)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.POWER, amount: 10 },
      { resource: ALCHEMY_RESOURCE.INFINITY, amount: 5 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyDimensionality.isBought
  },
  "inflation": {
    key: "inflation",
    id: ALCHEMY_RESOURCE.INFLATION,
    name: "暴胀",
    symbol: "λ",
    isBaseResource: false,
    effect: amount => Decimal.pow10(6e9 - 3e5 * amount),
    tier: 2,
    uiOrder: 5,
    unlockedAt: 11,
    description: "增加超过阈值的倍率效果",
    formatEffect: value => `所有在 ${format(value)} 以上的反物质维度倍率 ${formatPow(1.05, 2, 2)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.POWER, amount: 9 },
      { resource: ALCHEMY_RESOURCE.DILATION, amount: 6 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyInflation.isBought
  },
  "alternation": {
    key: "alternation",
    id: ALCHEMY_RESOURCE.ALTERNATION,
    name: "交变",
    symbol: "ω",
    isBaseResource: false,
    effect: amount => amount / 125000,
    tier: 2,
    uiOrder: 4,
    unlockedAt: 12,
    description: "基于复制器增加超光速粒子星系的强度",
    formatEffect: value => `每 ${format(DC.E1E6)} 复制器，超光速粒子星系强度增加 ${formatPercents(value, 2, 2)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.REPLICATION, amount: 5 },
      { resource: ALCHEMY_RESOURCE.DILATION, amount: 10 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyAlternation.isBought
  },

  // T3 resources (Effarig and conbinations of T1/T2 with Effarig)
  "effarig": {
    key: "effarig",
    id: ALCHEMY_RESOURCE.EFFARIG,
    name: "鹿颈长",
    symbol: "Ϙ",
    isBaseResource: true,
    effect: amount => Decimal.pow10(amount / 1250),
    tier: 1,
    uiOrder: 1.5,
    unlockedAt: 7,
    description: "增加遗迹碎片的获取",
    formatEffect: value => `获得的遗迹碎片 ${formatX(value, 2, 2)}`,
    destroyed: () => !PelleAlchemyUpgrade.alchemyEffarig.isBought
  },
  "synergism": {
    key: "synergism",
    id: ALCHEMY_RESOURCE.SYNERGISM,
    name: "协同",
    symbol: "π",
    isBaseResource: false,
    effect: amount => {
      const rawValue = 0.3 + 1.7 * Math.sqrt(amount / 25000);
      return Achievement(175).isUnlocked ? rawValue : Math.min(rawValue, 1);
    },
    tier: 3,
    uiOrder: 2,
    unlockedAt: 13,
    description: "增加炼金反应的效率",
    formatEffect(value) {
      return `符文炼金效率 ${formatPercents(0.3)} ➜ ${formatPercents(value, 2, 2)} ${(!Achievement(175).isUnlocked && value >= 1) ? "（已达到上限）" : ""}`;
    },
    reagents: [
      { resource: ALCHEMY_RESOURCE.EFFARIG, amount: 3 },
      { resource: ALCHEMY_RESOURCE.REPLICATION, amount: 16 },
      { resource: ALCHEMY_RESOURCE.INFINITY, amount: 14 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemySynergism.isBought
  },
  "momentum": {
    key: "momentum",
    id: ALCHEMY_RESOURCE.MOMENTUM,
    name: "动量",
    symbol: "μ",
    isBaseResource: false,
    effect: amount => 1 + amount / 100000,
    tier: 3,
    uiOrder: 3,
    unlockedAt: 15,
    description: "提供基于解锁本资源以来所有维度加成",
    formatEffect: value => `所有维度 ${formatPow(Ra.momentumValue, 4, 4)}，解锁该资源后每小时增加 ${format(0.01 * Effects.product(Achievement(175), EndgameMastery(171), Achievement(222)), 3, 3)}，最高可达 ${formatPow(value, 4, 4)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.EFFARIG, amount: 11 },
      { resource: ALCHEMY_RESOURCE.POWER, amount: 4 },
      { resource: ALCHEMY_RESOURCE.TIME, amount: 20 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyMomentum.isBought
  },
  "decoherence": {
    key: "decoherence",
    id: ALCHEMY_RESOURCE.DECOHERENCE,
    name: "退相干",
    symbol: "ξ",
    isBaseResource: false,
    effect: amount => 0.2 * Math.sqrt(amount / 25000),
    tier: 3,
    uiOrder: 4,
    unlockedAt: 14,
    description: "使精炼按照比例提供所有基础炼金资源",
    formatEffect: value => `精炼的符文也提供所有其他基础资源的 ${formatPercents(value, 2)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.EFFARIG, amount: 13 },
      { resource: ALCHEMY_RESOURCE.ALTERNATION, amount: 8 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyDecoherence.isBought
  },

  // T4 resources (resources which feed directly into the final resource)
  "exponential": {
    key: "exponential",
    id: ALCHEMY_RESOURCE.EXPONENTIAL,
    name: "增幅秘术",
    symbol: "Γ",
    isBaseResource: false,
    effect: amount => 10 * Math.pow(amount / 10000, 3),
    tier: 4,
    uiOrder: 2,
    unlockedAt: 18,
    description: "基于复制器加成无限点数",
    formatEffect: value => `无限点数获得等同于复制器数量${formatPow(value, 2, 3)}的倍率`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.INFLATION, amount: 18 },
      { resource: ALCHEMY_RESOURCE.SYNERGISM, amount: 3 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyExponential.isBought
  },
  "force": {
    key: "force",
    id: ALCHEMY_RESOURCE.FORCE,
    name: "神秘力场",
    symbol: "Φ",
    isBaseResource: false,
    effect: amount => 10 * amount,
    tier: 4,
    uiOrder: 2,
    unlockedAt: 17,
    description: "基于现实机器加成反物质维度",
    formatEffect: value => `反物质维度获得等同于现实机器数量${formatPow(value, 2, 2)}的倍率`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.DIMENSIONALITY, amount: 7 },
      { resource: ALCHEMY_RESOURCE.MOMENTUM, amount: 8 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyForce.isBought
  },
  "uncountability": {
    key: "uncountability",
    id: ALCHEMY_RESOURCE.UNCOUNTABILITY,
    name: "无尽奥秘",
    symbol: "Θ",
    isBaseResource: false,
    effect: amount => 1600 * Math.sqrt(amount / 6250),
    tier: 4,
    uiOrder: 3,
    unlockedAt: 19,
    description: "自动获得现实次数和复兴点数",
    formatEffect: value => `每秒获得 ${format(value, 2, 2)} 现实次数和复兴点数`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.INFINITY, amount: 20 },
      { resource: ALCHEMY_RESOURCE.EFFARIG, amount: 6 },
      { resource: ALCHEMY_RESOURCE.CARDINALITY, amount: 16 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyUncountability.isBought
  },
  "boundless": {
    key: "boundless",
    id: ALCHEMY_RESOURCE.BOUNDLESS,
    name: "无限虚空",
    symbol: "Π",
    isBaseResource: false,
    effect: amount => amount / 62500,
    tier: 4,
    uiOrder: 1,
    unlockedAt: 20,
    description: "增强超立方体",
    formatEffect: value => `超立方体的效果增强 ${formatPercents(value, 2, 2)}`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.ETERNITY, amount: 13 },
      { resource: ALCHEMY_RESOURCE.INFLATION, amount: 18 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyBoundless.isBought
  },
  "multiversal": {
    key: "multiversal",
    id: ALCHEMY_RESOURCE.MULTIVERSAL,
    name: "诸界奥义",
    symbol: "Σ",
    isBaseResource: false,
    effect: amount => 32 * Math.pow(amount / 20000, 2),
    tier: 4,
    uiOrder: 5,
    unlockedAt: 16,
    description: "使每次现实模拟更多次现实",
    formatEffect: value => `每次现实模拟 ${format(value, 2, 3)} 次额外的现实，给出与扩增相同的所有奖励`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.ALTERNATION, amount: 16 },
      { resource: ALCHEMY_RESOURCE.DECOHERENCE, amount: 3 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyMultiversal.isBought
  },
  "unpredictability": {
    key: "unpredictability",
    id: ALCHEMY_RESOURCE.UNPREDICTABILITY,
    name: "未知预言",
    symbol: "Λ",
    isBaseResource: false,
    effect: amount => amount / (8333.33 + amount),
    tier: 4,
    uiOrder: 4,
    unlockedAt: 21,
    description: "使每个炼金反应有概率发生两次",
    formatEffect: value => `任何炼金反应有 ${formatPercents(value, 2, 2)} 的几率再次触发`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.EFFARIG, amount: 15 },
      { resource: ALCHEMY_RESOURCE.DECOHERENCE, amount: 3 },
      { resource: ALCHEMY_RESOURCE.SYNERGISM, amount: 10 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyUnpredictability.isBought
  },

  // T5 (Reality)
  "reality": {
    key: "reality",
    id: ALCHEMY_RESOURCE.REALITY,
    name: "现实",
    symbol: "Ϟ",
    isBaseResource: false,
    effect: amount => Math.floor(amount),
    tier: 5,
    unlockedAt: 25,
    description: "可消耗以创造现实符文",
    formatEffect: value => `消耗所有的炼金资源“现实”，创造一个等级为 ${formatHybridLarge(value, 3)} 的现实符文`,
    reagents: [
      { resource: ALCHEMY_RESOURCE.EXPONENTIAL, amount: 1 },
      { resource: ALCHEMY_RESOURCE.FORCE, amount: 1 },
      { resource: ALCHEMY_RESOURCE.UNCOUNTABILITY, amount: 1 },
      { resource: ALCHEMY_RESOURCE.BOUNDLESS, amount: 1 },
      { resource: ALCHEMY_RESOURCE.MULTIVERSAL, amount: 1 },
      { resource: ALCHEMY_RESOURCE.UNPREDICTABILITY, amount: 1 }
    ],
    destroyed: () => !PelleAlchemyUpgrade.alchemyReality.isBought
  },
};