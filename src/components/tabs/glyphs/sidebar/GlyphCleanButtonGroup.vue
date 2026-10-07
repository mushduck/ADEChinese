<script>
export default {
  name: "GlyphCleanButtonGroup",
  data() {
    return {
      glyphSacrificeUnlocked: false,
      hasPerkShop: false,
      hasFilter: false,
      inventory: [],
      isRefining: false,
      removeCount: 0,
    };
  },
  computed: {
    removeString() {
      if (this.isRefining) return "精炼";
      if (this.glyphSacrificeUnlocked) return "献祭";
      return "移除";
    },
    autoCleanTooltip() {
      return `${this.removeString} 在所有方面都劣于足够数量其他符文的符文${this.hasPerkShop ? "（忽略自定义符文）" : ""}`;
    },
    harshAutoCleanTooltip() {
      return `${this.removeString} 在所有方面都劣于任何数量其他符文的符文${this.hasPerkShop ? "（忽略自定义符文）" : ""}`;
    },
    deleteRejectedTooltip() {
      const negativeWarning = AutoGlyphProcessor.hasNegativeEffectScore()
        ? "你还有一些效果筛选得分为负值，这可能会移除一些你通常想保留的符文！"
        : "";
      return this.removeCount === 0
        ? `这不会移除任何符文，请调整你的筛选设置以移除部分符文。`
        : `这将移除 ${quantifyInt("个符文", this.removeCount)}！${negativeWarning}`;
    }
  },
  methods: {
    update() {
      this.glyphSacrificeUnlocked = GlyphSacrificeHandler.canSacrifice && !Pelle.isDoomed;
      this.hasPerkShop = TeresaUnlocks.shop.canBeApplied;
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.inventory = Glyphs.inventory.map(GlyphGenerator.copy);
      this.isRefining = AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE ||
        AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE_TO_CAP;
      this.removeCount = this.inventory
        .filter(g => g !== null && g.idx >= Glyphs.protectedSlots && !AutoGlyphProcessor.wouldKeep(g))
        .length;
    },
    autoClean() {
      if (player.options.confirmations.autoClean) {
        Modal.glyphPurge.show({ harsh: false });
      } else {
        Glyphs.autoClean();
      }
    },
    harshAutoClean() {
      if (player.options.confirmations.autoClean) {
        Modal.glyphPurge.show({ harsh: true });
      } else {
        Glyphs.harshAutoClean();
      }
    },
    deleteAllUnprotected() {
      if (player.options.confirmations.sacrificeAll) {
        Modal.deleteAllUnprotectedGlyphs.show();
      } else {
        Glyphs.autoClean(0);
      }
    },
    deleteAllRejected() {
      if (player.options.confirmations.sacrificeAll) {
        Modal.deleteAllRejectedGlyphs.show();
      } else {
        Glyphs.deleteAllRejected(true);
      }
    },
    slotClass(index) {
      return index < Glyphs.protectedSlots ? "c-glyph-inventory__protected-slot" : "c-glyph-inventory__slot";
    },
  }
};
</script>

<template>
  <div
    v-if="glyphSacrificeUnlocked"
    class="o-glyph-inventory-management-group"
  >
    <div class="l-glyph-sacrifice-options__header">
      移除较弱的符文：
    </div>
    <button
      class="c-glyph-inventory-option"
      @click="autoClean"
    >
      净化符文仓库
      <div class="c-glyph-inventory-option__tooltip">
        {{ autoCleanTooltip }}
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="harshAutoClean"
    >
      强力净化符文仓库
      <div class="c-glyph-inventory-option__tooltip">
        {{ harshAutoCleanTooltip }}
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="deleteAllUnprotected"
    >
      {{ removeString }}所有未保护的符文
    </button>
    <button
      v-if="hasFilter"
      class="c-glyph-inventory-option"
      @click="deleteAllRejected"
    >
      {{ removeString }}所有不符合筛选标准的符文
      <div
        class="c-glyph-inventory-option__tooltip l-rejected-tooltip"
      >
        {{ deleteRejectedTooltip }}
      </div>
    </button>
  </div>
</template>

<style scoped>
.l-rejected-tooltip {
  width: 90%;
  left: 5%;
}
</style>
