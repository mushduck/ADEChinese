<script>
import AutomatorDefineSingleEntry from "./AutomatorDefineSingleEntry";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "AutomatorDefinePage",
  components: {
    AutomatorDefineSingleEntry,
    PrimaryButton,
  },
  data() {
    return {
      constants: [],
      count: 0,
      refreshConstants: false,
    };
  },
  computed: {
    maxConstantCount() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_COUNT;
    },
    maxNameLength() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH;
    },
    maxValueLength() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH;
    },
    hasConstants() {
      return this.constants.length > 1 || this.constants[0] !== "";
    }
  },
  created() {
    // This key-swaps the container for all the constants in order to force a re-render when externally changed
    this.on$(GAME_EVENT.AUTOMATOR_CONSTANT_CHANGED, () => {
      this.refreshConstants = true;
      this.$nextTick(() => this.refreshConstants = false);
    });
  },
  methods: {
    update() {
      const existingValues = player.reality.automator.constantSortOrder;
      this.count = existingValues.length;
      this.constants = this.count < this.maxConstantCount ? [...existingValues, ""] : [...existingValues];
    },
    deleteAllConstants() {
      if (this.hasConstants) Modal.clearAutomatorConstants.show();
    },
    importPresets() {
      Modal.importTSConstants.show();
    },
  }
};
</script>

<template>
  <div class="l-panel-padding">
    你可以在此面板定义区分大小写的常量，它们可以用于代替数字或者导入时间研究的字符串。你最多能定义 {{ maxConstantCount }} 个常量。在不同的脚本中，同一个常量的值是相同的。常量名和常量值的长度限制分别为 {{ maxNameLength }} 和 {{ maxValueLength }} 字符。只有重新启动正在运行的脚本后，对常量所做的更改才会生效。
    <br>
    <br>
    举个例子，定义
    <b>first ➜ 11,21,22,31,32,33</b>
    能让你通过
    <b>studies purchase first</b>
    来购买最前三行的所有时间研究。
    <br>
    <br>
    <PrimaryButton
      v-tooltip="hasConstants ? null : '没有可删除的有效常量！'"
      class="c-delete-margin o-primary-btn--subtab-option"
      :class="{ 'o-primary-btn--disabled' : !hasConstants }"
      @click="deleteAllConstants"
    >
      删除全部常量
    </PrimaryButton>
    <br>
    <br>
    <PrimaryButton
      class="c-delete-margin o-primary-btn--subtab-option"
      @click="importPresets"
    >
      导入自动机脚本
    </PrimaryButton>
    <div
      :key="count + refreshConstants"
      class="l-definition-container"
    >
      <AutomatorDefineSingleEntry
        v-for="(constant, i) in constants"
        :key="i"
        :constant="constant"
      />
    </div>
  </div>
</template>

<style scoped>
.c-delete-margin {
  margin: 0;
}

.l-panel-padding {
  padding: 0.5rem 2rem 0 0;
}

.l-definition-container {
  display: flex;
  flex-direction: column;
  border: solid 0.1rem var(--color-automator-docs-font);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.5rem;
  margin-top: 1rem;
}
</style>
