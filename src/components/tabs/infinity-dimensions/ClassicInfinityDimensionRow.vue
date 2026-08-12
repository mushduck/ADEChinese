<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ClassicInfinityDimensionRow",
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
      isAutobuyerUnlocked: false,
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capIP: new Decimal(0),
      isContinuumActive: false,
      continuumValue: new Decimal(0),
      isAutobuyerOn: false,
      isEC8Running: false,
      hardcap: new Decimal(InfinityDimensions.HARDCAP_PURCHASES),
      eternityReached: false,
      enslavedRunning: false,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${InfinityDimension(this.tier).shortDisplayName}无限维度`;
    },
    costDisplay() {
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "已达到上限";
        if (this.isContinuumActive) return `连续统: ${this.continuumString}`;
        return this.showCostTitle ? `价格：${format(this.cost)} 无限点数` : `${format(this.cost)} 无限点数`;
      }

      if (this.canUnlock) {
        return "解锁";
      }

      return `达到 ${formatPostBreak(InfinityDimension(this.tier).amRequirement)} 反物质`;
    },
    continuumString() {
      return formatHybridFloat(this.continuumValue, 2);
    },
    hasLongText() {
      return this.costDisplay.length > 20;
    },
    hardcapPurchases() {
      return format(this.hardcap, 1, 1);
    },
    capTooltip() {
      if (this.enslavedRunning) return `无名氏的现实阻止你购买超过 ${format(10)} 个无限维度`;
      if (this.isCapped) return `达到了 ${format(this.capIP)} 无限点数的上限`;
      if (this.isContinuumActive) return "连续统已取代无限维度";
      return `已购买 ${quantifyHybridLarge("次", this.purchases)}`;
    },
    showRow() {
      return this.eternityReached || this.isUnlocked || this.canUnlock || this.amount.gt(0) ||
        this.hasPrevTier;
    },
    showCostTitle() {
      return this.cost.log10().lt(1e5);
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.infinityDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = InfinityDimension(tier);
      this.hasPrevTier = tier === 1 || InfinityDimension(tier - 1).isUnlocked;
      const autobuyer = Autobuyer.infinityDimension(tier);
      this.isUnlocked = dimension.isUnlocked;
      this.canUnlock = dimension.canUnlock;
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount.copyFrom(dimension.baseAmount);
      this.purchases.copyFrom(dimension.purchases);
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.isAutobuyerUnlocked = autobuyer.isUnlocked;
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isCapped = dimension.isCapped;
      if (this.isCapped) {
        this.capIP.copyFrom(dimension.hardcapIPAmount);
        this.hardcap.copyFrom(dimension.purchaseCap);
      }
      this.isContinuumActive = Laitela.continuumActive && !this.isEC8Running && Alpha.currentStage >= 9 && !player.disablePostReality;
      if (this.isContinuumActive) this.continuumValue.copyFrom(dimension.continuumValue);
      this.isEC8Running = EternityChallenge(8).isRunning;
      this.isAutobuyerOn = autobuyer.isActive;
      this.eternityReached = PlayerProgress.eternityUnlocked();
      this.enslavedRunning = Enslaved.isRunning;
    },
    buySingleInfinityDimension() {
      if (this.isContinuumActive) return;
      InfinityDimension(this.tier).buySingle();
    },
    buyMaxInfinityDimension() {
      if (this.isContinuumActive) return;
      InfinityDimension(this.tier).buyMax(false);
    },
    buttonClass() {
      return {
        "o-primary-btn--buy-id o-primary-btn o-primary-btn--new o-primary-btn--buy-dim": true,
        "l-dim-row-small-text": this.hasLongText,
        "o-non-clickable o-continuum": this.isContinuumActive
      };
    },
    maxButtonClass() {
      return {
        "o-primary-btn--id-auto": true,
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
        :class="buttonClass()"
        @click="buySingleInfinityDimension"
      >
        {{ costDisplay }}
        <div class="c-dim-purchase-count-tooltip">
          {{ capTooltip }}
        </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked && !isEC8Running"
        v-model="isAutobuyerOn"
        class="o-primary-btn--id-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && isUnlocked"
        :class="maxButtonClass()"
        @click="buyMaxInfinityDimension"
      >
        购买最大数量
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
