function dimInfinityMult() {
  return Currency.infinitiesTotal.value.times(0.2).plus(1);
}
function chargedDimInfinityMult() {
  return 1 + Decimal.log10(Decimal.max(1, Currency.infinitiesTotal.value.add(1).pLog10())).toNumber() * Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 150;
}

export const infinityUpgrades = {
  totalTimeMult: {
    id: "timeMult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: "反物质维度获得基于游玩时间的倍数加成",
    effect: () => Decimal.pow(Time.totalTimePlayed.totalMinutes.div(2), 0.15),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "反物质维度获得基于总游戏时间和特蕾莎等级的指数加成",
      effect: () => 1 +
        Decimal.log10(Decimal.log10(Time.totalTimePlayed.totalMilliseconds)).times(
          Math.pow(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)), 0.5)).div(150).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim18mult: {
    id: "18Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.totalTimeMult.isBought,
    description: "第一和第八反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第一和第八反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim27mult: {
    id: "27Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.buy10Mult.isBought,
    description: "第二和第七反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第二和第七反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim36mult: {
    id: "36Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim18mult.isBought,
    description: "第三和第六反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第三和第六反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim45mult: {
    id: "45Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim27mult.isBought,
    description: "第四和第五反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第四和第五反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  resetBoost: {
    id: "resetBoost",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim36mult.isBought,
    description: () =>
      `维度提升和反物质星系对维度的需求减少 ${formatInt(9)}`,
    effect: 9,
    charged: {
      description: () => "基于特蕾莎等级降低维度提升的需求",
      effect: () => 1 / (1 + Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 10),
      formatEffect: value => `${formatX(value, 4, 4)}`
    }
  },
  buy10Mult: {
    id: "dimMult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: () => `增加购买${formatInt(10)}个反物质维度的倍数加成。`,
    effect: () => 1.1,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.2, 0, 1)}`,
    charged: {
      description: () => `每买${formatInt(10)}个反物质维度的倍数基于特蕾莎等级获得指数加成`,
      effect: () => 1 + (Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  galaxyBoost: {
    id: "galaxyBoost",
    cost: () => Math.pow(2, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim45mult.isBought,
    description: "反物质星系的效果加倍",
    effect: 2,
    charged: {
      description: "所有星系基于特蕾莎等级获得加成",
      effect: () => 2 + Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 100,
      formatEffect: value => `+${formatPercents(value - 1)}`
    }
  },
  thisInfinityTimeMult: {
    id: "timeMult2",
    cost: () => Math.pow(3, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: "反物质维度获得基于当前无限所花费的时间的倍数加成",
    effect: () => Decimal.max(Decimal.pow(Time.thisInfinity.totalMinutes.div(4), 0.25), 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description:
        "反物质维度获得基于当前无限所花费的时间和特蕾莎等级的指数加成",
      effect: () => 1 +
        Decimal.log10(Decimal.log10(Time.thisInfinity.totalMilliseconds.plus(100))).times(
          Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)))).div(150).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  unspentIPMult: {
    id: "unspentBonus",
    cost: () => Math.pow(5, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.thisInfinityTimeMult.isBought,
    description: "第一反物质维度获得基于未花费的无限点数的倍数加成",
    effect: () => {
      const divisor = (EndgameMastery(81).isBought && !player.disablePostReality) ? 5 : 10;
      const subtrahend = (EndgameMastery(81).isBought && !player.disablePostReality) ? 1.5 : 0;
      return Decimal.min(Currency.infinityPoints.value.dividedBy(2), Decimal.pow(DC.E1E15, EndgameUpgrade(1).effectOrDefault(1))).pow(Decimal.max((Decimal.log10(Currency.infinityPoints.value.add(10).log10()).div(divisor)).sub(subtrahend), 1.5)).plus(1);
    },
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于未使用的无限点数获得第一个反物质维度倍数，然后由特蕾莎等级提供指数加成",
      effect: () => {
        const divisor = (EndgameMastery(81).isBought && !player.disablePostReality) ? 5 : 10;
        const subtrahend = (EndgameMastery(81).isBought && !player.disablePostReality) ? 1.5 : 0;
        return Decimal.min(Currency.infinityPoints.value.dividedBy(2), Decimal.pow(DC.E1E15, EndgameUpgrade(1).effectOrDefault(1))).pow(Decimal.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))).times(Decimal.max((Decimal.log10(Currency.infinityPoints.value.add(10).log10()).div(divisor)).sub(subtrahend), 1.5))).plus(1);
      },
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  dimboostMult: {
    id: "resetMult",
    cost: () => Math.pow(7, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.unspentIPMult.isBought,
    description: "增加维度提升的倍数加成",
    effect: () => 2.5,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.5, 0, 1)}`,
    charged: {
      description: "维度提升倍率获得基于特蕾莎等级的指数加成",
      effect: () => 1 + (Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  ipGen: {
    id: "passiveGen",
    cost: () => Math.pow(10, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dimboostMult.isBought,
    description: () => `依据你最快一次无限用时的 ${formatInt(10)} 分之一的速度自动生成无限点数`,
    // Cutting corners: this is not actual effect, but it is totalIPMult that is displyed on upgrade
    effect: () => (Teresa.isRunning || V.isRunning || (Pelle.isDoomed && !PelleDestructionUpgrade.passiveIPGen.canBeApplied) ? DC.D0 : GameCache.totalIPMult.value),
    formatEffect: value => {
      if (Teresa.isRunning || V.isRunning) return "在本次现实中被禁用";
      if (Pelle.isDoomed && !PelleDestructionUpgrade.passiveIPGen.canBeApplied) return "已禁用";
      if (Alpha.isRunning && player.records.bestInfinity.realTime >= 999999999999) return "生成太慢"; 
      if (player.records.bestInfinity.time.gte(999999999999)) return "生成太慢"; 
      if (Alpha.isRunning) return `${format(value, 2)} / ${TimeSpan.fromMilliseconds(Time.bestInfinityRealTime.totalMilliseconds.times(10)).toStringShort()}`;
      return `${format(value, 2)} / ${TimeSpan.fromMilliseconds(Time.bestInfinity.totalMilliseconds.times(10)).toStringShort()}`;
    },
    charged: {
      description: () =>
        `基于即将获得的现实机器，每秒获得一定比例的现实机器，并随特蕾莎等级增加`,
      effect: () => Math.pow(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)), 2) *
        Ra.unlocks.continuousTTBoost.effects.autoPrestige.effectOrDefault(1),
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  skipReset1: {
    id: "skipReset1",
    cost: () => Math.pow(20, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: () =>
      `每次重置后开始于 ${formatInt(1)} 个维度提升，并自动解锁第五反物质维度`,
  },
  skipReset2: {
    id: "skipReset2",
    cost: () => Math.pow(40, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset1.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(2)} 个维度提升，并自动解锁第六反物质维度`,
  },
  skipReset3: {
    id: "skipReset3",
    cost: () => Math.pow(80, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset2.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(3)} 个维度提升，并自动解锁第七反物质维度`,
  },
  skipResetGalaxy: {
    id: "skipResetGalaxy",
    cost: () => Math.pow(300, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset3.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(4)} 个维度提升和一个反物质星系，并自动解锁第八反物质维度`,
  },
  ipOffline: {
    id: "ipOffline",
    cost: () => Math.pow(1000, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => Achievement(41).isUnlocked,
    description: () => (player.options.offlineProgress
      ? `仅在离线时，自动获得无限点数，速度为未使用"最大"按钮时所取得的最佳"无限点数/分钟"的 ${formatPercents(0.5)}.`
      : "此升级将在离线时产生无限点数，但目前已禁用离线进度"),
    effect: () => (player.options.offlineProgress
      ? player.records.thisEternity.bestIPMsWithoutMaxAll.times(TimeSpan.fromMinutes(new Decimal(1)).totalMilliseconds.div(2))
      : DC.D0),
    isDisabled: () => !player.options.offlineProgress,
    formatEffect: value => `${format(value, 2, 2)} 无限点数/分钟`,
  },
  ipMult: {
    id: "ipMult",
    cost: () => InfinityUpgrade.ipMult.cost,
    checkRequirement: () => Achievement(41).isUnlocked || Ascensions.ipA.isUnlocked,
    costCap: () => Ascensions.ipA.isUnlocked ? DC.BEMAX : (Alpha.isRunning ? Decimal.pow10(AlphaUnlocks.infinityChallenges.effects.nerf.effectOrDefault(Decimal.log10((BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E6E6).sub(1))).times(10) : ((BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E6E6)),
    costIncreaseThreshold: () => Ascensions.ipA.isUnlocked ? DC.BEMAX : ((EndgameUpgrade(21).isBought && !player.disablePostReality) ? Decimal.pow10(1e125) : DC.E3E6),
    description: () => Ascensions.ipA.isUnlocked ? `无限点数的指数 +${formatPow(0.01, 2, 2)}`  : `将所有来源的无限点乘以 ${formatX(2)}`,
    // Normally the multiplier caps at e993k or so with 3300000 purchases, but if the cost is capped then we just give
    // an extra e7k to make the multiplier look nice
    effect: () => Ascensions.ipA.isUnlocked ? player.IPMultPurchases.div(100).add(1) : ((player.IPMultPurchases.gte(3300000) && (!BreakEternityUpgrade.doubleIPUncap.isBought || player.disablePostReality) ? DC.E1E6 : Decimal.round(DC.D2.pow(player.IPMultPurchases)))),
    cap: () => {
      if (Ascensions.ipA.isUnlocked) return DC.BEMAX;
      const normcap = (BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E1E6;
      return Alpha.isRunning ? Decimal.pow(2, AlphaUnlocks.infinityChallenges.effects.nerf.effectOrDefault(Decimal.log2(Effarig.eternityCap ?? normcap))) : (Effarig.eternityCap ?? normcap);
    },
    formatEffect: value => `${Ascensions.ipA.isUnlocked ? formatPow(value, 2, 2) : formatX(value, 2, 2)}`,
  }
};