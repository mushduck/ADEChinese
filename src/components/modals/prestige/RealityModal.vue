<script>
import GlyphComponent from "@/components/GlyphComponent";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
    GlyphComponent,
  },
  data() {
    return {
      firstReality: false,
      hasSpace: true,
      hasChoice: false,
      hasFilter: false,
      glyphs: [],
      bestLevel: new Decimal(),
      levelDifference: new Decimal(),
      selectedGlyph: undefined,
      canRefresh: false,
      level: new Decimal(),
      simRealities: new Decimal(0),
      realityMachines: new Decimal(),
      shardsGained: new Decimal(0),
      effarigUnlocked: false,
      willAutoPurge: false,
    };
  },
  computed: {
    firstRealityText() {
      return `进行现实将重置所有的游戏内容，以下除外：挑战纪录和统计页面中“概况”条目下的内容。\n\n进行现实将重置前 ${formatInt(13)} 行的所有成就，但你将每隔 ${timeDisplayNoDecimals(new Decimal(30 * 60000))} 自动获得一个成就。\n\n现实之后将基于永恒点数获得现实机器，同时获得一个符文。符文的等级基于永恒点数、复制器和膨胀时间计算。你还能获得一个可用于提升游戏体验的复兴点数，并在第一次现实之后解锁大量的现实升级。`;
    },
    canSacrifice() {
      return RealityUpgrade(19).isEffectActive;
    },
    warnText() {
      if (!this.hasChoice) {
        return `每次现实时，你只有一个备选符文。你需要关闭这个弹窗，在复兴树中购买 START 节点，才能增加备选符文的数量。`;
      }

      if (this.hasFilter && this.selectedGlyph === undefined) {
        return `若不选择符文，系统将根据你的符文筛选器自动选择。`;
      }
      return this.selectedGlyph === undefined
        ? `必须选择符文才能继续。`
        : null;
    },
    gained() {
      const gainedResources = [];
      gainedResources.push(`${quantifyHybridLarge("现实次数", this.simRealities)}`);
      gainedResources.push(`${quantifyHybridLarge("个复兴点数", this.simRealities)}`);
      gainedResources.push(`${quantify("个现实机器", this.realityMachines, 2)}`);
      if (this.effarigUnlocked) {
        gainedResources.push(`${quantify("个遗迹碎片", this.shardsGained, 2)}`);
      }
      return `你将获得 ${makeEnumeration(gainedResources)}`;
    },
    levelStats() {
      // Bit annoying to read due to needing >, <, and =, with = needing a different format.
      return `现实时获得一个等级为 ${formatHybridLarge(this.level, 3)} 的符文，它的等级${this.level.eq(this.bestLevel) ? "与你最高等级的符文相同" : `比你最高等级的符文${this.level.gt(this.bestLevel) ? "高" : "低"} ${quantifyHybridLarge("级", this.levelDifference)}`}。`;
    },
    confirmationToDisable() {
      return ConfirmationTypes.glyphSelection.isUnlocked() ? "glyphSelection" : undefined;
    },
    canConfirm() {
      return this.firstReality || this.selectedGlyph !== undefined || this.hasFilter;
    }
  },
  created() {
    this.getGlyphs();
    GlyphSelection.realityProps = getRealityProps(false, false);
  },
  methods: {
    update() {
      this.firstReality = player.realities.eq(0);
      this.hasChoice = Perk.firstPerk.isEffectActive;
      this.effarigUnlocked = TeresaUnlocks.effarig.canBeApplied;
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.level.copyFrom(gainedGlyphLevel().actualLevel);
      this.simRealities.copyFrom(new Decimal(simulatedRealityCount(false)).add(1));
      this.hasSpace = new Decimal(GameCache.glyphInventorySpace.value).gte(this.simRealities);
      const simRMGained = MachineHandler.gainedRealityMachines.times(this.simRealities);
      this.realityMachines.copyFrom(simRMGained.clampMax(MachineHandler.distanceToRMCap));
      this.shardsGained.copyFrom(Effarig.shardsGained.times(simulatedRealityCount(false) + 1));
      this.willAutoPurge = player.reality.autoAutoClean;
      if (this.firstReality) return;
      for (let i = 0; i < this.glyphs.length; ++i) {
        const currentGlyph = this.glyphs[i];
        const newGlyph = GlyphSelection.glyphList(
          GlyphSelection.choiceCount, gainedGlyphLevel(), { isChoosingGlyph: false }
        )[i];
        if (currentGlyph.level.eq(newGlyph.level)) continue;
        currentGlyph.level = newGlyph.level;
        currentGlyph.effects = newGlyph.effects;
      }
      this.bestLevel.copyFrom(player.records.bestReality.glyphLevel);
      this.levelDifference.copyFrom(Decimal.abs(this.bestLevel.sub(this.level)));
    },
    glyphClass(index) {
      return {
        "l-modal-glyph-selection__glyph": true,
        "l-modal-glyph-selection__glyph--selected": this.selectedGlyph === index,
      };
    },
    getGlyphs() {
      this.canRefresh = true;
      this.glyphs = GlyphSelection.upcomingGlyphs;
    },
    select(index) {
      this.selectedGlyph = index;
    },
    confirmModal(sacrifice) {
      if (!this.canConfirm) return;
      if (sacrifice) {
        // Sac isn't passed through confirm so we have to close it manually
        this.emitClose();
      }
      startManualReality(sacrifice, this.selectedGlyph);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="confirmationToDisable"
    :show-confirm="canConfirm"
    @confirm="confirmModal(false)"
  >
    <template #header>
      你将要进行一次现实
    </template>
    <div
      v-if="firstReality"
      class="c-modal-message__text"
    >
      {{ firstRealityText }}
    </div>

    <div class="c-modal-message__text">
      {{ gained }}
    </div>
    <div
      v-if="!firstReality"
      class="l-glyph-selection__row"
    >
      <GlyphComponent
        v-for="(glyph, index) in glyphs"
        :key="index"
        :class="glyphClass(index)"
        :glyph="glyph"
        :is-in-modal="true"
        :ignore-modified-level="true"
        :show-sacrifice="canSacrifice"
        @click.native="select(index)"
        @touchend.native="select(index)"
      />
    </div>
    <div v-if="!firstReality">
      {{ levelStats }}
      <br>
      <b class="o-warning">
        {{ warnText }}
      </b>
    </div>
    <div v-if="simRealities.gt(1)">
      <br>
      选中该符文后游戏将计算剩余的现实，随后游戏将基于符文筛选的设置，自动选择另外 {{ quantifyHybridSmall("个符文", simRealities.sub(1)) }}。
    </div>
    <div v-if="willAutoPurge">
      <br>
      已启用符文仓库自动净化，选中的符文在自动净化触发后可能不会在符文仓库中出现。
    </div>
    <div
      v-if="!hasSpace"
      class="o-warning"
    >
      <span v-if="simRealities.gt(1)">
        即将执行的现实重置次数超过剩余仓库槽位；这可能导致部分符文被自动净化。
      </span>
      <span v-else>
        你的符文仓库没有可用空间，选中的符文将被
        {{ canSacrifice ? "献祭" : "移除" }}！
      </span>
    </div>
    <div v-if="confirmationToDisable">
      <br>
      按住 Shift 键点击现实按钮可强制显示此弹窗（即使已禁用）。
    </div>
    <template
      v-if="canSacrifice && canConfirm"
      #extra-buttons
    >
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="confirmModal(true)"
      >
        献祭
      </PrimaryButton>
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.o-warning {
  color: var(--color-infinity);
}
</style>