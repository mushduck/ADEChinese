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
      return this.intoEmpty ? "into an empty Tree" : "with your current Tree";
    }
  },
  methods: {
    formatSkillCost(es) {
      const strES = `${formatWithCommas(es)} ES`;
      return strES;
    }
  },
};
</script>

<template>
  <div class="l-modal-import-tree__tree-info-line">
    <div v-if="tree.endgameSkills === 0">
      <i>Importing this {{ importDestString }} will not purchase any new Endgame Masteries.</i>
    </div>
    <div v-else>
      Importing {{ importDestString }} will purchase:
      <br>
      {{ tree.newMasteries }}
      (Cost: {{ formatSkillCost(tree.endgameMasteries) }})
    </div>
    <br>
  </div>
</template>
