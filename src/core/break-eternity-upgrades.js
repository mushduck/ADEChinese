import { RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";

export class BreakEternityUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.antimatter.exponent;
  }

  get set() {
    return player.breakEternityUpgrades;
  }
}

class RebuyableBreakEternityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.antimatter.exponent;
  }

  get boughtAmount() {
    return player.breakEternityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.breakEternityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export const BreakEternityUpgrade = mapGameDataToObject(
  GameDatabase.endgame.upgrades,
  config => (config.rebuyable
    ? new RebuyableBreakEternityUpgradeState(config)
    : new BreakEternityUpgradeState(config))
);
