<script>
import ClassicCelestialDimensionsTab from "./ClassicCelestialDimensionsTab";
import ModernCelestialDimensionsTab from "./ModernCelestialDimensionsTab";

export default {
  name: "CelestialDimensionsTab",
  components: {
    ClassicCelestialDimensionsTab,
    ModernCelestialDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernCelestialDimensionsTab"
        : "ClassicCelestialDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
