<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";
import ToggleButton from "@/components/ToggleButton";

export default {
  name: "GlyphSetSavePanel",
  components: {
    ToggleButton,
    GlyphSetPreview
  },
  data() {
    return {
      hasEquipped: true,
      glyphSets: [],
      names: [],
      effects: false,
      rarity: false,
      level: false,
      page: 0,
    };
  },
  computed: {
    questionmarkTooltip() {
      return `符文预设类似于时间研究预设，能让你一键装备一套完整保存的符文`;
    },
    noSet() {
      return `该槽位中无符文预设`;
    },
    pageCount() {
      return 10;
    },
    currentGlyphSets() {
      const start = this.page * 7;
      const end = start + 7;
      return this.glyphSets.slice(start, end).map((set, idx) => ({
        set,
        id: start + idx,
      }));
    },
    pageRangeText() {
      const start = this.page * 7 + 1;
      const end = start + 6;
      const pad = (n) => String(n).padStart(2, '0');
      return `#${pad(start)} - #${pad(end)}`;
    },
  },
  watch: {
    effects(newValue) {
      player.options.ignoreGlyphEffects = newValue;
    },
    rarity(newValue) {
      player.options.ignoreGlyphRarity = newValue;
    },
    level(newValue) {
      player.options.ignoreGlyphLevel = newValue;
    },
  },
  created() {
    this.on$(GAME_EVENT.GLYPHS_EQUIPPED_CHANGED, this.refreshGlyphSets);
    this.on$(GAME_EVENT.GLYPH_SET_SAVE_CHANGE, this.refreshGlyphSets);
    this.refreshGlyphSets();
    for (let i = 0; i < player.reality.glyphs.sets.length; i++) {
      this.names[i] = player.reality.glyphs.sets[i].name;
    }
  },
  methods: {
    update() {
      this.hasEquipped = Glyphs.activeList.length > 0;
      this.effects = player.options.ignoreGlyphEffects;
      this.rarity = player.options.ignoreGlyphRarity;
      this.level = player.options.ignoreGlyphLevel;
    },
    refreshGlyphSets() {
      this.glyphSets = cloneDeep(player.reality.glyphs.sets.map(g => Glyphs.copyForRecords(g.glyphs)));
    },
    setName(id) {
      const name = this.names[id] === "" ? "" : `: ${this.names[id]}`;
      return `符文配置 #${id + 1}${name}`;
    },
    saveGlyphSet(id) {
      if (!this.hasEquipped || player.reality.glyphs.sets[id].glyphs.length) return;
      player.reality.glyphs.sets[id].glyphs = Glyphs.active.compact();
      this.refreshGlyphSets();
      EventHub.dispatch(GAME_EVENT.GLYPH_SET_SAVE_CHANGE);
    },
    loadGlyphSet(set, id) {
      Glyphs.loadPreset(id);
    },
    deleteGlyphSet(id) {
      if (!player.reality.glyphs.sets[id].glyphs.length) return;
      if (player.options.confirmations.deleteGlyphSetSave) Modal.glyphSetSaveDelete.show({ glyphSetId: id });
      else {
        player.reality.glyphs.sets[id].glyphs = [];
        this.refreshGlyphSets();
        EventHub.dispatch(GAME_EVENT.GLYPH_SET_SAVE_CHANGE);
      }
    },
    nicknameBlur(event) {
      player.reality.glyphs.sets[event.target.id].name = event.target.value.slice(0, 20);
      this.names[event.target.id] = player.reality.glyphs.sets[event.target.id].name;
      this.refreshGlyphSets();
    },
    setLengthValid(set) {
      return set.length && set.length <= Glyphs.activeSlotCount;
    },
    loadingTooltip(set) {
      return this.setLengthValid(set) && this.hasEquipped
        ? "由于已经装备了一些符文，此套符文可能无法正常加载"
        : null;
    },
    glyphSetKey(set, index) {
      return `${index} ${Glyphs.hash(set)}`;
    },
    pad(n, len = 2) {
      return String(n).padStart(len, '0');
    },
    prevPage() {
      if (this.page > 0) this.page--;
    },
    nextPage() {
      if (this.page < this.pageCount - 1) this.page++;
    },
  }
};
</script>

