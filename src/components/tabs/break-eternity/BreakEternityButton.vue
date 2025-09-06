<script>
export default {
  name: "BreakEternityButton",
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-break-eternity-upgrade-btn": true,
        "o-break-eternity-upgrade-btn--color-2": true,
        "o-break-eternity-upgrade-btn--available": this.isUnlocked,
        "o-break-eternity-upgrade-btn--unavailable": !this.isUnlocked,
        "o-break-eternity-upgrade-btn--unclickable": this.isBroken,
      };
    },
    text() {
      return this.isBroken ? "ETERNITY IS BROKEN" : "BREAK ETERNITY";
    }
  },
  methods: {
    update() {
      this.isBroken = player.break2;
      this.isUnlocked = PlayerProgress.endgameUnlocked();
    },
    clicked() {
      Modal.breakEternity.show();
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
