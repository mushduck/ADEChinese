<script>
export default {
  name: "SaveTimer",
  data() {
    return {
      currentTime: 0,
      cloudSaveEnabled: false,
      lastLocalSave: 0,
      lastCloudSave: 0,
      showTimeSinceSave: false,
      saveDisabled: false,
    };
  },
  computed: {
    timeString() {
      const localStr = timeDisplayShort(new Decimal(this.currentTime - this.lastLocalSave));
      const cloudStr = timeDisplayShort(new Decimal(this.currentTime - this.lastCloudSave));
      return this.cloudSaveEnabled
        ? `${localStr} （本地） | ${cloudStr} （云端）`
        : localStr;
    },
  },
  methods: {
    update() {
      this.currentTime = Date.now();
      this.cloudSaveEnabled = player.options.cloudEnabled && Cloud.loggedIn;
      this.lastLocalSave = GameStorage.lastSaveTime;
      this.lastCloudSave = GameStorage.lastCloudSave;
      this.showTimeSinceSave = player.options.showTimeSinceSave;
      this.saveDisabled = GameEnd.endState >= END_STATE_MARKERS.INTERACTIVITY_DISABLED;
    },
    save() {
      GameStorage.save(false, true);
    }
  }
};
</script>

<template>
  <div
    v-if="showTimeSinceSave"
    class="o-save-timer"
    @click="save"
  >
    <b v-if="saveDisabled">存档已禁用</b>
    <span v-else>距离上次存档：{{ timeString }}</span>
  </div>
</template>

<style scoped>
.o-save-timer {
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  text-align: left;
  color: var(--color-text);
  background-color: var(--color-base);
  border-top: 0.1rem solid var(--color-accent);
  border-right: 0.1rem solid var(--color-accent);
  padding: 0 0.5rem;
  pointer-events: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}

.t-s2 .o-save-timer {
  filter: sepia(100%) hue-rotate(180deg) saturate(250%);
}

.t-s3 .o-save-timer {
  animation: a-glasses 7s infinite;
}
</style>
