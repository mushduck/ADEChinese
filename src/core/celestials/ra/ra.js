import { GameMechanicState } from "../../game-mechanics";
import { Quotes } from "../quotes";

class RaUnlockState extends GameMechanicState {
  get bits() { return player.celestials.ra.unlockBits; }
  set bits(value) { player.celestials.ra.unlockBits = value; }

  get isUnlocked() {
    return player.celestials.ra.unlocks.includes(this.id);
  }

  get disabledByPelle() {
    return Pelle.isDoomed && this.isDisabledByPelle;
  }

  get isDisabledByPelle() {
    return this.config.disabledByPelle ? this.config.disabledByPelle() : false;
  }

  get isEffectActive() {
    return this.isUnlocked && !this.disabledByPelle;
  }

  get requirementText() {
    const pet = this.pet.name;
    return this.level === 1
      ? `Unlock ${pet}`
      : `Get ${pet} to level ${this.level}`;
  }

  get reward() {
    return typeof this.config.reward === "function"
      ? this.config.reward()
      : this.config.reward;
  }

  get displayIcon() {
    return this.disabledByPelle ? `<span class="fas fa-ban"></span>` : this.config.displayIcon;
  }

  get pet() {
    return Ra.pets[this.config.pet];
  }

  get level() {
    return this.config.level;
  }

  get canBeUnlocked() {
    return this.pet.level >= this.level && !this.isUnlocked;
  }

  unlock() {
    if (this.canBeUnlocked) player.celestials.ra.unlocks.push(this.id);
  }

  onUnlock() {
    player.celestials.ra.unlocks.push(this.id);
    this.config.onUnlock?.();
  }
}

const unlocks = mapGameDataToObject(
  GameDatabase.celestials.ra.unlocks,
  config => new RaUnlockState(config)
);

class RaPetState extends GameMechanicState {
  get data() {
    return player.celestials.ra.pets[this.id];
  }

  get name() {
    return this.config.name;
  }

  get chunkGain() {
    return this.config.chunkGain;
  }

  get memoryGain() {
    return this.config.memoryGain;
  }

  get color() {
    return this.config.color;
  }

  get requiredUnlock() {
    return this.config.requiredUnlock?.();
  }

  get rawMemoryChunksPerSecond() {
    return this.config.rawMemoryChunksPerSecond();
  }

  get memoryProductionMultiplier() {
    return this.config.memoryProductionMultiplier();
  }

  get isUnlocked() {
    return this.requiredUnlock === undefined || this.requiredUnlock.isUnlocked;
  }

  get isCapped() {
    return this.level >= Ra.levelCap;
  }

  get level() {
    return this.isUnlocked ? this.data.level : 0;
  }

  set level(value) {
    this.data.level = value;
  }

  get memories() {
    return this.data.memories;
  }

  set memories(value) {
    this.data.memories = value;
  }

  get memoryChunks() {
    return this.data.memoryChunks;
  }

  set memoryChunks(value) {
    this.data.memoryChunks = value;
  }

  get requiredMemories() {
    return Ra.requiredMemoriesForLevel(this.level);
  }

  get memoryChunksPerSecond() {
    if (!this.canGetMemoryChunks) return DC.D0;
    let res = this.rawMemoryChunksPerSecond.times(this.chunkUpgradeCurrentMult).times(
      Effects.product(Ra.unlocks.continuousTTBoost.effects.memoryChunks)).times(GlyphSacrifice.reality.effectValue);
    if (this.hasRemembrance) res = res.times(Ra.remembrance.multiplier);
    else if (Ra.petWithRemembrance) res = res.times(Ra.remembrance.nerf);
    if (ExpansionPack.raPack.isBought && !player.disablePostReality) res = res.times(10);
    return res;
  }

  get canGetMemoryChunks() {
    return this.isUnlocked && Ra.isRunning;
  }

  get hasRemembrance() {
    return Ra.petWithRemembrance === this.name;
  }

  get memoryUpgradeCurrentMult() {
    return Decimal.pow(1.3, this.data.memoryUpgrades);
  }

  get chunkUpgradeCurrentMult() {
    return Decimal.pow(1.5, this.data.chunkUpgrades);
  }

  get memoryUpgradeCost() {
    return Decimal.pow(5, this.data.memoryUpgrades).times(1000);
  }

