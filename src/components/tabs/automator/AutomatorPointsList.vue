<script>
export default {
  name: "AutomatorPointsList",
  data() {
    return {
      totalPoints: 0,
    };
  },
  computed: {
    pointsForAutomator: () => AutomatorPoints.pointsForAutomator,
    fromPerks: () => AutomatorPoints.pointsFromPerks,
    fromUpgrades: () => AutomatorPoints.pointsFromUpgrades,
    perkSources: () => AutomatorPoints.perks,
    upgradeSources: () => AutomatorPoints.upgrades,
    otherSources: () => GameDatabase.reality.automator.otherAutomatorPoints,
    automatorInterval: () => AutomatorBackend.currentInterval,
  },
  methods: {
    update() {
      this.totalPoints = AutomatorPoints.totalPoints;
    },
    textColor(hasBought) {
      return {
        color: hasBought ? "var(--color-good)" : "var(--color-bad)"
      };
    }
  }
};
</script>

<template>
  <div>
    <div class="l-header">
      你拥有 {{ formatInt(totalPoints) }} / {{ formatInt(pointsForAutomator) }} 自动点数，用于解锁自动机。
      <br>
      你可以通过以下来源获得自动点数：
    </div>
    <div class="l-automator-points-list-container">
      <div class="l-automator-points-list-side-col c-automator-points-list-col">
        <span class="c-automator-points-list-symbol fas fa-project-diagram" />
        <span class="c-automator-points-list-ap--large">{{ formatInt(fromPerks) }} 自动点数</span>
        <span class="l-large-text">
          复兴树
        </span>
        <div
          v-for="perk in perkSources"
          :key="perk.id"
          class="c-automator-points-list-single-entry"
          :style="textColor(perk.isBought)"
        >
          <span class="c-automator-points-list-perk-label">{{ perk.label }}</span>
          - {{ perk.shortDescription }}
          <span class="c-automator-points-list-ap">{{ formatInt(perk.automatorPoints) }} 自动点数</span>
        </div>
      </div>
      <div class="l-automator-points-list-center-col">
        <div
          v-for="source in otherSources"
          :key="source.name"
          class="c-automator-points-list-cell"
        >
          <span class="c-automator-points-list-ap--large">{{ formatInt(source.automatorPoints()) }} 自动点数</span>
          <span class="l-large-text">
            {{ source.name }}
          </span>
          <br>
          <br>
          <span :style="textColor(source.automatorPoints() > 0)">
            {{ source.shortDescription() }}
          </span>
          <span
            class="c-automator-points-list-symbol"
            v-html="source.symbol"
          />
        </div>
      </div>
      <div class="l-automator-points-list-side-col c-automator-points-list-col">
        <span class="c-automator-points-list-symbol fas fa-arrow-up" />
        <span class="c-automator-points-list-ap--large">{{ formatInt(fromUpgrades) }} 自动点数</span>
        <span class="l-large-text">
          现实升级
        </span>
        <div
          v-for="upgrade in upgradeSources"
          :key="upgrade.id"
          class="c-automator-points-list-single-entry l-upgrade-list"
          :style="textColor(upgrade.isBought)"
        >
          <b>{{ upgrade.name }}</b>
          <span class="c-automator-points-list-ap">{{ formatInt(upgrade.automatorPoints) }} 自动点数</span>
          <br>
          {{ upgrade.shortDescription }}
        </div>
      </div>
    </div>
    <br>
    <div>
      自动机可以购买时间研究、进入永恒挑战或进入时间膨胀。
      <br>
      自动机使用一种自定义的脚本语言。除未提及的其他自动化功能外，它能购买完整的时间研究树，进入永恒挑战或启动时间膨胀。在某些条件下，它还可以无视自动购买器的设置，强制进行重置（无限/永恒/现实），或修改一些自动购买器设置。
      <br>
      自动机的运行速度会随着现实次数的不断增加而逐渐加快。如果自动机现在解锁，它将以每秒 {{ format(1000 / automatorInterval, 2, 2) }} 条指令的速度运行。
    </div>
  </div>
</template>

<style scoped>
.l-automator-points-list-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  -webkit-user-select: none;
  user-select: none;
}

.c-automator-points-list-col {
  position: relative;
  text-align: left;
  border: var(--var-border-width, 0.15rem) solid var(--color-text);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
}

.l-automator-points-list-side-col {
  display: flex;
  flex-direction: column;
  width: 35%;
  justify-content: space-between;
}

.l-automator-points-list-center-col {
  display: flex;
  flex-direction: column;
  width: 25%;
  justify-content: space-between;
}

.c-automator-points-list-cell {
  overflow: hidden;
  width: 100%;
  height: 48%;
  position: relative;
  text-align: left;
  border: var(--var-border-width, 0.15rem) solid var(--color-text);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
}

.c-automator-points-list-symbol {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 15rem;
  opacity: 0.2;
  text-shadow: 0 0 2rem;
  pointer-events: none;
}

.c-automator-points-list-perk-label {
  display: inline-block;
  width: 3rem;
  max-width: 3rem;
  font-weight: bold;
}

.c-automator-points-list-single-entry {
  position: relative;
}

.c-automator-points-list-ap {
  position: absolute;
  right: 0;
  opacity: 0.8;
}

.c-automator-points-list-ap--large {
  position: absolute;
  right: 1rem;
  font-size: 1.8rem;
  opacity: 0.6;
}

.l-header {
  font-size: 2rem;
}

.l-large-text {
  font-size: 1.8rem;
}

.l-upgrade-list {
  font-size: 1.3rem;
}
</style>
