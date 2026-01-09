import { IntervaledAutobuyerState } from "./autobuyer";

export class GalaxyGeneratorAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() { return ["additive", "multiplicative", "antimatterMult", "IPMult", "EPMult", "RSMult"][this.id - 1]; }

  get data() {
    return player.auto.galaxyGenerator.all[this.id - 1];
  }

  get name() {
    return ["Base Galaxy Multiplier", "Multiplicative Galaxy Multiplier", "Antimatter Multiplier", "Infinity Point Multiplier", "Eternity Point Multiplier", "Reality Shard Multiplier"][this.id - 1];
  }

  get interval() {
    return 1000 / Math.max(Decimal.log10(player.records.bestEndgame.galaxies.add(1)) - 100, 1);
  }

  get isUnlocked() {
    return ExpansionPack.pellePack.isBought;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.ENDGAME;
  }

  get bulk() {
    return 1;
  }

  tick() {
    if (Pelle.hasGalaxyGenerator) {
      super.tick();
      const upgradeName = this._upgradeName;
      GalaxyGeneratorUpgrades[upgradeName].purchase(this.bulk);
    }
  }

  static get entryCount() { return 6; }
  static get autobuyerGroupName() { return "Galaxy Generator Upgrade"; }
  static get isActive() { return player.auto.galaxyGenerator.isActive; }
  static set isActive(value) { player.auto.galaxyGenerator.isActive = value; }
}
