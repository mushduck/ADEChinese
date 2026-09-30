<script>
import ClassicTimeDimensionsTab from "./ClassicTimeDimensionsTab";
import ModernTimeDimensionsTab from "./ModernTimeDimensionsTab";

export default {
  name: "TimeDimensionsTab",
  components: {
    ClassicTimeDimensionsTab,
    ModernTimeDimensionsTab
  },
  computed: {
    activeComponent() {
      // Phone UI reuses the modern (newUI) tab components.
      return (this.$viewModel.newUI || this.$viewModel.phoneUI)
        ? "ModernTimeDimensionsTab"
        : "ClassicTimeDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
