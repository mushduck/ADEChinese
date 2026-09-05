<script>
import ClassicDivineDimensionTab from "./ClassicDivineDimensionTab";
import ModernDivineDimensionTab from "./ModernDivineDimensionTab";

export default {
  name: "DivineDimensionsTab",
  components: {
    ClassicDivineDimensionTab,
    ModernDivineDimensionTab
  },
  computed: {
    activeComponent() {
      // Phone UI reuses the modern (newUI) tab components.
      return (this.$viewModel.newUI || this.$viewModel.phoneUI)
        ? "ModernDivineDimensionTab"
        : "ClassicDivineDimensionTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
