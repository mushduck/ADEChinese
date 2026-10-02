<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";

export default {
  name: "GlyphSetRecordsTab",
  components: {
    GlyphSetPreview
  },
  data() {
    return {
      recordGlyphInfo: [],
    };
  },
  methods: {
    update() {
      const bestReality = player.records.bestReality;
      const laitelaDim = 8 - Laitela.difficultyTier;
      this.recordGlyphInfo = [
        [true, cloneDeep(Glyphs.copyForRecords(bestReality.RMSet)), "在一次现实中获得现实机器的最大数量",
          `${format(bestReality.RM, 2, 2)} 现实机器`],
        [true, cloneDeep(Glyphs.copyForRecords(bestReality.RMminSet)), "在一次现实中获得现实机器的最大速度",
          `${format(bestReality.RMmin, 2, 2)} 现实机器/分`],
        [true, cloneDeep(Glyphs.copyForRecords(bestReality.glyphLevelSet)), "最高符文等级",
          `${formatHybridLarge(bestReality.glyphLevel, 3)} 级`],
        [true, cloneDeep(Glyphs.copyForRecords(bestReality.bestEPSet)), "最高永恒点数",
          `${format(bestReality.bestEP, 2, 2)} 永恒点数`],
        [true, cloneDeep(Glyphs.copyForRecords(bestReality.speedSet)), "最快现实用时（现实时间）",
          `${TimeSpan.fromMilliseconds(new Decimal(bestReality.realTime)).toStringShort()}`],
        [player.celestials.teresa.bestRunAM.gt(1), cloneDeep(Glyphs.copyForRecords(player.celestials.teresa.bestAMSet)),
          `在${Teresa.possessiveName}的现实中，反物质数量的最大值`,
          `${format(player.celestials.teresa.bestRunAM, 2, 2)} 反物质`],
        [Currency.imaginaryMachines.gt(0), cloneDeep(Glyphs.copyForRecords(bestReality.iMCapSet)),
          "虚幻机器数量上限的最大值",
          `${format(MachineHandler.currentIMCap, 2, 2)} 虚幻机器`],
        [Laitela.isUnlocked, cloneDeep(Glyphs.copyForRecords(bestReality.laitelaSet)),
          `完成${Laitela.displayName}的现实的最短用时`,
          `${TimeSpan.fromSeconds(new Decimal(player.celestials.laitela.fastestCompletion)).toStringShort()},
          ${laitelaDim} ${pluralize("个维度", laitelaDim)} (暗物质 ${formatX(Laitela.realityReward, 2, 2)})`],
      ];
    },
  }
};
</script>

<template>
  <div class="l-glyph-set-tab">
    <div
      v-for="(set, idx) in recordGlyphInfo"
      :key="idx"
    >
      <div
        v-if="set[0]"
        class="l-glyph-set-entry"
      >
        {{ set[2] }}:
        <GlyphSetPreview
          v-if="set[0]"
          :key="idx"
          :glyphs="set[1]"
          :text="set[2]"
          :text-hidden="true"
        />
        {{ set[3] }}
        <br>
      </div>
    </div>
  </div>
</template>
