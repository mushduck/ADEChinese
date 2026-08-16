import wordShift from "../../word-shift";

export const pelleRifts = {
  vacuum: {
    id: 1,
    key: "vacuum",
    name: ["空洞", "虚无", "寂灭"],
    drainResource: "无限点数",
    baseEffect: x => `无限点数获取量 ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.vacuum.milestones[2]],
    strike: () => PelleStrikes.infinity,
    percentage: totalFill => Decimal.pow(Decimal.log10(totalFill.plus(1).log10().times(10).add(1)), 2.5).div(100).toNumber(),
    percentageToFill: percentage => Decimal.pow(10,
      Decimal.pow(10, (percentage * 100) ** (1 / 2.5)).div(10).minus(0.1)
    ).minus(1),
    effect: totalFill => {
      if (player.challenge.eternity.current !== 0 && !PelleStrikes.ECs.isDestroyed()) {
        const chall = EternityChallenge.current;
        const goal = chall.goalAtCompletions(chall.gainedCompletionStatus.totalCompletions);
        return totalFill.plus(1).pow(0.1).min(goal.pow(0.15));
      }
      return totalFill.plus(1).pow(0.33).min(Decimal.pow10(1e150));
    },
    currency: () => Currency.infinityPoints,
    galaxyGeneratorThreshold: 1000,
    milestones: [
      {
        resource: "vacuum",
        requirement: 0.04,
        description: "你可以装备一个等级和稀有度大幅降低的基本类型符文。"
      },
      {
        resource: "vacuum",
        requirement: 0.06,
        description: () => `复制器无数量上限，解锁复制器和复制器升级的价格是原来的 ${formatX(1e130)} 分之一`,
        effect: () => 1e130
      },
      {
        resource: "vacuum",
        requirement: 0.4,
        description: () => `${wordShift.wordCycle(PelleRifts.vacuum.name)} 也能提升获得永恒点数的数量`,
        effect: () => Decimal.pow(4, PelleRifts.vacuum.totalFill.add(1).log10().div(2).div(308).add(3)),
        formatEffect: x => `永恒点数获取量 ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "留给星系的空间不够了，你必须填充 $value"
  },
  decay: {
    id: 2,
    key: "decay",
    name: ["枯朽", "腐败", "凋零"],
    drainResource: "复制器",
    spendable: true,
    baseEffect: x => `复制器速度 ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.decay.milestones[0], PelleRifts.decay.milestones[2]],
    strike: () => PelleStrikes.powerGalaxies,
    percentage: totalFill => totalFill.plus(1).log10().times(0.05).div(100).toNumber(),
    percentageToFill: percentage => Decimal.pow(10, 20 * percentage * 100).minus(1),
    effect: totalFill => (PelleRifts.chaos.milestones[0].canBeApplied
      ? Decimal.sqrt(2000 + 1) : Decimal.sqrt(totalFill.plus(1).log10().add(1))),
    currency: () => Currency.replicanti,
    galaxyGeneratorThreshold: 1e7,
    milestones: [
      {
        resource: "decay",
        requirement: 0.2,
        description: "第一个可重复购买的佩勒升级能影响第一无限维度",
        effect: () => {
          const x = player.celestials.pelle.rebuyables.antimatterDimensionMult;
          return Decimal.pow(1e50, x - 9);
        },
        formatEffect: x => `第一无限维度 ${formatX(x, 2, 2)}`
      },
      {
        resource: "decay",
        requirement: 0.6,
        description: () => `复制器数量超过 ${format(DC.E1300)} 后，所有星系的效果增强 ${formatPercents(0.1)}`,
        effect: () => (Replicanti.amount.gt(DC.E1300) ? 1.1 : 1)
      },
      {
        resource: "decay",
        requirement: 1,
        description: "基于裂痕里程碑的总量，增加复制器星系的最大数量",
        effect: () => {
          const x = PelleRifts.totalMilestones();
          return new Decimal(x ** 2 - 2 * x);
        },
        formatEffect: x => `复制器星系最大数量 +${formatInt(x)}`
      },
    ],
    galaxyGeneratorText: "反物质的数量不足以生成新的星系，你需要逆转 $value"
  },
  chaos: {
    id: 3,
    key: "chaos",
    name: ["混沌", "紊乱", "杂质"],
    drainResource: ["枯朽", "腐败", "凋零"],
    baseEffect: x => `时间维度 ${formatX(x, 2, 2)}`,
    strike: () => PelleStrikes.eternity,
    percentage: totalFill => totalFill / 10,
    percentageToFill: percentage => 10 * percentage,
    effect: totalFill => {
      const fill = totalFill > 6.5
        ? (totalFill - 6.5) / 7 + 6.5
        : totalFill;
      return Decimal.min(Decimal.pow(6, Decimal.pow(6, Decimal.pow(6, Math.min(fill, 10) / 10 + 0.1)).minus(6))
        .div(1e5)
        .plus(Decimal.pow(10, fill / 10 + 0.1))
        .times(Decimal.pow(6, Decimal.pow(6, Decimal.log10(Math.max(fill - 9, 1)).pow(6)).sub(1))), Decimal.pow10(Decimal.pow(
        DC.NUMMAX, Decimal.pow(2, Math.min(player.celestials.pelle.divinities, 8)).times(
        Decimal.pow(1.5, Math.max(player.celestials.pelle.divinities - 8, 0))))));
    },
    currency: () => ({
      get value() {
        return PelleRifts.decay.percentage;
      },
      set value(val) {
        const spent = PelleRifts.decay.percentage - val;
        player.celestials.pelle.rifts.decay.percentageSpent += spent;
      }
    }),
    galaxyGeneratorThreshold: 1e9,
    milestones: [
      {
        resource: "chaos",
        requirement: 0.09,
        description: () => `${wordShift.wordCycle(PelleRifts.decay.name)} 的效果始终为最大值，其所有的里程碑始终有效`
      },
      {
        resource: "chaos",
        requirement: 0.15,
        description: "符文获得一个在佩勒的现实中特有的词条",
      },
      {
        resource: "chaos",
        requirement: 1,
        description: () => `每秒自动获得永恒时能获得的永恒点数的 ${formatPercents(0.01)}`,
      },
    ],
    galaxyGeneratorText: "你的星系太分散了，你必须平息 $value"
  },
  recursion: {
    id: 4,
    key: "recursion",
    name: ["轮回", "分裂", "终结"],
    drainResource: "永恒点数",
    baseEffect: x => `永恒点数公式: log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(308 - x.toNumber(), 2)}`,
    additionalEffects: () => [PelleRifts.recursion.milestones[0], PelleRifts.recursion.milestones[1]],
    strike: () => PelleStrikes.ECs,
    percentage: totalFill => Decimal.pow(totalFill.plus(1).log10(), 0.4).div(4000 ** 0.4).toNumber(),
    percentageToFill: percentage => Decimal.pow(10, percentage ** 2.5 * 4000).minus(1),
    effect: totalFill => Decimal.pow(totalFill.plus(1).log10(), 0.2).div(4000 ** 0.2).times(58).min(100).times(new Decimal(2.08).times(DC.D1.sub(Decimal.pow(0.8, totalFill.plus(1).log10().plus(1).log10().plus(1).log10().sub(0.7).times(10).max(0)))).add(1)),
    currency: () => Currency.eternityPoints,
    galaxyGeneratorThreshold: 1e10,
    milestones: [
      {
        resource: "recursion",
        requirement: 0.10,
        description: "基于永恒挑战的完成数量，提升维度提升的效果",
        effect: () => Math.max(100 * EternityChallenges.completions ** 2, 1) *
          Math.max(1e4 ** (EternityChallenges.completions - 40), 1),
        formatEffect: x => `维度提升指数 ${formatX(x, 2, 2)}`
      },
      {
        resource: "recursion",
        requirement: 0.15,
        description: "基于永恒挑战的完成数量，提升无限维度的效果",
        effect: () => Decimal.pow("1e1500", (Math.max(EternityChallenges.completions - 25, 0) / 20) ** 1.7).max(1),
        formatEffect: x => `无限维度 ${formatX(x)}`
      },
      {
        resource: "recursion",
        requirement: 1,
        description: "解锁星系生成器",
      },
    ],
    galaxyGeneratorText: "创造更多的星系是不可持续的，你必须专注于 $value"
  },
  paradox: {
    id: 5,
    key: "paradox",
    name: ["悖论", "矛盾", "谬误"],
    drainResource: "膨胀时间",
    baseEffect: x => `所有维度 ${formatPow(x, 2, 3)}`,
    additionalEffects: () => [PelleRifts.paradox.milestones[2]],
    strike: () => PelleStrikes.dilation,
    percentage: totalFill => totalFill.plus(1).log10().div(100).toNumber(),
    percentageToFill: percentage => Decimal.pow10(percentage * 100).minus(1),
    effect: totalFill => totalFill.plus(1).log10().times(0.004).add(1),
    currency: () => Currency.dilatedTime,
    galaxyGeneratorThreshold: 1e5,
    milestones: [
      {
        resource: "paradox",
        requirement: 0.15,
        description: "大幅降低第五至第八时间维度的价格，解锁更多的膨胀升级",
        // FIXME: Not a great solution
        onStateChange: () => {
          updateTimeDimensionCosts();
        }
      },
      {
        resource: "paradox",
        requirement: 0.25,
        description: () => `获得膨胀时间的数量等于超光速粒子 ${formatPow(1.4, 1, 1)}`,
        effect: 1.4
      },
      {
        resource: "paradox",
        requirement: 0.5,
        description: "基于可重复购买膨胀升级的数量，增加无限之力提升反物质维度的指数",
        effect: () => Math.min(
          1.1075 ** (Object.values(player.dilation.rebuyables).sum() - 60),
          712
        ),
        formatEffect: x => `无限之力加成指数 ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "你似乎可以创造更多的星系，但佩勒限制了你，无视 $value"
  }
};