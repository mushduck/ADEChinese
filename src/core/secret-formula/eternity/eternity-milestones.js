export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    reward: "解锁自动购买无限点数倍增器",
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    reward: "开始永恒时，已经完成所有普通挑战、解锁打破无限、保留自动购买器"
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    reward: "解锁自动购买复制器星系"
  },
  keepInfinityUpgrades: {
    eternities: 4,
    reward: "开始永恒时拥有所有无限升级",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    reward: "解锁更多自动大坍缩选项"
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(new Decimal(1)).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(new Decimal(1)).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(new Decimal(1)).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return `此里程碑将在离线时产生永恒点数，但目前已禁用离线进度`;
      const effectText = (em200 || em1000) ? "已禁用" : `当前：${format(EPmin, 2, 2)} 永恒点数/分钟`;
      return `离线时，获得你之前最佳永恒点数/分钟的 ${formatPercents(0.25)}（${effectText}）`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `仅在 ${formatInt(200)} 和 ${formatInt(1000)} 永恒里程碑都未生效时生效`
      : ""),
  },
  autoIC: {
    eternities: 7,
    reward: `解锁无限挑战后立刻完成`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "开始永恒时拥有所有打破无限升级",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "解锁自动购买最大数量的反物质星系"
  },
  autoIC: {
    eternities: 7,
    reward: `解锁无限挑战后立刻完成`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "开始永恒时拥有所有打破无限升级",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "解锁自动购买最大数量的反物质星系"
  },
  unlockReplicanti: {
    eternities: 10,
    reward: "复制器一开始就已解锁",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    reward: "解锁第一无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    reward: "解锁第二无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    reward: "解锁第三无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    reward: "解锁第四无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    reward: "解锁第五无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    reward: "解锁第六无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    reward: "解锁第七无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    reward: "解锁第八无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    reward: "到达解锁无限维度的反物质要求时，自动解锁无限维度"
  },
  unlockAllND: {
    eternities: 30,
    reward: "永恒开始时就解锁了全部反物质维度"
  },
  replicantiNoReset: {
    eternities: 40,
    reward: `复制器星系不会重置反物质数量、反物质维度、计数频率、维度献祭和维度提升`,
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    reward: "解锁自动购买复制概率升级",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    reward: "解锁自动购买复制间隔升级",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    reward: "解锁自动购买复制器星系升级",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    reward: "解锁自动永恒"
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `此升级将在离线时产生永恒次数，但目前已禁用离线进度"`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(new Decimal(1)).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? "（真实时间：）" : "";
      // eslint-disable-next-line prefer-template
      return `在离线时，根据你最快永恒速度${realTime}的 ${formatPercents(0.5)} 获得永恒次数` +
        (eternities.gt(0) ? `（当前 ${format(eternities, 2, 2)}/小时）` : "（已禁用）");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `只有不在进行任何挑战且不在时间膨胀中时，启用自动永恒并将它设置为获得 ${formatInt(0)} 永恒点数时进行永恒，离线时才能产生永恒次数。（网页汉化注：上限为 ${formatInt(33)} 毫秒永恒）`
      : ""),
      pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `此里程碑将在离线时产生无限次数，但目前已禁用离线进度`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(new Decimal(1)).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `离线时，根据本次永恒中无限次数/小时最大值的 ${formatPercents(0.5)} 获得无限次数` +
        (infinities.gt(0) ? `(Currently ${format(infinities, 2, 2)}/hour)` : "(已禁用)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `当在任一普通挑战或任一无限挑战以外，且不在进行永恒挑战 4 或永恒挑战 12 中，启用自动大坍缩，并将其设置为小于等于 ${formatInt(5)} 秒自动进行大坍缩时，离线时才能产生无限次数。`
      : ""),
      pelleUseless: true
  }
};
