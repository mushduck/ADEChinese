<script>
export default {
  name: "ModernAntimatterGalaxyRow",
  data() {
    return {
      type: GALAXY_TYPE.NORMAL,
      galaxies: {
        normal: new Decimal(),
        replicanti: new Decimal(),
        dilation: new Decimal(),
        free: new Decimal()
      },
      requirement: {
        tier: 1,
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
      hasTutorial: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      return AntimatterDimension(this.requirement.tier).shortDisplayName;
    },
    buttonText() {
      if (this.lockText !== null) return this.lockText;
      const reset = [];
      if (!Achievement(111).isUnlocked ||
        (player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 12) &&
        !(LHC.voidRunning && NullUpgrade.limerick1.isBought))) reset.push("维度");
      if (!Achievement(143).isUnlocked ||
        (player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 20) &&
        !(LHC.voidRunning && NullUpgrade.limerick2.isBought))) reset.push("维度提升");
      return reset.length === 0
        ? `增强计数频率升级的效果`
        : `重置${makeEnumeration(reset)}的数量，增强计数频率升级的效果`;
    },
    sumText() {
      const parts = [Decimal.max(this.galaxies.normal, GalacticPowers.galacticAscension.isUnlocked ? 1 : 0)];
      if (this.galaxies.replicanti.gt(0)) parts.push(this.galaxies.replicanti);
      if (this.galaxies.dilation.gt(0)) parts.push(this.galaxies.dilation);
      if (this.galaxies.free.gt(0)) parts.push(this.galaxies.free);
      let sum;
      if (GalacticPowers.galacticAscension.isUnlocked) sum = parts.map(this.formatGalaxies).join(" × ");
      if (!GalacticPowers.galacticAscension.isUnlocked) sum = parts.map(this.formatGalaxies).join(" + ");
      if (parts.length >= 2) {
        if (GalacticPowers.galacticAscension.isUnlocked) return `${sum} = ${this.formatGalaxies(parts.reduce(Decimal.prodReducer))}`;
        return `${sum} = ${this.formatGalaxies(parts.decimalSum())}`;
      }
      return sum;
    },
    typeName() {
      switch (this.type) {
        case GALAXY_TYPE.NORMAL: return "反物质星系";
        case GALAXY_TYPE.DISTANT: return "遥远星系";
        case GALAXY_TYPE.REMOTE: return "极远星系";
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case GALAXY_TYPE.DISTANT:
          return `${quantifyInt("Galaxy", this.distantStart)} 个星系后星系价格大幅增长`;
        case GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "遥远", function: "二次方", amount: this.distantStart },
            { type: "极远", function: "指数", amount: this.remoteStart }
          ];
          return `星系价格增速: ${scalings.sort((a, b) => a.amount - b.amount)
            .map(scaling => `${scaling.function}增长（超过 ${this.formatGalaxies(scaling.amount)} 个${scaling.type}星系）`)
            .join(", ").capitalize()}`;
        }
      }
      return undefined;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.canBeBought && this.hasTutorial,
        "o-primary-btn--disabled": !this.canBeBought,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      this.type = Galaxy.type;
      this.galaxies.normal.copyFrom(player.galaxies.add(GalaxyGenerator.galaxies));
      this.galaxies.replicanti.copyFrom(Replicanti.galaxies.total);
      this.galaxies.dilation.copyFrom(player.dilation.totalTachyonGalaxies);
      this.galaxies.free.copyFrom(GalacticPower.freeGalaxies);
      const requirement = Galaxy.requirement;
      this.requirement.amount = requirement.amount;
      this.requirement.tier = requirement.tier;
      this.canBeBought = requirement.isSatisfied && Galaxy.canBeBought;
      this.distantStart = EternityChallenge(5).isRunning ? 0 : Galaxy.costScalingStart;
      this.remoteStart = Galaxy.remoteStart;
      this.lockText = Galaxy.lockText;
      this.canBulkBuy = EternityMilestone.autobuyMaxGalaxies.isReached;
      this.creditsClosed = GameEnd.creditsEverClosed;
      if (this.isDoomed) {
        this.scalingText = {
          distant: this.formatGalaxies(this.distantStart),
          remote: this.formatGalaxies(Galaxy.remoteStart),
        };
      }
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.GALAXY);
    },
    buyGalaxy(bulk) {
      if (!this.canBeBought) return;
      manualRequestGalaxyReset(this.canBulkBuy && bulk);
    },
    formatGalaxies(num) {
      return new Decimal(num).gt(1e8) ? format(num, 2) : formatInt(num);
    },
  }
};
</script>

<template>
  <div class="reset-container galaxy">
    <h4>{{ typeName }} ({{ sumText }})</h4>
    <span>需要 {{ formatHybridLarge(requirement.amount, 3) }} {{ dimName }}维度</span>
    <span v-if="hasIncreasedScaling">{{ costScalingText }}</span>
    <button
      :class="classObject"
      @click.exact="buyGalaxy(true)"
      @click.shift.exact="buyGalaxy(false)"
    >
      {{ buttonText }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
</template>
