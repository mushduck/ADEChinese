<script>
import wordShift from "@/core/word-shift";

import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "HypercubesTab",
  components: {
    PrimaryButton,
    PrimaryToggleButton,
  },
  data() {
    return {
      creditsClosed: false,
      nextInfinityDimCapIncrease: new Decimal(0),
      tesseractCost: new Decimal(0),
      totalInfinityDimCap: new Decimal(0),
      canBuyTesseract: false,
      boughtTesseracts: 0,
      extraTesseracts: 0,
      isTesseractAutoUnlocked: false,
      isTesseractAutoActive: false,
      penteractsUnlocked: false,
      nextFreeTickspeedReduction: new Decimal(0),
      penteractCost: new Decimal(0),
      totalFreeTickspeedReduction: new Decimal(0),
      canBuyPenteract: false,
      boughtPenteracts: 0,
      extraPenteracts: 0,
      isPenteractAutoUnlocked: false,
      isPenteractAutoActive: false,
      hexeractsUnlocked: false,
      nextDarkMatterSoftcapReduction: new Decimal(0),
      hexeractCost: new Decimal(0),
      totalDarkMatterSoftcapReduction: new Decimal(0),
      canBuyHexeract: false,
      boughtHexeracts: 0,
      extraHexeracts: 0,
      isHexeractAutoUnlocked: false,
      isHexeractAutoActive: false,
      hepteractsUnlocked: false,
      nextCelestialDimSoftcapReduction: new Decimal(0),
      hepteractCost: new Decimal(0),
      totalCelestialDimSoftcapReduction: new Decimal(0),
      canBuyHepteract: false,
      boughtHepteracts: 0,
      extraHepteracts: 0,
      isHepteractAutoUnlocked: false,
      isHepteractAutoActive: false,
      octeractsUnlocked: false,
      nextTotalCubeBoost: 0,
      octeractCost: new Decimal(0),
      totalCubeBoost: new Decimal(0),
      canBuyOcteract: false,
      boughtOcteracts: 0,
      extraOcteracts: 0,
      isOcteractAutoUnlocked: false,
      isOcteractAutoActive: false,
      time: 0,
    };
  },
  computed: {
    tesseractCountString() {
      const extra = this.extraTesseracts > 0 ? ` + ${format(this.extraTesseracts, 2, 2)}` : "";
      return `${formatHybridSmall(this.boughtTesseracts, 3)}${extra}`;
    },
    tesseractAutobuyer() {
      return Autobuyer.tesseract;
    },
    tesseractAutobuyerTextDisplay() {
      const auto = this.isTesseractAutoActive;
      return `自动购买超立方体：${auto ? "开" : "关"}`;
    },
    penteractCountString() {
      const extra = this.extraPenteracts > 0 ? ` + ${format(this.extraPenteracts, 2, 2)}` : "";
      return `${formatHybridSmall(this.boughtPenteracts, 3)}${extra}`;
    },
    hexeractCountString() {
      const extra = this.extraHexeracts > 0 ? ` + ${format(this.extraHexeracts, 2, 2)}` : "";
      return `${formatHybridSmall(this.boughtHexeracts, 3)}${extra}`;
    },
    hepteractCountString() {
      const extra = this.extraHepteracts > 0 ? ` + ${format(this.extraHepteracts, 2, 2)}` : "";
      return `${formatHybridSmall(this.boughtHepteracts, 3)}${extra}`;
    },
    octeractCountString() {
      const extra = this.extraOcteracts > 0 ? ` + ${format(this.extraOcteracts, 2, 2)}` : "";
      return `${formatHybridSmall(this.boughtOcteracts, 3)}${extra}`;
    },
    penteractLockString() {
      if (this.penteractsUnlocked) return `购买一个超五方体 (${this.penteractCountString})`;
      else return `购买重构升级 25以解锁超五方体`;
    },
    hexeractLockString() {
      if (this.hexeractsUnlocked) return `购买一个超六方体 (${this.hexeractCountString})`;
      else return `强子化莱特拉的现实 ${formatInt(40)} 次以解锁超六方体`;
    },
    hepteractLockString() {
      if (this.hepteractsUnlocked) return `购买一个超七方体 (${this.hepteractCountString})`;
      else return `进行一次天界永恒以解锁超七方体`;
    },
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.nextInfinityDimCapIncrease.copyFrom(Tesseracts.nextTesseractIncrease);
      this.tesseractCost.copyFrom(Tesseracts.nextCost);
      this.totalInfinityDimCap.copyFrom(InfinityDimensions.totalDimCap);
      this.canBuyTesseract = Tesseracts.canBuyTesseract;
      this.boughtTesseracts = Tesseracts.bought * Tesseracts.totalMult;
      this.extraTesseracts = Tesseracts.extra * Tesseracts.totalMult;
      const tesseractAuto = Autobuyer.tesseract;
      this.isTesseractAutoUnlocked = tesseractAuto.isUnlocked;
      this.isTesseractAutoActive = tesseractAuto.isActive;
      this.penteractsUnlocked = DualityUpgrade(25).isBought;
      this.nextFreeTickspeedReduction.copyFrom(Penteracts.eachPenteractReduction.sub(1));
      this.penteractCost.copyFrom(Penteracts.nextCost);
      this.totalFreeTickspeedReduction.copyFrom(Penteracts.softcapReduction());
      this.canBuyPenteract = Penteracts.canBuyPenteract;
      this.boughtPenteracts = Penteracts.bought;
      this.extraPenteracts = Penteracts.extra;
      this.isPenteractAutoUnlocked = false;
      this.isPenteractAutoActive = false;
      this.hexeractsUnlocked = player.celestials.laitela.hadronizes >= 40;
      this.nextDarkMatterSoftcapReduction.copyFrom(Hexeracts.eachHexeractReduction.sub(1));
      this.hexeractCost.copyFrom(Hexeracts.nextCost);
      this.totalDarkMatterSoftcapReduction.copyFrom(Hexeracts.softcapReduction());
      this.canBuyHexeract = Hexeracts.canBuyHexeract;
      this.boughtHexeracts = Hexeracts.bought;
      this.extraHexeracts = Hexeracts.extra;
      this.isHexeractAutoUnlocked = false;
      this.isHexeractAutoActive = false;
      this.hepteractsUnlocked = PlayerProgress.celestialEternityUnlocked();
      this.nextCelestialDimSoftcapReduction.copyFrom(Hepteracts.eachHepteractReduction.sub(1));
      this.hepteractCost.copyFrom(Hepteracts.nextCost);
      this.totalCelestialDimSoftcapReduction.copyFrom(Hepteracts.softcapReduction());
      this.canBuyHepteract = Hepteracts.canBuyHepteract;
      this.boughtHepteracts = Hepteracts.bought;
      this.extraHepteracts = Hepteracts.extra;
      this.isHepteractAutoUnlocked = false;
      this.isHepteractAutoActive = false;
      this.octeractsUnlocked = false;
      this.nextTotalCubeBoost = Octeracts.eachOcteractBoost - 1;
      this.octeractCost.copyFrom(Octeracts.nextCost);
      this.totalCubeBoost.copyFrom(Octeracts.cubeBoost());
      this.canBuyOcteract = Octeracts.canBuyOcteract;
      this.boughtOcteracts = Octeracts.bought;
      this.extraOcteracts = Octeracts.extra;
      this.isOcteractAutoUnlocked = false;
      this.isOcteractAutoActive = false;
      this.time = Date.now();
    },
    buyTesseract() {
      Tesseracts.buyTesseract();
    },
    buyPenteract() {
      Penteracts.buyPenteract();
    },
    buyHexeract() {
      Hexeracts.buyHexeract();
    },
    buyHepteract() {
      Hepteracts.buyHepteract();
    },
    buyOcteract() {
      Octeracts.buyOcteract();
    },
    handleTesseractAutoToggle(value) {
      Autobuyer.tesseract.isActive = value;
      this.update();
    },
    octeractLockString() {
      if (this.octeractsUnlocked) return `购买一个超八方体 (${this.octeractCountString})`;
      //somewhat ugly method to make it continuously update
      else return this.time >= 0 ? `进行一次${wordShift.randomCrossWords("维度延拓")}以解锁超八方体` : `进行一次${wordShift.randomCrossWords("维度延拓")}以解锁超八方体`;
    },
    octeractResourceString() {
      if (false) return `Expansial Fragments`;
      else return this.time >= 0 ? `${wordShift.randomCrossWords("延拓碎片")}` : `${wordShift.randomCrossWords("延拓碎片")}`;
    },
  }
};
</script>

