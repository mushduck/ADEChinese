<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "PerkShopUpgradeButton",
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
      isCharged: false,
      otherCurr: false,
      displayEffect: false,
      chargesLeft: 0,
      viewingCharge: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    classObject() {
      return {
        "o-teresa-shop-button": true,
        "o-teresa-shop-button--available": ((this.isAvailableForPurchase && !this.isCapped) ||
          (this.chargesLeft > 0 && !this.isCharged)) && !(this.viewingCharge && this.chargesLeft <= 0),
        "o-teresa-shop-button--capped": (this.isCapped && !this.viewingCharge) || this.isCharged,
        "o-teresa-shop-button--pelle-disabled": (this.isDoomed && !PelleDestructionUpgrade.teresaShop.isBought) &&
          (this.upgrade === PerkShopUpgrade.musicGlyph || this.upgrade === PerkShopUpgrade.fillMusicGlyph)
      };
    },
    effectConfig() {
      const upgrade = this.upgrade;
      return {
        effect: () => upgrade.chargedValue(),
        formatEffect: upgrade.config.formatEffect
      };
    },
  },
  methods: {
    update() {
      this.isAvailableForPurchase = this.upgrade.isAvailableForPurchase;
      this.isCapped = this.upgrade.isCapped;
      this.isCharged = this.upgrade.isCharged;
      this.otherCurr = (this.upgrade === PerkShopUpgrade.addCharges);
      this.displayEffect = this.upgrade.displayEffect;
      this.chargesLeft = Teresa.chargesLeft;
      this.viewingCharge = this.upgrade.viewCharge;
    },
    performActions() {
      if (!this.viewingCharge) this.upgrade.purchase();
      if (this.viewingCharge && this.chargesLeft > 0) this.upgrade.charge();
    },
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      @click="performActions"
    >
      <DescriptionDisplay
        :config="upgrade.config"
        :length="70"
      />
      <EffectDisplay
        v-if="displayEffect"
        br
        :config="effectConfig"
      />
      <CostDisplay
        v-if="!isCapped && !viewingCharge"
        br
        :config="upgrade.config"
        :name="otherCurr ? 'Celestial Point' : 'Perk Point'"
      />
    </button>
  </div>
</template>

<style scoped>
.o-teresa-shop-button--pelle-disabled {
  text-decoration: line-through;
  cursor: auto;
}
</style>
