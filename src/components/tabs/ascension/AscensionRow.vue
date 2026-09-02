<script>
export default {
  name: "AscensionRow",
  props: {
    getAscension: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    gradientColors() {
      return ["#b67f33", "#b341e0", "#2196f3", "#df5050", "#4980cc", "#00bcd4", "#8051ec", "#1256a3", "#673ab7"];
    },
    currGrad() {
      const color = this.gradientColors[this.config.id]
      return `linear-gradient(90deg, ${color}, black, ${color}, black, ${color}, black, ${color})`;
    },
    ascensionStyle() {
      return {
        position: "relative",
        "font-size": "3rem",
        "font-weight": "bold",
        background: this.currGrad,
        "background-clip": "text",
        "background-size": "300% 100%",
        animation: "a-ascension-shift 10s infinite",

        "-webkit-text-fill-color": "transparent",
      };
    },
    ascension() {
      return this.getAscension();
    },
    config() {
      return this.ascension.config;
    },
    description() {
      return `${this.config.description()}`;
    },
    id() {
      return `${this.config.id + 1}`;
    },
    name() {
      return `${this.config.name}`;
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.ascension.isUnlocked;
    }
  }
};
</script>

<template>
  <div v-show="isUnlocked">
    <div
      :style="ascensionStyle"
    >
      Ascension {{ id }}:
      {{ name }}
      <br>
      Effect: {{ description }}.
    </div>
  </div>
</template>

<style scoped>

</style>
