// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "首次在挑战之外达到无限。"
        : "首次达到无限。";
    },
    name: () => `第一${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第一${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => "无限以极低的速率自我强化",
      effect: () => player.infinities.max(4).log2().log2(),
      formatEffect: value => formatPow(value, 2, 3)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D0
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => `购买${player.universes.current === 2 ? "物质" : "反物质"}维度或计数频率升级会停止
      ${Slabdrill.isCursed ? "你的反物质维度" : `所有${player.universes.current === 2 ? "物质" : "反物质"}维度`}的生产。生产会在 ${formatInt(3)} 分钟内逐渐恢复正常。`,
    name: () => `第二${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第二${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => `获得前三种维度类型的一个指数，在本终局中随 ${formatInt(5)} 小时增长`,
      effect: () => Time.thisEndgameRealTime.totalSeconds.max(1).min(18000).pow(0.75),
      formatEffect: value => formatPow(value, 2, 3)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      () => `${Slabdrill.isCursed ? "你的" : "第一"}${player.universes.current === 2 ? "物质" : "反物质"}维度被大幅削弱，但获得一个无上限的指数增长倍率。该倍率在维度提升和${player.universes.current === 2 ? "物质" : "反物质"}星系后重置。`,
    name: () => `第三${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第三${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => `使第一${player.universes.current === 2 ? "物质" : "反物质"}维度获得一个膨胀效果，在本终局中随 ${formatInt(5)} 小时增长`,
      effect: () => Time.thisEndgameRealTime.totalHours.min(5).div(100).add(1),
      formatEffect: value => formatPow(value, 2, 4)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: () => Slabdrill.isCursed ? "购买你的反物质维度会重置反物质。" :
      `购买${player.universes.current === 2 ? "一个物质" : "一个反物质"}维度会自动清除所有更低层级的${player.universes.current === 2 ? "物质" : "反物质"}维度，` +
      "就像一次不提供加成的献祭。",
    name: () => `第四${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第四${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => "维度涌流根据其数量变得更便宜",
      effect: () => Decimal.pow(0.9, player.dimensionBoosts.max(1).log10()),
      formatEffect: value => formatPow(value, 2, 3)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `计数频率购买倍率从 ${formatX(1.080, 0, 3)} 开始，而不是 ${formatX(1.1245, 0, 3)}。`,
    name: () => `第五${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第五${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => "星系根据总星系数量变得更强",
      effect: () => Decimal.log10(GalacticPowers.galacticAscension.isUnlocked ?
        Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(
        GalacticPower.freeGalaxies.max(1)).times(GalaxyGenerator.galaxies.max(1)).max(10) :
        Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(
        GalacticPower.freeGalaxies).add(GalaxyGenerator.galaxies).max(10)).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => Slabdrill.isCursed ? "你的反物质维度更贵。" :
      `升级每个${player.universes.current === 2 ? "物质" : "反物质"}维度消耗其下方 ${formatInt(2)} 层的${player.universes.current === 2 ? "物质" : "反物质"}维度，而不是${player.universes.current === 2 ? "物质" : "反物质"}。${player.universes.current === 2 ? "物质" : "反物质"}维度价格被修改。`,
    name: () => `第六${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第六${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => `基于第八${player.universes.current === 2 ? "物质" : "反物质"}维度获得更多连续统购买次数`,
      effect: () => Decimal.log10(AntimatterDimension(8).amount.max(10)).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      Slabdrill.isCursed ? `购买 ${formatInt(10)} 个${player.universes.current === 2 ? "物质" : "反物质"}维度获得的倍率减少至 ${formatX(5)}。
        每次维度提升增加 ${formatX(5)}，上限为 ${formatX(30)}，且不受任何升级影响。` :
      `购买 ${formatInt(10)} 个${player.universes.current === 2 ? "物质" : "反物质"}维度获得的倍率减少至 ${formatX(1)}。每次维度提升增加
        ${formatX(0.2, 1, 1)}，上限为 ${formatX(2)}，且不受任何升级影响。`,
    name: () => `第七${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第七${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => "购买数量级指数基于维度涌流变得更强",
      effect: () => Decimal.log10(player.dimensionBoosts.max(1)).add(1),
      formatEffect: value => formatX(value, 2, 2)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: () => `维度提升不提供倍率，且无法购买${player.universes.current === 2 ? "物质" : "反物质"}星系。
      ${Slabdrill.isCursed ? "" : `维度献祭重置${player.universes.current === 2 ? "物质" : "反物质"}和所有${player.universes.current === 2 ? "物质" : "反物质"}维度，
      但也会给予显著更强的倍率。`}`,
    name: () => `第八${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : `可升级的第八${player.universes.current === 2 ? "物质" : "反物质"}维度自动购买器`,
    charged: {
      reward: () => "维度献祭根据自身变得更强",
      effect: () => Decimal.log10(Sacrifice.totalBoost.max(10).log10().log10().add(1)).add(1),
      formatEffect: value => formatX(value, 2, 2)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `每当你购买计数频率升级或 ${formatInt(10)} 个${player.universes.current === 2 ? "物质" : "反物质"}维度时，` +
      "其他等价的物品将涨价到下一个档位。",
    name: () => "计数频率自动购买器",
    reward: () => Slabdrill.isCursed ? `反物质维度 ${formatX(6.66, 2, 2)}` : "可升级的计数频率自动购买器",
    charged: {
      reward: () => `基于${player.universes.current === 2 ? "物质" : "反物质"}获得更多连续统购买次数`,
      effect: () => Decimal.log10(Decimal.log10(player.antimatter.max(1e10))).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => Slabdrill.isCursed ? `你的反物质维度被提升 ${formatPow(0.75, 2, 2)}。` :
      `只有 ${formatInt(6)} 个${player.universes.current === 2 ? "物质" : "反物质"}维度。维度提升 ` +
      `和${player.universes.current === 2 ? "物质" : "反物质"}星系价格被修改。`,
    name: () => "自动维度提升",
    reward: () => "维度提升自动购买器",
    charged: {
      reward: () => "基于维度涌流获得更多银河之力",
      effect: () => player.dimensionBoosts.max(1).log10().div(20).add(1),
      formatEffect: value => formatPow(value, 2, 3)
    },
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `存在${player.universes.current === 2 ? "反物质" : "正常物质"}，它会在${Slabdrill.isCursed ? "" : `你拥有至少 ${formatInt(1)} 个第二${player.universes.current === 2 ? "物质" : "反物质"}维度后`}上升。如果它超过你的${player.universes.current === 2 ? "物质" : "反物质"}，将触发一次不提供加成的维度提升。`,
    name: () => `自动${player.universes.current === 2 ? "物质" : "反物质"}星系`,
    reward: () => `${player.universes.current === 2 ? "物质" : "反物质"}星系自动购买器`,
    charged: {
      reward: () => "解锁实体宇宙"
    },
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => Slabdrill.isCursed ? `你的反物质维度被提升 ${formatPow(0.5, 1, 1)}，并在 ${formatInt(3)} 分钟内恢复，在维度提升和反物质星系时重置。` :
      `每个${player.universes.current === 2 ? "物质" : "反物质"}维度生产其下方 ${formatInt(2)} 层的维度，而不是 ${formatInt(1)} 层。第一和第二维度都生产${player.universes.current === 2 ? "物质" : "反物质"}。
      第二、第四和第六维度被加强以作补偿。`,
    name: () => "自动大坍缩",
    reward: () => "大坍缩自动购买器",
    charged: {
      reward: () => `偶数${player.universes.current === 2 ? "物质维度" : "反物质维度"}基于第八维度变得更强，且${player.universes.current === 2 ? "物质维度" : "反物质维度"}数量不再受熵上限影响`,
      effect: () => Decimal.log10(AntimatterDimension(8).amount.max(10)),
      formatEffect: value => formatPow(value, 2, 3)
    },
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  }
];