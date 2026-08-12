<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicCelestialDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hasPrevTier: false,
      isUnlocked: false,
      canUnlock: false,
      multiplier: new Decimal(0),
      baseAmount: new Decimal(0),
      amount: new Decimal(0),
      purchases: new Decimal(0),
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capCP: new Decimal(0),
      hardcap: CelestialDimensions.HARDCAP_PURCHASES,
      isAutobuyerUnlocked: false,
      isAutobuyerOn: false
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `第 ${CelestialDimension(this.tier).shortDisplayName} 天界维度`;
    },
    costDisplay() {
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "已达到上限";
        return this.showCostTitle ? `价格: ${format(this.cost)} 天界点数` : `${format(this.cost)} 天界点数`;
      }

      if (this.canUnlock) {
        return "解锁";
      }

      return `达到 ${format(CelestialDimension(this.tier).cpRequirement)} 天界点数`;
    },
    hasLongText() {
      return this.costDisplay.length > 20;
    },
    hardcapPurchases() {
      return format(this.hardcap, 1, 1);
    },
    capTooltip() {
      if (this.isCapped) return `已达到上限: ${format(this.capCP)} 天界点数`;
      return `购买 ${quantifyHybridLarge("个", this.purchases)}`;
    },
    showRow() {
      return this.isUnlocked || this.canUnlock || this.amount.gt(0) ||
        this.hasPrevTier;
    },
    showCostTitle() {
      return this.cost.log10().lt(1e5);
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.celestialDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = CelestialDimension(tier);
      this.hasPrevTier = tier === 1 || CelestialDimension(tier - 1).isUnlocked;
      this.isUnlocked = dimension.isUnlocked;
      this.canUnlock = dimension.canUnlock;
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount.copyFrom(dimension.baseAmount);
      this.purchases.copyFrom(dimension.purchases);
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isCapped = dimension.isCapped;
      this.capCP.copyFrom(dimension.hardcapCPAmount);
      this.hardcap.copyFrom(dimension.purchaseCap);
      this.isAutobuyerUnlocked = Autobuyer.celestialDimension(tier).isUnlocked;
      this.isAutobuyerOn = Autobuyer.celestialDimension(tier).isActive;
    },
    buySingleCelestialDimension() {
      CelestialDimension(this.tier).buySingle();
    },
    buyMaxCelestialDimension() {
      CelestialDimension(this.tier).buyMax(false);
    },
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !canUnlock }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container">
      <PrimaryButton
        :enabled="isAvailableForPurchase || (!isUnlocked && canUnlock)"
        class="o-primary-btn--buy-cd o-primary-btn--buy-dim c-dim-tooltip-container"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buySingleCelestialDimension"
      >
        {{ costDisplay }}
        <div class="c-dim-purchase-count-tooltip">
          {{ capTooltip }}
        </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--cd-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && isUnlocked"
        class="o-primary-btn--cd-auto"
        @click="buyMaxCelestialDimension"
      >
        购买最大
      </PrimaryButton>
    </div>
  </div>
</template>
