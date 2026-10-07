<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitTheCurseModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `真以为你能逃离我的掌心？再想想吧。一切都在我的计划之中，你永远别想逃脱。你将永远留在此地，长囚于此万世不出！接受你的命运吧。`;
    },
    entranceLabel() {
      return `自由是一场幻梦`;
    }
  },
  methods: {
    handleYesClick() {
      player.celestials.slabdrill.isGoodbye = true;
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <template #confirm-text>
      我已比你强大
    </template>
  </ModalWrapperChoice>
</template>
