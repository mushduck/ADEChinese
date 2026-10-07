<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ImportTimeStudyConstants",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      constantNames: [],
      willImport: [],
    };
  },
  computed: {
    presets: () => player.timestudy.presets.filter(p => p.studies !== ""),
    names() {
      // Study presets can contain non-alphanumeric characters, which aren't allowed in constants,
      // so we replace all of those with underscores. This alone can however result in duplicate names due
      // to multiple different characters being mapped to underscores, so we also include the preset index
      return this.presets.map((p, index) => `TSPreset${index + 1}__${p.name.replaceAll(/[^a-zA-Z_0-9]/gu, "_")}`);
    }
  },
  methods: {
    update() {
      this.constantNames = [...player.reality.automator.constantSortOrder];
      this.updateImportStatus();
    },
    importConstants() {
      for (let index = 0; index < this.presets.length; index++) {
        AutomatorBackend.modifyConstant(this.names[index], this.presets[index].studies);
      }
    },
    hasConflict(constantName) {
      return this.constantNames.includes(constantName);
    },
    updateImportStatus() {
      let availableSlots = AutomatorData.MAX_ALLOWED_CONSTANT_COUNT - this.constantNames.length;
      this.willImport = [];
      for (let index = 0; index < this.names.length; index++) {
        if (this.hasConflict(this.names[index])) {
          this.willImport.push(true);
        } else if (availableSlots > 0) {
          this.willImport.push(true);
          availableSlots--;
        } else this.willImport.push(false);
      }
    },
    missedImports() {
      return this.willImport.countWhere(x => !x);
    },
    // Shorten the string to less than 55 characters for UI purposes - but we shorten the middle since the
    // beginning and end are both potentially useful to see
    shortenString(str) {
      if (str.length < 55) return str;
      return `${str.substring(0, 12)}...${str.substring(str.length - 40, str.length)}`;
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="importConstants"
  >
    <template #header>
      Importing Time Study Presets as Constants
    </template>
    <div class="c-modal-message__text">
      确认此对话框将导入所有已保存的时间研究预设作为新的自动化常量。以下是所有将被导入的有效预设，显示了其包含研究的开始和结束。有些名称可能会因常量命名格式的限制而更改。
      <br>
      <br>
      <div
        v-for="i in presets.length"
        :key="i"
        :class="{ 'l-not-imported' : !willImport[i-1] }"
      >
        名称：{{ presets[i-1].name }} ➜ <b>{{ names[i-1] }}</b>
        <br>
        {{ shortenString(presets[i-1].studies) }}
        <span
          v-if="hasConflict(names[i-1])"
          class="l-warn-text"
        >
          <br>
          这将覆盖一个已存在的常量的值！
        </span>
        <br>
        <br>
      </div>
      <div
        v-if="missedImports() > 0"
        class="l-warn-text"
      >
        由于常量的数量限制，无法导入该列表中的 {{ quantify("preset", missedImports()) }} 个常量。
      </div>
    </div>
    <template #confirm-text>
      全部导入
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.l-warn-text {
  font-weight: bold;
  color: var(--color-bad);
}

.l-not-imported {
  color: var(--color-disabled);
}
</style>
