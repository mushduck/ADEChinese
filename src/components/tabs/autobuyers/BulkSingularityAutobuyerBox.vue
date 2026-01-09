<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerInput from "./AutobuyerInput";

export default {
  name: "BulkSingularityAutobuyerBox",
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
      hasLowerBound: false,
      hasUpperBound: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.bulkSingularity
  },
  watch: {
    hasLowerBound(newValue) {
      this.autobuyer.hasLowerBound = newValue;
    },
    hasUpperBound(newValue) {
      this.autobuyer.hasUpperBound = newValue;
    }
  },
  methods: {
    update() {
      const autobuyer = this.autobuyer;
      this.hasLowerBound = autobuyer.hasLowerBound;
      this.hasUpperBound = autobuyer.hasUpperBound;
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    name="Automatic Bulk Singularity"
  >
    <template #intervalSlot>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text o-clickable"
      >
        <input
          v-model="hasLowerBound"
          type="checkbox"
          class="o-clickable"
        >
        Bulk Singularity Time Lower Bound:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="lowerBound"
      />
    </template>
    <template #toggleSlot>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text o-clickable"
      >
        <input
          v-model="hasUpperBound"
          type="checkbox"
          class="o-clickable"
        >
        Bulk Singularity Time Upper Bound:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="upperBound"
      />
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}
</style>
