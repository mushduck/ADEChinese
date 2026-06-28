<script>
export default {
  name: "NullifyButton",
  data() {
    return {
      isModern: false,
      shouldDisplay: false
    };
  },
  methods: {
    update() {
      this.shouldDisplay = player.endgame.largeHadronCollider.void.nullMatter.gte(DC.NUMMAX) &&
        !player.endgame.largeHadronCollider.void.nullified;
      if (!this.shouldDisplay) return;
      this.isModern = player.options.newUI;
    },
    handleClick() {
      player.endgame.largeHadronCollider.void.nullified = true;
      Modal.message.show(`WARNING: YOUR EXCESS NULL MATTER HAS CREATED A RIFT IN SPACETIME.
        THIS RIFT HAS CAUSED YOU TO UNLOCK THE NULLIFIED VOID AND START GENERATING NULL PARTICLES.`, {}, 3);
    }
  }
};
</script>

<template>
  <span v-if="shouldDisplay">
    <div v-if="isModern">
      <h3 class="l-spacing">
        The Entropy has become too much... I must Nullify the Multiverse...
      </h3>
      <button
        :class="{
          'btn-nullify': true
        }"
        @click="handleClick"
      >
        NULLIFY
      </button>
    </div>
    <div v-else>
      <button
        :class="{
          'o-tab-btn': true,
          'o-nullify-btn': true,
          'l-old-ui__nullify-btn': true
        }"
        @click="handleClick"
      >
        NULLIFY
      </button>
      <div class="o-emptiness">
        The Entropy has become too much... I must Nullify the Multiverse...
      </div>
    </div>
  </span>
</template>

<style scoped>
.l-spacing {
  margin-top: 1rem;
}
</style>
