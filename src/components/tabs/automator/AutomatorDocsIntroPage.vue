<script>
export default {
  name: "AutomatorDocsIntroPage",
};
</script>

<template>
  <div>
    欢迎使用自动机！
    <br>
    <br>
    这个介绍性的页面会告诉你，你可以用自动机来做什么。 各项功能的具体细节，详见“游戏帮助”或该功能对应的页面（如适用）。
    <br>
    <br>
    <b>脚本语言：</b>自动机使用独特的脚本语言，输入对应的指令，来执行某些游戏内的操作。点击
    <div
      class="fas fa-list c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 查看可用的指令列表。你还可以点击
    <div
      class="fas fa-book c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 进入常量页面，在常量页面中定义常量的名称和值，便于编写脚本。
    <br>
    <br>
    <b>布局：</b> 自动机分为两个部分：左边包含你的脚本，和控制脚本运行的启动、停止、和重复运行脚本的按钮，右边包含与自动机相关的信息。
    点击点击右上角
    <div
      class="fas fa-expand-arrows-alt c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 将展开自动机界面至全屏，占据整个浏览器页面以便更轻松地编辑。
    <br>
    <br>
    <b>编辑器模式：</b>编写自动机脚本可使用两种编辑器：积木块编辑器（默认）和文本编辑器。通过左侧区域右上角的切换按钮可在两种编辑器间转换。注意：存在错误的脚本可能在转换时出现异常，导致部分脚本内容丢失。
    <br>
    <br>
    <b>切换脚本：</b>你可以在第二行按钮的“当前脚本”下拉列表中，在多个脚本之间进行切换，或新建脚本。点击
    <div
      class="fas fa-edit c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 和
    <div
      class="fas fa-trash c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 按钮可重命名或删除正在显示的脚本。自动机将保留至少一个脚本，以便编辑。删除最后一个脚本后，自动机将自动创建一个空白脚本。
    <br>
    <br>
    <b>编写脚本：</b>积木块编辑器中的脚本需通过访问积木块标签页
      <div class="fas fa-cubes c-automator-button-icon" data-v-automator-docs-intro-page />
      创建，而文本编辑器中的脚本则通过在左侧文本框输入内容创建。两种编辑模式下均可使用模板生成器
      <div class="fas fa-file-code c-automator-button-icon" data-v-automator-docs-intro-page />  
      提供的小型预设脚本。可使用
      <div class="fas fa-arrow-rotate-left c-automator-button-icon" data-v-automator-docs-intro-page /> 或
      <div class="fas fa-arrow-rotate-right c-automator-button-icon" data-v-automator-docs-intro-page />  
      （或对应快捷键）执行有限次数的撤销/重做操作。
      切换编辑器模式、转换脚本格式或删除脚本时，编辑历史将被清空。
    <br>
    <br>
    <b>调试：</b>调试脚本的两个主要工具是错误列表
    <div
      class="fas fa-exclamation-triangle c-automator-button-icon"
      data-v-automator-docs-intro-page
    />以修复导致脚本无法运行的错误。指令事件日志
    <div
      class="fas fa-eye c-automator-button-icon"
      data-v-automator-docs-intro-page
    />用于确定脚本是否按你的预期运行。
    <br>
    <br>
    <b>导入/导出：</b>你可以使用
    <div
      class="fas fa-file-export c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 和
    <div
      class="fas fa-file-import c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 按钮来导出和导入自动机脚本，若有需要，你可以点击
    <div
      class="fas fa-window-restore c-automator-button-icon"
      data-v-automator-docs-intro-page
    /> 按钮来导出该脚本对应的额外数据（如常量的值和时间研究预设）。
    <br>
    <br>
    <b>保存脚本：</b>每次编辑后，脚本的改动都会立即保存。此外还有两个字符限制以降低游戏卡顿，这两个字符限制在自动机页面的最上方显示。
  </div>
</template>

<style scoped>
.c-automator-button-icon {
  padding: 0.3rem 0.8rem;
  width: 3.3rem;
  border: var(--var-border-width, 0.2rem) solid var(--color-automator-controls-border);
  border-radius: var(--var-border-radius, 0.3rem);
  color: var(--color-automator-docs-font);
  background-color: var(--color-automator-controls-inactive);
}
</style>
