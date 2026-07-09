<script>
import Star from "./Star";

export default {
  name: "Stars",
  components: {
    Star
  },
  data() {
    return {
      rcount: 0,
      ocount: 0,
      ycount: 0,
      gcount: 0,
      bcount: 0,
      pcount: 0,
      wcount: 0,
      lcount: 0,
      acount: 0,
      initialized: false,
      bounds: {
        x: 0,
        y: 0
      },
      isBlob: false,
    };
  },
  mounted() {
    this.$nextTick(this.updateSize);
    window.addEventListener("resize", this.updateSize);
    this.initialized = true;
  },
  destroyed() {
    window.removeEventListener("resize", this.updateSize);
  },
  methods: {
    update() {
      this.rcount = Decimal.floor(player.endgame.ethereal.stars.red.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.ocount = Decimal.floor(player.endgame.ethereal.stars.orange.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.ycount = Decimal.floor(player.endgame.ethereal.stars.yellow.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.gcount = Decimal.floor(player.endgame.ethereal.stars.green.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.bcount = Decimal.floor(player.endgame.ethereal.stars.blue.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.pcount = Decimal.floor(player.endgame.ethereal.stars.purple.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.wcount = Decimal.floor(player.endgame.ethereal.stars.white.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.lcount = Decimal.floor(player.endgame.ethereal.stars.black.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.acount = Decimal.floor(player.endgame.ethereal.stars.gray.add(1).log10().sqrt().add(0.5)).min(100).toNumber();
      this.isBlob = Theme.currentName() === "S11";
    },
    updateSize() {
      this.bounds.x = this.$el.clientWidth;
      this.bounds.y = this.$el.clientHeight;
    }
  }
};
</script>

<template>
  <svg
    v-if="initialized"
    class="c-tachyon-particle-container"
  >
    <Star
      v-for="i in rcount"
      :key="i"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="0"
    />
    <Star
      v-for="j in ocount"
      :key="j + 100"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="1"
    />
    <Star
      v-for="k in ycount"
      :key="k + 200"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="2"
    />
    <Star
      v-for="l in gcount"
      :key="l + 300"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="3"
    />
    <Star
      v-for="m in bcount"
      :key="m + 400"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="4"
    />
    <Star
      v-for="n in pcount"
      :key="n + 500"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="5"
    />
    <Star
      v-for="o in wcount"
      :key="o + 600"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="6"
    />
    <Star
      v-for="p in lcount"
      :key="p + 700"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="7"
    />
    <Star
      v-for="q in acount"
      :key="q + 800"
      :bounds="bounds"
      :is-blob="isBlob"
      :type="8"
    />
  </svg>
</template>

<style scoped>

</style>
