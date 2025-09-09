<script>
import PelleDestructionUpgradeVue from "./PelleDestructionUpgrade";

export default {
  name: "PelleDestructionTab",
  components: {
    PelleDestructionUpgradeVue,
  },
  data() {
    return {
      upgrades: [],
      boughtUpgrades: []
    };
  },
  methods: {
    update() {
      this.upgrades = PelleDestructionUpgrade.filter(u => !u.isBought);
      this.boughtUpgrades = PelleDestructionUpgrade.filter(u => u.isBought);
    }
  }
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      Pelle Destruction Upgrades
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-upgrade-container">
        <PelleDestructionUpgradeVue
          :key="upgrade.config.id"
          :upgrade="upgrade"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-pelle-destruction-upgrade-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 110rem;
  justify-content: center;
}
</style>
