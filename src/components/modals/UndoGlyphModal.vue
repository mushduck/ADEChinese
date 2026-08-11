<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UndoGlyphModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      showStoredGameTime: false,
    };
  },
  methods: {
    update() {
      this.showStoredGameTime = Enslaved.isUnlocked;
    },
    realityInvalidate() {
      this.emitClose();
      Modal.message.show("必须进行现实才能卸下符文！",
        { closeEvent: GAME_EVENT.REALITY_RESET_AFTER });
    },
    handleYesClick() {
      this.emitClose();
      Glyphs.undo();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphUndo"
    @confirm="handleYesClick"
  >
    <template #header>
      你将要卸下一个已装备的符文
    </template>
    <div
      class="c-modal-message__text c-text-wrapper"
    >
      你将卸下在当前现实中安装的最后一个符文。本次现实将重新开始，不过部分游戏内资源的数量将回滚到安装最后一个符文时的数值：
      <div class="c-text-wrapper">
        <br>- 反物质、无限点数、永恒点数
        <br>- 膨胀升级、超光速粒子、膨胀时间
        <br>- 时间之理、永恒挑战完成次数
        <br>- 时间维度和现实的解锁状态
        <br>- 无限/永恒/现实后经历的时间
        <span v-if="showStoredGameTime"><br>- 储存的游戏时间</span>
      </div>
      <br>
      请注意，如果你使某些成就或升级的特殊要求无效（例如完成一个不产生反物质的现实成就），即使撤销之后，它们仍将保持无效。在这些情况下，你需要在单次现实中完成条件而不使用撤销符文。
    </div>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-text-wrapper {
  text-align: left;
}
</style>