export const ra = {
  pets: {
    teresa: {
      id: "teresa",
      key: "Teresa",
      name: "特蕾莎",
      color: "#8596ea",
      chunkGain: "永恒点数",
      memoryGain: "当前现实机器数量",
      requiredUnlock: () => undefined,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.eternityPoints.value.add(1).pLog10().div(5e3), 3.5).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.teresaXP.effectOrDefault(1)
    },
    effarig: {
      id: "effarig",
      key: "Effarig",
      name: "鹿颈长",
      color: "#ea8585",
      chunkGain: "当前现实获取的遗迹碎片",
      memoryGain: "最高符文等级",
      requiredUnlock: () => Ra.unlocks.effarigUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Effarig.shardsGained, 0.175).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.effarigXP.effectOrDefault(1)
    },
    enslaved: {
      id: "enslaved",
      key: "Enslaved",
      name: "无名氏",
      color: "#f1aa7f",
      chunkGain: "时间碎片",
      memoryGain: "总游玩时间",
      requiredUnlock: () => Ra.unlocks.enslavedUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.timeShards.value.add(1).pLog10().div(5e4), ResurgenceUpgrade.memSurge.isBought ? 3.5 : 2.5).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.enslavedXP.effectOrDefault(1)
    },
    v: {
      id: "v",
      key: "V",
      name: "薇",
      color: "#ead584",
      chunkGain: "无限之力",
      memoryGain: "总记忆等级",
      requiredUnlock: () => Ra.unlocks.vUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.infinityPower.value.add(1).pLog10().div(1e6), ResurgenceUpgrade.memSurge.isBought ? 3.5 : 1.875).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.vXP.effectOrDefault(1)
    }
  },
  unlocks: {
    autoTP: {
      id: 0,
      reward: "当时间膨胀激活时，立即给予超光速粒子",
      pet: "teresa",
      level: 1,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa1.canBeApplied
    },
    chargedInfinityUpgrades: {
      id: 1,
      reward: () => `解锁无限升级充能。等级每提升 ${formatInt(2)} 级可充能一个无限升级。`,
      effect: () => player.disablePostReality ? 0 : Math.min(12, Math.floor(Ra.pets.teresa.level / 2)),
      pet: "teresa",
      level: 2,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa2.canBeApplied
    },
    teresaXP: {
      id: 2,
      reward: "所有记忆块基于现实机器生产更多记忆。",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.pow(Currency.realityMachines.value.add(1).pLog10().div(100), 0.5).toNumber(),
      pet: "teresa",
      level: 5,
      displayIcon: `Ϟ`
    },
    alteredGlyphs: {
      id: 3,
      reward: "解锁异变符文，这些符文通过符文献祭的倍数赋予符文新效果。",
      pet: "teresa",
      level: 10,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa3.canBeApplied
    },
    effarigUnlock: {
      id: 4,
      reward: "解锁鹿颈长的记忆",
      pet: "teresa",
      level: 8,
      displayIcon: `Ϙ`
    },
    perkShopIncrease: {
      id: 5,
      reward: "提高特蕾莎复兴商店的购买上限",
      pet: "teresa",
      level: 15,
      displayIcon: `<span class="fas fa-project-diagram"></span>`
    },
    unlockDilationStartingTP: {
      id: 6,
      reward: "如果你不在天神的现实之中，你将基于当前反物质的数量，获得超光速粒子。所有超光速粒子倍率加成立刻生效，与是否在时间膨胀之中无关。",
      effect: () => player.records.totalEndgameAntimatter.pow(0.5),
      pet: "teresa",
      level: 25,
      displayIcon: `<i class="far fa-dot-circle"></i>`
    },
    extraGlyphChoicesAndRelicShardRarityAlwaysMax: {
      id: 7,
      reward: () => `可选符文个数 ${formatX(2)}，同时遗迹碎片的符文稀有度加成总是最大值。`,
      effect: 2,
      pet: "effarig",
      level: 1,
      displayIcon: `<i class="fas fa-grip-horizontal"></i>`
    },
    unlockGlyphAlchemy: {
      id: 8,
      reward: "解锁符文炼金，详见新解锁的现实子标签页。你可以通过精炼符文来增加炼金资源的数量。提高鹿颈长等级能解锁更多种类的炼金资源。",
      pet: "effarig",
      level: 2,
      displayIcon: `<span class="fas fa-vial"></span>`
    },
    effarigXP: {
      id: 9,
      reward: "所有记忆块基于最高符文等级生产更多记忆。",
      effect: () => player.disablePostReality ? 1 : player.records.bestReality.glyphLevel.div(7000).add(1).toNumber(),
      pet: "effarig",
      level: 5,
      displayIcon: `<span class="fas fa-clone"></span>`
    },
    glyphEffectCount: {
      id: 10,
      reward: () => `符文总是拥有至少 ${formatInt(4)} 个词条，鹿颈长符文现在可以拥有最多 ${formatInt(7)} 个词条。`,
      pet: "effarig",
      level: 10,
      displayIcon: `<span class="fas fa-braille"></span>`
    },
    enslavedUnlock: {
      id: 11,
      reward: "解锁无名氏的记忆",
      pet: "effarig",
      level: 8,
      displayIcon: `<span class="c-ra-pet-milestones-effarig-link">\uf0c1</span>`
    },
    relicShardGlyphLevelBoost: {
      id: 12,
      reward: "基于遗迹碎片增加符文等级",
      effect: () => player.disablePostReality ? 0 : 100 * Decimal.pow(Decimal.log10(Decimal.max(Effarig.shardsGained, 1)), 2).toNumber(),
      pet: "effarig",
      level: 15,
      displayIcon: `<span class="fas fa-fire"></span>`
    },
    maxGlyphRarityAndShardSacrificeBoost: {
      id: 13,
      reward: () => `获得符文的稀有度固定为 ${formatPercents(1)}，符文献祭增益基于遗迹碎片获得指数加成。`,
      effect: () => 1 + Effarig.maxRarityBoost / 100,
      pet: "effarig",
      level: 25,
      displayIcon: `<i class="fas fa-ankh"></i>`
    },
    blackHolePowerAutobuyers: {
      id: 14,
      reward: "解锁自动购买黑洞倍率升级",
      pet: "enslaved",
      level: 1,
      displayIcon: `<span class="fas fa-circle"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless1.canBeApplied
    },
    improvedStoredTime: {
      id: 15,
      reward: "存储的游戏时间被扩增，你可以存储更多的现实时间，随着无名氏等级的增加而提升。",
      effects: {
        gameTimeAmplification: () => player.disablePostReality ? 1 : Decimal.pow(20, Decimal.clampMax(Ra.pets.enslaved.level, Ra.levelCap)),
        realTimeCap: () => player.disablePostReality ? 0 : 1000 * 3600 * Ra.pets.enslaved.level,
      },
      pet: "enslaved",
      level: 2,
      displayIcon: `<span class="fas fa-history"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless2.canBeApplied
    },
    enslavedXP: {
      id: 16,
      reward: "所有记忆块基于总游戏时间生产更多记忆。",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.log10(player.records.totalTimePlayed).div(200).toNumber(),
      pet: "enslaved",
      level: 5,
      displayIcon: `<span class="fas fa-stopwatch"></span>`
    },
    autoPulseTime: {
      id: 17,
      reward: () => `黑洞充能现在只使用你游戏速度的 ${formatPercents(0.99)}，并且你可以每 ${formatInt(5)} 时间间隔自动释放 ${formatPercents(0.01)} 的存储游戏时间。`,
      pet: "enslaved",
      level: 10,
      displayIcon: `<span class="fas fa-expand-arrows-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless3.canBeApplied
    },
    vUnlock: {
      id: 18,
      reward: "解锁薇的记忆",
      pet: "enslaved",
      level: 8,
      displayIcon: `⌬`
    },
    peakGamespeedDT: {
      id: 19,
      reward: "基于本次现实中游戏速度的峰值，获得更多的膨胀时间。",
      effect: () => player.disablePostReality ? 1 : Decimal.max(Decimal.pow(Decimal.log10(player.celestials.ra.peakGamespeed).sub(90), 3), 1).toNumber(),
      pet: "enslaved",
      level: 15,
      displayIcon: `<span class="fas fa-tachometer-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless4.canBeApplied
    },
    allGamespeedGlyphs: {
      id: 20,
      reward: "所有基本类型的符文都获得时间符文的游戏速度词条，时间符文额外增加一个词条。",
      pet: "enslaved",
      level: 25,
      displayIcon: `<span class="fas fa-clock"></span>`,
      onUnlock: () => {
        const allGlyphs = player.reality.glyphs.active.concat(player.reality.glyphs.inventory);
        for (const glyph of allGlyphs) {
          Glyphs.applyGamespeed(glyph);
        }
      }
    },
    instantECAndRealityUpgradeAutobuyers: {
      id: 21,
      reward: "可重复购买的现实升级现在可以自动购买，且自动永恒挑战立即完成",
      pet: "v",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV1.canBeApplied
    },
    autoUnlockDilation: {
      id: 22,
      reward: () => `在非天神现实中，时间膨胀在 ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)} 时间之理自动免费解锁`,
      pet: "v",
      level: 2,
      displayIcon: `<span class="fas fa-fast-forward"></span>`
    },
    vXP: {
      id: 23,
      reward: "所有记忆块基于总天神等级生产更多记忆。",
      effect: () => player.disablePostReality ? 1 : 1 + Ra.totalPetLevel / 50,
      pet: "v",
      level: 5,
      displayIcon: `<span class="fas fa-book"></span>`
    },
    unlockHardV: {
      id: 24,
      reward: () => `解锁困难的薇成就。同时，薇的等级每增加 ${formatInt(6)}，解锁一个三体研究。三体研究在时间研究树的底部。`,
      effect: () => player.disablePostReality ? 0 : Math.min(Math.floor(Ra.pets.v.level / 6), 4),
      pet: "v",
      level: 6,
      displayIcon: `<span class="fas fa-trophy"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV2.canBeApplied
    },
    continuousTTBoost: {
      id: 25,
      reward: "时间之理推动所有非维度资源生产。（包括时间之理、永恒次数、无限次数、膨胀时间、复制器、记忆和记忆块）",
      effects: {
        ttGen: () => player.disablePostReality ? 1 : Math.pow(10, 5 * Ra.theoremBoostFactor()),
        eternity: () => player.disablePostReality ? 1 : Math.pow(10, 2 * Ra.theoremBoostFactor()),
        infinity: () => player.disablePostReality ? 1 : Math.pow(10, 15 * Ra.theoremBoostFactor()),
        replicanti: () => player.disablePostReality ? 1 : Math.pow(10, 20 * Ra.theoremBoostFactor()),
        dilatedTime: () => player.disablePostReality ? 1 : Math.pow(10, 3 * Ra.theoremBoostFactor()),
        memories: () => player.disablePostReality ? 1 : 1 + Ra.theoremBoostFactor() / 50,
        memoryChunks: () => player.disablePostReality ? 1 : 1 + Ra.theoremBoostFactor() / 50,
        autoPrestige: () => player.disablePostReality ? 1 : 1 + 2.4 * Ra.theoremBoostFactor()
      },
      pet: "v",
      level: 10,
      displayIcon: `<span class="fas fa-university"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV3.canBeApplied
    },
    achievementTTMult: {
      id: 26,
      reward: "成就倍率适用于时间之理生成。",
      effect: () => player.disablePostReality ? 1 : Achievements.power,
      pet: "v",
      level: 15,
      displayIcon: `<span class="fas fa-graduation-cap"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV4.canBeApplied
    },
    achievementPower: {
      id: 27,
      reward: () => `成就倍率提升至 ${formatPow(1.5, 1, 1)}`,
      effect: () => player.disablePostReality ? 1 : 1.5,
      pet: "v",
      level: 25,
      displayIcon: `<i class="fab fa-buffer"></i>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV5.canBeApplied
    },
    eternityPointPower: {
      id: 28,
      reward: "基于特蕾莎等级获得更多永恒点数",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 100,
      pet: "teresa",
      level: 30,
      displayIcon: `<span class="fas fa-angle-up"></span>`,
      disabledByPelle: false
    },
    realityMachineCap: {
      id: 29,
      reward: "基于特蕾莎等级提高现实机器数量上限",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 100,
      pet: "teresa",
      level: 40,
      displayIcon: `<span class="fas fa-arrow-turn-up"></span>`,
      disabledByPelle: false
    },
    celestialDimensionConversionPower: {
      id: 30,
      reward: "基于特蕾莎等级提高天界维度的转换指数",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 200,
      pet: "teresa",
      level: 50,
      displayIcon: `<span class="fas fa-star"></span>`,
      disabledByPelle: false
    },
    chargeBoost: {
      id: 31,
      reward: "提升充能无限升级的效力至特蕾莎等级的两倍",
      effect: () => player.disablePostReality ? 1 : 2,
      pet: "teresa",
      level: 65,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: false
    },
    sacrificePower: {
      id: 32,
      reward: "维度献祭为符文提供的加成 ^ 2",
      effect: () => player.disablePostReality ? 1 : 2,
      pet: "teresa",
      level: 80,
      displayIcon: `Ω`,
      disabledByPelle: false
    },
    imaginaryMachines: {
      id: 33,
      reward: "基于维度献祭为虚幻机器获取提供指数加成",
      effect: () => {
        const sacrificeSum = new Decimal(player.reality.glyphs.sac.power).add(player.reality.glyphs.sac.infinity).add(
          player.reality.glyphs.sac.time).add(player.reality.glyphs.sac.replication).add(player.reality.glyphs.sac.dilation).add(
          player.reality.glyphs.sac.effarig).add(player.reality.glyphs.sac.reality);
        return player.disablePostReality ? 1 : 1 + Decimal.log10(Decimal.log10(sacrificeSum.add(1)).add(1)).div(20).toNumber();
      },
      pet: "teresa",
      level: 100,
      displayIcon: `<span class="fas fa-gear"></span>`,
      disabledByPelle: false
    },
    celestialDimensionPower: {
      id: 34,
      reward: "基于终局次数和特蕾莎等级增强天界维度",
      effect: () => player.disablePostReality ? 1 : Math.pow(Math.clamp(Ra.pets.teresa.level * Math.log10(player.endgames + 1) / 2000, 1, 1.5) * Math.pow(Math.max(Ra.pets.teresa.level * Math.log10(player.endgames + 1) / 3000, 1), 0.1), 5),
      pet: "teresa",
      level: 125,
      displayIcon: `<span class="fas fa-award"></span>`,
      disabledByPelle: false
    },
    relicShardBoost: {
      id: 35,
      reward: "基于鹿颈长等级提高遗迹碎片获取",
      effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Math.floor(Ra.pets.effarig.level)),
      pet: "effarig",
      level: 30,
      displayIcon: `<span class="fas fa-flask"></span>`,
      disabledByPelle: false
    },
    instabilityDelay: {
      id: 36,
      reward: "基于遗迹碎片推迟符文等级的前三重软上限",
      effect: () => player.disablePostReality ? 0 : Decimal.log10(player.celestials.effarig.relicShards.add(1)).times(10).toNumber(),
      pet: "effarig",
      level: 40,
      displayIcon: `<span class="fas fa-arrow-right"></span>`,
      disabledByPelle: false
    },
    rarityBuff: {
      id: 37,
      reward: "基于鹿颈长等级提高符文稀有度",
      effect: () => player.disablePostReality ? 0 : Math.floor(Ra.pets.effarig.level) / 2,
      pet: "effarig",
      level: 50,
      displayIcon: `<span class="fas fa-dice"></span>`,
      disabledByPelle: false
    },
    glyphLevelBuff: {
      id: 38,
      reward: "基于鹿颈长等级略微提高符文等级，效果在符文不稳定性后结算",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.effarig.level) / 1000,
      pet: "effarig",
      level: 65,
      displayIcon: `<span class="fas fa-chart-line"></span>`,
      disabledByPelle: false
    },
    alchemyCapIncrease: {
      id: 39,
      reward: "基于鹿颈长等级提高炼金资源上限",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.effarig.level) / 100,
      pet: "effarig",
      level: 80,
      displayIcon: `<span class="fas fa-flask-vial"></span>`,
      disabledByPelle: false
    },
    realityGlyphRarity: {
      id: 40,
      reward: "基于鹿颈长等级提高现实符文稀有度",
      effect: () => player.disablePostReality ? 0 : Math.floor(Ra.pets.effarig.level) / 5,
      pet: "effarig",
      level: 100,
      displayIcon: `Ϟ`,
      disabledByPelle: false
    },
    glyphSlot: {
      id: 41,
      reward: "增加一个新的符文槽",
      effect: 1,
      pet: "effarig",
      level: 125,
      displayIcon: `<span class="fas fa-plus"></span>`,
      disabledByPelle: false
    },
    gameSpeedImprovement: {
      id: 42,
      reward: "基于无名氏等级为游戏速度提供指数加成",
      effect: () => player.disablePostReality ? 1 : 1 + Math.pow(Math.floor(Ra.pets.enslaved.level) / 100, 2),
      pet: "enslaved",
      level: 30,
      displayIcon: `<span class="fas fa-hourglass"></span>`,
      disabledByPelle: false
    },
    tickspeedPower: {
      id: 43,
      reward: "基于无名氏等级为计数频率提供指数加成",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 100,
      pet: "enslaved",
      level: 40,
      displayIcon: `<span class="fas fa-power-off"></span>`,
      disabledByPelle: false
    },
    gameSpeedTesseractBoost: {
      id: 44,
      reward: "基于超立方体提高游戏速度",
      effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Tesseracts.effectiveCount),
      pet: "enslaved",
      level: 50,
      displayIcon: `<span class="fas fa-forward"></span>`,
      disabledByPelle: false
    },
    gameSpeedTachyonMult: {
      id: 45,
      reward: "基于当前终局的峰值游戏速度提高超光速粒子获取",
      effect: () => player.disablePostReality ? DC.D1 : player.records.thisEndgame.peakGameSpeed,
      pet: "enslaved",
      level: 65,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: false
    },
    eternityGenBuff: {
      id: 46,
      reward: "基于无名氏等级提高永恒次数生成",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 100,
      pet: "enslaved",
      level: 80,
      displayIcon: `∆`,
      disabledByPelle: false
    },
    imaginaryMachineEternityPower: {
      id: 47,
      reward: "基于永恒次数为虚幻机器获取提供指数加成",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.log10(Decimal.log10(player.eternities.add(1)).add(1)).div(20).toNumber(),
      pet: "enslaved",
      level: 100,
      displayIcon: `<span class="fas fa-lightbulb"></span>`,
      disabledByPelle: false
    },
    freeTesseractIncrease: {
      id: 48,
      reward: "基于无名氏等级推迟免费超立方体的软上限",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 250,
      pet: "enslaved",
      level: 125,
      displayIcon: `<span class="fas fa-cubes"></span>`,
      disabledByPelle: false
    },
    achievementMultPower: {
      id: 49,
      reward: "基于薇等级为成就倍率提供指数加成",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 100,
      pet: "v",
      level: 30,
      displayIcon: `<span class="fas fa-medal"></span>`,
      disabledByPelle: false
    },
    allDimPowTT: {
      id: 50,
      reward: "时间之理增强前三种维度",
      effect: () => player.disablePostReality ? 1 : Math.pow(1 + Decimal.log10(Decimal.log10(Currency.timeTheorems.value.add(1)).add(1)).div(10).toNumber(), 5),
      pet: "v",
      level: 40,
      displayIcon: `<span class="fas fa-brain"></span>`,
      disabledByPelle: false
    },
    triadBuff: {
      id: 51,
      reward: "基于薇等级提高三体研究效果",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 200,
      pet: "v",
      level: 50,
      displayIcon: `<span class="fas fa-3"></span>`,
      disabledByPelle: false
    },
    spaceTheoremIPowConversion: {
      id: 52,
      reward: "空间之理提高无限之力转换指数",
      effect: () => player.disablePostReality ? 1 : Math.pow(V.spaceTheorems + 1, 0.05),
      pet: "v",
      level: 65,
      displayIcon: `<span class="fas fa-ranking-star"></span>`,
      disabledByPelle: false
    },
    spaceTheoremBoost: {
      id: 53,
      reward: "基于薇等级提高空间之理获取",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 200,
      pet: "v",
      level: 80,
      displayIcon: `<span class="fas fa-star"></span>`,
      disabledByPelle: false
    },
    spaceTheoremAchPower: {
      id: 54,
      reward: "空间之理提高成就倍率",
      effect: () => player.disablePostReality ? 1 : 1 + Math.log10(V.spaceTheorems + 1),
      pet: "v",
      level: 100,
      displayIcon: `<span class="fas fa-award"></span>`,
      disabledByPelle: false
    },
    infinityDimPower: {
      id: 55,
      reward: "基于薇等级为无限维度提供指数加成",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 40,
      pet: "v",
      level: 125,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: false
    },
  }
};