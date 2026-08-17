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
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 0) {
        return `佩勒冲击的削弱永久存在，不受末日重置影响！`;
      }
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 1) {
        return this.time % 2500 > 500 ? `佩勒冲击的削弱永久存在，不受末日重置影响！` : wordShift.randomCrossWords("佩勒冲击的削弱永久存在，不受末日重置影响！");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 2) {
        return this.time % 2500 > 1000 ? `佩勒冲击的削弱永久存在，不受末日重置影响！` : wordShift.randomCrossWords("佩勒冲击的削弱永久存在，不受末日重置影响！");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 3) {
        return this.time % 2500 > 1500 ? `佩勒冲击的削弱永久存在，不受末日重置影响！` : wordShift.randomCrossWords("佩勒冲击的削弱永久存在，不受末日重置影响！");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 4) {
        return this.time % 2500 > 2000 ? `佩勒冲击的削弱永久存在，不受末日重置影响！` : wordShift.randomCrossWords("佩勒冲击的削弱永久存在，不受末日重置影响！");
      }
      if (PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length === 5) {
        return this.time % 2500 > 2400 ? `我们还会再见面的...` : wordShift.randomCrossWords("我们还会再见面的...");
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
      佩勒冲击和裂痕
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
    >
      点击裂痕的填充条，可以填充裂痕
      <span v-if="strikes.length > 1">你不能同时填充超过两个裂痕。</span>
      <br v-else>
      填充裂痕时，每秒消耗对应资源的 {{ formatPercents(decayRate) }}。未填充裂痕时，裂痕的效果仍然生效，效果的强度基于已填充的资源总量。
      <br>
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
