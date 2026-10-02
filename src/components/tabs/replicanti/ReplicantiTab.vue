<script>
import wordShift from "@/core/word-shift";

import ReplicantiUpgradeButton, { ReplicantiUpgradeButtonSetup } from "./ReplicantiUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";
import ReplicantiGainText from "./ReplicantiGainText";
import ReplicantiGalaxyButton from "./ReplicantiGalaxyButton";

export default {
  name: "ReplicantiTab",
  components: {
    PrimaryButton,
    ReplicantiGainText,
    ReplicantiUpgradeButton,
    ReplicantiGalaxyButton,
  },
  data() {
    return {
      isUnlocked: false,
      isUnlockAffordable: false,
      isInEC8: false,
      ec8Purchases: 0,
      amount: new Decimal(),
      mult: new Decimal(),
      hasTDMult: false,
      multTD: new Decimal(),
      hasDTMult: false,
      multDT: new Decimal(),
      hasIPMult: false,
      multIP: new Decimal(),
      hasDEMult: false,
      multDE: new Decimal(),
      hasPow: false,
      pow: 0,
      hasTDPow: false,
      powTD: 0,
      hasDTPow: false,
      powDT: 0,
      hasIPPow: false,
      powIP: 0,
      hasDEPow: false,
      powDE: 0,
      hasRaisedCap: false,
      replicantiCap: new Decimal(),
      capMultText: "",
      distantRG: 0,
      remoteRG: 0,
      contingentRG: 0,
      isContingent: false,
      effarigInfinityBonusRG: 0,
      isUncapped: false,
      nextEffarigRGThreshold: 0,
      canSeeGalaxyButton: false,
      unlockCost: new Decimal(),
      scrambledText: "",
      maxReplicanti: new Decimal(),
      estimateToMax: 0,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    replicantiChanceSetup() {
      return new ReplicantiUpgradeButtonSetup(
        ReplicantiUpgrade.chance,
        value => `复制概率：${formatDecimalPercents(value)}`,
        cost => `+${formatPercents(0.01)} 价格：${format(cost)} 无限点数`
      );
    },
    replicantiIntervalSetup() {
      const upgrade = ReplicantiUpgrade.interval;
      function formatInterval(interval) {
        const actualInterval = upgrade.applyModifiers(interval);
        const intervalNum = actualInterval.toNumber();
        if (
          Number.isFinite(intervalNum) &&
          intervalNum > 1 &&
          upgrade.isCapped
        ) {
          // Checking isCapped() prevents text overflow when formatted as "__ ➜ __"
          return TimeSpan.fromMilliseconds(new Decimal(intervalNum)).toStringShort(false);
        }
        if (actualInterval.lt(0.01)) return `< ${format(0.01, 2, 2)}毫秒`;
        if (actualInterval.gt(1000))
          return `${format(actualInterval.div(1000), 2, 2)}秒`;
        return `${format(actualInterval, 2, 2)}毫秒`;
      }
      return new ReplicantiUpgradeButtonSetup(
        upgrade,
        value => `复制间隔：${formatInterval(value)}`,
        cost =>
          `➜ ${formatInterval(upgrade.nextValue)} 价格：${format(cost)} 无限点数`
      );
    },
    maxGalaxySetup() {
      const upgrade = ReplicantiUpgrade.galaxies;
      return new ReplicantiUpgradeButtonSetup(
        upgrade,
        value => {
          let description = `复制器星系上限：`;
          const extra = upgrade.extra;
          if (extra.gt(0)) {
            const total = value.add(extra);
            description += `<br>${formatHybridLarge(value, 3)} + ${formatHybridLarge(extra, 3)} = ${formatHybridLarge(total, 3)}`;
          } else {
            description += formatHybridLarge(value, 3);
          }
          return description;
        },
        cost => `+${formatInt(1)} 价格：${format(cost)} 无限点数`
      );
    },
    boostText() {
      const boostList = [];
      boostList.push(`无限维度效果提升 <span class="c-replicanti-description__accent">${formatX(this.mult, 2, 2)}</span>${this.hasPow ? `，指数 <span class="c-replicanti-description__accent">${formatPow(this.pow, 2, 3)}</span>` : ""}`);
      if (this.hasTDMult) {
        boostList.push(`来自膨胀升级的时间维度效果提升 <span class="c-replicanti-description__accent">${formatX(this.multTD, 2, 2)}</span>${this.hasTDPow ? `，指数 <span class="c-replicanti-description__accent">${formatPow(this.powTD, 2, 3)}</span>` : ""}`);
      }
      if (this.hasDTMult) {
        const additionalEffect = GlyphAlteration.isAdded("replication") ? "和复制速度" : "";
        boostList.push(`从已装备的符文中获得 <span class="c-replicanti-description__accent">${formatX(this.multDT, 2, 2)}</span> 倍的膨胀时间${this.hasDTPow ? `，指数 <span class="c-replicanti-description__accent">${formatPow(this.powDT, 2, 3)}</span>` : ""}${additionalEffect}`);
      }
      if (this.hasIPMult) {
        boostList.push(`从符文炼金中获得 <span class="c-replicanti-description__accent">${formatX(this.multIP)}</span> 倍的无限点数${this.hasIPPow ? `，指数 <span class="c-replicanti-description__accent">${formatPow(this.powIP, 2, 3)}</span>` : ""}`);
      }
      if (this.hasDEMult) {
        boostList.push(`从阿尔法奖励中获得 <span class="c-replicanti-description__accent">${formatX(this.multDE, 2, 2)}</span> 的暗能量倍率${this.hasDEPow ? `，<span class="c-replicanti-description__accent">${formatPow(this.powDE, 2, 3)}</span> 的暗能量倍率指数` : ""}`);
      }
      if (boostList.length === 1) return `${boostList[0]}。`;
      if (boostList.length === 2) return `${boostList[0]}<br>以及${boostList[1]}。`;
      return `${boostList.slice(0, -1).join("，<br>")}，<br>以及${boostList[boostList.length - 1]}。`;
    },
    hasMaxText: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    toMaxTooltip() {
      if (this.amount.lte(this.replicantiCap)) return null;
      return this.estimateToMax.lt(0.01)
        ? "正在增长"
        : TimeSpan.fromSeconds(this.estimateToMax).toStringShort();
    }
  },
  methods: {
    update() {
      this.isUnlocked = Replicanti.areUnlocked;
      this.unlockCost = new Decimal(1e140).dividedByEffectOf(PelleRifts.vacuum.milestones[1]);
      if (this.isDoomed) this.scrambledText = this.vacuumText();
      if (!this.isUnlocked) {
        this.isUnlockAffordable = Currency.infinityPoints.gte(this.unlockCost);
        return;
      }
      this.isInEC8 = EternityChallenge(8).isRunning;
      if (this.isInEC8) {
        this.ec8Purchases = player.eterc8repl;
      }
      this.amount.copyFrom(Replicanti.amount);
      this.mult.copyFrom(ReplicantiMultipliers.idMult);
      this.hasTDMult = DilationUpgrade.tdMultReplicanti.isBought;
      this.multTD.copyFrom(ReplicantiMultipliers.tdMult);
      this.hasDTMult = getAdjustedGlyphEffect("replicationdtgain").neq(0) && !Pelle.isDoomed;
      this.multDT.copyFrom(ReplicantiMultipliers.dtMult);
      this.hasIPMult = !player.disablePostReality && AlchemyResource.exponential.amount > 0 && !this.isDoomed;
      this.multIP.copyFrom(ReplicantiMultipliers.ipMult);
      this.hasDEMult = !player.disablePostReality && Alpha.currentStage >= 21;
      this.multDE.copyFrom(ReplicantiMultipliers.deMult);
      this.hasPow = ResurgenceUpgrade.repSurge.isBought && !player.disablePostReality;
      this.pow = ReplicantiMultipliers.idPow;
      this.hasTDPow = ResurgenceUpgrade.repSurge.isBought && DilationUpgrade.tdMultReplicanti.isBought && !player.disablePostReality;
      this.powTD = ReplicantiMultipliers.tdPow;
      this.hasDTPow = ResurgenceUpgrade.repSurge.isBought && getAdjustedGlyphEffect("replicationdtgain").neq(0) && !Pelle.isDoomed && !player.disablePostReality;
      this.powDT = ReplicantiMultipliers.dtPow;
      this.hasIPPow = ResurgenceUpgrade.repSurge.isBought && !player.disablePostReality && AlchemyResource.exponential.amount > 0 && !this.isDoomed;
      this.powIP = ReplicantiMultipliers.ipPow;
      this.hasDEPow = ResurgenceUpgrade.repSurge.isBought && !player.disablePostReality && Alpha.currentStage >= 21;
      this.powDE = ReplicantiMultipliers.dePow;
      this.isUncapped = PelleRifts.vacuum.milestones[1].canBeApplied;
      this.hasRaisedCap = (EffarigUnlock.infinity.isUnlocked && !this.isUncapped) || (Pelle.isDoomed && PelleCelestialUpgrade.replicantiCapIncrease.canBeApplied);
      this.replicantiCap.copyFrom(replicantiCap());
      if (this.hasRaisedCap) {
        const mult = this.replicantiCap.div(DC.NUMMAX);
        this.capMultText = TimeStudy(31).canBeApplied
          ? `基础值：${formatX(mult.pow(1 / TimeStudy(31).effectValue), 2)}；时间研究 31 之后：${formatX(mult, 2)}`
          : formatX(mult, 2);
      }
      this.distantRG = ReplicantiUpgrade.galaxies.distantRGStart;
      this.remoteRG = ReplicantiUpgrade.galaxies.remoteRGStart;
      this.contingentRG = ReplicantiUpgrade.galaxies.contingentRGStart;
      this.isContingent = Replicanti.galaxies.bought.gte(this.contingentRG);
      this.effarigInfinityBonusRG = Effarig.bonusRG;
      this.nextEffarigRGThreshold = DC.NUMMAX.pow(
        Effarig.bonusRG + 2
      );
      this.canSeeGalaxyButton =
        Replicanti.galaxies.max.gte(1) || PlayerProgress.eternityUnlocked();
      this.maxReplicanti.copyFrom(player.records.thisReality.maxReplicanti);
      this.estimateToMax = this.calculateEstimate();
    },
    vacuumText() {
      return wordShift.wordCycle(PelleRifts.vacuum.name);
    },
    // This is copied out of a short segment of ReplicantiGainText with comments and unneeded variables stripped
    calculateEstimate() {
      const updateRateMs = player.options.updateRate;
      const logGainFactorPerTick = Decimal.divide(getGameSpeedupForDisplay().times(updateRateMs).times(
        (Decimal.ln(player.replicanti.chance.add(1)))), getReplicantiInterval());
      const postScale = Math.log10(ReplicantiGrowth.scaleFactor) / ReplicantiGrowth.scaleLog10;
      const nextMilestone = this.maxReplicanti;
      const coeff = Decimal.divide(updateRateMs / 1000, logGainFactorPerTick.times(postScale));
      return coeff.times(nextMilestone.divide(this.amount).pow(postScale).minus(1));
    }
  },
};
</script>

<template>
  <div class="l-replicanti-tab">
    <br>
    <PrimaryButton
      v-if="!isUnlocked"
      :enabled="isUnlockAffordable"
      class="o-primary-btn--replicanti-unlock"
      onclick="Replicanti.unlock();"
    >
      解锁复制器
      <br>
      价格：{{ format(unlockCost) }} 无限点数
    </PrimaryButton>
    <template v-else>
      <div
        v-if="isDoomed"
        class="modified-cap"
      >
        由于第二个 {{ scrambledText }} 里程碑，已移除复制器上限。
      </div>
      <div
        v-else-if="hasRaisedCap"
        class="modified-cap"
      >
        完成鹿颈长的现实的无限阶段提供了以下奖励：
        <br>
        在没有时间研究192的情况下，你的复制器上限已提升至 {{ format(replicantiCap, 2) }}
        ({{ capMultText }})。
        <br>
        获得{{ quantifyHybridLarge("额外的复制器星系", effarigInfinityBonusRG) }}
        (下一个复制器星系将在 {{ format(nextEffarigRGThreshold, 2) }} 出现)
      </div>
      <p class="c-replicanti-description">
        你拥有
        <span class="c-replicanti-description__accent">{{ format(amount, 2, 0) }}</span>
        复制器，将
        <br>
        <span v-html="boostText" />
      </p>
      <div
        v-if="hasMaxText"
        class="c-replicanti-description"
      >
        此次现实中最大的复制器数量是
        <span
          v-tooltip="toMaxTooltip"
          class="max-accent"
        >{{ format(maxReplicanti, 2) }}</span>。
      </div>
      <br>
      <div v-if="isInEC8">
        你还能买{{ quantifyInt("次", ec8Purchases) }}(永恒挑战 8)。
      </div>
      <div class="l-replicanti-upgrade-row">
        <ReplicantiUpgradeButton :setup="replicantiChanceSetup" />
        <ReplicantiUpgradeButton :setup="replicantiIntervalSetup" />
        <ReplicantiUpgradeButton :setup="maxGalaxySetup" />
      </div>
      <div>
        最大复制器星系上限升级可以无限购买，但是其价格
        <br>
        会在超过 {{ formatInt(distantRG) }} 复制器星系时大幅增加，
        超过 {{ formatInt(remoteRG) }} 复制器星系后会更加剧烈。
      </div>
      <br>
      <div
        v-if="isContingent"
        class="contingency-text"
      >
        你的复制器星系在宇宙中占据了过多的空间，其数量已到达临界值。
        <br>
        该效应始于 {{ formatInt(contingentRG) }} 个复制器星系，并将持续至永远。
      </div>
      <br><br>
      <ReplicantiGainText />
      <br>
      <ReplicantiGalaxyButton v-if="canSeeGalaxyButton" />
    </template>
  </div>
</template>

<style scoped>
.max-accent {
  color: var(--color-accent);
  text-shadow: 0 0 0.2rem var(--color-reality-dark);
  cursor: default;
}

.modified-cap {
  margin: -0.8rem 0 0.8rem;
  font-weight: bold;
}

.contingency-text {
  color: var(--color-pelle--base);
  text-shadow: 0 0 0.2rem var(--color-pelle--base);
  cursor: default;
}
</style>
