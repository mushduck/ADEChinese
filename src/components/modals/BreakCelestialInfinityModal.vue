<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakCelestialInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `Breaking Celestial Infinity will allow you to gain Celestial Matter past ${infinity}.
        Celestial Dimensions and Celestial Tickspeed Upgrades will scale in cost faster after ${infinity} Celestial Matter.
        You will gain additional Celestial Infinity Points on Celestial Crunch based on Celestial Matter produced over ${infinity}.\
        It will also unlock Celestial Break Infinity Upgrades.`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      celestialBreakInfinity();
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
      You are Breaking Celestial Infinity
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
