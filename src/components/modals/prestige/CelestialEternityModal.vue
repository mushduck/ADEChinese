<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "CelestialEternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      startingCIP: new Decimal(),
      gainedCelestialEternityPoints: new Decimal(),
      gainedCelestialEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.celestialEternityUnlocked()
        ? `Celestial Eternity will reset everything Celestial Dimension-related up to this point.`
        : `Celestial Eternity will reset everything Celestial Dimension-related up to this point.
          You will also gain a Celestial Eternity Point and unlock various upgrades.`;
    },
    gainedCEPOnCelestialEternity() {
      return `You will gain ${quantify("Celestial Eternity", this.gainedCelestialEternities, 2)} 
      and ${quantify("Celestial Eternity Point", this.gainedCelestialEternityPoints, 2)} on Celestial Eternity.`;
    },
    startWithCIP() {
      return this.startingCIP.gt(0)
        ? `You will start your next Celestial Eternity with ${quantify("Celestial Infinity Point", this.startingCIP, 2)}.`
        : ``;
    },
  },
  methods: {
    update() {
      this.startingCIP = Currency.celestialInfinityPoints.startingValue;
      this.gainedCelestialEternityPoints = gainedCelestialEternityPoints();
      this.gainedCelestialEternities = gainedCelestialEternities();
    },
    handleYesClick() {
      celestialEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="'You are about to Eternity'"
    :message="message"
    :gained-resources="gainedCEPOnCelestialEternity"
    :starting-resources="startWithCIP"
    :confirm-fn="handleYesClick"
    confirm-option="celestialEternity"
  />
</template>
