<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeAllUnprotectedGlyphsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isRefining: false,
      isSacrificing: false,
    };
  },
  computed: {
    refiningSacrificingOrDeleting() {
      if (this.isRefining) return `精炼`;
      if (this.isSacrificing) return `献祭`;
      return `移除`;
    },
    topLabel() {
      return `你将要${this.refiningSacrificingOrDeleting}所有未受保护的符文`;
    },
    message() {
      return `你确定要${this.refiningSacrificingOrDeleting}仓库中所有未受保护的符文吗？`;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这将不会${this.refiningSacrificingOrDeleting}任何符文。`;
      if (this.glyphsDeleted === this.glyphsTotal) {
        return `这将${this.refiningSacrificingOrDeleting}全部符文。`;
      }
      return `这将${this.refiningSacrificingOrDeleting} 
        ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)} 个符文。`;
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(0, false);
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining;
      this.isSacrificing = GlyphSacrificeHandler.canSacrifice;
    },
    handleYesClick() {
      Glyphs.deleteAllUnprotected();
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
