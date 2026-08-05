export const confirmationTypes = [
  {
    name: "维度提升",
    option: "dimensionBoost",
    isUnlocked: () => PlayerProgress.infinityUnlocked() || player.galaxies.gt(0) || player.dimensionBoosts.gt(0),
  }, {
    name: "反物质星系",
    option: "antimatterGalaxy",
    isUnlocked: () => PlayerProgress.infinityUnlocked() || player.galaxies.gt(0),
  }, {
    name: "维度献祭",
    option: "sacrifice",
    isUnlocked: () => Sacrifice.isVisible,
  }, {
    name: "大坍缩",
    option: "bigCrunch",
    isUnlocked: () => player.break || PlayerProgress.eternityUnlocked(),
  }, {
    name: "挑战",
    option: "challenges",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "退出挑战",
    option: "exitChallenge",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "复制器星系",
    option: "replicantiGalaxy",
    isUnlocked: () => PlayerProgress.eternityUnlocked() || player.replicanti.unl,
  }, {
    name: "永恒",
    option: "eternity",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "时间膨胀",
    option: "dilation",
    isUnlocked: () => PlayerProgress.realityUnlocked() || !Currency.tachyonParticles.eq(0),
  }, {
    name: "Overcharge",
    option: "overcharge",
    isUnlocked: () => Ascensions.ocA.isUnlocked,
  }, {
    name: "Reset Reality",
    option: "resetReality",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "Glyph Replace",
    option: "glyphReplace",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "Glyph Sacrifice",
    option: "glyphSacrifice",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "Glyph Purge",
    option: "autoClean",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "Sacrifice All Glyphs",
    option: "sacrificeAll",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "Glyph Selection",
    option: "glyphSelection",
    isUnlocked: () => Autobuyer.reality.isUnlocked,
  }, {
    name: "Glyph Undo",
    option: "glyphUndo",
    isUnlocked: () => TeresaUnlocks.undo.canBeApplied,
  }, {
    name: "Switch Automator Editor",
    option: "switchAutomatorMode",
    isUnlocked: () => Player.automatorUnlocked,
  }, {
    name: "Delete Glyph Preset",
    option: "deleteGlyphSetSave",
    isUnlocked: () => EffarigUnlock.setSaves.isUnlocked,
  }, {
    name: "Glyph Refine",
    option: "glyphRefine",
    isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
  }, {
    name: "Armageddon",
    option: "armageddon",
    isUnlocked: () => Pelle.isDoomed,
  }, {
    name: "Reset Endgame",
    option: "resetEndgame",
    isUnlocked: () => PlayerProgress.endgameUnlocked(),
  }, {
    name: "Respec Shop Purchases",
    option: "respecIAP",
    isUnlocked: () => Cloud.isAvailable
  }
];
