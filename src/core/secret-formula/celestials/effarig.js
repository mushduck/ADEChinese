export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: "可调节符文等级因子的权重",
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    description: "符文筛选",
    cost: 2e8,
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: "保存符文配置",
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: "鹿颈长的现实",
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: "无限",
    get description() {
      return `无限次数提升复制器上限
      无限次数增加你的复制器星系上限
      在鹿颈长的现实中基础无限点获取上限为 ${format(DC.E200)}
      在鹿颈长的现实中每种类型的无限点倍率上限为 ${format(DC.E50)}`;
    },
  },
  eternity: {
    id: 5,
    label: "永恒",
    get description() {
      return `永恒次数生成无限次数
      在鹿颈长的现实中无限点数不再有任何限制
      解锁无名氏`;
    },
  },
  reality: {
    id: 6,
    label: "现实",
    get description() {
      return "解锁鹿颈长符文（完成成就196前你只能装备一个鹿颈长符文）";
    },
  },
  maintainRS: {
    id: 7,
    description: "终局后保留遗迹碎片",
    cost: new Decimal("1e4300"),
    onPurchased: () => {
      Effarig.quotes.keepRelicShard.show();
    }
  },
  glyphGenerationBoost: {
    id: 8,
    get description() {
      return `太阳神的鹿颈长 ${formatInt(100)} 级奖励
      同时影响佩勒和终局初始符文`;
    },
    cost: new Decimal("1e4400"),
    onPurchased: () => {
      Effarig.quotes.betterGeneration.show();
    }
  },
  maxMomentum: {
    id: 9,
    description: "动量的效果永远为最大值",
    cost: new Decimal("1e4550"),
    onPurchased: () => {
      Effarig.quotes.maxMomentum.show();
    }
  },
  maxRarityBoost: {
    id: 10,
    description: "遗迹碎片以衰减倍率提高符文稀有度上限",
    cost: new Decimal("1e4750"),
    onPurchased: () => {
      Effarig.quotes.moreRarityCap.show();
    }
  },
  extendRun: {
    id: 11,
    description: "解锁鹿颈长的终局",
    cost: new Decimal("1e5000"),
    onPurchased: () => {
      if (Effarig.isRunning) {
        Effarig.initializeRun();
      }
      Effarig.quotes.effEndgame.show();
    }
  },
  endgame: {
    id: 12,
    label: "终局",
    get description() {
      return ` 增强所有符文效果；
      鹿颈长符文的现实机器倍率词条额外提高现实机器上限；
      鹿颈长符文的符文不稳定性推迟倍率词条现在推迟前 ${formatInt(4)} 重符文等级软上限；
      鹿颈长符文的符文献祭效果超过 ${formatPercents(1)} 的部分将提高符等级稀有度上限；
      终局专精${formatInt(71)}现将基于你历史最高符文等级生成符文，并额外生成${formatInt(2)}个鹿颈长符文；
      终局时自动生成${formatInt(2)}个现实符文`;
    },
  },
};
