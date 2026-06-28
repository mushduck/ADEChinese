<script>
import CIPMultiplierButton from "./CIPMultiplierButton";
import CelestialInfinityUpgradeButton from "./CelestialInfinityUpgradeButton";

export default {
  name: "CelestialInfinityUpgradesTab",
  components: {
    CelestialInfinityUpgradeButton,
    CIPMultiplierButton
  },
  data() {
    return {
      canMultiply: false
    };
  },
  computed: {
    grid() {
      return [
        [
          CelestialInfinityUpgrade.gameSpeedMultCIP,
          CelestialInfinityUpgrade.celDimPurchaseBoost,
          CelestialInfinityUpgrade.alphaDecayStartBoost
        ],
        [
          CelestialInfinityUpgrade.celDimBoostBuff,
          CelestialInfinityUpgrade.celGalaxyBuff,
          CelestialInfinityUpgrade.celestialMatterConversionBuff
        ],
        [
          CelestialInfinityUpgrade.antimatterCelestialDimBuff,
          CelestialInfinityUpgrade.cipGen,
          CelestialInfinityUpgrade.buffedStart,
        ]
      ];
    }
  },
  methods: {
    update() {
      this.canMultiply = CelestialInfinityUpgrade.all.filter(u => u.isBought).length === CelestialInfinityUpgrade.all.length;
    },
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-celestial-infinity-upgrades-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-celestial-infinity-upgrades-grid__row"
    >
      <CelestialInfinityUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-celestial-infinity-upgrades-grid__cell"
      />
    </div>
    <CIPMultiplierButton v-if="canMultiply"/>
  </div>
</template>

<style scoped>
.l-celestial-infinity-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-celestial-infinity-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-celestial-infinity-upgrades-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>
