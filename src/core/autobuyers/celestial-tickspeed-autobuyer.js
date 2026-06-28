import { IntervaledAutobuyerState } from "./autobuyer";

export class CelestialTickspeedAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.celestialTickspeed;
  }

  get name() {
    return `Celestial Tickspeed`;
  }

  get isUnlocked() {
    return CelestialBreakInfinityUpgrade.autoCDPlus.isBought;
  }

  get interval() {
    return 1000 / CelestialBreakInfinityUpgrade.betterAuto.effectOrDefault(1) / (CelestialEternityUpgrade.instaAutos.isBought ? 1e300 : 1);
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get hasUnlimitedBulk() {
    return this.mode === AUTOBUYER_MODE.BUY_MAX;
  }

  toggleMode() {
    this.mode = [
      AUTOBUYER_MODE.BUY_SINGLE,
      AUTOBUYER_MODE.BUY_MAX
    ]
      .nextSibling(this.mode);
  }

  get canTick() {
    return CelestialTickspeed.isAvailableForPurchase && CelestialTickspeed.isAffordable && super.canTick;
  }

  tick() {
    super.tick();
    switch (this.mode) {
      case AUTOBUYER_MODE.BUY_SINGLE:
        buyCelestialTickSpeed();
        break;
      case AUTOBUYER_MODE.BUY_MAX:
        buyMaxCelestialTickSpeed();
        break;
    }
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.ENDGAME;
  }
}
