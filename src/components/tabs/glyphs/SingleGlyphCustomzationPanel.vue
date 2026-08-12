<script>
import GlyphComponent from "@/components/GlyphComponent";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SingleGlyphCustomzationPanel",
  components: {
    GlyphComponent,
    PrimaryButton
  },
  data() {
    return {
      glyphID: -1,
      isVisible: true,
    };
  },
  computed: {
    glyph() {
      if (this.glyphID === -1) return null;
      const g = Glyphs.findById(this.glyphID);
      return {
        type: g.type,
        level: g.level,
        strength: g.strength,
        effects: g.effects,
        color: g.color,
        symbol: g.symbol,
        cosmetic: g.cosmetic,
      };
    },
    typeCosmetic() {
      const changes = [];
      if (GlyphAppearanceHandler.symbolMap[this.glyph.type]) changes.push("符号");
      if (GlyphAppearanceHandler.colorMap[this.glyph.type]) changes.push("颜色");
      if (changes.length === 0) return "无";
      return changes.join("/");
    },
    specialCosmetic() {
      if (this.glyph.cosmetic) return this.glyph.cosmetic.capitalize();
      const changes = [];
      if (this.glyph.symbol) changes.push("符号");
      if (this.glyph.color) changes.push("颜色");
      if (changes.length === 0) return "无";
      return changes.join("/");
    }
  },
  created() {
    // Whenever the inventory changes, this glyph might not exist afterwards
    EventHub.logic.on(GAME_EVENT.GLYPHS_CHANGED, () => {
      this.glyphID = -1;
      this.$recompute("glyph");
    });
    EventHub.logic.on(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("glyph");
    });
  },
  methods: {
    update() {
      this.isVisible = player.reality.glyphs.cosmetics.active && (GlyphAppearanceHandler.availableTypes.length > 0 ||
        CosmeticGlyphTypes.list.some(t => t.isCosmetic && t.isUnlocked()));
    },
    dragover(event) {
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      event.preventDefault();
    },
    drop(event) {
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10);
      if (isNaN(id)) return;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
      this.glyphID = id;
      this.$recompute("glyph");
    },
    openModal() {
      Modal.singleGlyphAppearance.show({ glyphId: this.glyphID });
    },
  }
};
</script>

<template>
  <div
    v-if="isVisible"
    class="c-single-glyph-cosmetic"
    @dragover="dragover"
    @drop="drop"
  >
    <div
      v-if="glyph"
      class="c-glyph-info"
    >
      <div class="c-glyph-info-section">
        <GlyphComponent
          :glyph="glyph"
          :flip-tooltip="true"
        />
      </div>
      <div class="c-glyph-info-section c-cosmetic-text">
        <u>皮肤属性：</u>
        类型：{{ glyph.type.capitalize() }}
        <br>
        全部：{{ typeCosmetic }}
        <br>
        单个：{{ specialCosmetic }}
      </div>
      <div class="c-glyph-info-section">
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="openModal"
        >
          选择皮肤！
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="glyphID = -1"
        >
          清空方框
        </PrimaryButton>
      </div>
    </div>
    <div v-else>
      将符文拖到此方框上以改变其外观！这会在当前位置生成一个视觉副本，但实际符文仍保留在你的库存中。移除、获得或移动任意符文都会清空此方框。
    </div>
  </div>
</template>

<style scoped>
.c-single-glyph-cosmetic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 1rem);
  height: 8rem;
  font-size: 1.2rem;
  border: 0.1rem solid #b8b8b8;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.5rem;
  margin-top: 1rem;
  user-select: none;
}

.c-glyph-info {
  display: flex;
  flex-direction: row;
}

.c-glyph-info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  margin: 1rem;
}

.c-cosmetic-text {
  width: 18rem;
}
</style>
