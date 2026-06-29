import { AutobuyerState } from "./autobuyer";

export class DualityUpgradeAutobuyerState extends AutobuyerState {
  get name() {
    return DualityUpgrade(this.id).config.name;
  }

  get data() {
    return player.auto.dualityUpgrades.all[this.id - 1];
  }

  get isUnlocked() {
    return DualityUpgrade(20).canBeApplied;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    const upg = DualityUpgrade(this.id);
    upg.bulkPurchase();
  }

  static get entryCount() { return 10; }
  static get autobuyerGroupName() { return "Duality Upgrade"; }
  static get isActive() { return player.auto.dualityUpgrades.isActive; }
  static set isActive(value) { player.auto.dualityUpgrades.isActive = value; }
}
