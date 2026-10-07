<script>
export default {
  name: "ModalConfirmationCheck",
  props: {
    option: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      setting: true
    };
  },
  computed: {
    confirmation() {
      return ConfirmationTypes[this.option];
    },
    confirmationClass() {
      return {
        "c-modal__confirmation-toggle__checkbox": true,
        "c-modal__confirmation-toggle__checkbox--active": !this.setting
      };
    },
    tooltipText() {
      return `${this.setting ? "关闭" : "开启"}${this.confirmation.name}确认`;
    },
  },
  created() {
    this.setting = this.confirmation.option;
  },
  methods: {
    toggle() {
      this.setting = !this.setting;
      this.confirmation.option = this.setting;
    }
  }
};
</script>

<template>
  <div
    class="c-modal__confirmation-toggle"
    @click="toggle"
  >
    <div :class="confirmationClass">
      <span
        v-if="!setting"
        class="fas fa-check"
      />
      <div class="c-modal__confirmation-toggle__tooltip">
        {{ tooltipText }}
      </div>
    </div>
    <span class="c-modal__confirmation-toggle__text">
      不再显示此消息
    </span>
  </div>
</template>
