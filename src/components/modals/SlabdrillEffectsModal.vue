<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SlabdrillEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    nerfs() {
      return [
        `首次现实后解锁或获得的所有奖励、效果、升级、强化、增益、削弱及功能均被禁用`,
        "第一维度以上的维度被禁用",
        `反物质维度产量除以当前反物质指数的 ${formatInt(1666)} 倍`,
        `第一维度的价格增长降低至 ${formatX(100)}，计数频率价格增长降低至 ${formatX(2)}`,
        `购买十个反物质维度倍率额外 ${formatX(20)}`,
        `维度提升需求更改为第一维度，起始第一维度需求为 ${formatInt(60)}，价格增长为 ${formatInt(20)}`,
        `反物质星系需求更改为第一维度，起始第一维度需求为 ${formatInt(650)}，价格增长为 ${formatInt(450)}`,
        `星系强度减弱 ${formatPercents(0.5)}`,
        `禁用维度献祭直至完成无限挑战 ${formatInt(2)}，且效果更改为增强第一维度`,
        "所有原先影响多个维度的无限升级现在仅影响第一维度",
        `普通挑战 ${formatInt(4)}、${formatInt(6)}、${formatInt(7)}、${formatInt(10)} 和 ${formatInt(12)} 的效果被更改`,
        `前 ${formatInt(9)} 个普通挑战的奖励被更改`,
        `所有原先影响多个维度的打破无限升级，现在仅影响第一维度，且效果被更改`,
        `${formatInt(5e11)} IP星系升级与加速自动购买器的打破无限升级的效果被更改`,
        "所有无限挑战的反物质解锁与完成要求被更改",
        `无限挑战 ${formatInt(2)}、${formatInt(4)}、${formatInt(5)}、${formatInt(6)} 和 ${formatInt(8)} 的效果被更改`,
        `无限挑战 ${formatInt(2)} 和 ${formatInt(4)} 外的无限挑战奖励被增强`,
        `时间研究 ${formatInt(42)}、${formatInt(71)}、${formatInt(214)}、${formatInt(223)}、${formatInt(224)} 和 ${formatInt(232)} 的效果被更改`,
        `时间研究 ${formatInt(161)} 的效果被增强`,
        `时间研究 ${formatInt(72)} 和 ${formatInt(73)} 的效果被削弱`,
        `时间研究 ${formatInt(83)} 效果达到上限的用时被降低`,
        `每个永恒挑战的初始目标与目标增长被更改`,
        `永恒挑战 ${formatInt(3)}、${formatInt(5)} 和 ${formatInt(7)} 的效果被更改`,
        `永恒挑战 ${formatInt(5)} 的奖励被更改`,
        `永恒挑战 ${formatInt(8)} 和 ${formatInt(9)} 的奖励被增强`,
        `复制器影响时间维度与时间之理生成的效果被削弱`,
        `膨胀时间提供反物质维度倍率、无限点数倍率和生成时间之理的膨胀升级的效果被增强`,
        `复制器影响时间维度的膨胀升级的效果被削弱`,
        `永恒点数获取在 ${format(DC.E2000)} 处受到软上限，且在 ${format(DC.E2500)} 和 ${format(DC.E3000)} 永恒点数处软上限进一步增强`,
        `成就 ${formatInt(105)} 的效果上限为 ${formatX(DC.E20000)}`,
        `存储时间被毁灭`,
        `宇宙熵被腐化`
      ];
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      被诅咒的项目列表
    </template>
    <div class="slabdrill-effects-container">
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
.slabdrill-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
