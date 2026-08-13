<script>
import PrimaryButton from "@/components/PrimaryButton";
import TimeDimensionRow from "./ClassicTimeDimensionRow";

export default {
  name: "ClassicTimeDimensionsTab",
  components: {
    PrimaryButton,
    TimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: new Decimal(0),
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
      hasCap: true
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities.gte(1);
      this.totalUpgrades.copyFrom(player.totalTickGained);
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerRealSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "第八无限维度" : "时间碎片";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
      this.hasCap = Alpha.currentStage < 11 || player.disablePostReality;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
  }
};
</script>

<template>
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        购买最大数量
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        自动购买器状态切换
      </PrimaryButton>
    </div>
    <div>
      <p>
                你已获得
        <span class="c-time-dim-description__accent">{{ formatHybridLarge(totalUpgrades, 3) }}</span> 免费计数频率升级和
        <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span> 时间碎片。
      </p>
      <p>
        下一个计数频率提升需要
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>，每获得一个计数频率升级增加
        <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>。
      </p>
    </div>
    <div>
      计数频率所需的时间碎片会在 {{ formatHybridLarge(tickspeedSoftcap, 3) }} 个升级后增加。
    </div>
    <div>
      你每秒获得 {{ format(shardsPerSecond, 2, 0) }} 个{{ incomeType }}。
    </div>
    <div class="l-dimensions-container">
      <TimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      时间维度的价格倍率在 {{ format(costIncreases[0], 2, 2) }} 和
      {{ format(costIncreases[1]) }} 永恒点数时增加。
      <br>
      {{ format(costIncreases[2]) }} 永恒点数后，进一步提高时间维度的价格倍率。
      <br>
      <div v-if="showLockedDimCostNote">
        按住Shift键可查看它的价格。
      </div>
      <div v-if="hasCap">
        第八时间维度购买超过 {{ formatInt(1e8) }} 次后将不再增加倍率。
      </div>
    </div>
  </div>
</template>
