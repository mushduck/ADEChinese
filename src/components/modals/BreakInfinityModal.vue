<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakInfinityModal",
  data() {
    return {
      isFlipped: false
    };
  },
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `打破无限将使你获得超过 ${infinity} 的${this.isFlipped ? "物质" : "反物质"}${PlayerProgress.eternityUnlocked()
        ? "。" : `，并允许你读取超过 ${infinity} 的数字。`}
        维度与计数频率升级在超过 ${infinity} ${this.isFlipped ? "物质" : "反物质"}后价格增长将加速。
        大坍缩时将根据超过 ${infinity} 的${this.isFlipped ? "物质" : "反物质"}产量获得额外无限点数。${
        EternityMilestone.keepAutobuyers.isReached ? "" : `\n同时解锁打破无限升级，并最大化所有普通挑战自动购买器。`
      }`.split("\n");
    },
  },
  methods: {
    update() {
      this.isFlipped = player.universes.current === 2;
    },
    handleYesClick() {
      breakInfinity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      你正在打破无限
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      打破
    </template>
  </ModalWrapperChoice>
</template>
