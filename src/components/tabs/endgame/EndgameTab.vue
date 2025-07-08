<script>
  this.endgames = player.records.fullGameCompletions;
</script>

<template>
  <div class="endgame-nyi">
    You aren't supposed to be here...
    <br>
    UPDATE IN 5 HOURS
    <br>
    You have reached Endgame {{ quantifyInt("time", this.endgames) }}.
  </div>
</template>

<style scoped>
.endgame-nyi {
  width: 50rem;
  padding: 0.5rem;
  font-size: 2.4rem;
  color: var(--color-endgame);
  background: black;
}
</style>
