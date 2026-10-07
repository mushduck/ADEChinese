<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import EternityChallengeBox from "./EternityChallengeBox";

export default {
  name: "EternityChallengesTab",
  components: {
    ChallengeTabHeader,
    ChallengeGrid,
    EternityChallengeBox
  },
  data() {
    return {
      unlockedCount: 0,
      showAllChallenges: false,
      autoEC: false,
      isAutoECVisible: false,
      hasUpgradeLock: false,
      remainingECTiers: 0,
      untilNextEC: TimeSpan.zero,
      untilAllEC: TimeSpan.zero,
      hasECR: false,
    };
  },
  computed: {
    challenges() {
      return EternityChallenges.all;
    },
    upgradeLockNameText() {
      return RealityUpgrade(12).isLockingMechanics
        ? RealityUpgrade(12).name
        : ImaginaryUpgrade(15).name;
    },
    nextECText() {
      return this.untilNextEC.totalMilliseconds === 0 && !this.autoEC
        ? "重新启用自动完成永恒挑战时"
        : `现实时间经过 ${this.untilNextEC} 后`;
    },
    allECText() {
      return this.untilAllEC.totalMilliseconds === 0 && !this.autoEC
        ? "重新启用自动完成永恒挑战时"
        : `现实时间经过 ${this.untilAllEC} 后`;
    }
  },
  methods: {
    update() {
      this.showAllChallenges = player.options.showAllChallenges;
      this.unlockedCount = EternityChallenges.all
        .filter(this.isChallengeVisible)
        .length;
      this.isAutoECVisible = (Perk.autocompleteEC1.canBeApplied || EndgameMastery(22).isBought) && !player.disablePostReality;
      this.autoEC = player.reality.autoEC;
      const shouldPreventEC7 = TimeDimension(1).amount.gt(0);
      this.hasUpgradeLock = RealityUpgrade(12).isLockingMechanics ||
        (ImaginaryUpgrade(15).isLockingMechanics && shouldPreventEC7 &&
          !Array.range(1, 6).some(ec => !EternityChallenge(ec).isFullyCompleted));
      const remainingCompletions = EternityChallenges.remainingCompletions;
      this.remainingECTiers = remainingCompletions;
      if (remainingCompletions !== 0) {
        const autoECInterval = EternityChallenges.autoComplete.interval;
        const untilNextEC = Math.max(autoECInterval - player.reality.lastAutoEC, 0);
        this.untilNextEC.setFrom(new Decimal(untilNextEC));
        this.untilAllEC.setFrom(new Decimal(untilNextEC + (autoECInterval * (remainingCompletions - 1))));
      }
      this.hasECR = Perk.studyECRequirement.isBought;
    },
    isChallengeVisible(challenge) {
      return challenge.completions > 0 || challenge.isUnlocked || challenge.hasUnlocked ||
        (this.showAllChallenges && PlayerProgress.realityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div v-if="isAutoECVisible">
      启用自动完成永恒挑战后，将按序号顺序自动完成永恒挑战。完成下一个永恒挑战之前，需要完成所有序号在该永恒挑战之前的永恒挑战。
    </div>
    <div
      v-if="isAutoECVisible && remainingECTiers > 0"
      class="c-challenges-tab__auto-ec-info l-challenges-tab__auto-ec-info"
    >
      <div class="l-challenges-tab__auto-ec-timers">
        <span
          v-if="hasUpgradeLock"
          class="l-emphasis"
        >
          因升级“{{ upgradeLockNameText }}”的条件锁，暂时禁用自动完成永恒挑战的功能。
        </span>
        <span v-if="remainingECTiers > 0">
          下一个自动永恒挑战完成：{{ nextECText }}
        </span>
        <span>
          全部自动永恒挑战完成：{{ allECText }}
        </span>
        <br>
      </div>
    </div>
    <div>
      再次完成永恒挑战可获得更高奖励，最多可重复 {{ formatInt(5) }} 次。<br>
      奖励效果永久生效，也无需购买对应的永恒挑战时间研究。
    </div>
    <div v-if="!hasECR">
      当你重置已解锁的永恒挑战时，无需重新达成次要解锁条件即可再次解锁（直至完成该挑战）；仅需消耗时间之理数。
    </div>
    <div v-if="unlockedCount !== 12">
      你已解锁 {{ formatInt(unlockedCount) }} / {{ formatInt(12) }} 个永恒挑战。
    </div>
    <div v-else>
      你已解锁全部 {{ formatInt(12) }} 个永恒挑战。
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <EternityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>
.l-emphasis {
  font-weight: bold;
  color: var(--color-bad);
}
</style>
