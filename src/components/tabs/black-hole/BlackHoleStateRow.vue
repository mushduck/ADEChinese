<script>
export default {
  name: "BlackHoleStateRow",
  props: {
    blackHole: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isPermanent: false,
      isActive: false,
      isCharged: false,
      nextChange: "",
      state: "",
    };
  },
  computed: {
    description() {
      return this.blackHole.description(true);
    },
    id() {
      return this.blackHole.id;
    }
  },
  methods: {
    update() {
      const { blackHole } = this;
      this.isUnlocked = blackHole.isUnlocked;
      if (!this.isUnlocked) return;
      this.isPermanent = blackHole.isPermanent;
      this.isActive = blackHole.isActive;
      this.isCharged = blackHole.isCharged;
      this.nextChange = TimeSpan.fromSeconds(new Decimal(blackHole.timeWithPreviousActiveToNextStateChange)).toStringShort();
      this.state = blackHole.displayState;
    }
  }
};
</script>

<template>  
  <h3 v-if="isUnlocked">
    {{ description }} 状态:
    <template v-if="isPermanent">
      永久启动
    </template>
    <template v-else-if="isActive">
      启动（剩余 {{ nextChange }}）
    </template>
    <template v-else-if="id === 2 && isCharged">
      预位（与黑洞 1 共同启动，启动时间剩余 {{ nextChange }}）
    </template>
    <template v-else>
      冷却中（{{ nextChange }} 后启动）
    </template>
  </h3>
</template>

<style scoped>

</style>
