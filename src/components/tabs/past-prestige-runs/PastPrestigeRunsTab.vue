<script>
import PastPrestigeRunsContainer from "./PastPrestigeRunsContainer";

export default {
  name: "PastPrestigeRunsTab",
  components: {
    PastPrestigeRunsContainer
  },
  data() {
    return {
      layers: {
        reality: {
          name: "现实",
          plural: "现实次数",
          currency: "现实机器",
          condition: () => PlayerProgress.realityUnlocked(),
          getRuns: () => player.records.recentRealities,
          extra: ["符文等级", "遗迹碎片"],
          showExtra: [() => true, () => TeresaUnlocks.effarig.canBeApplied],
          formatExtra: [x => formatHybridLarge(x, 3), x => format(x, 2)],
          allowRate: [false, true],
          rateString: ["", "遗迹碎片获得率"],
        },
        eternity: {
          name: "永恒",
          plural: "永恒次数",
          currency: "永恒点数",
          condition: () => PlayerProgress.eternityUnlocked(),
          getRuns: () => player.records.recentEternities,
          extra: ["超光速粒子"],
          showExtra: [() => PlayerProgress.dilationUnlocked()],
          formatExtra: [x => format(x, 2)],
          allowRate: [false],
        },
        infinity: {
          name: "无限",
          plural: "无限次数",
          currency: "无限点数",
          condition: () => PlayerProgress.infinityUnlocked(),
          getRuns: () => player.records.recentInfinities,
        },
      },
      resourceType: false,
    };
  },
  computed: {
    resourceText() {
      switch (this.resourceType) {
        case RECENT_PRESTIGE_RESOURCE.ABSOLUTE_GAIN:
          return "总资源获得";
        case RECENT_PRESTIGE_RESOURCE.RATE:
          return "资源获得率";
        case RECENT_PRESTIGE_RESOURCE.CURRENCY:
          return "重置资源";
        case RECENT_PRESTIGE_RESOURCE.PRESTIGE_COUNT:
          return "重置次数";
        default:
          throw new Error("Unrecognized Statistics tab resource type");
      }
    }
  },
  methods: {
    update() {
      this.resourceType = player.options.statTabResources;
    },
    cycleButton() {
      const stateCount = Object.keys(RECENT_PRESTIGE_RESOURCE).length;
      player.options.statTabResources = (player.options.statTabResources + 1) % stateCount;
    },
  }
};
</script>

<template>
  <div class="c-stats-tab">
    <div class="c-subtab-option-container">
      <button
        class="o-primary-btn o-primary-btn--subtab-option"
        @click="cycleButton()"
      >
        显示 {{ resourceText }}
      </button>
    </div>
    <PastPrestigeRunsContainer
      v-for="layer in layers"
      :key="layer.name"
      :layer="layer"
    />
  </div>
</template>
