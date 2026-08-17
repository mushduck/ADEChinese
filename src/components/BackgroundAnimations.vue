<script>
import BlobSnowflakes from "@/components/BlobSnowflakes";
import Hadrons from "@/components/tabs/large-hadron-collider/Hadrons";
import Stars from "@/components/tabs/ethereal/Stars";
import TachyonParticles from "@/components/tabs/time-dilation/TachyonParticles";

export default {
  name: "BackgroundAnimations",
  components: {
    BlobSnowflakes,
    Hadrons,
    Stars,
    TachyonParticles
  },
  data() {
    return {
      blob: false,
      animateHadrons: false,
      animateStars: false,
      animateTachyons: false
    };
  },
  methods: {
    update() {
      this.blob = Theme.currentName() === "S11";
      this.animateHadrons = player.options.animations.hadrons &&
        Tabs.current[this.$viewModel.subtab].name === "强子加速器";
      this.animateStars = player.options.animations.stars &&
        Tabs.current[this.$viewModel.subtab].name === "缥缈";
      this.animateTachyons = player.options.animations.tachyonParticles &&
        Tabs.current[this.$viewModel.subtab].name === "时间膨胀";
    }
  },
};
</script>

<template>
  <div
    id="ui-background-animations"
    class="l-background-animations"
  >
    <BlobSnowflakes v-if="blob" />
    <Hadrons v-if="animateHadrons" />
    <Stars v-if="animateStars" />
    <TachyonParticles v-if="animateTachyons" />
  </div>
</template>

<style scoped>

</style>
