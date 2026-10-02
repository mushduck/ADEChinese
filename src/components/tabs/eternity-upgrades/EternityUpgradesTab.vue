<script>
import EPMultiplierButton from "./EPMultiplierButton";
import EternityUpgradeButton from "./EternityUpgradeButton";

export default {
  name: "EternityUpgradesTab",
  components: {
    EternityUpgradeButton,
    EPMultiplierButton
  },
  data() {
    return {
      areSoftcapsApplicable: false,
      hasSeenFinalSoftcap: false
    };
  },
  computed: {
    grid() {
      return [
        [
          EternityUpgrade.idMultEP,
          EternityUpgrade.idMultEternities,
          EternityUpgrade.idMultICRecords
        ],
        [
          EternityUpgrade.tdMultAchs,
          EternityUpgrade.tdMultTheorems,
          EternityUpgrade.tdMultRealTime,
        ]
      ];
    },
    costIncreases: () => EternityUpgrade.epMult.costIncreaseThresholds.map(x => new Decimal(x))
  },
  methods: {
    update() {
      this.areSoftcapsApplicable = !Ascensions.epA.isUnlocked;
      this.hasSeenFinalSoftcap = player.eternityPoints.gte("e1e125") && !Ascensions.epA.isUnlocked;
    },
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-eternity-upgrades-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-eternity-upgrades-grid__row"
    >
      <EternityUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-eternity-upgrades-grid__cell"
      />
    </div>
    <EPMultiplierButton />
    <div v-if="areSoftcapsApplicable">
      {{ formatX(5) }} 永恒点数升级的价格在 {{ format(costIncreases[0]) }}，{{ formatPostBreak(costIncreases[1], 2) }}，和{{ formatPostBreak(costIncreases[2]) }} 永恒点数时加速增长。
      <br>
      永恒点数超过 {{ formatPostBreak(costIncreases[3]) }} 后，价格呈超指数增长。
    </div>
    <div v-if="hasSeenFinalSoftcap">
      <br>
      永恒点数超过 {{ formatPostBreak(costIncreases[4]) }} 后，价格将再次加速增长。
    </div>
  </div>
</template>

<style scoped>
.l-eternity-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-eternity-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-eternity-upgrades-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>
