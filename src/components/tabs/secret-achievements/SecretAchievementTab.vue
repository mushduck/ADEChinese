<script>
import SecretAchievementRow from "./SecretAchievementRow";

export default {
  name: "SecretAchievementTab",
  components: {
    SecretAchievementRow
  },
  computed: {
    rows: () => SecretAchievements.allRows,
  }
};
</script>

<template>
  <div class="l-achievements-tab">
    <div class="c-achievements-tab__header">
      <span>
        隐藏成就属于可选内容，且不提供任何奖励加成。
      </span>
    </div>
    <div class="l-achievement-grid">
      <secret-achievement-row
        v-for="(row, i) in rows"
        :key="i"
        :row="row"
      />
    </div>
  </div>
</template>
