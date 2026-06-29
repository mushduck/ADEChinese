<script>
export default {
  name: "SupernovaButton",
  data() {
    return {
      isVisible: false,
      gainedNeb: new Decimal(0),
      currentNebRate: new Decimal(0),
      peakNebRate: new Decimal(0),
      peakNebRateVal: new Decimal(0),
      currentNeb: new Decimal(0),
      canSupernova: false,
      supernovaGoal: new Decimal(0),
      hover: false,
      headerTextColored: true,
      creditsClosed: false,
      showNebRate: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-supernova-button--unavailable": !this.canSupernova,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    },
    // Show Neb/min below this threshold, color the Neb number above it
    rateThreshold: () => 1e10,
    amountStyle() {
      if (!this.headerTextColored || this.currentNeb.lt(this.rateThreshold)) return {
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
      const ratio = this.gainedNeb.log10().div(this.currentNeb.log10());
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
      this.isVisible = PlayerProgress.supernovaUnlocked() || Currency.divineStars.gte(DC.NUMMAX);
      if (!this.isVisible) return;
      this.canSupernova = Currency.divineStars.gte(DC.NUMMAX);
      this.supernovaGoal.copyFrom(DC.NUMMAX);
      this.headerTextColored = player.options.headerTextColored;
      this.creditsClosed = GameEnd.creditsEverClosed;

      const gainedNeb = gainedNebulae();
      this.currentNeb.copyFrom(Currency.nebulae);
      this.gainedNeb.copyFrom(gainedNeb);
      this.currentNebRate.copyFrom(gainedNeb.dividedBy(Math.clampMin(0.0005, Time.thisSupernovaRealTime.totalMinutes.toNumber())));
      this.peakNebRate.copyFrom(player.records.thisSupernova.bestNebmin);
      this.peakNebRateVal.copyFrom(player.records.thisSupernova.bestNebminVal);
      this.showNebRate = this.peakNebRate.lte(this.rateThreshold);
    },
    supernova() {
      if (!this.canSupernova) return;
      supernovaResetRequest();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button o-supernova-button"
    @click="supernova"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Cannot Supernova -->
    <template v-if="!canSupernova">
      Reach {{ format(supernovaGoal, 2, 2) }}
      <br>
      Divine Stars
    </template>

    <!-- Can Supernova -->
    <template v-else>
      <div v-if="!showNebRate" />
      <b>
        Supernova for
        <span :style="amountStyle">{{ format(gainedNeb, 2) }}</span>
        <span v-if="showNebRate"> Neb</span>
        <span v-else> {{ pluralize("Nebula", gainedNeb) }}</span>
      </b>
      <template v-if="showNebRate">
        <br>
        Current: {{ format(currentNebRate, 2) }} Neb/min
        <br>
        Peak: {{ format(peakNebRate, 2) }} Neb/min
        <br>
        at {{ format(peakNebRateVal, 2) }} Neb
      </template>
      <div v-else />
    </template>
  </button>
</template>

<style scoped>

</style>
