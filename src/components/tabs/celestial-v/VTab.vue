<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PrimaryButton from "@/components/PrimaryButton";
import { V_REDUCTION_MODE } from "@/core/secret-formula";
import VUnlockRequirement from "./VUnlockRequirement";
import VUpgradeButton from "./VUpgradeButton";

export default {
  name: "VTab",
  components: {
    CelestialQuoteHistory,
    VUnlockRequirement,
    VUpgradeButton,
    PrimaryButton,
    GlyphSetPreview
  },
  data() {
    return {
      mainUnlock: false,
      canUnlockCelestial: false,
      totalUnlocks: 0,
      pp: 0,
      showReduction: false,
      runRecords: [],
      runGlyphs: [],
      isFlipped: false,
      wantsFlipped: true,
      isRunning: false,
      hasAlchemy: false,
      hasUpgrades: false,
    };
  },
  computed: {
    mainUnlockDB: () => GameDatabase.celestials.v.mainUnlock,
    celestialUnlockClassObject() {
      return {
        "o-v-milestone": true,
        "o-v-milestone--unlocked": this.canUnlockCelestial,
        "c-v-unlock-button--enabled": this.canUnlockCelestial
      };
    },
    // If V is flipped, change the layout of the grid
    hexGrid() {
      return this.isFlipped && this.wantsFlipped
        ? [
          VRunUnlocks.all[6],
          {},
          {},
          {},
          { isRunButton: true },
          VRunUnlocks.all[7],
          VRunUnlocks.all[8],
          {},
          {}
        ]
        : [
          VRunUnlocks.all[0],
          VRunUnlocks.all[1],
          {},
          VRunUnlocks.all[5],
          { isRunButton: true },
          VRunUnlocks.all[2],
          VRunUnlocks.all[4],
          VRunUnlocks.all[3],
          {}
        ];
    },
    vUnlock: () => VUnlocks.vAchievementUnlock,
    runMilestones() {
      return [
        [
          VUnlocks.shardReduction,
          VUnlocks.adPow,
          VUnlocks.fastAutoEC
        ],
        [
          VUnlocks.autoAutoClean,
          VUnlocks.achievementBH,
          VUnlocks.raUnlock
        ],
      ];
    },
    upgrades() {
      return [
        VUpgrade.auto,
      ];
    },
    runButtonClassObject() {
      return {
        "l-v-hexagon": true,
        "c-v-run-button": true,
        "c-v-run-button--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[3].effects().replace(/^\w/u, c => c.toUpperCase());
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.mainUnlock = VUnlocks.vAchievementUnlock.isUnlocked;
      this.canUnlockCelestial = V.canUnlockCelestial;
      this.totalUnlocks = V.spaceTheorems;
      this.pp = Currency.perkPoints.value;
      this.showReduction = VUnlocks.shardReduction.isUnlocked;
      this.runRecords = cloneDeep(player.celestials.v.runRecords);
      this.runGlyphs = cloneDeep(player.celestials.v.runGlyphs.map(gList => Glyphs.copyForRecords(gList)));
      this.isFlipped = V.isFlipped;
      this.wantsFlipped = player.celestials.v.wantsFlipped;
      this.isRunning = V.isRunning;
      this.hasAlchemy = Ra.unlocks.unlockGlyphAlchemy.canBeApplied;
      this.hasUpgrades = ExpansionPack.vPack.isBought && !player.disablePostReality;
    },
    unlockCelestial() {
      if (V.canUnlockCelestial) V.unlockCelestial();
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "薇", number: 3 });
    },
    has(info) {
      return info.isUnlocked;
    },
    mode(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION ? "减少" : "除以";
    },
    reductionValue(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION
        ? formatInt(hex.reduction)
        : format(Decimal.pow10(hex.reduction));
    },
    showRecord(hex) {
      return new Decimal(this.runRecords[hex.id]).gt(0) || hex.completions > 0;
    },
    reduceGoals(hex) {
      if (!Currency.perkPoints.purchase(hex.reductionCost)) return;
      const steps = hex.config.reductionStepSize ? hex.config.reductionStepSize : 1;
      player.celestials.v.goalReductionSteps[hex.id] += steps;
      for (const unlock of VRunUnlocks.all) {
        unlock.tryComplete();
      }
      V.checkForUnlocks();
    },
    reductionTooltip(hex) {
      return `花费 ${quantify("Perk Point", hex.reductionCost, 2, 0)} 复兴点数以降低 ${format(hex.config.perReductionStep)} 的需求`;
    },
    hexColor(hex) {
      const completions = hex.completions;
      const maxed = hex.config.values.length;
      if (completions === maxed) return "var(--color-v--base)";
      const r = 255 - 5 * completions;
      const g = 255 - 10 * completions;
      const b = 255 - 20 * completions;
      return `rgb(${r},${g},${b})`;
    },
    toggleFlipped() {
      player.celestials.v.wantsFlipped = !this.wantsFlipped;
    },
    createCursedGlyph() {
      Glyphs.giveCursedGlyph();
    },
  }
};
</script>

