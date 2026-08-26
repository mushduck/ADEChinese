const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied && !PelleDestructionUpgrade.pelleGlyphEffects.canBeApplied
  ? "同时禁用无限符文的佩勒特殊词条"
  : "");

export const eternityChallenges = [
  {
    id: 1,
    description: () => {
      if (Alpha.isRunning) return "时间维度已禁用，无限维度购买上限翻倍。";
      return "时间维度已禁用。";
    },
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: "基于你在本次永恒中消耗的时间获得时间维度的倍率加成。",
      effect: completions =>
        Decimal.pow(Decimal.max(player.records.thisEternity.time.div(10), 0.9), 0.3 + (completions * 0.05)),
      formatEffect: value => formatX(value, 2, 1)
    },
    scrambleText: ["1e2600", "1e201600"],
  },
  {
    id: 2,
    description: "无限维度已禁用。",
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    alphaGoal: DC.E2200,
    alphaGoalIncrease: DC.E300,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC2Nerf.canBeApplied,
    reward: {
      description: "获得基于无限之力的第一无限维度的倍数加成。",
      effect: completions => Currency.infinityPower.value.pow(5 / (700 - completions * 100)).clampMin(1),
      cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E1000,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 3,
    description: "第五维度至第八维度什么都不会生产。禁用维度献祭。",
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    alphaGoal: DC.E750,
    alphaGoalIncrease: DC.E100,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC3Nerf.canBeApplied,
    reward: {
      description: () => `增加购买 ${formatInt(10)} 个反物质维度的倍数加成。`,
      effect: completions => completions * 0.72,
      formatEffect: value => `+${format(value, 2, 2)}`
    }
  },
  {
    id: 4,
    description: `禁用所有的无限次数倍增器和生成器，且无限次数不能超过限制。`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    alphaGoal: DC.E3200,
    restriction: completions => Math.max(16 - 4 * completions, 0),
    checkRestriction: restriction => Currency.infinities.lte(restriction),
    formatRestriction: restriction => (restriction === 0
      ? "在不进行无限中"
      : `在 1 次或更少次无限中`),
    failedRestriction: "(你的无限次数超过上限)",
    reward: {
      description: "基于未消费的无限点数获得无限维度的加成。",
      effect: completions => Currency.infinityPoints.value.pow(0.003 + completions * 0.002),
      cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E200,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 5,
    description: () => `星系价格立刻开始增加（通常在 ${formatInt(100)} 星系时开始）。维度提升价格增速大幅增加。`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    alphaGoal: DC.E1650,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC5Nerf.canBeApplied,
    reward: {
      description: "推迟遥远星系的价格增长",
      effect: completions => completions * 5,
      formatEffect: value => `${formatInt(value)} 星系后开始`
    }
  },
  {
    id: 6,
    description: () => {
      if (Enslaved.isRunning) return `你 *. 最大复制器星系升级的价格会大大降低。`;
      return `你无法正常地获得反物质星系。最大复制器星系升级的价格会大大降低。`;
    },
    goal: DC.E750,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E200,
    alphaGoal: DC.E800,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC6Nerf.canBeApplied,
    reward: {
      description: "进一步降低反物质维度的价格增速",
      effect: completions => completions * 0.2,
      formatEffect: value => {
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value;
        return `-${format(value, 2, 1)} (总共 ${formatX(total, 2, 1)})`;
      }
    },
    scrambleText: ["无法正常地获得反物质星系", "无㏰'퐚 正 ꟢地랜得ﻪﶓa⁍反㮾 䂇质㦂系"],
  },
  {
    id: 7,
    description:
      "第一时间维度生产第八无限维度，不生产时间碎片。 第一无限维度生产第七维度，而不是无限之力。" +
      "同时，计数频率也直接影响无限维度和时间维度。",
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    alphaGoal: DC.E1200,
    alphaGoalIncrease: DC.E200,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC7Nerf.canBeApplied,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: "第一时间维度生产第八无限维度",
      effect: completions => {
        let base = TimeDimension(1).productionPerSecond.pow(completions * 0.2).minus(1).clampMin(0);
        if (Pelle.isDoomed) base = base.min(DC.ENUMMAX).times(Decimal.pow10(base.max(1).log10().div(DC.NUMMAX).pow(0.1)));
        return base;
      },
      formatEffect: value => `${format(value, 2, 1)} 每秒`
    }
  },
  {
    id: 8,
    description: () => `你只能购买无限维度 ${formatInt(50)} 次，购买复制器升级 ${formatInt(40)} 次。禁用自动购买无限维度和复制器升级。`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E750,
    alphaGoal: DC.E2400,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC8Nerf.canBeApplied,
    reward: {
      description: "无限之力提升复制器星系的效果",
      effect: completions => {
        const infinityPower = Decimal.log10(Currency.infinityPower.value.add(1).pLog10().add(1));
        return Decimal.max(0, Decimal.pow(infinityPower, 0.03 * completions).sub(1)).toNumber();
      },
      formatEffect: value => formatPercents(value, 2)
    }
  },
  {
    id: 9,
    description: () => `你不能购买计数频率升级。无限之力不加成反物质维度，而是以极低的效果加成时间维度。 ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    alphaGoal: DC.E9000,
    alphaGoalIncrease: DC.E4000,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC9Nerf.canBeApplied,
    reward: {
      description: "基于时间碎片的无限维度倍数加成",
      effect: completions => Currency.timeShards.value.pow(completions * 0.1).clampMin(1),
      cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E400,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 10,
    description: () => {
      let description = `禁用时间维度和无限维度。你的反物质维度将取得基于无限次数的巨大提速。 (无限次数 ${formatPow(950)}). ${specialInfinityGlyphDisabledEffectText()}`;
      EternityChallenge(10).applyEffect(v => description += `当前: ${formatX(v, 2, 1)}`);
      return description;
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    alphaGoal: DC.E15000,
    alphaGoalIncrease: DC.E2000,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC10Nerf.canBeApplied,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: "时间维度基于无限次数获得加成",
      effect: completions => {
        const mult = Currency.infinitiesTotal.value.times(2.783e-6).pow(0.4 + 0.1 * completions).clampMin(1);
        return mult.powEffectOf(TimeStudy(31));
      },
      formatEffect: value => {
        const mult = formatX(value, 2, 1);
        return TimeStudy(31).canBeApplied
          ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (购买时间研究 131 后：${mult})`
          : mult;
      }
    }
  },
  {
    id: 11,
    description: () => `除了从无限之力和维度提升 (给予反物质维度) 获得的倍数外，禁用其他所有维度倍数。 ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E175,
    pelleGoalIncrease: DC.E1400,
    alphaGoal: DC.E6000,
    alphaGoalIncrease: DC.E450,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC11Nerf.canBeApplied,
    reward: {
      description: "进一步降低计数频率的价格增速",
      effect: completions => completions * 0.07,
      formatEffect: value => {
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value;
        return `-${format(value, 2, 2)} (总共 ${formatX(total, 2, 2)})`;
      }
    }
  },
  {
    id: 12,
    description: () => (PlayerProgress.realityUnlocked()
      ? `游戏速度放慢 ${formatInt(1000)} 倍。并禁用其它影响游戏速度的机制。必须在一定时间内达成目标，否则将无法通过挑战。 ${specialInfinityGlyphDisabledEffectText()}`
      : `游戏速度放慢 ${formatInt(1000)} 倍。并禁用其它影响游戏速度的机制。必须在一定时间内达成目标，否则将无法通过挑战。`),
    goal: DC.E100000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E10000,
    hasPelleGoal: () => !PelleDestructionUpgrade.disableEC12Nerf.canBeApplied,
    restriction: completions => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: restriction => Time.thisEternity.totalSeconds.lt(restriction),
    formatRestriction: restriction => `在游戏内时间：${quantify("", restriction, 0, 1)} 或更少`,
    failedRestriction: "(你超过了挑战时限，挑战失败)",
    reward: {
      description: "降低无限维度的价格增幅",
      effect: completions => 1 - (completions * 0.008 * EndgameMastery(273).effectOrDefault(1)),
      formatEffect: value => `x${formatPow(value, 3, 3)}`
    }
  }
];