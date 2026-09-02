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
      alchemyUpgrades: [],
      boughtAlchemyUpgrades: [],
      strikeUpgrades: [],
      boughtStrikeUpgrades: [],
      isCollapsed1: false,
      isCollapsed2: false,
      isCollapsed3: false,
      isCollapsed4: false,
      isCollapsed5: false,
      isCollapsed6: false,
      isCollapsed7: false,
      isCollapsed8: false,
    };
  },
  computed: {
    collapseIcon1() {
      return this.isCollapsed1
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon2() {
      return this.isCollapsed2
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon3() {
      return this.isCollapsed3
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon4() {
      return this.isCollapsed4
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon5() {
      return this.isCollapsed5
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon6() {
      return this.isCollapsed6
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon7() {
      return this.isCollapsed7
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    collapseIcon8() {
      return this.isCollapsed8
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
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
      this.isCollapsed1 = player.celestials.pelle.collapsed.destruction[0];
      this.isCollapsed2 = player.celestials.pelle.collapsed.destruction[1];
      this.isCollapsed3 = player.celestials.pelle.collapsed.destruction[2];
      this.isCollapsed4 = player.celestials.pelle.collapsed.destruction[3];
      this.isCollapsed5 = player.celestials.pelle.collapsed.destruction[4];
      this.isCollapsed6 = player.celestials.pelle.collapsed.destruction[5];
      this.isCollapsed7 = player.celestials.pelle.collapsed.destruction[6];
      this.isCollapsed8 = player.celestials.pelle.collapsed.destruction[7];
    },
    toggleCollapse1() {
      player.celestials.pelle.collapsed.destruction[0] = !this.isCollapsed1;
    },
    toggleCollapse2() {
      player.celestials.pelle.collapsed.destruction[1] = !this.isCollapsed2;
    },
    toggleCollapse3() {
      player.celestials.pelle.collapsed.destruction[2] = !this.isCollapsed3;
    },
    toggleCollapse4() {
      player.celestials.pelle.collapsed.destruction[3] = !this.isCollapsed4;
    },
    toggleCollapse5() {
      player.celestials.pelle.collapsed.destruction[4] = !this.isCollapsed5;
    },
    toggleCollapse6() {
      player.celestials.pelle.collapsed.destruction[5] = !this.isCollapsed6;
    },
    toggleCollapse7() {
      player.celestials.pelle.collapsed.destruction[6] = !this.isCollapsed7;
    },
    toggleCollapse8() {
      player.celestials.pelle.collapsed.destruction[7] = !this.isCollapsed8;
    }
  }
};
</script>

<template>
  <div class="l-pelle-destruction-tab">
    <div class="l-pelle-destruction-container">
      <div class="l-pelle-panel-container">
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon1"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse1"
          />
          Pelle Achievement Enabling
        </div>
        <div
          v-if="!isCollapsed1"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleAchievementUpgradeVue
              v-for="achievement in allAchievements"
              :key="achievement.config.id"
              :upgrade="achievement"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon2"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse2"
          />
          Pelle Destruction Upgrades
        </div>
        <div
          v-if="!isCollapsed2"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleDestructionUpgradeVue
              v-for="upgrade in allUpgrades"
              :key="upgrade.config.id"
              :upgrade="upgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon3"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse3"
          />
          Pelle Reality Upgrade Enabling
        </div>
        <div
          v-if="!isCollapsed3"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleRealityUpgradeVue
              v-for="realityUpgrade in allRealityUpgrades"
              :key="realityUpgrade.config.id"
              :upgrade="realityUpgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon4"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse4"
          />
          Pelle Imaginary Upgrade Enabling
        </div>
        <div
          v-if="!isCollapsed4"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleImaginaryUpgradeVue
              v-for="imaginaryUpgrade in allImaginaryUpgrades"
              :key="imaginaryUpgrade.config.id"
              :upgrade="imaginaryUpgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon5"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse5"
          />
          Pelle Celestial Reward Enabling
        </div>
        <div
          v-if="!isCollapsed5"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleCelestialUpgradeVue
              v-for="celestialUpgrade in allCelestialUpgrades"
              :key="celestialUpgrade.config.id"
              :upgrade="celestialUpgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon6"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse6"
          />
          Pelle Perk Enabling
        </div>
        <div
          v-if="!isCollapsed6"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PellePerkUpgradeVue
              v-for="perkUpgrade in allPerkUpgrades"
              :key="perkUpgrade.config.id"
              :upgrade="perkUpgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon7"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse7"
          />
          Pelle Alchemy Enabling
        </div>
        <div
          v-if="!isCollapsed7"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleAlchemyUpgradeVue
              v-for="alchemyUpgrade in allAlchemyUpgrades"
              :key="alchemyUpgrade.config.id"
              :upgrade="alchemyUpgrade"
            />
          </div>
        </div>
        <div class="c-pelle-panel-title">
          <i
            :class="collapseIcon8"
            class="c-collapse-icon-clickable"
            @click="toggleCollapse8"
          />
          Pelle Strike Disabling
        </div>
        <div
          v-if="!isCollapsed8"
          class="l-pelle-content-container"
        >
          <div class="c-pelle-destruction-upgrade-container">
            <PelleStrikeUpgradeVue
              v-for="strikeUpgrade in allStrikeUpgrades"
              :key="strikeUpgrade.config.id"
              :upgrade="strikeUpgrade"
            />
          </div>
        </div>
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

.l-pelle-destruction-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.l-pelle-destruction-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.c-collapse-icon-clickable {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 3rem;
  align-content: center;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
