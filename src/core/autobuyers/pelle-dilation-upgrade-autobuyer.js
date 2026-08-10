import { IntervaledAutobuyerState } from "./autobuyer";

export class PelleDilationUpgradeAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() { return ["dtGainPelle", "galaxyMultiplier", "tickspeedPower"][this.id - 1]; }

  get data() {
    return player.auto.pelleDilationUpgrades.all[this.id - 1];
  }

  get name() {
    return [`佩勒膨胀时间升级`, `佩勒超光速粒子星系升级`, "计数频率指数升级"][this.id - 1];
  }

  get interval() {
    return player.disablePostReality
      ? 1000
      : 1000 * Perk.autobuyerFasterDilation.effectOrDefault(1) / PerkShopUpgrade.autoSpeed.effectOrDefault(1);
  }

  get isUnlocked() {
    return PellePerkUpgrade.perkDAU.canBeApplied;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.REALITY;
  }

  get bulk() {
    return Effects.product(PerkShopUpgrade.bulkDilation, Perk.dilationAutobuyerBulk);
  }

  tick() {
    if (PelleRifts.paradox.milestones[0].canBeApplied) {
      super.tick();
      const upgradeName = this._upgradeName;
      DilationUpgrade[upgradeName].purchase(this.bulk);
    }
  }

  static get entryCount() { return 3; }
  static get autobuyerGroupName() { return "Pelle Dilation Upgrade"; }
  static get isActive() { return player.auto.pelleDilationUpgrades.isActive; }
  static set isActive(value) { player.auto.pelleDilationUpgrades.isActive = value; }
}
