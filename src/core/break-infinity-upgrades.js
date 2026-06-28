import { RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { SpeedrunMilestones } from "./speedrun";

export class BreakInfinityUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get set() {
    return player.infinityUpgrades;
  }

  get cost() {
    return this.config.cost();
  }

  get isAvailableForPurchase() {
    if (Alpha.isRunning && !player.break) return false;
    if (this.id === "autoBuyerUpgrade" && Alpha.isRunning && Alpha.currentStage < 7) return false;
    return true;
  }

  onPurchased() {
    if (this.id === "postGalaxy") {
      SpeedrunMilestones(7).tryComplete();
      PelleStrikes.powerGalaxies.trigger();
      if (Alpha.isRunning && Alpha.currentStage === 6) {
        Alpha.advanceLayer();
        Alpha.quotes.powerGalaxies.show();
      }
    }
    if (BreakInfinityUpgrade.all.filter(u => u.isBought).length === (BreakInfinityUpgrade.all.length - player.infinityRebuyables.length) &&
      BreakInfinityUpgrade.all.filter(u => u.isCapped).length === player.infinityRebuyables.length &&
      Alpha.isRunning && Alpha.currentStage === 7) {
      InfinityDimensions.fullReset();
      Alpha.advanceLayer();
      Alpha.quotes.allBreakUpgrades.show();
    }
  }
}

class RebuyableBreakInfinityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get boughtAmount() {
    return player.infinityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.infinityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades();
  }

  get isAvailableForPurchase() {
    if (Alpha.isRunning && !player.break) return false;
    return true;
  }

  onPurchased() {
    this.config.onPurchased?.();
    if (BreakInfinityUpgrade.all.filter(u => u.isBought).length === (BreakInfinityUpgrade.all.length - player.infinityRebuyables.length) &&
      BreakInfinityUpgrade.all.filter(u => u.isCapped).length === player.infinityRebuyables.length &&
      Alpha.isRunning && Alpha.currentStage === 7) {
      InfinityDimensions.fullReset()
      Alpha.advanceLayer();
      Alpha.quotes.allBreakUpgrades.show();
    }
  }
}

export const BreakInfinityUpgrade = mapGameDataToObject(
  GameDatabase.infinity.breakUpgrades,
  config => (config.rebuyable
    ? new RebuyableBreakInfinityUpgradeState(config)
    : new BreakInfinityUpgradeState(config))
);
