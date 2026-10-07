<script>
import EPMultiplierButton from "./EPMultiplierButton";
import EternityUpgradeButton from "./EternityUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "EternityUpgradesTab",
  components: {
    PrimaryButton,
    EternityUpgradeButton,
    EPMultiplierButton
  },
  data() {
    return {
      areSoftcapsApplicable: false,
      hasSeenFinalSoftcap: false,
      chargeUnlocked: false,
      totalCharges: 0,
      chargesUsed: 0,
      disCharge: false
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
    disChargeClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--charged-respec-active": this.disCharge
      };
    },
    costIncreases: () => EternityUpgrade.epMult.costIncreaseThresholds.map(x => new Decimal(x))
  },
  watch: {
    disCharge(newValue) {
      player.endgame.overcharge.discharge.eternal = newValue;
    }
  },
  methods: {
    update() {
      this.areSoftcapsApplicable = !Ascensions.epA.isUnlocked;
      this.hasSeenFinalSoftcap = player.eternityPoints.gte("e1e125") && !Ascensions.epA.isUnlocked;
      this.chargeUnlocked = Ascensions.oc2A.isUnlocked;
      this.totalCharges = player.endgame.overcharge.completions.eter;
      this.chargesUsed = player.endgame.overcharge.completions.eter - player.endgame.overcharge.chargesLeft.eternal;
      this.disCharge = player.endgame.overcharge.discharge.eternal;
    },
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-eternity-upgrades-grid">
    <div
      v-if="chargeUnlocked"
      class="c-subtab-option-container"
    >
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
      >
        在下一次终局时重置已充能的永恒升级
      </PrimaryButton>
    </div>
    <div v-if="chargeUnlocked">
      你已充能 {{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }} 永恒升级，已充能的永恒升级会更改其效果。
      <br>
      按住 Shift 键显示充能永恒升级，
      <span> 你可以自由地在终局时重置充能的升级。</span>
    </div>
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
