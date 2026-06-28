<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicCelestialDimensionBoostRow",
  components: {
    PrimaryButton
  },
  data() {
    return {
      requirement: {
        amount: new Decimal(0)
      },
      isBuyable: false,
      purchasedBoosts: new Decimal(0),
      lockText: null,
      unlockedByBoost: null,
      creditsClosed: false,
      requirementText: null,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    boostCountText() {
      if (this.requirementText) return this.requirementText;
      const parts = [this.purchasedBoosts];
      const sum = parts.map(formatDimboostParts).join(" + ");
      return sum;
    },
    classObject() {
      return {
        "o-primary-btn--dimboost l-dim-row__prestige-button": true,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      const requirement = CelestialDimBoost.requirement;
      this.requirement.amount.copyFrom(requirement.amount);
      this.isBuyable = requirement.isSatisfied && CelestialDimBoost.canBeBought;
      this.purchasedBoosts.copyFrom(CelestialDimBoost.purchasedBoosts);
      this.lockText = CelestialDimBoost.lockText;
      this.unlockedByBoost = CelestialDimBoost.unlockedByBoost;
      this.creditsClosed = GameEnd.creditsClosed;
      if (this.isDoomed) this.requirementText = formatHybridLarge(this.purchasedBoosts, 3);
    },
    celestialDimensionBoost(bulk) {
      if (!CelestialDimBoost.requirement.isSatisfied || !CelestialDimBoost.canBeBought) return;
      manualRequestCelestialDimensionBoost(bulk);
    }
  }
};
</script>

<template>
  <div class="c-dimension-row c-antimatter-dim-row c-antimatter-prestige-row">
    <div class="l-dim-row__prestige-text c-dim-row__label c-dim-row__label--amount">
      Celestial Dimension Boost ({{ boostCountText }}):
      requires {{ formatHybridLarge(requirement.amount, 3) }} Celestial Matter
    </div>
    <PrimaryButton
      :enabled="isBuyable"
      :class="classObject"
      @click.exact="celestialDimensionBoost(true)"
      @click.shift.exact="celestialDimensionBoost(false)"
    >
      {{ unlockedByBoost }}
    </PrimaryButton>
  </div>
</template>

<style scoped>
.o-primary-btn--dimboost {
  width: 22rem;
  height: 5.5rem;
  position: relative;
  font-size: 0.9rem;
}
</style>
