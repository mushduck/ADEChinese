<script>
import PelleAchievementUpgradeVue from "./PelleAchievementUpgrade";
import PelleDestructionUpgradeVue from "./PelleDestructionUpgrade";
import PelleRealityUpgradeVue from "./PelleRealityUpgrade";
import PelleImaginaryUpgradeVue from "./PelleImaginaryUpgrade";
import PelleCelestialUpgradeVue from "./PelleCelestialUpgrade";
import PellePerkUpgradeVue from "./PellePerkUpgrade";
import PelleAlchemyUpgradeVue from "./PelleAlchemyUpgrade";
import PelleStrikeUpgradeVue from "./PelleStrikeUpgrade";

export default {
  name: "PelleDestructionTab",
  components: {
    PelleAchievementUpgradeVue,
    PelleDestructionUpgradeVue,
    PelleRealityUpgradeVue,
    PelleImaginaryUpgradeVue,
    PelleCelestialUpgradeVue,
    PellePerkUpgradeVue,
    PelleAlchemyUpgradeVue,
    PelleStrikeUpgradeVue,
  },
  data() {
    return {
      achievements: [],
      boughtAchievements: [],
      upgrades: [],
      boughtUpgrades: [],
      realityUpgrades: [],
      boughtRealityUpgrades: [],
      imaginaryUpgrades: [],
      boughtImaginaryUpgrades: [],
      celestialUpgrades: [],
      boughtCelestialUpgrades: [],
      perkUpgrades: [],
      boughtPerkUpgrades: [],
      Alchemypgrades: [],
      boughtAlchemyUpgrades: [],
      strikeUpgrades: [],
      boughtStrikeUpgrades: [],
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
    unboughtRealityUpgrades() { return this.realityUpgrades; },
    allRealityUpgrades() {
      let realityUpgrades = [];
      realityUpgrades = this.boughtRealityUpgrades;
      realityUpgrades = realityUpgrades.concat(this.unboughtRealityUpgrades);
      return realityUpgrades;
    },
    unboughtImaginaryUpgrades() { return this.imaginaryUpgrades; },
    allImaginaryUpgrades() {
      let imaginaryUpgrades = [];
      imaginaryUpgrades = this.boughtImaginaryUpgrades;
      imaginaryUpgrades = imaginaryUpgrades.concat(this.unboughtImaginaryUpgrades);
      return imaginaryUpgrades;
    },
    unboughtCelestialUpgrades() { return this.celestialUpgrades; },
    allCelestialUpgrades() {
      let celestialUpgrades = [];
      celestialUpgrades = this.boughtCelestialUpgrades;
      celestialUpgrades = celestialUpgrades.concat(this.unboughtCelestialUpgrades);
      return celestialUpgrades;
    },
    unboughtPerkUpgrades() { return this.perkUpgrades; },
    allPerkUpgrades() {
      let perkUpgrades = [];
      perkUpgrades = this.boughtPerkUpgrades;
      perkUpgrades = perkUpgrades.concat(this.unboughtPerkUpgrades);
      return perkUpgrades;
    },
    unboughtAlchemyUpgrades() { return this.alchemyUpgrades; },
    allAlchemyUpgrades() {
      let alchemyUpgrades = [];
      alchemyUpgrades = this.boughtAlchemyUpgrades;
      alchemyUpgrades = alchemyUpgrades.concat(this.unboughtAlchemyUpgrades);
      return alchemyUpgrades;
    },
    unboughtStrikeUpgrades() { return this.strikeUpgrades; },
    allStrikeUpgrades() {
      let strikeUpgrades = [];
      strikeUpgrades = this.boughtStrikeUpgrades;
      strikeUpgrades = strikeUpgrades.concat(this.unboughtStrikeUpgrades);
      return strikeUpgrades;
    },
  },
  methods: {
    update() {
      this.achievements = PelleAchievementUpgrade.all.filter(u => !u.isBought);
      this.boughtAchievements = PelleAchievementUpgrade.all.filter(u => u.isBought);
      this.upgrades = PelleDestructionUpgrade.all.filter(u => !u.isBought);
      this.boughtUpgrades = PelleDestructionUpgrade.all.filter(u => u.isBought);
      this.realityUpgrades = PelleRealityUpgrade.all.filter(u => !u.isBought);
      this.boughtRealityUpgrades = PelleRealityUpgrade.all.filter(u => u.isBought);
      this.imaginaryUpgrades = PelleImaginaryUpgrade.all.filter(u => !u.isBought);
      this.boughtImaginaryUpgrades = PelleImaginaryUpgrade.all.filter(u => u.isBought);
      this.celestialUpgrades = PelleCelestialUpgrade.all.filter(u => !u.isBought);
      this.boughtCelestialUpgrades = PelleCelestialUpgrade.all.filter(u => u.isBought);
      this.perkUpgrades = PellePerkUpgrade.all.filter(u => !u.isBought);
      this.boughtPerkUpgrades = PellePerkUpgrade.all.filter(u => u.isBought);
      this.alchemyUpgrades = PelleAlchemyUpgrade.all.filter(u => !u.isBought);
      this.boughtAlchemyUpgrades = PelleAlchemyUpgrade.all.filter(u => u.isBought);
      this.strikeUpgrades = PelleStrikeUpgrade.all.filter(u => !u.isBought);
      this.boughtStrikeUpgrades = PelleStrikeUpgrade.all.filter(u => u.isBought);
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
    <div class="c-pelle-panel-title">
      Pelle Reality Upgrade Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleRealityUpgradeVue
          v-for="realityUpgrade in allRealityUpgrades"
          :key="realityUpgrade.config.id"
          :upgrade="realityUpgrade"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Imaginary Upgrade Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleImaginaryUpgradeVue
          v-for="imaginaryUpgrade in allImaginaryUpgrades"
          :key="imaginaryUpgrade.config.id"
          :upgrade="imaginaryUpgrade"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Celestial Reward Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleCelestialUpgradeVue
          v-for="celestialUpgrade in allCelestialUpgrades"
          :key="celestialUpgrade.config.id"
          :upgrade="celestialUpgrade"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Perk Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PellePerkUpgradeVue
          v-for="perkUpgrade in allPerkUpgrades"
          :key="perkUpgrade.config.id"
          :upgrade="perkUpgrade"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Alchemy Enabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleAlchemyUpgradeVue
          v-for="alchemyUpgrade in allAlchemyUpgrades"
          :key="alchemyUpgrade.config.id"
          :upgrade="alchemyUpgrade"
        />
      </div>
    </div>
    <div class="c-pelle-panel-title">
      Pelle Strike Disabling
    </div>
    <div class="l-pelle-content-container">
      <div class="c-pelle-destruction-upgrade-container">
        <PelleStrikeUpgradeVue
          v-for="strikeUpgrade in allStrikeUpgrades"
          :key="strikeUpgrade.config.id"
          :upgrade="strikeUpgrade"
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
