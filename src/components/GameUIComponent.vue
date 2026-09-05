<script>
import BackgroundAnimations from "@/components/BackgroundAnimations";
import ClassicUi from "@/components/ui-modes/classic/ClassicUi";
import GameUiComponentFixed from "@/components/GameUiComponentFixed";
import ModernUi from "@/components/ui-modes/modern/ModernUi";
import PhoneUi from "@/components/ui-modes/phone/PhoneUi";
import TabComponents from "@/components/tabs";

import S12DesktopIcons from "@/components/ui-modes/s12/DesktopIcons";
import S12Ui from "@/components/ui-modes/s12/S12Ui";
import S12UiFixed from "@/components/ui-modes/s12/S12UiFixed";

export default {
  name: "GameUIComponent",
  components: {
    ...TabComponents,
    ClassicUi,
    ModernUi,
    PhoneUi,
    GameUiComponentFixed,
    BackgroundAnimations,
    S12Ui,
    S12UiFixed,
    S12DesktopIcons,
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    isThemeS12() {
      return this.view.theme === "S12";
    },
    uiLayout() {
      if (this.isThemeS12) return "S12Ui";
      // phoneUI takes priority over newUI and classic UI.
      if (this.view.phoneUI) return "PhoneUi";
      return this.view.newUI ? "ModernUi" : "ClassicUi";
    },
    containerClass() {
      if (this.view.phoneUI) return "phone-ui";
      return this.view.newUI ? "new-ui" : "old-ui";
    },
    page() {
      const subtab = Tabs.current[this.$viewModel.subtab];
      return subtab.config.component;
    },
    themeCss() {
      return `stylesheets/theme-${this.view.theme}.css`;
    }
  }
};
</script>

<template>
  <div
    v-if="view.initialized"
    id="ui-container"
    :class="containerClass"
    class="ui-wrapper"
  >
    <div
      id="ui"
      class="c-game-ui"
    >
      <component :is="uiLayout">
        <component
          :is="page"
          class="c-game-tab"
        />
      </component>
      <S12DesktopIcons v-if="isThemeS12" />
      <link
        v-if="view.theme !== 'Normal'"
        type="text/css"
        rel="stylesheet"
        :href="themeCss"
      >
    </div>
    <GameUiComponentFixed v-if="!isThemeS12" />
    <BackgroundAnimations v-if="!isThemeS12" />
    <S12UiFixed v-if="isThemeS12" />
  </div>
</template>

<style scoped>
.ui-wrapper {
  display: flex;
  position: relative;
  justify-content: center;
}
</style>
