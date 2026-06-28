<script>
export default {
  name: "DivinityMilestoneButton",
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
    descriptionLines() {
      return this.config.reward.split("\n").map(x => x.trim());
    },
    divinities() {
      return this.config.divinities;
    },
    reward() {
      const reward = this.config.reward;
      return typeof reward === "function" ? reward() : reward;
    },
    rewardClassObject() {
      return {
        "o-divinity-milestone__reward": true,
        "o-divinity-milestone__reward--locked": !this.isReached,
        "o-divinity-milestone__reward--reached": this.isReached
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
    v-if="isReached"
    class="l-divinity-milestone"
  >
    <span class="o-divinity-milestone__goal">
      {{ quantifyInt("Divinity", divinities) }}:
    </span>
    <button
      v-tooltip="activeCondition"
      :class="rewardClassObject"
    >
      <div
        v-for="(description, descriptionKey) in descriptionLines"
        :key="descriptionKey"
        class="c-divinity-reward-description"
      >
        {{ description }}
      </div>
    </button>
  </div>
</template>

<style scoped>
.c-divinity-reward-description {
  text-align: left;
}
</style>
