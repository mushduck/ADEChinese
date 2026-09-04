<script>
import GalacticPowerRow from "./GalacticPowerRow";

export default {
  name: "GalacticPowerTab",
  components: {
    GalacticPowerRow
  },
  data() {
    return {
      galacticPower: new Decimal(),
      galacticPowerPerSecond: new Decimal(),
      nextPow: 0,
      isDoomed: false
    };
  },
  computed: {
    powers() {
      return GalacticPowers.all;
    },
    rows() {
      return Math.ceil(this.powers.length);
    },
    nextAtDisplay() {
      const first = this.nextPow?.id === 1;
      const next = GalacticPower.nextPowerUnlockGP;

      if (first) return `达到 ${format(next)} 星系之力以解锁第一星系之力升级`;
      return next === undefined
        ? "已解锁所有星系之力升级"
        : `达到 ${format(next)} 星系之力以解锁下一个星系之力升级`;
    },
    galacticPowerAmountStyle() {
      return {
        "font-size": "2.5rem",
        "font-weight": "bold",
        animation: "a-galactic-power-amount-cycle 12s infinite",
        color: "white",
        background: "black",
      };
    }
  },
  methods: {
    update() {
      this.galacticPower.copyFrom(Currency.galacticPower.value.floor());
      this.galacticPowerPerSecond.copyFrom(getGalacticPowerGainPerSecond());
      this.nextPow = GalacticPower.nextPower;
      this.isDoomed = Pelle.isDoomed;
    },
    getPower(row, column) {
      return () => this.powers[(row - 1) + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-endgame-milestone-grid">
    <div>
      <span class="c-galactic-power-description-text">你拥有 </span>
      <span :style="galacticPowerAmountStyle">{{ format(galacticPower, 2, 2) }}</span>
      <span class="c-galactic-power-description-text"> 星系之力。 </span>
      <span :style="galacticPowerAmountStyle">+{{ format(galacticPowerPerSecond, 2, 2) }}/秒</span>
    </div>
    <div>
      <span class="c-galactic-power-description-text">
        星系之力的增速主要基于星系总数，也基于当前的天界物质和虚幻机器的数量。

      </span>
    </div>
    <div v-if="isDoomed">
      <span class="c-galactic-power-description-text">
        在被毁灭的现实中，佩勒限制了星系之力的生产。
      </span>
    </div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-endgame-milestone-grid__row"
    >
      <GalacticPowerRow
        v-for="column in 1"
        :key="row + column"
        :get-power="getPower(row, column)"
        class="l-endgame-milestone-grid__cell"
      />
    </div>
    <div>
      <span class="c-galactic-power-description-text">{{ nextAtDisplay }}</span>
    </div>
  </div>
</template>

<style scoped>
.c-galactic-power-description-text {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base)
  );
  background-size: 100% 300%;
  background-clip: text;
  animation: a-galactic-power-description-cycle 5s linear infinite;

  -webkit-text-fill-color: transparent;
}

@keyframes a-galactic-power-description-cycle {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 50% 100%;
  }
}
</style>