<template>
  <div class="l-v-celestial-tab">
    <CelestialQuoteHistory celestial="v" />
    <div
      v-if="!mainUnlock"
      class="c-v-info-text"
    >
      <v-unlock-requirement
        v-for="req in mainUnlockDB"
        :key="req.name"
        :db-entry="req"
      />
      <div class="l-v-milestones-grid__row">
        <div
          :class="celestialUnlockClassObject"
          @click="unlockCelestial"
        >
          <p>{{ vUnlock.description }}</p>
          <p>{{ vUnlock.rewardText }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="isFlipped"
        class="c-v-info-text"
      >
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="toggleFlipped"
        >
          <span v-if="wantsFlipped">显示</span>
          <span v-else>隐藏</span>
          困难的薇挑战
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option l-cursed-glyph-creation"
          @click="createCursedGlyph"
        >
          获得一个诅咒符文
        </PrimaryButton>
        <br>
        诅咒符文可在这或鹿颈长标签页获得。
        <br>
        诅咒符文在所有基于符文数的需求中视为 {{ formatInt(-3) }} 个符文。
        <br>
        <span v-if="!isDoomed">现在黑洞达到永久生效后，可以用来减缓时间。</span>
        <br><br>
        每个困难的薇成就计为两个薇成就，并将赋予 {{ formatInt(2) }} 个空间之理而不是 {{ formatInt(1) }} 个。
        <br>
        对应困难的薇成就，降低目标所需的价格会明显增加。
      </div>
      <div
        v-if="showReduction"
        class="c-v-info-text"
      >
        你拥有 {{ quantify("复兴点数", pp, 2, 0) }}。
      </div>
      <div class="l-v-upgrades-grid">
        <VUpgradeButton
          v-if="hasUpgrades"
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
      </div>
      <div class="l-v-unlocks-container">
        <li
          v-for="(hex, hexId) in hexGrid"
          :key="hexId + '-v-hex'"
          :style="[hex.isRunButton ? {zIndex: 1} : {zIndex: 0}]"
        >
          <div
            v-if="hex.config"
            class="l-v-hexagon c-v-unlock"
            :style="'background-color: ' + hexColor(hex)"
          >
            <p class="o-v-unlock-name">
              <br v-if="hex.canBeReduced && showReduction">{{ hex.config.name }}
            </p>
            <p
              class="o-v-unlock-desc"
              v-html="hex.formattedDescription"
            />
            <p
              v-if="has(runMilestones[0][0]) && hex.isReduced"
              class="o-v-unlock-goal-reduction"
            >
              已将目标 {{ mode(hex) }} {{ reductionValue(hex) }}
            </p>
            <p class="o-v-unlock-amount">
              已完成 {{ formatInt(hex.completions) }}/{{ formatInt(hex.config.values.length) }}
            </p>
            <div v-if="showRecord(hex)">
              <p class="o-v-unlock-record">
                最佳: {{ hex.config.formatRecord(runRecords[hex.id]) }}
              </p>
              <p>
                <GlyphSetPreview
                  :glyphs="runGlyphs[hex.id]"
                  :text="hex.config.name"
                  :text-hidden="true"
                />
              </p>
              <div v-if="hex.canBeReduced && showReduction">
                <div class="l-v-goal-reduction-spacer" />
                <button
                  class="o-primary-btn l-v-reduction"
                  :class="{ 'o-primary-btn--disabled': !hex.canBeReduced || pp < hex.reductionCost }"
                  :ach-tooltip="reductionTooltip(hex)"
                  @click="reduceGoals(hex)"
                >
                  <i class="fas fa-angle-double-down" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-else-if="hex.isRunButton"
            :class="runButtonClassObject"
            @click="startRun()"
          >
            <b
              class="o-v-start-text"
              :class="{ 'o-pelle-disabled': isDoomed }"
            >
              <span v-if="isRunning">你目前在薇的现实中</span>
              <span v-else>开始薇的现实</span>
            </b>
            <br>
            <div :style="{ 'font-size': hasAlchemy ? '1.2rem' : '' }">
              {{ runDescription }}
            </div>
            <div class="c-v-run-button__line c-v-run-button__line--1" />
            <div class="c-v-run-button__line c-v-run-button__line--2" />
            <div class="c-v-run-button__line c-v-run-button__line--3" />
          </div>
          <div v-else>
            <div class="l-v-hexagon l-placeholder-invisible" />
          </div>
        </li>
      </div>
      <div class="c-v-info-text">
        薇成就只能在薇的现实中完成，但是是永久性的，离开和重新进入薇的现实时不会重置。
      </div>
      <div class="c-v-info-text">
        你已经完成了 {{ formatInt(totalUnlocks) }} 个薇成就。
        <span v-if="!isDoomed">
          每完成一个薇成就，可以获得 {{ formatInt(1) }} 个空间之理，它可以用于购买通常情况下无法购买的时间研究。
          <br>
          空间之理同样也可以作为货币在自动机中使用。
        </span>
      </div>
      <br>
      <div class="l-v-milestones-grid">
        <div
          v-for="(row, rowId) in runMilestones"
          :key="rowId + '-v-ms-row'"
          class="l-v-milestones-grid__row"
        >
          <div
            v-for="(milestone, colId) in row"
            :key="colId + rowId*10 + '-v-ms'"
            class="o-v-milestone"
            :class="{'o-v-milestone--unlocked':
              has(milestone)}"
          >
            <div :class="{ 'o-pelle-disabled': isDoomed && milestone.pelleDisabled }">
              <p>{{ milestone.description }}</p>
              <p>奖励：{{ milestone.rewardText }}</p>
              <p v-if="milestone.formattedEffect">
                当前：<b>{{ milestone.formattedEffect }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.o-v-start-text {
  font-size: 1.5rem;
}

.l-placeholder-invisible {
  opacity: 0;
}

.l-v-goal-reduction-spacer {
  height: 0.8rem;
}

.l-cursed-glyph-creation {
  background: var(--color-effarig--base);
}
</style>
