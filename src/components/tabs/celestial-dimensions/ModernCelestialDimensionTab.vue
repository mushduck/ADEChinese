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
      unnerfedCelestialMatter: new Decimal(0),
      dimMultiplier: new Decimal(0),
      matterPerSecond: new Decimal(0),
      incomeType: "",
      conversionExponent: 0,
      nextDimCapIncrease: 0,
      totalDimCap: new Decimal(0),
      creditsClosed: false,
      showLockedDimCostNote: true,
      softcapPow: 0,
      softcap: new Decimal(0),
      unstable: false,
      isEffectActive: false,
    };
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !CelestialDimension(8).isUnlocked;
      this.celestialMatter.copyFrom(Currency.celestialMatter);
      this.unnerfedCelestialMatter.copyFrom(Currency.unnerfedCelestialMatter);
      this.conversionExponent = CelestialDimensions.conversionExponent;
      this.dimMultiplier.copyFrom(this.celestialMatter.pow(this.conversionExponent).max(1));
      this.matterPerSecond.copyFrom(CelestialDimension(1).productionPerSecond);
      this.incomeType = "Celestial Matter";
      this.totalDimCap.copyFrom(CelestialDimensions.totalDimCap);
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.softcapPow = CelestialDimensions.softcapPow;
      this.softcap.copyFrom(CelestialDimensions.SOFTCAP);
      this.unstable = this.celestialMatter.gte(this.softcap);
      this.isEffectActive = player.endgame.celestialMatterMultiplier.isActive;
    },
    maxAll() {
      CelestialDimensions.buyMax();
    },
    toggleCelestialMatterMultiplier() {
      toggleCelestialMatter();
    },
    instabilityClassObject() {
      return {
        "c-celestial-dim-description__accent": !this.unstable,
        "c-celestial-dim-description__accent-unstable": this.unstable,
      };
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
        <span :class="instabilityClassObject()">{{ format(celestialMatter, 2, 1) }}</span>
        <span v-if="unstable"> Unstable</span> Celestial Matter,
        <br>
        <span>
          increased by
          <span :class="instabilityClassObject()">{{ formatPow(conversionExponent, 2, 3) }}</span>
        </span>
        to a
        <span :class="instabilityClassObject()">
          {{ formatX(dimMultiplier, 2, 1) }}<span v-if="!isEffectActive"> (Disabled)</span>
        </span>
        multiplier to
        <span>Game Speed.</span>
        <div v-if="unstable">
          You <i>would</i> have <span :class="instabilityClassObject()">{{ format(unnerfedCelestialMatter, 2, 1) }}</span>
          Celestial Matter, but you don't.
          <br>
          This is because at <span :class="instabilityClassObject()">{{ format(softcap, 2, 1) }}</span> Celestial Matter, your
          Celestial Matter was softcapped.
          <br>
          Currently, Celestial Matter above this amount is being raised to the power of
          <span :class="instabilityClassObject()">{{ format(1 / softcapPow, 2, 3) }}</span>.
          <br>
          The softcap to Celestial Matter is solely based on your Celestial Matter Softcap Magnitude, which is currently
          <span :class="instabilityClassObject()">{{ format(softcapPow, 2, 3) }}</span>.
        </div>
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
