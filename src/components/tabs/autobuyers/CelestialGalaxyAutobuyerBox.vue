<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerInput from "./AutobuyerInput";

export default {
  name: "CelestialGalaxyAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerInput
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      hasMaxedInterval: false,
      limitCelGalaxies: false,
      isBuyMaxUnlocked: false,
      buyMax: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.celestialGalaxy,
    limitCelGalaxiesSlot() {
      return this.hasMaxedInterval && !this.isBuyMaxUnlocked ? "intervalSlot" : "toggleSlot";
    }
  },
  watch: {
    limitCelGalaxies(newValue) {
      this.autobuyer.limitCelGalaxies = newValue;
    }
  },
  methods: {
    update() {
      this.hasMaxedInterval = this.autobuyer.hasMaxedInterval;
      this.isBuyMaxUnlocked = this.autobuyer.isBuyMaxUnlocked;
      this.limitCelGalaxies = this.autobuyer.limitCelGalaxies;
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    name="Automatic Celestial Galaxies"
    :show-interval="!isBuyMaxUnlocked"
  >
    <template
      v-if="isBuyMaxUnlocked"
      #intervalSlot
    >
      <div class="c-autobuyer-box__small-text">
        Activates every X seconds:
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="buyMaxInterval"
      />
    </template>
    <template #[limitCelGalaxiesSlot]>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text o-clickable"
      >
        <input
          v-model="limitCelGalaxies"
          type="checkbox"
          class="o-clickable"
        >
        Limit Celestial Galaxies to:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxCelGalaxies"
      />
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}
</style>
