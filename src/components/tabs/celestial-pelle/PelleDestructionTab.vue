<script>
import PelleAchievementUpgradeVue from "./PelleAchievementUpgrade";
import PelleDestructionUpgradeVue from "./PelleDestructionUpgrade";

export default {
  name: "PelleDestructionTab",
  components: {
    PelleAchievementUpgradeVue,
    PelleDestructionUpgradeVue,
  },
  data() {
    return {
      achievements: [],
      boughtAchievements: [],
      upgrades: [],
      boughtUpgrades: [],
    };
  },
  computed: {
    unboughtAchievements() { return this.achievements; },
    allAchievements() {
      let achievements = [];
      achievements = this.boughtAchievements;
      achievements = achievements.concat(this.unboughtAchievements);
      return achievements;
    },
    unboughtUpgrades() { return this.upgrades; },
    allUpgrades() {
      let upgrades = [];
      upgrades = this.boughtUpgrades;
      upgrades = upgrades.concat(this.unboughtUpgrades);
      return upgrades;
    },
  },
  methods: {
    update() {
      this.achievements = PelleAchievementUpgrade.all.filter(u => !u.isBought);
      this.boughtAchievements = PelleAchievementUpgrade.all.filter(u => u.isBought);
      this.upgrades = PelleDestructionUpgrade.all.filter(u => !u.isBought);
      this.boughtUpgrades = PelleDestructionUpgrade.all.filter(u => u.isBought);
    }
  }
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      Pelle Achievement Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleAchievementUpgradeVue
          v-for="achievement in allAchievements"
          :key="achievement.config.id"
          :upgrade="achievement"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Destruction Upgrades
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleDestructionUpgradeVue
          v-for="upgrade in allUpgrades"
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
