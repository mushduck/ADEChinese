<script>
import ArmageddonButton from "../../tabs/celestial-pelle/ArmageddonButton";
import RealityCurrencyHeader from "../../RealityCurrencyHeader";

import HeaderTickspeedInfo from "../HeaderTickspeedInfo";

import RealityButton from "./RealityButton";

import EndgameButton from "./EndgameButton";

import DivinityContainer from "./DivinityContainer";

// This component contains antimatter and antimatter rate at the start of the game, as well as some additional
// information depending on the UI (tickspeed for Classic, game speed for Modern). Everything but antimatter is
// removed once Reality is unlocked, to make room for the reality button
export default {
  name: "HeaderCenterContainer",
  components: {
    HeaderTickspeedInfo,
    RealityCurrencyHeader,
    RealityButton,
    ArmageddonButton,
    EndgameButton,
    DivinityContainer
  },
  data() {
    return {
      shouldDisplay: true,
      isModern: false,
      hasRealityButton: false,
      isDoomed: false,
      hasGalaxyGenerator: false,
      antimatter: new Decimal(0),
      antimatterPerSec: new Decimal(0),
      celestialPoints: new Decimal(0),
      doomedParticles: new Decimal(0),
      showEndgame: false,
      showDivine: false,
    };
  },
  methods: {
    update() {
      this.shouldDisplay = player.break || !Player.canCrunch;
      if (!this.shouldDisplay) return;

      this.isModern = player.options.newUI;
      this.isDoomed = Pelle.isDoomed;
      this.hasGalaxyGenerator = PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies.gt(0);
      this.antimatter.copyFrom(Currency.antimatter);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      if (!this.hasRealityButton) this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
      this.celestialPoints.copyFrom(Currency.celestialPoints);
      this.doomedParticles.copyFrom(Currency.doomedParticles);
      this.showEndgame = PlayerProgress.endgameUnlocked();
      this.showDivine = DivinityMilestone.divineDimensions.isReached;
    },
  },
};
</script>

<template>
  <div
    v-if="shouldDisplay"
    class="c-prestige-button-container"
  >
    <div
      v-if="showEndgame"
    >
      你拥有 <span class="cp-text">{{ format(celestialPoints, 2) }}</span> {{ pluralize("天界点数", celestialPoints) }}。
      你拥有 <span class="dp-text">{{ format(doomedParticles, 2) }}</span> {{ pluralize("毁灭粒子", doomedParticles) }}。
    <br>
    </div>
    <span>你拥有 <span class="c-game-header__antimatter">{{ format(antimatter, 2, 1) }}</span> 反物质。</span>
    <div
      v-if="hasRealityButton"
      class="c-reality-container"
    >
      <RealityCurrencyHeader />
      <ArmageddonButton
        v-if="isDoomed && !hasGalaxyGenerator || !showEndgame && isDoomed"
        :is-header="true"
      />
      <EndgameButton
        v-if="hasGalaxyGenerator && showEndgame"
        :is-header="true"
      />
      <RealityButton
        v-if="!isDoomed"
        :is-header="true"
      />
    </div>
    <div v-else>
      你每秒获得 {{ format(antimatterPerSec, 2) }} 反物质。
      <br>
      <HeaderTickspeedInfo />
    </div>
    <div v-if="showDivine">
      <DivinityContainer />
    </div>
  </div>
</template>

<style scoped>
.c-reality-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.cp-text {
  color: var(--color-endgame);
}
.dp-text {
  color: var(--color-pelle--base);
}
</style>
