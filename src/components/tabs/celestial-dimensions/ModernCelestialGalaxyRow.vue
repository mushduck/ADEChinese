<script>
export default {
  name: "ModernCelestialGalaxyRow",
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
      if (true) reset.push("天界维度");
      if (true) reset.push("天界维度提升");
      return reset.length === 0
        ? `增强天界计数频率升级的效果`
        : `重置${makeEnumeration(reset)}的数量，增强天界计数频率升级的效果`;
    },
    sumText() {
      const parts = [Decimal.max(this.galaxies.celestial, 0)];
      const sum = parts.map(this.formatCelestialGalaxies).join(" + ");
      return sum;
    },
    typeName() {
      switch (this.type) {
        case GALAXY_TYPE.NORMAL: return "天界星系";
        case GALAXY_TYPE.DISTANT: return "遥远天界星系";
        case GALAXY_TYPE.REMOTE: return "极远天界星系";
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== CELESTIAL_GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case CELESTIAL_GALAXY_TYPE.DISTANT:
          return `${quantifyHybridLarge("Galaxy", this.distantStart)} 个天界星系后天界星系价格大幅增长`;
        case CELESTIAL_GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "遥远", function: "二次方", amount: this.distantStart },
            { type: "极远", function: "指数", amount: this.remoteStart }
          ];
          return `天界星系价格增速: ${scalings.sort((a, b) => a.amount - b.amount)
            .map(scaling => `${scaling.function}增长（超过 ${this.formatCelestialGalaxies(scaling.amount)} 个${scaling.type}天界星系)`)
            .join(", ").capitalize()}`;
        }
      }
      return undefined;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "o-primary-btn--disabled": !this.canBeBought,
        "o-pelle-disabled-pointer": this.creditsClosed
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
      if (this.isDoomed) {
        this.scalingText = {
          distant: this.formatCelestialGalaxies(this.distantStart),
          remote: this.formatCelestialGalaxies(CelestialGalaxy.remoteStart),
        };
      }
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
  <div class="reset-container galaxy">
    <h4>{{ typeName }} ({{ sumText }})</h4>
    <span>需要 {{ formatHybridLarge(requirement.amount, 3) }} 天界物质</span>
    <span v-if="hasIncreasedScaling">{{ costScalingText }}</span>
    <button
      :class="classObject"
      @click.exact="buyCelestialGalaxy(true)"
      @click.shift.exact="buyCelestialGalaxy(false)"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
