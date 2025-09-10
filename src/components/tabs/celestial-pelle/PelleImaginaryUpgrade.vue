<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";

export default {
  name: "PelleImaginaryUpgrade",
  components: {
    DescriptionDisplay,
    CostDisplay
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      canBuy: false,
      isBought: false,
      hovering: false,
      notAffordable: false
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
  },
  methods: {
    update() {
      this.canBuy = this.upgrade.canBeBought;
      this.isBought = this.upgrade.isBought;
    },
  }
};
</script>

<template>
  <button
    class="c-pelle-destruction-upgrade"
    :class="{
      'c-pelle-destruction-upgrade--unavailable': !canBuy && !isBought,
      'c-pelle-destruction-upgrade--bought': isBought
    }"
    @click="upgrade.purchase()"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <DescriptionDisplay :config="config" />
    <div class="l-pelle-destruction-upgrade-gap" />
    <CostDisplay
      v-if="!isBought"
      :config="config"
      :name="'Doomed Particle'"
    />
  </button>
</template>

<style scoped>
.c-pelle-destruction-upgrade {
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 9rem;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family: Typewriter;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-pelle--secondary);
  border-radius: var(--var-border-radius, 0.5rem);
  box-shadow: inset 0 0 1rem 0.1rem var(--color-pelle--base);
  margin: 0.6rem 0.55rem;
  padding: 1rem;
  cursor: pointer;
}

.c-pelle-destruction-upgrade:hover {
  box-shadow: inset 0 0 2rem 0.1rem linear-gradient(var(--color-pelle--secondary), var(--color-pelle--base));
  transition-duration: 0.3s;
}

/* stylelint-disable-next-line selector-class-pattern */

.c-pelle-destruction-upgrade--unavailable {
  color: black;
  background: #5f5f5f;
  box-shadow: none;
  cursor: default;
}

.c-pelle-destruction-upgrade--bought {
  color: black;
  background: linear-gradient(var(--color-pelle--secondary), var(--color-pelle--base));
  cursor: default;
}

/* stylelint-disable-next-line selector-class-pattern */
.c-pelle-destruction-upgrade--unavailable:hover,
.c-pelle-destruction-upgrade--bought:hover {
  box-shadow: 0.1rem 0.1rem 0.5rem linear-gradient(var(--color-pelle--secondary), var(--color-pelle--base));
  transition-duration: 0.3s;
}

.l-pelle-destruction-upgrade-gap {
  flex-shrink: 0;
  height: 0.5rem;
}

.s-base--metro .c-pelle-destruction-upgrade--unavailable {
  background-color: #9e9e9e;
}
</style>
