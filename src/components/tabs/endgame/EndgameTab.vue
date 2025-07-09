<script>
export default {
  name: "EndgameTab",
  data() {
    return {
      realTimePlayed: TimeSpan.zero,
    }
  },
  methods: {
    update() {
      const records = player.records;
      this.endgames = player.records.fullGameCompletions;
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.updateTimer = TimeSpan.fromMilliseconds(18000000/(1+(records.realTimePlayed/18000000)));
    }
  },
};
</script>

<template>
  <div class="endgame-nyi">
    <br>
    <div>
      You aren't supposed to be here...
    </div>
    <br>
    <div>
      UPDATE IN {{ updateTimer }}.
    </div>
    <br>
    <div>
      You have reached Endgame {{ quantifyInt("time", endgames) }}.
    </div>
  </div>
</template>

<style scoped>
.endgame-nyi {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-endgame);
}
</style>
