<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerDropdownEntry from "./AutobuyerDropdownEntry";
import AutobuyerInput from "./AutobuyerInput";
import ExpandingControlBox from "@/components/ExpandingControlBox";

export default {
  name: "EndgameAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerInput,
    ExpandingControlBox,
    AutobuyerDropdownEntry
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      mode: AUTO_ENDGAME_MODE.AMOUNTCP,
      hasAdditionalModes: false,
      increaseWithMult: true,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.endgame,
    modes: () => [
      AUTO_ENDGAME_MODE.AMOUNTCP,
      AUTO_ENDGAME_MODE.AMOUNTDP,
      AUTO_ENDGAME_MODE.TIME,
      AUTO_ENDGAME_MODE.X_HIGHEST_CP,      
      AUTO_ENDGAME_MODE.X_HIGHEST_DP,
    ],
    amountMode: () => AUTO_ENDGAME_MODE.AMOUNTCP,
    amountMode2: () => AUTO_ENDGAME_MODE.AMOUNTDP
  },
  watch: {
    increaseWithMult(newValue) {
      this.autobuyer.increaseWithMult = newValue;
    }
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
      this.hasAdditionalModes = this.autobuyer.hasAdditionalModes;
      this.increaseWithMult = this.autobuyer.increaseWithMult;
    },
    modeProps(mode) {
      switch (mode) {
        case AUTO_ENDGAME_MODE.AMOUNTCP: return {
          title: "Endgame at X CP",
          input: {
            property: "amount",
            type: "decimal"
          },
        };
        case AUTO_ENDGAME_MODE.AMOUNTDP: return {
          title: "Endgame at X DP",
          input: {
            property: "amount",
            type: "decimal"
          },
        };
        case AUTO_ENDGAME_MODE.TIME: return {
          title: "Seconds between Endgames",
          input: {
            property: "time",
            type: "float"
          },
        };
        case AUTO_ENDGAME_MODE.X_HIGHEST_CP: return {
          title: "X times highest CP",
          input: {
            property: "xHighest",
            type: "decimal"
          },
        };
        case AUTO_ENDGAME_MODE.X_HIGHEST_DP: return {
          title: "X times highest DP",
          input: {
            property: "xHighest",
            type: "decimal"
          },
        };
      }
      throw new Error("Unknown Auto Endgame mode");
    },
    modeName(mode) {
      return this.modeProps(mode).title;
    },
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    name="Automatic Endgame"
  >
    <template #intervalSlot>
      <ExpandingControlBox
        v-if="hasAdditionalModes"
        :auto-close="true"
      >
        <template #header>
          <div class="o-primary-btn c-autobuyer-box__mode-select c-autobuyer-box__mode-select-header">
            ▼ Current Setting: ▼
            <br>
            {{ modeName(mode) }}
          </div>
        </template>
        <template #dropdown>
          <AutobuyerDropdownEntry
            :autobuyer="autobuyer"
            :modes="modes"
            :mode-name-fn="modeName"
          />
        </template>
      </ExpandingControlBox>
      <span v-else>{{ modeProps(mode).title }}:</span>
    </template>
    <template #toggleSlot>
      <AutobuyerInput
        :key="mode"
        :autobuyer="autobuyer"
        v-bind="modeProps(mode).input"
      />
    </template>
    <template
      v-if="mode === amountMode || mode === amountMode2"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox o-clickable"
      >
        <input
          v-model="increaseWithMult"
          type="checkbox"
          class="o-clickable"
        >
        Dynamic amount
      </label>
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}
</style>
