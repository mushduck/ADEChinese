<script>
import AnnihilationButton from "./AnnihilationButton";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import DarkMatterDimensionGroup from "./DarkMatterDimensionGroup";
import HadronsPane from "./HadronsPane";
import LaitelaAutobuyerPane from "./LaitelaAutobuyerPane";
import LaitelaRunButton from "./LaitelaRunButton";
import PrimaryButton from "@/components/PrimaryButton";
import SingularityMilestonePane from "./SingularityMilestonePane";
import SingularityPane from "./SingularityPane";

export default {
  name: "LaitelaTab",
  components: {
    LaitelaRunButton,
    SingularityPane,
    SingularityMilestonePane,
    DarkMatterDimensionGroup,
    AnnihilationButton,
    LaitelaAutobuyerPane,
    CelestialQuoteHistory,
    HadronsPane,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      darkMatter: new Decimal(0),
      darkMatterGain: new Decimal(0),
      isDMCapped: false,
      maxDarkMatter: new Decimal(0),
      darkEnergy: new Decimal(0),
      matterExtraPurchasePercentage: new Decimal(0),
      autobuyersUnlocked: false,
      singularityPanelVisible: false,
      singularitiesUnlocked: false,
      singularityCap: new Decimal(0),
      singularityWaitTime: "",
      showAnnihilation: false,
      endgameUnlocked: false,
      darkMatterCap: new Decimal(0),
      softcap1: new Decimal(0),
      softcap2: new Decimal(0),
      softcapOmega: new Decimal(0),
      hadronsUnlocked: false,
      isUncapped: false,
    };
  },
  computed: {
    styleObject() {
      return {
        color: this.isDMCapped ? "var(--color-bad)" : "",
      };
    }
  },
  methods: {
    update() {
      this.isDoomed = (Pelle.isDoomed && !PelleDestructionUpgrade.continuumBuff.canBeApplied);
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.isDMCapped = this.darkMatter.eq(Laitela.darkMatterCap);
      this.maxDarkMatter.copyFrom(Currency.darkMatter.max);
      this.darkEnergy.copyFrom(player.celestials.laitela.darkEnergy);
      this.matterExtraPurchasePercentage.copyFrom(Laitela.matterExtraPurchaseFactor.gte(11)
        ? Laitela.matterExtraPurchaseFactor
        : Laitela.matterExtraPurchaseFactor.sub(1));
      this.autobuyersUnlocked = SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.autoCondense.canBeApplied ||
        Laitela.darkMatterMult.gt(1);
      this.singularityPanelVisible = Currency.singularities.gt(0);
      this.singularitiesUnlocked = Singularity.capIsReached || this.singularityPanelVisible;
      this.singularityCap.copyFrom(Singularity.cap);
      this.singularityWaitTime = TimeSpan.fromSeconds(new Decimal((this.singularityCap.sub(this.darkEnergy)).div(
        Currency.darkEnergy.productionPerSecond))).toStringShort();
      this.showAnnihilation = Laitela.annihilationUnlocked;
      this.endgameUnlocked = PlayerProgress.endgameUnlocked();
      this.darkMatterCap.copyFrom(Laitela.darkMatterCap);
      this.softcap1.copyFrom(Laitela.darkMatterSoftcap1);
      this.softcap2.copyFrom(Laitela.darkMatterSoftcap2);
      this.softcapOmega.copyFrom(Laitela.darkMatterOmegaSoftcap);
      this.hadronsUnlocked = DualityUpgrade(15).isBought;
      this.isUncapped = Alpha.isDestroyed;

      const d1 = DarkMatterDimension(1);
      this.darkMatterGain = d1.amount.times(d1.powerDM).divide(d1.interval).times(1000);
    },
    maxAll() {
      Laitela.maxAllDMDimensions(8);
    },
    showLaitelaHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.name === "Lai'tela")[0];
      Modal.h2p.show();
    },
    formatContinuumPercentage() {
      return Laitela.matterExtraPurchaseFactor.gte(11)
        ? formatX(this.matterExtraPurchasePercentage, 2, 2)
        : formatDecimalPercents(this.matterExtraPurchasePercentage, 2);
    }
  }
};
</script>

<template>
  <div class="l-laitela-celestial-tab">
    <CelestialQuoteHistory celestial="laitela" />
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="showLaitelaHowTo()"
      >
        点击以查看莱特拉详情
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        最大化暗物质维度
      </PrimaryButton>
    </div>
    <div class="o-laitela-matter-amount">
      你拥有
      <span :style="styleObject">{{ format(darkMatter, 2) }}</span>
      暗物质<span v-if="isDMCapped">（已达到上限）</span>。
      <span v-if="!isDMCapped">(平均：{{ format(darkMatterGain, 2, 2) }}/秒)</span>
    </div>
    <div class="o-laitela-matter-amount">
      你最多获得过
      <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span><span v-if="!isDoomed">暗物质，
        提供 {{ formatContinuumPercentage() }} 连续统加成。</span>
    </div>
    <div class="o-laitela-matter-amount">
      暗物质维度不受存储现实时间的影响。
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap1)"
      class="o-laitela-matter-amount"
    >
      暗物质数量在 {{ format(softcap1, 2) }} 后达到软上限。
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap2)"
      class="o-laitela-matter-amount"
    >
      暗物质数量在 {{ format(softcap2, 2) }} 后达到二重软上限。
    </div>
    <div
      v-if="endgameUnlocked"
      class="o-laitela-matter-amount"
    >
      暗物质数量在 {{ format(darkMatterCap, 2) }} 后达到<span v-if="isUncapped">三重软上限</span><span v-if="!isUncapped">硬上限</span>。
    </div>
    <div
      v-if="maxDarkMatter.gte(softcapOmega)"
      class="o-laitela-matter-amount"
    >
      Dark Matter is further harshly softcapped past {{ format(softcapOmega, 2) }}.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcapOmega)"
      class="o-laitela-matter-amount"
    >
      Dark Matter is further harshly softcapped past {{ format(softcapOmega, 2) }}.
    </div>
    <h2
      v-if="!singularitiesUnlocked"
      class="c-laitela-singularity-container"
    >
      {{ singularityWaitTime }} 后解锁奇点。
      ({{ format(darkEnergy, 2, 2) }}/{{ format(singularityCap, 2) }} 暗能量）
    </h2>
    <SingularityPane v-if="singularitiesUnlocked" />
    <HadronsPane v-if="hadronsUnlocked" />
    <LaitelaAutobuyerPane v-if="autobuyersUnlocked" />
    <div class="l-laitela-mechanics-container">
      <LaitelaRunButton />
      <div>
        <DarkMatterDimensionGroup />
        <AnnihilationButton v-if="showAnnihilation" />
      </div>
      <SingularityMilestonePane v-if="singularityPanelVisible" />
    </div>
  </div>
</template>
