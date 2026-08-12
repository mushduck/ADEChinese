<script>
import SelectedEffectToggle from "./SelectedEffectToggle";

export default {
  name: "AutoSacrificeEffectTab",
  components: {
    SelectedEffectToggle
  },
  props: {
    glyphType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      effectCount: 0,
    };
  },
  computed: {
    typeConfig() {
      return GlyphTypes[this.glyphType];
    },
    autoSacrificeSettings() {
      return AutoGlyphProcessor.types[this.glyphType];
    },
    effects() {
      return this.typeConfig.effects;
    },
    descStyle() {
      return {
        "color": GlyphAppearanceHandler.getBorderColor(this.glyphType),
        "border-color": this.typeConfig.color
      };
    },
    questionmarkTooltip() {
      return `符文评分 = 稀有度 - 每个缺失词条扣除 ${formatInt(200)} 分  
低于指定稀有度的符文将被净化。超出指定数量的额外词条不会提高符文评分。`;
    }
  },
  methods: {
    update() {
      this.effectCount = this.autoSacrificeSettings.effectCount;
    },
    setEffectCount(event) {
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        this.autoSacrificeSettings.effectCount = Math.clamp(inputValue, 0, 8);
      }
    }
  }
};
</script>

<template>
  <div class="c-glyph-sacrifice-options__advanced">
    <div>
      <span
        v-tooltip="questionmarkTooltip"
        class="o-questionmark"
      >
        ?
      </span>
      选择至少拥有
      <input
        ref="effectCount"
        type="number"
        min="0"
        max="8"
        class="c-auto-sac-effect-tab__input"
        :value="effectCount"
        @blur="setEffectCount"
      >
      个词条的符文，并且必须包括以下<i>所有</i>选定词条：
    </div>
    <div
      v-for="effect in effects"
      :key="effect.id"
      class="l-auto-sac-type-tab__row-wrapper"
    >
      <SelectedEffectToggle
        class="c-auto-sac-type-tab__effect-desc l-specified-effect-tab__effect-desc"
        :effect="effect"
        :glyph-type="glyphType"
        :style="descStyle"
      />
    </div>
    (点击以选定或取消选定词条)
  </div>
</template>

<style scoped>

</style>
