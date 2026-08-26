<script>
import PrimaryButton from "@/components/PrimaryButton";
import ExpansionPacksContainer from "./ExpansionPacksContainer";

export default {
  name: "ExpansionPacksTab",
  components: {
    PrimaryButton,
    ExpansionPacksContainer
  },
  data() {
    return {
      isUnlocked: false,
      isUnlockAffordable: false,
      unlockCost: new Decimal(),
      nextPack: 0
    };
  },
  computed: {
    grid() {
      return [
        [
          ExpansionPack.teresaPack
        ],
        [
          ExpansionPack.effarigPack
        ],
        [
          ExpansionPack.enslavedPack
        ],
        [
          ExpansionPack.vPack
        ],
        [
          ExpansionPack.raPack
        ],
        [
          ExpansionPack.laitelaPack
        ],
        [
          ExpansionPack.pellePack
        ],
        [
          ExpansionPack.alphaPack
        ]
      ];
    },
    nextAtDisplay() {
      const first = this.nextPack?.id === "teresaPack";
      const next = ExpansionPacks.nextPackUnlockAM;
      const alpha = DivinityMilestone.hadronEmpowerment.isReached && this.nextPack?.id === "alphaPack";
      const alphaLock = !DivinityMilestone.hadronEmpowerment.isReached && this.nextPack?.id === "alphaPack";

      if (first) return `第一个天神扩展包于 ${format(next)} 反物质解锁。`;
      if (alpha && !Pelle.isDoomed) return `达到 ${format(next)} 反物质以解锁下一个天神扩展包。`;
      if (alpha && Pelle.isDoomed) return `下一个天神扩展包必须在被毁灭的现实外购买。`;
      return (next === undefined || alphaLock)
        ? "已解锁全部天神扩展包"
        : `达到 ${format(next)} 反物质以解锁下一个天神扩展包。`;
    },
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
      this.isUnlocked = ExpansionPacks.areUnlocked;
      this.unlockCost.copyFrom(Decimal.pow(2, 64));
      if (!this.isUnlocked) {
        this.isUnlockAffordable = player.galaxies.add(GalaxyGenerator.galaxies).gte(this.unlockCost);
        return;
      }
      this.nextPack = ExpansionPacks.nextPack;
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
      onclick="ExpansionPacks.unlock();"
    >
      解锁天神扩展包
      <br>
      价格: {{ format(unlockCost, 2, 3) }} 星系
    </PrimaryButton>
    <div v-if="isUnlocked">
      <div
        v-for="(row, i) in grid"
        :key="i"
        class="l-expansion-packs-grid__row"
      >
        <ExpansionPacksContainer
          v-for="pack in row"
          :key="pack.id"
          :pack="pack"
          class="l-expansion-packs-grid__cell"
        />
      </div>
      <div>
        <span class="c-expansion-packs-next-text">{{ nextAtDisplay }}</span>
      </div>
    </div>
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
  cursor: pointer;
}

.c-primary-btn--expansion-packs-unlock--bought {
  color: black;
  background: linear-gradient(var(--color-endgame), var(--color-pelle--base));
  box-shadow: inset 0 0 2rem 0.1rem var(--color-pelle--secondary);
  transition-duration: 0.3s;
}

.l-expansion-packs-grid__row {
  display: flex;
  flex-direction: row;
}

.l-expansion-packs-grid__cell {
  margin: 0.5rem 0.8rem;
}

.c-expansion-packs-next-text {
  color: var(--color-endgame);
  font-size: 2rem;
  font-weight: bold;
}
</style>
