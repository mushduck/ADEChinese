<script>
export default {
  name: "DilationButton",
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(),
      canEternity: false,
      eternityGoal: new Decimal(),
      tachyonGain: new Decimal(),
      remnantRequirement: 0,
      showRequirement: false,
      creditsClosed: false
    };
  },
  computed: {
    disableText() {
      // Doesn't need to be reactive or check strike status; it's always permanent once entered in Doomed
      return Pelle.isDoomed && !PelleStrikes.dilation.isDestroyed() ? "时间膨胀永久生效。" : "禁用时间膨胀";
    }
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.dilationUnlocked();
      this.isRunning = player.dilation.active;
      this.remnantRequirement = Pelle.remnantRequirementForDilation;
      this.showRequirement = Pelle.isDoomed && !Pelle.canDilateInPelle;
      if (!this.isRunning) return;
      this.canEternity = Player.canEternity;
      // This lets this.hasGain be true even before eternity.
      this.hasGain = getTachyonGain(false).gt(0);
      if (this.canEternity && this.hasGain) {
        this.tachyonGain.copyFrom(getTachyonGain(true));
      } else if (this.hasGain) {
        this.eternityGoal.copyFrom(Player.eternityGoal);
      } else {
        this.requiredForGain.copyFrom(getTachyonReq());
      }
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    dilate() {
      if (this.creditsClosed) return;
      startDilatedEternityRequest();
    }
  }
};
</script>

<template>
  <button
    class="o-dilation-btn"
    :class="isUnlocked ? 'o-dilation-btn--unlocked' : 'o-dilation-btn--locked'"
    @click="dilate()"
  >
    <span v-if="!isUnlocked">解锁时间膨胀后解锁。</span>
    <span v-else-if="!isRunning">
      进入时间膨胀
      <div v-if="showRequirement">
        需要 {{ format(remnantRequirement, 2) }} 遗物
      </div>
    </span>
    <span v-else-if="canEternity && hasGain">
      {{ disableText }}
      <br>
      获得 {{ quantify("超光速粒子", tachyonGain, 2, 1) }}。
    </span>
    <span v-else-if="hasGain">
      {{ disableText }}
      <br>
      达到 {{ quantify("无限点数", eternityGoal, 1, 0) }} 进行永恒并获得超光速粒子。
    </span>
    <span v-else>
      {{ disableText }}
      <br>
      达到 {{ format(requiredForGain, 2, 1) }} 反物质以获得更多超光速粒子。
    </span>
  </button>
</template>

<style scoped>

</style>
