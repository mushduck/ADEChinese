import { IntervaledAutobuyerState } from "./autobuyer";

export class DarkMatterDimensionAscensionAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.ascension;
  }

  get name() {
    return `Dark Matter Dimension Ascension`;
  }

  get isUnlocked() {
    return SingularityMilestone.ascensionAutobuyers.canBeApplied;
  }

  get interval() {
    return SingularityMilestone.darkAutobuyerSpeed.effectValue * 1000;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    super.tick();
    for (let i = 1; i <= SingularityMilestone.ascensionAutobuyers.effectValue + SingularityMilestone.darkDimAscension5to8.effectValue; i++) {
      DarkMatterDimension(i).ascend();
    }
  }
}
