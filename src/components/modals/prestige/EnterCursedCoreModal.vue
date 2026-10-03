<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterCursedCoreModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `进入炼狱将重置除反物质和反物质维度以外的一切。在炼狱中，反物质可以提高猎得混沌核心的概率。`;
    },
    entranceLabel() {
      return `你将要进入炼狱`;
    }
  },
  methods: {
    handleYesClick() {
      if (player.celestials.slabdrill.core.isActive) return;
      Slabdrill.enterCore();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="cursedCore"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <template #confirm-text>
      我不认输
    </template>
  </ModalWrapperChoice>
</template>
