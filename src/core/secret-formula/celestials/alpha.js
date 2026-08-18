export const alphaUnlocks = {
  fourthDimboost: {
    id: 0,
    requirement: 1,
    nerfDescription: "维度提升倍率 ^ 0.5",
    buffDescription: "维度提升倍率 ^ 2",
    effects: {
      nerf: 0.5,
      buff: 2
    }
  },
  fifthDimboost: {
    id: 1,
    requirement: 2,
    nerfDescription: "维度提升的价格增速翻倍",
    buffDescription: () => `维度提升的价格增速降低 ${formatInt(2)}`,
    effects: {
      nerf: 2,
      buff: 2
    }
  },
  firstGalaxy: {
    id: 2,
    requirement: 3,
    nerfDescription: () => `星系效力-${formatPercents(1 - Math.clamp(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(20).add(0.5).toNumber(), 0.5, 1), 2)}`,
    buffDescription: "炼金资源“交变”的效果将影响所有类型的星系",
    effects: {
      nerf: () => Math.clamp(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(20).add(0.5).toNumber(), 0.5, 1)
    }
  },
  infinity: {
    id: 3,
    requirement: 4,
    nerfDescription: "无限升级的价格翻倍",
    buffDescription: () => `无限点数获取量 ${formatPow(1 + (Tesseracts.effectiveCount / 1000), 2, 3)}（基于超立方体）`,
    effects: {
      nerf: 2,
      buff: () => 1 + (Tesseracts.effectiveCount / 1000)
    }
  },
  autoCrunchChallenge: {
    id: 4,
    requirement: 5,
    nerfDescription: () => `升级自动大坍缩的价格增速 ${formatX(2.5, 1, 1)}`,
    buffDescription: "充能无限升级的效力获得等同于特蕾莎等级 × 2的倍率",
    effects: {
      nerf: 2.5,
      buff: 2
    }
  },
  breakInfinity: {
    id: 5,
    requirement: 6,
    nerfDescription: () => `打破无限升级价格${formatX(1000)}，打破无限后计数频率提升和购买 10 个反物质维度的初始价格增长 ${formatX(20)}，无限之力转换指数除以 ${format(Decimal.max(DC.D8.div(Decimal.log10(Decimal.log10(Currency.infinityPoints.value.add(1)).add(1)).pow(2).clampMin(0.001)), 1).toNumber(), 2, 2)}（基于无限点数），但是星系强度翻倍`,
    buffDescription: () => `打破无限后计数频率提升的价格增长降低 ${format(0.15, 2, 2)}，打破无限后购买维度的价格增长降低 ${format(0.25, 2, 2)}`,
    effects: {
      nerfA: 1000,
      nerfB: 20,
      nerfC: () => Decimal.max(DC.D8.div(Decimal.log10(Decimal.log10(Currency.infinityPoints.value.add(1)).add(1)).pow(2).clampMin(0.001)), 1).toNumber(),
      buffA: 0.15,
      buffB: 0.25
    }
  },
  powerGalaxies: {
    id: 6,
    requirement: 7,
    nerfDescription: () => `遥远星系的价格增长从 ${formatInt(1)} 星系开始`,
    buffDescription: "遥远星系和极远星系的生效时间翻倍",
    effects: {
      nerf: 1,
      buff: 2
    }
  },
  breakUpgrades: {
    id: 7,
    requirement: 8,
    nerfDescription: () => `无限维度的购买上限降低至 ${formatInt(player.records.thisReality.galaxies.toNumber() * (EternityChallenge(1).isRunning ? 2 : 1))}（基于星系数量）`,
    buffDescription: () => `打破无限后计数频率提升的价格增长降低 ${format(0.15, 2, 2)}，打破无限后购买维度的价格增长降低 ${format(0.25, 2, 2)}`,
    effects: {
      nerf: () => player.records.thisReality.galaxies.toNumber() * (EternityChallenge(1).isRunning ? 2 : 1),
      buffA: 0.15,
      buffB: 0.25
    }
  },
  infinityChallenges: {
    id: 8,
    requirement: 9,
    nerfDescription: () => `无限点数倍增升级的购买上限降低至 ${formatInt(150)} 次`,
    buffDescription: () => `无限维度压缩因子降低 ${formatPercents(0.25, 2)}，将无限维度转化为连续统`,
    effects: {
      nerf: 150,
      buff: 0.75
    }
  },
  replicanti: {
    id: 9,
    requirement: 10,
    nerfDescription: () => `复制器间隔 ^ 2，且只受游戏速度 ${formatPercents(0.1)} 的影响`,
    buffDescription: "复制器间隔^ 0.5",
    effects: {
      nerf: 2,
      buff: 0.5
    }
  },
  infinityDimensions: {
    id: 10,
    requirement: 11,
    nerfDescription: () => `无限点数获取在第一次永恒前降低 ${formatPow(Math.clamp(1 - Decimal.log10(player.records.thisInfinity.maxAM.add(1)).sub(72500).div(227500).toNumber(), 0, 1), 2, 3)}`,
    buffDescription: () => `第八无限维度倍率 ^ ${formatInt(100)}`,
    effects: {
      nerf: () => Math.clamp(1 - Decimal.log10(player.records.thisInfinity.maxAM.add(1)).sub(72500).div(227500).toNumber(), 0, 1),
      buff: 100
    }
  },
  eternity: {
    id: 11,
    requirement: 12,
    nerfDescription: () => `时间维度的购买倍率降低至 ${formatX(2)}`,
    buffDescription: () => `购买第八时间维度超过 {{ formatInt(1e8) }} 次后不再不增加倍率。`,
    effects: {
      nerf: 2
    }
  },
  timestudy61: {
    id: 12,
    requirement: 13,
    nerfDescription: () => `时间之理购买价格 ${formatPow(1.5, 2, 3)}`,
    buffDescription: () => `永恒点数获取量 ${formatX(Decimal.pow10(Decimal.log10(Currency.infinityPoints.value.add(1)).div(1000)), 2, 2)}（基于无限点数）`,
    effects: {
      nerf: 1.5,
      buff: () => Decimal.pow10(Decimal.log10(Currency.infinityPoints.value.add(1)).div(1000))
    }
  },
  timeDimension4: {
    id: 13,
    requirement: 14,
    nerfDescription: () => `最高维时间维度倍率永远为 ${formatX(1)}`,
    buffDescription: () => `时间维度购买倍率提升至 ${formatX(10)}`,
    effects: {
      buff: 10
    }
  },
  eternityUpgrades: {
    id: 14,
    requirement: 15,
    nerfDescription: () => `无限维度倍率 ${formatPow(0.9, 2, 3)}`,
    buffDescription: () => `第一无限维度倍率^ ${formatInt(100)}`,
    effects: {
      nerf: 0.9,
      buff: 100
    }
  },
  eternityChallengeUnlock: {
    id: 15,
    requirement: 16,
    nerfDescription: () => `在永恒挑战中无限点数获取量 ${formatPow(0.75, 2, 3)}`,
    buffDescription: () => `移除永恒升级 ${formatInt(1)}的效果上限`,
    effects: {
      nerf: 0.75
    }
  },
  ecCompletion1: {
    id: 16,
    requirement: 17,
    nerfDescription: () => `在永恒挑战中无限点数获取量 ${formatPow(0.65, 2, 3)}，不与上条阿尔法削弱叠加`,
    buffDescription: () => `时间维度压缩因子降低 ${formatPercents(0.25, 2)}，将时间维度转化为连续统`,
    effects: {
      nerf: 0.65,
      buff: 0.75
    }
  },
  ecCompletion5: {
    id: 17,
    requirement: 18,
    nerfDescription: () => `在永恒挑战中无限点数获取量 ${formatPow(0.55, 2, 3)}，不与上条阿尔法削弱叠加，但在永恒挑战 ${formatInt(1)}内阿尔法对对无限点数的削弱失效`,
    buffDescription: () => `所有对时间维度倍率的加成效力 ${formatPow(5)}`,
    effects: {
      nerf: 0.55,
      buff: 5
    }
  },
  timestudy181: {
    id: 18,
    requirement: 19,
    nerfDescription: () => `反物质维度倍率 ${formatPow(0.9, 2, 3)}`,
    buffDescription: () => `所有对反物质维度倍率的加成效力 ${formatPow(5)}`,
    effects: {
      nerf: 0.9,
      buff: 5
    }
  },
  eternityChallenge10: {
    id: 19,
    requirement: 20,
    nerfDescription: () => `永恒点数获取 ${formatPow(0.9, 2, 3)}`,
    buffDescription: "无限次数获取量 ^ 2",
    effects: {
      nerf: 0.9,
      buff: 2
    }
  },
  timestudy192: {
    id: 20,
    requirement: 21,
    nerfDescription: () => `复制器数量在达到无限后，复制间隔升级价格增长每 ${format(DC.NUMMAX, 2, 2)} 复制器 ${formatX(1.5, 1, 1)} `,
    buffDescription: "复制器以衰减的倍率提高暗能量获取",
    effects: {
      nerf: 1.5,
      buff: () => ReplicantiMultipliers.deMult
    }
  },
  eternityChallenge11: {
    id: 21,
    requirement: 22,
    nerfDescription: () => `永恒挑战 ${formatInt(11)} 必须一次性完成 ${formatX(5)} 次`,
    buffDescription: () => `打破无限后计数频率提升的价格增长降低 ${format(0.075, 3, 3)}`,
    effects: {
      buff: 0.075
    }
  },
  ec11Bulk: {
    id: 22,
    requirement: 23,
    nerfDescription: () => `解锁时间膨胀需要耗费多 ${formatInt(10000)} 倍的时间之理，但是移除“第四时间维度倍率永远为 ${formatX(1)}”的阿尔法削弱，并降低下一个免费计数频率升级的价格增长倍率至 ${format(1.2, 2, 2)}`,
    buffDescription: () => `打破无限后计数频率提升的价格增长降低 ${format(0.075, 3, 3)}`,
    effects: {
      nerfA: 10000,
      nerfB: 1.2,
      buff: 0.075
    }
  },
  unlockDilation: {
    id: 23,
    requirement: 24,
    nerfDescription: () => `时间膨胀的初始指数衰减提高至 ${formatPow(0.5, 2, 3)}`,
    buffDescription: () => `时间膨胀的初始指数衰减降低至 ${formatPow(0.8, 2, 3)}`,
    effects: {
      nerf: 0.5,
      buff: 0.8
    }
  },
  dilatedEternity: {
    id: 24,
    requirement: 25,
    nerfDescription: () => `时间膨胀的初始指数衰减提高至 ${formatPow(0.42, 2, 3)} ，且膨胀时间产量仅收游戏速度  ${formatPercents(0.01)} 的影响`,
    buffDescription: () => `超光速粒子获取量 ${formatPow(1.4, 2, 3)}`,
    effects: {
      nerf: 0.42,
      buff: 1.4
    }
  },
  timeTheoremGeneration: {
    id: 25,
    requirement: 26,
    nerfDescription: () => `时间之理产量降低 ${formatPercents(Math.clamp(1 - Decimal.log10(Currency.dilatedTime.value.add(1)).div(100).toNumber(), 0, 1), 2)}（基于膨胀时间）`,
    buffDescription: () => `时间之理产量 ${formatPow(10)}`,
    effects: {
      nerf: () => Math.clamp(Decimal.log10(Currency.dilatedTime.value.add(1)).div(100).toNumber(), 0, 1),
      buff: 10
    }
  },
  timeDimension8: {
    id: 26,
    requirement: 27,
    nerfDescription: () => `永恒点数获取量 ${formatPow(Math.clamp(1 - Decimal.log10(player.records.thisEternity.maxIP.add(1)).sub(1.5e6).div(1.875e7).max(0).pow(0.375).toNumber(), 0, 1), 2, 3)}`,
    buffDescription: () => `第八时间维度倍率 ^ ${formatInt(1000)}`,
    effects: {
      nerf: () => Math.clamp(1 - Decimal.log10(player.records.thisEternity.maxIP.add(1)).sub(1.5e6).div(1.875e7).max(0).pow(0.375).toNumber(), 0, 1),
      buff: 1000
    }
  },
  reality: {
    id: 27,
    requirement: 28,
    nerfDescription: "无",
    buffDescription: "移除几乎所有的硬上限"
  }
};
