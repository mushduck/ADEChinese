<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";

export default {
  name: "AlphaTab",
  components: {
    CelestialQuoteHistory,
  },
  data() {
    return {
      stage: 0,
      quote: "",
      isRunning: false,
    };
  },
  computed: {
    symbol() {
      return Alpha.symbol;
    },
    /*
    runButtonOuterClass() {
      return {
        "l-alpha-run-button": true,
        "c-alpha-run-button": true,
        "c-alpha-run-button--running": this.isRunning,
        "c-alpha-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-alpha-run-button__inner--running" : "c-alpha-run-button__inner--not-running";
    },
    */
    runDescription() {
      return `${GameDatabase.celestials.descriptions[6].effects()}\n
      ${GameDatabase.celestials.descriptions[6].description()}`;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  watch: {
    isRunning() {
      this.$recompute("runDescription");
    }
  },
  methods: {
    update() {
      this.stage = Alpha.currentStage;
      this.quote = Alpha.quote;
      this.isRunning = Alpha.isRunning;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Alpha's", number: 7 });
    }
  }
};
</script>

<template>
  <div class="l-alpha-celestial-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <div class="l-alpha-unlocks-and-run">
      <div class="l-alpha-nyi-text">
        <br>
        The True Darkness Arises...
        <br>
        The Esteemed Leader of the Celestials is gracious enough to grant such pathetic
        mortals as yourselves a bit more time to prepare for Total Annihilation.
        <br>
        Come back in v1.0.0 to meet your End.
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-alpha-celestial-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-alpha-unlocks-and-run {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.l-alpha-nyi-text {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-alpha--base);
}
</style>
