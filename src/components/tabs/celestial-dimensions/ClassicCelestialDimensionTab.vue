<script>
import CelestialDimensionBoostRow from "./ClassicCelestialDimensionBoostRow";
import CelestialDimensionRow from "./ClassicCelestialDimensionRow";
import CelestialGalaxyRow from "./ClassicCelestialGalaxyRow";
import CelestialTickspeedRow from "./CelestialTickspeedRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicCelestialDimensionTab",
  components: {
    PrimaryButton,
    CelestialDimensionBoostRow,
    CelestialDimensionRow,
    CelestialGalaxyRow,
    CelestialTickspeedRow
  },
  data() {
    return {
      celestialMatter: new Decimal(0),
      dimMultiplier: new Decimal(0),
      matterPerSecond: new Decimal(0),
      incomeType: "",
      conversionExponent: 0,
      nextDimCapIncrease: 0,
      totalDimCap: new Decimal(0),
      creditsClosed: false,
      showLockedDimCostNote: true,
      isEffectActive: false,
      isExpanded: false,
      isAnyAutobuyerUnlocked: false,
    };
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !CelestialDimension(8).isUnlocked;
      this.celestialMatter.copyFrom(Currency.celestialMatter);
      this.conversionExponent = CelestialDimensions.conversionExponent;
      this.dimMultiplier.copyFrom(this.celestialMatter.pow(this.conversionExponent).max(1));
      this.matterPerSecond.copyFrom(CelestialDimension(1).productionPerRealSecond);
      this.incomeType = "天界物质";
      this.totalDimCap.copyFrom(CelestialDimensions.totalDimCap);
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.isEffectActive = player.endgame.celestialMatterMultiplier.isActive;
      this.isExpanded = Achievement(221).isUnlocked;
      this.isAnyAutobuyerUnlocked = Autobuyer.celestialDimension(1).isUnlocked;
    },
    maxAll() {
      CelestialDimensions.buyMax();
    },
    toggleCelestialMatterMultiplier() {
      toggleCelestialMatter();
    },
    toggleAllAutobuyers() {
      toggleAllCelDims();
    }
  }
};
</script>

<template>
  <div class="l-celestial-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        全部最大
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="toggleCelestialMatterMultiplier"
      >
        切换激发天界物质
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        切换所有自动购买器
      </PrimaryButton>
    </div>
    <div>
      <p>
        你拥有
        <span class="c-celestial-dim-description__accent">{{ format(celestialMatter, 2, 1) }}</span>
        天界物质<span v-if="!isEffectActive">(已停止激发)</span>。
        <br>
        <span>
          增加
          <span class="c-celestial-dim-description__accent">{{ formatPow(conversionExponent, 2, 3) }}</span>
        </span>
        为
        <span>游戏速度</span>
        提供
        <span class="c-celestial-dim-description__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        的加成。
      </p>
    </div>
    <div>
      所有天界维度可在天界点数达到 {{ format(totalDimCap, 2, 2) }} 前购买。
    </div>
    <div>你每秒获得 {{ format(matterPerSecond, 2, 0) }} {{ incomeType }}。</div>
    <CelestialTickspeedRow v-if="isExpanded"/>
    <div class="l-dimensions-container">
      <CelestialDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
      <CelestialDimensionBoostRow v-if="isExpanded"/>
      <CelestialGalaxyRow v-if="isExpanded"/>
    </div>
    <div v-if="showLockedDimCostNote">
      按住 Shift 键以查看被锁定的天界维度价格
    </div>
  </div>
</template>
