<script>
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import EndgameMasterySaveLoadButton from "./EndgameMasterySaveLoadButton";
import EndgameSkillBuyButton from "./EndgameSkillBuyButton";

export default {
  name: "EndgameSkillShop",
  components: {
    PrimaryToggleButton,
    EndgameSkillBuyButton,
    EndgameMasterySaveLoadButton
  },
  data() {
    return {
      skillAmount: new Decimal(0),
      skillGeneration: new Decimal(0),
      totalEndgameSkills: new Decimal(0),
      shopMinimized: false,
      minimizeAvailable: false,
      budget: {
        am: new Decimal(0),
        cp: new Decimal(0),
        dp: new Decimal(0)
      },
      costs: {
        am: new Decimal(0),
        cp: new Decimal(0),
        dp: new Decimal(0)
      },
    };
  },
  computed: {
    minimized() {
      return this.minimizeAvailable && this.shopMinimized;
    },
    formatEndgameSkillType() {
      if (this.skillAmount.gte(1e6)) {
        return format;
      }
      return formatInt;
    },
    totalEndgameSkillText() {
      return `${quantify("total Endgame Skill", this.totalEndgameSkills, 2, 2, this.formatEndgameSkillType)}`;
    },
    minimizeArrowStyle() {
      return {
        transform: this.minimized ? "rotate(-180deg)" : "",
        transition: "all 0.25s ease-out"
      };
    },
    saveLoadText() {
      return this.$viewModel.shiftDown ? "Save:" : "Load:";
    },
    shopBottomRowHeightStyle() {
      return {
        height: this.hasTTAutobuyer ? "6.7rem" : "4.4rem",
      };
    }
  },
  methods: {
    minimize() {
      player.endgameMasteries.shopMinimized = !player.endgameMasteries.shopMinimized;
    },
    formatAM(am) {
      return `${format(Decimal.pow(10, am))} AM`;
    },
    buyWithAM() {
      EndgameSkills.buyOne(false, "am");
    },
    formatCP(cp) {
      return `${format(cp, 2, 0)} CP`;
    },
    buyWithCP() {
      EndgameSkills.buyOne(false, "cp");
    },
    formatDP(dp) {
      return `${format(dp, 2, 0)} DP`;
    },
    buyWithDP() {
      EndgameSkills.buyOne(false, "dp");
    },
    buyMaxSkills() {
      EndgameSkills.buyMax(false);
    },
    update() {
      this.skillAmount.copyFrom(Currency.endgameSkills);
      this.totalEndgameSkills.copyFrom(Currency.endgameSkills.max);
      this.shopMinimized = player.endgameMasteries.shopMinimized;
      this.minimizeAvailable = Currency.doomedParticles.gte(1e100);
      const budget = this.budget;
      budget.am.copyFrom(EndgameSkillPurchaseType.am.currency);
      budget.cp.copyFrom(EndgameSkillPurchaseType.cp.currency);
      budget.dp.copyFrom(EndgameSkillPurchaseType.dp.currency);
      const costs = this.costs;
      costs.am.copyFrom(EndgameSkillPurchaseType.am.cost);
      costs.cp.copyFrom(EndgameSkillPurchaseType.cp.cost);
      costs.dp.copyFrom(EndgameSkillPurchaseType.dp.cost);
    },
  },
};
</script>

<template>
  <div class="endgame-skill-buttons">
    <div class="esshop-container esshop-background">
      <div
        data-role="page"
        class="esbuttons-row esbuttons-top-row"
      >
        <button
          class="l-es-save-load-btn c-es-buy-button c-es-buy-button--unlocked"
          onClick="Modal.preferredTree.show()"
        >
          <i class="fas fa-cog" />
        </button>
        <p class="endgameskills">
          <span class="c-es-amount">
            {{ quantify("Endgame Skill", skillAmount, 2, 0, formatEndgameSkillType) }}
          </span>
        </p>
        <div class="l-load-tree-area">
          <div class="l-tree-load-button-wrapper">
            <span class="c-esshop__save-load-text">{{ saveLoadText }}</span>
            <EndgameMasterySaveLoadButton
              v-for="saveslot in 6"
              :key="saveslot"
              :saveslot="saveslot"
            />
          </div>
          <div class="es-gen-container">
            <span>
              You have {{ totalEndgameSkillText }}.
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="!minimized"
        class="esbuttons-row"
        :style="shopBottomRowHeightStyle"
      >
        <EndgameSkillBuyButton
          :budget="budget.am"
          :cost="costs.am"
          :format-cost="formatAM"
          :action="buyWithAM"
        />
        <EndgameSkillBuyButton
          :budget="budget.cp"
          :cost="costs.cp"
          :format-cost="formatCP"
          :action="buyWithCP"
        />
        <EndgameSkillBuyButton
          :budget="budget.dp"
          :cost="costs.dp"
          :format-cost="formatDP"
          :action="buyWithDP"
        />
        <div class="l-es-buy-max-vbox">
          <button
            v-if="!minimized"
            class="o-es-top-row-button c-es-buy-button c-es-buy-button--unlocked"
            @click="buyMaxSkills"
          >
            Buy max
          </button>
        </div>
      </div>
      <div
        v-else
        class="esbuttons-row esbuttons-bottom-row-hide"
      />
    </div>
    <button
      v-if="minimizeAvailable"
      class="esshop-minimize-btn esshop-background"
      @click="minimize"
    >
      <span
        class="minimize-arrow"
        :style="minimizeArrowStyle"
      >▼</span>
    </button>
  </div>
</template>

<style scoped>
.l-load-tree-area {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: left;
}

.l-tree-load-button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.esbuttons-bottom-row-hide {
  height: 0;
}

.es-gen-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.checkbox-margin {
  margin: 0 0.4rem;
}
</style>
