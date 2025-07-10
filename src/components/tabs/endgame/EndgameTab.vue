<script>
  this.endgames = player.records.fullGameCompletions;
</script>

<template>
  <div class="endgame-nyi">
    <br>
    <div>
      You aren't supposed to be here...
    </div>
    <br>
    <div>
      UPDATE IN 05:00:00.
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
