<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    harsh: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    threshold() {
      return this.harsh ? 1 : 5;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这将不会净化任何符文。`;
      if (this.glyphsDeleted === this.glyphsTotal) return `这将净化全部符文。`;
      return `${this.harsh ? `强力` : ``}净化将移除
        ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)}
      个符文。`;
    },
    explanation() {
      if (this.harsh) return `强力净化将删除仓库中全面劣于其他符文的符文。例如：若某符文的所有词条与另一符文完全相同，但全部词条数值均更低，则将被删除。`;
      return `普通净化将删除全面劣于其他符文的符文，但会保留足够装备整套效果的符文。其机制类似强力净化，区别在于：普通净化需找到五个更优符文（而非仅一个）才会删除目标符文。`;
    },
    topLabel() {
      return `你将要${this.harsh ? `强力` : ``}净化符文`;
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(this.threshold, false);
    },
  },
  methods: {
    handleYesClick() {
      Glyphs.autoClean(this.threshold, true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="autoClean"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      此操作可能移除仓库中未来可能用到的优质符文。净化将根据你设定的净化模式执行。你确定要继续吗？
      <br>
      <br>
      {{ explanation }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
