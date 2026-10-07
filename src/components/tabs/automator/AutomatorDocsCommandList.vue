<script>
import AutomatorDocsManPage from "./AutomatorDocsManPage";

export default {
  name: "AutomatorDocsCommandList",
  components: {
    AutomatorDocsManPage
  },
  data() {
    return {
      selectedCommand: -1,
    };
  },
  computed: {
    categoryNames: () => GameDatabase.reality.automator.categoryNames,
    commands: () => GameDatabase.reality.automator.commands,
  },
  methods: {
    commandsInCategory(category) {
      return this.commands.filter(c => c.category === category && c.isUnlocked());
    }
  }
};
</script>

<template>
  <div>
    <div v-if="selectedCommand !== -1">
      <button
        class="c-automator-docs--button l-return-button fas fa-arrow-left"
        @click="selectedCommand = -1"
      />
      返回到指令列表
    </div>
    <AutomatorDocsManPage
      v-if="selectedCommand !== -1"
      :command="commands[selectedCommand]"
    />
    <div
      v-else
      class="c-automator-docs-page"
    >
      点击带下划线的指令可以查看更多关于语法、用途和功能的详细信息。
      <br>
      <br>
      <span>指令列表</span>
      <br>
      <div
        v-for="(category, i) in categoryNames"
        :key="i"
      >
        {{ category }}（{{ commandsInCategory(i).length }} 条指令）
        <div
          v-for="command in commandsInCategory(i)"
          :key="command.id"
          class="c-automator-docs-page__link l-command-group"
          @click="selectedCommand = command.id"
        >
          <span v-if="command.isUnlocked()">
            {{ command.keyword }}
          </span>
        </div>
      </div>
      <br>
      <span>
        注意：每个指令的语法说明中，<u>带下划线</u>的参数为<i>必填</i>参数，必须填写；方括号[]内的参数为可选参数（使用时需<i>省略</i>方括号）。其余部分应按原样输入。除非特别说明，所有参数均不区分大小写。部分指令可能有多种有效格式，将分行显示。
      </span>
    </div>
  </div>
</template>

<style scoped>
.l-command-group {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}

.l-return-button {
  width: 4rem;
  height: 2.6rem;
  font-size: 1.8rem;
  margin-left: 2rem;
}
</style>
