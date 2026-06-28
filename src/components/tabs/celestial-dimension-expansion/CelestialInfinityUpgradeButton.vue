<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "CelestialInfinityUpgradeButton",
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
      isAffordable: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-celestial-infinity-upgrade": true,
        "o-celestial-infinity-upgrade--bought": this.isBought,
        "o-celestial-infinity-upgrade--available": !this.isBought && this.isAffordable,
        "o-celestial-infinity-upgrade--unavailable": !this.isBought && !this.isAffordable
      };
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isBought = upgrade.isBought || upgrade.isCapped;
      this.isAffordable = upgrade.isAffordable;
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="upgrade.purchase()"
  >
    <DescriptionDisplay :config="upgrade.config" />
    <EffectDisplay
      br
      :config="upgrade.config"
    />
    <CostDisplay
      v-if="!isBought"
      br
      :config="upgrade.config"
      name="Celestial Infinity Point"
    />
  </button>
</template>

<style scoped>

</style>
