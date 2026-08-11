<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakCelestialInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `打破天界无限将使你获得超过 ${infinity} 的天界物质。在 ${infinity} 天界物质后，天界维度和天界计数频率升级的成本将加速增长。
        天界大坍缩将基于超过 ${infinity} 的天界物质获得额外的天界无限点数，同时解锁打破天界无限升级。`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      celestialBreakInfinity();
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
      你正在打破天界无限
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
