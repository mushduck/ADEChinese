<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import RaPet from "./RaPet";
import RaPetRemembranceButton from "./RaPetRemembranceButton";

export default {
  name: "RaTab",
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory
  },
  data() {
    return {
      memoriesPerChunk: new Decimal(0),
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: "",
      isRunning: false,
      memoryBoosts: "",
    };
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => `你可以充能 ${quantifyInt("个无限升级。", Ra.totalCharges)}.`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter(r => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter(r => r.isUnlocked).length;
          return `你已解锁 ${quantifyInt("个炼金资源。", resources)}.`;
        },
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () => `存储的游戏时间
          ${formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2)}, 且存储现实时间的上限 +${formatInt(Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600))} 小时。`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0);
          return `你已解锁了 ${quantifyInt("个三体研究。", triadCount)}.`;
        },
      }
    ],
    petStyle() {
      return {
        color: (this.petWithRemembrance === "")
          ? "white"
          : this.pets.find(pet => pet.pet.name === this.petWithRemembrance).pet.color,
      };
    },
    runButtonClassObject() {
      return {
        "c-ra-run-button__icon": true,
        "c-ra-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().replace(/^\w/u, c => c.toUpperCase()).split("\n");
    },
    memoryDescription() {
      return `在太阳神的现实中，一些资源将基于它们的数量，生成记忆块，进而获得天神记忆。`;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.memoriesPerChunk.copyFrom(Ra.productionPerMemoryChunk);
      this.isRaCapped = Ra.totalPetLevel === Ra.maxTotalPetLevel;
      this.totalLevels = Ra.totalPetLevel;
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied;
      this.hasRemembrance = Ra.remembrance.isUnlocked;
      this.remembranceReq = Ra.remembrance.requiredLevels;
      this.remembranceMult = Ra.remembrance.multiplier;
      this.remembranceNerf = Ra.remembrance.nerf;
      this.petWithRemembrance = Ra.petWithRemembrance;
      this.isRunning = Ra.isRunning;
      this.memoryBoosts = Ra.memoryBoostResources;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "太阳神", number: 4 });
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
};
</script>

<template>
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        每个记忆块生产记忆的基数是每秒一个<span v-if="memoriesPerChunk.gt(1)">,
          现已提升为 {{ quantify("记忆", memoriesPerChunk, 2, 3) }}/每秒</span>。
        <br>
        储存现实时间时，不会产生记忆块，但记忆块仍然生产记忆。
        <span v-if="memoriesPerChunk.gt(1)">
          <br>
          该项提升基于{{ memoryBoosts }}.
        </span>
      </div>
      <div v-else>
        已重获所有记忆。
      </div>
    </div>
    <div>
      将鼠标悬浮在下列图标上以查看升级描述，
            <br>
            将鼠标悬浮在 <i class="fas fa-question-circle" /> 图标上以查看特定资源的信息。
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
      />
    </div>
    <div class="l-ra-non-pets">
      <button class="c-ra-run-button">
        <h2 :class="{ 'o-pelle-disabled': isDoomed }">
          <span v-if="isRunning">你目前在太阳神的现实中</span>
          <span v-else>开始太阳神的现实</span>
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </button>
      <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h1 :style="petStyle">
          追忆
        </h1>
        <span :style="petStyle">
          正在追忆的天神获得的记忆块 {{ formatX(remembranceMult) }}，其他天神获得的记忆块 {{ formatX(remembranceNerf, 1, 1) }}。
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
          总共获得 {{ formatInt(remembranceReq) }} 个天神记忆等级以解锁。（你还需要 {{ formatInt(remembranceReq - totalLevels) }} 个）
        </div>
      </div>
    </div>
  </div>
</template>
