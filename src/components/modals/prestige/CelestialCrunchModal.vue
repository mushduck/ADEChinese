<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "CelestialCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedCelestialInfinities: new Decimal(),
      gainedCelestialInfinityPoints: new Decimal(),
      startingBoosts: new Decimal(0),
      startingCM: 0,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstCelInfinity() {
      return !player.endgame.celDimExpansion.celestialInfinities;
    },
    message() {
      const info = this.isFirstCelInfinity ? this.firstCelInfinityInfo : ``;
      return `天界无限后，所有天界维度、天界维度提升和天界星系都将被重置。${info}`;
    },
    firstCelInfinityInfo() {
      return `作为回报，你将获得一个天界无限点数（缩写：CIP）。它可用于购买多个升级，你可以
在“天界无限”标签页中找到这些升级。你还将获得一个天界无限次数，它会在“统计数据”标签页中显示。`;
    },
    cipGainInfo() {
      return `你将获得 ${quantify("无限次数", this.gainedCelestialInfinities, 2, 0)}
        和 ${quantify("天界无限点数", this.gainedCelestialInfinityPoints, 2, 0)}.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingCM.gte(0)) gainedResources.push(`${quantify("天界物质", this.startingCM, 2, 1)}`);
      if (this.startingBoosts.gt(0)) gainedResources.push(`${quantify("天界维度提升", this.startingBoosts)}`);
      if (this.willStartWithGalaxy) gainedResources.push(`${quantify("天界星系", 1)}`);

      return `你将会以 ${makeEnumeration(gainedResources)} 开始下一次无限。`;
    }
  },
  methods: {
    update() {
      this.gainedCelestialInfinities = gainedCelestialInfinities().round();
      this.gainedCelestialInfinityPoints = gainedCelestialInfinityPoints().round();
      this.startingBoosts.copyFrom(CelestialDimBoost.startingDimensionBoosts);
      this.startingCM = Currency.celestialMatter.startingValue;
      this.willStartWithGalaxy = false;
    },
    handleYesClick() {
      celestialCrunchResetRequest();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    header="你将要进行无限"
    :message="message"
    :gained-resources="cipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstCelInfinity"
    :alternate-text="message"
    :confirm-option="isFirstCelInfinity ? undefined : 'celestialCrunch'"
  />
</template>
