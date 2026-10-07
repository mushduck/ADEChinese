<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "HardResetModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      input: ""
    };
  },
  computed: {
    willHardReset() {
      return this.input === "如果这样的话，会一直看不到明天的哦？就算那样也不错。";
    },
    hasExtraNG() {
      return player.records.fullGameCompletions > 0;
    },
    hasSpeedrun() {
      return player.speedrun.isUnlocked;
    }
  },
  destroyed() {
    if (this.willHardReset) SecretAchievement(38).unlock();
  },
  methods: {
    hardReset() {
      if (this.willHardReset) GameStorage.hardReset();
      this.input = "";
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!willHardReset"
    :show-confirm="willHardReset"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-hard-reset-btn"
    @confirm="hardReset"
  >
    <template #header>
      重置游戏
    </template>
    <div class="c-modal-message__text">
      请确认是否硬重置本存档槽位。
      <span class="c-modal-hard-reset-danger">删除存档不会解锁任何隐藏内容。</span>
      输入“如果这样的话，会一直看不到明天的哦？就算那样也不错。”以确认。
      <div class="c-modal-hard-reset-danger">
        这将清除你的存档！
        <span v-if="hasExtraNG">
          <br>
          这也会移除你通过完成游戏解锁的所有符文皮肤！
        </span>
        <span v-if="hasSpeedrun">
          <br>
          你将失去速通资格。若要重新开始速通，请使用"Start Speedrun"按钮。
        </span>
      </div>
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-hard-reset__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-hard-reset-info">
      <div
        v-if="willHardReset"
        class="c-modal-hard-reset-danger"
      >
        短语已确认——继续操作将不可逆删除你的存档！
      </div>
      <div v-else>
        输入正确的短语以重置游戏。
      </div>
    </div>
    <template #confirm-text>
      重置游戏
    </template>
  </ModalWrapperChoice>
</template>
