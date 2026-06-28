<script>
import BigCrunchButton from "../BigCrunchButton";
import DivinityButton from "../DivinityButton";
import HeaderBlackHole from "../HeaderBlackHole";
import HeaderChallengeDisplay from "../HeaderChallengeDisplay";
import HeaderChallengeEffects from "../HeaderChallengeEffects";
import HeaderPrestigeGroup from "../HeaderPrestigeGroup";
import NewsTicker from "../NewsTicker";
import NullifyButton from "../NullifyButton";

import GameSpeedDisplay from "@/components/GameSpeedDisplay";


export default {
  name: "ModernUi",
  components: {
    BigCrunchButton,
    DivinityButton,
    NullifyButton,
    HeaderChallengeDisplay,
    HeaderChallengeEffects,
    NewsTicker,
    HeaderBlackHole,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
  },
  data() {
    return {
      bigCrunch: false,
      divine: false,
      nullified: false,
      hasReality: false,
      newGameKey: "",
    };
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topMargin() {
      return this.$viewModel.news ? "" : "margin-top: 3.9rem";
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
      this.hasReality = PlayerProgress.realityUnlocked();
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;
    },
    handleClick() {
      if (PlayerProgress.infinityUnlocked()) manualBigCrunchResetRequest();
      else Modal.bigCrunch.show();
    }
  },
};
</script>

<template>
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="stylesheets/new-ui-styles.css"
    >
    <div
      :key="newGameKey"
      class="game-container"
      :style="topMargin"
    >
      <NewsTicker
        v-if="news"
      />
      <BigCrunchButton />
      <DivinityButton />
      <NullifyButton />
      <div
        v-if="!bigCrunch && !divine && !nullified"
        class="tab-container"
      >
        <HeaderPrestigeGroup />
        <div class="information-header">
          <HeaderChallengeDisplay />
          <HeaderChallengeEffects />
          <GameSpeedDisplay v-if="hasReality" />
          <br v-if="hasReality">
          <HeaderBlackHole />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
