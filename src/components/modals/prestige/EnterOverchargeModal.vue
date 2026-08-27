<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
	name: "EnterOverchargeModal",
	components: {
		ModalWrapperChoice
	},
	computed: {
		message() {
			return `进入激能将开始一个新的终局，拥有以下减益：永恒挑战 12 永久生效；反物质产量 ↑↑ ${formatInt(0.75, 2, 2)}；类似时间膨胀，计数频率和所有维度的指数 ^ (${formatFloat(0.72, 2, 2)} ^ 激能阶数)；更高阶的激能将解锁更好的奖励`;
		},
		entranceLabel() {
			return `你将进入激能`;
		}
	},
	methods: {
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
