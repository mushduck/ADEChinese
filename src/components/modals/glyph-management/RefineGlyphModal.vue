<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "RefineGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resourceAmount: 0,
      resourceUnlocked: false,
      gain: 0,
      after: 0,
      cap: 0,
      confirmedRefine: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
    resource() {
      return GlyphSacrificeHandler.glyphAlchemyResource(this.glyph);
    },
    resourceName() {
      return this.resource.name;
    },
  },
  methods: {
    update() {
      const resource = this.resource;
      this.resourceAmount = resource.amount;
      this.resourceUnlocked = resource.isUnlocked;
      this.gain = GlyphSacrificeHandler.glyphRefinementGain(this.glyph);
      this.cap = GlyphSacrificeHandler.glyphEffectiveCap(this.glyph);

      this.after = this.resourceAmount + this.gain;

      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedRefine) {

        // Why is confirmedRefine here: refer to SacrificeGlyphModal.vue

        this.emitClose();
        Modal.message.show("选中的符文改变了位置或发生了其他变化！");
      }
    },
    handleYesClick() {
      this.confirmedRefine = true;
      GlyphSacrificeHandler.refineGlyph(this.glyph);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphRefine"
    @confirm="handleYesClick"
  >
    <template #header>
      你即将精炼符文
    </template>
    <div
      v-if="resourceUnlocked"
      class="c-modal-message__text"
    >
      精炼一个符文会将其从你的仓库中移除，同时你将使 {{ resourceName }} 炼金资源从 {{ format(resourceAmount, 2, 2) }} 提升至 {{ format(after, 2, 2) }}。该符文最多可将你的 {{ resourceName }} 资源提升至 {{ format(cap, 2, 2) }}。
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      你无法获得任何 {{ resourceName }} 炼金资源，因为你尚未解锁该符文的资源。你仍然可以进行精炼，但不会有任何效果。建议改为献祭该符文。
    </div>
  </ModalWrapperChoice>
</template>
