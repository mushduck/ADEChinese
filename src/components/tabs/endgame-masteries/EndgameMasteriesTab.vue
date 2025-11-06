<script>
import { MASTERY_TREE_LAYOUT_TYPE, EndgameMasteryTreeLayout } from "./endgame-mastery-tree-layout";

import PermanentEndgameMastery from "./PermanentEndgameMastery";
import NormalEndgameMastery from "./NormalEndgameMastery";
import PrimaryButton from "@/components/PrimaryButton";
import EndgameMasteryConnection from "./EndgameMasteryConnection";

export default {
  name: "EndgameMasteryTab",
  components: {
    PrimaryButton,
    NormalEndgameMastery,
    PermanentEndgameMastery,
    EndgameMasteryConnection
  },
  data() {
    return {
      respec: player.endgame.respec,
      layoutType: MASTERY_TREE_LAYOUT_TYPE.NORMAL,
      renderedMasteryCount: 0,
      renderedConnectionCount: 0,
    };
  },
  computed: {
    layout() {
      return EndgameMasteryTreeLayout.create(this.layoutType);
    },
    allMasteries() {
      return this.layout.masteries;
    },
    masteries() {
      return this.allMasteries.slice(0, this.renderedMasteryCount);
    },
    allConnections() {
      return this.layout.connections;
    },
    connections() {
      return this.allConnections.slice(0, this.renderedConnectionCount);
    },
    treeStyleObject() {
      return {
        width: `${this.layout.width}rem`,
        height: `${this.layout.height}rem`
      };
    },
    respecClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--endgame-respec-active": this.respec
      };
    }
  },
  watch: {
    respec(newValue) {
      player.endgame.respec = newValue;
    },
  },
  created() {
    const incrementRenderedCount = () => {
      let shouldRequestNextFrame = false;
      if (this.renderedMasteryCount < this.allMasteries.length) {
        this.renderedMasteryCount += 2;
        shouldRequestNextFrame = true;
      }
      if (this.renderedConnectionCount < this.allConnections.length) {
        this.renderedConnectionCount += 2;
        shouldRequestNextFrame = true;
      }
      if (shouldRequestNextFrame) {
        this.renderAnimationId = requestAnimationFrame(incrementRenderedCount);
      }
    };
    incrementRenderedCount();

    // Scroll to top because endgame masteries tab is rendered progressively
    // and we don't want the player to see empty space while it's loading.
    document.body.scrollTop = 0;
  },
  beforeDestroy() {
    cancelAnimationFrame(this.renderAnimationId);
  },
  methods: {
    update() {
      this.respec = player.endgame.respec;
      this.layoutType = MASTERY_TREE_LAYOUT_TYPE.current;
    },
    masteryComponent(mastery) {
      switch (mastery.type) {
        case ENDGAME_MASTERY_TYPE.NORMAL: return NormalEndgameMastery;
        case ENDGAME_MASTERY_TYPE.PERMANENT: return PermanentEndgameMastery;
      }
      throw "Unknown Endgame Mastery type";
    },
    exportMasteryTree() {
      if (player.endgameMasteries.masteries.length === 0) {
        GameUI.notify.error("You cannot export an empty Endgame Mastery Tree!");
      } else {
        copyToClipboard(GameCache.currentMasteryTree.value.exportString);
        GameUI.notify.info("Exported current Endgame Masteries to your clipboard");
      }
    }
  }
};
</script>

<template>
  <div class="l-endgame-masteries-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="exportMasteryTree"
      >
        Export tree
      </PrimaryButton>
      <PrimaryButton
        :class="respecClassObject"
        @click="respec = !respec"
      >
        Respec Endgame Masteries on next Endgame
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        onclick="Modal.masteryString.show({ id: -1 })"
      >
        Import tree
      </PrimaryButton>
    </div>
    <div
      class="l-endgame-mastery-tree l-endgame-masteries-tab__tree"
      :style="treeStyleObject"
    >
      <component
        :is="masteryComponent(setup.mastery)"
        v-for="(setup) in masteries"
        :key="setup.mastery.type.toString() + setup.mastery.id.toString()"
        :setup="setup"
      />
      <svg
        :style="treeStyleObject"
        class="l-endgame-mastery-connection"
      >
        <EndgameMasteryConnection
          v-for="(setup, index) in connections"
          :key="'connection' + index"
          :setup="setup"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>

</style>
