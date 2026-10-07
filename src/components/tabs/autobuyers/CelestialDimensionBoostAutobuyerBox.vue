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
    name="自动进行天界维度提升"
  >
    <template
      v-if="isBuyMaxUnlocked"
      #intervalSlot
    >
      <div
        class="c-autobuyer-box__small-text"
      >
        <br>
        X 秒后进行：
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
        限制天界维度提升至：
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
          X 个天界星系之前，仅在需要解锁<br>新维度时购买天界维度提升：
        </span>
        <span v-else>
          大于 X 天界星系后<br>始终进行天界维度提升：
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
