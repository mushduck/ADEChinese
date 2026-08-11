<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerInput from "./AutobuyerInput";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";

export default {
  name: "DimensionBoostAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton,
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
      limitDimBoosts: false,
      limitUntilGalaxies: false,
      isBuyMaxUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.dimboost
  },
  watch: {
    limitDimBoosts(newValue) {
      this.autobuyer.limitDimBoosts = newValue;
    },
    limitUntilGalaxies(newValue) {
      this.autobuyer.limitUntilGalaxies = newValue;
    }
  },
  methods: {
    update() {
      const autobuyer = this.autobuyer;
      this.hasMaxedInterval = autobuyer.hasMaxedInterval;
      this.isBuyMaxUnlocked = autobuyer.isBuyMaxUnlocked;
      this.limitDimBoosts = autobuyer.limitDimBoosts;
      this.limitUntilGalaxies = autobuyer.limitUntilGalaxies;
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    :show-interval="!isBuyMaxUnlocked"
    name="自动进行维度提升"
  >
    <template
      v-if="!hasMaxedInterval"
      #intervalSlot
    >
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template
      v-else-if="isBuyMaxUnlocked"
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
          v-model="limitDimBoosts"
          type="checkbox"
          class="o-clickable"
        >
        限制维度提升至：
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxDimBoosts"
      />
    </template>
    <template #toggleSlot>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text l-autobuyer-text-area o-clickable"
      >
        <input
          v-model="limitUntilGalaxies"
          type="checkbox"
          class="o-clickable"
        >
        <span v-if="isBuyMaxUnlocked">
          X 个星系之前，仅在需要解锁<br>新维度时购买维度提升：
        </span>
        <span v-else>
          大于 X 星系后<br>始终进行维度提升：
        </span>
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="galaxies"
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
