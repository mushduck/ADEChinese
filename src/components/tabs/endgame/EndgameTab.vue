<script>
import ResetEndgameButton from "./ResetEndgameButton";
export default {
  name: "EndgameTab",
  components: {
    ResetEndgameButton
  },
  data() {
    return {
      stage: "",
      chapter: 0,
      percentage: 0
    };
  },
  methods: {
    update() {
      this.stage = false ? "Celestial Plus" : "Endgame";
      if (this.stage === "Endgame") {
        if (false) this.chapter = 3;
        else if (Alpha.isUnlocked) this.chapter = 2;
        else this.chapter = 1;
      }
      if (this.stage === "Endgame" && this.chapter === 1) {
        this.percentage = Math.max(this.percentage, player.reality.imaginaryMachines.max(1).log10().pow(0.5).div(
          DC.NUMMAX.log10().pow(0.5)).div(2).min(0.5).add(
          player.endgame.doomedParticles.max(1).log10().pow(0.5).div(20).min(0.5)).toNumber());
      }
      if (this.stage === "Endgame" && this.chapter === 2) {
        this.percentage = Math.max(this.percentage, new Decimal(player.celestials.alpha.stage).div(84).min(1/3).add(
          player.endgame.celDimExpansion.celestialInfinityPoints.max(1).log10().pow(0.5).div(
          DC.NUMMAX.log10().pow(0.5)).div(3).min(1/3)).add(
          player.endgame.celDimExpansion.celestialEternityPoints.max(1).log10().pow(0.5).div(
          Decimal.pow(4000, 0.5)).div(3).min(1/3)).toNumber());
      }
    }
  }
};
</script>

<template>
  <div class="l-endgame-tab-container">
    <div class="endgame-text">
      <br>
      <div>
      <b>
        Endgame
      </b>
      </div>
      <br>
      <div>
        You are currently playing Antimatter Dimensions: The {{ stage }} Update, Chapter {{ chapter }}.
        <br>
        Percentage to next chapter: {{ formatPercents(percentage, 2, 2) }}
      </div>
    </div>
    <br>
    <div class="l-endgame-button-column">
      <div>
        <ResetEndgameButton/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.endgame-text {
  font-size: 2rem;
  color: var(--color-endgame);
}

.l-endgame-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
