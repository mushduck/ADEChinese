<script>
export default {
  name: "RealityReminder",
  data() {
    return {
      canReality: false,
      isVisible: false,
      isExpanded: false,
      ecCount: 0,
      missingAchievements: 0,
      unpurchasedDilationUpgrades: 0,
      currLog10EP: new Decimal(),
      cheapestLog10TD: new Decimal(),
      multEPLog10Cost: new Decimal(),
      purchasableTS: 0,
      hasDilated: 0,
      availableCharges: 0,
    };
  },
  computed: {
    suggestions() {
      if (this.purchasableTS > 0) {
        arr.push(`购买更多时间研究（可购买 ${formatInt(this.purchasableTS)} 个）`);
      }
      if (this.missingAchievements > 0) {
        arr.push(`完成剩余的成就 （剩余 ${formatInt(this.missingAchievements)} 个）`);
      }
      if (this.unpurchasedDilationUpgrades > 0) {
        arr.push(`购买剩余的膨胀升级 （剩余 ${formatInt(this.unpurchasedDilationUpgrades)} 个）`);
      }
      if (this.currLog10EP > 1.3 * this.cheapestLog10TD) {
        arr.push(`购买更多时间维度（最小价格：${format(Decimal.pow10(this.cheapestLog10TD))} 永恒点数）`);
      }
      if (this.currLog10EP > 1.3 * this.multEPLog10Cost) {
        arr.push(`购买更多 ${formatX(5)} 永恒点数倍增（价格：${format(Decimal.pow10(this.multEPLog10Cost))} 永恒点数）`);
      }
      if (this.ecCount < 60) {
        arr.push(`完成剩余的永恒挑战（已完成：${formatInt(this.ecCount)}/${formatInt(60)}）`);
      }
      if (!this.hasDilated) {
        arr.push("时间膨胀一次");
      }
      if (this.availableCharges > 0) {
        arr.push(`充能更多的无限升级 （可充能 ${formatInt(this.availableCharges)} 个）`);
      }
      return arr;
    },
    canBeExpanded() {
      return this.canReality && this.suggestions.length !== 0;
    },
    styleObject() {
      const color = (!this.canReality || this.canBeExpanded) ? "var(--color-bad)" : "var(--color-good)";
      // Has both is and canBe in order to force the height back to its minimum size when all suggestions are done
      const height = (this.canBeExpanded && this.isExpanded) ? `${6.5 + 1.5 * this.suggestions.length}rem` : "5rem";
      return {
        color,
        height,
      };
    },
    clickText() {
      return `（点击以${this.isExpanded ? "收起" : "展开"}）`;
    },
    realityReminderClass() {
      return {
        "c-reality-reminder": true,
        "c-reality-reminder-pointer": this.canBeExpanded,
      };
    },
    dropDownIconClass() {
      return this.isExpanded ? "far fa-minus-square" : "far fa-plus-square";
    }
  },
  created() {
    // Collapsing it after every reality resets the height to its fixed minimum value, stopping screen jitter
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, () => this.isExpanded = false);
  },
  methods: {
    update() {
      this.canReality = TimeStudy.reality.isBought;
      this.isVisible = !isInCelestialReality();
      this.ecCount = EternityChallenges.completions;
      this.missingAchievements = Achievements.preReality.countWhere(a => !a.isUnlocked);
      // Repeatable dilation upgrades don't have isBought, but do have boughtAmount
      this.unpurchasedDilationUpgrades = DilationUpgrade.all
        .countWhere(u => (u.isBought === undefined ? u.boughtAmount === 0 : !u.isBought) && !u.config.pelleOnly);
      this.currLog10EP = player.eternityPoints.add(1).log10();
      this.cheapestLog10TD = Decimal.min(...TimeDimensions.all.map(x => x.cost.add(1).log10()));
      this.multEPLog10Cost = EternityUpgrade.epMult.cost.add(1).log10();
      this.purchasableTS = NormalTimeStudyState.studies.countWhere(s => s && s.canBeBought && !s.isBought);
      this.hasDilated = Perk.startTP.canBeApplied ? player.dilation.lastEP.gt(0)
        : player.dilation.tachyonParticles.gt(0);
      this.availableCharges = Ra.chargesLeft;
    },
    clicked() {
      if (!this.canBeExpanded) return;
      this.isExpanded = !this.isExpanded;
    },
  }
};
</script>

<template>
  <div
    v-if="isVisible"
    :class="realityReminderClass"
    :style="styleObject"
    @click="clicked"
  >
    <span v-if="!canReality">
      你仍然需要在时间研究标签页解锁现实。
    </span>
    <span v-else-if="suggestions.length === 0">
      已准备现实！你已解锁本次现实中所有可用的升级！
    </span>
    <span v-else>
      <i :class="dropDownIconClass" />
      你可能需要在现实前完成 {{ formatInt(suggestions.length) }} 件事情。 {{ clickText }}
      <div
        v-if="isExpanded"
        class="l-suggestions"
      >
        <br>
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
        >
          {{ suggestion }}
        </div>
      </div>
    </span>
  </div>
</template>

<style scoped>
.l-suggestions {
  font-size: 1rem;
}

.c-reality-reminder-pointer {
  cursor: pointer;
}
</style>
