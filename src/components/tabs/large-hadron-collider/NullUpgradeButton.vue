<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import HintText from "@/components/HintText";

export default {
  name: "NullUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay,
    HintText
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isBought: false,
      isAffordable: false,
      cost: new Decimal()
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    costText() {
      if (this.cost.gte(DC.NUMMAX)) return `价格：无限 虚物质`;
      return `价格：${format(this.cost, 2)} 虚物质`;
    },
    classObject() {
      return {
        "o-null-upgrade": true,
        "o-null-upgrade--bought": this.isBought,
        "o-null-upgrade--available": !this.isBought && this.isAffordable,
        "o-null-upgrade--unavailable": !this.isBought && !this.isAffordable
      };
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isBought = upgrade.isBought || upgrade.isCapped;
      this.isAffordable = upgrade.isAffordable;
      this.cost.copyFrom(upgrade.cost);
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      class="l-null-upgrade-btn"
      @click="upgrade.purchase()"
    >
      <HintText
        type="nullUpgrades"
        class="l-hint-text--reality-upgrade c-hint-text--reality-upgrade"
      >
        {{ config.name }}
      </HintText>
      <DescriptionDisplay :config="upgrade.config" />
      <EffectDisplay :config="upgrade.config" />
      <span v-html="costText" />
    </button>
  </div>
</template>

<style scoped>

</style>
