<script>
export default {
  name: "EternityButton",
  data() {
    return {
      isVisible: false,
      type: EP_BUTTON_DISPLAY_TYPE.FIRST_TIME,
      gainedEP: new Decimal(0),
      currentEP: new Decimal(0),
      currentEPRate: new Decimal(0),
      peakEPRateVal: new Decimal(0),
      peakEPRate: new Decimal(0),
      currentTachyons: new Decimal(0),
      gainedTachyons: new Decimal(0),
      challengeCompletions: 0,
      gainedCompletions: 0,
      fullyCompleted: false,
      failedRestriction: undefined,
      hasMoreCompletions: false,
      nextGoalAt: new Decimal(0),
      canEternity: false,
      eternityGoal: new Decimal(0),
      hover: false,
      headerTextColored: true,
      creditsClosed: false,
      showEPRate: false,
      isDilation: false,
      penteractAffordable: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-eternity-button": !this.isDilation,
        "o-eternity-button--dilation": this.isDilation,
        "o-eternity-button--unavailable": !this.canEternity,
        "o-pelle-disabled-pointer": this.creditsClosed,
      };
    },
    // Show EP/min below this threshold, color the EP number above it (1e40 is roughly when TS181 is attainable)
    rateThreshold: () => 1e40,
    amountStyle() {
      if (!this.headerTextColored || this.currentEP.lt(this.rateThreshold)) return {
        "transition-duration": "0s"
      };
      if (this.hover) return {
        color: "black",
        "transition-duration": "0.2s"
      };

      // Dynamically generate red-text-green based on the CSS entry for text color, returning a raw 6-digit hex color
      // code. stepRGB is an array specifying the three RGB codes, which are then interpolated between in order to
      // generate the final color; only ratios between 0.9-1.1 give a color gradient
      const textHexCode = getComputedStyle(document.body).getPropertyValue("--color-text").split("#")[1];
      const stepRGB = [
        [255, 0, 0],
        [
          parseInt(textHexCode.substring(0, 2), 16),
          parseInt(textHexCode.substring(2, 4), 16),
          parseInt(textHexCode.substring(4), 16)
        ],
        [0, 255, 0]
      ];
      const ratio = this.gainedEP.log10().div(this.currentEP.log10());
      const interFn = index => {
        if (ratio.lt(0.9)) return stepRGB[0][index];
        if (ratio.lt(1)) {
          const r = (ratio.sub(0.9)).times(10).toNumber();
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio.lt(1.1)) {
          const r = (ratio.sub(1)).times(10).toNumber();
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        color: `rgb(${rgb.join(",")})`,
        "transition-duration": "0.2s"
      };
    },
    tachyonAmountStyle() {
      // Hovering over the button makes all the text on the button black; this text inherits that
      // without us needing to specify a color.
      if (!this.headerTextColored || this.hover) return {
        "transition-duration": "0s"
      };
      // Note that Infinity and 0 can show up here. We have a special case for
      // this.currentTachyons being 0 because dividing a Decimal by 0 returns 0.
      let ratio;
      if (this.currentTachyons.eq(0)) {
        // In this case, make it always red or green.
        // (Is it possible to gain 0 tachyons? Probably somehow it is.)
        ratio = this.gainedTachyons.eq(0) ? 0 : Infinity;
      } else {
        ratio = this.gainedTachyons.div(this.currentTachyons).toNumber();
      }

      const rgb = [
        Math.round(Math.clampMax(1 / ratio, 1) * 255),
        Math.round(Math.clampMax(ratio, 1) * 255),
        Math.round(Math.clampMax(ratio, 1 / ratio) * 255),
      ];
      return { color: `rgb(${rgb.join(",")})` };
    }
  },
  methods: {
    update() {
      this.isVisible = Player.canEternity ||
        EternityMilestone.autoUnlockID.isReached || InfinityDimension(8).isUnlocked;
      this.isDilation = player.dilation.active;
      if (!this.isVisible) return;
      this.canEternity = Player.canEternity;
      this.eternityGoal.copyFrom(Player.eternityGoal);
      this.headerTextColored = player.options.headerTextColored;

      if (!this.canEternity) {
        this.type = EP_BUTTON_DISPLAY_TYPE.CANNOT_ETERNITY;
        return;
      }

      if (!PlayerProgress.eternityUnlocked()) {
        this.type = EP_BUTTON_DISPLAY_TYPE.FIRST_TIME;
        return;
      }

      if (EternityChallenge.isRunning) {
        if (!Perk.studyECBulk.isBought) {
          this.type = EP_BUTTON_DISPLAY_TYPE.CHALLENGE;
          return;
        }
        this.type = EP_BUTTON_DISPLAY_TYPE.CHALLENGE_RUPG;
        this.updateChallengeWithRUPG();
        return;
      }

      const gainedEP = gainedEternityPoints();
      this.currentEP.copyFrom(Currency.eternityPoints);
      this.gainedEP.copyFrom(gainedEP);
      const hasNewContent = !PlayerProgress.realityUnlocked() &&
        Currency.eternityPoints.value.add(1).log10().gte(4000) &&
        !TimeStudy.reality.isBought;
      if (this.isDilation) {
        this.type = hasNewContent
          ? EP_BUTTON_DISPLAY_TYPE.DILATION_EXPLORE_NEW_CONTENT
          : EP_BUTTON_DISPLAY_TYPE.DILATION;
        this.currentTachyons.copyFrom(Currency.tachyonParticles);
        this.gainedTachyons.copyFrom(getTachyonGain(true));
        return;
      }

      this.type = hasNewContent
        ? EP_BUTTON_DISPLAY_TYPE.NORMAL_EXPLORE_NEW_CONTENT
        : EP_BUTTON_DISPLAY_TYPE.NORMAL;
      this.currentEPRate.copyFrom(gainedEP.dividedBy(
        TimeSpan.fromMilliseconds(new Decimal(player.records.thisEternity.realTime)).totalMinutes));
      this.peakEPRateVal.copyFrom(player.records.thisEternity.bestEPminVal);
      this.peakEPRate.copyFrom(player.records.thisEternity.bestEPmin);
      this.showEPRate = this.peakEPRate.lte(this.rateThreshold);
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.penteractAffordable = Penteracts.canBuyPenteract;
    },
    updateChallengeWithRUPG() {
      const ec = EternityChallenge.current;
      this.fullyCompleted = ec.isFullyCompleted;
      if (this.fullyCompleted) return;
      const status = ec.gainedCompletionStatus;
      this.gainedCompletions = status.gainedCompletions;
      this.failedRestriction = status.failedRestriction;
      this.hasMoreCompletions = status.hasMoreCompletions;
      this.nextGoalAt.copyFrom(status.nextGoalAt);
    },
    switchToHypercubes() {
      Tab.endgame.hypercubes.show(true);
    }
  },
};

