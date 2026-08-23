<script>
export default {
  name: "PhoneSubtabButton",
  props: {
    subtab: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasNotification: false
    };
  },
  computed: {
    // Mirror ModernTabButton's subtab active logic.
    isCurrentSubtab() {
      return this.subtab.isOpen && Theme.currentName() !== "S9";
    }
  },
  methods: {
    update() {
      this.hasNotification = this.subtab.hasNotification;
    }
  },
};
</script>

<template>
  <div
    class="o-phone-subtab-btn"
    :class="{ 'o-phone-subtab-btn--active': isCurrentSubtab }"
    @click="subtab.show(true)"
  >
    <span class="o-phone-subtab-btn__name">{{ subtab.name }}</span>
    <div
      v-if="hasNotification"
      class="fas fa-circle-exclamation l-notification-icon"
    />
  </div>
</template>

<style scoped>
.o-phone-subtab-btn {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 0;
  border-right: 0.1rem solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
  padding: 0.2rem;
  transition: background-color 0.15s;
  min-width: 0;
}

.o-phone-subtab-btn:last-child {
  border-right: none;
}

.o-phone-subtab-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.o-phone-subtab-btn--active {
  background-color: rgba(255, 255, 255, 0.18);
}

.o-phone-subtab-btn--active::after {
  content: "";
  width: 100%;
  height: 0.3rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-accent);
}

.o-phone-subtab-btn__name {
  pointer-events: none;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.1;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
  max-height: 100%;
}
</style>
