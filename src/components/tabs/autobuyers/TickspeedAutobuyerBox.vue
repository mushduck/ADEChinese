<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";

export default {
  name: "TickspeedAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE,
      isUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.tickspeed,
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "购买单个";
        case AUTOBUYER_MODE.BUY_MAX: return "购买最大数量";
      }
      throw "Unknown tickspeed autobuyer mode";
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
    name="计数频率自动提升"
    show-interval
  >
    <template #intervalSlot>
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template #toggleSlot>
      <button
        v-if="isUnlocked"
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
      <button
        v-else
        class="o-autobuyer-btn o-autobuyer-btn--unavailable"
      >
        完成挑战以更改工作模式
      </button>
    </template>
  </AutobuyerBox>
</template>

<style scoped>

</style>