  get chunkUpgradeCost() {
    return Decimal.pow(25, this.data.chunkUpgrades).times(5000);
  }

  get canBuyMemoryUpgrade() {
    return this.memoryUpgradeCost.lte(this.memories);
  }

  get canBuyChunkUpgrade() {
    return this.chunkUpgradeCost.lte(this.memories);
  }

  get memoryUpgradeCapped() {
    return this.memoryUpgradeCost.gte(Ra.requiredMemoriesForLevel(Ra.levelCap - 1).times(0.5));
  }

  get chunkUpgradeCapped() {
    return this.chunkUpgradeCost.gte(Ra.requiredMemoriesForLevel(Ra.levelCap - 1).times(0.5));
  }

  purchaseMemoryUpgrade() {
    if (!this.canBuyMemoryUpgrade || this.memoryUpgradeCapped) return;

    this.memories = this.memories.sub(this.memoryUpgradeCost);
    this.data.memoryUpgrades++;
  }

  purchaseChunkUpgrade() {
    if (!this.canBuyChunkUpgrade || this.chunkUpgradeCapped) return;

    this.memories = this.memories.sub(this.chunkUpgradeCost);
    this.data.chunkUpgrades++;
  }

  levelUp() {
    if (this.memories.lt(this.requiredMemories)) return;

    this.memories = this.memories.sub(this.requiredMemories);
    this.level++;
    Ra.checkForUnlocks();
  }

  get unlocks() {
    return Ra.unlocks.all
      .filter(x => x.pet === this)
      .sort((a, b) => a.level - b.level);
  }

  tick(realDiff, generateChunks) {
    const seconds = realDiff / 1000;
    const newMemoryChunks = generateChunks
      ? this.memoryChunksPerSecond.times(seconds)
      : DC.D0;
    // Adding memories from half of the gained chunks this tick results in the best mathematical behavior
    // for very long simulated ticks
    const newMemories = (this.memoryChunks.add(newMemoryChunks.div(2))).times(seconds).times(Ra.productionPerMemoryChunk).times(
      this.memoryUpgradeCurrentMult);
    this.memoryChunks = this.memoryChunks.add(newMemoryChunks);
    this.memories = this.memories.add(newMemories);
  }

  reset() {
    this.data.level = 1;
    this.data.memories = DC.D0;
    this.data.memoryChunks = DC.D0;
    this.data.memoryUpgrades = 0;
    this.data.chunkUpgrades = 0;
  }
}

const pets = mapGameDataToObject(
  GameDatabase.celestials.ra.pets,
  config => new RaPetState(config)
);

