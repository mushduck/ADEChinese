<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicDivineDimensionRow",
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
      multiplier: new Decimal(0),
      baseAmount: new Decimal(0),
      amount: new Decimal(0),
      purchases: new Decimal(0),
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isAutobuyerUnlocked: false,
      isAutobuyerOn: false
    };
  },
  computed: {
    name() {
      return `${DivineDimension(this.tier).shortDisplayName} Divine Dimension`;
    },
    costDisplay() {
      return this.showCostTitle ? `Cost: ${format(this.cost)} VM` : `${format(this.cost)} VM`;
    },
    hasLongText() {
      return this.costDisplay.length > 20;
    },
    purchaseTooltip() {
      return `Purchased ${quantifyHybridLarge("time", this.purchases)}`;
    },
    showCostTitle() {
      return this.cost.log10().lt(1e5);
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.divineDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = DivineDimension(tier);
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount.copyFrom(dimension.baseAmount);
      this.purchases.copyFrom(dimension.purchases);
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isAutobuyerUnlocked = Autobuyer.divineDimension(tier).isUnlocked;
      this.isAutobuyerOn = Autobuyer.divineDimension(tier).isActive;
    },
    buySingleDivineDimension() {
      DivineDimension(this.tier).buySingle();
    },
    buyMaxDivineDimension() {
      DivineDimension(this.tier).buyMax(false);
    },
  }
};
</script>

<template>
  <div class="c-dimension-row l-dimension-single-row">
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container">
      <PrimaryButton
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-vd o-primary-btn--buy-dim c-dim-tooltip-container"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buySingleDivineDimension"
      >
        {{ costDisplay }}
        <div class="c-dim-purchase-count-tooltip">
          {{ purchaseTooltip }}
        </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--vd-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && isUnlocked"
        class="o-primary-btn--vd-auto"
        @click="buyMaxDivineDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>
