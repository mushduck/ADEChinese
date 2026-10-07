<script>
import AwayProgressOptionsEntry from "@/components/modals/options/AwayProgressOptionsEntry";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "AwayProgressOptionsModal",
  components: {
    AwayProgressOptionsEntry,
    ModalWrapperOptions,
  },
  computed: {
    all() {
      return AwayProgressTypes.showOption;
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      离线进度选项
    </template>
    <div class="c-modal-options__button-container">
      <AwayProgressOptionsEntry
        v-for="name of all"
        :key="name"
        :name="name"
      />
    </div>
    注：所选资源仅在增长时显示。
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 75rem;
}
</style>