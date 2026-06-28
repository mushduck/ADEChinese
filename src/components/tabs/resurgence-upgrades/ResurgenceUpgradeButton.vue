<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import HintText from "@/components/HintText";

export default {
  name: "ResurgenceUpgradeButton",
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
      canBeBought: false,
      isBought: false,
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "c-resurgence-upgrade-btn--bought": this.isBought,
        "c-resurgence-upgrade-btn--unavailable": !this.isBought && !this.canBeBought
      };
    },
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.canBeBought = upgrade.canBeBought;
      this.isBought = upgrade.isBought;
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      class="l-resurgence-upgrade-btn c-resurgence-upgrade-btn"
      @click="upgrade.purchase()"
    >
      <HintText
        type="resurgenceUpgrades"
        class="l-hint-text--resurgence-upgrade c-hint-text--resurgence-upgrade"
      >
        {{ config.name }}
      </HintText>
      <span>
        <DescriptionDisplay :config="config" />
        <template>
          <EffectDisplay
            :config="config"
            br
          />
          <CostDisplay
            v-if="!isBought"
            :config="config"
            br
            name="Divine Energy"
          />
        </template>
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
