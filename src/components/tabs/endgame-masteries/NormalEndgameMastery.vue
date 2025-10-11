<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import HintText from "@/components/HintText";
import EndgameMasteryButton from "./EndgameMasteryButton";

export default {
  name: "NormalEndgameMastery",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    HintText,
    EndgameMasteryButton
  },
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showCost: true
  }),
  computed: {
    mastery() {
      return this.setup.mastery;
    },
    hintText() {
      const id = this.mastery.id;
      if (!this.setup.path) return id;
      const pathEntry = EndgameMasteries.pathList.find(p => p.path === this.setup.path);
      return `${id} ${pathEntry.name}`;
    },
  }
};
</script>

<template>
  <EndgameMasteryButton
    :setup="setup"
    :show-cost="showCost"
  >
    <HintText
      type="masteries"
      class="l-hint-text--endgame-mastery"
    >
      {{ hintText }}
    </HintText>
    <span>
      <DescriptionDisplay
        :config="mastery.config"
      />
      <EffectDisplay
        br
        :config="mastery.config"
      />
    </span>
  </EndgameMasteryButton>
</template>

<style scoped>

</style>
