import { IntervaledAutobuyerState } from "./autobuyer";

export class CelestialCrunchAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.celestialCrunch;
  }

  get name() {
    return `Celestial Infinity`;
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

  get hasAdditionalModes() {
    return CelestialEternityUpgrade.betterCelCrunchAuto.isBought;
  }

  get increaseWithMult() {
    return this.data.increaseWithMult;
  }

  set increaseWithMult(value) {
    this.data.increaseWithMult = value;
  }

  get amount() {
    return this.data.amount;
  }

  // This is unused mechanically, but should be zero to suppress the "Current bulk:" text
  get bulk() {
    return 0;
  }

  set amount(value) {
    this.data.amount = value;
  }

  get time() {
    return this.data.time;
  }

  set time(value) {
    this.data.time = value;
  }

  get xHighest() {
    return this.data.xHighest;
  }

  set xHighest(value) {
    this.data.xHighest = value;
  }

  bumpAmount(mult) {
    if (this.isUnlocked && this.increaseWithMult) {
      this.amount = this.amount.times(mult);
    }
  }

  get canTick() {
    return Currency.celestialMatter.gte(DC.NUMMAX) && super.canTick;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.CELESTIAL_ETERNITY;
  }

  get highestPrevPrestige() {
    return player.records.thisCelestialEternity.maxCIP;
  }

  get timeToNextTick() {
    return Math.clampMin(this.time - Time.thisCelestialInfinityRealTime.totalSeconds.toNumber(), 0);
  }

  get willInfinity() {
    if (!player.endgame.celDimExpansion.isBroken) return true;

    switch (this.mode) {
      case AUTO_CELESTIAL_CRUNCH_MODE.AMOUNT:
        return gainedCelestialInfinityPoints().gte(this.amount);
      case AUTO_CELESTIAL_CRUNCH_MODE.TIME:
        return Time.thisCelestialInfinityRealTime.totalSeconds.toNumber() > this.time;
      case AUTO_CELESTIAL_CRUNCH_MODE.X_HIGHEST:
      default:
        return gainedCelestialInfinityPoints().gte(this.highestPrevPrestige.times(this.xHighest));
    }
  }

  tick() {
    super.tick();
    if (this.willInfinity) celestialCrunchResetRequest(true);
  }

  reset() {
    super.reset();
    this.mode = AUTO_CELESTIAL_CRUNCH_MODE.AMOUNT;
  }
}
