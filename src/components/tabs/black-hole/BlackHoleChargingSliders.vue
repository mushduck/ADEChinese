<script>
import { Laitela } from "@/core/globals";

import SliderComponent from "@/components/SliderComponent";

export default {
  name: "BlackHoleChargingSliders",
  components: {
    SliderComponent
  },
  data() {
    return {
      isNegativeBHUnlocked: false,
      isInverted: false,
      isLaitela: false,
      negativeSlider: 0,
      negativeBHDivisor: 1,
      maxNegativeBlackHole: 300,
      isDisabled: false,
      amountSlider: 0.01,
      timeSlider: 5,
      areExtraSlidersUnlocked: false
    };
  },
  computed: {
    infoTooltip() {
      return this.isLaitela
        ? "本次现实的机制不允许启用黑洞"
        : "需要两个永久启动的黑洞，且它们都在暂停状态";
    },
    reqLockText() {
      return `由于“${ImaginaryUpgrade(24).name}”的锁定，反转强度不能被修改。`;
    }
  },
  methods: {
    update() {
      this.isNegativeBHUnlocked = V.isFlipped && BlackHoles.arePermanent;
      this.isInverted = BlackHoles.areNegative;
      this.isLaitela = Laitela.isRunning;
      this.negativeSlider = -Math.log10(player.blackHoleNegative);
      this.negativeBHDivisor = Math.pow(10, this.negativeSlider);
      const maxInversion = player.requirementChecks.reality.slowestBH <= 1e-300;
      this.isDisabled = ImaginaryUpgrade(24).isLockingMechanics && Ra.isRunning && maxInversion;
      this.amountSlider = player.celestials.enslaved.pulseAmount * 500;
      this.timeSlider = player.celestials.enslaved.pulseTime;
      this.areExtraSlidersUnlocked = ExpansionPack.enslavedPack.isBought && !player.disablePostReality;
    },
    adjustSliderNegative(value) {
      this.negativeSlider = value;
      player.blackHoleNegative = Math.pow(10, -this.negativeSlider);
      player.requirementChecks.reality.slowestBH = Math.max(
        player.requirementChecks.reality.slowestBH,
        player.blackHoleNegative
      );
    },
    adjustSliderPulseAmount(value) {
      this.amountSlider = value;
      player.celestials.enslaved.pulseAmount = this.amountSlider / 500;
    },
    adjustSliderPulseTime(value) {
      this.timeSlider = value;
      player.celestials.enslaved.pulseTime = this.timeSlider;
    },
    sliderProps(negative) {
      return {
        min: 0,
        max: negative ? this.maxNegativeBlackHole : 990,
        interval: 1,
        width: "55rem",
        tooltip: false
      };
    },
    sliderPropsAmount() {
      return {
        min: 1,
        max: 500,
        interval: 1,
        width: "55rem",
        tooltip: false
      };
    },
    sliderPropsTime() {
      return {
        min: 1,
        max: 100,
        interval: 1,
        width: "55rem",
        tooltip: false
      };
    },
  }
};
</script>

<template>
  <div>
    <div
      v-if="isNegativeBHUnlocked"
      class="l-black-hole-sliders"
    >
      <b>
        反转黑洞后，游戏速度变为原来的 1/{{ format(negativeBHDivisor, 2, 2) }}。
        （ 当前{{ isInverted ? "已启动" : "冷却中" }}<span
          v-if="negativeSlider !== 0 && !isInverted"
          :ach-tooltip="infoTooltip"
        >
          <i class="fas fa-question-circle l-margin-left" />
        </span>）
      </b>
      <SliderComponent
        v-if="!isDisabled"
        v-bind="sliderProps(true)"
        :value="negativeSlider"
        @input="adjustSliderNegative($event)"
      />
      <div
        v-else
        class="l-lock-text"
      >
        {{ reqLockText }}
      </div>
      <br>
      反转黑洞仅影响其自身的加速效果，不影响其他升级或效果，但会间接作用于鹿颈长的游戏速度指数的效果。
    </div>
    <br>
    <div
      v-if="areExtraSlidersUnlocked"
      class="l-black-hole-sliders"
    >
      <b>
        若脉冲启用，黑洞每秒将自动释放 {{ formatPercents(amountSlider / 500, 2, 1) }} 的存储游戏时间。
      </b>
      <SliderComponent
        v-if="areExtraSlidersUnlocked"
        v-bind="sliderPropsAmount()"
        :value="amountSlider"
        @input="adjustSliderPulseAmount($event)"
      />
      <br>
      <b>
        若脉冲启用，黑洞每个脉冲间隔（{{ formatInt(timeSlider) }} 帧）将释放一次存储游戏时间。
      </b>
      <SliderComponent
        v-if="areExtraSlidersUnlocked"
        v-bind="sliderPropsTime()"
        :value="timeSlider"
        @input="adjustSliderPulseTime($event)"
      />
    </div>
  </div>
</template>

<style scoped>
.l-black-hole-sliders {
  width: 55rem;
  color: var(--color-text);
}

.l-margin-left {
  margin-left: 0.5rem;
}

.l-lock-text {
  font-weight: bold;
  color: var(--color-bad);
  margin: 0.5rem 0 -0.5rem;
}
</style>
