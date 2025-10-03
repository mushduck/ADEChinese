<script>
import PseudoEndgameMasteryButton from "./PseudoEndgameMasteryButton";
import PseudoEndgameMasteryConnection from "./PseudoEndgameMasteryConnection";

import { MASTERY_TREE_LAYOUT_TYPE, EndgameMasteryTreeLayout } from "@/components/tabs/endgame-masteries/endgame-mastery-tree-layout";

export const ForceBoughtState = {
  notBought: 0,
  unspecified: 1,
  bought: 2,

  getState(forceState, currentState) {
    switch (forceState) {
      case this.notBought:
        return false;
      case this.unspecified:
        return currentState;
      case this.bought:
        return true;
    }
    return currentState;
  }
};

export default {
  name: "EndgameMasteriesTab",
  components: {
    PseudoEndgameMasteryButton,
    PseudoEndgameMasteryConnection,
  },
  props: {
    disregardCurrentMasteries: {
      type: Boolean,
      default: false
    },
    newMasteries: {
      required: true,
      validator: newMasteries => Array.isArray(newMasteries) || newMasteries === undefined,
    },
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      layoutType: MASTERY_TREE_LAYOUT_TYPE.NORMAL,
      renderedMasteryCount: 0,
      delayTimer: 0,
    };
  },
  computed: {
    layout() {
      return EndgameMasteryTreeLayout.create(this.layoutType, 0.15);
    },
    masteries() {
      return this.layout.masteries;
    },
    connections() {
      return this.layout.connections;
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
        "o-primary-btn--respec-active": this.respec
      };
    }
  },
  methods: {
    update() {
      this.layoutType = MASTERY_TREE_LAYOUT_TYPE.current;
    },
    masteryComponent(mastery) {
      switch (mastery.type) {
        case ENDGAME_MASTERY_TYPE.NORMAL: return NormalEndgameMastery;
        case ENDGAME_MASTERY_TYPE.PERMANENT: return PermanentEndgameMastery;
      }
      throw "Unknown Endgame Mastery type";
    },
    masteryString(mastery) {
      switch (mastery.type) {
        case ENDGAME_MASTERY_TYPE.NORMAL: return `${mastery.id}`;
      }
      return "Permanent Mastery";
    },
    getMasteryForceBoughtState(masteryStr) {
      if (!this.disregardCurrentMasteries) return ForceBoughtState.unspecified;
      return this.newMasteries.includes(masteryStr) ? ForceBoughtState.bought : ForceBoughtState.notBought;
    },
    getConnectionForceBoughtState(setup) {
      if (!this.disregardCurrentMasteries) return ForceBoughtState.unspecified;
      return (this.newMasteries.includes(this.masteryString(setup.connection.to)) &&
        this.newMasteries.includes(this.masteryString(setup.connection.from)))
        ? ForceBoughtState.bought
        : ForceBoughtState.notBought;
    }
  }
};
</script>

<template>
  <div class="l-mastery-string-preview__tree--wrapper">
    <div
      v-if="showPreview"
      class="l-endgame-mastery-tree l-mastery-string-preview__tree"
      :style="treeStyleObject"
    >
      <PseudoEndgameMasteryButton
        v-for="setup in masteries"
        :key="setup.mastery.type.toString() + setup.mastery.id.toString()"
        :setup="setup"
        :force-is-bought="getMasteryForceBoughtState(masteryString(setup.mastery))"
        :is-new-from-import="!disregardCurrentMasteries && newMasteries.includes(masteryString(setup.mastery))"
      />
      <svg
        :style="treeStyleObject"
        class="l-endgame-mastery-connection"
      >
        <PseudoEndgameMasteryConnection
          v-for="(setup, index) in connections"
          :key="'connection' + index"
          :force-is-bought="getConnectionForceBoughtState(setup)"
          :setup="setup"
        />
      </svg>
    </div>
    <span
      v-else
      class="c-unavailable-warning"
    >
      Preview Unavailable
    </span>
  </div>
</template>

<style scoped>
.l-mastery-string-preview__tree--wrapper {
  display: flex;
  overflow-y: auto;
  width: 20rem;
  height: 44.5rem;
  position: relative;
  justify-content: center;
  border: var(--color-text) solid var(--var-border-width, 0.3rem);
  border-radius: var(--var-border-radius, 0.3rem);
  margin: auto;
  padding: 0.5rem;
}

.c-unavailable-warning {
  align-self: center;
}
</style>
