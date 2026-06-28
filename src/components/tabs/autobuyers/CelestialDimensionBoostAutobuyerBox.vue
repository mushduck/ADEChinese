<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerInput from "./AutobuyerInput";

export default {
  name: "CelestialDimensionBoostAutobuyerBox",
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
      limitCelDimBoosts: false,
      limitUntilCelGalaxies: false,
      isBuyMaxUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.celestialDimboost
  },
  watch: {
    limitCelDimBoosts(newValue) {
      this.autobuyer.limitCelDimBoosts = newValue;
    },
    limitUntilCelGalaxies(newValue) {
      this.autobuyer.limitUntilCelGalaxies = newValue;
    }
  },
  methods: {
    update() {
      const autobuyer = this.autobuyer;
      this.isBuyMaxUnlocked = autobuyer.isBuyMaxUnlocked;
      this.limitCelDimBoosts = autobuyer.limitCelDimBoosts;
      this.limitUntilCelGalaxies = autobuyer.limitUntilCelGalaxies;
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    :show-interval="!isBuyMaxUnlocked"
    name="Automatic Celestial Dimension Boosts"
  >
    <template
      v-if="isBuyMaxUnlocked"
      #intervalSlot
    >
      <div
        class="c-autobuyer-box__small-text"
      >
        <br>
        Activates every X seconds:
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="buyMaxInterval"
      />
    </template>
    <template
      v-if="!isBuyMaxUnlocked"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text l-top-margin o-clickable"
      >
        <input
          v-model="limitCelDimBoosts"
          type="checkbox"
          class="o-clickable"
        >
        Limit Celestial Dimension Boosts to:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxCelDimBoosts"
      />
    </template>
    <template #toggleSlot>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text l-autobuyer-text-area o-clickable"
      >
        <input
          v-model="limitUntilCelGalaxies"
          type="checkbox"
          class="o-clickable"
        >
        <span v-if="isBuyMaxUnlocked">
          Do not buy Celestial Dimboosts<br>
          until X Celestial Galaxies:
        </span>
        <span v-else>
          Celestial Galaxies required to always<br>
          Celestial Dimboost, ignoring the limit:
        </span>
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="celGalaxies"
      />
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.l-top-margin {
  margin-top: 0.82rem;
}

.l-dimboost-text-area {
  height: 3rem;
}

.o-clickable {
  cursor: pointer;
}
</style>
