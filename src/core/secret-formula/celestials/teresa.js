export const teresa = {
  unlocks: {
    run: {
      id: 0,
      price: 1e14,
      description: "解锁特蕾莎的现实",
      onUnlock: () => Teresa.quotes.unlockReality.show(),
    },
    epGen: {
      id: 1,
      price: 1e18,
      description: "自动获得永恒点数",
      isDisabledInDoomed: () => !PelleCelestialUpgrade.passiveEPGen.canBeApplied
    },
    effarig: {
      id: 3,
      price: 1e24,
      description: "解锁鹿颈长，古代遗迹之神",
      onUnlock: () => Teresa.quotes.effarig.show(),
    },
    shop: {
      id: 2,
      price: 1e21,
      description: "解锁复兴商店",
    },
    undo: {
      id: 4,
      price: 1e10,
      description: "解锁“撤销”已装备符文的功能",
      isDisabledInDoomed: () => !PelleCelestialUpgrade.undoGlyph.canBeApplied
    },
    startEU: {
      id: 5,
      price: 1e6,
      description: "开始现实时解锁所有永恒升级",
      isDisabledInDoomed: () => !PelleCelestialUpgrade.allEternityUpgrades.canBeApplied,
      onUnlock: () => {
        for (const id of [1, 2, 3, 4, 5, 6]) player.eternityUpgrades.add(id);
      },
    }
  }
};
