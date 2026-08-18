<script>
import SelectGlyphInfoDropdown, { GlyphInfo } from ".././SelectGlyphInfoDropdown";

import ExpandingControlBox from "@/components/ExpandingControlBox";
import GlyphCustomization from "@/components/modals/options/glyph-appearance/GlyphCustomization";
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "GlyphDisplayOptionsModal",
  components: {
    ExpandingControlBox,
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    SelectGlyphInfoDropdown,
    GlyphCustomization,
  },
  data() {
    return {
      newGlyphs: false,
      showUnequippedGlyphIcon: false,
      glyphEffectDots: false,
      glyphBG: 0,
      glyphInfoType: 0,
      showGlyphInfoByDefault: false,
      glyphBorders: false,
      highContrastRarity: false,
      swapGlyphColors: false,
    };
  },
  computed: {
    infoLabel() {
      return GlyphInfo.labels[this.glyphInfoType];
    },
    glyphBGStr() {
      switch (this.glyphBG) {
        case GLYPH_BG_SETTING.AUTO:
          return "自动";
        case GLYPH_BG_SETTING.LIGHT:
          return "明亮";
        case GLYPH_BG_SETTING.DARK:
          return "黑暗";
        default:
          throw new Error("Unrecognized Glyph BG setting");
      }
    }
  },
  watch: {
    newGlyphs(newValue) {
      player.options.showNewGlyphIcon = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    showUnequippedGlyphIcon(newValue) {
      player.options.showUnequippedGlyphIcon = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    glyphEffectDots(newValue) {
      player.options.showHintText.glyphEffectDots = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    showGlyphInfoByDefault(newValue) {
      player.options.showHintText.showGlyphInfoByDefault = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    glyphBorders(newValue) {
      player.options.glyphBorders = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    highContrastRarity(newValue) {
      player.options.highContrastRarity = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    swapGlyphColors(newValue) {
      player.options.swapGlyphColors = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.newGlyphs = options.showNewGlyphIcon;
      this.showUnequippedGlyphIcon = options.showUnequippedGlyphIcon;
      this.glyphEffectDots = options.showHintText.glyphEffectDots;
      this.glyphBG = player.options.glyphBG;
      this.glyphInfoType = options.showHintText.glyphInfoType;
      this.showGlyphInfoByDefault = options.showHintText.showGlyphInfoByDefault;
      this.glyphBorders = options.glyphBorders;
      this.highContrastRarity = options.highContrastRarity;
      this.swapGlyphColors = options.swapGlyphColors;
    },
    noEffectStyle() {
      if (this.glyphInfoType !== 0) return null;
      return {
        "background-color": "var(--color-disabled)",
      };
    },
    cycleBG() {
      player.options.glyphBG = (player.options.glyphBG + 1) % Object.keys(GLYPH_BG_SETTING).length;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
  },
};
</script>

<template>
  <ModalWrapperOptions class="c-modal-options__glyph">
    <template #header>
      符文显示选项
    </template>
    <div class="c-glyph-visual-options c-modal--short">
      <div class="c-modal-options__button-container">
        <ModalOptionsToggleButton
          v-model="newGlyphs"
          text="标记新获得的符文："
        />
        <ModalOptionsToggleButton
          v-model="showUnequippedGlyphIcon"
          text="标记卸下的符文："
        />
        <ModalOptionsToggleButton
          v-model="glyphEffectDots"
          text="符文上显示词条对应的点："
        />
        <ModalOptionsToggleButton
          v-model="glyphBorders"
          text="华丽符文边框："
        />
        <button
          class="o-primary-btn o-primary-btn--modal-option"
          @click="cycleBG()"
        >
          符文背景颜色：{{ glyphBGStr }}
        </button>
        <ModalOptionsToggleButton
          v-model="showGlyphInfoByDefault"
          :style="noEffectStyle()"
          text="在符文上显示额外符文信息："
        />
        <ModalOptionsToggleButton
          v-model="highContrastRarity"
          text="符文稀有度采用高对比度配色："
        />
        <ModalOptionsToggleButton
          v-model="swapGlyphColors"
          text="交换符文边框和符文符号的颜色："
        />
        <ExpandingControlBox
          class="o-primary-btn c-dropdown-btn"
        >
          <template #header>
            <div class="c-dropdown-header">
              ▼ 额外符文信息： ▼
              <br>
              {{ infoLabel }}
            </div>
          </template>
          <template #dropdown>
            <SelectGlyphInfoDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <GlyphCustomization />
    </div>
  </ModalWrapperOptions>
</template>

<style scoped>
.c-modal-options__glyph {
  width: 55rem;
}

.c-glyph-visual-options {
  width: 55rem;
  overflow-x: hidden;
  padding-right: 1rem;
}

.c-dropdown-btn {
  width: 24rem;
  margin: 0.3rem;
  padding: 0;
}

.c-dropdown-header {
  padding: 0.9rem;
  height: 6.5rem;
  user-select: none;
}
</style>
