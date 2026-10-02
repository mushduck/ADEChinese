<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: new Decimal(0),
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false,
      isFlipped: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk && this.isFlipped) return `你即将购买 ${quantifyInt("正物质星系", this.newGalaxies)}`;
      if (this.bulk) return `你即将购买 ${quantifyInt("反物质星系", this.newGalaxies)}`;
      return `你即将购买一个${this.isFlipped ? "正物质" : "反物质"}星系`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("反物质", "反物质维度", "计数频率");
      if (!this.perkANRBought && this.isFlipped) resetResouces.push("反物质维度", "计数频率");
      if (!this.perkANRBought && !this.isFlipped) resetResouces.push("正物质维度", "计数频率");
      if (!this.keepDimBoost) resetResouces.push("维度提升");
      if (!this.keepAntimatter && !this.perkANRBought && this.isFlipped) resetResouces.push("正物质");
      if (!this.keepAntimatter && !this.perkANRBought && !this.isFlipped) resetResouces.push("反物质");
      const resetList = makeEnumeration(resetResouces);
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = `无限挑战 ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        tickspeedFixed = `${Ra.displayName}的现实`;
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? "计数频率升级将获得小幅提升。"
        : `计数频率升级不会获得加成，因为你当前处于${tickspeedFixed}中。`;
      const message = (resetList === "")
        ? `这将不会重置任何东西，并且${tickspeedInfo}`
        : `这将重置${resetList}，然而${tickspeedInfo}`;

      if (this.bulk && this.isFlipped) return `你确定要购买${quantifyInt("正物质星系", this.newGalaxies)}吗？${message}`;
      if (this.bulk) return `你确定要购买${quantifyInt("反物质星系", this.newGalaxies)}吗？${message}`;
      return `你确定要购买一个${this.isFlipped ? "正物质" : "反物质"}星系吗？${message}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = Galaxy.buyableGalaxies(Decimal.round(dim.totalAmount.toNumber())).gt(player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Decimal.round(dim.totalAmount.toNumber())).sub(player.galaxies);
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked && (!player.disablePostReality || (Alpha.isRunning && Alpha.currentStage >= 12) ||
        (LHC.voidRunning && NullUpgrade.limerick1.isBought) || SlabdrillUnlocks.eternityChallengeTen.isUnlocked);
      this.perkANRBought = (Perk.antimatterNoReset.canBeApplied &&
        (!player.disablePostReality || (LHC.voidRunning && player.endgame.largeHadronCollider.void.nullified)));
      this.keepDimBoost = ((Achievement(143).isUnlocked && (!Pelle.isDoomed || PelleAchievementUpgrade.achievement143.canBeApplied)) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied) && (!player.disablePostReality || (Alpha.isRunning && Alpha.currentStage >= 20) ||
        (LHC.voidRunning && NullUpgrade.limerick2.isBought));
      this.isFlipped = player.universes.current === 2;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
