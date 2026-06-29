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
        Multiply Celestial Eternity Points from all sources by {{ formatX(5) }}
        <br>
        Currently: {{ formatX(multiplier, 2, 0) }}
      </div>
      <br>
      Cost: {{ quantify("Celestial Eternity Point", cost, 2, 0) }}
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      Max Cel Eternity Point mult
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}
</style>
