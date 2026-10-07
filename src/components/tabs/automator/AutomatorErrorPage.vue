<script>
export default {
  name: "AutomatorErrorPage",
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    update() {
      this.errors = AutomatorData.currentErrors();
    },
    scrollToLine(line) {
      AutomatorScroller.scrollToLine(line);
      AutomatorHighlighter.updateHighlightedLine(line, LineEnum.Error);
    }
  }
};
</script>

<template>
  <div class="c-automator-docs-page">
    <div v-if="errors.length === 0">
      没有找到脚本错误。
    </div>
    <div v-else>
      <b>你的脚本有以下 {{ format(errors.length) }} 个错误：</b>
      <br>
      <br>
      <span
        v-for="(error, i) in errors"
        :key="i"
      >
        <b>在第 {{ error.startLine }} 行：</b>
        <button
          v-tooltip="'Jump to line'"
          class="c-automator-docs--button fas fa-arrow-circle-right"
          @click="scrollToLine(error.startLine)"
        />
        <div class="c-automator-docs-page__indented">
          {{ error.info }}
        </div>
        <div class="c-automator-docs-page__indented">
          <i>建议改为：{{ error.tip }}</i>
        </div>
      </span>
      <i>
        注意：有时，语法错误可能会阻止自动机读取脚本的剩余部分。由于先前行中发生的其他错误，某些错误可能无法识别。或者，如果在具有内部指令（例如，IF 或 WHILE）的命令中发生错误，则后面一行上正确写入的指令可能会被识别为错误。此外，如果错误原因不清楚，修正建议也可能是错误的。
      </i>
    </div>
  </div>
</template>

<style scoped>

</style>
