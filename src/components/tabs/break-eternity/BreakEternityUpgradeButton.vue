<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "BreakEternityUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
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
      isAvailable: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-break-eternity-upgrade": true,
        "o-break-eternity-upgrade--bought": this.isBought,
        "o-break-eternity-upgrade--available": !this.isBought && this.isAffordable && this.isAvailable,
        "o-break-eternity-upgrade--unavailable": !this.isBought && !this.isAffordable || !this.isBought && !this.isAvailable
      };
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isBought = upgrade.isBought;
      this.isAffordable = upgrade.isAffordable && upgrade.isAvailable;
      this.isAvailable = upgrade.isAvailable;
    }
  }
};
</script>

<template>
  <button
    v-if="isAvailable"
    :class="classObject"
    @click="upgrade.purchase()"
  >
    <DescriptionDisplay :config="upgrade.config" />
    <EffectDisplay
      br
      :config="upgrade.config"
    />
    <CostDisplay
      br
      :config="upgrade.config"
      name="Antimatter"
    />
  </button>
  <button
    v-else
    :class="classObject"
  >
    <DescriptionDisplay :config="upgrade.config" />
    <EffectDisplay
      br
      :config="upgrade.config"
    />
    <CostDisplay
      br
      :config="upgrade.config"
      name="Antimatter"
    />
  </button>
</template>

<style scoped>

</style>
