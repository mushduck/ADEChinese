<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SelectLargeNotationDropdown from "./SelectLargeNotationDropdown";
import SelectNotationDropdown from "@/components/tabs/options-visual/SelectNotationDropdown";
import SelectThemeDropdown from "@/components/tabs/options-visual/SelectThemeDropdown";
import SelectSidebarDropdown from "@/components/tabs/options-visual/SelectSidebarDropdown";
import UpdateRateSlider from "./UpdateRateSlider";

export default {
  name: "OptionsVisualTab",
  components: {
    UpdateRateSlider,
    PrimaryToggleButton,
    ExpandingControlBox,
    OptionsButton,
    OpenModalHotkeysButton,
    SelectThemeDropdown,
    SelectNotationDropdown,
    SelectSidebarDropdown,
    SelectLargeNotationDropdown,
  },
  data() {
    return {
      theme: "",
      notation: "",
      lnotation: "",
      sidebarResource: "",
      headerTextColored: true,
    };
  },
  computed: {
    sidebarDB: () => GameDatabase.sidebarResources,
    themeLabel() {
      return `主题：${Themes.find(this.theme).displayName()}`;
    },
    notationLabel() {
      return `记数法：${this.notation}`;
    },
    postNotationLabel() {
      return `大数记数法：${this.lnotation}`;
    },
    sidebarLabel() {
      return `侧边栏（现代 UI）: ${this.sidebarResource}`;
    },
    UILabel() {
      return `UI: ${player.options.phoneUI ? "手机" : player.options.newUI ? "现代" : "经典"}`;
    }
  },
  watch: {
    headerTextColored(newValue) {
      player.options.headerTextColored = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.theme = Theme.currentName();
      this.notation = Notations.current.chineseName;
      this.lnotation = LNotations.current.chineseName;
      this.sidebarResource = player.options.sidebarResourceID === 0
        ? "最新资源"
        : this.sidebarDB.find(e => e.id === player.options.sidebarResourceID).optionName;
      this.headerTextColored = options.headerTextColored;
    },
  }
};
</script>

<template>
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-large"
          onclick="GameOptions.toggleUI()"
        >
          {{ UILabel }}
        </OptionsButton>
        <UpdateRateSlider />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.newsOptions.show();"
        >
          打开新闻选项
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="themeLabel"
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations l-high-z-index"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="notationLabel"
        >
          <template #dropdown>
            <SelectNotationDropdown />
          </template>
        </ExpandingControlBox>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.notation.show();"
        >
          打开指数型记数法选项
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.animationOptions.show();"
        >
          打开动画选项
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.infoDisplayOptions.show()"
        >
          打开信息显示选项
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.awayProgressOptions.show()"
        >
          打开离线资源选项
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.hiddenTabs.show()"
        >
          修改可见标签页
        </OptionsButton>
        <PrimaryToggleButton
          v-model="headerTextColored"
          class="o-primary-btn--option l-options-grid__button"
          label="高亮重置资源数值："
        />
        <ExpandingControlBox
          v-if="$viewModel.newUI"
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="sidebarLabel"
        >
          <template #dropdown>
            <SelectSidebarDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <div class="l-options-grid__row">
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations l-low-z-index"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="postNotationLabel"
        >
          <template #dropdown>
            <SelectLargeNotationDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <OpenModalHotkeysButton />
    </div>
  </div>
</template>
<style scoped>
.l-high-z-index {
  z-index: 2;
}

.l-low-z-index {
  z-index: 1;
}
</style>
