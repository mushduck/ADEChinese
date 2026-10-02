<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DimensionBoostModal",
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
      isFlipped: false
    };
  },
  computed: {
    topLabel() {
      return `你将要进行一次维度提升`;
    },
    message() {
      const keepDimensions = (Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought || PelleAchievementUpgrade.achievement111.canBeApplied)
        && (!player.disablePostReality || (LHC.voidRunning && player.endgame.largeHadronCollider.void.nullified)
        || (Alpha.isRunning && Alpha.currentStage >= 12) || (LHC.voidRunning && NullUpgrade.limerick1.isBought)
        || SlabdrillUnlocks.eternityChallengeTen.isUnlocked)
        ? `由于你拥有的某项升级阻止了${this.isFlipped ? "物质" : "反物质"}及${this.isFlipped ? "物质" : "反物质"}维度重置，
          本次操作实际上不会重置任何内容。但你仍将照常获得维度提升的倍数加成。`
        : `这将重置你的${this.isFlipped ? "物质" : "反物质"}和${this.isFlipped ? "物质" : "反物质"}维度。
          你确定要这么做吗？`;
      return `${keepDimensions}`;
    },
  },
  methods: {
    update() {
      this.isFlipped = player.universes.current === 2;
    },
    handleYesClick() {
      requestDimensionBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dimensionBoost"
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
