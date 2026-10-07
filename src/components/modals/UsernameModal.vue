<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UsernameModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      hasSeenModal: false,
      input: "",
      username: ""
    };
  },
  computed: {
    notEmpty() {
      return this.input !== "";
    },
  },
  methods: {
    saveUsername() {
      if (this.notEmpty) this.username = this.input;
      if (this.notEmpty) player.username = this.username;
      if (this.notEmpty) this.hasSeenModal = true;
      this.input = "";
      player.options.hasSeenUsernameModal = this.hasSeenModal;
      if (player.options.hasSeenUsernameModal) player.introFrozen = false;
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!notEmpty"
    :show-confirm="notEmpty"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-username-btn"
    @confirm="saveUsername"
  >
    <template #header>
      输入你的名字：
    </template>
    <div class="c-modal-message__text">
      请确认你的名字。
      <span class="c-modal-username-danger">你仅能选择一次名字。</span>
      在此输入你喜欢的名字。
      <div class="c-modal-username-danger">
        此操作无法撤销！
      </div>
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-username__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-username-info">
      <div
        v-if="notEmpty"
        class="c-modal-username-danger"
      >
        名字已确认——你确定这是你喜欢的名字吗？
      </div>
      <div v-else>
        输入点啥...
      </div>
    </div>
    <template #confirm-text>
      确认
    </template>
  </ModalWrapperChoice>
</template>
