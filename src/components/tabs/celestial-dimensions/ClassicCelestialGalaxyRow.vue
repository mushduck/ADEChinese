<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicCelestialGalaxyRow",
  components: {
    PrimaryButton
  },
  data() {
    return {
      type: CELESTIAL_GALAXY_TYPE.NORMAL,
      galaxies: {
        celestial: new Decimal()
      },
      requirement: {
        amount: 0
      },
      canBeBought: false,
      distantStart: 0,
      remoteStart: 0,
      lockText: null,
      canBulkBuy: false,
      creditsClosed: false,
      scalingText: {
        distant: null,
        remote: null,
      },
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    buttonText() {
      if (this.lockText !== null) return this.lockText;
      const reset = [];
      if (true) reset.push("Celestial Dimensions");
      if (true) reset.push("Celestial Dimension Boosts");
      return reset.length === 0
        ? `Increase the power of Celestial Tickspeed upgrades`
        : `Reset your ${makeEnumeration(reset)} to increase the power of Celestial Tickspeed upgrades`;
    },
    sumText() {
      const parts = [Decimal.max(this.galaxies.celestial, 0)];
      const sum = parts.map(this.formatCelestialGalaxies).join(" + ");
      return sum;
    },
    typeName() {
      switch (this.type) {
        case CELESTIAL_GALAXY_TYPE.NORMAL: return "Celestial Galaxies";
        case CELESTIAL_GALAXY_TYPE.DISTANT: return "Distant Celestial Galaxies";
        case CELESTIAL_GALAXY_TYPE.REMOTE: return "Remote Celestial Galaxies";
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== CELESTIAL_GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case CELESTIAL_GALAXY_TYPE.DISTANT:
          return `Each Celestial Galaxy is more expensive past ${quantifyInt("Celestial Galaxy", this.distantStart)}`;
        case CELESTIAL_GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "distant", function: "quadratic", amount: this.distantStart },
            { type: "remote", function: "exponential", amount: this.remoteStart }
          ];
          return `Increased Celestial Galaxy cost scaling: ${scalings.sort((a, b) => a.amount - b.amount)
            .map(scaling => `${scaling.function} scaling past ${this.formatCelestialGalaxies(scaling.amount)} (${scaling.type})`)
            .join(", ").capitalize()}`;
        }
      }
      return undefined;
    },
    classObject() {
      return {
        "o-primary-btn--galaxy l-dim-row__prestige-button": true,
        "o-pelle-disabled-pointer": this.creditsClosed,
      };
    }
  },
  methods: {
    update() {
      this.type = CelestialGalaxy.type;
      this.galaxies.celestial.copyFrom(player.endgame.celDimExpansion.galaxies);
      const requirement = CelestialGalaxy.requirement;
      this.requirement.amount = requirement.amount;
      this.canBeBought = requirement.isSatisfied && CelestialGalaxy.canBeBought;
      this.distantStart = CelestialGalaxy.costScalingStart;
      this.remoteStart = CelestialGalaxy.remoteStart;
      this.lockText = CelestialGalaxy.lockText;
      this.canBulkBuy = false;
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    buyCelestialGalaxy(bulk) {
      if (!this.canBeBought) return;
      manualRequestCelestialGalaxyReset(this.canBulkBuy && bulk);
    },
    formatCelestialGalaxies(num) {
      return new Decimal(num).gt(1e8) ? format(num, 2) : formatInt(num);
    },
  }
};
</script>

<template>
  <div class="c-dimension-row c-antimatter-dim-row c-antimatter-prestige-row">
    <div
      class="l-dim-row__prestige-text c-dim-row__label c-dim-row__label--amount l-text-wrapper"
    >
      {{ typeName }} ({{ sumText }}):
      requires {{ formatHybridLarge(requirement.amount, 3) }} Celestial Matter
      <div class="l-scaling-text-wrapper">
        {{ hasIncreasedScaling ? costScalingText : "" }}
      </div>
    </div>
    <PrimaryButton
      :enabled="canBeBought"
      :class="classObject"
      @click.exact="buyCelestialGalaxy(true)"
      @click.shift.exact="buyCelestialGalaxy(false)"
    >
      {{ buttonText }}
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-text-wrapper {
  height: 6rem;
}

.l-scaling-text-wrapper {
  height: 2rem;
}

.o-primary-btn--galaxy {
  width: 22rem;
  height: 5.5rem;
  position: relative;
  font-size: 0.9rem;
}
</style>
