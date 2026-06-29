<script>
import ResetEndgameButton from "./ResetEndgameButton";
export default {
  name: "EndgameTab",
  components: {
    ResetEndgameButton
  }
};
</script>

<template>
  <div class="l-endgame-tab-container">
    <div class="endgame-text">
      <br>
      <div>
      <b>
        Welcome to Endgame
      </b>
      </div>
      <br>
      <div>
        Feel free to look around! You've just unlocked a new Prestige Layer!
      </div>
      <br>
      <div>
        And don't worry about Pelle. I'm sure he's dead... right?
      </div>
      <br>
      <div>
        Eh, whatever. We've got more important things to worry about.
      </div>
      <br>
      <div>
        Why don't you go ahead and get started?
      </div>
    </div>
    <br>
    <div class="l-endgame-button-column">
      <div>
        <ResetEndgameButton/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.endgame-text {
  font-size: 2rem;
  color: var(--color-endgame);
}

.l-endgame-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
