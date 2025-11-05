<script>
export default {
  name: "EndgameMilestoneButton",
  props: {
    getMilestone: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isReached: false,
    };
  },
  computed: {
    milestone() {
      return this.getMilestone();
    },
    config() {
      return this.milestone.config;
    },
    endgames() {
      return this.config.endgames;
    },
    reward() {
      const reward = this.config.reward;
      return typeof reward === "function" ? reward() : reward;
    },
    rewardClassObject() {
      return {
        "o-endgame-milestone__reward": true,
        "o-endgame-milestone__reward--locked": !this.isReached,
        "o-endgame-milestone__reward--reached": this.isReached,
        "o-endgame-milestone__reward--small-font": this.reward.length > 80
      };
    },
    activeCondition() {
      return this.config.activeCondition ? this.config.activeCondition() : null;
    },
  },
  methods: {
    update() {
      this.isReached = this.milestone.isReached;
    }
  }
};
</script>

<template>
  <div
    v-if="!config.invisible"
    class="l-endgame-milestone"
  >
    <span class="o-endgame-milestone__goal">
      {{ quantifyInt("Endgame", endgames) }}:
    </span>
    <button
      v-tooltip="activeCondition"
      :class="rewardClassObject"
    >
      <span>
        {{ reward }}
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
