<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeGlyphModal",
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
      currentGlyphSacrifice: new Decimal(0),
      gain: new Decimal(0),
      confirmedSacrifice: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
    ChineseName() {
      switch (this.glyph.type) {
        case "companion":
          return "同伴";
        case "cursed":
          return "诅咒";
        case "reality":
          return `现实`;
        case "power":
          return `力量`;
        case "infinity":
          return `无限`;
        case "replication":
          return `复制`;
        case "time":
          return `时间`;
        case "dilation":
          return `膨胀`;
        case "effarig":
          return `鹿颈长`;
      }
    },
    message() {
      return `你真的要献祭这个符文吗？你献祭的${this.ChineseName}符文总值将从 ${format(this.currentGlyphSacrifice, 2, 2)} 提升至 ${format(this.currentGlyphSacrifice.add(this.gain), 2, 2)}.`;
    }
  },
  methods: {
    update() {
      this.currentGlyphSacrifice = player.reality.glyphs.sac[this.glyph.type];
      this.gain = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph);

      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedSacrifice) {

        // ConfirmedSacrifice is here because when you sac a glyph with confirmation it
        // Displays this modal message even though the glyph was sacced successfully.
        // I have no idea how the eventHub thing works or if moving the UI update before
        // the sac will break things so this is the best I could do. - Scar

        this.emitClose();
        Modal.message.show("选中的符文改变了位置或发生了其他变化。");
      }
    },
    handleYesClick() {
      this.confirmedSacrifice = true;
      GlyphSacrificeHandler.sacrificeGlyph(this.glyph, true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphSacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      你将要献祭一个符文。
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
