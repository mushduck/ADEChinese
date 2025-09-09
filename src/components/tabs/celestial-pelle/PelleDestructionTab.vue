<script>
import PelleDestructionUpgradeVue from "./PelleDestructionUpgrade";

export default {
  name: "PelleDestructionTab",
  components: {
    PelleDestructionUpgradeVue,
  },
  data() {
    return {
      doomedParticles: new Decimal(0),
      upgrades: [],
      boughtUpgrades: []
    };
  },
  computed: {
    upgrades() {
      let upgrades = [];
      if (this.showBought) upgrades = this.boughtUpgrades;
      upgrades = upgrades.concat(this.visibleUpgrades);
      return upgrades;
    },
  },
  methods: {
    update() {
      this.doomedParticles.copyFrom(Currency.doomedParticles);
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
      <div class="c-pelle-destruction-upgrade-container">
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
