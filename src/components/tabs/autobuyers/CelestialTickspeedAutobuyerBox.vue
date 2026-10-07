<script>
import AutobuyerBox from "./AutobuyerBox";

export default {
  name: "CelestialTickspeedAutobuyerBox",
  components: {
    AutobuyerBox
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE,
      isUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.celestialTickspeed,
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "购买单个";
        case AUTOBUYER_MODE.BUY_MAX: return "购买最大数量";
      }
      throw "Unknown Celestial Tickspeed autobuyer mode";
    }
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
      this.isUnlocked = this.autobuyer.isUnlocked;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="天界计数频率自动提升"
    show-interval
  >
    <template #toggleSlot>
      <button
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
    </template>
  </AutobuyerBox>
</template>

<style scoped>

</style>
