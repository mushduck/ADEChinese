<script>
  this.endgames = player.records.fullGameCompletions;
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
      You have reached Endgame {{ quantifyInt("time", this.endgames) }}.
    </div>
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
