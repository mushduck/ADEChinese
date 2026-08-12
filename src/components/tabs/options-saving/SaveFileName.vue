<script>
export default {
  name: "SaveFileName",
  components: {
  },
  data() {
    return {
      saveFileName: ""
    };
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    }
  }
};
</script>

<template>
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>存档名称：</b>
    <span ach-tooltip="设置自定义名称（最多16个字母数字字符，可含空格及连字符）">
      <input
        class="c-custom-save-name__input"
        type="text"
        maxlength="16"
        placeholder="自定义名称"
        :value="saveFileName"
        @change="handleChange"
      >
    </span>
  </div>
</template>

<style scoped>
.c-custom-save-name__input {
  text-align: center;
  font-family: Typewriter;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0.1rem solid black;
  border-radius: var(--var-border-radius, 0.3rem);
}
</style>
