<script>
import { createEntryInfo } from "./breakdown-entry-info";
import MultiplierBreakdownEntry from "./MultiplierBreakdownEntry";

const MULT_TAB_OPTIONS = [
  { id: 0, key: "AM", text: "反物质生产" },
  { id: 1, key: "tickspeed", text: "计数频率" },
  { id: 2, key: "AD", text: "反物质维度" },
  { id: 3, key: "IP", text: "无限点数" },
  { id: 4, key: "ID", text: "无限维度" },
  { id: 5, key: "infinities", text: "无限次数" },
  { id: 6, key: "replicanti", text: "复制速度" },
  { id: 7, key: "EP", text: "永恒点数" },
  { id: 8, key: "TD", text: "时间维度" },
  { id: 9, key: "eternities", text: "永恒次数" },
  { id: 10, key: "DT", text: "膨胀时间" },
  { id: 11, key: "gamespeed", text: "游戏速度" },
];

export default {
  name: "MultiplierBreakdownTab",
  components: {
    MultiplierBreakdownEntry
  },
  data() {
    return {
      availableOptions: [],
      currentID: player.options.multiplierTab.currTab,
    };
  },
  computed: {
    currentKey() {
      return MULT_TAB_OPTIONS.find(opt => opt.id === this.currentID).key;
    },
    resource() {
      return createEntryInfo(`${this.currentKey}_total`);
    },
    resourceSymbols() {
      return GameDatabase.multiplierTabValues[this.currentKey].total.overlay;
    }
  },
  methods: {
    update() {
      this.availableOptions = MULT_TAB_OPTIONS.map(opt => ({
        ...opt,
        isActive: this.checkActiveKey(opt.key)
      })).filter(opt => opt.isActive);
    },
    checkActiveKey(key) {
      const act = GameDatabase.multiplierTabValues[key].total.isActive;
      return typeof act === "function" ? act() : act;
    },
    accessProp(prop) {
      return typeof prop === "function" ? prop() : prop;
    },
    subtabClassObject(option) {
      return {
        "c-multiplier-subtab-btn": true,
        "c-multiplier-subtab-btn--active": option.key === this.currentKey,
      };
    },
    clickSubtab(index) {
      this.currentID = this.availableOptions[index].id;
      player.options.multiplierTab.currTab = MULT_TAB_OPTIONS.find(opt => opt.key === this.currentKey).id;
    }
  }
};
</script>

<template>
  <div class="c-stats-tab">
    <div class="l-multiplier-subtab-btn-container">
      <button
        v-for="(option, index) in availableOptions"
        :key="option.key + option.isActive"
        :class="subtabClassObject(option)"
        @click="clickSubtab(index)"
      >
        {{ option.text }}
      </button>
    </div>
    <div class="c-list-container">
      <span
        v-for="symbol in resourceSymbols"
        :key="symbol"
      >
        <span
          class="c-symbol-overlay"
          v-html="symbol"
        />
      </span>
      <MultiplierBreakdownEntry
        :key="resource.key"
        :resource="resource"
        :is-root="true"
      />
      <div class="c-multiplier-tab-text-line">
        注：仅当条目包含多个可能数值不同的来源项时才可展开。例如：任何对所有维度全局生效的效果，不会展开为八个相同数值的列表。
        <br>
        <b>
          部分条目完全展开可能导致卡顿。为降低光敏性不良反应风险，缩放操作耗时设为200毫秒（非瞬间完成）。  
          这可能在重置事件后引发轻微视觉异常。
        </b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-list-container {
  position: relative;
  width: 100rem;
}

.l-multiplier-subtab-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100rem;
  height: calc(4rem - var(--var-border-radius, 0.2rem));
}

.c-multiplier-subtab-btn {
  width: 100%;
  height: 4rem;
  margin: 0 0.5rem -0.1rem;
  z-index: 1;
  text-align: center;
  font-family: Typewriter;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-base);
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.5rem) var(--var-border-radius, 0.5rem) 0 0;
  cursor: pointer;
}

.c-multiplier-subtab-btn--active {
  border-bottom: none;
  padding-bottom: 0.2rem;
  cursor: default;
}

.c-multiplier-tab-text-line {
  color: var(--color-text);
  font-size: 1.3rem;
}

.c-symbol-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  top: -5%;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 40rem;
  color: var(--color-text);
  text-shadow: 0 0 3rem;
  pointer-events: none;
  user-select: none;
  opacity: 0.2;
  z-index: 1;
}
</style>
