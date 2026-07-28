<script>
import CelestialQuoteLineBasicInteractable from "./templates/CelestialQuoteLineBasicInteractable";

export default {
  name: "CelestialQuoteModal",
  components: {
    CelestialQuoteLineBasicInteractable
  },
  data() {
    return {
      flashing: false
    };
  },
  computed: {
    classObject() {
      return {
        "l-modal-overlay": !this.flashing,
        "l-modal-overlay-flash-warn": this.flashing
      };
    }
  },
  props: {
    quote: {
      type: Object,
      required: true
    }
  },
  methods: {
    update() {
      this.flashing = ui.$viewModel.quotes.current === Quotes.elemental.intro3;
    }
  }
};
</script>

<template>
  <div
    class="c-modal-overlay l-high-index"
    :class="classObject"
  >
    <CelestialQuoteLineBasicInteractable
      class="c-quote-overlay"
      :quote="quote"
    />
  </div>
</template>

<style scoped>
.c-quote-overlay {
  font-size: 1.4rem;
  padding: 1rem;
  transition-duration: 0.2s;
}

.l-high-index {
  z-index: 9;
}
</style>
