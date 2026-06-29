<script>
export default {
  name: "CelestialTickspeedRow",
  data() {
    return {
      purchasedCelestialTickspeed: new Decimal(0),
      isVisible: false,
      mult: new Decimal(0),
      cost: new Decimal(0),
      isAffordable: false,
      celestialTickspeed: new Decimal(0),
      celestialGalaxyCount: new Decimal(0),
    };
  },
  computed: {
    classObject() {
      return {
        "l-celestial-tickspeed-container": true,
        "l-celestial-tickspeed-container--hidden": !this.isVisible
      };
    },
    multiplierDisplay() {
      const tickmult = this.mult;
      return `${formatX(tickmult, 2, 3)} faster / upgrade.`;
    },
    celestialTickspeedDisplay() {
      return `Celestial Tickspeed: ${format(this.celestialTickspeed, 2, 3)} / sec`;
    },
    upgradeCount() {
      const purchased = this.purchasedCelestialTickspeed;
      return quantifyHybridLarge("Purchased Upgrade", purchased);
    }
  },
  methods: {
    update() {
      this.purchasedCelestialTickspeed.copyFrom(player.endgame.celDimExpansion.totalTickBought);
      this.isVisible = CelestialTickspeed.isUnlocked;
      if (!this.isVisible) return;
      this.mult.copyFrom(CelestialTickspeed.multiplier);
      this.cost.copyFrom(CelestialTickspeed.cost);
      this.isAffordable = CelestialTickspeed.isAvailableForPurchase && CelestialTickspeed.isAffordable;
      this.celestialTickspeed.copyFrom(CelestialTickspeed.baseValue);
      this.celestialGalaxyCount.copyFrom(player.endgame.celDimExpansion.galaxies);
    },
    buttonClass() {
      return {
        "o-primary-btn": true,
        "tickspeed-btn": true,
        "o-primary-btn--disabled": !this.isAffordable,
      };
    },
  }
};
</script>

<template>
  <div :class="classObject">
    <div class="celestial-tickspeed-buttons">
      <button
        v-tooltip="upgradeCount"
        :class="buttonClass()"
        onclick="buyCelestialTickSpeed()"
      >
        <span>
          Celestial Tickspeed Cost: {{ format(cost) }}
        </span>
      </button>
      <button
        class="o-primary-btn celestial-tickspeed-max-btn"
        :class="{ 'o-primary-btn--disabled': !isAffordable }"
        onclick="buyMaxCelestialTickSpeed()"
      >
        Buy Max
      </button>
    </div>
    <div class="celestial-tickspeed-labels">
      {{ celestialTickspeedDisplay }} | {{ multiplierDisplay }}
    </div>
  </div>
</template>

<style scoped>
.o-primary-btn {
  position: relative;
  vertical-align: middle;
}

.celestial-tickspeed-btn {
  position: relative;
  width: 30rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.celestial-tickspeed-labels {
  color: var(--color-text);
  padding: 0.25rem;
}

.l-celestial-tickspeed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
}

.l-celestial-tickspeed-container--hidden {
  visibility: hidden;
}

.celestial-tickspeed-max-btn {
  margin-left: 0.5rem;
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem;
}
</style>
