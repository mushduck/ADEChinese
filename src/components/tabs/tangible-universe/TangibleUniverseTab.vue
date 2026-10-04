<script>
export default {
  name: "TangibleUniverseTab",
  data() {
    return {
      isRunning: false,
      highestMatter: new Decimal(),
      molecularMass: new Decimal(),
      massPerSecond: new Decimal(),
      massBoost: new Decimal(),
      stellarAugmenters: new Decimal(),
      pendingAugmenters: new Decimal(),
      formula: new Decimal()
    };
  },
  computed: {
    tangibleUniverseButtonText() {
      if (this.isRunning && this.pendingAugmenters.lte(0)) {
        return `离开真际宇宙。达到 ${format(this.highestMatter, 2, 1)} 正物质以获得星流增幅体。`;
      }
      if (this.isRunning) {
        return `离开真际宇宙。获得 ${format(this.pendingAugmenters, 2, 2)} 星流增幅体。`;
      }
      return "进入真际宇宙。";
    }
  },
  methods: {
    update() {
      this.isRunning = player.universes.current === 2;
      this.highestMatter.copyFrom(player.universes.highestTangibleMatter);
      this.molecularMass.copyFrom(player.universes.molecularMass);
      this.massPerSecond.copyFrom(getMolecularMassPerSecond());
      this.massBoost.copyFrom(Currency.molecularMass.value.max(1).slog().div(2).sub(1).max(0));
      this.stellarAugmenters.copyFrom(player.universes.stellarAugmenters);
      this.pendingAugmenters.copyFrom(player.universes.highestTangibleMatter.max(1e10).log10().log10().pow(3).sub(
        player.universes.stellarAugmenters).max(0));
      this.formula.copyFrom(Universes.stellarAugmentersToGrayStarEffectiveness.sub(1));
    },
    enterUniverse() {
      if (this.isRunning) return exitUniverse(2);
      return tryEnterUniverse(2);
    }
  }
};
</script>

<template>
  <div class="l-universe-tab-container">
    <div>
      <br>
      <div class="c-stellar-text">
        你拥有 <span class="c-universes-text--header">{{ format(stellarAugmenters, 2, 2) }}</span> 星流增幅体。
        <br>
        星流增幅体当前为湮灰之星效力提供 <span class="c-universes-text--header">+{{ formatDecimalPercents(formula, 2, 2) }}</span>
        的加成。
      </div>
      <br>
      <div class="c-tangible-universe-text">
        你在真际宇宙中达到的最高正物质为
        <span class="c-universes-text--header">{{ format(highestMatter, 2, 1) }}</span>。
      </div>
      <br>
      <div class="c-tangible-universe-text">
        你拥有 <span class="c-universes-text--header">{{ format(molecularMass, 2, 2) }}</span>
        超质量体。
        <span class="c-universes-text--header">+{{ format(massPerSecond, 2, 2) }}/秒</span>
        <br>
        在真际宇宙内，超质量体当前为正物质产量的指数塔高度增加
        <span class="c-universes-text--header">+{{ format(massBoost, 2, 4) }}</span>。
        <br>
        超质量体在退出真际宇宙时重置。
      </div>
    </div>
    <br>
    <br>
    <button
      class="o-tangible-universe-btn"
      @click="enterUniverse"
    >
      {{ tangibleUniverseButtonText }}
    </button>
  </div>
</template>

<style scoped>
.c-tangible-universe-text {
  font-size: 2rem;
  animation: a-tangibleness-cycle 10s linear infinite;
}

.c-stellar-text {
  font-size: 2rem;
  animation: a-stellar-cycle 10s linear infinite;
}

.c-universes-text--header {
  font-size: 3rem;
  font-weight: bold;
}

@keyframes a-stellar-cycle {
  0% { color: #ff0000; }
  17% { color: #ffff00; }
  33% { color: #00ff00; }
  50% { color: #00ffff; }
  67% { color: #0000ff; }
  83% { color: #ff00ff; }
  100% { color: #ff0000; }
}

@keyframes a-tangibleness-cycle {
  0% { color: #df5050; }
  50% { color: #505050; }
  100% { color: #df5050; }
}

.l-universe-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.o-tangible-universe-btn {
  width: 30rem;
  height: 15rem;
  font-family: Typewriter, serif;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: black;
  border: var(--var-border-width, 0.2rem) solid #df5050;
  border-radius: var(--var-border-radius, 0.4rem);
  cursor: pointer;
  padding: 1rem;
  transition-duration: 0.3s;
  animation: a-tangibleness-button-cycle 5s infinite;
}

.o-tangible-universe-btn:hover {
  background-color: white;
}

@keyframes a-tangibleness-button-cycle {
  0% {
    color: #df5050;
    box-shadow: inset 0 0 1rem;
  }
  50% {
    color: #505050;
    box-shadow: inset 0 0 3rem;
  }
  100% {
    color: #df5050;
    box-shadow: inset 0 0 1rem;
  }
}
</style>
