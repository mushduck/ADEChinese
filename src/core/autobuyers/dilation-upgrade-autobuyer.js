import { IntervaledAutobuyerState } from "./autobuyer";

export class DilationUpgradeAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() { return ["dtGain", "galaxyThreshold", "tachyonGain"][this.id - 1]; }

  get data() {
    return player.auto.dilationUpgrades.all[this.id - 1];
  }

  get name() {
    return [`膨胀时间倍增`, `超光速粒子星系阈值`, "超光速粒子倍增"][this.id - 1];
  }

  get interval() {
    return player.disablePostReality
      ? 1000
      : 1000 * Perk.autobuyerFasterDilation.effectOrDefault(1) / PerkShopUpgrade.autoSpeed.effectOrDefault(1);
  }

  get isUnlocked() {
    if (LHC.voidRunning && NullUpgrade.limerick5.isBought) return true;
    return (Perk.autobuyerDilation.isEffectActive && (!Pelle.isDoomed || PellePerkUpgrade.perkDAU.canBeApplied)) && !player.disablePostReality;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.REALITY;
  }

  get bulk() {
    return Effects.product(PerkShopUpgrade.bulkDilation, Perk.dilationAutobuyerBulk);
  }

  tick() {
    super.tick();
    const upgradeName = this._upgradeName;
    DilationUpgrade[upgradeName].purchase(this.bulk);
  }

  static get entryCount() { return 3; }
  static get autobuyerGroupName() { return "膨胀升级"; }
  static get isActive() { return player.auto.dilationUpgrades.isActive; }
  static set isActive(value) { player.auto.dilationUpgrades.isActive = value; }
}
