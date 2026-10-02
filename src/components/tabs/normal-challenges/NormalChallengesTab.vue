<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import NormalChallengeBox from "./NormalChallengeBox";

export default {
  name: "NormalChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    NormalChallengeBox
  },
  computed: {
    challenges() {
      return NormalChallenges.all;
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      一些普通挑战需要完成要求才能进入。
    </div>
    <div>
      如果启用自动大坍缩，不论采用何种设置，当反物质数量接近挑战目标时，它会尽全力强制进行一次大坍缩。
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
    >
      <NormalChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
