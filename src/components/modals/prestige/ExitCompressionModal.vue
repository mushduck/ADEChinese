<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitCompressionModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      hawkingRadiationGain: new Decimal(0)
    };
  },
  computed: {
    gainText() {
      if (this.hawkingRadiationGain.lte(0)) return `获得不到任何东西`;
      return `获得 ${quantify("霍金辐射", this.hawkingRadiationGain, 2, 1)}`;
    }
  },
  methods: {
    update() {
      if (!player.compression.active) this.emitClose();
      this.hawkingRadiationGain.copyFrom(getHawkingRadiationGain(true));
    },
    handleYesClick() {
      if (!player.compression.active) return;
      rewardHR();
      Endgame.resetNoReward();
      player.compression.active = false;
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="compression"
    @confirm="handleYesClick"
  >
    <template #header>
      <span>
        你将退出时间压缩
      </span>
    </template>
    <div class="c-modal-message__text">
      <span>
        如果你现在就退出压缩，那么你将{{ gainText }}。
      </span>
      <br>
      你确定要这么做了吗？
    </div>
    <template #confirm-text>
      退出
    </template>
  </ModalWrapperChoice>
</template>
