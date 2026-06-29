<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "CelestialCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedCelestialInfinities: new Decimal(),
      gainedCelestialInfinityPoints: new Decimal(),
      startingBoosts: new Decimal(0),
      startingCM: 0,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstCelInfinity() {
      return !player.endgame.celDimExpansion.celestialInfinities;
    },
    message() {
      const info = this.isFirstCelInfinity ? this.firstCelInfinityInfo : ``;
      return `Upon Celestial Infinity, all Celestial Dimensions, Celestial Dimension Boosts, and Celestial Galaxies are reset. ${info}`;
    },
    firstCelInfinityInfo() {
      return `In return, you gain an Celestial Infinity Point (CIP). This allows you to buy multiple upgrades that you can
        find in the Celestial Infinity tab. You will also gain one Celestial Infinity, which is the stat shown in the Statistics tab.`;
    },
    cipGainInfo() {
      return `You will gain ${quantify("Celestial Infinity", this.gainedCelestialInfinities, 2, 0)}
        and ${quantify("Celestial Infinity Point", this.gainedCelestialInfinityPoints, 2, 0)}.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingCM.gte(0)) gainedResources.push(`${quantify("Celestial Matter", this.startingCM, 2, 1)}`);
      if (this.startingBoosts.gt(0)) gainedResources.push(`${quantify("Celestial Dimension Boost", this.startingBoosts)}`);
      if (this.willStartWithGalaxy) gainedResources.push(`${quantify("Celestial Galaxy", 1)}`);

      return `You will start your next Celestial Infinity with ${makeEnumeration(gainedResources)}.`;
    }
  },
  methods: {
    update() {
      this.gainedCelestialInfinities = gainedCelestialInfinities().round();
      this.gainedCelestialInfinityPoints = gainedCelestialInfinityPoints().round();
      this.startingBoosts.copyFrom(CelestialDimBoost.startingDimensionBoosts);
      this.startingCM = Currency.celestialMatter.startingValue;
      this.willStartWithGalaxy = false;
    },
    handleYesClick() {
      celestialCrunchResetRequest();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    header="You are about to Celestial Crunch"
    :message="message"
    :gained-resources="cipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstCelInfinity"
    :alternate-text="message"
    :confirm-option="isFirstCelInfinity ? undefined : 'celestialCrunch'"
  />
</template>
