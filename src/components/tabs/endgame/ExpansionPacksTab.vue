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
        "c-primary-btn--expansion-packs-unlock": true,
        "c-primary-btn--expansion-packs-unlock--bought": this.isUnlocked,
        "c-primary-btn--expansion-packs-unlock--available": !this.isUnlocked && this.isUnlockAffordable,
        "c-primary-btn--expansion-packs-unlock--unavailable": !this.isUnlocked && !this.isUnlockAffordable,
      };
    }
  },
  methods: {
    update() {
      //this.isUnlocked = ExpansionPacks.areUnlocked;
      //PrimaryButton onclick="ExpansionPacks.unlock();"
      this.unlockCost = Math.pow(2, 64);
      if (!this.isUnlocked) {
        this.isUnlockAffordable = player.galaxies + GalaxyGenerator.galaxies >= this.unlockCost;
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

<style scoped>
.c-primary-btn--expansion-packs-unlock {
  width: 20rem;
  height: 8rem;
  font-family: Typewriter, serif;
  font-size: 1rem;
  font-weight: bold;
  border: 0.1rem solid linear-gradient(var(--color-endgame), var(--color-pelle--base));
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
  cursor: pointer;
}

.c-primary-btn--expansion-packs-unlock--unavailable {
  color: #181818;
  background-color: #5f5f5f;
}

.c-primary-btn--expansion-packs-unlock--unavailable:hover {
  background-color: #737373;
}

.c-primary-btn--expansion-packs-unlock--available {
  color: linear-gradient(var(--color-endgame), var(--color-pelle--base));
  background-color: black;
}

.c-primary-btn--expansion-packs-unlock--available:hover {
  color: var(--color-text);
  background-color: linear-gradient(var(--color-endgame), var(--color-pelle--base));
}

.c-primary-btn--expansion-packs-unlock--bought {
  color: black;
  background-color: linear-gradient(var(--color-endgame), var(--color-pelle--base));
  border-color: black;
}
</style>
