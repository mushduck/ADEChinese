<script>
import NullUpgradeButton from "./NullUpgradeButton";

export default {
  name: "NullUpgradesTabComponent",
  components: {
    NullUpgradeButton
  },
  computed: {
    grid() {
      return [
        [
          NullUpgrade.antimatterDimensionMult,
          NullUpgrade.infinityPointMult,
          NullUpgrade.infinityMult,
          NullUpgrade.infinityDimensionMult,
          NullUpgrade.replicantiSpeedMult,
        ],
        [
          NullUpgrade.eternityPointMult,
          NullUpgrade.timeDimensionMult,
          NullUpgrade.eternityMult,
          NullUpgrade.dilatedTimeMult,
          NullUpgrade.tachyonParticleMult,
        ],
        [
          NullUpgrade.ncComp,
          NullUpgrade.alwaysBroken,
          NullUpgrade.icComp,
          NullUpgrade.repUnl,
          NullUpgrade.eterMiles
        ],
        [
          NullUpgrade.limerick1,
          NullUpgrade.limerick2,
          NullUpgrade.limerick3,
          NullUpgrade.limerick4,
          NullUpgrade.limerick5
        ]
      ];
    }
  },
  methods: {
    btnClassObject(column) {
      return {
        "l-null-upgrade-grid__cell": true,
        "o-null-upgrade-btn--multiplier": column === 1 || column === 2
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-null-upgrades-tab">
    <div class="l-null-upgrade-grid l-null-upgrades-tab__grid">
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-null-upgrade-grid__row"
      >
        <NullUpgradeButton
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
