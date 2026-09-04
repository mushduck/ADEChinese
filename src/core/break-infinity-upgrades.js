import { GameMechanicState, RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { SpeedrunMilestones } from "./speedrun";

class ChargedBreakInfinityUpgradeState extends GameMechanicState {
  constructor(config, upgrade) {
    super(config);
    this._upgrade = upgrade;
  }

  get isEffectActive() {
    return this._upgrade.isBought && this._upgrade.isCharged;
  }
}

export class BreakInfinityUpgradeState extends SetPurchasableMechanicState {
  constructor(config) {
    super(config);
    if (config.charged) {
      this._chargedEffect = new ChargedBreakInfinityUpgradeState(config.charged, this);
    }
  }

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

  get isEffectActive() {
    return this.isBought && !this.isCharged;
  }

  get chargedEffect() {
    return this._chargedEffect;
  }

  purchase() {
    if (super.purchase()) {
      EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADE_BOUGHT);
      return true;
    }
    if (this.canCharge) {
      this.charge();
      EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADE_CHARGED);
      return true;
    }
    return false;
  }

  get hasChargeEffect() {
    return this.config.charged !== undefined && Ascensions.ocA.isUnlocked;
  }

  get isCharged() {
    return player.endgame.overcharge.charged.infinite.has(this.id);
  }

  get canCharge() {
    return this.isBought &&
      this.hasChargeEffect &&
      !this.isCharged &&
      player.endgame.overcharge.chargesLeft.infinite !== 0;
  }

  charge() {
    player.endgame.overcharge.charged.infinite.add(this.id);
  }

  disCharge() {
    player.endgame.overcharge.charged.infinite.delete(this.id);
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

export function tryChargeAllBreakUpgrades() {
  if (player.endgame.overcharge.chargesLeft.infinite < 9) return;
  const upgrades = [
    BreakInfinityUpgrade.totalAMMult,
    BreakInfinityUpgrade.currentAMMult,
    BreakInfinityUpgrade.galaxyBoost,
    BreakInfinityUpgrade.infinitiedMult,
    BreakInfinityUpgrade.achievementMult,
    BreakInfinityUpgrade.slowestChallengeMult,
    BreakInfinityUpgrade.infinitiedGen,
    BreakInfinityUpgrade.autobuyMaxDimboosts,
    BreakInfinityUpgrade.autobuyerSpeed
  ];
  for (const upgrade of upgrades) {
    if (upgrade.canCharge) {
      upgrade.charge();
    }
  }
}

export function disChargeAllBreakUpgrades() {
  const upgrades = [
    BreakInfinityUpgrade.totalAMMult,
    BreakInfinityUpgrade.currentAMMult,
    BreakInfinityUpgrade.galaxyBoost,
    BreakInfinityUpgrade.infinitiedMult,
    BreakInfinityUpgrade.achievementMult,
    BreakInfinityUpgrade.slowestChallengeMult,
    BreakInfinityUpgrade.infinitiedGen,
    BreakInfinityUpgrade.autobuyMaxDimboosts,
    BreakInfinityUpgrade.autobuyerSpeed
  ];
  for (const upgrade of upgrades) {
    if (upgrade.isCharged) {
      upgrade.disCharge();
    }
  }
  player.endgame.overcharge.discharge.infinite = false;
  EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADES_DISCHARGED);
}

export const BreakInfinityUpgrade = mapGameDataToObject(
  GameDatabase.infinity.breakUpgrades,
  config => (config.rebuyable
    ? new RebuyableBreakInfinityUpgradeState(config)
    : new BreakInfinityUpgradeState(config))
);
