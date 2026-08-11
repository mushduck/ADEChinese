<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "LoadGameEntry",
  components: {
    PrimaryButton
  },
  props: {
    saveId: {
      type: Number,
      required: true
    }
  },
  data() {
    const save = GameStorage.saves[this.saveId];
    return {
      antimatter: new Decimal(save ? save.antimatter || save.money : 10),
      fileName: save ? save.options.saveFileName : ""
    };
  },
  computed: {
    isSelected() {
      return GameStorage.currentSlot === this.saveId;
    }
  },
  methods: {
    load() {
      GameStorage.loadSlot(this.saveId);
    },
    formatAntimatter(antimatter) {
      return formatPostBreak(antimatter, 2, 1);
    },
    update() {
      if (this.isSelected) {
        this.antimatter.copyFrom(Currency.antimatter);
      }
    }
  },
};
</script>

<template>
  <div class="l-modal-options__save-record">
    <h3>存档 #{{ saveId + 1 }}：<span v-if="isSelected">（已选定）</span></h3>
    <span v-if="fileName">文件名称：{{ fileName }}</span>
    <span>反物质：{{ formatAntimatter(antimatter) }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      @click="load"
    >
      Load
    </PrimaryButton>
  </div>
</template>
