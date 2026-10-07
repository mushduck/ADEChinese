<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PrimaryToggleButton",
  components: {
    PrimaryButton
  },
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    on: {
      type: String,
      required: false,
      default: "开启"
    },
    off: {
      type: String,
      required: false,
      default: "关闭"
    },
    value: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    displayText() {
      return `${this.label} ${this.value ? this.on : this.off}`.trim();
    }
  },
};
</script>

<template>
  <PrimaryButton
    v-bind="$attrs"
    @click="emitInput(!value)"
  >
    {{ displayText }}
  </PrimaryButton>
</template>

