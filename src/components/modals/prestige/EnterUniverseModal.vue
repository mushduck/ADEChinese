<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterUniverseModal",
  components: {
    ModalWrapperChoice,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    topLabel() {
      return `${this.name}宇宙`;
    },
    message() {
      return `你将进行一次终局并进入${this.name}宇宙。`;
    },
    description() {
      switch (this.number) {
        case 1:
          return `在流幻宇宙中，禁用计数频率与时间维度；游戏速度固定为 ${format(0.001, 3, 3)}；超光速粒子与膨胀时间的指数${formatPow(0.1, 1, 1)}；反物质产量 ↑↑ ${format(0.9, 1, 1)}；反物质维度和无限维度的指数${formatPow(0.1, 1, 1)}，该减益可被相对粒子降低。基于在流幻宇宙内达到的反物质和经过的时间获得相对粒子。`;
        case 2:
          return `Inside the Tangible Universe, Antimatter Dimensions are translated into Matter Dimensions.
          All other Dimension types are disabled. Lai’tela as a whole is disabled. Game Speed is fixed
          at ${format(0.001, 3, 3)}. The tetration of Matter is halved then increased by ${formatInt(1)}.
          Matter generates Molecular Mass based on time spent inside this Universe, and Molecular Mass adds to
          the final tetration of Matter gain.`;
        case 3:
          return ``;
        case 4:
          return ``;
        case 5:
          return ``;
        case 6:
          return ``;
        case 7:
          return ``;
        case 8:
          return ``;
        default: throw new Error(`Attempted to start an Unknown Universe in Universe Modal Confirmation.`);
      }
    },
    reward() {
      switch (this.number) {
        case 1:
          return `离开流幻宇宙时，将基于达到的最高反物质获得耀界浮光。耀界浮光将提高被毁灭的现实内的星系产量和被毁灭的现实外超光速粒子与膨胀时间的获取量。`;
        case 2:
          return `Existing the Tangible Universe will give Stellar Augmenters based on highest Matter reached,
          which boosts the strength of Gray Stars.`;
        case 3:
          return ``;
        case 4:
          return ``;
        case 5:
          return ``;
        case 6:
          return ``;
        case 7:
          return ``;
        case 8:
          return ``;
        default: throw new Error(`Could not find Universe reward in Universe Modal Confirmation.`);
      }
    },
    highestAntimatter() {
      switch (this.number) {
        case 1:
          return player.universes.highestTransientAntimatter;
        case 2:
          return player.universes.highestTangibleMatter;
        case 3:
          return new Decimal();
        case 4:
          return new Decimal();
        case 5:
          return new Decimal();
        case 6:
          return new Decimal();
        case 7:
          return new Decimal();
        case 8:
          return new Decimal();
        default: throw new Error(`Could not find highest Antimatter in Universe Modal Confirmation.`);
      }
    }
  },
  methods: {
    handleYesClick() {
      enterUniverse(this.number);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div>
      {{ message }}
      <br>
      <br>
      <div
        v-if="description"
        class="universe-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ reward }}
      </div>
      <br>
      <div>
        达到 {{ format(highestAntimatter, 2, 1) }} 反物质以获得{{ name }}宇宙的奖励。
      </div>
    </div>
    <template #confirm-text>
      开始
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.universe-description {
  padding: 0 2rem;
}
</style>
