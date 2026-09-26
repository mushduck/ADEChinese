<script>
import ClassicInfinityDimensionsTab from "./ClassicInfinityDimensionsTab";
import ModernInfinityDimensionsTab from "./ModernInfinityDimensionsTab";

export default {
  name: "InfinityDimensionsTab",
  components: {
    ClassicInfinityDimensionsTab,
    ModernInfinityDimensionsTab
  },
  computed: {
    activeComponent() {
      // Phone UI reuses the modern (newUI) tab components.
      return (this.$viewModel.newUI || this.$viewModel.phoneUI)
        ? "ModernInfinityDimensionsTab"
        : "ClassicInfinityDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