export const Ra = {
  displayName: "Ra",
  possessiveName: "Ra's",
  unlocks,
  pets,
  remembrance: {
    multiplier: 5,
    nerf: 0.5,
    requiredLevels: 20,
    get isUnlocked() {
      return Ra.totalPetLevel >= this.requiredLevels;
    }
  },
  // Dev/debug function for easier testing
  reset() {
    const data = player.celestials.ra;
    data.unlockBits = 0;
    data.run = false;
    data.charged = new Set();
    data.disCharge = false;
    data.peakGamespeed = 1;
    for (const pet of Ra.pets.all) pet.reset();
  },
  memoryTick(realDiff, generateChunks) {
    if (!this.isUnlocked) return;
    for (const pet of Ra.pets.all) pet.tick(realDiff, generateChunks);
  },
  get productionPerMemoryChunk() {
    let res = new Decimal(Effects.product(Ra.unlocks.continuousTTBoost.effects.memories, Achievement(168), Achievement(236)));
    for (const pet of Ra.pets.all) {
      if (pet.isUnlocked) res = res.times(pet.memoryProductionMultiplier);
    }
    if (ExpansionPack.raPack.isBought && !player.disablePostReality) res = res.times(10);
    return res;
  },
  get memoryBoostResources() {
    const boostList = [];
    for (const pet of Ra.pets.all) {
      if (pet.memoryProductionMultiplier !== 1) boostList.push(pet.memoryGain);
    }
    if (Achievement(168).isUnlocked) boostList.push("Achievement 168");
    if (Ra.unlocks.continuousTTBoost.canBeApplied) boostList.push("current TT");

    if (boostList.length === 1) return `${boostList[0]}`;
    if (boostList.length === 2) return `${boostList[0]} and ${boostList[1]}`;
    return `${boostList.slice(0, -1).join(", ")}, and ${boostList[boostList.length - 1]}`;
  },
  // This is the exp required ON "level" in order to reach "level + 1"
  requiredMemoriesForLevel(level) {
    if (level >= Ra.levelCap) return DC.BEMAX;
    const adjustedLevel = Decimal.pow(level, 2).div(10).add(level);
    const post15Scaling = Decimal.pow(1.5, Decimal.max(0, level - 15));
    const post25Scaling = Decimal.pow(Decimal.max(0, level - 25).add(10), Decimal.max(0, level - 25).times(2));
    return Decimal.floor(Decimal.pow(adjustedLevel, 5.52).times(post15Scaling).times(post25Scaling).times(1e6));
  },
  // Returns a string containing a time estimate for gaining a specific amount of exp (UI only)
  timeToGoalString(pet, expToGain) {
    // Quadratic formula for growth (uses constant growth for a = 0)
    const a = Enslaved.isStoringRealTime
      ? DC.D0
      : Ra.productionPerMemoryChunk.times(pet.memoryUpgradeCurrentMult).times(pet.memoryChunksPerSecond).div(2);
    const b = Ra.productionPerMemoryChunk.times(pet.memoryUpgradeCurrentMult).times(pet.memoryChunks);
    const c = new Decimal(expToGain).neg();
    let estimate = DC.D0;
    if (a.eq(0)) estimate = c.neg().div(b);
    else if (a.neq(0)) estimate = (Decimal.sqrt(Decimal.pow(b, 2).sub(a.times(c).times(4))).sub(b)).div(a.times(2));
    if (Decimal.isFinite(estimate)) {
      return `in ${TimeSpan.fromSeconds(estimate).toStringShort()}`;
    }
    return "";
  },
  get totalPetLevel() {
    return this.pets.all.map(pet => (pet.isUnlocked ? pet.level : 0)).sum();
  },
  get levelCap() {
    if (!ExpansionPack.raPack.isBought || player.disablePostReality) return 25;
    return Math.floor(Math.max(25, Decimal.log10(player.records.bestAntimatterExponentOutsideDoom).toNumber()));
  },
  get maxTotalPetLevel() {
    return this.levelCap * this.pets.all.length;
  },
  checkForUnlocks() {
    if (!VUnlocks.raUnlock.canBeApplied && !EndgameMilestone.celestialEarlyUnlock.isReached) return;
    for (const unl of Ra.unlocks.all) {
      unl.unlock();
    }

    Ra.checkForQuotes();
  },
  checkForQuotes() {
    for (const quote of Ra.quotes.all) {
      // Quotes without requirements will be shown in other ways
      if (quote.requirement) {
        quote.show();
      }
    }
  },
  initializeRun() {
    clearCelestialRuns();
    player.celestials.ra.run = true;
    this.quotes.realityEnter.show();
  },
  toggleMode() {
    player.celestials.ra.activeMode = !player.celestials.ra.activeMode;
  },
  // This gets widely used in lots of places since the relevant upgrade is "all forms of continuous non-dimension
  // production", which in this case is infinities, eternities, replicanti, dilated time, and time theorem generation.
  // It also includes the 1% IP time study, Teresa's 1% EP upgrade, and the charged RM generation upgrade. Note that
  // removing the hardcap of 10 may cause runaways.
  theoremBoostFactor() {
    return Decimal.min(10, Decimal.max(0, Currency.timeTheorems.value.add(1).pLog10().sub(350)).div(50)).toNumber();
  },
  get isUnlocked() {
    return V.spaceTheorems >= 36 || EndgameMilestone.celestialEarlyUnlock.isReached;
  },
  get isRunning() {
    return player.celestials.ra.run;
  },
  get totalCharges() {
    return Ra.unlocks.chargedInfinityUpgrades.effectOrDefault(0);
  },
  get chargesLeft() {
    return this.totalCharges - player.celestials.ra.charged.size;
  },
  get canBuyTriad() {
    return Ra.unlocks.unlockHardV.canBeApplied && !player.disablePostReality;
  },
  get petWithRemembrance() {
    return player.celestials.ra.petWithRemembrance;
  },
  set petWithRemembrance(name) {
    player.celestials.ra.petWithRemembrance = name;
  },
  updateAlchemyFlow(realityRealTime) {
    const perSecond = 1000 / realityRealTime;
    for (const resource of AlchemyResources.all) {
      resource.ema.addValue((resource.amount - resource.before) * perSecond);
      resource.before = resource.amount;
    }
  },
  applyAlchemyReactions(realityRealTime) {
    if (!Ra.unlocks.effarigUnlock.canBeApplied) return;
    const sortedReactions = AlchemyReactions.all
      .compact()
      .sort((r1, r2) => r2.priority - r1.priority);
    for (const reaction of sortedReactions) {
      reaction.combineReagents();
    }
    this.updateAlchemyFlow(realityRealTime);
  },
  get alchemyResourceCap() {
    return (ExpansionPack.effarigPack.isBought && !player.disablePostReality)
      ? Math.max(25000, (player.records.bestEndgame.glyphLevel / 3) * Ra.unlocks.alchemyCapIncrease.effectOrDefault(1))
      : 25000 * Ra.unlocks.alchemyCapIncrease.effectOrDefault(1);
  },
  get momentumValue() {
    const hoursFromUnlock = EffarigUnlock.maxMomentum.isUnlocked
      ? Infinity
      : TimeSpan.fromMilliseconds(new Decimal(player.celestials.ra.momentumTime)).totalHours.toNumber();
    return Math.clampMax(1 + 0.01 * hoursFromUnlock, AlchemyResource.momentum.effectValue);
  },
  quotes: Quotes.ra,
  symbol: "<i class='fas fa-sun'></i>"
};

