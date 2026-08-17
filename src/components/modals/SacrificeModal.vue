<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
      currentPower: new Decimal(),
      nextPower: new Decimal()
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed && (!player.disablePostReality || (Alpha.isRunning && Alpha.currentStage >= 12) ||
        (LHC.voidRunning && NullUpgrade.limerick1.isBought))) {
        return `维度献祭会给予第八维度一个基于献祭时第一维度数量的加成。`;
      }
      return `维度献祭将会清空第一至第七维度（不改变价格和倍率）以给予第八维度一个加成，这一加成基于已献祭第一维度的数量。恢复生产需要时间。`;
    },
    multiplierText() {
      if (Ascensions.sacA.isUnlocked) return `当前献祭指数为 ${formatPow(this.currentPower, 2, 3)}，下次献祭后将提高至 ${formatPow(this.nextPower, 2, 3)}。`;
      return `当前献祭倍率为 ${formatX(this.currentMultiplier, 2, 2)}，下次献祭后将提高至${formatX(this.nextMultiplier, 2, 2)}。`;
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
      this.currentPower.copyFrom(Sacrifice.totalPower);
      this.nextPower.copyFrom(Sacrifice.nextPower.add(Sacrifice.totalPower));
    },
    handleYesClick() {
      sacrificeReset();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      维度献祭
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
</template>
