<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PelleEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    nerfs() {
      return [
        // Numerical nerfs and disabled boosts
        "所有通过佩勒升级解锁的项目，无法以先前的方式解锁",
        "禁用毁灭现实之前所有的无限点数和永恒点数倍增升级",
        "禁用基于最快的无限，生成无限点数的功能",
        "禁用毁灭现实之前的复制器倍数加成",
        "提高大部分永恒挑战的难度",
        `所有星系的效果只有原来的 ${formatPercents(0.5)}`,
        `反物质维度的倍率加成除以 ${formatInt(10)}`,
        "禁用成就加成和某些成就的奖励",
        "禁用无限次数和永恒次数倍增，并禁用自动产生无限次数和永恒次数的功能",
        "禁用黑洞",
        "禁用现实升级“超越时光”",

        // Initial QoL and automation
        "除成就 21 外，禁用所有增加开局资源的奖励",
        "禁用所有不重置游戏内资源的奖励",
        "除 ECR 外，禁用复兴树上降低解锁价格的节点",
        "禁用自动完成无限挑战和永恒挑战",
        "禁用在达到无限之前获得的自动购买器和所有的维度自动购买器，你需要通过购买佩勒升级才能重新获得它们",
        "禁用自动购买时间之理",
        "禁用所有与时间膨胀相关和在解锁时间膨胀后获得的自动购买器",

        // Time studies + Dilation
        "最后一个永恒升级基于在被毁灭的现实中，上次末日后经过的时间为时间维度提供加成",
        `除膨胀时间 ${formatX(2)} 外，禁用所有毁灭现实之前的膨胀时间倍增`,
        "禁用所有的超光速粒子倍增效果",
        "除最后一个膨胀升级外，禁用在毁灭现实之前获得的生产时间之理的效果",

        // Glyphs
        "在重新获得装备符文的能力之前，无法装备符文",
        `符文等级大幅降低，且符文的稀有度固定为 ${formatPercents(0)}`,
        "禁用符文献祭、异变符文和符文炼金的所有奖励",

        // Celestial features
        "无法进入其祂天神的现实",
        "无法购买音乐符文",
        "禁用鹿颈长的所有奖励",
        "禁用所有储存时间的功能",
        "禁用薇的所有奖励",
        `禁用特蕾莎的记忆等级达到 ${formatInt(1)} 后的奖励`,
        "无法对无限升级进行充能",
        "禁用三体研究和空间之理",
        "禁用除解锁暗物质维度和解锁天神之外的所有虚幻升级",
        "禁用连续统和奇点的奖励"
      ];
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      禁用和削弱的项目列表
    </template>
    <div class="pelle-effects-container">
      <p
        v-for="(nerf, idx) in nerfs"
        :key="idx"
      >
        {{ nerf }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      嗯呐
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.pelle-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
