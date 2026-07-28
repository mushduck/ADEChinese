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
    <div class="c-ascension-text">
      Ascension {{ id }}:
      {{ name }}
      <br>
      Effect: {{ description }}.
    </div>
  </div>
</template>

<style scoped>

</style>
