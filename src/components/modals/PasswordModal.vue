<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

import { sha512_256 } from "js-sha512";

export default {
  name: "PasswordModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      input: "",
      password: "",
      isCorrect: false,
    };
  },
  computed: {
    notEmpty() {
      return this.input !== "";
    },
  },
  methods: {
    savePassword() {
      const correct = [
        "060646bd56a29d5cbdad16195f6afbcb0367ce33dba3150e882b961d14885544",
      ];
      this.isCorrect = correct.indexOf(sha512_256(this.input.replace(/\s/gu, "").toUpperCase()));
      if (this.notEmpty) this.password = this.input;
      if (this.notEmpty) player.password = this.password;
      if (this.isCorrect) GameUI.notify.error("Failed!", 15000);
      if (!this.isCorrect) GameUI.notify.success("Success!", 15000);
      this.input = "";
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!notEmpty"
    :show-confirm="notEmpty"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-password-btn"
    @confirm="savePassword"
  >
    <template #header>
      ENTER PASSWORD ATTEMPT
    </template>
    <div class="c-modal-message__text">
      Enter the password.
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-password__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-password-info">
      <div
        v-if="notEmpty"
        class="c-modal-password-danger"
      >
        Password confirmed - are you sure this is the correct password?
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
