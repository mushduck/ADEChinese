<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ReplicantiGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      replicanti: new Decimal(),
      divideReplicanti: false,
      canBeBought: new Decimal(),
      isFlipped: false
    };
  },
  computed: {
    topLabel() {
      return `你将要购买 ${quantifyHybridLarge("个复制器星系", this.canBeBought)}`;
    },
        message() {
      const reductionString = this.divideReplicanti
      ? `购买复制器星系将令复制器数量除以 ${format(Number.MAX_VALUE, 2, 2)}
          （${format(this.replicanti, 2, 2)} →
          ${format(this.replicanti.divide(DC.NUMMAX.pow(this.canBeBought)), 2, 2)}）`
        : `将复制器重置为 ${formatInt(1)}`;
      return `复制器星系对计数频率的提升效果与${this.isFlipped ? "正物质" : "反物质"}星系相同。
        但它不会增加${this.isFlipped ? "正物质" : "反物质"}星系的价格，也不受${this.isFlipped ? "正物质" : "反物质"}星系专属倍率影响。
        它将会${reductionString}。`;
    }
  },
  methods: {
    update() {
      this.replicanti.copyFrom(player.replicanti.amount);
      this.divideReplicanti = Achievement(126).isUnlocked;
      this.canBeBought.copyFrom(Replicanti.galaxies.gain);
      this.isFlipped = player.universes.current === 2;
      if (this.replicanti.lt(Number.MAX_VALUE)) this.emitClose();
    },
    handleYesClick() {
      replicantiGalaxy(false);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="replicantiGalaxy"
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