export const GlyphAlteration = {
  // Adding a secondary effect to some effects
  get additionThreshold() {
    return new Decimal(1e36);
  },
  // One-time massive boost of a single effect
  get empowermentThreshold() {
    return new Decimal(1e43);
  },
  // Scaling boost from sacrifice quantity
  get boostingThreshold() {
    return new Decimal(1e60);
  },
  getSacrificePower(type) {
    if (Pelle.isDisabled("alteration") && !PelleCelestialUpgrade.raTeresa3.canBeApplied) return new Decimal(0);
    const sacPower = player.reality.glyphs.sac[type];
    if (sacPower === undefined) {
      throw new Error("Unknown sacrifice type");
    }
    return sacPower;
  },
  get isUnlocked() {
    if (Pelle.isDisabled("alteration") && !PelleCelestialUpgrade.raTeresa3.canBeApplied) return false;
    return Ra.unlocks.alteredGlyphs.canBeApplied && !player.disablePostReality;
  },
  isAdded(type) {
    return this.isUnlocked && this.getSacrificePower(type).gte(this.additionThreshold);
  },
  isEmpowered(type) {
    return this.isUnlocked && this.getSacrificePower(type).gte(this.empowermentThreshold);
  },
  isBoosted(type) {
    return this.isUnlocked && this.getSacrificePower(type).gte(this.boostingThreshold);
  },
  sacrificeBoost(type) {
    const capped = Decimal.clampMax(this.getSacrificePower(type), GlyphSacrificeHandler.maxSacrificeForEffects);
    return Decimal.log10(Decimal.clampMin(capped.div(this.boostingThreshold), 1)).div(2).toNumber();
  },
  baseAdditionColor(isDark = Theme.current().isDark()) {
    return isDark ? "#CCCCCC" : "black";
  },
  baseEmpowermentColor(isDark = Theme.current().isDark()) {
    return isDark ? "#EEEE30" : "#C6C610";
  },
  baseBoostColor(isDark = Theme.current().isDark()) {
    return isDark ? "#60DDDD" : "#28BDBD";
  },
  getAdditionColor(type) {
    const isDark = CosmeticGlyphTypes[type].currentColor.bg === "black";
    return this.isAdded(type) ? this.baseAdditionColor(isDark) : undefined;
  },
  getEmpowermentColor(type) {
    const isDark = CosmeticGlyphTypes[type].currentColor.bg === "black";
    return this.isEmpowered(type) ? this.baseEmpowermentColor(isDark) : undefined;
  },
  getBoostColor(type) {
    const isDark = CosmeticGlyphTypes[type].currentColor.bg === "black";
    return this.isBoosted(type) ? this.baseBoostColor(isDark) : undefined;
  }
};

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
  if (Tab.celestials.ra.isOpen) Ra.quotes.unlock.show();
});
