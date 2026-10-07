<script>
export default {
  name: "RealityAmplifyButton",
  data: () => ({
    isDoomed: false,
    isVisible: false,
    isDisabled: false,
    isActive: false,
    ratio: 1,
    canAmplify: false,
  }),
  computed: {
    tooltip() {
      if (this.isDoomed) return "你无法扩增已被毁灭的现实";
      if (this.isDisabled) return "你无法扩增天神的现实";
      if (!this.canAmplify) {
        return "储存更多现实时间或更快现实以扩增";
      }
      return null;
    },
    buttonClass() {
      return {
        "l-reality-amplify-button": true,
        "l-reality-amplify-button--clickable": !this.isDoomed && this.canAmplify,
        "o-enslaved-mechanic-button--storing-time": this.isActive,
      };
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.isVisible = Enslaved.isUnlocked;
      this.isDisabled = isInCelestialReality();
      this.isActive = Enslaved.boostReality;
      this.ratio = Enslaved.realityBoostRatio;
      this.canAmplify = Enslaved.canAmplify;
    },
    toggleActive() {
      if (!this.canAmplify) return;
      Enslaved.boostReality = !Enslaved.boostReality;
    }
  }
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClass"
    :ach-tooltip="tooltip"
    @click="toggleActive"
  >
    <div v-if="isDoomed">
      你无法扩增已被毁灭的现实。
    </div>
    <div v-else-if="canAmplify">
      <span v-if="isActive">将被扩增：</span>
      <span v-else>扩增本次现实：</span>
      <br>
      所有奖励 ×{{ formatInt(ratio) }}
    </div>
    <div v-else>
      储存的现实时间不足，无法进行现实扩增。
    </div>
  </button>
</template>

<style scoped>

</style>
