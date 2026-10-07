function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost() * Math.pow(config.costIncrease(), player.infinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect ||
      (value => {
        const afterECText = config.afterEC ? config.afterEC() : "";
        return SlabdrillUnlocks.breakInfinity.isUnlocked
          ? (value === config.maxUpgrades()
            ? `当前：${formatX(25 - value)} ${afterECText}`
            : `当前：${formatX(25 - value)} | 下一级：${formatX(25 - value - 1)}`)
          : ((Alpha.isRunning && Alpha.currentStage >= 6)
            ? (value === config.maxUpgrades()
              ? `当前：${formatX(20 - value)} ${afterECText}`
              : `当前：${formatX(20 - value)} | 下一级：${formatX(20 - value - 1)}`)
            : (value === config.maxUpgrades()
              ? `当前：${formatX(10 - value)} ${afterECText}`
              : `当前：${formatX(10 - value)} | 下一级：${formatX(10 - value - 1)}`));
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
    cost: () => 1e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "你的反物质维度基于产生的总反物质获得倍数加成" :
      `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于产生的总${player.universes.current === 2 ? "正物质" : "反物质"}获得倍数加成`,
    effect: () => Slabdrill.isCursed ? Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1), 12) :
      Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于总${player.universes.current === 2 ? "正物质" : "反物质"}和特蕾莎等级获得指数加成`,
      effect: () => Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.2).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  currentAMMult: {
    id: "currentMult",
    cost: () => 5e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "你的反物质维度基于当前反物质获得倍数加成" :
      `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于当前${player.universes.current === 2 ? "正物质" : "反物质"}获得倍数加成`,
    effect: () => Slabdrill.isCursed ? Decimal.pow(Currency.antimatter.value.add(1).log10().add(1), 12) :
      Decimal.pow(Currency.antimatter.value.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于当前${player.universes.current === 2 ? "正物质" : "反物质"}和特蕾莎等级获得指数加成`,
      effect: () => Decimal.pow(Currency.antimatter.value.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.2).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  galaxyBoost: {
    id: "postGalaxy",
    cost: () => 5e11 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? `所有星系增强 ${formatX(6.66, 2, 2)};；购买 10 个维度的倍率翻倍` :
      `所有星系增强 ${formatPercents(0.5)}`,
    effect: () => Slabdrill.isCursed ? 6.66 : 1.5,
    charged: {
      description: "所有星系基于特蕾莎等级增强",
      effect: () => Decimal.pow(Ra.pets.teresa.level, 2).add(50).div(100).add(1).toNumber(),
      formatEffect: value => `${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
    }
  },
  infinitiedMult: {
    id: "infinitiedMult",
    cost: () => 1e5 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "你的反物质维度基于无限次数获得倍数加成" :
      `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于无限次数获得倍数加成`,
    effect: () => Slabdrill.isCursed ? Currency.infinitiesTotal.value.add(1).pLog10().times(25).add(1).pow(8) :
      Currency.infinitiesTotal.value.add(1).pLog10().times(25).add(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于无限次数和特蕾莎等级获得指数加成`,
      effect: () => Decimal.pow(Currency.infinitiesTotal.value.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.5).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  achievementMult: {
    id: "achievementMult",
    cost: () => 1e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "你的反物质维度基于已完成的成就数获得倍数加成" :
      `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于已完成的成就数获得倍数加成`,
    effect: () => Slabdrill.isCursed ? Math.max(Math.pow(Math.pow((Achievements.effectiveCount - 30), 4) / 20, 8), 1) :
      Math.max(Math.pow((Achievements.effectiveCount - 30), 4) / 20, 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于已完成的成就数和特蕾莎等级获得指数加成`,
      effect: () => Math.pow(Achievements.effectiveCount * Ra.pets.teresa.level + 1, 0.25),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  slowestChallengeMult: {
    id: "challengeMult",
    cost: () => 5e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "你的反物质维度基于最慢的普通挑战时间获得倍数加成" :
      `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于最慢的普通挑战时间获得倍数加成`,
    effect: () => Slabdrill.isCursed ? Decimal.clampMin(new Decimal(300).div(Time.worstChallenge.totalMinutes.clampMin(0.001)), 1).pow(8)
      : (Alpha.isDestroyed
        ? new Decimal(300).div(Time.worstChallenge.totalMinutes)
        : Decimal.clampMin(new Decimal(300).div(Time.worstChallenge.totalMinutes.clampMin(0.001)), 1)),
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: () => Alpha.isDestroyed ? DC.BEMAX : (Slabdrill.isCursed ? DC.D2E5.pow(8) : DC.D2E5),
    charged: {
      description: () => `${player.universes.current === 2 ? "正物质" : "反物质"}维度基于强子化和特蕾莎等级获得指数加成`,
      effect: () => Decimal.pow(Laitela.hadronizes * Ra.pets.teresa.level + 1, 0.25),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
    cost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: "基于最快的无限被动生成无限次数",
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === DC.BEMAX && !Pelle.isDoomed) return "没有无限次数生成";
      const infinities = gainedInfinities();
      const timeStr = Time.bestInfinity.totalMilliseconds.lte(50) && !Alpha.isDestroyed
        ? `${TimeSpan.fromMilliseconds(new Decimal(100)).toStringShort()}（已达到上限）`
        : `${Time.bestInfinity.times(new Decimal(2)).toStringShort()}`;
      return `${format(infinities)} 无限次数 / ${timeStr}`;
    },
    charged: {
      description: "无限次数基于特蕾莎等级获得指数加成",
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 1.5),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
    cost: () => 2e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: "解锁自动进行最大维度擢升",
    charged: {
      description: "维度擢升基于特蕾莎等级增强",
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 0.5),
      formatEffect: value => `${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
    }
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
    cost: () => 1e15 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed
      ? `由普通挑战解锁或提升的自动购买器工作速度加倍，并获得 ${formatX(666)} 更多无限点数`
      : "由普通挑战解锁或提升的自动购买器工作速度加倍",
    charged: {
      description: "基于特蕾莎等级提高连续统购买倍率",
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 2),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: () => 1e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    costIncrease: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 2 : 5,
    maxUpgrades: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 23 :
      8 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: "降低无限之后的计数频率价格增速",
    afterEC: () => (EternityChallenge(11).completions > 0
      ? `永恒挑战 11 之后：${formatX(Player.tickSpeedMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    costIncrease: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 5 : 5e3,
    maxUpgrades: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 22 :
      7 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: () => `降低无限之后的${player.universes.current === 2 ? "正物质" : "反物质"}维度价格增速`,
    afterEC: () => (EternityChallenge(6).completions > 0
      ? `永恒挑战 6 之后：${formatX(Player.dimensionMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    costIncrease: () => 10,
    maxUpgrades: () => 10,
    effect: value => Player.bestRunIPPM.times(value / 10),
    description: () => {
      let generation = `自动生产你过去 10 次无限中最佳的无限点/分钟的 ${formatInt(10 * player.infinityRebuyables[2])}%`;
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += `➜ ${formatInt(10 * (1 + player.infinityRebuyables[2]))}%`;
      }
      return generation;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} 无限点数/分钟`,
    noLabel: false
  })
};