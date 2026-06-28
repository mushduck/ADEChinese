import { IntervaledAutobuyerState } from "./autobuyer";

export class CelestialDimensionAutobuyerState extends IntervaledAutobuyerState {
  get tier() {
    return this.id;
  }

  get dimension() {
    return CelestialDimension(this.tier);
  }

  get name() {
    return this.dimension.shortDisplayName;
  }

  get fullName() {
    return `${this.name} Celestial Dimension`;
  }

  get data() {
    return player.auto.celestialDims.all[this.tier - 1];
  }

  get interval() {
    return 1000 / CelestialBreakInfinityUpgrade.betterAuto.effectOrDefault(1) / (CelestialEternityUpgrade.instaAutos.isBought ? 1e300 : 1);
  }

  get isUnlocked() {
    return CelestialBreakInfinityUpgrade[`autoCD${Math.floor((this.tier + 3) / 4)}`].isBought;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.ENDGAME;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  get canTick() {
    return this.dimension.isAvailableForPurchase && super.canTick;
  }

  tick() {
    super.tick();
    this.dimension.buyMax(true);
  }

  static get entryCount() { return 8; }
  static get autobuyerGroupName() { return "Celestial Dimension"; }
  static get isActive() { return player.auto.celestialDims.isActive; }
  static set isActive(value) { player.auto.celestialDims.isActive = value; }
}
