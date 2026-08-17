<script>
import DivineDimensionRow from "./ModernDivineDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernDivineDimensionTab",
  components: {
    PrimaryButton,
    DivineDimensionRow
  },
  data() {
    return {
      divineMatter: new Decimal(0),
      divineEnergy: new Decimal(0),
      matterPerSecond: new Decimal(0),
      energyPerSecond: new Decimal(0),
      incomeType: "",
      dispBoth: false,
      conversionFormula1: new Decimal(0),
      conversionFormula2: 0,
      conversionFormula3: 0,
      hardcap: new Decimal(0),
      creditsClosed: false,
      canProduceEnergy: false,
      isProducingEnergy: false,
      isAnyAutobuyerUnlocked: false
    };
  },
  computed: {
    changeProdDisplay() {
      return this.isProducingEnergy
        ? "生产神性物质"
        : "生产神性能量";
    },
    currencyProd() {
      return this.isProducingEnergy
        ? `${format(this.energyPerSecond, 2, 2)}`
        : `${format(this.matterPerSecond, 2, 0)}`;
    },
  },
  methods: {
    update() {
      this.divineMatter.copyFrom(Currency.divineMatter);
      this.divineEnergy.copyFrom(Currency.divineEnergy);
      this.matterPerSecond.copyFrom(DivineDimension(1).productionPerSecond);
      this.energyPerSecond.copyFrom(DivineDimensions.energyPerSecond);
      this.incomeType = player.celestials.pelle.divinity.isProducingEnergy ? "神性能量" : "神性物质";
      this.dispBoth = DivinityUpgrade.divineL2U10.isBought;
      this.conversionFormula1 = DivineDimensions.conversionFormula1;
      this.conversionFormula2 = DivineDimensions.conversionFormula2;
      this.conversionFormula3 = DivineDimensions.conversionFormula3;
      this.hardcap.copyFrom(DivineDimensions.HARDCAP);
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.canProduceEnergy = DivinityUpgrade.divineL1U5.isBought;
      this.isProducingEnergy = player.celestials.pelle.divinity.isProducingEnergy;
      this.isAnyAutobuyerUnlocked = Autobuyer.divineDimension(1).isUnlocked;
    },
    maxAll() {
      DivineDimensions.buyMax();
    },
    shiftProd() {
      player.celestials.pelle.divinity.isProducingEnergy = !player.celestials.pelle.divinity.isProducingEnergy;
    },
    toggleAllAutobuyers() {
      toggleAllDivDims();
    }
  }
};
</script>

<template>
  <div class="l-divine-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        全部最大
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
      <div v-if="canProduceEnergy">
        你拥有 <span class="c-divine-dim-description__accent">{{ format(divineEnergy, 2, 1) }}</span> 神性能量。
      </div>
      <div>
        <p>
          你拥有
          <span class="c-divine-dim-description__accent">{{ format(divineMatter, 2, 1) }}</span>
          神性物质，
          <br>
          为终局次数和缥缈之力提供
          <span class="c-divine-dim-description__accent">{{ formatX(conversionFormula1, 2, 2) }}</span>
          的加成；
          为所有机器获取和被毁灭的现实中的反物质指数提供
          <span class="c-divine-dim-description__accent">{{ formatPow(conversionFormula2, 2, 3) }}</span>
          的加成；
          将所有类型的强子效果到达上限和阿尔法诅咒消散的速度增加
          <span class="c-divine-dim-description__accent">{{ formatPercents(conversionFormula3, 2, 2) }}</span>。
        </p>
      </div>
      <div>当前神性物质的上限是 {{ format(hardcap, 2, 0) }}。</div>
      <div v-if="!dispBoth">你每秒获得 {{ currencyProd }} {{ incomeType }}</div>
      <div v-if="dispBoth">
        <div>你每秒获得 {{ format(matterPerSecond, 2, 0) }} 神性物质。</div>
        <div>你每秒获得 {{ format(energyPerSecond, 2, 2) }} 神性能量。</div>
      </div>
      <PrimaryButton
        v-if="canProduceEnergy && !dispBoth"
        class="o-primary-btn--subtab-option"
        @click="shiftProd"
      >
        {{ changeProdDisplay }}
      </PrimaryButton>
    </div>
    <div class="l-dimensions-container">
      <DivineDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
