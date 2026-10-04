function rebuyableCost(initialCost, increment, id) {
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.compression.rebuyables[id]));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
    initialCost: config.initialCost,
    increment: config.increment,
    description: config.description,
    effect: () => config.effect(player.compression.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: () => config.purchaseCap(player.compression.rebuyables[config.id]),
    reachedCap: () => player.compression.rebuyables[config.id] >= config.purchaseCap(player.compression.rebuyables[config.id]),
    rebuyable: true
  };
}

export const compressionUpgrades = {
  trGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    description: () => "热能辐射获取量翻倍",
    effect: bought => Decimal.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  waveThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    description: () => "重置热能辐射和电磁波场的数量并降低其阈值",
    // The 250th purchase is at 1e504, and is the last purchase.
    effect: bought => Decimal.pow(0.99, bought),
    formatEffect: effect => {
      if (effect.eq(Decimal.pow(0.99, 250))) return `${formatX(getElectroWaveMult(effect), 4, 4)}`;
      const nextEffect = effect.times(0.99);
      return `${formatX(getElectroWaveMult(effect), 4, 4)} ➜
        下一级：${formatX(getElectroWaveMult(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: () => 250
  }),
  hrGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    description: () => `霍金辐射获取量 ${formatX(3)}`,
    effect: bought => DC.D3.pow(bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  doubleWaves: {
    id: 4,
    cost: 5e6,
    description: () => `电磁波场获取量翻倍`,
    effect: 2
  },
  stMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => `基于log₂(log₂(复制器倍率))为空间之理获取量提供加成`,
    effect: () => {
      return replicantiMult().max(4).log2().log2();
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  adMultTR: {
    id: 6,
    cost: 5e7,
    description: () => `在压缩中基于热能辐射和本次终局的真实用时为${player.universes.current === 2 ? "正物质" : "反物质"}维度提供倍率加成`,
    effect: () => Currency.thermalRadiation.value.pow(Time.thisEndgameRealTime.totalMinutes.pow(0.75)).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  adBigMultTR: {
    id: 7,
    cost: 2e12,
    description: () => `基于热能辐射为${player.universes.current === 2 ? "正物质" : "反物质"}维度提供倍率加成，此倍率不受时间压缩的影响`,
    effect: () => Currency.thermalRadiation.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  entanglementSplit: {
    id: 8,
    cost: 1e10,
    description: "你可以在终局专精树的纠缠分叉上选择所有路径，基于热能辐射为所有机器获取量提供指数加成",
    effect: () => Currency.thermalRadiation.value.max(1).log10().div(308).add(1).pow(2),
    formatEffect: value => formatPow(value, 2, 3)
  },
  compressionPenalty: {
    id: 9,
    cost: 1e11,
    description: "略微减弱时间压缩的减益效果"
  },
  esGenerator: {
    id: 10,
    cost: 1e15,
    description: "霍金辐射生产终局能力",
    effect: () => Currency.hawkingRadiation.value.pow(0.5),
    formatEffect: value => `${format(value, 2, 1)}/秒`
  }
};
