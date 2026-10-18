<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "TrueEscapeModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `在混沌中，你挣脱了渊蛇的束缚。现在，你终于可以真正从这诅咒之地脱身了。`;
    },
    entranceLabel() {
      return `渊蛇的现实正在崩溃`;
    }
  },
  methods: {
    handleYesClick() {
      runRealityAnimation();
      setTimeout(() => { Slabdrill.warpToPelleDomain(); }, 3000);
      setTimeout(() => { Slabdrill.quotes.ending.show(); }, 10000);
      setTimeout(() => { Elemental.quotes.celPlus.show(); }, 11000);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <template #confirm-text>
      逃离
    </template>
  </ModalWrapperChoice>
</template>
