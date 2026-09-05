<script>
import PhoneSubtabButton from "./PhoneSubtabButton";
import PhoneTabButton from "./PhoneTabButton";

export default {
  name: "PhoneTabBar",
  components: {
    PhoneTabButton,
    PhoneSubtabButton,
  },
  data() {
    return {
      isHidden: false,
      tabVisibilities: [],
      activeSubtabs: [],
      activeSubtabVisibilities: []
    };
  },
  computed: {
    // Use the same tab list as newUI, since phoneUI mirrors newUI's tabs.
    tabs: () => Tabs.newUI,
    // Show the subtab strip only when the active tab has 2+ visible subtabs.
    // A single-subtab tab (e.g. shop, universes) needs no subtab selector.
    showSubtabs() {
      const visibleCount = this.activeSubtabVisibilities.filter(v => v).length;
      return visibleCount >= 2;
    }
  },
  methods: {
    update() {
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => x.isAvailable);

      // Render the subtabs of the currently active (open) tab.
      // The TabState objects expose the same unlock/visibility logic used by
      // the modern UI, so conditions stay consistent with the original tabs.
      const current = Tabs.current;
      if (current) {
        this.activeSubtabs = current.subtabs;
        this.activeSubtabVisibilities = current.subtabs.map(s => s.isAvailable);
      } else {
        this.activeSubtabs = [];
        this.activeSubtabVisibilities = [];
      }
    },
  },
};
</script>

<template>
  <div
    v-if="!isHidden"
    class="c-phone-tab-bar"
  >
    <div
      v-if="showSubtabs"
      class="c-phone-subtab-strip"
    >
      <template
        v-for="(subtab, index) in activeSubtabs"
      >
        <PhoneSubtabButton
          v-if="activeSubtabVisibilities[index]"
          :key="index"
          :subtab="subtab"
        />
      </template>
    </div>
    <div class="c-phone-main-tab-bar">
      <template
        v-for="(tab, tabPosition) in tabs"
      >
        <PhoneTabButton
          v-if="tabVisibilities[tabPosition]"
          :key="tab.name"
          :tab="tab"
          :tab-position="tabPosition"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.c-phone-tab-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  pointer-events: auto;
  background-color: var(--color-base, #1d1b22);
  box-sizing: border-box;
}

.c-phone-subtab-strip {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4rem;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}

.c-phone-main-tab-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
}
</style>
