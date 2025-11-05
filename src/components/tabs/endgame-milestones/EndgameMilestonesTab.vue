<script>
import EndgameMilestoneButton from "./EndgameMilestoneButton";

export default {
  name: "EndgameMilestonesTab",
  components: {
    EndgameMilestoneButton
  },
  data() {
    return {
      endgameCount: 0,
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.endgame.milestones)
        .sort((a, b) => a.endgames - b.endgames)
        .map(config => new EndgameMilestoneState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length / 3);
    }
  },
  methods: {
    update() {
      this.endgameCount = Currency.endgames.value.floor();
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) * 3 + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-endgame-milestone-grid">
    <div>You have {{ quantify("Endgame", endgameCount, 3) }}.</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-endgame-milestone-grid__row"
    >
      <EndgameMilestoneButton
        v-for="column in 3"
        :key="row * 3 + column"
        :get-milestone="getMilestone(row, column)"
        class="l-endgame-milestone-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
