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
      return this.$viewModel.newUI
        ? "ModernDivineDimensionTab"
        : "ClassicDivineDimensionTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
