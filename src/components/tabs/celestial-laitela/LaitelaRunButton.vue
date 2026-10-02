<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";

export default {
  name: "LaitelaRunButton",
  components: {
    GlyphSetPreview
  },
  data() {
    return {
      realityTime: 0,
      maxDimTier: 0,
      isRunning: false,
      realityReward: new Decimal(1),
      singularitiesUnlocked: false,
      bestSet: [],
      tierNotCompleted: true,
      hadronizeUnlocked: false,
      darkEnergyBoost: new Decimal(0),
      hasHadronizes: false,
      hadronizes: 0,
    };
  },
  computed: {
    completionTime() {
      if (this.tierNotCompleted) return "尚未完成本层级";
      return `最佳完成时间：${TimeSpan.fromSeconds(new Decimal(this.realityTime)).toStringShort()}`;
    },
    runEffects() {
      return GameDatabase.celestials.descriptions[5].effects().split("\n");
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[5].description();
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.realityTime = player.celestials.laitela.fastestCompletion;
      this.maxDimTier = Laitela.maxAllowedDimension;
      this.realityReward.copyFrom(Laitela.realityReward);
      this.isRunning = Laitela.isRunning;
      this.singularitiesUnlocked = Currency.singularities.gt(0);
      this.bestSet = cloneDeep(Glyphs.copyForRecords(player.records.bestReality.laitelaSet));
      this.tierNotCompleted = this.realityTime === 3600 || (this.realityTime === 300 && this.maxDimTier < 8);
      this.hadronizeUnlocked = ExpansionPack.laitelaPack.isBought && !player.disablePostReality;
      this.darkEnergyBoost.copyFrom(Laitela.realityRewardDE);
      this.hasHadronizes = this.hadronizes > 0;
      this.hadronizes = Laitela.hadronizes;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "莱特拉", number: 5 });
    },
    classObject() {
      return {
        "o-laitela-run-button": true,
        "o-laitela-run-button--large": !this.singularitiesUnlocked,
        "o-laitela-run-button--larger": this.hadronizeUnlocked
      };
    },
    runButtonClassObject() {
      return {
        "o-laitela-run-button__icon": true,
        "o-laitela-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    hadronize() {
      Laitela.hadronize();
    }
  }
};
</script>

<template>
  <button :class="classObject()">
    <span :class="{ 'o-pelle-disabled': isDoomed }">
      <b>开始莱特拉的现实</b>
    </span>
    <div
      :class="runButtonClassObject()"
      @click="startRun"
    />
    <div v-if="realityReward.gt(1)">
      <b>
        所有的暗物质加成倍率 {{ formatX(realityReward, 2, 2) }}。
      </b>
      <br>
      <span v-if="maxDimTier === 0 || hasHadronizes">
        <b>
          暗能量额外 {{ formatX(darkEnergyBoost) }}。
        </b>
      </span>
      <span v-if="hasHadronizes">
        <b>
          你已强子化莱特拉的现实 {{ formatHybridSmall(hadronizes, 3) }} 次。
        </b>
      </span>
      <span v-if="maxDimTier > 0">
        <br><br>
        {{ completionTime }}
        <br>
        <span v-if="maxDimTier <= 7">
          <b>可用的最高维度：{{ formatInt(maxDimTier) }}</b>
        </span>
        <br><br>
        符文配置：
        <GlyphSetPreview
          text="最快不稳定的符文配置"
          :text-hidden="true"
          :force-name-color="false"
          :glyphs="bestSet"
        />
      </span>
      <span v-else>
        <br><br>
        莱特拉的现实已完全不稳定，无法进一步提升其奖励。
      </span>
      <br>
    </div>
    <div
      v-for="(line, lineId) in runEffects"
      :key="lineId + '-laitela-run-desc' + maxDimTier"
    >
      {{ line }} <br>
    </div>
    <br>
    <div>{{ runDescription }}</div>
    <br>
    <div v-if="hadronizeUnlocked">
      <button
        class="l-laitela-hadronize-button c-laitela-hadronize-button"
        @click="hadronize"
      >
        <b>强子化莱特拉的现实</b>
      </button>
      <br>
      <br>
      强子化莱特拉的现实将重新稳定所有 {{ formatInt(8) }} 个维度，并保留此前完成强子化莱特拉的现实的奖励。你可以通过再次使莱特拉的现实失稳来获得更多奖励。每次强子化将使莱特拉的现实失稳所获得的奖励 × {{ formatInt(8) }}。
    </div>
  </button>
</template>
