<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ChallengeTabHeader",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      retryChallenge: false,
      isInChallenge: false,
      isShowAllVisible: false,
      isAutoECVisible: false,
      showAllChallenges: false,
      autoEC: false,
    };
  },
  watch: {
    retryChallenge(newValue) {
      player.options.retryChallenge = newValue;
    },
    autoEC(newValue) {
      player.reality.autoEC = newValue;
    },
    showAllChallenges(newValue) {
      player.options.showAllChallenges = newValue;
    },
  },
  methods: {
    update() {
      this.retryChallenge = player.options.retryChallenge;
      this.showAllChallenges = player.options.showAllChallenges;
      this.isInChallenge = Player.isInAnyChallenge;
      this.isShowAllVisible = PlayerProgress.eternityUnlocked();
      this.isAutoECVisible = (Perk.autocompleteEC1.canBeApplied || EndgameMastery(22).isBought) && !player.disablePostReality;
      this.autoEC = player.reality.autoEC;
    },
    restartChallenge() {
      const current = Player.anyChallenge;
      if (Player.isInAnyChallenge) {
        current.exit(true);
        current.start();
      }
    },
    exitChallenge() {
      const current = Player.anyChallenge;
      if (Player.isInAnyChallenge) {
        current.exit(false);
      }
    },
  }
};
</script>

<template>
  <div class="l-challenges-tab__header">
    <div class="c-subtab-option-container">
      <PrimaryToggleButton
        v-model="retryChallenge"
        class="o-primary-btn--subtab-option"
        label="自动重试挑战："
      />
      <PrimaryToggleButton
        v-if="isShowAllVisible"
        v-model="showAllChallenges"
        class="o-primary-btn--subtab-option"
        label="显示所有已知挑战："
      />
      <PrimaryToggleButton
        v-if="isAutoECVisible"
        v-model="autoEC"
        class="o-primary-btn--subtab-option"
        label="自动完成："
      />
      <PrimaryButton
        v-if="isInChallenge"
        class="o-primary-btn--subtab-option"
        @click="restartChallenge"
      >
        重试挑战
      </PrimaryButton>
      <PrimaryButton
        v-if="isInChallenge"
        class="o-primary-btn--subtab-option"
        @click="exitChallenge"
      >
        放弃挑战
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>

</style>
