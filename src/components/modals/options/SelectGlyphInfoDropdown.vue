<script>
export const GlyphInfo = {
  types: {
    NONE: 0,
    LEVEL: 1,
    RARITY: 2,
    SAC_VALUE: 3,
    FILTER_SCORE: 4,
    CURRENT_REFINE: 5,
    MAX_REFINE: 6,
  },
  labels: ["无", "等级", "稀有度", "献祭值", "符文筛选分数",
    "当前精炼值", "最大精炼值"]
};


export default {
  name: "SelectGlyphInfoDropdown",
  computed: {
    availableTypes() {
      const typeEnum = GlyphInfo.types;
      const options = [typeEnum.NONE, typeEnum.LEVEL, typeEnum.RARITY];
      if (GlyphSacrificeHandler.canSacrifice) options.push(typeEnum.SAC_VALUE);
      if (EffarigUnlock.glyphFilter.isUnlocked) options.push(typeEnum.FILTER_SCORE);
      if (Ra.unlocks.unlockGlyphAlchemy.canBeApplied) {
        options.push(typeEnum.CURRENT_REFINE);
        options.push(typeEnum.MAX_REFINE);
      }
      return options;
    }
  },
  methods: {
    setType(type) {
      player.options.showHintText.glyphInfoType = type;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    getType(type) {
      return GlyphInfo.labels[type];
    }
  }
};
</script>

<template>
  <div class="l-select-theme">
    <div class="l-select-theme__inner">
      <div
        v-for="type in availableTypes"
        :key="type"
        class="o-primary-btn l-select-theme__item c-select-theme__item"
        @click="setType(type)"
      >
        {{ getType(type) }}
      </div>
    </div>
  </div>
</template>
