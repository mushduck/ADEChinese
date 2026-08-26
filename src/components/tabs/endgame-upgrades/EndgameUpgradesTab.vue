<script>
import EndgameUpgradeButton from "./EndgameUpgradeButton";

export default {
  name: "EndgameUpgradesTab",
  components: {
    EndgameUpgradeButton
  },
  computed: {
    upgrades: () => EndgameUpgrades.all,
    costScalingTooltip: () => `在 ${format(1e100)} 天界点数后价格加速增长，在 ${format(DC.NUMMAX, 1)} 天界点数后更加剧烈`,
    possibleTooltip: () => `在本次终局中无法解锁方格背景的升级，但可以解锁条纹图案的升级。`,
    lockTooltip: () => `锁定升级要求仅会阻止手动和自动操作，不会禁用任何相关的升级，要求仍可能失败。`,
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
