<script>
export default {
  name: "CelestialCrunchButton",
  data() {
    return {
      isVisible: false,
      gainedCIP: new Decimal(0),
      currentCIPRate: new Decimal(0),
      peakCIPRate: new Decimal(0),
      peakCIPRateVal: new Decimal(0),
      currentCIP: new Decimal(0),
      canCrunch: false,
      infinityGoal: new Decimal(0),
      hover: false,
      headerTextColored: true,
      creditsClosed: false,
      showCIPRate: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-celestial-infinity-button--unavailable": !this.canCrunch,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    },
    // Show IP/min below this threshold, color the IP number above it
    rateThreshold: () => 1e15,
    amountStyle() {
      if (!this.headerTextColored || this.currentCIP.lt(this.rateThreshold)) return {
        "transition-duration": "0s"
      };
      if (this.hover) return {
        color: "black",
        "transition-duration": "0.2s"
      };

      // Dynamically generate red-text-green based on the CSS entry for text color, returning a raw 6-digit hex color
      // code. stepRGB is an array specifying the three RGB codes, which are then interpolated between in order to
      // generate the final color; only ratios between 0.9-1.1 give a color gradient
      const textHexCode = getComputedStyle(document.body).getPropertyValue("--color-text").split("#")[1];
      const stepRGB = [
        [255, 0, 0],
        [
          parseInt(textHexCode.substring(0, 2), 16),
          parseInt(textHexCode.substring(2, 4), 16),
          parseInt(textHexCode.substring(4), 16)
        ],
        [0, 255, 0]
      ];
      const ratio = this.gainedCIP.log10().div(this.currentCIP.log10());
      const interFn = index => {
        if (ratio.lt(0.9)) return stepRGB[0][index];
        if (ratio.lt(1)) {
          const r = (ratio.sub(0.9)).times(10).toNumber();
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio.lt(1.1)) {
          const r = (ratio.sub(1)).times(10).toNumber();
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        color: `rgb(${rgb.join(",")})`,
        "transition-duration": "0.2s"
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.endgame.celDimExpansion.isBroken;
      if (!this.isVisible) return;
      this.canCrunch = Currency.celestialMatter.gte(DC.NUMMAX);
      this.infinityGoal.copyFrom(DC.NUMMAX);
      this.headerTextColored = player.options.headerTextColored;
      this.creditsClosed = GameEnd.creditsEverClosed;

      const gainedCIP = gainedCelestialInfinityPoints();
      this.currentCIP.copyFrom(Currency.celestialInfinityPoints);
      this.gainedCIP.copyFrom(gainedCIP);
      this.currentCIPRate.copyFrom(gainedCIP.dividedBy(Math.clampMin(0.0005, Time.thisCelestialInfinityRealTime.totalMinutes.toNumber())));
      this.peakCIPRate.copyFrom(player.records.thisCelestialInfinity.bestCIPmin);
      this.peakCIPRateVal.copyFrom(player.records.thisCelestialInfinity.bestCIPminVal);
      this.showCIPRate = this.peakCIPRate.lte(this.rateThreshold);
    },
    crunch() {
      if (Currency.celestialMatter.lt(DC.NUMMAX)) return;
      manualCelestialCrunchResetRequest();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button o-celestial-infinity-button"
    @click="crunch"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Cannot Crunch -->
    <template v-if="!canCrunch">
      Reach {{ format(infinityGoal, 2, 2) }}
      <br>
      Celestial Matter
    </template>

    <!-- Can Crunch -->
    <template v-else>
      <div v-if="!showCIPRate" />
      <b>
        <span v-if="showCIPRate">Cel Crunch for </span>
        <span v-else>Celestial Crunch for </span>
        <span :style="amountStyle">{{ format(gainedCIP, 2) }}</span>
        <span v-if="showCIPRate"> CIP</span>
        <span v-else> Celestial {{ pluralize("Point", gainedCIP) }} of Infinity</span>
      </b>
      <template v-if="showCIPRate">
        <br>
        Current: {{ format(currentCIPRate, 2) }} CIP/min
        <br>
        Peak: {{ format(peakCIPRate, 2) }} CIP/min
        <br>
        at {{ format(peakCIPRateVal, 2) }} CIP
      </template>
      <div v-else />
    </template>
  </button>
</template>

<style scoped>

</style>
