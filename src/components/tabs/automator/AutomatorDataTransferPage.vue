<script>
import AutomatorDataTransferSingleEntry from "./AutomatorDataTransferSingleEntry";

export default {
  name: "AutomatorDataTransferPage",
  components: {
    AutomatorDataTransferSingleEntry,
  },
  data() {
    return {
      scripts: 0,
    };
  },
  computed: {
    maxScriptCount: () => AutomatorData.MAX_ALLOWED_SCRIPT_COUNT,
  },
  created() {
    this.loadScripts();
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => {
      this.loadScripts();
    });
  },
  methods: {
    loadScripts() {
      this.scripts = Object.values(player.reality.automator.scripts).map(script => ({
        id: script.id,
        name: script.name,
      }));
    },
  }
};
</script>

<template>
  <div class="l-panel-padding">
    此页面允许您导出附加了额外数据的脚本；编码文本还将包含脚本中使用的时间研究预设或常量的数据。这将使您更容易地在不同的存档文件之间传输正在运行的脚本，但由于研究预设和常量的空间有限，您可能须在此过程中覆盖现有数据。从此页面导出的数据也以与导入单个脚本数据相同的方式导入。
    <br>
    <br>
    注意：注释中任何提及常量名称或完整研究购买命令的内容也将被视为在脚本中“使用”。这是有意为之，因为假定注释表明脚本本身试图使用预设或常量进行操作。
    <br>
    <br>
    <div
      v-for="(script, id) in scripts"
      :key="id"
    >
      <AutomatorDataTransferSingleEntry
        class="l-entry-margin"
        :script="script"
      />
    </div>
  </div>
</template>

<style scoped>
.l-panel-padding {
  padding: 0.5rem 2rem 1rem 0;
}

.l-entry-margin {
  margin-bottom: 1rem;
}

.c-import-button {
  margin: 1rem 1rem -1rem;
  border-radius: var(--var-border-radius, 0.4rem);
  border-width: var(--var-border-width, 0.2rem);
  cursor: pointer;
}
</style>
