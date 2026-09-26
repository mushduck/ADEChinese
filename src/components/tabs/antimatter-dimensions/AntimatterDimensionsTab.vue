<script>
import ClassicAntimatterDimensionsTab from "./ClassicAntimatterDimensionsTab";
import ModernAntimatterDimensionsTab from "./ModernAntimatterDimensionsTab";

export default {
  name: "AntimatterDimensionsTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernAntimatterDimensionsTab
  },
  computed: {
    activeComponent() {
      // Phone UI reuses the modern (newUI) tab components.
      return (this.$viewModel.newUI || this.$viewModel.phoneUI)
        ? "ModernAntimatterDimensionsTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
