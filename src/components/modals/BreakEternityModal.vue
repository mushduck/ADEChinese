<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakEternityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `Breaking Eternity will allow you to gain antimatter past 1e9e15.
        You will gain additional Celestial Points and Doomed Particles on Endgame based on antimatter produced over 1e9e15
        while inside the Doomed Reality. It will also unlock Break Eternity Upgrades and other features.`;
    },
  },
  methods: {
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
      You are Breaking Eternity
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
      Break
    </template>
  </ModalWrapperChoice>
</template>
