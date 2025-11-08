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
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 9rem;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family: Typewriter;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-endgame);
  border-radius: var(--var-border-radius, 0.4rem);
  box-shadow: inset 0 0 1rem 0.1rem var(--color-endgame);
  margin: 0.6rem 0.55rem;
  padding: 1rem;
  cursor: pointer;
}

.c-primary-btn--expansion-packs-unlock:hover {
  box-shadow: inset 0 0 2rem 0.1rem var(--color-pelle--base);
  transition-duration: 0.3s;
}

.c-primary-btn--expansion-packs-unlock--unavailable {
  color: var(--color-pelle--base);
  background: black;
}

.c-primary-btn--expansion-packs-unlock--unavailable:hover {
  color: black;
  background: var(--color-endgame);
}

.c-primary-btn--expansion-packs-unlock--available {
  color: var(--color-endgame);
  background: black;
}

.c-primary-btn--expansion-packs-unlock--available:hover {
  color: var(--color-pelle--secondary);
  background: linear-gradient(var(--color-endgame), var(--color-pelle--base));
}

.c-primary-btn--expansion-packs-unlock--bought {
  color: black;
  background: linear-gradient(var(--color-endgame), var(--color-pelle--base));
  box-shadow: inset 0 0 2rem 0.1rem var(--color-pelle--secondary);
  transition-duration: 0.3s;
}
</style>
