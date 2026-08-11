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
    resetTerm() { return "终局"; },
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
      你即将重置{{ resetTerm }}
    </template>
    <div class="c-modal-message__text">
      此操作将重置本次{{ resetTerm }}，并且你不会从当前{{ resetTerm }}的进度中获得任何奖励。
      <br>
      <br>
      你确定要重置吗？
      <br>
      当前你的终局 {{ endgameState }}。根据当前的终局状态，建议你{{ suggestion }}。
      <br>
    </div>
    <template #confirm-text>
      重置
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>

</style>
