<script>
export default {
  name: "CondenseButton",
  data() {
    return {
      isVisible: false,
      gainedVS: new Decimal(0),
      currentVSRate: new Decimal(0),
      peakVSRate: new Decimal(0),
      peakVSRateVal: new Decimal(0),
      currentVS: new Decimal(0),
      canCondense: false,
      condenseGoal: new Decimal(0),
      hover: false,
      headerTextColored: true,
      creditsClosed: false,
      showVSRate: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-condense-button--unavailable": !this.canCondense,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    },
    // Show VS/min below this threshold, color the VS number above it
    rateThreshold: () => 1e15,
    amountStyle() {
      if (!this.headerTextColored || this.currentVS.lt(this.rateThreshold)) return {
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
      const ratio = this.gainedVS.log10().div(this.currentVS.log10());
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
      this.isVisible = PlayerProgress.condenseUnlocked() || Currency.divineMatter.gte(DC.NUMMAX);
      if (!this.isVisible) return;
      this.canCondense = Currency.divineMatter.gte(DC.NUMMAX);
      this.condenseGoal.copyFrom(DC.NUMMAX);
      this.headerTextColored = player.options.headerTextColored;
      this.creditsClosed = GameEnd.creditsEverClosed;

      const gainedVS = gainedDivineStars();
      this.currentVS.copyFrom(Currency.divineStars);
      this.gainedVS.copyFrom(gainedVS);
      this.currentVSRate.copyFrom(gainedVS.dividedBy(Math.clampMin(0.0005, Time.thisCondenseRealTime.totalMinutes.toNumber())));
      this.peakVSRate.copyFrom(player.records.thisCondense.bestVSmin);
      this.peakVSRateVal.copyFrom(player.records.thisCondense.bestVSminVal);
      this.showVSRate = this.peakVSRate.lte(this.rateThreshold);
    },
    condense() {
      if (!this.canCondense) return;
      resetForDivineStars();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button o-condense-button"
    @click="condense"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Cannot Condense -->
    <template v-if="!canCondense">
      Reach {{ format(condenseGoal, 2, 2) }}
      <br>
      Divine Matter
    </template>

    <!-- Can Condense -->
    <template v-else>
      <div v-if="!showVSRate" />
      <b>
        Condense for
        <span :style="amountStyle">{{ format(gainedVS, 2) }}</span>
        <span v-if="showVSRate"> VS</span>
        <span v-else> Divine {{ pluralize("Star", gainedVS) }}</span>
      </b>
      <template v-if="showVSRate">
        <br>
        Current: {{ format(currentVSRate, 2) }} VS/min
        <br>
        Peak: {{ format(peakVSRate, 2) }} VS/min
        <br>
        at {{ format(peakVSRateVal, 2) }} VS
      </template>
      <div v-else />
    </template>
  </button>
</template>

<style scoped>

</style>
