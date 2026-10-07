<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeAllRejectedGlyphsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isRefining: false,
    };
  },
  computed: {
    refiningOrSacrificing() {
      if (this.isRefining) return `精炼`;
      return `献祭`;
    },
    topLabel() {
      return `你将要${this.refiningOrSacrificing}所有不符合筛选条件的符文`;
    },
    message() {
      const negativeWarning = AutoGlyphProcessor.hasNegativeEffectScore()
        ? `需注意：部分效果筛选得分为负值，可能导致你意外失去通常想保留的符文。`
        : "";
      return `你确定要${this.refiningOrSacrificing}所有不符合筛选条件的符文吗？此操作将根据当前符文筛选设置，移除所有不符合筛选条件的符文。${negativeWarning}`;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这将不会移除任何符文。`;
      if (this.glyphsDeleted === this.glyphsTotal) return `这将移除全部符文。`;
      return `这将移除 ${this.glyphsDeleted}/${this.glyphsTotal} 个符文。`;
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.deleteAllRejected(false);
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining;
    },
    handleYesClick() {
      Glyphs.deleteAllRejected(true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrificeAll"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