<template>
  <div class="l-hypercubes-tab">
    <div class="l-hypercubes-container">
      <div class="l-hypercubes-btn">
        <button
          class="c-infinity-dim-tab__tesseract-button"
          :class="{
            'c-infinity-dim-tab__tesseract-button--disabled': !canBuyTesseract,
            'o-pelle-disabled-pointer': creditsClosed
          }"
          @click="buyTesseract"
        >
          <p>
            购买一个超立方体 ({{ tesseractCountString }})
          </p>
          <p>无限维度的数量上限增加 {{ format(nextInfinityDimCapIncrease, 2) }}</p>
          <p><b>价格: {{ format(tesseractCost) }} 无限点数</b></p>
          <p>总超立方体效果: 增加 {{ format(totalInfinityDimCap, 2) }}</p>
        </button>
        <br>
        <PrimaryToggleButton
          v-if="isTesseractAutoUnlocked"
          :value="isTesseractAutoActive"
          :on="tesseractAutobuyerTextDisplay"
          :off="tesseractAutobuyerTextDisplay"
          class="l--spoon-btn-group__little-spoon o-primary-btn--tesseract-toggle"
          @input="handleTesseractAutoToggle"
        />
      </div>
      <div class="l-hypercubes-btn">
        <button
          class="c-penteract-button"
          :class="{
            'c-penteract-button--disabled': !canBuyPenteract,
            'o-pelle-disabled-pointer': creditsClosed
          }"
          @click="buyPenteract"
        >
          <p>
            {{ penteractLockString }}
          </p>
          <p>时间维度的软上限阈值推迟 {{ formatDecimalPercents(nextFreeTickspeedReduction, 2, 2) }}</p>
          <p><b>价格: {{ format(penteractCost) }} 永恒点数</b></p>
          <p>总超五方体效果: 增加 {{ formatPow(totalFreeTickspeedReduction, 2, 4) }}</p>
        </button>
      </div>
      <div class="l-hypercubes-btn">
        <button
          class="c-hexeract-button"
          :class="{
            'c-hexeract-button--disabled': !canBuyHexeract,
            'o-pelle-disabled-pointer': creditsClosed
          }"
          @click="buyHexeract"
        >
          <p>
            {{ hexeractLockString }}
          </p>
          <p>暗物质维度的软上限阈值推迟 {{ formatDecimalPercents(nextDarkMatterSoftcapReduction, 2, 2) }}</p>
          <p><b>价格: {{ format(hexeractCost) }} 暗物质</b></p>
          <p>总超六方体效果: 增加 {{ formatPow(totalDarkMatterSoftcapReduction, 2, 4) }}</p>
        </button>
      </div>
    </div>
    <div class="l-hypercubes-container">
      <div class="l-hypercubes-btn">
        <button
          class="c-hepteract-button"
          :class="{
            'c-hepteract-button--disabled': !canBuyHepteract,
            'o-pelle-disabled-pointer': creditsClosed
          }"
          @click="buyHepteract"
        >
          <p>
            {{ hepteractLockString }}
          </p>
          <p>天界维度的软上限强度降低 {{ formatDecimalPercents(nextCelestialDimSoftcapReduction, 2, 2) }}</p>
          <p><b>价格: {{ format(hepteractCost) }} 天界点数</b></p>
          <p>总超七方体效果: 增加 {{ formatPow(totalCelestialDimSoftcapReduction, 2, 4) }}</p>
        </button>
      </div>
      <div class="l-hypercubes-btn">
        <button
          class="c-octeract-button"
          :class="{
            'c-octeract-button--disabled': !canBuyOcteract,
            'o-pelle-disabled-pointer': creditsClosed
          }"
          @click="buyOcteract"
        >
          <p>
            {{ octeractLockString() }}
          </p>
          <p>所有超多方体效力提升 {{ formatPercents(nextTotalCubeBoost, 2, 2) }}</p>
          <p><b>价格: {{ format(octeractCost) }} {{ octeractResourceString() }}</b></p>
          <p>总超八方体效果: {{ formatX(totalCubeBoost, 2, 2) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-hypercubes-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
}

.l-hypercubes-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-text);
}

.l-hypercubes-btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 35rem;
}
</style>
