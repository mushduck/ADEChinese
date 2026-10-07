<script>
import BreakInfinityButton from "./BreakInfinityButton";
import InfinityUpgradeButton from "@/components/InfinityUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "BreakInfinityTab",
  components: {
    PrimaryButton,
    BreakInfinityButton,
    InfinityUpgradeButton
  },
  data() {
    return {
      isUnlocked: false,
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
          BreakInfinityUpgrade.totalAMMult,
          BreakInfinityUpgrade.currentAMMult,
          BreakInfinityUpgrade.galaxyBoost,
        ],
        [
          BreakInfinityUpgrade.infinitiedMult,
          BreakInfinityUpgrade.achievementMult,
          BreakInfinityUpgrade.slowestChallengeMult,
        ],
        [
          BreakInfinityUpgrade.infinitiedGen,
          BreakInfinityUpgrade.autobuyMaxDimboosts,
          BreakInfinityUpgrade.autobuyerSpeed
        ],
        [
          BreakInfinityUpgrade.tickspeedCostMult,
          BreakInfinityUpgrade.dimCostMult,
          BreakInfinityUpgrade.ipGen
        ]
      ];
    },
    disChargeClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--charged-respec-active": this.disCharge
      };
    }
  },
  watch: {
    disCharge(newValue) {
      player.endgame.overcharge.discharge.infinite = newValue;
    }
  },
  methods: {
    update() {
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval;
      this.chargeUnlocked = Ascensions.ocA.isUnlocked;
      this.totalCharges = player.endgame.overcharge.completions.bi;
      this.chargesUsed = player.endgame.overcharge.completions.bi - player.endgame.overcharge.chargesLeft.infinite;
      this.disCharge = player.endgame.overcharge.discharge.infinite;
    },
    btnClassObject(column) {
      return {
        "l-infinity-upgrade-grid__cell": true,
        "o-infinity-upgrade-btn--multiplier": column === 3
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-break-infinity-tab">
    <div v-if="!isUnlocked">
      自动大坍缩的时间间隔需要达到 {{ format(0.1, 1, 1) }} 秒才能打破无限
    </div>
    <div
      v-if="chargeUnlocked"
      class="c-subtab-option-container"
    >
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
      >
        终局后重置打破无限充能升级
      </PrimaryButton>
    </div>
    <div v-if="chargeUnlocked">
      你已充能 {{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }} 个打破无限升级。
      充能的打破无限升级效果会发生改变。
      <br>
      按住 Shift 键可显示未充能的打破无限升级。
      <span> 你可以在终局后自由重置选择。</span>
    </div>
    <BreakInfinityButton class="l-break-infinity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-infinity-upgrade-grid l-break-infinity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-infinity-upgrade-grid__row"
      >
        <InfinityUpgradeButton
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
