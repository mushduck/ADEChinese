import { SetPurchasableMechanicState } from "./game-mechanics";

export class ResurgenceUpgradeState extends SetPurchasableMechanicState {
  get name() {
    return this.config.name;
  }
  
  get currency() {
    return Currency.divineEnergy;
  }

  get set() {
    return player.celestials.pelle.resurgenceUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }

  get isEffectActive() {
    return !player.disablePostReality && this.isBought;
  }
}

export const ResurgenceUpgrade = mapGameDataToObject(
  GameDatabase.celestials.resurgenceUpgrades,
  config => (config.rebuyable
    ? new ResurgenceUpgradeState(config)
    : new ResurgenceUpgradeState(config))
);

export const ResurgenceUpgrades = {
  all: ResurgenceUpgrade.all,
  get isUnlocked() {
    return DivinityUpgrade.divineL1U5.isBought;
  }
};
