import { IntervaledAutobuyerState } from "./autobuyer";

export class DarkMatterDimensionAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.darkMatterDims;
  }

  get name() {
    return `Dark Matter Dimensions`;
  }

  get isUnlocked() {
    return SingularityMilestone.darkDimensionAutobuyers.canBeApplied;
  }

  get interval() {
    return SingularityMilestone.darkAutobuyerSpeed.effectValue * 1000;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    super.tick();
    Laitela.maxAllDMDimensions(SingularityMilestone.darkDimensionAutobuyers.effectValue + SingularityMilestone.darkDimAuto5to8.effectValue);
  }
}
