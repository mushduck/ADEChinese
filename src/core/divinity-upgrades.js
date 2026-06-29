import { RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";

class RebuyableDivinityUpgradeState extends RebuyableMechanicState {
  get name() {
    return this.config.name;
  }
  
  get layer() {
    return this.config.layer;
  }
  
  get currency() {
    if (this.layer === 4 || this.layer === 5) return Currency.nebulae;
    if (this.layer === 2 || this.layer === 3) return Currency.divineStars;
    if (this.layer === 1) return Currency.divineMatter;
  }

  get boughtAmount() {
    return player.celestials.pelle.divinityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.celestials.pelle.divinityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export class DivinityUpgradeState extends SetPurchasableMechanicState {
  get name() {
    return this.config.name;
  }

  get layer() {
    return this.config.layer;
  }
  
  get currency() {
    if (this.layer === 4 || this.layer === 5) return Currency.nebulae;
    if (this.layer === 2 || this.layer === 3) return Currency.divineStars;
    if (this.layer === 1) return Currency.divineMatter;
  }

  get set() {
    return player.celestials.pelle.divinityUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }

  get isEffectActive() {
    return !player.disablePostReality && this.isBought;
  }
}

export const DivinityUpgrade = mapGameDataToObject(
  GameDatabase.celestials.divinityUpgrades,
  config => (config.rebuyable
    ? new RebuyableDivinityUpgradeState(config)
    : new DivinityUpgradeState(config))
);

export const DivinityUpgrades = {
  all: DivinityUpgrade.all,
  get isUnlocked() {
    return DivinityMilestone.divineDimensions.isReached;
  }
};
