<script>
import ClassicCelestialDimensionTab from "./ClassicCelestialDimensionTab";
import ModernCelestialDimensionTab from "./ModernCelestialDimensionTab";

export default {
  name: "CelestialDimensionsTab",
  components: {
    ClassicCelestialDimensionTab,
    ModernCelestialDimensionTab
  },
  computed: {
    activeComponent() {
      // Phone UI reuses the modern (newUI) tab components.
      return (this.$viewModel.newUI || this.$viewModel.phoneUI)
        ? "ModernCelestialDimensionTab"
        : "ClassicCelestialDimensionTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
