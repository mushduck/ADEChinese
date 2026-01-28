export const tabNotifications = {
  firstInfinity: {
    id: 0,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "upgrades"
      },
      {
        parent: "challenges",
        tab: "normal"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() &&
      !PlayerProgress.infinityUnlocked(),
    events: [GAME_EVENT.BIG_CRUNCH_BEFORE]
  },
  breakInfinity: {
    id: 1,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "break"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && Autobuyer.bigCrunch.hasMaxedInterval
  },
  IDUnlock: {
    id: 2,
    tabsToHighLight: [
      {
        parent: "dimensions",
        tab: "infinity"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && !InfinityDimension(2).isUnlocked
  },
  ICUnlock: {
    id: 3,
    tabsToHighLight: [
      {
        parent: "challenges",
        tab: "infinity"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked()
  },
  replicanti: {
    id: 4,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "replicanti"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && Currency.infinityPoints.gte(DC.E140),
    events: [GAME_EVENT.BIG_CRUNCH_AFTER]
  },
  firstEternity: {
    id: 5,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "studies"
      },
      {
        parent: "eternity",
        tab: "milestones"
      },
      {
        parent: "eternity",
        tab: "upgrades"
      },
      {
        parent: "dimensions",
        tab: "time"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked(),
    events: [GAME_EVENT.ETERNITY_RESET_BEFORE]
  },
  dilationAfterUnlock: {
    id: 6,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "dilation"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      !PlayerProgress.realityUnlocked()
  },
  realityUnlock: {
    id: 7,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "studies"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      !PlayerProgress.realityUnlocked() && TimeStudy.reality.canBeBought,
    events: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION,
      GAME_EVENT.OFFLINE_CURRENCY_GAINED, GAME_EVENT.ACHIEVEMENT_UNLOCKED]
  },
  blackHoleUnlock: {
    id: 8,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "hole"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      !BlackHoles.areUnlocked && Currency.realityMachines.gte(100),
    events: [GAME_EVENT.REALITY_RESET_AFTER]
  },
  automatorUnlock: {
    id: 9,
    tabsToHighLight: [
      {
        parent: "automation",
        tab: "automator"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && Player.automatorUnlocked,
    events: [GAME_EVENT.REALITY_RESET_AFTER]
  },
  teresaUnlock: {
    id: 10,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "celestial-navigation"
      },
      {
        parent: "celestials",
        tab: "teresa"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() &&
      player.celestials.teresa.pouredAmount.eq(new Decimal(0)) && Teresa.isUnlocked,
    events: [GAME_EVENT.REALITY_UPGRADE_BOUGHT]
  },
  alchemyUnlock: {
    id: 11,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "glyphs"
      },
      {
        parent: "reality",
        tab: "alchemy"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && player.celestials.ra.pets.effarig.level >= 2,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  newAutobuyer: {
    id: 12,
    tabsToHighLight: [
      {
        parent: "automation",
        tab: "autobuyers"
      },
    ],
    // Always externally triggered, but needs to be ignored in cel7 because they're unlocked differently
    condition: () => !Pelle.isDoomed,
  },
  imaginaryMachineUnlock: {
    id: 13,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "imag_upgrades"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked() && MachineHandler.isIMUnlocked,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  laitelaUnlock: {
    id: 14,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "laitela"
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
  pelleUnlock: {
    id: 15,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "pelle"
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
  newGlyphCosmetic: {
    id: 16,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "glyphs",
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
  endgameUnlock: {
    id: 17,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "endgame"
      },
      {
        parent: "endgame",
        tab: "break-eternity"
      },
      {
        parent: "endgame",
        tab: "pelle-destruction"
      },
      {
        parent: "endgame",
        tab: "expansion-packs"
      },
      {
        parent: "endgame",
        tab: "masteries"
      },
      {
        parent: "endgame",
        tab: "milestones"
      },
      {
        parent: "reality",
        tab: "imag_upgrades"
      },
      {
        parent: "dimensions",
        tab: "celestial"
      }
    ],
    condition: () => !PlayerProgress.endgameUnlocked(),
    events: [GAME_EVENT.ENDGAME_RESET_BEFORE]
  },
  breakEternity: {
    id: 18,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "break-eternity"
      }
    ],
    condition: () => !player.break2 && Currency.antimatter.gte(DC.E9E15),
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  packsUnlock: {
    id: 19,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "expansion-packs"
      }
    ],
    condition: () => !ExpansionPacks.areUnlocked && GalaxyGenerator.galaxies.gte(Decimal.pow(2, 64)),
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  endgameUpgrades: {
    id: 20,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "upgrades"
      }
    ],
    // Always externally triggered
    condition: () => true,
  },
  galacticPower: {
    id: 21,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "power"
      }
    ],
    condition: () => GalacticPower.isUnlocked,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  ethereal: {
    id: 22,
    tabsToHighLight: [
      {
        parent: "endgame",
        tab: "ethereal"
      }
    ],
    condition: () => Ethereal.isUnlocked,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  alphaUnlock: {
    id: 23,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "alpha"
      }
    ],
    // Always externally triggered
    condition: () => true,
  },
};
