<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ResetEndgameModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    endgameState: {
      type: String,
      required: true,
    },
    suggestion: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isDoomed: false,
      canEndgame: false,
    };
  },
  computed: {
    resetTerm() { return "Endgame"; },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.canEndgame = isEndgameAvailable();
    },
    handleYesClick() {
      Endgame.resetNoReward();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="resetEndgame"
    @confirm="handleYesClick"
  >
    <template #header>
      You are about to reset your {{ resetTerm }}
    </template>
    <div class="c-modal-message__text">
      This will reset you to the start of your {{ resetTerm }},
      giving you no rewards from your progress in your current {{ resetTerm }}.
      <br>
      <br>
      Are you sure you want to do this?
      <br>
      Currently, you are {{ endgameState }}. Based on the current state of your Endgame,
      it is suggested that you {{ suggestion }}.
      <br>
    </div>
    <template #confirm-text>
      Reset
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>

</style>
