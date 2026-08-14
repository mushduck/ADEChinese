<script>
import TypeSacrifice from "./TypeSacrifice";

export default {
  name: "SacrificedGlyphs",
  components: {
    TypeSacrifice
  },
  data() {
    return {
      anySacrifices: false,
      hasDragover: false,
      hasAlteration: false,
      hideAlteration: false,
      maxSacrifice: new Decimal(0),
      teresaMult: new Decimal(0),
      lastMachinesTeresa: new Decimal(0),
    };
  },
  computed: {
    types: () => GLYPH_TYPES.filter(type => type !== "cursed" && type !== "companion"),
    lastMachines() {
      return this.lastMachinesTeresa.gte(DC.E20000)
        ? `${quantify("重构机器", this.lastMachinesTeresa.dividedBy(DC.E20000), 2)}`
        : (this.lastMachinesTeresa.lt(DC.E10000)
          ? `${quantify("现实机器", this.lastMachinesTeresa, 2)}`
          : `${quantify("虚幻机器", this.lastMachinesTeresa.dividedBy(DC.E10000), 2)}`);
    },
    dropDownIconClass() {
      return this.hideAlteration ? "far fa-plus-square" : "far fa-minus-square";
    },
    isDoomed() {
      return (Pelle.isDisabled("glyphsac") && !PelleRealityUpgrade.scourToEmpower.canBeApplied);
    },
    addThreshold() {
      return GlyphAlteration.additionThreshold;
    },
    empowerThreshold() {
      return GlyphAlteration.empowermentThreshold;
    },
    boostThreshold() {
      return GlyphAlteration.boostingThreshold;
    },
    cosmeticTypes: () => CosmeticGlyphTypes,
    addStyle() {
      return { color: GlyphAlteration.baseAdditionColor() };
    },
    empowerStyle() {
      return { color: GlyphAlteration.baseEmpowermentColor() };
    },
    boostStyle() {
      return { color: GlyphAlteration.baseBoostColor() };
    },
    hasSeenRealityGlyph() {
      return player.reality.glyphs.createdRealityGlyph;
    }
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("cosmeticTypes");
    });
  },
  methods: {
    update() {
      this.anySacrifices = GameCache.logTotalGlyphSacrifice !== 0;
      this.hasAlteration = Ra.unlocks.alteredGlyphs.canBeApplied && !player.disablePostReality;
      this.hideAlteration = player.options.hideAlterationEffects;
      this.maxSacrifice.copyFrom(GlyphSacrificeHandler.maxSacrificeForEffects);
      this.teresaMult.copyFrom(Teresa.runRewardMultiplier);
      this.lastMachinesTeresa.copyFrom(player.celestials.teresa.lastRepeatedMachines);
    },
    dragover(event) {
      if (Pelle.isDoomed) return;
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      event.preventDefault();
      this.hasDragover = true;
    },
    dragleave(event) {
      if (
        this.isDoomed ||
        !event.relatedTarget ||
        !event.relatedTarget.classList ||
        event.relatedTarget.classList.contains("c-current-glyph-effects") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__header") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-symbol") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-amount") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__type-new-amount") ||
        event.relatedTarget.classList.length === 0) return;
      this.hasDragover = false;
    },
    drop(event) {
      if (this.isDoomed || !event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10);
      if (isNaN(id)) return;
      const glyph = Glyphs.findById(id);
      if (!glyph) return;
      GlyphSacrificeHandler.sacrificeGlyph(glyph, true);
      this.hasDragover = false;
    },
    toggleAlteration() {
      player.options.hideAlterationEffects = !player.options.hideAlterationEffects;
    },
    glyphSymbol(type) {
      return this.cosmeticTypes[type].currentSymbol.symbol;
    }
  }
};
</script>

<template>
  <div
    class="c-current-glyph-effects l-current-glyph-effects"
    :class="{'c-sacrificed-glyphs--dragover': hasDragover}"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="l-sacrificed-glyphs__help">
      <span
        v-if="isDoomed"
        class="pelle-current-glyph-effects"
      >
        你不能在被毁灭的现实中献祭符文。
      </span>
      <span v-else>
        <div>拖拽符文至此处或按住Shift键点击献祭。</div>
        <div>确认提示可在设置或按住Ctrl键禁用</div>
      </span>
    </div>
    <div v-if="hasAlteration">
      <span
        class="c-altered-glyphs-toggle-button"
        @click="toggleAlteration"
      >
        <i :class="dropDownIconClass" />
        <b>异变符文</b>
      </span>
      <br>
      <div v-if="hideAlteration">
        （已隐藏详情，点击以打开）
      </div>
      <div v-else>
        当某种符文类型的总献祭值高于以下数值时
该符文类型的某个效果将得到提升：
        <br><br>
        <b>
          <span :style="addStyle">{{ format(addThreshold) }} - 一些符文词条获得附加效果</span>
          <br>
          <span :style="empowerStyle">{{ format(empowerThreshold) }} - 大幅度改善一些符文词条的效果公式</span>
          <br>
          <span :style="boostStyle">{{ format(boostThreshold) }} - 基于符文献祭，提供额外加成</span>
        </b>
        <br><br>
        当符文献祭效果达到 {{ format(maxSacrifice) }} 后，所有效果将无法继续提升。
      </div>
    </div>
    <br>
    <div class="c-sacrificed-glyphs__header">
      符文献祭加成：
    </div>
    <div v-if="anySacrifices && !isDoomed">
      <div v-if="teresaMult.gt(1)">
        符文献祭值 {{ formatX(teresaMult, 2, 2) }};
        上次以 {{ lastMachines }} 完成特蕾莎的现实。
        <span v-if="hasSeenRealityGlyph">
          现实符文不受该效果的影响，并且没有异变效果。
        </span>
      </div>
      <template v-for="type in types">
        <TypeSacrifice
          :key="type + glyphSymbol(type)"
          :type="type"
          :has-dragover="hasDragover"
        />
      </template>
    </div>
    <div
      v-else-if="isDoomed"
      class="pelle-current-glyph-effects"
    >
      在毁灭的现实中，符文献祭提供的所有加成均被禁用，包括变异符文带来的效果变化。
    </div>
    <div v-else>
      你还没有献祭任何符文！
    </div>
  </div>
</template>

<style scoped>

</style>
