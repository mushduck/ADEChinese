<script>
export default {
  name: "TransientUniverseTab",
  data() {
    return {
      isRunning: false,
      highestAntimatter: new Decimal(),
      relativisticParticles: new Decimal(),
      particlesPerSecond: new Decimal(),
      particleBoost: new Decimal(),
      ephemeralLight: new Decimal(),
      pendingLight: new Decimal(),
      formula1: new Decimal(),
      formula2: new Decimal()
    };
  },
  computed: {
    transientUniverseButtonText() {
      if (this.isRunning && this.pendingLight.lte(0)) {
        return `退出流幻宇宙。达到 ${format(this.highestAntimatter, 2, 1)} 反物质以获得耀界浮光。`;
      }
      if (this.isRunning) {
        return `退出流幻宇宙。获得 ${format(this.pendingLight, 2, 2)} 耀界浮光。`;
      }
      return "进入流幻宇宙。";
    }
  },
  methods: {
    update() {
      this.isRunning = player.universes.current === 1;
      this.highestAntimatter.copyFrom(player.universes.highestTransientAntimatter);
      this.relativisticParticles.copyFrom(player.universes.relativisticParticles);
      this.particlesPerSecond.copyFrom(getRelativisticParticlesPerSecond());
      this.particleBoost.copyFrom(DC.D1.sub(Decimal.pow(0.9, Currency.relativisticParticles.value.max(10).log10().log10().pow(2))));
      this.ephemeralLight.copyFrom(player.universes.ephemeralLight);
      this.pendingLight.copyFrom(player.universes.highestTransientAntimatter.max(1e10).log10().log10().pow(3).sub(
        player.universes.ephemeralLight).max(0));
      this.formula1.copyFrom(Universes.ephemeralLightToGalGen);
      this.formula2.copyFrom(Universes.ephemeralLightToDilation);
    },
    enterUniverse() {
      if (this.isRunning) return exitUniverse(1);
      return tryEnterUniverse(1);
    }
  }
};
</script>

<template>
  <div class="l-universe-tab-container">
    <div>
      <br>
      <div class="c-ephemeral-text">
        你拥有 <span class="c-universes-text--header">{{ format(ephemeralLight, 2, 2) }}</span> 耀界浮光。
        <br>
        耀界浮光当前为星系生成器产量提供
        <span class="c-universes-text--header">{{ formatPow(formula1, 2, 3) }}</span>
        的加成。并在被毁灭的现实外为超光速粒子、膨胀时间和游戏速度提供
        <span class="c-universes-text--header">{{ formatPow(formula2, 2, 3) }}</span>
        的加成。
      </div>
      <br>
      <div class="c-transient-universe-text">
        你在流幻宇宙中达到的最高反物质为
        <span class="c-universes-text--header">{{ format(highestAntimatter, 2, 1) }}</span>。
      </div>
      <br>
      <div class="c-transient-universe-text">
        你拥有
        <span class="c-universes-text--header">{{ format(relativisticParticles, 2, 2) }}</span>
        相对粒子。
        <span class="c-universes-text--header">+{{ format(particlesPerSecond, 2, 2) }}/秒</span>
        <br>
        在流幻宇宙内，相对粒子将反物质维度和无限维度的减益削弱至
        <span class="c-universes-text--header">{{ formatDecimalPercents(particleBoost, 2, 2) }}</span>。
        <br>
        相对粒子在退出流幻宇宙时重置。
      </div>
    </div>
    <br>
    <br>
    <button
      class="o-transient-universe-btn"
      @click="enterUniverse"
    >
      {{ transientUniverseButtonText }}
    </button>
  </div>
</template>

<style scoped>
.c-transient-universe-text {
  font-size: 2rem;
  animation: a-transience-cycle 10s linear infinite;
}

.c-ephemeral-text {
  font-size: 2rem;
  animation: a-ephemeral-cycle 10s linear infinite;
}

.c-universes-text--header {
  font-size: 3rem;
  font-weight: bold;
}

@keyframes a-ephemeral-cycle {
  0% { color: #ffe0a0; }
  33% { color: white; }
  67% { color: #a0e0ff; }
  100% { color: #ffe0a0; }
}

@keyframes a-transience-cycle {
  0% { color: #64dd17; }
  50% { color: #64ddad; }
  100% { color: #64dd17; }
}

.l-universe-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.o-transient-universe-btn {
  width: 30rem;
  height: 15rem;
  font-family: Typewriter, serif;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: black;
  border: var(--var-border-width, 0.2rem) solid var(--color-dilation);
  border-radius: var(--var-border-radius, 0.4rem);
  cursor: pointer;
  padding: 1rem;
  transition-duration: 0.3s;
  animation: a-transience-button-cycle 5s infinite;
}

.o-transient-universe-btn:hover {
  background-color: white;
}

@keyframes a-transience-button-cycle {
  0% {
    color: #64dd17;
    box-shadow: inset 0 0 1rem;
  }
  50% {
    color: #64ddad;
    box-shadow: inset 0 0 3rem;
  }
  100% {
    color: #64dd17;
    box-shadow: inset 0 0 1rem;
  }
}
</style>
