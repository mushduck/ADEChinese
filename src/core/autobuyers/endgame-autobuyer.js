import { AutobuyerState } from "./autobuyer";

export class EndgameAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.endgame;
  }

  get name() {
    return `Endgame`;
  }

  get isUnlocked() {
    return EndgameMilestone.autobuyerEndgame.isReached;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get amountCP() {
    return this.data.amountCP;
  }

  get amountDP() {
    return this.data.amountDP;
  }

get increaseWithMult() {
    return this.data.increaseWithMult;
  }

  set increaseWithMult(value) {
    this.data.increaseWithMult = value;
  }

  set amountCP(value) {
    this.data.amountCP = value;
  }

  set amountDP(value) {
    this.data.amountDP = value;
  }

  get time() {
    return this.data.time;
  }

  set time(value) {
    this.data.time = value;
  }

  get xHighestCP() {
    return this.data.xHighestCP;
  }

  get xHighestDP() {
    return this.data.xHighestDP;
  }

  set xHighestCP(value) {
    this.data.xHighestCP = value;
  }

  set xHighestDP(value) {
    this.data.xHighestDP = value;
  }

  get hasAdditionalModes() {
    return EndgameMilestone.autobuyerEndgame.isReached;
  }

  get highestPrevPrestigeCP() {
    return player.records.permanent.maxCP;
  }

  get highestPrevPrestigeDP() {
    return player.records.permanent.maxDP;
  }

  get timeToNextTick() {
    return Math.clampMin(this.time - Time.thisEndgameRealTime.totalSeconds.toNumber(), 0);
  }

  bumpAmount(mult) {
    if (this.isUnlocked && this.increaseWithMult) {
      this.amountCP = this.amount.times(mult);
      this.amountDP = this.amount.times(mult);
    }
  }

  get willEndgame() {
    switch (this.mode) {
      case AUTO_ENDGAME_MODE.AMOUNTCP:
        return gainedCelestialPoints().gte(this.amount);
      case AUTO_ENDGAME_MODE.AMOUNTDP:
        return gainedDoomedParticles().gte(this.amount);
      case AUTO_ENDGAME_MODE.TIME:
        return Time.thisEndgameRealTime.totalSeconds.toNumber() > this.time;
      case AUTO_ENDGAME_MODE.X_HIGHEST_CP:
        return gainedCelestialPoints().gte(this.highestPrevPrestigeCP.times(this.xHighestCP));
      case AUTO_ENDGAME_MODE.X_HIGHEST_DP:
        return gainedDoomedParticles().gte(this.highestPrevPrestigeDP.times(this.xHighestDP));
      default:
        return Time.thisEndgameRealTime.totalSeconds.toNumber() > this.time;
    }
  }

  tick() {
    if (this.willEndgame && isEndgameAvailable()) Endgame.newEndgame();
  }

  reset() {
    if (!EndgameMilestone.autobuyerEndgame.isReached) {
      this.isActive = false;
    }
  }
}
