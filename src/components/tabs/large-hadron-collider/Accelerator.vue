<script>
import AcceleratorBar from "./AcceleratorBar";

export default {
  name: "Accelerator",
  components: {
    AcceleratorBar
  },
  props: {
    accelerator: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isUnlocked: false,
      isActive: false,
      isMaxed: false,
      totalFill: new Decimal(),
      amountFilled: new Decimal(),
      resource: new Decimal(),
      effects: []
    };
  },
  methods: {
    update() {
      this.isUnlocked = this.accelerator.isUnlocked;
      if (!this.isUnlocked) return;
      const accelerator = this.accelerator;
      this.effects = this.accelerator.totalEffects;
      this.isActive = accelerator.isActive;
      this.isMaxed = accelerator.isMaxed;
      this.totalFill = accelerator.totalFill;
      this.setValue("amountFilled", accelerator.amountFilled);
      this.setValue("resource", accelerator.fillCurrency.value);
    },
    setValue(key, value) {
      if (typeof value === "number") this[key] = value;
      else this[key].copyFrom(value);
    },
    // One-off formatting function; needs to format large Decimals and a small number assumed to be a percentage
    formatAccelerator(value) {
      return typeof value === "number" ? `${formatInt(100 * value)}%` : format(value, 2);
    },
    acceleratorName() {
      return this.accelerator.name;
    },
    drainResource() {
      return this.accelerator.drainResource;
    }
  },
};
</script>

<template>
  <div
    v-if="isUnlocked"
    class="c-accelerator-single-bar"
  >
    <div class="c-accelerator">
      <div class="c-accelerator-row">
        <div class="c-accelerator-column c-accelerator-status">
          <h2 class="c-accelerator-name-header">
            {{ acceleratorName() }}
          </h2>
          <div class="c-accelerator-info-container">
            <div
              v-for="(effect, idx) in effects"
              :key="idx"
            >
              {{ effect || "" }}
            </div>
          </div>
        </div>
        <div class="c-accelerator-column">
          <AcceleratorBar :accelerator="accelerator" />
        </div>
        <div class="c-accelerator-status">
          <div class="c-accelerator-fill-status">
            <h2 class="c-accelerator-name-header">
              {{ acceleratorName() }}
            </h2>
            <div class="c-accelerator-info-container">
              Drains {{ drainResource() }} to fill.
              <br>
              <template v-if="!isMaxed">
                Current Amount: {{ formatAccelerator(resource) }}
              </template>
              <br>
              Total Filled: {{ formatAccelerator(accelerator.totalFill) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-accelerator-single-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.c-accelerator {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--var-border-width, 0.2rem) solid var(--color-alpha--base);
  border-radius: var(--var-border-radius, 0.5rem);

  /* transparent #00ea00 */
  box-shadow: inset 0 0 1rem 0.1rem rgba(0, 234, 0, 45%), 0 0 1rem 0.1rem rgba(0, 234, 0, 45%);
  margin-top: 1.2rem;
  padding: 0.5rem;
}

.t-s1 .c-accelerator {
  box-shadow: none;
}

.c-accelerator-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-accelerator-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.c-accelerator-info-container {
  height: 5rem;
  font-weight: 400;
  color: var(--color-text);
}

.c-accelerator-status {
  display: flex;
  flex-direction: column;
  width: 28rem;
  align-items: center;
}

.c-accelerator-name-header {
  font-weight: bold;
  color: var(--color-alpha--base);
  padding: 0.2rem;
}
</style>
