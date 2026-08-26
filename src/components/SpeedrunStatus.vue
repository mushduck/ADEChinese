<script>
export default {
  name: "SpeedrunStatus",
  data() {
    return {
      isActive: false,
      isSegmented: false,
      usedSTD: false,
      hasStarted: false,
      startDate: 0,
      saveName: "",
      timePlayedStr: "",
      offlineProgress: false,
      offlineFraction: 0,
      mostRecent: {},
      isCollapsed: false,
      timeSince: 0,
      seedText: 0,
      canModifySeed: false,
      isComplete: false,
    };
  },
  computed: {
    statusText() {
      if (this.isComplete) return `<span style="color: var(--color-good)">已完成！</span>`;
      return this.hasStarted
        ? `<span style="color: var(--color-good)">正在进行！</span>`
        : `<span style="color: var(--color-bad)">未开始</span>`;
    },
    segmentText() {
      return this.isSegmented ? "分段速通（导出和导入存档）" : "单段速通（无存档导出导入）";
    },
    iapText() {
      return this.usedSTD ? "已使用应用内购" : "不使用应用内购";
    },
    offlineText() {
      const stateText = this.offlineProgress
        ? `<span style="color: var(--color-good)">Enabled</span>`
        : `<span style="color: var(--color-bad)">Disabled</span>`;
      const fractionText = this.offlineFraction === 0
        ? "未使用离线进度"
        : `离线进度用时 (${formatPercents(this.offlineFraction, 2)}`;
      return `${stateText} ${fractionText}`;
    },
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    }
  },
  methods: {
    update() {
      const speedrun = player.speedrun;
      this.isActive = speedrun.isActive;
      this.canModifySeed = Speedrun.canModifySeed();
      // Short-circuit if speedrun isn't active; updating some later stuff can cause vue errors outside of speedruns
      if (!this.isActive) return;
      this.isSegmented = speedrun.isSegmented;
      this.usedSTD = speedrun.usedSTD;
      this.hasStarted = speedrun.hasStarted;
      this.startDate = speedrun.startDate;
      this.saveName = speedrun.name;
      this.isCollapsed = speedrun.hideInfo;
      this.isComplete = Achievement(188).isUnlocked;

      this.timePlayedStr = Time.realTimePlayed.toStringShort();
      this.offlineProgress = player.options.offlineProgress;
      this.offlineFraction = speedrun.offlineTimeUsed / Math.clampMin(player.records.realTimePlayed, 1);
      this.mostRecent = Speedrun.mostRecentMilestone();
      this.timeSince = Time.realTimePlayed.minus(TimeSpan.fromMilliseconds(new Decimal(speedrun.records[this.mostRecent] ?? 0)))
        .toStringShort();
      this.seedText = Speedrun.seedModeText();
    },
    milestoneName(id) {
      const db = GameDatabase.speedrunMilestones;
      return id === 0 ? "无" : db.find(m => m.id === id).name;
    },
    changeName() {
      if (this.hasStarted) return;
      Modal.changeName.show();
    },
    collapseText() {
      return this.isCollapsed ? "展开" : `点击以收起速通信息`;
    },
    toggleCollapse() {
      player.speedrun.hideInfo = !this.isCollapsed;
    },
    openSeedModal() {
      if (!this.canModifySeed) return;
      Modal.modifySeed.show();
    }
  },
};
</script>

<template>
  <div
    v-if="isActive"
    class="c-speedrun-status"
  >
    <div v-if="!isCollapsed">
      <b>速通状态 (<span v-html="statusText" />)</b>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': !hasStarted }"
        @click="changeName"
      >
        玩家名：{{ saveName }}
      </span>
      <br>
      <i>{{ segmentText }}</i>
      <br>
      <i>{{ iapText }}</i>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': canModifySeed }"
        @click="openSeedModal()"
      >{{ seedText }}</span>
      <br>
      自开始以来所经历的真实时间：{{ timePlayedStr }}
      <br>
      离线进度：<span v-html="offlineText" />
      <br>
      最近的速通里程碑：{{ milestoneName(mostRecent) }} <span v-if="mostRecent">({{ timeSince }} 前)</span>
      <br>
    </div>
    <div
      class="c-speedrun-status--collapse"
      @click="toggleCollapse"
    >
      <i :class="collapseIcon" />
      {{ collapseText() }}
      <i :class="collapseIcon" />
    </div>
  </div>
</template>

<style scoped>
.c-speedrun-status {
  white-space: nowrap;
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  z-index: 5;
  font-size: 1.2rem;
  color: var(--color-text);
  background-color: var(--color-base);
  border: var(--var-border-width, 0.2rem) solid var(--color-accent);
  padding: 0.8rem 2rem;
  pointer-events: auto;
  -webkit-user-select: none;
  user-select: none;
}

.c-speedrun-status--can-change {
  text-decoration: underline;
  cursor: pointer;
}

.c-speedrun-status--collapse {
  padding: 0.2rem;
  cursor: pointer;
}
</style>
