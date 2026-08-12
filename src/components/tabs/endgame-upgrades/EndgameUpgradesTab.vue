<script>
import EndgameUpgradeButton from "./EndgameUpgradeButton";

export default {
  name: "EndgameUpgradesTab",
  components: {
    EndgameUpgradeButton
  },
  computed: {
    upgrades: () => EndgameUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e100)} CP and then even faster
      above ${format(DC.NUMMAX, 1)} CP`,
    possibleTooltip: () => `Checkered upgrades are impossible to unlock this Endgame. Striped upgrades are
      still possible.`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-endgame-upgrade-grid">
    <div class="c-endgame-upgrade-infotext">
      将鼠标悬停在 <i class="fas fa-question-circle" /> 图标上以查看更多信息。
      <br>
      第一组升级可以以递增的成本无限购买，
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      其余的升级是一次性升级，需要解锁条件。但一旦满足解锁条件，便可随时购买。
      <span :ach-tooltip="possibleTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      锁定的升级会显示其需求和默认描述，解锁后显示其效果、当前加成以及价格，按住Shift键可切换至该状态。
      <br>
      你可以用Shift点击某些升级来启用锁定条件，以防止游戏在此现实中进行任何会导致你未能满足其解锁条件的操作。
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-endgame-upgrade-grid__row"
    >
      <EndgameUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-endgame-upgrade-infotext {
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
