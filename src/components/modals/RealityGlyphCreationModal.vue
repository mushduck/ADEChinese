<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityGlyphCreationModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realityGlyphLevel: new Decimal(0),
      // This contains an array where each entry is an array looking like [4000, "realitygalaxies"]
      possibleEffects: [],
    };
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed && !PelleAlchemyUpgrade.alchemyReality.canBeApplied;
      this.realityGlyphLevel.copyFrom(Decimal.floor(AlchemyResource.reality.amount));
      const realityEffectConfigs = GlyphEffects.all
        .filter(eff => eff.glyphTypes.includes("reality"))
        .sort((a, b) => a.bitmaskIndex - b.bitmaskIndex);
      const minRealityEffectIndex = realityEffectConfigs.map(cfg => cfg.bitmaskIndex).min();
      this.possibleEffects = realityEffectConfigs
        .map(cfg => [realityGlyphEffectLevelThresholds[cfg.bitmaskIndex - minRealityEffectIndex], cfg.id]);
    },
    createRealityGlyph() {
      if (GameCache.glyphInventorySpace.value === 0) {
        Modal.message.show("仓库空间不足；请献祭一些符文以释放空间。",
          { closeEvent: GAME_EVENT.GLYPHS_CHANGED });
        return;
      }
      Glyphs.addToInventory(GlyphGenerator.realityGlyph(Decimal.floor(AlchemyResource.reality.amount)));
      if (!ExpansionPack.effarigPack.isBought || player.disablePostReality) AlchemyResource.reality.amount = 0;
      player.reality.glyphs.createdRealityGlyph = true;
      this.emitClose();
    },
    formatGlyphEffect(effect) {
      if (this.realityGlyphLevel.lt(effect[0])) return `（符文等级需要达到 ${formatInt(effect[0])}）`;
      const config = GlyphEffects[effect[1]];
      const value = config.effect(this.realityGlyphLevel, rarityToStrength(100 + Ra.unlocks.realityGlyphRarity.effectOrDefault(0)));
      const effectTemplate = config.singleDesc;
      return effectTemplate.replace("{value}", config.formatEffect(value));
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      创造现实符文
    </template>
    <div class="c-reality-glyph-creation">
      <div>
        消耗所有的“现实”炼金资源，创造一个等级为 {{ formatHybridLarge(realityGlyphLevel, 3) }} 的现实符文。该现实符文的稀有度始终为 {{ formatPercents(1) }}, 其等级基于炼金资源“现实”的数量决定。创造现实符文不会影响其它的炼金资源。现实符文具有独特的词条，有些词条只会在等级达到一定数值后出现。你可以献祭现实符文，提高所有记忆块的数量倍率。你只能装备一个现实符文，这一点和鹿颈长符文一样。
      </div>
      <div class="o-available-effects-container">
        <div class="o-available-effects">
          符文词条：
        </div>
        <div
          v-for="(effect, index) in possibleEffects"
          :key="index"
        >
          {{ formatGlyphEffect(effect) }}
        </div>
      </div>
      <PrimaryButton
        v-if="isDoomed"
        :enabled="false"
      >
        你不能在毁灭的现实中创造现实符文
      </PrimaryButton>
      <PrimaryButton
        v-else-if="realityGlyphLevel.neq(0)"
        @click="createRealityGlyph"
      >
        创造一个现实符文！
      </PrimaryButton>
      <PrimaryButton
        v-else
        :enabled="false"
      >
        现实符文的等级必须大于 {{ formatInt(0) }}
      </PrimaryButton>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-available-effects-container {
  margin: 1.5rem 0 2rem;
}

.o-available-effects {
  font-weight: bold;
}
</style>
