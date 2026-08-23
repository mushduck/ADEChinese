<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "CIPMultiplierButton",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isAffordable: false,
      multiplier: new Decimal(),
      cost: new Decimal()
    };
  },
  computed: {
    upgrade() {
      return CelestialInfinityUpgrade.cipMult;
    },
    classObject() {
      return {
        "o-celestial-infinity-upgrade": true,
        "o-celestial-infinity-upgrade--available": this.isAffordable,
        "o-celestial-infinity-upgrade--unavailable": !this.isAffordable
      };
    },
  },
  watch: {
    isAutobuyerActive(newValue) {
      Autobuyer.cipMult.isActive = newValue;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isAutoUnlocked = Autobuyer.cipMult.isUnlocked;
      this.isAutobuyerActive = Autobuyer.cipMult.isActive;
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
        将所有来源的天界无限点数 {{ formatX(2) }}
        <br>
        当前: {{ formatX(multiplier, 2, 0) }}
      </div>
      <br>
      价格: {{ quantify("天界无限点数", cost, 2, 0) }}
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      购买最大倍增升级
    </PrimaryButton>
    <PrimaryToggleButton
      v-if="isAutoUnlocked"
      v-model="isAutobuyerActive"
      label="自动购买倍增升级"
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
    />
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}
</style>
