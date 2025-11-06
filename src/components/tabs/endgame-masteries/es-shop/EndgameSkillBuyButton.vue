<script>
export default {
  props: {
    budget: Decimal,
    cost: Decimal,
    formatCost: {
      type: Function,
      required: true,
    },
    action: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      isLocked: false
    };
  },
  computed: {
    isEnabled() {
      if (this.isLocked) return false;
      return this.budget.gte(this.cost);
    },
    enabledClass() {
      if (!this.isEnabled || this.isLocked) return "c-es-buy-button--locked";

      return "c-es-buy-button--unlocked";
    }
  },
  methods: {
    update() {
      this.isLocked = player.endgames <= 0;
    }
  }
};
</script>

<template>
  <button
    class="l-es-buy-button c-es-buy-button"
    :class="enabledClass"
    @click="action"
  >
    {{ isLocked ? "Requires an Endgame to unlock" : formatCost(cost) }}
  </button>
</template>
