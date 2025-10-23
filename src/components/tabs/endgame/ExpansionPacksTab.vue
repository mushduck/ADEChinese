<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ExpansionPacksTab",
  components: {
    PrimaryButton,
  },
  data() {
    return {
      isUnlocked: false,
      isUnlockAffordable: false,
      unlockCost: new Decimal(),
    };
  },
  computed: {
    classObject() {
      return {
        "o-primary-btn--expansion-packs-unlock": true,
        "o-primary-btn--expansion-packs-unlock--bought": this.isUnlocked,
        "o-primary-btn--expansion-packs-unlock--available": !this.isUnlocked && this.isUnlockAffordable,
        "o-primary-btn--expansion-packs-unlock--unavailable": !this.isUnlocked && !this.isUnlockAffordable,
      };
    }
  };
  methods: {
    update() {
      //this.isUnlocked = ExpansionPacks.areUnlocked;
      //PrimaryButton onclick="ExpansionPacks.unlock();"
      this.unlockCost = Math.pow(2, 64);
      if (!this.isUnlocked) {
        this.isUnlockAffordable = player.galaxies >= this.unlockCost;
        return;
      }
    }
  },
};
</script>

<template>
  <div class="l-expansion-packs-tab">
    <br>
    <PrimaryButton
      v-if="!isUnlocked"
      :enabled="isUnlockAffordable"
      :class="classObject"
    >
      Unlock Expansion Packs
      <br>
      Cost: {{ format(unlockCost, 2, 3) }} Galaxies
    </PrimaryButton>
  </div>
</template>
