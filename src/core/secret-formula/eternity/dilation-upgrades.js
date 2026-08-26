function rebuyableCost(initialCost, increment, id, capIncreaseAt, superExponent) {
  if (player.dilation.rebuyables[id] >= superExponent) return Decimal.pow10(1e10).pow(Decimal.pow(1.0002, Math.max(player.dilation.rebuyables[id] - superExponent, 0)));
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.dilation.rebuyables[id] + (Math.max(player.dilation.rebuyables[id] - capIncreaseAt, 0) * Math.max(player.dilation.rebuyables[id] - (capIncreaseAt + 1), 0) / 2)));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id, config.capIncreaseAt(player.dilation.rebuyables[config.id]), config.superExponent ? config.superExponent(player.dilation.rebuyables[config.id]) : Infinity),
    initialCost: config.initialCost,
    increment: config.increment,
    capIncreaseAt: () => config.capIncreaseAt(player.dilation.rebuyables[config.id]),
    superExponent: () => config.superExponent ? config.superExponent(player.dilation.rebuyables[config.id]) : Infinity,
    description: config.description,
    effect: () => config.effect(player.dilation.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: () => config.purchaseCap(player.dilation.rebuyables[config.id]),
    reachedCap: () => player.dilation.rebuyables[config.id] >= config.purchaseCap(player.dilation.rebuyables[config.id]),
    pelleOnly: Boolean(config.pelleOnly),
    rebuyable: true
  };
}

