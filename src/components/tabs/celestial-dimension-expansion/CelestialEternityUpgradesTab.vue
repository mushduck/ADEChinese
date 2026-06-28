<script>
import CEPMultiplierButton from "./CEPMultiplierButton";
import CelestialEternityUpgradeButton from "./CelestialEternityUpgradeButton";

export default {
  name: "CelestialEternityUpgradesTab",
  components: {
    CelestialEternityUpgradeButton,
    CEPMultiplierButton
  },
  computed: {
    grid() {
      return [
        [
          CelestialEternityUpgrade.betterCIP,
          CelestialEternityUpgrade.largeCDMult,
          CelestialEternityUpgrade.conversionFormulaImprovement
        ],
        [
          CelestialEternityUpgrade.startBreak,
          CelestialEternityUpgrade.bulkCelGalaxies,
          CelestialEternityUpgrade.instaAutos
        ],
        [
          CelestialEternityUpgrade.x2CIPAuto,
          CelestialEternityUpgrade.betterCelCrunchAuto,
          CelestialEternityUpgrade.startInf
        ],
        [
          CelestialEternityUpgrade.startingBoosts,
          CelestialEternityUpgrade.startBreakInf,
          CelestialEternityUpgrade.celEternityAuto
        ],
        [
          CelestialEternityUpgrade.freeDimBoost,
          CelestialEternityUpgrade.freeGalaxy,
          CelestialEternityUpgrade.betterCelEternityAuto
        ],
        [
          CelestialEternityUpgrade.celTickReduction,
          CelestialEternityUpgrade.celDimReduction,
          CelestialEternityUpgrade.passiveCIP
        ]
      ];
    }
  },
  methods: {
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-celestial-eternity-upgrades-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-celestial-eternity-upgrades-grid__row"
    >
      <CelestialEternityUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-celestial-eternity-upgrades-grid__cell"
      />
    </div>
    <CEPMultiplierButton />
  </div>
</template>

<style scoped>
.l-celestial-eternity-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-celestial-eternity-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-celestial-eternity-upgrades-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>
