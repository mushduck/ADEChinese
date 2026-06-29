import { AutobuyerState } from "./autobuyer";

export class IPMultAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.ipMultBuyer;
  }

  get name() {
    return `Infinity Point Multiplier`;
  }

  get isUnlocked() {
    return (EternityMilestone.autobuyerIPMult.isReached && (!Pelle.isDoomed || PelleDestructionUpgrade.x2IPUpgrade.canBeApplied)) ||
      (LHC.voidRunning && NullUpgrade.limerick5.isBought);
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    InfinityUpgrade.ipMult.buyMax();
  }
}

export class EPMultAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.epMultBuyer;
  }

  get name() {
    return `Eternity Point Multiplier`;
  }

  get isUnlocked() {
    if (LHC.voidRunning && NullUpgrade.limerick5.isBought) return true;
    return !player.disablePostReality && RealityUpgrade(13).isBought && (!Pelle.isDoomed || PelleDestructionUpgrade.x5EPUpgrade.canBeApplied);
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    // While the active check is normally automatically handled with the global autobuyer ticking method, we also
    // call this from the TD autobuyers in order to make sure this is executed before TDs are purchased. Simply
    // reordering the autobuyer call order is undesirable because much of the codebase relies on autobuyers being
    // grouped as they are, and many other autobuyers in the 5xEP group must execute *after* dimensions
    if (!this.isActive) return;
    applyEU2();
    EternityUpgrade.epMult.buyMax(true);
  }
}

export class CIPMultAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.cipMultBuyer;
  }

  get name() {
    return `Celestial Infinity Point Multiplier`;
  }

  get isUnlocked() {
    return CelestialEternityUpgrade.x2CIPAuto.isBought;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    CelestialInfinityUpgrade.cipMult.buyMax();
  }
}
