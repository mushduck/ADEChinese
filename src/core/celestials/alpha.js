import { BitUpgradeState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

export const Alpha = {
  displayName: "Alpha",
  possessiveName: "Alpha's",
  get isUnlocked() {
    return ImaginaryUpgrade(30).isBought;
  },
  initializeRun() {
    Endgame.resetNoReward();
    //player.isRealityDisabled = true;
    clearCelestialRuns();
    player.celestials.alpha.run = true;
    recalculateAllGlyphs();
    Tab.dimensions.antimatter.show(false);
  },
  get isRunning() {
    return player.celestials.alpha.run;
  },
  get currentStage() {
    return player.celestials.alpha.stage;
  },
  get stageNames() {
    return ["Reach the 4th Dimension Boost", "Reach the 5th Dimension Boost", "Reach the 1st Antimatter Galaxy", "Reach Infinity",
            "Complete Normal Challenge 12", "Break Infinity", "Purchase the 5e11 Break Infinity Upgrade",
            "Purchase All Break Infinity Upgrades", "Complete All Infinity Challenges", "Unlock Replicanti",
            "Purchase the 8th Infinity Dimension", "Reach Eternity", "Purchase Time Study 62", "Purchase the 4th Time Dimension",
            "Purchase the 3rd Eternity Upgrade", "Reach 115 Total Time Theorems", "Complete any Eternity Challenge Once",
            "Complete any Eternity Challenge Five Times", "Purchase Time Study 181", "Complete Eternity Challenge 10 Once",
            "Purchase Time Study 192", "Unlock Eternity Challenge 11", "Complete Eternity Challenge 11", "Unlock Time Dilation",
            "Perform a Dilated Eternity", "Begin Generation of Time Theorems", "Purchase the 8th Time Dimension", "Reach Reality"];
  },
  get shortStageNames() {
    return ["4th Dimboost", "5th Dimboost", "1st Galaxy", "Infinity", "NC12", "Break Infinity", "5e11 BIU", "All BIU", "All ICs",
            "Replicanti", "ID8", "Eternity", "TS62", "TD4", "Eternity Upgrade 3", "115 Total TT", "ECx1", "ECx5", "TS181", "EC10x1",
            "TS192", "EC11", "EC11x5", "Dilation", "Dilated Eternity", "TT Generation", "TD8", "Reality"];
  },
  get currentStageName() {
    return this.stageNames[this.currentStage];
  },
  get currentShortStageName() {
    return this.shortStageNames[this.currentStage];
  },
  get celestialMatterConversionNerf() {
    return 0.01 + (this.currentStage / 400) + Math.max(0, (this.currentStage - 22) / 400) + Math.max(0, (this.currentStage - 25) / 200);
  },
  quotes: Quotes.alpha,
  symbol: "α"
};

/*
class AlphaUnlockState extends BitUpgradeState {
  get bits() { return player.celestials.alpha.unlockBits; }
  set bits(value) { player.celestials.alpha.unlockBits = value; }

  get requirement() {
    return this.config.requirement;
  }

  get areEffectsActive() {
    return player.celestials.alpha.stage >= this.requirement;
  }
}

export const AlphaUnlock = mapGameDataToObject(
  GameDatabase.celestials.alpha.unlocks,
  config => new AlphaUnlockState(config)
);
*/

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
  if (Tab.celestials.alpha.isOpen) Alpha.quotes.unlock.show();
});
