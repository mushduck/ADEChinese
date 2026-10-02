<script>
export default {
  name: "EndgameButton",
  data() {
    return {
      canEndgame: false,
      showPelleGlow: false,
      gainedCP: 0,
      gainedDP: 0,
    };
  },
  computed: {
    formatCPGain() {
      return `获得天界点数：${format(this.gainedCP, 2)}`;
    },
    formatDPGain() {
      return `获得毁灭粒子：${format(this.gainedDP, 2)}`;
    },
    classObject() {
      return {
        "c-endgame-button--unlocked": this.canEndgame,
        "c-endgame-button--locked": !this.canEndgame,
        "c-endgame-button--special": this.showPelleGlow,
      };
    }
  },
  methods: {
    update() {
      this.canEndgame = isEndgameAvailable();
      this.showPelleGlow = true;
      if (!this.canEndgame) {
        this.gainedCP = 0;
        this.gainedDP = 0;
        return;
      }
      this.gainedCP = gainedCelestialPoints();
      this.gainedDP = gainedDoomedParticles();
    },
    handleClick() {
      if (this.canEndgame) {
        Endgame.newEndgame();
      }
    }
  }
};
</script>

<template>
  <div class="l-endgame-button">
    <button
      class="c-endgame-button infotooltip"
      :class="classObject"
      @click="handleClick"
    >
      <div class="l-endgame-button__contents">
        <template v-if="canEndgame">
          <div class="c-endgame-button__header">
            进行一次终局
          </div>
          <div>{{ formatCPGain }}</div>
          <div>{{ formatDPGain }}</div>
        </template>
        <template v-else>
          <div>达到 {{ format("1e9000000000000000") }} 反物质以进行终局</div>
        </template>
        <div
          v-if="canEndgame"
          class="infotooltiptext"
        >
          <div>终焉之末，新生之始……</div>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>

</style>
