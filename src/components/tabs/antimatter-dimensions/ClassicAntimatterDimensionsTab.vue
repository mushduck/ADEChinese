<script>
import AntimatterDimensionProgressBar from "./AntimatterDimensionProgressBar";
import AntimatterDimensionRow from "./ClassicAntimatterDimensionRow";
import AntimatterDimensionsTabHeader from "./ClassicAntimatterDimensionsTabHeader";
import AntimatterGalaxyRow from "./ClassicAntimatterGalaxyRow";
import DimensionBoostRow from "./ClassicDimensionBoostRow";
import PrimaryButton from "@/components/PrimaryButton";
import TickspeedRow from "./TickspeedRow";

export default {
  name: "ClassicAntimatterDimensionsTab",
  components: {
    PrimaryButton,
    AntimatterDimensionRow,
    AntimatterDimensionsTabHeader,
    AntimatterGalaxyRow,
    DimensionBoostRow,
    AntimatterDimensionProgressBar,
    TickspeedRow,
  },
  data() {
    return {
      hasDimensionBoosts: false,
      isQuickResetAvailable: false,
      isSacrificeUnlocked: false,
      buy10Mult: new Decimal(0),
      buyOoMPow: new Decimal(0),
      currentSacrifice: new Decimal(0),
      currentPower: new Decimal(0),
      hasRealityButton: false,
      multiplierText: ""
    };
  },
  methods: {
    update() {
      this.hasDimensionBoosts = player.dimensionBoosts.gt(0);
      this.isQuickResetAvailable = Player.isInAntimatterChallenge && Player.antimatterChallenge.isQuickResettable;
      this.isSacrificeUnlocked = Sacrifice.isVisible;
      this.buy10Mult.copyFrom(AntimatterDimensions.buyTenMultiplier);
      this.buyOoMPow.copyFrom(AntimatterDimensions.buyOoMPower);
      this.currentSacrifice.copyFrom(Sacrifice.totalBoost);
      this.currentPower.copyFrom(Sacrifice.totalPower);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      const sacText = this.isSacrificeUnlocked
        ? (Ascensions.sacA.isUnlocked
          ? ` | 献祭指数：${formatPow(this.currentPower, 2, 3)}`
          : ` | 献祭倍率：${formatX(this.currentSacrifice, 2, 2)}`)
        : "";
      const multText = Ascensions.b10mA.isUnlocked
        ? `购买10个维度的加成指数: +${formatPow(this.buyOoMPow, 2, 3)}`
        : `购买10个维度的加成倍数: ${formatX(this.buy10Mult, 2, 2)}`;
      this.multiplierText = `${multText}${sacText}`;
    },
    quickReset() {
      softReset(-1, true, true);
    }
  }
};
</script>

<template>
  <div class="l-old-ui-antimatter-dim-tab">
    <AntimatterDimensionsTabHeader />
    {{ multiplierText }}
    <TickspeedRow />
    <div class="l-dimensions-container">
      <AntimatterDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
      <DimensionBoostRow />
      <AntimatterGalaxyRow />
    </div>
    <PrimaryButton
      v-if="isQuickResetAvailable"
      class="o-primary-btn--quick-reset"
      @click="quickReset"
    >
      进行一次维度提升重置,
      <span v-if="hasDimensionBoosts">但失去一个维度提升</span>
      <span v-else>但无任何加成</span>
    </PrimaryButton>
    <div class="l-flex" />
    <AntimatterDimensionProgressBar class="l-antimatter-dim-tab__progress_bar" />
  </div>
</template>

<style scoped>
.l-flex {
  flex: 1 0;
}
</style>
