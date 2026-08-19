<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PowerCoreButton",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isAffordable: false,
      multiplier: 0,
      cost: 0
    };
  },
  computed: {
    upgrade() {
      return LHC.powerCores;
    },
    classObject() {
      return {
        "o-power-core-upgrade": true,
        "o-power-core-upgrade--available": this.isAffordable,
        "o-power-core-upgrade--unavailable": !this.isAffordable
      };
    },
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.multiplier = upgrade.effectValue;
      this.cost = upgrade.cost;
      this.isAffordable = upgrade.isAffordable;
    },
    purchaseUpgrade() {
      this.upgrade.purchase();
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group l-margin-top l-power-core-box">
    <button
      :class="classObject"
      @click="purchaseUpgrade"
    >
      <div>
        创造一个能源核心
        <br>
        当前加速器功率倍率：{{ formatX(multiplier, 2, 0) }}
      </div>
      <br>
      需要：{{ quantify("总强子数量", cost, 2, 0) }}
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      购买最大能源核心
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}

.l-power-core-box {
  align-items: center;
  width: 20rem;
  margin-left: 37.9rem;
}
</style>
