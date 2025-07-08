<script>
  this.endgames = player.progress.fullGameCompletions;
</script>

<template>
  <div class="endgame-nyi">
    You aren't supposed to be here...
    <br>
    UPDATE IN 5 HOURS
    <br>
    You have reached Endgame {{ formatInt(endgames) }} times.
  </div>
</template>

<style>
  .endgame-nyi {
    width: 50rem;
    padding: 0.5rem;
    font-size: 2.4rem;
    color: var(--color-endgame);
    background: black;
    border: var(--var-border-width, 0.2rem) solid var(--color-endgame);
    border-radius: var(--var-border-radius, 0.5rem);
  }
</style>
