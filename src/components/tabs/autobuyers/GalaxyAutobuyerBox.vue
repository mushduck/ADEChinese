<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerInput from "./AutobuyerInput";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";

export default {
  name: "GalaxyAutobuyerBox",
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
      limitGalaxies: false,
      isBuyMaxUnlocked: false,
      buyMax: false,
      isFlipped: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.galaxy,
    limitGalaxiesSlot() {
      return this.hasMaxedInterval && !this.isBuyMaxUnlocked ? "intervalSlot" : "toggleSlot";
    }
  },
  watch: {
    limitGalaxies(newValue) {
      this.autobuyer.limitGalaxies = newValue;
    }
  },
  methods: {
    update() {
      this.hasMaxedInterval = this.autobuyer.hasMaxedInterval;
      this.isBuyMaxUnlocked = this.autobuyer.isBuyMaxUnlocked;
      this.limitGalaxies = this.autobuyer.limitGalaxies;
      this.isFlipped = player.universes.current === 2;
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    :name="isFlipped ? '自动购买物质星系' : '自动购买反物质星系'"
    :show-interval="!isBuyMaxUnlocked"
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
      <div class="c-autobuyer-box__small-text">
        X 秒后进行：
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="buyMaxInterval"
      />
    </template>
    <template #[limitGalaxiesSlot]>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text o-clickable"
      >
        <input
          v-model="limitGalaxies"
          type="checkbox"
          class="o-clickable"
        >
        ${this.isFlipped ? "正物质" : "反物质"}星系限制：
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxGalaxies"
      />
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}
</style>
