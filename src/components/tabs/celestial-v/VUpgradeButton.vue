<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "VUpgradeButton",
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
      isAvailableForPurchase: false,
      isCapped: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-v-upgrade": true,
        "o-v-upgrade--available": this.isAvailableForPurchase && !this.isCapped,
        "o-v-upgrade--capped": this.isCapped
      };
    },
  },
  methods: {
    update() {
      this.isAvailableForPurchase = this.upgrade.isAvailableForPurchase;
      this.isCapped = this.upgrade.isCapped;
    },
    purchase() {
      this.upgrade.purchase();
    },
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      @click="purchase"
    >
      <DescriptionDisplay
        :config="upgrade.config"
        :length="70"
      />
      <EffectDisplay
        :config="upgrade.config"
      />
      <CostDisplay
        v-if="!isCapped"
        :config="upgrade.config"
        name="Celestial Point"
      />
    </button>
  </div>
</template>

<style scoped>

</style>
