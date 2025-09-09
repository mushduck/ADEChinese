import { SetPurchasableMechanicState } from "../../utils";

export class PelleAchievementUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.achievements;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleAchievementUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.achievements,
  config => new PelleAchievementUpgradeState(config)
);

export class PelleDestructionUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.upgrades;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleDestructionUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.upgrades,
  config => new PelleDestructionUpgradeState(config)
);

export class PelleRealityUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.realityUpgrades;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleRealityUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.realityUpgrades,
  config => new PelleRealityUpgradeState(config)
);

export class PelleImaginaryUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.imaginaryUpgrades;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleImaginaryUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.imaginaryUpgrades,
  config => new PelleImaginaryUpgradeState(config)
);

export class PelleCelestialUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.celestials;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleCelestialUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.celestials,
  config => new PelleCelestialUpgradeState(config)
);

export class PellePerkUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.perks;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PellePerkUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.perks,
  config => new PellePerkUpgradeState(config)
);

export class PelleAlchemyUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.alchemy;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleAlchemyUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.alchemy,
  config => new PelleAlchemyUpgradeState(config)
);

export class PelleStrikeUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.endgame.pelleDestruction.strikes;
  }

  get currency() {
    return Currency.doomedParticles;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

}

export const PelleStrikeUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelleDestruction.strikes,
  config => new PelleStrikeUpgradeState(config)
);
