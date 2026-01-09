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
      above ${format(Decimal.NUMBER_MAX_VALUE, 1)} CP`,
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
      Mouseover <i class="fas fa-question-circle" /> icons for additional information.
      <br>
      The first row of upgrades can be purchased endlessly for increasing costs
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      and the rest are single-purchase.
      <br>
      Single-purchase upgrades also have requirements which, once completed, permanently unlock the ability
      to purchase the upgrades at any point.
      <span :ach-tooltip="possibleTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      Locked upgrades show their requirement and effect by default; unlocked ones show
      their effect, current bonus, and cost. Hold shift to swap this behavior.
      <br>
      You can shift-click upgrades with <i class="fas fa-lock-open" /> to make the game prevent you
      from doing anything this Endgame which would cause you to fail their unlock condition.
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
