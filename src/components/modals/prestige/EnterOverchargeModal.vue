<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterOverchargeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      penalty: 1
    };
  },
  computed: {
    message() {
      return `进入激能将开始一个新的终局。在激能期间永恒挑战 12永久生效，
        且反物质产量的幂塔高度将乘以 ${formatX(0.75, 2, 2)}。
        此外，计数频率和所有维度倍率的指数将提升至 ${formatPow(this.penalty, 2, 4)}，类似于时间膨胀。
        更高阶的激能将提高难度，并解锁更新更好的奖励。`;
    },
    entranceLabel() {
      return `你即将进入激能`;
    }
  },
  methods: {
    update() {
      this.penalty = Ascension.overchargePenalty;
    },
    handleYesClick() {
      if (player.endgame.overcharge.isRunning) return;
      enterOvercharge();
    },
  },
};
</script>

<template>
	<ModalWrapperChoice
		option="overcharge"
		@confirm="handleYesClick"
	>
		<template #header>
			{{ entranceLabel }}
		</template>
		<div class="c-modal-message__text">
			{{ message }}
		</div>
		<template #confirm-text>
			进入激能
		</template>
	</ModalWrapperChoice>
</template>
