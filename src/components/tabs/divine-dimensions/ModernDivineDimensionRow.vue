<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ModernDivineDimensionRow",
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
  <div class="c-dimension-row l-dimension-row-divine-dim l-dimension-single-row">
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container c-modern-dim-tooltip-container">
      <div class="c-modern-dim-purchase-count-tooltip">
        {{ purchaseTooltip }}
      </div>
      <PrimaryButton
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-vd o-primary-btn o-primary-btn--new o-primary-btn--buy-dim"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buySingleDivineDimension"
      >
        {{ costDisplay }}
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--vd-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--vd-auto"
        @click="buyMaxDivineDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.c-modern-dim-tooltip-container .c-modern-dim-purchase-count-tooltip {
  position: absolute;
  width: 20rem;
  top: 50%;
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: white;
  background: black;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-width, 0.5rem);
  /* Buttons are 40rem wide, tooltip is 20rem */
  transform: translate(calc(-175% - 1rem), -50%);
  padding: 0.5rem;
  visibility: hidden;
}
</style>
