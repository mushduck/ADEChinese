export const accelerators = {
  potency: {
    id: 1,
    key: "potency",
    name: "能量加速器",
    drainResource: "反物质",
    baseEffect1: x => `反物质产量 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `熵获取量 ${formatX(x, 2, 2)}`,
    baseEffect3: x => `神性物质/神性能量产量 ${formatX(x, 2, 2)}`,
    percentage: totalFill => Decimal.log10(totalFill.plus(1).log10().div(1e200)).div(100).toNumber(),
    percentageToFill: percentage => Decimal.pow10(Decimal.pow10(percentage * 100).times(1e200)).sub(1),
    effects: {
      alpha: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage / 10),
      beta: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage),
      gamma: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage / 5),
    },
    currency: () => Currency.antimatter,
    unlockReq: () => Decimal.pow10(1e200),
    milestones: [
      {
        resource: "potency",
        requirement: 0.15,
        description: "在虚无中反物质维度强度 ^ 2",
        effect: () => 2
      },
      {
        resource: "potency",
        requirement: 0.4,
        description: "基于强子总数量提高反物质上限",
        effect: () => player.disablePostReality ? 0 : Math.clamp(Math.floor(Math.pow(2 * Math.max(player.celestials.laitela.hadrons.total - 100, 0) + 0.25, 0.5) - 0.5), 0, 25)
      },
      {
        resource: "potency",
        requirement: 0.75,
        description: () => `将天界维度转化为连续统，受连续统倍率 ${formatPow(0.1, 1, 1)} 的加成`
      },
    ]
  },
  emptiness: {
    id: 2,
    key: "emptiness",
    name: "虚空加速器",
    drainResource: "虚物质",
    baseEffect1: x => `在虚无中反物质维度强度 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `强子效果上限 +${formatPercents(x - 1, 2)}`,
    baseEffect3: x => `反物质溢出因子 ${formatInt(10)} ➜ ${format(x, 2, 2)}`,
    percentage: totalFill => Decimal.min(totalFill.div(20000), totalFill.max(1).log10()).div(100).toNumber(),
    percentageToFill: percentage => Decimal.max(new Decimal(percentage * 100).times(20000), Decimal.pow10(percentage * 100)),
    effects: {
      alpha: percentage => Decimal.pow(1 + percentage / 100, 1 + percentage / 100),
      beta: percentage => player.disablePostReality ? 1 : 1 + percentage / 100,
      gamma: percentage => player.disablePostReality ? 10 : 1 / (0.1 + percentage * 3 / 2000),
    },
    currency: () => Currency.nullMatter,
    unlockReq: () => Decimal.pow10(5),
    milestones: [
      {
        resource: "emptiness",
        requirement: 0.07,
        description: "在虚无中，基于在被毁灭的现实外产生的总反物质数量为反物质维度提供指数加成",
        effect: () => Decimal.log10(Decimal.log10(player.records.totalAntimatterOutsideDoom)).div(200).add(1)
      },
      {
        resource: "emptiness",
        requirement: 0.3,
        description: "基于在虚无中最高反物质数量为神性维度提供指数加成",
        effect: () => player.disablePostReality ? DC.D1 : Decimal.log10(Decimal.log10(player.endgame.largeHadronCollider.void.highestAntimatter)).div(100).add(1)
      },
      {
        resource: "emptiness",
        requirement: 1,
        description: () => `反物质硬上限 × F1E1e50`,
        effect: () => player.disablePostReality ? 0 : 25
      },
    ]
  },
  cosmic: {
    id: 3,
    key: "cosmic",
    name: "星河加速器",
    drainResource: "星系",
    baseEffect1: x => `星系产量 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `在被毁灭的现实中反物质指数 ${formatPow(x, 2, 3)}`,
    baseEffect3: x => `在被毁灭的现实中反物质第二指数 ${formatPow(x, 2, 4)}`,
    percentage: totalFill => Math.min(Decimal.log10(totalFill.max("1e3000")).sub(3000).div(5000).sqrt().times(20).div(100).toNumber(),
      Decimal.log10(totalFill.max(1)).sub(3000).div(5000).times(20).div(100).toNumber()),
    percentageToFill: percentage => Decimal.max(Decimal.pow10(Decimal.sqr(percentage * 100 / 20).times(5000).add(3000)),
      Decimal.pow10(new Decimal(percentage * 100 / 20).times(5000).add(3000))),
    effects: {
      alpha: percentage => player.disablePostReality ? 1 : 1 + percentage / 200,
      beta: percentage => player.disablePostReality ? 1 : 1 + percentage / 100,
      gamma: percentage => player.disablePostReality ? 1 : 1 + percentage / 2000,
    },
    currency: () => Currency.galaxyGeneratorGalaxies,
    unlockReq: () => Decimal.pow10(3000),
    milestones: [
      {
        resource: "cosmic",
        requirement: 0.2,
        description: "在虚无中基于星河加速器的充能进度提升星系强度",
        effect: () => 1 + Accelerators.cosmic.percentage * 100
      },
      {
        resource: "cosmic",
        requirement: 0.4,
        description: "解锁一个新的星系生成器升级"
      },
      {
        resource: "cosmic",
        requirement: 1,
        description: () => `反物质硬上限 × F1E1e${format(Decimal.log10(DC.NUMMAX).sub(275).times(2), 4, 4)}`,
        effect: () => player.disablePostReality ? 0 : Decimal.log10(DC.NUMMAX).sub(275).toNumber()
      },
    ]
  }
};
