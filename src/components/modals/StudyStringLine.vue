<script>
export default {
  name: "StudyStringLine",
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
      return this.intoEmpty ? "空的时间研究树" : "当前时间研究树";
    }
  },
  methods: {
    formatTheoremCost(tt, st) {
      const strTT = `${formatWithCommas(tt)} 时间之理`;
      const strST = `${formatWithCommas(st)} 空间之理`;
      return st === 0 ? strTT : `${strTT} + ${strST}`;
    }
  },
};
</script>

<template>
  <div class="l-modal-import-tree__tree-info-line">
    <div v-if="tree.timeTheorems === 0 && tree.spaceTheorems === 0">
      <i>导入{{ importDestString }}后将不会购买新的时间研究。</i>
    </div>
    <div v-else>
      导入后购买如下时间研究以覆盖{{ importDestString }}:
      <br>
      {{ tree.newStudies }}
    （价格：{{ formatTheoremCost(tree.timeTheorems, tree.spaceTheorems) }}）
    </div>
    <br>
  </div>
</template>
