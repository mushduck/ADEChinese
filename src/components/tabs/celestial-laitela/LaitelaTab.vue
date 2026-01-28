<script>
import AnnihilationButton from "./AnnihilationButton";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import DarkMatterDimensionGroup from "./DarkMatterDimensionGroup";
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
      matterExtraPurchasePercentage: 0,
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
      this.isDoomed = Pelle.isDoomed;
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.isDMCapped = this.darkMatter.eq(Laitela.darkMatterCap);
      this.maxDarkMatter.copyFrom(Currency.darkMatter.max);
      this.darkEnergy.copyFrom(player.celestials.laitela.darkEnergy);
      this.matterExtraPurchasePercentage = Laitela.matterExtraPurchaseFactor >= 11
        ? Laitela.matterExtraPurchaseFactor
        : Laitela.matterExtraPurchaseFactor - 1;
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
      this.softcap1.copyFrom(Decimal.pow(10, 10000));
      this.softcap2.copyFrom(Decimal.pow(10, 100000));

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
      return Laitela.matterExtraPurchaseFactor >= 11
        ? formatX(this.matterExtraPurchasePercentage, 2, 2)
        : formatPercents(this.matterExtraPurchasePercentage, 2);
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
        Click for Lai'tela info
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        Max all Dark Matter Dimensions
      </PrimaryButton>
    </div>
    <div class="o-laitela-matter-amount">
      You have
      <span :style="styleObject">{{ format(darkMatter, 2) }}</span>
      Dark Matter<span v-if="isDMCapped"> (capped)</span>.
      <span v-if="!isDMCapped">(Average: {{ format(darkMatterGain, 2, 2) }}/s)</span>
    </div>
    <div class="o-laitela-matter-amount">
      Your maximum Dark Matter ever is
      <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span><span v-if="!isDoomed">,
        giving {{ formatContinuumPercentage() }} more purchases from Continuum</span>.
    </div>
    <div class="o-laitela-matter-amount">
      Dark Matter Dimensions are unaffected by storing real time.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap1)"
      class="o-laitela-matter-amount"
    >
      Dark Matter is softcapped past {{ format(softcap1, 2) }}.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap2)"
      class="o-laitela-matter-amount"
    >
      Dark Matter is further softcapped past {{ format(softcap2, 2) }}.
    </div>
    <div
      v-if="endgameUnlocked"
      class="o-laitela-matter-amount"
    >
      Dark Matter is hardcapped at {{ format(darkMatterCap, 2) }}.
    </div>
    <h2
      v-if="!singularitiesUnlocked"
      class="c-laitela-singularity-container"
    >
      Unlock Singularities in {{ singularityWaitTime }}.
      ({{ format(darkEnergy, 2, 2) }}/{{ format(singularityCap, 2) }} Dark Energy)
    </h2>
    <SingularityPane v-if="singularitiesUnlocked" />
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
