<script>
import TWEEN from "tween.js";

export default {
  name: "Hadron",
  props: {
    bounds: {
      type: Object,
      required: true
    },
    isBlob: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      blob: "",
    };
  },
  mounted() {
    const blobs = "";
    this.blob = blobs[Math.floor(Math.random() * blobs.length)];
    this.fly();
  },
  beforeDestroy() {
    TWEEN.remove(this.tween);
  },
  methods: {
    fly() {
      const bounds = this.bounds;
      const start = {
        x: Math.random() * bounds.x,
        y: Math.random() * bounds.y
      };
      const direction = randomUnitVector();
      const speed = (1 / (LHC.hadronSpeed > 0 ? Math.pow(299792458 / LHC.hadronSpeed, 0.4) : Infinity)) * 2.5;
      const intersectionLength = intersect(start, direction, { x: 0, y: 0 }, bounds);
      const intersection = {
        x: start.x + direction.x * intersectionLength,
        y: start.y + direction.y * intersectionLength
      };
      const duration = Math.max(intersectionLength / speed, 1);

      const position = start;
      this.tween = new TWEEN.Tween(position)
        .to(intersection, duration)
        .onUpdate(() => {
          this.$el.setAttribute(this.isBlob ? "x" : "cx", position.x);
          this.$el.setAttribute(this.isBlob ? "y" : "cy", position.y);
        })
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(this.fly.bind(this))
        .start(tweenTime);

      function randomUnitVector() {
        const azimuth = Math.random() * 2 * Math.PI;
        return {
          x: Math.cos(azimuth),
          y: Math.sin(azimuth)
        };
      }
      // eslint-disable-next-line max-params
      function intersect(rayStart, rayUnit, rectAA, rectBB) {
        const dirfrac = {
          x: 1 / rayUnit.x,
          y: 1 / rayUnit.y
        };
        const t1 = (rectAA.x - rayStart.x) * dirfrac.x;
        const t2 = (rectBB.x - rayStart.x) * dirfrac.x;
        const t3 = (rectAA.y - rayStart.y) * dirfrac.y;
        const t4 = (rectBB.y - rayStart.y) * dirfrac.y;
        return Math.min(Math.max(t1, t2), Math.max(t3, t4));
      }
    }
  }
};
</script>

<template>
  <text
    v-if="isBlob"
    class="o-tachyon-particle"
  >
    {{ blob }}
  </text>
  <circle
    v-else-if="type === 0"
    r="5"
    class="o-hadron-light"
  />
  <circle
    v-else-if="type === 1"
    r="5"
    class="o-hadron-dark"
  />
  <circle
    v-else-if="type === 2"
    r="5"
    class="o-hadron-exotic"
  />
</template>

<style scoped>

</style>
