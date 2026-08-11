<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterDilationModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `时间膨胀将开启新的永恒，所有维度倍数的指数和计数频率倍数的指数将降至 ${formatPow(0.75, 2, 2)}。若能在膨胀期间完成永恒，你的超光速粒子将根据最高反物质数值及拥有的超光速粒子倍数进行提升。`;
    },
    entranceLabel() {
      return `你确定要进行时间膨胀吗？`;
    },
    EPSinceLabel() {
      if (player.dilation.lastEP.eq(-1)) {
        return "这是你的第一次时间膨胀";
      }
      if (!isInCelestialReality() && Ra.unlocks.unlockDilationStartingTP.canBeApplied && !player.disablePostReality) {
        return `由于特蕾莎等级 ${formatInt(25)} 奖励的限制，你已获得当前可达的最大超光速粒子数量。`;
      }
      return `你上次以 ${format(player.dilation.lastEP, 2, 2)} 永恒点数完成了时间膨胀。`;
    }
  },
  methods: {
    handleYesClick() {
      if (player.dilation.active) return;
      if (player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying) {
        // Strike trigger happens within the delayed dilation callback in this function
        animateAndDilate();
      } else {
        startDilatedEternity();
        if (Pelle.isDoomed) PelleStrikes.dilation.trigger();
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dilation"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ EPSinceLabel }}
      <br>
      <br>
      {{ message }}
    </div>
    <template #confirm-text>
      进入
    </template>
  </ModalWrapperChoice>
</template>
