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
      ENTER USERNAME
    </template>
    <div class="c-modal-message__text">
      Please confirm your username.
      <span class="c-modal-username-danger">You can only choose your username once.</span>
      Type in your desired username to confirm.
      <div class="c-modal-username-danger">
        THIS ACTION IS IRREVERSIBLE
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
        Username confirmed - are you sure this is your desired username?
      </div>
      <div v-else>
        Please type something.
      </div>
    </div>
    <template #confirm-text>
      CONFIRM
    </template>
  </ModalWrapperChoice>
</template>
