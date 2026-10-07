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
      Modal.message.show(`警告：过剩的虚物质已在时空中撕裂出一道裂隙。
        这道裂隙解锁了归零虚无，虚粒子将从其中诞生。`, {}, 3);
    }
  }
};
</script>

<template>
  <span v-if="shouldDisplay">
    <div v-if="isModern">
      <h3 class="l-spacing">
        熵增正在撕裂这个宇宙...我必须将此多元宇宙彻底归零...
      </h3>
      <button
        :class="{
          'btn-nullify': true
        }"
        @click="handleClick"
      >
        归零
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
        归零
      </button>
      <div class="o-emptiness">
        熵增正在撕裂这个宇宙...我必须将此多元宇宙彻底归零...
      </div>
    </div>
  </span>
</template>

<style scoped>
.l-spacing {
  margin-top: 1rem;
}
</style>
