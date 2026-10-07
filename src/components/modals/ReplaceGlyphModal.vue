<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ReplaceGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    targetSlot: {
      type: Number,
      required: true
    },
    inventoryIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      target: 0,
      idx: 0,
      isDoomed: false,
      isCursed: false
    };
  },
  computed: {
    resetTerm() {
      if (this.isCursed) return "perform a Core Jump";
      return this.isDoomed ? "重启本次末日" : "重启本次现实";
    },
  },
  methods: {
    update() {
      this.target = this.targetSlot;
      this.idx = this.inventoryIndex;
      this.glyph = Glyphs.findByInventoryIndex(this.idx);
      this.isDoomed = Pelle.isDoomed;
      this.isCursed = Slabdrill.isCursed;
    },
    handleYesClick() {
      Glyphs.swapIntoActive(this.glyph, this.targetSlot);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphReplace"
    @confirm="handleYesClick"
  >
    <template #header>
      你将要替换符文
    </template>
    替换符文后将{{ resetTerm }}。是否替换？
  </ModalWrapperChoice>
</template>
