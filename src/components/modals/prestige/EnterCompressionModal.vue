<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterCompressionModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `时间压缩将开启新的终局。前三种维度和计数频率的指数，将基于反物质和在压缩中经过的时间获得指数削弱。若能在压缩期间完成无限，你的霍金辐射将基于最高反物质及升级倍率提升。`;
    },
    entranceLabel() {
      return `你将要进入时间压缩`;
    }
  },
  methods: {
    handleYesClick() {
      if (player.compression.active) return;
      Endgame.resetNoReward();
      clearCelestialRuns();
      player.compression.active = true;
      recalculateAllGlyphs();
      Tab.dimensions.antimatter.show(false);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="compression"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <template #confirm-text>
      进入
    </template>
  </ModalWrapperChoice>
</template>
