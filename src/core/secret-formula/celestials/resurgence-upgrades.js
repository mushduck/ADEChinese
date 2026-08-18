export const resurgenceUpgrades = {
  ipSurge: {
    name: "无界潮涌",
    id: "ipSurge",
    cost: new Decimal(10000),
    description: "Infinity Points are equal to Antimatter, multiply Antimatter Production by pending IP"
  },
  epSurge: {
    name: "永恒潮涌",
    id: "epSurge",
    cost: new Decimal(1e6),
    description: "Eternity Points are equal to Antimatter, multiply Antimatter Production by pending EP"
  },
  realSurge: {
    name: "星流漩溢",
    id: "realSurge",
    cost: new Decimal(1e8),
    description: "Endgames generate Realities"
  },
  rmSurge: {
    name: "星源潮涌",
    id: "rmSurge",
    cost: new Decimal(1e10),
    description: "Realities multiply Reality Machine gain and cap, applying after all power effects"
  },
  imSurge: {
    name: "命定之终",
    id: "imSurge",
    cost: new Decimal(1e12),
    description: "The Imaginary Machine cap is raised based on Endgames",
    effect: () => 1 + Math.log10(Math.log10(player.endgames + 1) + 1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  repSurge: {
    name: "轮回潮涌",
    id: "repSurge",
    cost: new Decimal(1e20),
    description: "Replicanti now also provides a power effect to each one of its boosts"
  },
  achSurge: {
    name: "成就潮涌",
    id: "achSurge",
    cost: new Decimal(1e30),
    description: "Each Achievement multiplier boost now also provides a power effect to its boosts"
  },
  curr1Surge: {
    name: "无限潮涌",
    id: "curr1Surge",
    cost: new Decimal(1e50),
    description: "Infinities, Eternities and Time Theorems are raised to their own double-logarithm"
  },
  curr2Surge: {
    name: "膨胀潮涌",
    id: "curr2Surge",
    cost: new Decimal(1e80),
    description: "Dilated Time and Tachyon Particles are raised to their own double-logarithm, but only outside Pelle"
  },
  glyphSurge: {
    name: "献祭潮涌",
    id: "glyphSurge",
    cost: new Decimal(1e120),
    description: () => `Music Glyphs now generate at ${formatInt(1)} level lower than your highest Glyph Level this Endgame`
  },
  ethSurge: {
    name: "维源谐振",
    id: "ethSurge",
    cost: new Decimal(1e200),
    description: "Ethereal Power is multiplied by Cosmic Sector squared",
    effect: () => Decimal.pow(Ethereal.cosmicSector, 2),
    formatEffect: value => formatX(value, 2)
  },
  machineSurge: {
    name: "机器扩增",
    id: "machineSurge",
    cost: new Decimal("1e350"),
    description: "All Machines are powered based on the product of your Stars",
    effect: () => Decimal.pow(Decimal.log10(Ethereal.stellarProduct).add(1), 0.1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  rsSurge: {
    name: "遗物重耀",
    id: "rsSurge",
    cost: new Decimal("1e550"),
    description: "The Unique Glyph Effect factor for Relic Shards is now based on the total unique effects of Glyphs in your inventory"
  },
  memSurge: {
    name: "回忆扩增",
    id: "memSurge",
    cost: new Decimal("1e800"),
    description: "Improve the base gain of Nameless and V memories"
  },
  entropySurge: {
    name: "熵灭终章",
    id: "entropySurge",
    cost: new Decimal("1e1100"),
    description: "Gain more Entropy based on Endgames",
    effect: () => Math.pow(player.endgames, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy1: {
    name: "时轴曲变 I",
    id: "synergy1",
    cost: new Decimal("1e2250"),
    description: "Time Theorems are empowered by Space Theorems",
    effect: () => V.spaceTheorems,
    formatEffect: value => formatPow(value, 2)
  },
  synergy2: {
    name: "时轴曲变 II",
    id: "synergy2",
    cost: new Decimal("1e2400"),
    description: "Celestial Dimensions gain a power based on total Antimatter generated outside Pelle",
    effect: () => Decimal.log10(Decimal.log10(Decimal.log10(player.records.totalAntimatterOutsideDoom).add(1)).add(1)).div(15).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  synergy3: {
    name: "时轴曲变 III",
    id: "synergy3",
    cost: new Decimal("1e2550"),
    description: "Space Theorems are multiplied based on the product of your Stars",
    effect: () => Decimal.log10(Ethereal.stellarProduct).max(1).toNumber(),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy4: {
    name: "时轴曲变 IV",
    id: "synergy4",
    cost: new Decimal("1e2700"),
    description: "Time Theorems boost Galaxy Strength",
    effect: () => Decimal.pow(Decimal.log10(Decimal.log10(player.timestudy.theorem.max(1)).add(1)), 3).add(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy5: {
    name: "时轴曲变 V",
    id: "synergy5",
    cost: new Decimal("1e2850"),
    description: "Antimatter Production is empowered based on Tickspeed",
    effect: () => Decimal.log10(Decimal.log10(Tickspeed.perSecond).add(1)).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  synergy6: {
    name: "Full Circle",
    id: "synergy6",
    cost: new Decimal("1e4000"),
    description: "Celestial Matter boosts Ethereal Power Generation",
    effect: () => Decimal.pow(Decimal.log10(Decimal.log10(Currency.celestialMatter.value.max(1)).add(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  unl1: {
    name: "Graduation",
    id: "unl1",
    cost: new Decimal("1e7000"),
    description: "Unlock more Endgame Masteries"
  },
  unl2: {
    name: "Nihility",
    id: "unl2",
    cost: new Decimal("1e12000"),
    description: "Unlock more Singularity Milestones"
  },
  unl3: {
    name: "Nebula",
    id: "unl3",
    cost: new Decimal("1e20000"),
    description: "Unlock more Galactic Powers"
  },
  unl4: {
    name: "Resurrect",
    id: "unl4",
    cost: new Decimal("1e33000"),
    description: "Unlock Ascension"
  }
};
