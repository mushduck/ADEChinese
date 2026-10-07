<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitCursedCoreModal",
  components: {
    ModalWrapperChoice
  },
  methods: {
    update() {
      if (!player.celestials.slabdrill.core.isActive) this.emitClose();
    },
    handleYesClick() {
      if (!player.celestials.slabdrill.core.isActive) return;
      Slabdrill.exitCore();
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
      <span>
        你将要离开炼狱
      </span>
    </template>
    <div class="c-modal-message__text">
      <span>
        离开炼狱将不会获得任何混沌核心。
      </span>
      <br>
      你真的要这么做吗？
    </div>
    <template #confirm-text>
      放我出去
    </template>
  </ModalWrapperChoice>
</template>
