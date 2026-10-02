<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "InfinityChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return InfinityChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted;
    },
    message() {
      return `你将执行大坍缩（如果可能）并在挑战中开启新的无限进程，同时所有挑战特殊限制与改动效果生效。为完成该挑战${this.challengeIsCompleted ? "" : "并获得奖励"}，你必须达成 ${format(InfinityChallenge(this.id).goal)} 反物质的挑战目标。无论升级如何，你都不会以任何维度提升或星系开始。`;
    },
    entranceLabel() {
      return `你将要进入无限挑战 ${this.id}`;
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description;
      if (typeof rewardDescription === "function") {
        rewardDescription = rewardDescription();
      }
      return `完成该挑战的奖励为: ${rewardDescription}`;
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      return `进入这个挑战后，${conditionOfChallenge}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      开始
    </template>
  </ModalWrapperChoice>
</template>
