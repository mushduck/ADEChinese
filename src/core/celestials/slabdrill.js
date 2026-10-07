import { BitUpgradeState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

import { matchOnlyDeepmerge } from "@/utility/deepmerge";

export const Slabdrill = {
  displayName: "渊蛇",
  possessiveName: "渊蛇",
  get isCursed() {
    return player.celestials.slabdrill.isCursed;
  },
  get isUnlocked() {
    return Slabdrill.isCursed || Slabdrill.isDestroyed;
  },
  get isDestroyed() {
    return player.celestials.slabdrill.isDestroyed;
  },
  get currentStage() {
    return player.celestials.slabdrill.stage;
  },
  get power() {
    return player.celestials.slabdrill.serpentinePower;
  },
  get cores() {
    return player.celestials.slabdrill.core.chaosCores;
  },
  get powerCap() {
    return Decimal.pow10(this.cores);
  },
  powerPerSecond(diff) {
    return (this.powerCap.sub(this.power)).times(
      new Decimal(1).sub(Decimal.pow(2, new Decimal(0).sub(diff).div(1000).div(666))));
  },
  get coreActive() {
    return player.celestials.slabdrill.core.isActive;
  },
  get huntChance() {
    return Decimal.pow10(-this.cores).times(Decimal.pow10(this.currentStage)).times(
      player.antimatter.max(10).log10().log10().pow(3).add(1)).div(10000).times(
      SlabdrillUnlocks.dilation.isUnlocked ? 16 : 1).times(
      SlabdrillUnlocks.reality.isUnlocked ? Slabdrill.slabPowers.chaosCores().times(66) : 1).toNumber();
  },
  get huntInterval() {
    return 1000 * Math.pow(0.75, this.currentStage);
  },
  slabPowers: {
    adMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : DC.D2.pow(Slabdrill.power.pow(0.5)),
    dbMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.max(1).log10().add(1).pow(4),
    galMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.max(1).log10().pow(2).div(100).add(1),
    adPow: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.max(1).log10().div(100).add(1),
    ipMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : DC.D2.pow(Slabdrill.power.div(100).add(1).pow(0.4)),
    idMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : DC.D2.pow(Slabdrill.power.div(1000).add(1).pow(0.5)),
    repSpeed: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.div(1e6).add(1).pow(2),
    tdMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : DC.D2.pow(Slabdrill.power.div(1e7).add(1).pow(0.3)),
    epMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : DC.D2.pow(Slabdrill.power.div(1e9).add(1).pow(0.4)),
    infMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.div(1e10).add(1).pow(0.75),
    dtMult: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.div(1e12).add(1).pow(2),
    chaosCores: () => player.dilation.active || !Slabdrill.isCursed ? DC.D1 : Slabdrill.power.div(1e15).add(1).log10().add(1).pow(7)
  },
  realityWarp() {
    player.disablePostReality = true;
    Endgame.resetNoReward();
    disChargeAllPerkUpgrades();
    disChargeAll();
    disChargeAllBreakUpgrades();
    disChargeAllEternityUpgrades();
    player.endgame.overcharge.allowComplex = false;
    AutomatorBackend.stop();
    clearCelestialRuns();
    player.celestials.slabdrill.isCursed = true;
    recalculateAllGlyphs();
    Tab.dimensions.antimatter.show(false);
  },
  warpToPelleDomain() {
    player.celestials.slabdrill.isCursed = false;
    player.celestials.slabdrill.isDestroyed = true;
    clearCelestialRuns();
    player.disablePostReality = false;
    player.celestials.slabdrill.core.chaosCores = 0;
    player.celestials.slabdrill.serpentinePower = DC.D0;
    for (let alch = 0; alch < 5; alch++) {
      player.celestials.ra.alchemy[alch].bestPreDoom = 0;
      player.celestials.ra.alchemy[alch].amount = 0;
    }
    player.celestials.ra.alchemy[10].bestPreDoom = 0;
    player.celestials.ra.alchemy[10].amount = 0;
    player.celestials.effarig.relicShards = DC.D0;
    Endgame.resetNoReward(true);
    player.endgame.overcharge.allowComplex = true;
    recalculateAllGlyphs();
    AutomatorBackend.stop();
    Tab.dimensions.antimatter.show(false);
    GameEnd.creditsEverClosed = true;
    player.antimatter = Decimal.pow10(1e100);
  },
  advanceLayer() {
    player.celestials.slabdrill.stage++;
  },
  enterCore(coreJump = false) {
    player.celestials.slabdrill.records = matchOnlyDeepmerge(player, player.celestials.slabdrill.records, "eternityChalls");
    finishProcessReality({ reset: true });
    let cache = Object.keys(GameCache);
    for (let c = 0; c < cache.length; c++) {
        GameCache[cache[c]].invalidate();
    }
    player.celestials.slabdrill.core.isActive = true;
    player.break = true;
    Tab.dimensions.antimatter.show(!coreJump);
  },
  exitCore() {
    player.celestials.slabdrill.core.isActive = false;
    finishProcessReality({ reset: true });
    player = matchOnlyDeepmerge(player.celestials.slabdrill.records, player, "eternityChalls");
    GameStorage.loadPlayerObject(player);
    for (let a = 0; a < 8; a++) {
      if (player.auto.antimatterDims.all[a].isUnlocked) {
        Currency.antimatter.add(Autobuyer.antimatterDimension(a+1).cost);
        Autobuyer.antimatterDimension(a+1).purchase();
      }
    }
    let cache = Object.keys(GameCache);
    for (let c = 0; c < cache.length; c++) {
        GameCache[cache[c]].invalidate();
    }
  },
  get layerReqs() {
    return ["进行维度提升", "创造一个星系", "达到无限", "打破无限", "完成无限挑战 4",
            "解锁复制器", "达到永恒", "购买时间研究 181", "完成永恒挑战 10", "膨胀时间",
            "达到现实"];
  },
  get nextLayer() {
    return this.layerReqs[this.currentStage];
  },
  quotes: Quotes.slabdrill,
  symbol: "⁹δ"
};

class SlabdrillUnlockState extends BitUpgradeState {
  get bits() { return player.celestials.slabdrill.unlockBits; }
  set bits(value) { player.celestials.slabdrill.unlockBits = value; }

  get requirement() {
    return this.config.requirement;
  }

  get name() {
    return this.config.name;
  }

  get nerfDescription() {
    return this.config.nerfDescription;
  }

  get buffDescription() {
    return this.config.buffDescription;
  }

  get isUnlocked() {
    return player.celestials.slabdrill.stage >= this.requirement && Slabdrill.isCursed;
  }
}

export const SlabdrillUnlocks = mapGameDataToObject(
  GameDatabase.celestials.slabdrill.unlocks,
  config => new SlabdrillUnlockState(config)
);
