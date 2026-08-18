<script>
import { MatterScale } from "./matter-scale";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      totalAntimatterOutsideDoom: new Decimal(0),
      bestDoomedAntimatterThisDivinity: new Decimal(0),
      totalCelMatter: new Decimal(0),
      totalDivineMatter: new Decimal(0),
      hasSeenDivineDims: false,
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        totalInfinityAntimatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        totalEternityAntimatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: new Decimal(0),
        totalRealityAntimatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      endgame: {
        isUnlocked: false,
        count: 0,
        totalEndgameAntimatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRateCP: new Decimal(0),
        bestRateDP: new Decimal(0),
      },
      celestialInfinity: {
        isUnlocked: false,
        count: new Decimal(0),
        totalCelestialInfinityCelMatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      celestialEternity: {
        isUnlocked: false,
        count: new Decimal(0),
        totalCelestialEternityCelMatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      divinity: {
        isUnlocked: false,
        count: 0
      },
      condense: {
        isUnlocked: false,
        count: new Decimal(0),
        totalCondenseDivineMatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      supernova: {
        isUnlocked: false,
        count: new Decimal(0),
        totalSupernovaDivineMatter: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    infinityCountString() {
      const num = this.infinity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    eternityCountString() {
      const num = this.eternity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    realityCountString() {
      const num = new Decimal(this.reality.count);
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    endgameCountString() {
      const num = new Decimal(this.endgame.count);
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    celestialInfinityCountString() {
      const num = this.celestialInfinity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    celestialEternityCountString() {
      const num = this.celestialEternity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    divinityCountString() {
      const num = new Decimal(this.divinity.count);
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    condenseCountString() {
      const num = this.condense.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    supernovaCountString() {
      const num = this.supernova.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("", num.floor())}`
        : "0";
    },
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(new Decimal(this.timeSinceCreation));
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.totalAntimatterOutsideDoom.copyFrom(player.records.totalAntimatterOutsideDoom);
      this.bestDoomedAntimatterThisDivinity.copyFrom(player.records.bestDoomedAntimatterThisDivinity);
      this.totalCelMatter.copyFrom(records.totalCelMatter);
      this.totalDivineMatter.copyFrom(records.totalDivineMatter);
      this.hasSeenDivineDims = DivinityMilestone.divineDimensions.isReached;
      this.realTimePlayed.setFrom(new Decimal(records.realTimePlayed));
      this.fullTimePlayed = TimeSpan.fromMilliseconds(
        new Decimal(records.previousRunRealTime + records.realTimePlayed));
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131).effects.bankedInfinitiesGain,
          TimeStudy(191).effects.bankedInfinitiesGain,
        );
        infinity.bankRate = infinity.projectedBanked.div(Decimal.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.totalInfinityAntimatter.copyFrom(records.totalInfinityAntimatter);
        infinity.hasBest = bestInfinity.time.lt(999999999999);
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.totalEternityAntimatter.copyFrom(records.totalEternityAntimatter);
        eternity.hasBest = bestEternity.time.lt(999999999999);
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count.copyFrom(Decimal.floor(Currency.realities.value));
        reality.totalRealityAntimatter.copyFrom(records.totalRealityAntimatter);
        reality.hasBest = bestReality.time.lt(999999999999);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(new Decimal(bestReality.realTime));
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(new Decimal(records.thisInfinity.realTime));
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(new Decimal(records.thisEternity.realTime));
        reality.thisReal.setFrom(new Decimal(records.thisReality.realTime));
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }

      const isEndgameUnlocked = progress.isEndgameUnlocked;
      const endgame = this.endgame;
      const bestEndgame = records.bestEndgame;
      endgame.isUnlocked = isEndgameUnlocked;
      
      if (isEndgameUnlocked) {
        endgame.count = Math.floor(player.endgames);
        endgame.totalEndgameAntimatter.copyFrom(records.totalEndgameAntimatter);
        endgame.hasBest = bestEndgame.realTime < 999999999999;
        endgame.best.setFrom(bestEndgame.time);
        endgame.bestReal.setFrom(new Decimal(bestEndgame.realTime));
        endgame.this.setFrom(records.thisEndgame.time);
        endgame.thisReal.setFrom(new Decimal(records.thisEndgame.realTime));
        endgame.bestRateCP.copyFrom(bestEndgame.bestCPmin);
        endgame.bestRateDP.copyFrom(bestEndgame.bestDPmin);
      }

      const isCelestialInfinityUnlocked = progress.isCelestialInfinityUnlocked;
      const celestialInfinity = this.celestialInfinity;
      const bestCelestialInfinity = records.bestCelestialInfinity;
      celestialInfinity.isUnlocked = isCelestialInfinityUnlocked;
      if (isCelestialInfinityUnlocked) {
        celestialInfinity.count.copyFrom(Currency.celestialInfinities);
        celestialInfinity.totalCelestialInfinityCelMatter.copyFrom(records.totalCelestialInfinityCelMatter);
        celestialInfinity.hasBest = bestCelestialInfinity.realTime < 999999999999;
        celestialInfinity.best.setFrom(bestCelestialInfinity.time);
        celestialInfinity.bestReal.setFrom(new Decimal(bestCelestialInfinity.realTime));
        celestialInfinity.this.setFrom(records.thisCelestialInfinity.time);
        celestialInfinity.thisReal.setFrom(new Decimal(records.thisCelestialInfinity.realTime));
        celestialInfinity.bestRate.copyFrom(bestCelestialInfinity.bestCIPminCelestialEternity);
      }

      const isCelestialEternityUnlocked = progress.isCelestialEternityUnlocked;
      const celestialEternity = this.celestialEternity;
      const bestCelestialEternity = records.bestCelestialEternity;
      celestialEternity.isUnlocked = isCelestialEternityUnlocked;
      if (isCelestialEternityUnlocked) {
        celestialEternity.count.copyFrom(Currency.celestialEternities);
        celestialEternity.totalCelestialEternityCelMatter.copyFrom(records.totalCelestialEternityCelMatter);
        celestialEternity.hasBest = bestCelestialEternity.realTime < 999999999999;
        celestialEternity.best.setFrom(bestCelestialEternity.time);
        celestialEternity.bestReal.setFrom(new Decimal(bestCelestialEternity.realTime));
        celestialEternity.this.setFrom(records.thisCelestialEternity.time);
        celestialEternity.thisReal.setFrom(new Decimal(records.thisCelestialEternity.realTime));
        celestialEternity.bestRate.copyFrom(bestCelestialEternity.bestCEPminCelestialReality);
      }

      const isDivinityUnlocked = progress.isDivinityUnlocked;
      const divinity = this.divinity;
      divinity.isUnlocked = isDivinityUnlocked;
      if (isDivinityUnlocked) {
        divinity.count = Math.floor(player.celestials.pelle.divinities);
      }

      const isCondenseUnlocked = progress.isCondenseUnlocked;
      const condense = this.condense;
      const bestCondense = records.bestCondense;
      condense.isUnlocked = isCondenseUnlocked;
      if (isCondenseUnlocked) {
        condense.count.copyFrom(Currency.condenses);
        condense.totalCondenseDivineMatter.copyFrom(records.totalCondenseDivineMatter);
        condense.hasBest = bestCondense.realTime < 999999999999;
        condense.best.setFrom(bestCondense.time);
        condense.bestReal.setFrom(new Decimal(bestCondense.realTime));
        condense.this.setFrom(records.thisCondense.time);
        condense.thisReal.setFrom(new Decimal(records.thisCondense.realTime));
        condense.bestRate.copyFrom(bestCondense.bestVSminSupernova);
      }

      const isSupernovaUnlocked = progress.isSupernovaUnlocked;
      const supernova = this.supernova;
      const bestSupernova = records.bestSupernova;
      supernova.isUnlocked = isSupernovaUnlocked;
      if (isSupernovaUnlocked) {
        supernova.count.copyFrom(Currency.supernovae);
        supernova.totalSupernovaDivineMatter.copyFrom(records.totalSupernovaDivineMatter);
        supernova.hasBest = bestSupernova.realTime < 999999999999;
        supernova.best.setFrom(bestSupernova.time);
        supernova.bestReal.setFrom(new Decimal(bestSupernova.realTime));
        supernova.this.setFrom(records.thisSupernova.time);
        supernova.thisReal.setFrom(new Decimal(records.thisSupernova.realTime));
        supernova.bestRate.copyFrom(bestSupernova.bestNebminTotal);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(new Decimal(player.records.realTimeDoomed));
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
};
</script>

<template>
  <div class="c-stats-tab">
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        查看内容摘要
      </PrimaryButton>
      <div class="c-stats-tab-title c-stats-tab-general">
        概况
      </div>
      <div class="c-stats-tab-general">
        <div>你总共制造了 {{ format(totalAntimatter, 2, 1) }} 个反物质。</div>
        <div v-if="divinity.isUnlocked">
          在本次神性中，你在被毁灭的现实内总共制造了 {{ format(bestDoomedAntimatterThisDivinity, 2, 1) }} 个反物质。
        </div>
        <div v-if="endgame.isUnlocked">
          你在被毁灭的现实外总共制造了 {{ format(totalAntimatterOutsideDoom, 2, 1) }} 个反物质。
        </div>
        <div v-if="endgame.isUnlocked">
          在本次终局中，你总共制造了 {{ format(endgame.totalEndgameAntimatter, 2, 1) }} 个反物质。
        </div>
        <div v-if="reality.isUnlocked" :class="{ 'c-stats-tab-doomed' : isDoomed }">
          在本次{{ isDoomed ? "末日" : "现实" }}中，你总共制造了 {{ format(reality.totalRealityAntimatter, 2, 1) }} 个反物质。
        </div>
        <div v-if="eternity.isUnlocked">
          在本次永恒中，你总共制造了 {{ format(eternity.totalEternityAntimatter, 2, 1) }} 个反物质。
        </div>
        <div v-if="infinity.isUnlocked">
          在本次无限中，你总共制造了 {{ format(infinity.totalInfinityAntimatter, 2, 1) }} 个反物质。
        </div>
        <div v-if="endgame.isUnlocked" class="c-stats-tab-celestials">
          你总共制造了 {{ format(totalCelMatter, 2, 1) }} 天界物质。
        </div>
        <div v-if="celestialEternity.isUnlocked" class="c-stats-tab-celestials">
          在本次天界永恒中，你总共制造了 {{ format(celestialEternity.totalCelestialEternityCelMatter, 2, 1) }} 天界物质。
        </div>
        <div v-if="celestialInfinity.isUnlocked" class="c-stats-tab-celestials">
          在本次天界无限中，你总共制造了 {{ format(celestialInfinity.totalCelestialInfinityCelMatter, 2, 1) }} 天界物质。
        </div>
        <div v-if="hasSeenDivineDims" class="c-stats-tab-divinity">
          你总共制造了 {{ format(totalDivineMatter, 2, 1) }} 神性物质。
        </div>
        <div v-if="supernova.isUnlocked" class="c-stats-tab-divinity">
          在本次超新星中，你总共制造了 {{ format(supernova.totalSupernovaDivineMatter, 2, 1) }} 神性物质。
        </div>
        <div v-if="condense.isUnlocked" class="c-stats-tab-divinity">
          在本次凝聚中，你总共制造了 {{ format(condense.totalCondenseDivineMatter, 2, 1) }} 神性物质。
        </div>
        <div>你已经游玩了 {{ realTimePlayed }}。（现实时间）</div>
        <div v-if="reality.isUnlocked">
          游戏中的你经历了 {{ reality.totalTimePlayed }} 的游戏内时间。
        </div>
        <div>
          你的存档创建于 {{ startDate }}（{{ saveAge }}之前）。
        </div>
        <br>
        <div>
          你总共阅读了 {{ quantifyHybridSmall("条新闻消息", totalNews) }}。
        </div>
        <div>
          你已发现 {{ quantifyInt("条不同的新闻消息", uniqueNews) }}。
        </div>
        <div>
          你已解锁 {{ quantifyInt("个隐藏成就", secretAchievementCount) }}。
        </div>
        <div v-if="paperclips">
          你拥有 {{ quantifyInt("个无用回形针", paperclips) }}。
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            你已通关游戏 {{ quantifyInt("次", fullGameCompletions) }}。
            <br>
            你在所有周目中总计游玩了 {{ fullTimePlayed }}。
          </b>
        </div>
      </div>
      <div>
        <br>
        <div class="c-matter-scale-container c-stats-tab-general">
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-infinity">
        无限
      </div>
      <div>
        你的无限次数为 {{ infinityCountString }}<span v-if="eternity.isUnlocked">（本次永恒）</span>。
      </div>
      <div v-if="infinity.banked.gt(0)">
        你拥有 {{ formatDecimalAmount(infinity.banked.floor()) }}
        {{ pluralize("储存的无限次数", infinity.banked.floor()) }}。
      </div>
      <div v-if="infinity.hasBest">
        你最快的无限用时为 {{ infinity.best.toStringShort() }}。
      </div>
      <div v-else>
        你<span v-if="eternity.isUnlocked">在本次永恒中</span>没有最快的无限用时。
      </div>
      <div>
        你在本次无限中已花费 {{ infinity.this.toStringShort() }}。
        <span v-if="reality.isUnlocked">
          （{{ infinity.thisReal.toStringShort() }} 现实时间）
        </span>
      </div>
      <div>
        你获得无限点数的最快速度
        <span v-if="eternity.count.gt(0)">（本次永恒）</span>
        为每分钟 {{ format(infinity.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-eternity">
        永恒
      </div>
      <div>
        你的永恒次数为 {{ eternityCountString }}<span v-if="reality.isUnlocked">（本次
        <span :class="{ 'c-stats-tab-doomed' : isDoomed }">{{ isDoomed ? "末日" : "现实" }}</span>）</span>。
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        永恒后你将增加 {{ formatDecimalAmount(infinity.projectedBanked.floor()) }}
        {{ pluralize("储存的无限次数", infinity.projectedBanked.floor()) }}
        （每分钟 {{ formatDecimalAmount(infinity.bankRate) }}）。
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        永恒后你将不会获得储存的无限次数。
      </div>
      <div v-if="eternity.hasBest">
        你最快的永恒用时为 {{ eternity.best.toStringShort() }}。
      </div>
      <div v-else>
        你<span v-if="reality.isUnlocked">在本次
        <span :class="{ 'c-stats-tab-doomed' : isDoomed }">{{ isDoomed ? "末日" : "现实" }}</span>中</span>没有最快的永恒用时。
      </div>
      <div>
        你在本次永恒中已花费 {{ eternity.this.toStringShort() }}。
        <span v-if="reality.isUnlocked">
          （{{ eternity.thisReal.toStringShort() }} 现实时间）
        </span>
      </div>
      <div>
        你获得永恒点数的最快速度
        <span v-if="reality.isUnlocked">（本次
        <span :class="{ 'c-stats-tab-doomed' : isDoomed }">{{ isDoomed ? "末日" : "现实" }}</span>）
        </span>
        为每分钟 {{ format(eternity.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div :class="realityClassObject()">
        {{ isDoomed ? "被毁灭的现实" : "现实" }}
      </div>
      <div>
        你的现实次数为 {{ realityCountString }}<span v-if="endgame.isUnlocked">（本次终局）</span>。
      </div>
      <div v-if="reality.hasBest">
        你最快的游戏时间现实用时为 {{ reality.best.toStringShort() }}。
        你最快的现实时间现实用时为 {{ reality.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你<span v-if="endgame.isUnlocked">在本次终局中</span>没有最快的现实用时。
      </div>
      <div :class="{ 'c-stats-tab-doomed' : isDoomed }">
        你在本次{{ isDoomed ? "末日" : "现实" }}中已花费 {{ reality.this.toStringShort() }}。
        （{{ reality.thisReal.toStringShort() }} 现实时间）
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
      >
        从毁灭你的现实至今，你经历了 {{ realTimeDoomed.toStringShort() }} 的现实时间。
      </div>
      <div>
        你获得现实机器的最快速度
        <span v-if="endgame.isUnlocked">（本次终局）</span>
        为每分钟 {{ format(reality.bestRate, 2, 2) }}。
      </div>
      <div>
        你的最高符文稀有度
        <span v-if="endgame.isUnlocked">（本次终局）</span>
        为 {{ formatRarity(reality.bestRarity) }}。</div>
      <br>
    </div>
    <div
      v-if="endgame.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-endgame">
        终局
      </div>
      <div>
        你的终局次数为 {{ endgameCountString }}。
      </div>
      <div v-if="endgame.hasBest">
        你最快的游戏时间终局用时为 {{ endgame.best.toStringShort() }}。
        你最快的现实时间终局用时为 {{ endgame.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你没有最快的终局用时。
      </div>
      <div>
        你在本次终局中已花费 {{ endgame.this.toStringShort() }}。
        （{{ endgame.thisReal.toStringShort() }} 现实时间）
      </div>
      <div>
        你获得天界点数的最快速度
        为每分钟 {{ format(endgame.bestRateCP, 2, 2) }}。
      </div>
      <div>
        你获得毁灭粒子的最快速度
        为每分钟 {{ format(endgame.bestRateDP, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="celestialInfinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-celestial-infinity">
        天界无限
      </div>
      <div>
        你的天界无限次数为 {{ celestialInfinityCountString }}<span v-if="celestialEternity.isUnlocked">（本次天界永恒）</span>。
      </div>
      <div v-if="celestialInfinity.hasBest">
        你最快的游戏时间天界无限用时为 {{ celestialInfinity.best.toStringShort() }}。
        你最快的现实时间天界无限用时为 {{ celestialInfinity.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你<span v-if="celestialEternity.isUnlocked">在本次天界永恒中</span>没有最快的天界无限用时。
      </div>
      <div>
        你在本次天界无限中已花费 {{ celestialInfinity.this.toStringShort() }}。
        （{{ celestialInfinity.thisReal.toStringShort() }} 现实时间）
      </div>
      <div>
        你获得天界无限点数的最快速度<span v-if="celestialEternity.isUnlocked">（本次天界永恒）</span>
        为每分钟 {{ format(celestialInfinity.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="celestialEternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-celestial-eternity">
        天界永恒
      </div>
      <div>
        你的天界永恒次数为 {{ celestialEternityCountString }}。
      </div>
      <div v-if="celestialEternity.hasBest">
        你最快的游戏时间天界永恒用时为 {{ celestialEternity.best.toStringShort() }}。
        你最快的现实时间天界永恒用时为 {{ celestialEternity.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你没有最快的天界永恒用时。
      </div>
      <div>
        你在本次天界永恒中已花费 {{ celestialEternity.this.toStringShort() }}。
        （{{ celestialEternity.thisReal.toStringShort() }} 现实时间）
      </div>
      <div>
        你获得天界永恒点数的最快速度
        为每分钟 {{ format(celestialEternity.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="divinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-divinity">
        神性
      </div>
      <div>
        你的神性次数为 {{ divinityCountString }}。
      </div>
      <br>
    </div>
    <div
      v-if="condense.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-condense">
        凝聚
      </div>
      <div>
        你的凝聚次数为 {{ condenseCountString }}<span v-if="supernova.isUnlocked">（本次超新星）</span>。
      </div>
      <div v-if="condense.hasBest">
        你最快的游戏时间凝聚用时为 {{ condense.best.toStringShort() }}。
        你最快的现实时间凝聚用时为 {{ condense.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你<span v-if="supernova.isUnlocked">在本次超新星中</span>没有最快的凝聚用时。
      </div>
      <div>
        你在本次凝聚中已花费 {{ condense.this.toStringShort() }}。
        （{{ condense.thisReal.toStringShort() }} 现实时间）
      </div>
      <div>
        你获得神性星辰的最快速度<span v-if="supernova.isUnlocked">（本次超新星）</span>
        为每分钟 {{ format(condense.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
    <div
      v-if="supernova.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-supernova">
        超新星
      </div>
      <div>
        你的超新星次数为 {{ supernovaCountString }}。
      </div>
      <div v-if="supernova.hasBest">
        你最快的游戏时间超新星用时为 {{ supernova.best.toStringShort() }}。
        你最快的现实时间超新星用时为 {{ supernova.bestReal.toStringShort() }}。
      </div>
      <div v-else>
        你没有最快的超新星用时。
      </div>
      <div>
        你在本次超新星中已花费 {{ supernova.this.toStringShort() }}。
        （{{ supernova.thisReal.toStringShort() }} 现实时间）
      </div>
      <div>
        你获得终结之星的最快速度
        为每分钟 {{ format(supernova.bestRate, 2, 2) }}。
      </div>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-matter-scale-container {
  height: 5rem;
}

.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 2rem;
  font-weight: bold;
}

.c-stats-tab-subheader {
  height: 15rem;
}

.c-stats-tab-infinity {
  color: var(--color-infinity);
}

.c-stats-tab-eternity {
  color: var(--color-eternity);
}

.c-stats-tab-reality {
  color: var(--color-reality);
}

.c-stats-tab-doomed {
  color: var(--color-pelle--base);
}

.c-stats-tab-endgame {
  color: var(--color-endgame);
}

.c-stats-tab-celestials {
  color: var(--color-celestials);
}

.c-stats-tab-celestial-infinity {
  background: linear-gradient(var(--color-infinity), var(--color-celestials));
  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.c-stats-tab-celestial-eternity {
  background: linear-gradient(var(--color-eternity), var(--color-celestials));
  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.c-stats-tab-divinity {
  color: var(--color-pelle--base);
}

.c-stats-tab-condense {
  background: linear-gradient(red, yellow, cyan);
  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.c-stats-tab-supernova {
  background: linear-gradient(cyan, blue, indigo, purple);
  background-clip: text;

  -webkit-text-fill-color: transparent;
}
</style>