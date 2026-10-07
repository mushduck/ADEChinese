<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "RealityWarpModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isWarping: false
    };
  },
  computed: {
    topLabel() {
      if (!this.isWarping) return `你将要进入佩勒的领域`;
      return `你将要诅咒你的现实`;
    },
    message() {
      if (!this.isWarping) return `进入佩勒的领域将强制进行一次终局重置，并解锁一层新的游戏内容。`;
      return `诅咒你的现实将强制进行一次终局重置，并禁用迄今为止几乎的游戏内容。你无法离开被诅咒的现实。`;
    }
  },
  methods: {
    update() {
      this.isWarping = player.celestials.slabdrill.isWarping;
    },
    handleYesClick() {
      player.celestials.slabdrill.isWarping = true;
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
