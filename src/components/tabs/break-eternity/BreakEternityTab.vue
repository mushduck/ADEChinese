<script>
import BreakEternityButton from "./BreakEternityButton";
import BreakEternityUpgradeButton from "./BreakEternityUpgradeButton";

export default {
  name: "BreakEternityTab",
  components: {
    BreakEternityButton,
    BreakEternityUpgradeButton
  },
  data() {
    return {
      isUnlocked: false,
      antimatterReq: new Decimal(0)
    };
  },
  computed: {
    grid() {
      return [
        [
          BreakEternityUpgrade.antimatterDimensionPow,
          BreakEternityUpgrade.infinityDimensionPow,
          BreakEternityUpgrade.timeDimensionPow,
          BreakEternityUpgrade.replicantiIntervalPow,
          BreakEternityUpgrade.tachyonParticlePow,
        ],
        [
          BreakEternityUpgrade.galaxyScaleDelay,
          BreakEternityUpgrade.infinityPowerConversion,
          BreakEternityUpgrade.epMultiplierDelay,
          BreakEternityUpgrade.replicantiGalaxyPower,
          BreakEternityUpgrade.dilatedTimeMultiplier,
        ],
        [
          BreakEternityUpgrade.doubleIPUncap,
          BreakEternityUpgrade.tgThresholdUncap,
          BreakEternityUpgrade.tesseractMultiplier,
          BreakEternityUpgrade.glyphSacrificeUncap,
          BreakEternityUpgrade.glyphSlotImprovement
        ]
      ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = (PlayerProgress.endgameUnlocked() && player.antimatter.gte(DC.E9E15)) || player.break2;
      this.antimatterReq = DC.E9E15;
    },
    btnClassObject(column) {
      return {
        "l-break-eternity-upgrade-grid__cell": true,
        "o-break-eternity-upgrade-btn--multiplier": column === 1 || column === 2
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-break-eternity-tab">
    <div v-if="!isUnlocked">
      达到 {{ format(antimatterReq, 2, 1) }} 反物质且至少进行一次终局以打破永恒
    </div>
    <BreakEternityButton class="l-break-eternity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-eternity-upgrade-grid l-break-eternity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-eternity-upgrade-grid__row"
      >
        <BreakEternityUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :class="btnClassObject(columnId)"
        />
      </div>
    </div>
    <div>
      所有打破永恒升级只能在被毁灭的现实之外购买。
    </div>
    <div class="break-eternity-hint">
      （这一页升级名字就是那么直接）
    </div>
  </div>
</template>

<style scoped>
.break-eternity-hint {
  font-size: 0.75rem;
  opacity: 0.5;
}
</style>