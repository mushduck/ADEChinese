<script>
export default {
  name: "EndgameTab",
  methods: {
    update() {
      this.endgames = player.records.fullGameCompletions;
    }
  },
};
</script>

<template>
  <div class="endgame-nyi">
    <div>
      You aren't supposed to be here...
    </div>
    <div>
      UPDATE IN 5 HOURS
    </div>
    <div>
      You have reached Endgame {{ quantifyInt("time", endgames) }}.
    </div>
  </div>
</template>

<style scoped>
.endgame-nyi {
  height: 15rem;
  color: var(--color-endgame);
}
</style>
