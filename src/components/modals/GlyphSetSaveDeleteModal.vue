<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "GlyphSetSaveDeleteModal",
  components: {
    ModalWrapperChoice,
    GlyphSetPreview
  },
  props: {
    glyphSetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      glyphSet: []
    };
  },
  methods: {
    update() {
      this.glyphSet = cloneDeep(Glyphs.copyForRecords(player.reality.glyphs.sets[this.glyphSetId].glyphs));
    },
    handleYesClick() {
      player.reality.glyphs.sets[this.glyphSetId].glyphs = [];
      EventHub.dispatch(GAME_EVENT.GLYPH_SET_SAVE_CHANGE);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="deleteGlyphSetSave"
    @confirm="handleYesClick"
  >
    <template #header>
      删除这组符文预设
    </template>
    <div class="c-modal-message__text">
      请确认你要删除这组符文预设：
      <GlyphSetPreview
        :is-in-modal="true"
        :glyphs="glyphSet"
      />
      这不会影响实际的符文。
    </div>
    <template #confirm-text>
      删除
    </template>
  </ModalWrapperChoice>
</template>