<template>
  <div class="l-glyph-sacrifice-options c-glyph-sacrifice-options l-glyph-sidebar-panel-size">
    <span
      v-tooltip="questionmarkTooltip"
      class="l-glyph-sacrifice-options__help c-glyph-sacrifice-options__help o-questionmark"
    >
      ?
    </span>
    <div class="l-glyph-set-save__header">
      加载符文预设时，将尝试匹配以下属性。“匹配”模式只会装备与预设完全相同的符文。 使用其他的设置，能在对应的位置上装备“更好的”符文。
    </div>
    <div class="c-glyph-set-save-container">
      <ToggleButton
        v-model="effects"
        class="c-glyph-set-save-setting-button"
        label="词条："
        on="包含"
        off="匹配"
      />
      <ToggleButton
        v-model="level"
        class="c-glyph-set-save-setting-button"
        label="等级："
        on="增加"
        off="匹配"
      />
      <ToggleButton
        v-model="rarity"
        class="c-glyph-set-save-setting-button"
        label="稀有度："
        on="增加"
        off="匹配"
      />
    </div>
    <div class="l-glyph-set-save__page-bar">
      <button
        class="c-glyph-set-save-button"
        :class="{ 'c-glyph-set-save-button--unavailable': page === 0 }"
        @click="prevPage"
      >
        上一页
      </button>
      <span class="c-glyph-set-save-page-text">
        第 {{ pad(page + 1) }} / {{ pad(pageCount) }} 页 (预设 {{ pageRangeText }})
      </span>
      <button
        class="c-glyph-set-save-button"
        :class="{ 'c-glyph-set-save-button--unavailable': page >= pageCount - 1 }"
        @click="nextPage"
      >
        下一页
      </button>
    </div>
    <div
      v-for="{ set, id } in currentGlyphSets"
      :key="id"
      class="c-glyph-single-set-save"
    >
      <div class="c-glyph-set-preview-area">
        <GlyphSetPreview
          :key="glyphSetKey(set, id)"
          :text="setName(id)"
          :text-hidden="true"
          :glyphs="set"
          :flip-tooltip="true"
          :none-text="noSet"
        />
      </div>
      <div class="c-glyph-single-set-save-flexbox">
        <div ach-tooltip="设置自定义名称（最多 20 个字符）">
          <input
            :id="id"
            type="text"
            size="20"
            maxlength="20"
            placeholder="自定义预设名称"
            class="c-glyph-sets-save-name__input"
            :value="names[id]"
            @blur="nicknameBlur"
          >
        </div>
        <div class="c-glyph-single-set-save-flexbox-buttons">
          <button
            class="c-glyph-set-save-button"
            :class="{'c-glyph-set-save-button--unavailable': !hasEquipped || set.length}"
            @click="saveGlyphSet(id)"
          >
            保存
          </button>
          <button
            v-tooltip="loadingTooltip(set)"
            class="c-glyph-set-save-button"
            :class="{'c-glyph-set-save-button--unavailable': !setLengthValid(set)}"
            @click="loadGlyphSet(set, id)"
          >
            加载
          </button>
          <button
            class="c-glyph-set-save-button"
            :class="{'c-glyph-set-save-button--unavailable': !set.length}"
            @click="deleteGlyphSet(id)"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-glyph-set-save__header {
  margin: -1.5rem 2rem 0;
}

.c-glyph-set-save-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin: 1rem auto 0;
}

.c-glyph-single-set-save-flexbox {
  width: 17rem;
}

.c-glyph-set-preview-area {
  width: 18rem;
}

.c-glyph-set-save-page-text {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text, #fff);
}
</style>