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
  data() {
    return {
      showCharge: false,
      charges: 0,
      isFlipped: false
    };
  },
  computed: {
    challenges() {
      return NormalChallenges.all;
    }
  },
  methods: {
    update() {
      this.showCharge = Ascensions.oc3A.isUnlocked && player.endgame.overcharge.allowComplex;
      this.charges = Math.min(player.endgame.overcharge.completions.chall, 12);
      this.isFlipped = player.universes.current === 2;
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
      如果启用自动大坍缩，不论采用何种设置，当${this.isFlipped ? "物质" : "反物质"}数量接近挑战目标时，它会尽全力强制进行一次大坍缩。
    </div>
    <div v-if="showCharge">
      <br>
      {{ formatInt(charges) }}/{{ formatInt(12) }} 个普通挑战已被充能。
      你无法充能指定的普通挑战，充能将按普通挑战顺序消耗前 {{ formatInt(12) }} 个复构能量。
      <br>
      你可以按住 Shift 查看所有普通挑战的充能效果。
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
