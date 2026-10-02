<script>
import AutobuyerToggles from "./AutobuyerToggles";
import BigCrunchAutobuyerBox from "./BigCrunchAutobuyerBox";
import BulkSingularityAutobuyerBox from "./BulkSingularityAutobuyerBox";
import CelestialCrunchAutobuyerBox from "./CelestialCrunchAutobuyerBox";
import CelestialDimensionBoostAutobuyerBox from "./CelestialDimensionBoostAutobuyerBox";
import CelestialEternityAutobuyerBox from "./CelestialEternityAutobuyerBox";
import CelestialGalaxyAutobuyerBox from "./CelestialGalaxyAutobuyerBox";
import CelestialTickspeedAutobuyerBox from "./CelestialTickspeedAutobuyerBox";
import DimensionAutobuyerBox from "./DimensionAutobuyerBox";
import DimensionBoostAutobuyerBox from "./DimensionBoostAutobuyerBox";
import EndgameAutobuyerBox from "./EndgameAutobuyerBox";
import EternityAutobuyerBox from "./EternityAutobuyerBox";
import GalaxyAutobuyerBox from "./GalaxyAutobuyerBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import RealityAutobuyerBox from "./RealityAutobuyerBox";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox";
import TickspeedAutobuyerBox from "./TickspeedAutobuyerBox";

export default {
  name: "AutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    EndgameAutobuyerBox,
    RealityAutobuyerBox,
    CelestialEternityAutobuyerBox,
    EternityAutobuyerBox,
    CelestialCrunchAutobuyerBox,
    BigCrunchAutobuyerBox,
    CelestialGalaxyAutobuyerBox,
    GalaxyAutobuyerBox,
    CelestialDimensionBoostAutobuyerBox,
    DimensionBoostAutobuyerBox,
    BulkSingularityAutobuyerBox,
    CelestialTickspeedAutobuyerBox,
    TickspeedAutobuyerBox,
    DimensionAutobuyerBox,
    SimpleAutobuyersMultiBox
  },
  data() {
    return {
      hasInfinity: false,
      hasContinuum: false,
      displayADAutobuyersIndividually: false,
      hasInstant: false,
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} 毫秒`;
    }
  },
  methods: {
    update() {
      this.hasInfinity = PlayerProgress.infinityUnlocked();
      this.hasContinuum = Laitela.continuumActive;
      this.checkADAutoStatus();
    },
    checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;
      // Since you don't need to buy autobuyers in Doomed and unbought ones are hidden, we can check if only the
      // autobuyers you can see (ie, have unlocked) have been maxed.
      if (Pelle.isDoomed) {
        this.displayADAutobuyersIndividually = !ad.zeroIndexed.filter(x => x.isUnlocked)
          .every(x => x.hasUnlimitedBulk && x.hasMaxedInterval);
        return;
      }
      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },
  }
};
</script>

<template>
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      自动购买器间隔与时间相关设置始终采用<b>现实时间</b>计算，因此
      <br>
      不受任何可能改变游戏运行速度的因素影响。
      <br>
      <br>
    </div>
    <div v-if="!hasInfinity">
      解锁自动购买器升级的挑战需在达成无限状态后开启。
    </div>
    <b>未显示数量限制的自动购买器默认拥有无限数量处理能力。</b>
    <b>
      反物质维度自动购买器的批量操作升级需在触发间隔低于 {{ formatInt(100) }} 毫秒时解锁。
    </b>
    <b v-if="hasInstant">间隔为“立即”的自动购买器将在每个游戏时刻（{{ gameTickLength }}）触发。</b>
    <EndgameAutobuyerBox class="c-endgame-pos" />
    <RealityAutobuyerBox class="c-reality-pos" />
    <CelestialEternityAutobuyerBox class="c-celestial-eternity-pos" />
    <EternityAutobuyerBox class="c-eternity-pos" />
    <CelestialCrunchAutobuyerBox class="c-celestial-infinity-pos" />
    <BigCrunchAutobuyerBox class="c-infinity-pos" />
    <CelestialGalaxyAutobuyerBox />
    <GalaxyAutobuyerBox />
    <CelestialDimensionBoostAutobuyerBox />
    <DimensionBoostAutobuyerBox />
    <BulkSingularityAutobuyerBox />
    <CelestialTickspeedAutobuyerBox />
    <TickspeedAutobuyerBox v-if="!hasContinuum" />
    <template v-if="displayADAutobuyersIndividually">
      <DimensionAutobuyerBox
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
</template>

<style scoped>
/* This is necessary for the ExpandingControlBox within these components to render in the right stacking order
when they're open. It looks slightly hacky but actually can't be done any other way; each AutobuyerBox creates
its own stacking context, which means that all z-indices specified within are essentially scoped and the
AutobuyerBox components will always render in page order regardless of internal z-indices without these. */
.c-endgame-pos {
  z-index: 6;
}
  
.c-reality-pos {
  z-index: 5;
}

.c-celestial-eternity-pos {
  z-index: 4;
}

.c-eternity-pos {
  z-index: 3;
}

.c-celestial-infinity-pos {
  z-index: 2;
}

.c-infinity-pos {
  z-index: 1;
}
</style>
