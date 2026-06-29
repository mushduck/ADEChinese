<script>
import CelestialBreakInfinityButton from "./CelestialBreakInfinityButton";
import CelestialInfinityUpgradeButton from "./CelestialInfinityUpgradeButton";

export default {
  name: "CelestialBreakInfinityTab",
  components: {
    CelestialBreakInfinityButton,
    CelestialInfinityUpgradeButton
  },
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    grid() {
      return [
        [
          CelestialBreakInfinityUpgrade.autoCD1,
          CelestialBreakInfinityUpgrade.autoCD2,
          CelestialBreakInfinityUpgrade.autoCDPlus,
        ],
        [
          CelestialBreakInfinityUpgrade.betterAuto,
          CelestialBreakInfinityUpgrade.bulkCelDimBoosts,
          CelestialBreakInfinityUpgrade.celInfGen,
        ],
        [
          CelestialBreakInfinityUpgrade.celTickspeedCostMult,
          CelestialBreakInfinityUpgrade.celDimCostMult,
          CelestialBreakInfinityUpgrade.cipGen
        ],
        [
          CelestialBreakInfinityUpgrade.celDimPurchaseBuff,
          CelestialBreakInfinityUpgrade.celDimboostBuff,
          CelestialBreakInfinityUpgrade.celGalaxyBuff,
        ]
      ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = player.endgame.celDimExpansion.isBreakUnlocked;
    },
    btnClassObject(column) {
      return {
        "l-break-celestial-infinity-upgrade-grid__cell": true,
        "o-break-celestial-infinity-upgrade-btn--multiplier": column !== 1
      };
    }
  }
};
</script>

<template>
  <div class="l-break-celestial-infinity-tab">
    <div v-if="!isUnlocked">
      Reach {{ formatInt(10000) }} Celestial Infinity Points to unlock Celestial Breaking of Infinity.
    </div>
    <CelestialBreakInfinityButton class="l-break-celestial-infinity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-celestial-infinity-upgrade-grid l-break-celestial-infinity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-celestial-infinity-upgrade-grid__row"
      >
        <CelestialInfinityUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :class="btnClassObject(columnId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
