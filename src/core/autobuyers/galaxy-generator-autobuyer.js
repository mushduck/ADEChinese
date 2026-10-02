import { IntervaledAutobuyerState } from "./autobuyer";

export class GalaxyGeneratorAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() {
    return ["additive", "multiplicative", "antimatterMult", "IPMult", "EPMult", "RSMult", "DTMult", "remnantPow", "exponential", "superExponential"][this.id - 1];
  }

  get data() {
    return player.auto.galaxyGenerator.all[this.id - 1];
  }

  get name() {
    return ["星系产量基数", "星系产量倍率", "反物质倍率", "无限点数倍率", "永恒点数倍率", "现实碎片倍率", "膨胀时间倍率", "遗物指数", "星系低指数", "星系高指数"][this.id - 1];
  }

  get interval() {
    return 1000 / Decimal.max(Decimal.log10(player.records.bestEndgame.galaxies.add(1)).sub(100), 1).toNumber();
  }

  get isUnlocked() {
    if (this.id === 10) return Accelerators.cosmic._milestones[1].isUnlocked && !player.disablePostReality;
    if (this.id === 9) return DivinityMilestone.celestialSurge.isReached && !player.disablePostReality;
    if (this.id === 8) return DivinityMilestone.divineDimensions.isReached && !player.disablePostReality;
    if (this.id === 7) return DivinityMilestone.firstDivine.isReached && !player.disablePostReality;
    return ExpansionPack.pellePack.isBought && !player.disablePostReality;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.ENDGAME;
  }

  get bulk() {
    return DivinityMilestone.divineDimensions.isReached ? Infinity : 1;
  }

  tick() {
    if (Pelle.hasGalaxyGenerator) {
      super.tick();
      const upgradeName = this._upgradeName;
      if (DivinityMilestone.divineDimensions.isReached) {
        GalaxyGeneratorUpgrades[upgradeName].purchase(true);
      } else {
        GalaxyGeneratorUpgrades[upgradeName].purchase(false);
      }
    }
  }

  static get entryCount() { return 10; }
  static get autobuyerGroupName() { return "星系生成器升级"; }
  static get isActive() { return player.auto.galaxyGenerator.isActive; }
  static set isActive(value) { player.auto.galaxyGenerator.isActive = value; }
}
