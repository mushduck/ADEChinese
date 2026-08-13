<script>
export default {
  name: "UnlockInfinityDimButton",
  data() {
    return {
      isVisible: false,
      canUnlock: false,
      hasIPUnlock: true,
      amRequirement: new Decimal(0),
      ipRequirement: 0,
    };
  },
  computed: {
    text() {
      const dimensionText = `${this.hasIPUnlock ? "一种新的维度" : "下一个无限维度"}`;
      if (this.canUnlock) {
        return `解锁 ${dimensionText}`;
      }
      const amDisplay = format(this.amRequirement);
      const ipDisplay = format(this.ipRequirement);
      if (this.hasIPUnlock) {
        return `达到 ${ipDisplay} 无限点数和 ${amDisplay} 反物质以解锁 ${dimensionText}`;
      }
      return `达到 ${amDisplay} 反物质以解锁 ${dimensionText}`;
    },
    buttonClassObject() {
      return {
        "o-prestige-button": true,
        "o-infinity-button": true,
        "o-infinity-button--unavailable": !this.canUnlock
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.break && !InfinityDimension(8).isUnlocked && !Player.canEternity &&
        !EternityMilestone.autoUnlockID.isReached;
      if (!this.isVisible) return;
      const nextDimension = InfinityDimensions.next();
      this.canUnlock = nextDimension.canUnlock;
      this.hasIPUnlock = nextDimension.hasIPUnlock;
      this.amRequirement = nextDimension.amRequirement;
      this.ipRequirement = nextDimension.ipRequirement;
    },
    tryUnlockNextInfinityDimension() {
      InfinityDimensions.unlockNext();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    @click="tryUnlockNextInfinityDimension"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
