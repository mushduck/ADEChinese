<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpeedrunModeModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
  },
  data() {
    return {
      onInfoPage: true,
      name: "",
      confirmPhrase: "",
    };
  },
  computed: {
    willStartRun() {
      return this.confirmPhrase === "Gotta Go Fast!";
    },
  },
  methods: {
    nextPage() {
      this.onInfoPage = false;
    },
    startRun() {
      if (!this.willStartRun) return;
      this.emitClose();
      Speedrun.prepareSave(Speedrun.generateName(this.name));
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!onInfoPage && !willStartRun"
    :show-confirm="!onInfoPage && willStartRun"
    confirm-class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
    @confirm="startRun"
  >
    <template #header>
      进入速通模式
    </template>
    <div
      v-if="onInfoPage"
      class="c-modal-message__text"
    >
      新建的速通存档能提供到达特定进度的统计跟踪信息，这些信息将在屏幕右下角和专用的统计页面中显示。
      <br>
      <br>
      几乎所有的动画和确认项目都是默认禁用的，不过你可以在达到特定进度后改变这些设置。进入速通模式后，游戏将在你的反物质发生变化之前保持暂停，此时你能在开始速通之前修改各项设置。你将直接获得一些成就，因此你不需要等待很久来开始速通。
      <br>
      <br>
      <i>
        速通模式中不会出现新的游戏内容。
      </i>
      <br>
      <br>
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
        @click="nextPage"
      >
        继续
      </PrimaryButton>
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      你可以在下面的文本框中重命名该速通存档。 这不会对游戏产生任何影响，只是为了声明这个存档是你玩出来的。 若未进行重命名，游戏将随机命名该速通存档。只要计时器还没开始，就可以通过点击速通信息框中来更改名称。
      <input
        ref="name"
        v-model="name"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      >
      <br>
      <br>
      速通存档可以像常规存档一样导入和导出。你可以通过导入导出存档，来优化各个阶段的用时。在导入速通存档之后，该速通存档将被标记为“分段速通”。如果你不使用这个方法进行速通，该速通存档将始终被标记为“单段速通”。
      <br>
      <br>
      在开始速通之前，你可以在选项标签页中按需修改符文种子。
      <br>
      <br>
      <div class="c-modal-hard-reset-danger">
        启动速通模式后，你将回到游戏的初始状态，同时保留部分游戏内容，包括但不限于：游戏通关统计、显示效果设置、自动机脚本和符文皮肤。除此之外，游戏将会和你刚通关、看完制作人员列表、选择重新开始之后那样，重新开始。你需要输入 Gotta Go Fast! 来确认，然后（重新）开始游戏。
      </div>
      <input
        ref="confirmPhrase"
        v-model="confirmPhrase"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      >
    </div>
    <template #confirm>
      开始速通！
    </template>
    <template #cancel>
      取消
    </template>
  </ModalWrapperChoice>
</template>