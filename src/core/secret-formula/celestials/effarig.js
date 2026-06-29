export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: "Adjustable Glyph level factor weights",
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    description: "Glyph Filtering",
    cost: 2e8,
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: "Glyph Presets",
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: "Effarig's Reality",
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: "Infinity",
    get description() {
      return ` Replicanti cap is multiplied by a value based on Infinities
        Infinities increase your max Replicanti Galaxies
        Base Infinity Point gain is capped at ${format(DC.E200)} in Effarig's Reality
        Each type of Infinity Point multiplier is capped at ${format(DC.E50)} in Effarig's Reality`;
    },
  },
  eternity: {
    id: 5,
    label: "Eternity",
    get description() {
      return ` Eternities generates Infinities
        Infinity Points are no longer limited in any way in Effarig's Reality
        You have unlocked The Nameless Ones`;
    },
  },
  reality: {
    id: 6,
    label: "Reality",
    get description() {
      return " You have unlocked Effarig Glyphs (You may equip at most one and some effects are mutually exclusive)";
    },
  },
  maintainRS: {
    id: 7,
    description: "Keep Relic Shards on Endgame",
    cost: new Decimal("1e4300"),
    onPurchased: () => {
      Effarig.quotes.keepRelicShard.show();
    }
  },
  glyphGenerationBoost: {
    id: 8,
    get description() {
      return `Effarig Level ${formatInt(100)} affects Glyphs generated on Doom and Endgame`;
    },
    cost: new Decimal("1e4400"),
    onPurchased: () => {
      Effarig.quotes.betterGeneration.show();
    }
  },
  maxMomentum: {
    id: 9,
    description: "Momentum is always maxed",
    cost: new Decimal("1e4550"),
    onPurchased: () => {
      Effarig.quotes.maxMomentum.show();
    }
  },
  maxRarityBoost: {
    id: 10,
    description: "Relic Shards boost Glyph Rarity cap at a reduced rate",
    cost: new Decimal("1e4750"),
    onPurchased: () => {
      Effarig.quotes.moreRarityCap.show();
    }
  },
  extendRun: {
    id: 11,
    description: "Unlock Effarig’s Endgame",
    cost: new Decimal("1e5000"),
    onPurchased: () => {
      Effarig.quotes.effEndgame.show();
    }
  },
  endgame: {
    id: 12,
    label: "Endgame",
    get description() {
      return ` Every Glyph effect is improved
        The RM Multiplier Effarig Glyph effect now boosts the RM cap
        The Glyph Instability Delay Effarig Glyph effect now delays the first ${formatInt(4)} levels of Instability instead of the first ${formatInt(2)}
        The Effarig Glyph Sacrifice effect is uncapped and values over ${formatPercents(1)} will boost the Glyph Rarity cap
        Endgame Mastery ${formatInt(71)} now generates at your all-time highest Glyph Level and also generates ${formatInt(2)} Effarig Glyphs
        Automatically generate ${formatInt(2)} Reality Glyphs on Endgame`;
    },
  },
};
