<script>
import HiddenTabGroup from "@/components/modals/options/hidden-tabs/HiddenTabGroup";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "HiddenTabsModal",
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
    PrimaryButton,
  },
  data() {
    return {
      isEnslaved: false,
      isAlmostEnd: false,
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isEnslaved = Enslaved.isRunning;
      this.isAlmostEnd = Pelle.hasGalaxyGenerator;
    },
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab();
        for (const subtab of tab.subtabs)
          subtab.unhideTab();
      }
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      修改可见标签页
    </template>
    <div class="c-modal--short">
      点击按钮可切换标签页的显示/隐藏状态。
      <br>
      部分标签页不可隐藏，且无法隐藏当前所在标签页。
      <br>
      若某标签页的所有子标签页均被隐藏，则显示该标签页时会自动显示全部子标签页；反之若隐藏所有子标签页，则父标签页也将被隐藏。
      <br>
      <div v-if="isAlmostEnd">
        解锁星系生成器后，所有标签页将强制保持显示状态。
      </div>
      <div v-if="isEnslaved">
        <br>
        <i>你必将...见证万物...</i>
        <br>
        （本轮现实中所有标签页不可隐藏）
      </div>
      <PrimaryButton
        @click="showAllTabs"
      >
        显示所有标签页
      </PrimaryButton>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :change-enabled="!isEnslaved && !isAlmostEnd"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 62rem;
}

.t-s12 .l-wrapper {
  width: 65rem;
}
</style>