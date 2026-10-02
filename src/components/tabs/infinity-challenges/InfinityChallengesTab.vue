<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import InfinityChallengeBox from "./InfinityChallengeBox";

export default {
  name: "InfinityChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    InfinityChallengeBox
  },
  data() {
    return {
      nextIC: 0,
      showAllChallenges: false
    };
  },
  computed: {
    challenges() {
      return InfinityChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextIC?.id === 1;
      const next = InfinityChallenges.nextICUnlockAM;

      if (first) return `第一个无限挑战需要 ${format(next)} 反物质解锁。`;
      return next === undefined
        ? "所有无限挑战已解锁。"
        : `下一个无限挑战需要 ${format(next)} 反物质解锁。`;
    }
  },
  methods: {
    update() {
      this.nextIC = InfinityChallenges.nextIC;
      this.showAllChallenges = player.options.showAllChallenges;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      如果启用自动大坍缩，不论采用何种设置，当反物质数量接近挑战目标时，它会尽全力强制进行一次大坍缩。
    </div>
    <div>{{ nextAtDisplay }}</div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <InfinityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
