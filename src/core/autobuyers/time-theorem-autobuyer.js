import { AutobuyerState } from "./autobuyer";

export class TimeTheoremAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.timeTheorems;
  }

  get name() {
    return `Time Theorem`;
  }

  get isUnlocked() {
    if (LHC.voidRunning && NullUpgrade.limerick5.isBought) return true;
    return (Perk.ttBuySingle.isBought && !player.disablePostReality) && (!Pelle.isDisabled("timeTheoremAutobuyer") || PellePerkUpgrade.perkTTS.canBeApplied);
  }

  get hasUnlimitedBulk() {
    return Perk.ttBuyMax.canBeApplied && !player.disablePostReality;
  }

  tick() {
    if (this.hasUnlimitedBulk) TimeTheorems.buyMax(true);
    else TimeTheorems.buyOneOfEach();
  }
}
