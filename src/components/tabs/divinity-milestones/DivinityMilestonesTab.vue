<script>
import DivinityMilestoneButton from "./DivinityMilestoneButton";

export default {
  name: "DivinityMilestonesTab",
  components: {
    DivinityMilestoneButton
  },
  data() {
    return {
      divinityCount: 0,
      showNewFeature: false
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.celestials.divinityMilestones)
        .sort((a, b) => a.divinities - b.divinities)
        .map(config => new DivinityMilestoneState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length);
    }
  },
  methods: {
    update() {
      this.divinityCount = Math.floor(Currency.divinities.value);
      this.showNewFeature = this.divinityCount >= 10 && this.divinityCount < 13;
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-divinity-milestone-grid">
    <div class="o-divinity-amount">你进行了 {{ quantify("次神性", divinityCount, 3) }}。</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-divinity-milestone-grid__row"
    >
      <DivinityMilestoneButton
        v-for="column in 1"
        :key="row + column"
        :get-milestone="getMilestone(row, column)"
        class="l-divinity-milestone-grid__cell"
      />
    </div>
    <div v-if="showNewFeature">
      <span class="o-divinity-amount">达到 {{ formatInt(13) }} 次神性以解锁Universe。</span>
    </div>
  </div>
</template>

<style scoped>
.o-divinity-amount {
  color: var(--color-pelle--base);
}
</style>
