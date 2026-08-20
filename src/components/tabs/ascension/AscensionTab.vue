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

      if (first) return `你将在 ${TimeSpan.fromMilliseconds(this.timeToNextAscension)} 后达到第一次扬升`;
      return next === undefined
        ? "扬升已至尽头..."
        : `你将在 ${TimeSpan.fromMilliseconds(this.timeToNextAscension)} 后达到下一次扬升`;
    },
    nextHintDisplay() {
      return `下一次扬升将解锁${this.nextAscension?.config.name}。`;
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
        ? `退出激能以获得 ${formatInt(this.pending)} ${this.currEnergyName}（下一个${this.currEnergyName}将在 ${format(this.nextAt, 2)} 永恒点数时获得）`
        : "进入激能";
    },
    currEnergy() {
      if (this.currentLevel === 4) return this.temporalEnergy;
      if (this.currentLevel === 3) return this.complexEnergy;
      if (this.currentLevel === 2) return this.eternalEnergy;
      return this.infiniteEnergy;
    },
    currEnergyName() {
      if (this.currentLevel === 4) return "时间能量";
      if (this.currentLevel === 3) return "复构能量";
      if (this.currentLevel === 2) return "永恒能量";
      return "无限能量";
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
      if (this.currentLevel >= this.highestUnlockedLevel) return;
      player.endgame.overcharge.level++;
    },
    decreaseLevel() {
      if (this.isRunning) return;
      if (this.currentLevel <= 1) return;
      player.endgame.overcharge.level--;
    }
  }
};
</script>

<template>
  <div>
    <div class="l-endgame-milestone-grid">
      <div>
        <span class="c-ascension-description-text">
          你拥有 {{ format(divineEnergy, 2, 2) }} 神性能量，+{{ format(divineEnergyPerSecond, 2, 2) }}/秒
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          到达下一扬升的时间将基于神性能量而缩短，
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          你已经扬升了 {{ formatInt(ascension) }} 次。
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
      <span class="c-ascension-text">{{ currentLevel }}</span>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="increaseLevel"
      >
        +
      </PrimaryButton>
    </div>
    <br>
    <div v-if="highestUnlockedLevel >= 1">
      <span class="c-ascension-description-text">你拥有 {{ infiniteEnergy }} 无限能量。</span>
    </div>
    <div v-if="highestUnlockedLevel >= 2">
      <span class="c-ascension-description-text">你拥有 {{ eternalEnergy }} 永恒能量。</span>
    </div>
    <div v-if="highestUnlockedLevel >= 3">
      <span class="c-ascension-description-text">你拥有 {{ complexEnergy }} 复构能量。</span>
    </div>
    <div v-if="highestUnlockedLevel >= 4">
      <span class="c-ascension-description-text">你拥有 {{ temporalEnergy }} 时间能量。</span>
    </div>
  </div>
</template>

<style scoped>
.c-ascension-description-text {
  font-size: 1.5rem;
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
