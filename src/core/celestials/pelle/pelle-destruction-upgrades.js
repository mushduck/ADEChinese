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
