<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PerkShopUpgradeButton from "./PerkShopUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "TeresaTab",
  components: {
    PrimaryButton,
    GlyphSetPreview,
    PerkShopUpgradeButton,
    CelestialQuoteHistory,
    CustomizeableTooltip
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      pouredAmount: new Decimal(0),
      isPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: "",
      possibleFillPercentage: "",
      rmMult: new Decimal(0),
      bestAM: new Decimal(0),
      bestAMSet: [],
      lastMachines: new Decimal(0),
      runReward: new Decimal(0),
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasPerkShop: false,
      raisedPerkShop: false,
      isRunning: false,
      canUnlockNextPour: false,
      chargeUnlocked: false,
      totalCharges: 0,
      chargesUsed: 0,
      disCharge: false,
      chargeView: false,
      autoPour: false,
    };
  },
  computed: {
    unlockInfos: () => TeresaUnlocks.all,
    pouredAmountCap: () => Teresa.pouredAmountCap,
    showRunReward() {
      return this.bestAM.gt(1);
    },
    upgrades() {
      const upgrades = [
        PerkShopUpgrade.glyphLevel,
        PerkShopUpgrade.rmMult,
        PerkShopUpgrade.bulkDilation,
        PerkShopUpgrade.autoSpeed,
        PerkShopUpgrade.musicGlyph,
      ];
      if (this.raisedPerkShop) upgrades.push(PerkShopUpgrade.fillMusicGlyph);
      if (ExpansionPack.teresaPack.isBought && !player.disablePostReality) upgrades.push(PerkShopUpgrade.addCharges);
      return upgrades;
    },
    runButtonClassObject() {
      return {
        "c-teresa-run-button__icon": true,
        "c-teresa-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    pourButtonClassObject() {
      return {
        "o-teresa-shop-button": true,
        "c-teresa-pour": true,
        "o-teresa-shop-button--available": !this.isPouredAmountCapped,
        "o-teresa-shop-button--capped": this.isPouredAmountCapped,
        "c-teresa-pour--unlock-available": this.canUnlockNextPour,
        "c-disabled-pour": this.isPouredAmountCapped
      };
    },
    autoClassObject() {
      return {
        "o-teresa-shop-button": true,
        "c-teresa-pour": true,
        "o-teresa-shop-button--available": true
      };
    },
    autoText() {
      return this.autoPour ? "自动进贡：开" : "自动进贡：关";
    },
    pourText() {
      return this.isPouredAmountCapped ? "已填充满" : "进贡现实机器";
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[0].effects();
    },
    lastMachinesString() {
      return this.lastMachines.gte(DC.E20000)
        ? `${quantify("重构机器", this.lastMachines.dividedBy(DC.E20000), 2)}`
        : (this.lastMachines.lt(DC.E10000)
          ? `${quantify("现实机器", this.lastMachines, 2)}`
          : `${quantify("虚幻机器", this.lastMachines.dividedBy(DC.E10000), 2)}`);
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: "0.5rem solid var(--color-teresa--base)"
      };
    },
    isDoomed: () => Pelle.isDoomed,
    isEPGenDoomed: () => Pelle.isDoomed && !PelleCelestialUpgrade.passiveEPGen.canBeApplied,
    disChargeClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--charged-respec-active": this.disCharge
      };
    },
    chargeDisplay() {
      return `充能复兴升级：${this.chargeView ? "开" : "关"}`;
    },
    shouldDisplayPourLimit() {
      return this.pouredAmountCap.lt(DC.BEMAX);
    }
  },
  watch: {
    disCharge(newValue) {
      player.celestials.teresa.disCharge = newValue;
    },
    chargeView(newValue) {
      player.celestials.teresa.chargeMode = newValue;
    }
  },
  methods: {
    update() {
      const now = new Date().getTime();
      if (this.pour) {
        if (EndgameUpgrade(10).isLockingMechanics) EndgameUpgrade(10).tryShowWarningModal();
        else {
          const diff = (now - this.time) / 1000;
          Teresa.pourRM(diff);
        }
      } else {
        Teresa.timePoured = new Decimal(0);
      }
      this.time = now;
      this.pouredAmount.copyFrom(player.celestials.teresa.pouredAmount);
      this.isPouredAmountCapped = this.pouredAmount.eq(new Decimal(this.pouredAmountCap));
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`;
      this.rmMult = Teresa.rmMultiplier;
      this.hasReality = TeresaUnlocks.run.isUnlocked;
      this.hasEPGen = TeresaUnlocks.epGen.isUnlocked;
      this.hasPerkShop = TeresaUnlocks.shop.isUnlocked;
      this.raisedPerkShop = Ra.unlocks.perkShopIncrease.canBeApplied;
      this.bestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.bestAMSet = cloneDeep(Glyphs.copyForRecords(player.celestials.teresa.bestAMSet));
      this.lastMachines.copyFrom(player.celestials.teresa.lastRepeatedMachines);
      this.runReward.copyFrom(Teresa.runRewardMultiplier);
      this.perkPoints = Currency.perkPoints.value;
      this.rm.copyFrom(Currency.realityMachines);
      this.isRunning = Teresa.isRunning;
      this.canUnlockNextPour = TeresaUnlocks.all
        .filter(unlock => this.rm.plus(this.pouredAmount).gte(unlock.price) && !unlock.isUnlocked).length > 0;
      this.chargeUnlocked = ExpansionPack.teresaPack.isBought && !player.disablePostReality;
      this.totalCharges = Teresa.totalCharges;
      this.chargesUsed = Teresa.totalCharges - Teresa.chargesLeft;
      this.disCharge = player.celestials.teresa.disCharge;
      this.chargeView = Teresa.chargeModeOn;
      this.autoPour = player.celestials.teresa.autoPour;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "特蕾莎", number: 0 });
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = TeresaUnlocks[Teresa.lastUnlock].price;
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice);
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-teresa-unlock-description": true,
        "c-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    },
    toggleAuto() {
      return player.celestials.teresa.autoPour = !player.celestials.teresa.autoPour;
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="teresa" />
    <div
      v-if="chargeUnlocked"
      class="c-subtab-option-container"
    >
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
      >
        终局后重置充能复兴升级
      </PrimaryButton>
    </div>
    <div v-if="chargeUnlocked">
      你已充能 {{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }} 项复兴升级。
      对复兴升级充能将改变其效果。
      <br>
      按住 Shift 键可显示充能复兴升级。终局后可以自由重置选择。
    </div>
    <div>
      你拥有 {{ quantify("现实机器", rm, 2, 2) }}。
    </div>
    <div class="l-mechanics-container">
      <div
        v-if="hasReality"
        class="l-teresa-mechanic-container"
      >
        <div class="c-teresa-unlock c-teresa-run-button">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            开启特蕾莎的现实。
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun()"
          >
            Ϟ
          </div>
          {{ runDescription }}
          <br><br>
          <div>
            该现实可以重复完成，基于在现实中拥有的反物质获得更强大的奖励。
            <br><br>
            <span v-if="showRunReward">
              在特蕾莎的现实中，反物质数量的最大值：{{ format(bestAM, 2) }}，
              并获取了 {{ lastMachinesString }}。
              <br><br>
              使用的符文：
              <GlyphSetPreview
                text="Teresa's Best Glyph Set"
                :text-hidden="true"
                :force-name-color="false"
                :glyphs="bestAMSet"
              />
            </span>
            <span v-else>
              你还没有完成特蕾莎的现实。
            </span>
          </div>
        </div>
        <div
          v-if="showRunReward"
          class="c-teresa-unlock"
        >
          特蕾莎的现实奖励：符文献祭加成 {{ formatX(runReward, 2, 2) }}
        </div>
        <div
          v-if="hasEPGen"
          class="c-teresa-unlock"
        >
          <span :class="{ 'o-pelle-disabled': isEPGenDoomed }">
            每秒钟，你获得本次现实永恒点数峰值的 {{ formatPercents(0.01) }}。
          </span>
        </div>
      </div>
      <div class="l-rm-container l-teresa-mechanic-container">
        <button
          v-if="chargeUnlocked"
          :class="autoClassObject"
          @click="toggleAuto"
        >
          {{ autoText }}
        </button>
        <button
          :class="pourButtonClassObject"
          @mousedown="pour = true"
          @touchstart="pour = true"
          @mouseup="pour = false"
          @touchend="pour = false"
          @mouseleave="pour = false"
        >
          {{ pourText }}
        </button>
        <div class="c-rm-store">
          <div
            class="c-rm-store-inner c-rm-store-inner--light"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            class="c-rm-store-inner"
            :style="{ height: percentage}"
          >
            <div class="c-rm-store-label">
              现实机器 {{ formatX(rmMult, 2, 2) }}
              <br>
              {{ format(pouredAmount, 2, 2) }}
              <span v-if="shouldDisplayPourLimit">
                / {{ format(pouredAmountCap, 2, 2) }}
              </span>
              <span v-else>
                现实机器
              </span>
            </div>
          </div>
          <CustomizeableTooltip
            v-for="unlockInfo in unlockInfos"
            :key="unlockInfo.id"
            content-class="c-teresa-unlock-description--hover-area"
            :bottom="unlockDescriptionHeight(unlockInfo)"
            right="0"
            mode="right"
            :show="true"
            :tooltip-arrow-style="unlockInfoTooltipArrowStyle"
            :tooltip-class="unlockInfoTooltipClass(unlockInfo)"
          >
            <template #mainContent>
              <div
                class="c-teresa-milestone-line"
                :class="{ 'c-teresa-milestone-line--unlocked': hasUnlock(unlockInfo) }"
              />
            </template>
            <template #tooltipContent>
              <b :class="{ 'o-pelle-disabled': unlockInfo.pelleDisabled }">
                {{ format(unlockInfo.price, 2, 2) }}: {{ unlockInfo.description }}
              </b>
            </template>
          </CustomizeableTooltip>
        </div>
      </div>
      <div
        v-if="hasPerkShop"
        class="c-teresa-shop"
      >
        <span class="o-teresa-pp">
          你拥有 {{ quantify("复兴点数", perkPoints, 2, 0) }}。
        </span>
        <PerkShopUpgradeButton
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
        <PrimaryButton
          v-if="chargeUnlocked"
          class="o-primary-btn--subtab-option"
          @click="chargeView = !chargeView"
        >
          {{ chargeDisplay }}
        </PrimaryButton>
        你现在可以将符文的外观修改为音乐符文。
      </div>
      <div
        v-else
        class="l-rm-container-labels l-teresa-mechanic-container"
      />
    </div>
  </div>
</template>

<style scoped>
.c-disabled-pour {
  opacity: 0.8;
  pointer-events: none;
}
</style>
