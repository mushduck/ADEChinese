<script>
import wordShift from "@/core/word-shift";
  
import PelleRift from "./PelleRift";

export default {
  name: "PelleBarPanel",
  components: {
    PelleRift
  },
  data() {
    return {
      decayRate: 0,
      isCollapsed: false,
      time: 0,
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    strikes() {
      return PelleStrikes.all;
    }
  },
  methods: {
    update() {
      this.decayRate = Pelle.riftDrainPercent;
      this.isCollapsed = player.celestials.pelle.collapsed.rifts;
      this.time = Date.now();
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.rifts = !this.isCollapsed;
    },
    sickVisualStrikeText() {
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 0) {
        return `Pelle Strike penalties are permanent and remain active even after Armageddon!`;
      }
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 1) {
        return this.time % 2500 > 500 ? `Pelle Strike penalties are permanent and remain active even after Armageddon!` : wordShift.randomCrossWords("Pelle Strike penalties are permanent and remain active even after Armageddon!");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 2) {
        return this.time % 2500 > 1000 ? `Pelle Strike penalties are permanent and remain active even after Armageddon!` : wordShift.randomCrossWords("Pelle Strike penalties are permanent and remain active even after Armageddon!");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 3) {
        return this.time % 2500 > 1500 ? `Pelle Strike penalties are permanent and remain active even after Armageddon!` : wordShift.randomCrossWords("Pelle Strike penalties are permanent and remain active even after Armageddon!");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 4) {
        return this.time % 2500 > 2000 ? `Pelle Strike penalties are permanent and remain active even after Armageddon!` : wordShift.randomCrossWords("Pelle Strike penalties are permanent and remain active even after Armageddon!");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.isBought).length === 5) {
        return this.time % 2500 > 2400 ? `We will meet again...` : wordShift.randomCrossWords("We will meet again...");
      }
    }
  }
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      <i
        :class="collapseIcon"
        class="c-collapse-icon-clickable"
        @click="toggleCollapse"
      />
      Pelle Strikes and Rifts
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
    >
      Rifts can be activated by clicking on their bars.
      <span v-if="strikes.length > 1">You cannot activate more than two Rifts at once.</span>
      <br v-else>
      When active, Rifts consume {{ formatPercents(decayRate) }} of another resource per second.
      <br>
      Rift effects apply even when not activated, and are based on the total amount drained.
      <b class="o-strike-warning">{{ sickVisualStrikeText() }}</b>
      <div class="c-pelle-bar-container">
        <PelleRift
          v-for="strike in strikes"
          :key="strike.config.id"
          :strike="strike"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-collapse-icon-clickable {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 3rem;
  align-content: center;
  transform: translateY(-50%);
  cursor: pointer;
}

.c-pelle-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.o-strike-warning {
  color: var(--color-pelle--base);
  font-size: 1.4rem;
}
</style>
