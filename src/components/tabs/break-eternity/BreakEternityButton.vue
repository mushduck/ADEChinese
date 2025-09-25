<script>
export default {
  name: "BreakEternityButton",
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
      antimatterReq: new Decimal(0)
    };
  },
  computed: {
    classObject() {
      return {
        "o-break-eternity-upgrade-btn": true,
        "o-break-eternity-upgrade-btn--color-2": true,
        "o-break-eternity-upgrade-btn--available": this.isUnlocked || this.isBroken,
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
      this.isUnlocked = PlayerProgress.endgameUnlocked() && player.antimatter.gte(this.antimatterReq);
      this.antimatterReq = new Decimal(1e9000000000000000);
    },
    clicked() {
      if (!this.isBroken && this.isUnlocked) Modal.breakEternity.show();
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
