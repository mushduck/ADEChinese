<script>
export default {
  name: "CompressionButton",
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(),
      canInfinity: false,
      infinityGoal: new Decimal(),
      hawkingRadiationGain: new Decimal(),
      creditsClosed: false,
      gainSpaces: 0
    };
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.compressionUnlocked();
      this.isRunning = player.compression.active;
      if (!this.isRunning) return;
      this.canInfinity = Player.canCrunch;
      // This lets this.hasGain be true even before infinity.
      this.hasGain = getHawkingRadiationGain(false).gt(0);
      if (this.canInfinity && this.hasGain) {
        this.hawkingRadiationGain.copyFrom(getHawkingRadiationGain(true));
      } else if (this.canInfinity) {
        this.requiredForGain.copyFrom(getHawkingRadiationReq());
      } else {
        this.infinityGoal.copyFrom(Player.infinityGoal);
      }
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.gainSpaces = this.hawkingRadiationGain.lt(1) ? 3 : (this.hawkingRadiationGain.lt(10) ? 2 : 1);
    },
    compress() {
      if (this.creditsClosed) return;
      startCompressionRequest();
    }
  }
};
</script>

<template>
  <button
    class="o-compression-btn"
    :class="isUnlocked ? 'o-compression-btn--unlocked' : 'o-compression-btn--locked'"
    @click="compress()"
  >
    <span v-if="!isUnlocked">购买对应终局专精以解锁时间压缩</span>
    <span v-else-if="!isRunning">
      压缩时间。
    </span>
    <span v-else-if="canInfinity && hasGain">
      退出时间压缩
      <br>
      获得 {{ quantify("霍金辐射", hawkingRadiationGain, 2, gainSpaces) }}。
    </span>
    <span v-else-if="canInfinity">
      退出时间压缩
      <br>
      达到 {{ format(requiredForGain, 2, 1) }} 反物质以获得更多霍金辐射。
    </span>
    <span v-else>
      退出时间压缩
      <br>
      达到 {{ quantify("反物质", infinityGoal, 1, 0) }} 以获得更多霍金辐射。
    </span>
  </button>
</template>

<style scoped>

</style>
