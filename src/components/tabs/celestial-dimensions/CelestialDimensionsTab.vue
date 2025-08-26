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
