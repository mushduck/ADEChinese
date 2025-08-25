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
      baseAmount: 0,
      amount: new Decimal(0),
      purchases: 0,
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capCP: new Decimal(0),
      hardcap: CelestialDimensions.HARDCAP_PURCHASES,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${CelestialDimension(this.tier).shortDisplayName} Celestial Dimension`;
    },
    costDisplay() {
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "Capped";
        return this.showCostTitle ? `Cost: ${format(this.cost)} CP` : `${format(this.cost)} CP`;
      }

      if (this.canUnlock) {
        return "Unlock";
      }

      return `Reach ${format(CelestialDimension(this.tier).cpRequirement)} CP`;
    },
    hasLongText() {
      return this.costDisplay.length > 20;
    },
    hardcapPurchases() {
      return format(this.hardcap, 1, 1);
    },
    capTooltip() {
      if (this.isCapped) return `Cap reached at ${format(this.capCP)} CP`;
      return `Purchased ${quantifyInt("time", this.purchases)}`;
    },
    showRow() {
      return this.isUnlocked || this.canUnlock || this.amount.gt(0) ||
        this.hasPrevTier;
    },
    showCostTitle() {
      return this.cost.exponent < 1e5;
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
      this.baseAmount = dimension.baseAmount;
      this.purchases = dimension.purchases;
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isCapped = dimension.isCapped;
      if (this.isCapped) {
        this.capCP.copyFrom(dimension.hardcapCPAmount);
        this.hardcap = dimension.purchaseCap;
      }
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
        class="o-primary-btn--buy-id o-primary-btn--buy-dim c-dim-tooltip-container"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buySingleCelestialDimension"
      >
        {{ costDisplay }}
        <div class="c-dim-purchase-count-tooltip">
          {{ capTooltip }}
        </div>
      </PrimaryButton>
      <PrimaryButton
        :enabled="isAvailableForPurchase && isUnlocked"
        class="o-primary-btn--id-auto"
        @click="buyMaxCelestialDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>
