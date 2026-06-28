<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import HintText from "@/components/HintText";

export default {
  name: "DivinityUpgradeButton",
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
      isSecond: false,
      isThird: false
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "c-divinity-upgrade-btn--bought": this.isBought,
        "c-divinity-upgrade-btn--unavailable": !this.isBought && !this.canBeBought
      };
    },
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.canBeBought = upgrade.canBeBought;
      this.isBought = upgrade.isBought || upgrade.isCapped;
      this.isSecond = upgrade.config.layer === 2 || upgrade.config.layer === 3;
      this.isThird = upgrade.config.layer === 4 || upgrade.config.layer === 5;
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      class="l-divinity-upgrade-btn c-divinity-upgrade-btn"
      @click="upgrade.purchase()"
    >
      <HintText
        type="divinityUpgrades"
        class="l-hint-text--divinity-upgrade c-hint-text--divinity-upgrade"
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
            :name="isThird ? 'Nebula' : (isSecond ? 'Divine Star' : 'Divine Matter')"
          />
        </template>
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