const EP_BUTTON_DISPLAY_TYPE = {
  CANNOT_ETERNITY: -1,
  FIRST_TIME: 0,
  NORMAL: 1,
  CHALLENGE: 2,
  DILATION: 3,
  NORMAL_EXPLORE_NEW_CONTENT: 4,
  DILATION_EXPLORE_NEW_CONTENT: 5,
  CHALLENGE_RUPG: 6
};
</script>

<template>
  <button
    v-if="isVisible && !penteractAffordable"
    :class="buttonClassObject"
    class="o-prestige-button"
    onclick="eternityResetRequest()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Cannot Eternity -->
    <template v-if="type === -1">
      达到 {{ format(eternityGoal, 2, 2) }}
      <br>
      无限点数
    </template>

    <!-- First time -->
    <template v-else-if="type === 0">
      时间之外在等着我……我将永生。
    </template>

    <!-- Normal -->
    <template v-else-if="type === 1">
      获得
      <span :style="amountStyle">{{ format(gainedEP, 2) }}</span>
      <span v-if="showEPRate"> 永恒点数</span>
      <span v-else> 永恒{{ pluralize("点数", gainedEP) }}</span>
      <br>
      <template v-if="showEPRate">
        当前：{{ format(currentEPRate, 2, 2) }} 永恒点数/分
        <br>
        峰值：{{ format(peakEPRate, 2, 2) }} 永恒点数/分
        <br>
        峰值时获得 {{ format(peakEPRateVal, 2, 2) }} 永恒点数
      </template>
    </template>

    <!-- Challenge -->
    <template v-else-if="type === 2 || (type === 6 && !canEternity)">
      下一个挑战在等着我………我将永生。
    </template>

    <!-- Dilation -->
    <template v-else-if="type === 3">
      获得 <span :style="tachyonAmountStyle">{{ format(gainedTachyons, 2, 1) }}</span>
      {{ pluralize("超光速粒子", gainedTachyons) }}
    </template>

    <!-- New content available -->
    <template v-else-if="type === 4 || type === 5">
      <template v-if="type === 4">
        获得 <span :style="amountStyle">{{ format(gainedEP, 2, 2) }}</span> 永恒点数
      </template>
      <template v-else>
        获得 <span :style="tachyonAmountStyle">{{ format(gainedTachyons, 2, 1) }}</span> 超光速粒子
      </template>
      <br>
      在点击前，你该到处看看新内容！
    </template>

    <!-- Challenge with multiple completions -->
    <template v-else-if="type === 6">
      下一个挑战在等着我...
      <template v-if="fullyCompleted">
        <br>
        （这个挑战已全部完成）
      </template>
      <template v-else>
        <br>
        永恒以完成 {{ quantifyInt("次挑战", gainedCompletions) }}
        <template v-if="failedRestriction">
          <br>
          {{ failedRestriction }}
        </template>
        <template v-else-if="hasMoreCompletions">
          <br>
          下一个目标：{{ format(nextGoalAt) }} 无限点数
        </template>
      </template>
    </template>
  </button>

  <button
    v-else-if="penteractAffordable"
    class="o-prestige-button c-game-header__penteract-available"
    :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
    @click="switchToHypercubes"
  >
    <b>
      你有充足的永恒点数来购买一个超五方体
    </b>
  </button>
</template>

<style scoped>

</style>
