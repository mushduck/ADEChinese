<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakEternityModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isFlipped: false
    };
  },
  computed: {
    message() {
      return `打破永恒将使你能够获得超过 ${format(DC.E9E15, 2, 2)} 的${this.isFlipped ? "物质" : "反物质"}。在被毁灭的现实中，基于超过 1e9e15 的${this.isFlipped ? "物质" : "反物质"}产量，在终局后给予额外的天界点数和毁灭粒子。此外，还将解锁打破永恒升级及其他特性。`.split("\n");
    },
  },
  methods: {
    update() {
      this.isFlipped = player.universes.current === 2;
    },
    handleYesClick() {
      breakEternity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      你正在打破永恒
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      打破
    </template>
  </ModalWrapperChoice>
</template>
