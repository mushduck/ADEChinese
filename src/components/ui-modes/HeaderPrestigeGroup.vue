<script>
import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer";
import HeaderEternityContainer from "./prestige-header/HeaderEternityContainer";
import HeaderInfinityContainer from "./prestige-header/HeaderInfinityContainer";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer,
    HeaderEternityContainer,
    HeaderInfinityContainer,
  },
  data() {
    return {
      isDestroyed: false,
      isDivine: false
    };
  },
  methods: {
    update() {
      this.isDestroyed = Alpha.isDestroyedForDisplay;
      this.isDivine = DivinityMilestone.divineDimensions.isReached;
    },
    classObject() {
      return {
        "c-prestige-info-blocks": true,
        "c-prestige-info-blocks--tall": this.isDestroyed && !this.isDivine,
        "c-prestige-info-blocks--taller": this.isDivine
      };
    }
  }
};
</script>

<template>
  <div :class="classObject()">
    <HeaderEternityContainer class="l-game-header__eternity" />
    <HeaderCenterContainer class="l-game-header__center" />
    <HeaderInfinityContainer class="l-game-header__infinity" />
  </div>
</template>

<style scoped>
.c-prestige-info-blocks {
  display: flex;
  flex-direction: row;
  height: 14rem;
  width: 100%;
  color: var(--color-text);
}

.c-prestige-info-blocks--tall {
  height: 24rem;
}

.c-prestige-info-blocks--taller {
  height: 28rem;
}

.l-game-header__eternity {
  position: absolute;
  left: calc(25% - 22rem);
  width: 22rem;
}

.l-game-header__center {
  position: absolute;
  right: calc(50% - 25rem);
  width: 50rem;
}

.l-game-header__infinity {
  position: absolute;
  right: calc(25% - 22rem);
  width: 22rem;
}
</style>
