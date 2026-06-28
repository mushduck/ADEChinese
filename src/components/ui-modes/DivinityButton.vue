<script>
export default {
  name: "DivinityButton",
  data() {
    return {
      isModern: false,
      shouldDisplay: false
    };
  },
  methods: {
    update() {
      this.shouldDisplay = Pelle.isDoomed && player.antimatter.gte(DC.ENUMMAX);
      if (!this.shouldDisplay) return;
      this.isModern = player.options.newUI;
    },
    handleClick() {
      divinityReset();
    }
  }
};
</script>

<template>
  <span v-if="shouldDisplay">
    <div v-if="isModern">
      <h3 class="l-spacing">
        My power is too much for the universe to be stable... I need to become Divine...
      </h3>
      <button
        :class="{
          'btn-divinity': true
        }"
        @click="handleClick"
      >
        Become Divine
      </button>
    </div>
    <div v-else>
      <button
        :class="{
          'o-tab-btn': true,
          'o-divinity-btn': true,
          'l-old-ui__divinity-btn': true
        }"
        @click="handleClick"
      >
        Become Divine
      </button>
      <div class="o-emptiness">
        My power is too much for the universe to be stable... I need to become Divine...
      </div>
    </div>
  </span>
</template>

<style scoped>
.l-spacing {
  margin-top: 1rem;
}
</style>
