<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitDilationModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      tachyonGain: new Decimal(0),
      isDoomed: false
    };
  },
  computed: {
    gainText() {
      if (this.tachyonGain.lte(0)) return `获得不到任何东西`;
      return `获得 ${quantify("个超光速粒子", this.tachyonGain, 2, 1)}`;
    },
    isInEC() {
      return Player.anyChallenge instanceof EternityChallengeState;
    },
    confirmText() {
      return this.isDoomed ? "嗯呐" : "退出";
    }
  },
  methods: {
    update() {
      // We force-close the modal if dilation is inactive because there are a few edge cases which allow it to be
      // opened while switching between dilated/regular. The only thing this results in is an incorrect TP gain value
      if (!player.dilation.active) this.emitClose();
      this.tachyonGain.copyFrom(getTachyonGain(true));
      this.isDoomed = Pelle.isDoomed && !PelleStrikes.dilation.isDestroyed();
    },
    handleYesClick() {
      if (!player.dilation.active) return;
      const playAnimation = player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying;
      if (playAnimation) {
        animateAndUndilate();
      } else {
        eternity(false, false, { switchingDilation: true });
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
      <span v-if="isDoomed">
        你不能退出被毁灭的膨胀
      </span>
      <span v-else>
        你将退出时间膨胀
      </span>
    </template>
    <div class="c-modal-message__text">
      <span v-if="isDoomed">
        时间膨胀永久生效，你将 {{ gainText }} 并重置本次永恒。
      </span>
      <span v-else>
        如果你现在就退出膨胀，那么你将 {{ gainText }}。
      </span>
      <div v-if="isInEC">
        这也将退出当前的永恒挑战。
      </div>
      <br>
      你确定要这么做了吗？
    </div>
    <template #confirm-text>
      {{ confirmText }}
    </template>
  </ModalWrapperChoice>
</template>
