<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ArmageddonModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      remnantsGain: new Decimal(0),
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
    };
  },
  computed: {
    topLabel() {
      if (!this.isDoomed) return `你将要毁灭现实`;
      return `你将进行末日重置`;
    },
    message() {
      const isFirstReset = (Currency.remnants.eq(0))
        ? `末日后将在此开启被毁灭的现实。你将在末日后获得 ${format(this.remnantsGain, 2, 0)} 遗物，每秒生产 ${format(this.nextRealityShardGain, 2, 2)} 现实碎片。`
        : `末日后将在此开启被毁灭的现实。你将在末日后获得 ${format(this.remnantsGain, 2, 0)} 遗物，生产现实碎片的速度从 ${format(this.realityShardGain, 2, 2)}/秒 增加到 ${format(this.nextRealityShardGain, 2, 2)}/秒。`;

      return `${isFirstReset}`;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.remnantsGain.copyFrom(Pelle.remnantsGain);
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
    },
    handleYesClick() {
      Pelle.initializeRun();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="isDoomed ? 'armageddon' : undefined"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isDoomed"
      class="c-modal-message__text"
    >
      毁灭现实后，重置所有的游戏内容，以下除外：挑战纪录、天神进度和统计页面中“概况”和“现实”中的内容。你无法获得在当次现实中能获得的奖励。毁灭现实后，对符文仓库中大部分未受保护的符文进行一次净化，同时禁用大量游戏机制。
      <br>
      <br>
      你确定要重置吗？
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
