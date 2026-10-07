<script>
export default {
  name: "CelestialBreakInfinityButton",
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
      isAffordable: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-break-celestial-infinity-upgrade-btn": true,
        "o-break-celestial-infinity-upgrade-btn--color-2": true,
        "o-break-celestial-infinity-upgrade-btn--available": this.isUnlocked || this.isAffordable,
        "o-break-celestial-infinity-upgrade-btn--unavailable": !this.isUnlocked && !this.isAffordable,
        "o-break-celestial-infinity-upgrade-btn--unclickable": this.isBroken,
      };
    },
    text() {
      return this.isUnlocked
        ? (this.isBroken ? "已打破天界无限".split("\n") : "打破天界无限".split("\n"))
        : `打破天界无限\n需要: ${formatInt(10000)} 天界无限点数`.split("\n");
    }
  },
  methods: {
    update() {
      this.isBroken = player.endgame.celDimExpansion.isBroken;
      this.isUnlocked = player.endgame.celDimExpansion.isBreakUnlocked;
      this.isAffordable = player.endgame.celDimExpansion.celestialInfinityPoints.gte(10000);
    },
    clicked() {
      if (!this.isUnlocked && this.isAffordable) {
        Currency.celestialInfinityPoints.purchase(10000);
        player.endgame.celDimExpansion.isBreakUnlocked = true;
      }
      if (!this.isBroken && this.isUnlocked) Modal.breakCelestialInfinity.show();
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="clicked"
  >
    <span
        v-for="(line, index) in text"
        :key="index"
      >
        {{ line }} <br>
      </span>
  </button>
</template>

<style scoped>

</style>
