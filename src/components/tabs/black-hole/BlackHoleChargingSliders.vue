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
        ? "The physics of this Reality do not allow Black Hole Inversion"
        : "Black Hole must be paused to activate Inversion";
    },
    reqLockText() {
      return `Inversion strength cannot be modified due to Lock for
        "${ImaginaryUpgrade(24).name}"`;
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
      this.areExtraSlidersUnlocked = ExpansionPack.enslavedPack.isBought;
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
        Inverted Black Hole divides game speed by {{ format(negativeBHDivisor, 2, 2) }}.
        (Currently {{ isInverted ? "active" : "inactive" }}<span
          v-if="negativeSlider !== 0 && !isInverted"
          :ach-tooltip="infoTooltip"
        >
          <i class="fas fa-question-circle l-margin-left" />
        </span>)
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
      Inverting the Black Hole only affects its own speedup, no other upgrades or effects, although
      it will also indirectly affect the Effarig Game speed power effect.
    </div>
    <br>
    <div
      v-if="areExtraSlidersUnlocked"
      class="l-black-hole-sliders"
    >
      <b>
        Black Holes will auto-release {{ formatPercents(amountSlider / 500, 2, 1) }} of Stored Game Time per second if Pulse is on.
      </b>
      <SliderComponent
        v-if="areExtraSlidersUnlocked"
        v-bind="sliderPropsAmount()"
        :value="amountSlider"
        @input="adjustSliderPulseAmount($event)"
      />
      <br>
      <b>
        Black Holes currently release Stored Game Time every {{ formatInt(timeSlider) }} ticks of Pulse is on.
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
