<script>
export default {
  name: "PhoneTabButton",
  props: {
    tab: {
      type: Object,
      required: true
    },
    tabPosition: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      isHidden: false,
      hasNotification: false,
      tabName: ""
    };
  },
  computed: {
    // Mirror ModernTabButton's visibility/unlock logic by reading the same TabState object.
    classObject() {
      return {
        "o-phone-tab-btn": true,
        "o-phone-tab-btn--active": this.isCurrentTab && Theme.currentName() !== "S9"
      };
    },
    isCurrentTab() {
      return this.tab.isOpen;
    },
    // Each tab uses the first character of the original tab name.
    firstLetter() {
      return this.tabName.charAt(0);
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.isHidden = this.tab.isHidden;
      this.hasNotification = this.tab.hasNotification;

      if (this.tabPosition < Pelle.endTabNames.length) {
        const stage = Math.clamp(GameEnd.endState - (this.tab.id % 4) / 10, 0, 1);
        this.tabName = Pelle.transitionText(
          this.tab.name,
          Pelle.endTabNames[this.tabPosition],
          stage
        );
      } else {
        this.tabName = this.tab.name;
      }
    },
  },
};
</script>

<template>
  <div
    v-if="!isHidden && isAvailable"
    :class="[classObject, tab.config.UIClass]"
    @click="tab.show(true)"
  >
    <span
      class="o-phone-tab-btn__letter"
      v-html="firstLetter"
    />
    <div
      v-if="hasNotification"
      class="fas fa-circle-exclamation l-notification-icon"
    />
    <div class="o-phone-tab-btn__tooltip">
      {{ tabName }}
    </div>
  </div>
</template>

<style scoped>
.o-phone-tab-btn {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 1.6rem;
  cursor: pointer;
  border-radius: 0;
  border-width: 0.1rem;
  /* Line separator between different tabs (wire split). */
  border-right: 0.1rem solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  transition: background-color 0.15s, transform 0.15s;
  user-select: none;
  text-align: center;
  overflow: hidden;
  min-width: 0;
}

.o-phone-tab-btn:last-child {
  border-right: none;
}

.o-phone-tab-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.o-phone-tab-btn--active {
  background-color: rgba(255, 255, 255, 0.18);
}

.o-phone-tab-btn--active::after {
  content: "";
  width: 100%;
  height: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-accent);
}

.o-phone-tab-btn--infinity.o-phone-tab-btn--active::after {
  background-color: var(--color-infinity);
}

.o-phone-tab-btn--eternity.o-phone-tab-btn--active::after {
  background-color: var(--color-eternity);
}

.o-phone-tab-btn--reality.o-phone-tab-btn--active::after {
  background-color: var(--color-reality);
}

.o-phone-tab-btn--celestial.o-phone-tab-btn--active::after {
  background-color: var(--color-celestials);
}

.o-phone-tab-btn--endgame.o-phone-tab-btn--active::after {
  background-color: var(--color-endgame);
}

.o-phone-tab-btn--cd-expansion.o-phone-tab-btn--active::after {
  background: linear-gradient(var(--color-infinity), var(--color-eternity),
    var(--color-reality), var(--color-celestials));
}

.o-phone-tab-btn--divinity.o-phone-tab-btn--active::after {
  background-color: var(--color-pelle--base);
}

.o-phone-tab-btn__letter {
  pointer-events: none;
  line-height: 1;
}

.o-phone-tab-btn__tooltip {
  position: absolute;
  bottom: calc(100% + 0.4rem);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 10;
}

.o-phone-tab-btn:hover .o-phone-tab-btn__tooltip {
  opacity: 1;
}
</style>
