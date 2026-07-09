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
      const speed = 0.025;
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
    r="20"
    class="o-star-red"
  />
  <circle
    v-else-if="type === 1"
    r="20"
    class="o-star-orange"
  />
  <circle
    v-else-if="type === 2"
    r="20"
    class="o-star-yellow"
  />
  <circle
    v-else-if="type === 3"
    r="20"
    class="o-star-green"
  />
  <circle
    v-else-if="type === 4"
    r="20"
    class="o-star-blue"
  />
  <circle
    v-else-if="type === 5"
    r="20"
    class="o-star-purple"
  />
  <circle
    v-else-if="type === 6"
    r="20"
    class="o-star-white"
  />
  <circle
    v-else-if="type === 7"
    r="20"
    class="o-star-black"
  />
  <circle
    v-else-if="type === 8"
    r="20"
    class="o-star-gray"
  />
</template>

<style scoped>

</style>
