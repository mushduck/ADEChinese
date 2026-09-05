import { AutobuyerState } from "./autobuyer";

export class SingularityAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.singularity;
  }

  get name() {
    return `奇点`;
  }

  get isUnlocked() {
    return SingularityMilestone.autoCondense.canBeApplied;
  }

  get bulk() {
    return Singularity.singularitiesGained;
  }

  tick() {
    if (DivinityMilestone.hadronEmpowerment.isReached ||
        Currency.darkEnergy.value.gte(Singularity.cap.times(SingularityMilestone.autoCondense.effectValue))) {
      Singularity.perform();
    }
  }
}
