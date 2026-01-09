import { AutobuyerState } from "./autobuyer";

export class BulkSingularityAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.bulkSingularity;
  }

  get name() {
    return `Bulk Singularity`;
  }

  get isUnlocked() {
    return ExpansionPack.laitelaPack.isBought;
  }

  get lowerBound() {
    return this.data.lowerBound;
  }

  set lowerBound(value) {
    this.data.lowerBound = value;
  }

  get upperBound() {
    return this.data.upperBound;
  }

  set upperBound(value) {
    this.data.upperBound = value;
  }

  get hasLowerBound() {
    return this.data.hasLowerBound;
  }

  set hasLowerBound(value) {
    this.data.hasLowerBound = value;
  }

  get hasUpperBound() {
    return this.data.hasUpperBound;
  }

  set hasUpperBound(value) {
    this.data.hasUpperBound = value;
  }

  get bulk() {
    return 0;
  }

  tick() {
    if (Singularity.timePerCondense.gt(this.upperBound) && this.data.hasUpperBound && player.celestials.laitela.singularityCapIncreases.gt(0)) {
      const bulk = Math.floor(Decimal.log10(Singularity.timePerCondense.div(this.upperBound))) + 1;
      player.celestials.laitela.singularityCapIncreases = Decimal.max(player.celestials.laitela.singularityCapIncreases.sub(bulk), 0);
    }

    if (Singularity.timePerCondense.lt(this.lowerBound) && this.data.hasLowerBound) {
      const bulk = Math.floor(Decimal.log10(Singularity.timePerCondense.div(this.lowerBound).recip())) + 1;
      player.celestials.laitela.singularityCapIncreases = player.celestials.laitela.singularityCapIncreases.add(bulk);
    }
  }
}
