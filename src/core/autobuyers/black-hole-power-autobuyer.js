import { AutobuyerState } from "./autobuyer";

export class BlackHolePowerAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.blackHolePower.all[this.id - 1];
  }

  get name() {
    return `黑洞 ${this.id} 强度`;
  }

  get isUnlocked() {
    return (Ra.unlocks.blackHolePowerAutobuyers.canBeApplied || EndgameMilestone.startRa.isReached) && !player.disablePostReality;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    const bh = BlackHole(this.id);
    bh.powerUpgrade.bulkPurchase();
  }

  static get entryCount() { return 2; }
  static get autobuyerGroupName() { return "黑洞强度"; }
  static get isActive() { return player.auto.blackHolePower.isActive; }
  static set isActive(value) { player.auto.blackHolePower.isActive = value; }
}
