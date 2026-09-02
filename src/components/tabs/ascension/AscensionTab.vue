<script>
import AscensionRow from "./AscensionRow";

import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "AscensionTab",
  components: {
    AscensionRow,
    PrimaryButton
  },
  data() {
    return {
      divineEnergy: new Decimal(),
      divineEnergyPerSecond: new Decimal(),
      ascension: 0,
      nextAscension: 0,
      timeToNextAscension: new Decimal(),
      hasOvercharge: false,
      isRunning: false,
      isDoomed: false,
      infiniteEnergy: 0,
      eternalEnergy: 0,
      complexEnergy: 0,
      temporalEnergy: 0,
      maximumEnergy: [],
      highestUnlockedLevel: 1,
      currentLevel: 1,
      pending: 0,
      nextAt: new Decimal()
    };
  },
  computed: {
    ascensions() {
      return Ascensions.all;
    },
    rows() {
      return Math.ceil(this.ascensions.length);
    },
    nextAtDisplay() {
      const first = this.nextAscension?.id === 0;
      const next = this.nextAscension;

      if (first) return `You will reach the first Ascension in ${TimeSpan.fromMilliseconds(this.timeToNextAscension)}.`;
      return next === undefined
        ? "There are no more Ascensions to be reached!"
        : `You will reach the next Ascension in ${TimeSpan.fromMilliseconds(this.timeToNextAscension)}.`;
    },
    nextHintDisplay() {
      return `The next Ascension is the ${this.nextAscension?.config.name}.`;
    },
    runButtonOuterClass() {
      return {
        "l-overcharge-run-button": true,
        "c-overcharge-run-button": true,
        "c-overcharge-run-button--running": this.isRunning,
        "c-overcharge-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonMiddleClass() {
      return {
        "l-overcharge-run-button-interior": true,
        "c-overcharge-run-button--running-top": this.isRunning
      };
    },
    runButtonInnerClass() {
      return {
        "c-overcharge-run-button__inner--running": this.isRunning
      };
    },
    symbol() {
      return this.isRunning
        ? `Exit the Overcharge Gain ${formatInt(this.pending)} ${this.currEnergyName} (Next at ${format(this.nextAt, 2)} Eternity Points)`
        : "Enter the Overcharge";
    },
    currEnergy() {
      if (this.currentLevel === 4) return this.temporalEnergy;
      if (this.currentLevel === 3) return this.complexEnergy;
      if (this.currentLevel === 2) return this.eternalEnergy;
      return this.infiniteEnergy;
    },
    currEnergyName() {
      if (this.currentLevel === 4) return "Temporal Energy";
      if (this.currentLevel === 3) return "Complex Energy";
      if (this.currentLevel === 2) return "Eternal Energy";
      return "Infinite Energy";
    }
  },
  methods: {
    update() {
      this.divineEnergy.copyFrom(Currency.divineEnergy.value.floor());
      this.divineEnergyPerSecond.copyFrom(DivineDimensions.energyPerSecond);
      this.ascension = player.endgame.ascension;
      this.nextAscension = Ascension.nextAscension;
      this.timeToNextAscension.copyFrom(Ascension.nextAscension?.timeRemaining ?? new Decimal(Infinity));
      this.hasOvercharge = Ascensions.ocA.isUnlocked;
      this.isRunning = player.endgame.overcharge.isRunning;
      this.isDoomed = Pelle.isDoomed;
      const energy = player.endgame.overcharge.completions;
      this.infiniteEnergy = energy.bi;
      this.eternalEnergy = energy.eter;
      this.complexEnergy = energy.chall;
      this.temporalEnergy = energy.ts;
      this.maximumEnergy = [null, 9, 6, 32, 62];
      this.highestUnlockedLevel = player.endgame.ascension - 5;
      this.currentLevel = player.endgame.overcharge.level;
      this.pending = Decimal.clamp(Currency.eternityPoints.value.log10().div(4000).log(1.1).add(1).sub(
        this.currEnergy).floor(), 0, this.maximumEnergy[this.currentLevel] - this.currEnergy).toNumber();
      this.nextAt.copyFrom(Decimal.pow10(Decimal.pow(1.1, this.currEnergy + this.pending).times(4000)));
    },
    getAscension(row, column) {
      return () => this.ascensions[(row - 1) + column - 1];
    },
    startRun() {
      if (this.isDoomed) return;
      if (this.isRunning) {
        exitOvercharge();
        let pendEnergy = [null, "bi", "eter", "chall", "ts"][this.currentLevel];
        player.endgame.overcharge.completions[pendEnergy] += this.pending;
        return;
      }
      tryEnterOvercharge();
    },
    increaseLevel() {
      if (this.isRunning) return;
      player.endgame.overcharge.level = Math.min(player.endgame.overcharge.level + 1, this.highestUnlockedLevel);
    },
    decreaseLevel() {
      if (this.isRunning) return;
      player.endgame.overcharge.level = Math.max(player.endgame.overcharge.level - 1, 1);
    }
  }
};
</script>

<template>
  <div>
    <div class="l-endgame-milestone-grid">
      <div>
        <span class="c-ascension-description-text">
          You have {{ format(divineEnergy, 2, 2) }} Divine Energy. +{{ format(divineEnergyPerSecond, 2, 2) }}/s
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          The time to reach the next Ascension will lower based on your Divine Energy amount.
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          Your current Ascension is {{ formatInt(ascension) }}.
        </span>
      </div>
      <div
        v-for="row in rows"
        :key="row"
        class="l-endgame-milestone-grid__row"
      >
        <AscensionRow
          v-for="column in 1"
          :key="row + column"
          :get-ascension="getAscension(row, column)"
          class="l-endgame-milestone-grid__cell"
        />
      </div>
      <div>
        <span class="c-ascension-description-text">{{ nextAtDisplay }}</span>
        <br>
        <span class="c-ascension-description-text">{{ nextHintDisplay }}</span>
      </div>
    </div>
    <br>
    <br>
    <div
      class="c-overcharge-position"
      v-if="hasOvercharge"
    >
      <div
        :class="runButtonOuterClass"
        @click="startRun"
      >
        <div :class="runButtonMiddleClass">
          <div
            :class="runButtonInnerClass"
            :button-symbol="symbol"
          >
            {{ symbol }}
          </div>
        </div>
      </div>
    </div>
    <br>
    <div
      class="c-subtab-option-container"
      v-if="hasOvercharge"
    >
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="decreaseLevel"
      >
        -
      </PrimaryButton>
      <span class="c-ascension-basic-text">{{ currentLevel }}</span>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="increaseLevel"
      >
        +
      </PrimaryButton>
    </div>
    <br>
    <div v-if="highestUnlockedLevel >= 1">
      <span class="c-ascension-description-text">You have {{ infiniteEnergy }} Infinite Energy.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 2">
      <span class="c-ascension-description-text">You have {{ eternalEnergy }} Eternal Energy.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 3">
      <span class="c-ascension-description-text">You have {{ complexEnergy }} Complex Energy.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 4">
      <span class="c-ascension-description-text">You have {{ temporalEnergy }} Temporal Energy.</span>
    </div>
  </div>
</template>

<style scoped>
.c-ascension-description-text {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg,
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base)
  );
  background-size: 300% 100%;
  background-clip: text;
  animation: a-ascension-description-cycle 5s linear infinite;

  -webkit-text-fill-color: transparent;
}

@keyframes a-ascension-description-cycle {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.c-ascension-basic-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-pelle--secondary);
}

.c-overcharge-position {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
