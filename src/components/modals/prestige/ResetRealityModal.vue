<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ResetRealityModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      canReality: false,
    };
  },
  computed: {
    resetTerm() { return this.isDoomed ? "末日" : "现实"; },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.canReality = isRealityAvailable();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="resetReality"
    @confirm="handleYesClick"
  >
    <template #header>
      你即将重置{{ resetTerm }}
    </template>
    <div class="c-modal-message__text">
      此操作将重置本次{{ resetTerm }}，并且你不会从当前{{ resetTerm }}的进度中获得任何奖励。你确定要重置吗？
      <div
        v-if="canReality"
        class="c-has-rewards"
      >
        <br>
        当前可完成现实以获取全部常规奖励，若在此重置则无法获得这些奖励。请使用“创建新的现实”按钮获取收益。
      </div>
      <br>
    </div>
    <template #confirm-text>
      重置
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-has-rewards {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-bad);
}
</style>