export const dilationUpgrades = {
  dtGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    capIncreaseAt: () => Decimal.floor(Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).sub(3)).toNumber(),
    description: () =>
      ((SingularityMilestone.dilatedTimeFromSingularities.canBeApplied || Achievement(187).canBeApplied)
        ? `获得 ${formatX(2 * Effects.product(
          SingularityMilestone.dilatedTimeFromSingularities,
          Achievement(187),
          BreakEternityUpgrade.dilatedTimeMultiplier
        ), 2, 2)} 倍膨胀时间`
        : "获得的膨胀时间加倍"),
    effect: bought => {
      const base = 2 * Effects.product(
        SingularityMilestone.dilatedTimeFromSingularities,
        Achievement(187),
        BreakEternityUpgrade.dilatedTimeMultiplier
      );
      return Decimal.pow(base, bought);
    },
    formatEffect: value => {
      const nonInteger = SingularityMilestone.dilatedTimeFromSingularities.canBeApplied ||
        Achievement(187).canBeApplied ||
        BreakEternityUpgrade.dilatedTimeMultiplier;
      return formatX(value, 2, nonInteger ? 2 : 0);
    },
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  galaxyThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    capIncreaseAt: () => Decimal.floor((Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).div(2)).sub(2)).toNumber(),
    superExponent: () => 100000,
    description: () =>
      ((Perk.bypassTGReset.isBought && !player.disablePostReality) && (!Pelle.isDoomed || PellePerkUpgrade.perkTGR.canBeApplied)
        ? "重置超光速粒子星系的数量，降低它们的阈值"
        : "重置膨胀时间和超光速粒子星系的数量，降低它们的阈值"),
    // The 38th purchase is at 1e80, and is the last purchase.
    effect: bought => (bought < 38 || (BreakEternityUpgrade.tgThresholdUncap.isBought && !player.disablePostReality) ? Decimal.pow(0.8, bought) : DC.D0),
    formatEffect: effect => {
      if (effect.eq(0)) return `${formatX(getTachyonGalaxyMultForDisplay(effect), 4, 4)}`;
      const nextEffect = effect.eq(Decimal.pow(0.8, 37)) && (!BreakEternityUpgrade.tgThresholdUncap.isBought || player.disablePostReality) ? DC.D0 : effect.times(0.8);
      return `${formatX(getTachyonGalaxyMultForDisplay(effect), 4, 4)} ➜
        下一级：${formatX(getTachyonGalaxyMultForDisplay(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: () => (BreakEternityUpgrade.tgThresholdUncap.isBought && !player.disablePostReality) ? Number.MAX_VALUE : 38
  }),
  tachyonGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    capIncreaseAt: () => Decimal.floor((Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).div(Math.log10(20))).sub(Math.log10(5e5) / Math.log10(20))).toNumber(),
    description: () => {
      if (Pelle.isDoomed && !PelleDestructionUpgrade.x3TPUpgrade.canBeApplied) return `获得 ${formatInt(1)} 倍超光速粒子`;
      if (Enslaved.isRunning) return `获得 ${Math.pow(3, Enslaved.tachyonNerf).toFixed(2)} 倍超光速粒子`;
      return "获得三倍的超光速粒子";
    },
    effect: bought => {
      if (Pelle.isDoomed && !PelleDestructionUpgrade.x3TPUpgrade.canBeApplied) return DC.D1.pow(bought);
      return DC.D3.pow(bought);
    },
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }), 
  doubleGalaxies: {
    id: 4,
    cost: 5e6,
    description: () => (Alpha.isDestroyed
      ? `获得双倍的超光速粒子星系`
      : `获得双倍的超光速粒子星系，最大数量为 ${formatInt(500)} 个基础星系`),
    effect: 2
  },
  tdMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => {
      const rep10 = replicantiMult().pLog10();
      let multiplier = "0.1";
      if (rep10.gt(9000)) {
        const ratio = DilationUpgrade.tdMultReplicanti.effectValue.pLog10().div(rep10);
        if (ratio.lt(0.095)) {
          multiplier = ratio.toFixed(2);
        }
      }
      return `时间维度获得复制器倍率 ${formatPow(multiplier, 1, 3)} 的加成，这个加成超过 ${formatX(DC.E9000)} 后减弱`;
    },
    effect: () => {
      let rep10 = replicantiMult().pLog10().times(0.1);
      rep10 = rep10.gt(9000) ? (rep10.sub(9000)).times(0.5).add(9000) : rep10;
      return Decimal.pow10(rep10);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  ndMultDT: {
    id: 6,
    cost: 5e7,
    description: "基于膨胀时间的数量给予反物质维度倍数加成，此倍数不受时间膨胀的影响",
    effect: () => Currency.dilatedTime.value.pow(308).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  ipMultDT: {
    id: 7,
    cost: 2e12,
    description: "无限点数获得基于膨胀时间的倍数加成",
    effect: () => Currency.dilatedTime.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  timeStudySplit: {
    id: 8,
    cost: 1e10,
    description: "你可以在时间研究树的维度分叉上选择所有路径"
  },
  dilationPenalty: {
    id: 9,
    cost: 1e11,
    description: () => `减弱时间膨胀的减益效果 (当前：${formatPow(1.05, 2, 2)})`,
    effect: 1.05,
  },
  ttGenerator: {
    id: 10,
    cost: 1e15,
    description: "超光速粒子产生时间之理",
    effect: () => Currency.tachyonParticles.value.div(20000).times(
      Alpha.isRunning ? AlphaUnlocks.timeTheoremGeneration.effects.nerf.effectOrDefault(1) : 1),
    formatEffect: value => `${format(value, 2, 1)}/秒`
  },
  dtGainPelle: rebuyable({
    id: 11,
    initialCost: 1e14,
    increment: 100,
    capIncreaseAt: () => Decimal.floor((Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).div(2)).sub(6)).toNumber(),
    pelleOnly: true,
    description: () => `获得的膨胀时间 ${formatX(5)}`,
    effect: bought => Decimal.pow(5, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  galaxyMultiplier: rebuyable({
    id: 12,
    initialCost: 1e15,
    increment: 1000,
    capIncreaseAt: () => Decimal.floor((Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).div(3)).sub(4)).toNumber(),
    pelleOnly: true,
    description: "成倍增加获得的超光速粒子星系，在超光速粒子星系翻倍升级后生效",
    effect: bought => bought + 1,
    formatEffect: value => `${formatX(value, 2)} ➜ ${formatX(value + 1, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  tickspeedPower: rebuyable({
    id: 13,
    initialCost: 1e16,
    increment: 1e4,
    capIncreaseAt: () => Decimal.floor((Decimal.log10(DilationUpgradeScaling.PRIMARY_SCALING).div(4)).sub(3)).toNumber(),
    pelleOnly: true,
    description: "增强计数频率",
    effect: bought => 1 + bought * 0.03,
    formatEffect: value => `${formatPow(value, 2, 2)} ➜ ${formatPow(value + 0.03, 2, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: () => Number.MAX_VALUE
  }),
  galaxyThresholdPelle: {
    id: 14,
    cost: 1e45,
    pelleOnly: true,
    description: "超光速粒子星系阈值是原来的立方根",
    effect: 1 / 3
  },
  flatDilationMult: {
    id: 15,
    cost: 1e55,
    pelleOnly: true,
    description: () => `基于当前永恒点数获得更多膨胀时间`,
    effect: () => Decimal.pow(1e9, Decimal.min(Decimal.pow(Decimal.max(player.eternityPoints.add(1).log10().sub(1500), 0).div(2500), 1.2), 1).times(Alpha.isDestroyed ? player.eternityPoints.add(1).log10().sub(4000).max(1).log10().max(1) : 1)),
    formatEffect: value => formatX(value, 2, 2)
  },
};
