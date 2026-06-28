import { IntervaledAutobuyerState } from "./autobuyer";

export class DivineDimensionAutobuyerState extends IntervaledAutobuyerState {
  get tier() {
    return this.id;
  }

  get dimension() {
    return DivineDimension(this.tier);
  }

  get name() {
    return this.dimension.shortDisplayName;
  }

  get fullName() {
    return `${this.name} Divine Dimension`;
  }

  get data() {
    return player.auto.divineDims.all[this.tier - 1];
  }

  get interval() {
    return 1 / 1e300;
  }

  get isUnlocked() {
    return DivinityUpgrade.divineL4U2.isBought;
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
  static get autobuyerGroupName() { return "Divine Dimension"; }
  static get isActive() { return player.auto.divineDims.isActive; }
  static set isActive(value) { player.auto.divineDims.isActive = value; }
}
