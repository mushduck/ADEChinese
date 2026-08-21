export const endgameMilestones = {
  riftFill: {
    endgames: 1,
    reward: () => {
      return `裂缝填充速度每次现实加快 ${formatPercents(0.05)}，在 ${formatInt(9)} 次终局后达到 ${formatPercents(Alpha.isDestroyed ? 0.9 : 0.45)} 的上限` + 
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 1
         ? (player.endgames >= 9 ? "(已达到上限: " : "(当前: ") + `+${formatPercents(Math.min(0.45, player.endgames * 0.05) + (Alpha.isDestroyed ? 0.45 : 0))})`
         : "(未解锁)"));
    }
  },
  remnantGalaxy: {
    endgames: 2,
    reward: () => {
      return "基于遗物数量提高星系强度" +
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 2 && Pelle.isDoomed
         ? `(当前: +${formatDecimalPercents(Decimal.pow(Decimal.log10(Currency.remnants.value.add(1)).add(1), 0.5).sub(1), 2, 2)})`
         : (player.endgames < 2 ? "(未解锁)" : "(当前无效果)")));
    }
  },
  fasterGalaxies: {
    endgames: 5,
    reward: "解锁一个新的星系生成器升级"
  },
  galGenAnimation: {
    endgames: 10,
    reward: () => {
      return `星系生成器动画速度每 ${formatInt(10)} 次终局加快 ${formatX(1.2, 0, 1)}，在 ${formatInt(200)} 次终局后达到上限` + 
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 10
         ? (player.endgames >= 200 && !Alpha.isDestroyed ? "(已达到上限: " : "(当前: ") + (Alpha.isDestroyed ? "立刻)" : `${formatX(Math.pow(1.2, Math.floor(Math.min(Currency.endgames.value, 200) / 10)), 2, 2)})`)
         : "(未解锁)"));
    }
  },
  remnantFormula: {
    endgames: 15,
    reward: "优化遗物获取公式(详情见佩勒页面)"
  },
  celestialEarlyUnlock: {
    endgames: 25,
    reward: () => {
      return `开始终局时解锁${formatInt(6)}位天神`;
    }
  },
  gameSpeedUncap: {
    endgames: 50,
    reward: () => {
      return `移除游戏速度的${format(1e300, 2, 2)}硬上限`;
    }
  },
  realityShardDTBoost: {
    endgames: 100,
    reward: () => {
      return "基于现实碎片提高膨胀时间获取量" + 
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 100
         ? `(当前: ${formatX(Currency.realityShards.value.plus(1), 2, 2)})`
         : "(未解锁)"));
    }
  },
  moreFasterGalaxies: {
    endgames: 250,
    reward: () => {
      return "基于终局次数提高被毁灭的现实内的星系产量" + 
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 250
         ? `(当前: ${formatX(Decimal.pow(10, Math.min(Currency.endgames.value / 200, 50)).times(Decimal.pow(10, Math.max((Math.log10(Currency.endgames.value + 1) - 4) * 50, 0))), 2, 2)})`
         : "(未解锁)"));
    }
  },
  autobuyerEndgame: {
    endgames: 1000,
    reward: "解锁自动终局"
  },
  endgameAntimatter: {
    endgames: 10000,
    reward: () => {
      return "基于终局次数提高反物质产量，该效果在被毁灭的现实内进一步加强" + 
        (player.disablePostReality ? "" : (player.endgames >= 10000
         ? `(当前: ${formatPow(Pelle.isDoomed ? 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 80) : 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 200), 2, 3)})`
         : "(未解锁)"));
    }
  },
  instabilityReduction: {
    endgames: 1000000,
    reward: () => {
      return "基于终局次数降低星系生成器不稳定性" + 
        (player.disablePostReality ? "(在被毁灭的现实中生效)" : (player.endgames >= 1000000
         ? `(当前: ${formatPow(Math.pow(1 / Math.log10(Currency.endgames.value + 1), 0.1), 2, 3)})`
         : "(未解锁)"));
    }
  }
};
