<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicTimeDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    },
    areAutobuyersUnlocked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: new Decimal(0),
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isContinuumActive: false,
      continuumValue: new Decimal(0),
      isAutobuyerOn: false,
      requirementReached: false,
      realityUnlocked: false,
      showTTCost: false,
      ttCost: 0,
      ttGen: new Decimal(),
      currTT: new Decimal(),
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${TimeDimension(this.tier).shortDisplayName} Time Dimension`;
    },
    buttonContents() {
      if (this.showTTCost) return this.formattedTTCost;
      return this.formattedEPCost;
    },
    tooltipContents() {
      if (this.showTTCost) return `${this.formattedEPCost}<br>${this.timeEstimate}`;
      if (this.isCapped) return `Nameless prevents the purchase of more than ${format(1)} Time Dimension`;
      if (this.isContinuumActive) return "Continuum produces all your Time Dimensions";
      return `Purchased ${quantifyHybridLarge("time", this.bought)}`;
    },
    showRow() {
      return this.realityUnlocked || this.isUnlocked || this.requirementReached;
    },
    formattedTTCost() {
      return `Unlock: ${format(this.ttCost)} TT`;
    },
    formattedEPCost() {
      if (this.isCapped) return "Capped";
      if (this.isContinuumActive) return `Continuum: ${this.continuumString}`;
      return `${this.showCostTitle ? "Cost: " : ""}${format(this.cost, 2)} EP`;
    },
    continuumString() {
      return formatHybridFloat(this.continuumValue, 2);
    },
    hasLongText() {
      return this.buttonContents.length > 20;
    },
    showCostTitle() {
      return this.cost.log10().lt(1e5);
    },
    timeEstimate() {
      if (!this.showTTCost || this.ttGen.eq(0)) return "";
      const time = Decimal.sub(this.ttCost, this.currTT).dividedBy(this.ttGen);
      return time.gt(0) ? `Enough TT in ${TimeSpan.fromSeconds(time).toStringShort()}` : "";
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.timeDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = TimeDimension(tier);
      this.isCapped = Enslaved.isRunning && dimension.bought.gt(0);
      this.isUnlocked = dimension.isUnlocked;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.amount);
      this.bought.copyFrom(dimension.bought);
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      if (!this.isUnlocked) {
        this.isAvailableForPurchase = dimension.requirementReached;
      }
      this.isContinuumActive = Laitela.continuumActive && Alpha.currentStage >= 17 && !player.disablePostReality;
      if (this.isContinuumActive) this.continuumValue.copyFrom(dimension.continuumValue);
      this.requirementReached = dimension.requirementReached;
      this.isAutobuyerOn = Autobuyer.timeDimension(this.tier).isActive;
      this.realityUnlocked = PlayerProgress.realityUnlocked();
      this.showTTCost = !this.isUnlocked && !this.shiftDown;
      if (this.tier > 4) this.ttCost = TimeStudy.timeDimension(this.tier).cost;
      this.currTT.copyFrom(Currency.timeTheorems.value);
      this.ttGen.copyFrom(getTTPerSecond().times(Alpha.isRunning ? 1 : getGameSpeedupForDisplay()));
    },
    buyTimeDimension() {
      if (!this.isUnlocked) {
        TimeDimension(this.tier).tryUnlock();
        return;
      }
      if (this.isContinuumActive) return;
      buySingleTimeDimension(this.tier);
    },
    buyMaxTimeDimension() {
      if (this.isContinuumActive) return;
      buyMaxTimeDimension(this.tier);
    },
    buttonClass() {
      return {
        "o-primary-btn--buy-td o-primary-btn o-primary-btn--new o-primary-btn--buy-dim": true,
        "l-dim-row-small-text": this.hasLongText,
        "o-non-clickable o-continuum": this.isContinuumActive
      };
    },
    maxButtonClass() {
      return {
        "o-primary-btn--buy-td-auto": true,
        "o-non-clickable o-continuum": this.isContinuumActive
      };
    }
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !requirementReached }"
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
        :enabled="isAvailableForPurchase && !isCapped"
        :class="buttonClass()"
        @click="buyTimeDimension"
      >
        {{ buttonContents }}
        <div class="c-dim-purchase-count-tooltip">
          <span v-html="tooltipContents" />
        </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="areAutobuyersUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--buy-td-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && !isCapped"
        :class="maxButtonClass()"
        @click="buyMaxTimeDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.o-non-clickable {
  cursor: auto;
}

.o-continuum {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--accent);
  background: var(--color-laitela--base);
}

.o-continuum:hover {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--base);
  background: var(--color-laitela--accent);
}
</style>
