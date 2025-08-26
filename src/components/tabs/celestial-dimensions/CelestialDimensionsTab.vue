<script>
import ClassicCelestialDimensionsTab from "./ClassicCelestialDimensionTab";
import ModernCelestialDimensionsTab from "./ModernCelestialDimensionTab";

export default {
  name: "CelestialDimensionsTab",
  components: {
    ClassicCelestialDimensionTab,
    ModernCelestialDimensionTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernCelestialDimensionTab"
        : "ClassicCelestialDimensionTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
