<script>
import CelestialDimensionRow from "./ModernCelestialDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernCelestialDimensionTab",
  components: {
    PrimaryButton,
    CelestialDimensionRow
  },
  data() {
    return {
      celestialMatter: new Decimal(0),
      dimMultiplier: new Decimal(0),
      matterPerSecond: new Decimal(0),
      incomeType: "",
      conversionExponent: 0,
      nextDimCapIncrease: 0,
      totalDimCap: 0,
      creditsClosed: false,
      showLockedDimCostNote: true,
    };
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !CelestialDimension(8).isUnlocked;
      this.celestialMatter.copyFrom(Currency.celestialMatter);
      this.conversionExponent = CelestialDimensions.conversionExponent;
      this.dimMultiplier.copyFrom(this.celestialMatter.pow(this.conversionExponent).max(1));
      this.matterPerSecond.copyFrom(CelestialDimension(1).productionPerSecond);
      this.incomeType = "Celestial Matter";
      this.totalDimCap = CelestialDimensions.totalDimCap;
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    maxAll() {
      CelestialDimensions.buyMax();
    },
    toggleCelestialMatterMultiplier() {
      toggleCelestialMatter();
    }
  }
};
</script>

<template>
  <div class="l-celestial-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        Max all
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="toggleCelestialMatterMultiplier"
      >
        Toggle Celestial Matter
      </PrimaryButton>
    </div>
    <div>
      <p>
        You have
        <span class="c-celestial-dim-description__accent">{{ format(celestialMatter, 2, 1) }}</span>
        Celestial Matter,
        <br>
        <span>
          increased by
          <span class="c-celestial-dim-description__accent">{{ formatPow(conversionExponent, 2, 3) }}</span>
        </span>
        to a
        <span class="c-celestial-dim-description__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        multiplier to
        <span>Game Speed.</span>
      </p>
    </div>
    <div>
      All Celestial Dimensions can be purchased until {{ format(totalDimCap, 2, 2) }} Celestial Points.
    </div>
    <div>You are getting {{ format(matterPerSecond, 2, 0) }} {{ incomeType }} per second.</div>
    <div class="l-dimensions-container">
      <CelestialDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div v-if="showLockedDimCostNote">
      Hold shift to see the Celestial Point cost for locked Celestial Dimensions.
    </div>
  </div>
</template>
