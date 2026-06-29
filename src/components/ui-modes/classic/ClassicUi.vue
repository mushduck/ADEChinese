<script>
import BigCrunchButton from "../BigCrunchButton";
import DivinityButton from "../DivinityButton";
import GameHeader from "../GameHeader";
import NewsTicker from "../NewsTicker";
import NullifyButton from "../NullifyButton";


import ClassicSubtabBar from "./ClassicSubtabBar";
import ClassicTabBar from "./ClassicTabBar";
import EternityPointsHeader from "@/components/EternityPointsHeader";
import InfinityPointsHeader from "@/components/InfinityPointsHeader";

export default {
  name: "ClassicUi",
  components: {
    GameHeader,
    ClassicSubtabBar,
    ClassicTabBar,
    NewsTicker,
    InfinityPointsHeader,
    EternityPointsHeader,
    BigCrunchButton,
    DivinityButton,
    NullifyButton
  },
  data() {
    return {
      bigCrunch: false,
      divine: false,
      nullified: false,
      smallCrunch: false,
      newGameKey: "",
    };
  },
  computed: {
    tab: () => Tabs.current,
    news() {
      return this.$viewModel.news;
    }
  },
  methods: {
    update() {
      const crunchButtonVisible = !player.break && Player.canCrunch;
      const divinityVisible = Pelle.isDoomed && player.antimatter.gte(DC.ENUMMAX);
      const nullifyVisible = player.endgame.largeHadronCollider.void.nullMatter.gte(DC.NUMMAX) &&
        !player.endgame.largeHadronCollider.void.nullified;
      this.bigCrunch = crunchButtonVisible && Time.bestInfinityRealTime.totalMinutes.gt(1);
      this.divine = divinityVisible;
      this.nullified = nullifyVisible;
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;
    }
  },
};
</script>

<template>
  <div
    id="container"
    :key="newGameKey"
    class="container c-old-ui l-old-ui"
  >
    <link
      rel="stylesheet"
      type="text/css"
      href="stylesheets/old-ui.css"
    >
    <BigCrunchButton />
    <DivinityButton />
    <NullifyButton />
    <template v-if="!bigCrunch && !divine && !nullified">
      <NewsTicker
        v-if="news"
        class="l-old-ui__news-bar"
      />
      <GameHeader class="l-old-ui__header" />
      <ClassicTabBar />
      <component
        :is="tab.config.before"
        v-if="tab.config.before"
      />
      <ClassicSubtabBar />
      <div class="l-old-ui__page">
        <slot />
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
