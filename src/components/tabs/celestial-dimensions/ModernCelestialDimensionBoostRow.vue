<script>
export default {
  name: "ModernCelestialDimensionBoostRow",
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
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "o-primary-btn--disabled": !this.isBuyable,
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
      this.creditsClosed = GameEnd.creditsEverClosed;
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
  <div class="reset-container dimboost">
    <h4>Celestial Dimension Boost ({{ boostCountText }})</h4>
    <span>Requires: {{ formatHybridLarge(requirement.amount, 3) }} Cel Matter</span>
    <button
      :class="classObject"
      @click.exact="celestialDimensionBoost(true)"
      @click.shift.exact="celestialDimensionBoost(false)"
    >
      {{ unlockedByBoost }}
    </button>
  </div>
</template>
