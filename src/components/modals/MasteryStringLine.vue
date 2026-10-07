<script>
export default {
  name: "MasteryStringLine",
  props: {
    tree: {
      type: Object,
      required: true,
    },
    intoEmpty: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    importDestString() {
      return this.intoEmpty ? "空的终局专精树" : "当前终局专精树";
    }
  },
  methods: {
    formatSkillCost(es) {
      const strES = `${formatWithCommas(es)} 终局能力`;
      return strES;
    }
  },
};
</script>

<template>
  <div class="l-modal-import-tree__tree-info-line">
    <div v-if="tree.endgameSkills === 0">
      <i>导入{{ importDestString }}将不会购买新的终局专精。</i>
    </div>
    <div v-else>
      导入后购买如下终局专精以覆盖{{ importDestString }}：
      <br>
      {{ tree.newMasteries }}
      （价格：{{ formatSkillCost(tree.endgameMasteries) }}）
    </div>
    <br>
  </div>
</template>
