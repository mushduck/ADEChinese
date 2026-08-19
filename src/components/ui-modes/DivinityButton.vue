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
        此身之力已超出宇宙所能承载之极限...我将登神...
      </h3>
      <button
        :class="{
          'btn-divinity': true
        }"
        @click="handleClick"
      >
        神性
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
        神性
      </button>
      <div class="o-emptiness">
        此身之力已超出宇宙所能承载之极限...我将登神...
      </div>
    </div>
  </span>
</template>

<style scoped>
.l-spacing {
  margin-top: 1rem;
}
</style>
