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
  computed: {
    topLabel() {
      return `你将要进行一次维度提升`;
    },
    message() {
      const keepDimensions = (Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought || PelleAchievementUpgrade.achievement111.canBeApplied)
        && (!player.disablePostReality || (LHC.voidRunning && player.endgame.largeHadronCollider.void.nullified)
        || (Alpha.isRunning && Alpha.currentStage >= 12) || (LHC.voidRunning && NullUpgrade.limerick1.isBought))
        ? `由于你拥有的某项升级阻止了反物质及反物质维度重置，本次操作实际上不会重置任何内容。但你仍将照常获得维度提升的倍数加成。`
        : `这将重置你的维度和维度提升。你确定要这么做吗？`;

      return `${keepDimensions}`;
    },
  },
  methods: {
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
