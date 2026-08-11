<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UiChoiceModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    listEntries() {
      return [
        "众多游戏事件现已加入动画效果。若影响性能或操作，可在视觉效果选项标签页中禁用。",
        "新版确认窗口已替代默认JavaScript弹窗，可在游戏玩法选项标签页中关闭。",
        "游戏采用全新流线型布局，融入现代设计理念。"
      ];
    }
  },
  methods: {
    handleYesClick() {
      GameOptions.toggleUI();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      视效改变
    </template>
    <div class="c-modal-message__text">
      检测到您加载了旧版存档；自旧版本以来我们已进行多项视觉优化：
      <br>
      <br>
      <div class="c-visual-change-list">
        <div
          v-for="(entry, i) in listEntries"
          :key="i"
          class="c-visual-change-list-entry"
        >
          <b>&bull;</b>
          {{ entry }}
        </div>
      </div>
      <br>
      <br>
      你可以随时在视觉效果选项标签页中切换经典UI（旧版游戏界面）与现代UI（新版界面）。是否立即切换至现代UI？
    </div>
    <template #cancel-text>
      保持不变
    </template>
    <template #confirm-text>
      切换
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-visual-change-list {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}

.c-visual-change-list-entry {
  display: flex;
  margin-bottom: 0.5rem;
  gap: 1rem;
}
</style>
