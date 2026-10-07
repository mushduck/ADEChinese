<script>
import { GameProgress, ProgressChecker } from "@/core/storage/progress-checker";

import CatchupGroup from "@/components/modals/catchup/CatchupGroup";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "CatchupModal",
  components: {
    CatchupGroup,
    PrimaryButton,
  },
  props: {
    diff: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressStage: () => ProgressChecker.getProgressStage(player).id,
    suggestedResource() {
      return GameProgress(this.progressStage).suggestedResource;
    },
    timeString() {
      // If diff is zero, that means we opened it up via the button and don't need the text for last opening
      if (!this.diff) return null;
      return `距你上次启动游戏已过去 ${TimeSpan.fromMilliseconds(new Decimal(this.diff)).toString()}。`;
    },
    titleText() {
      return this.diff ? "进度追赶" : "内容摘要";
    }
  },
  methods: {
    stageName(stage) {
      return GameProgress(stage).name;
    }
  }
};
</script>

<template>
  <div class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ titleText }}
    </div>
    <div>
      {{ timeString }}
      若需回顾，以下是自游戏开始至今你已解锁的全部内容摘要（按进度阶段划分）。此处仅提供极简描述；点击内容标题或<i class="fas fa-question-circle" />图标可查看相关游戏帮助条目获取详细信息。
    </div>
    <div
      class="l-catchup-group-container"
      :style="{ 'height' : `${Math.clamp(3 * progressStage + 5, 15, 35)}rem` }"
    >
      <CatchupGroup
        v-for="group of progressStage"
        :key="group"
        :group="group"
        :name="stageName(group)"
      />
    </div>
    <span class="c-suggestion-text">
      基于你的当前进度，提升{{ suggestedResource }}可能对你有所助益。
    </span>
    <div class="l-confirm-padding">
      <PrimaryButton
        @click="emitClose"
      >
        确认
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.l-catchup-group-container {
  overflow-y: scroll;
  width: 100%;
  text-align: left;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-radius, 0.4rem);
  margin: 1rem 0;
  padding: 1.5rem;
}

.l-confirm-padding {
  margin: 1rem;
}

.c-suggestion-text {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>
