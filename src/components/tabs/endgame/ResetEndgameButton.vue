<script>
export default {
  name: "ResetEndgameButton",
  data() {
    return {
      canEndgame: false,
      isDoomed: false,
    };
  },
  computed: {
    resetText() {
      return "重启本次终局";
    },
  },
  methods: {
    update() {
      this.canEndgame = player.celestials.pelle.records.totalEndgameAntimatter.add(1).log10().gte(9e15);
      this.isDoomed = Pelle.isDoomed;
    },
    resetEndgame() {
      const confirms = player.options.confirmations;
      if (GameEnd.creditsClosed) return;
      if (this.isDoomed) {
        if (confirms.resetEndgame) Modal.resetEndgame.show({
          endgameState: "在被毁灭的现实中",
          suggestion: "耐心等待"
        });
        else Endgame.resetNoReward();
      } else if (this.canEndgame) {
        if (confirms.resetEndgame) Modal.resetEndgame.show({
          endgameState: "可以进行一次终局",
          suggestion: "进行终局以获得收益，好过啥也没拿到"
        });
        else Endgame.resetNoReward();
      } else if (confirms.resetEndgame) Modal.resetEndgame.show({
        endgameState: "在被毁灭的现实外",
        suggestion: "做你想做的事"
      });
      else Endgame.resetNoReward();
    },
  }
};
</script>

<template>
  <button
    :class="['l-reset-endgame-button',
             'c-reset-endgame-button',
             {'c-reset-endgame-button-doom': isDoomed}]"
    @click="resetEndgame"
  >
    <div class="l-endgame-button__contents">
      {{ resetText }}
    </div>
  </button>
</template>

<style scoped>

</style>
