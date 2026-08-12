<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "CEPMultiplierButton",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isAffordable: false,
      multiplier: new Decimal(),
      cost: new Decimal()
    };
  },
  computed: {
    upgrade() {
      return CelestialEternityUpgrade.cepMult;
    },
    classObject() {
      return {
        "o-celestial-eternity-upgrade": true,
        "o-celestial-eternity-upgrade--available": this.isAffordable,
        "o-celestial-eternity-upgrade--unavailable": !this.isAffordable
      };
    },
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.multiplier.copyFrom(upgrade.effectValue);
      this.cost.copyFrom(upgrade.cost);
      this.isAffordable = upgrade.isAffordable;
    },
    purchaseUpgrade() {
      this.upgrade.purchase();
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group l-margin-top">
    <button
      :class="classObject"
      @click="purchaseUpgrade"
    >
      <div>
        将所有来源的天界永恒点数 {{ formatX(5) }}
        <br>
        当前: {{ formatX(multiplier, 2, 0) }}
      </div>
      <br>
      价格: {{ quantify("Celestial Eternity Point", cost, 2, 0) }}
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      购买最大倍增升级
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}
</style>
