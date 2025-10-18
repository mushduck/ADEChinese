<script>
import HoverMenu from "./HoverMenu";

export default {
  name: "EndgameMasterySaveLoadButton",
  components: {
    HoverMenu,
  },
  props: {
    saveslot: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      name: "",
      displayName: "",
      canEndgame: false
    };
  },
  computed: {
    preset() {
      return player.endgameMasteries.presets[this.saveslot - 1];
    },
  },
  methods: {
    update() {
      this.name = player.endgameMasteries.presets[this.saveslot - 1].name;
      this.displayName = this.name === "" ? this.saveslot : this.name;
      this.canEndgame = Pelle.isDoomed && Currency.antimatter.gte(new Decimal(1e9000000000000000));
    },
    nicknameBlur(event) {
      const newName = event.target.value.slice(0, 4).trim();
      if (!this.isASCII(newName)) return;

      const existingNames = player.endgameMasteries.presets.map(p => p.name);
      if (existingNames.includes(newName)) return;

      this.preset.name = newName;
      this.name = this.preset.name;
    },
    hideContextMenu() {
      this.$viewModel.currentContextMenu = null;
    },
    // This is largely done because of UI reasons - there is no Unicode specification for character width, which means
    // that arbitrary Unicode inputs can allow for massive text overflow
    isASCII(input) {
      // eslint-disable-next-line no-control-regex
      return !/[^\u0000-\u00ff]/u.test(input);
    },
    save() {
      this.hideContextMenu();
      this.preset.masteries = GameCache.currentMasteryTree.value.exportString;
      const presetName = this.name ? `Mastery preset "${this.name}"` : "Mastery preset";
      GameUI.notify.endgame(`${presetName} saved in slot ${this.saveslot}`);
    },
    load() {
      this.hideContextMenu();
      if (this.preset.masteries) {
        // We need to use a combined tree for committing to the game state, or else it won't buy masteries in the imported
        // tree are only reachable if the current tree is already bought
        const combinedTree = new EndgameMasteryTree();
        combinedTree.attemptBuyArray(EndgameMasteryTree.currentMasteries, false);
        combinedTree.attemptBuyArray(combinedTree.parseStudyImport(this.preset.masteries), true);
        EndgameMasteryTree.commitToGameState(combinedTree.purchasedMasteries, false);

        const presetName = this.name ? `Mastery preset "${this.name}"` : "Mastery preset";
        GameUI.notify.endgame(`${presetName} loaded from slot ${this.saveslot}`);
      } else {
        Modal.message.show("This Endgame Mastery list currently contains no Endgame Masteries.");
      }
    },
    respecAndLoad() {
      if (this.canEndgame) {
        player.respec = true;
        const newTree = new EndgameMasteryTree();
        newTree.attemptBuyArray(newTree.parseMasteryImport(this.preset.masteries));
        animateAndEndgame(() => EndgameMasteryTree.commitToGameState(newTree.purchasedMasteries, false));
      }
    },
    deletePreset() {
      this.hideContextMenu();
      if (this.preset.masteries) Modal.masteryString.show({ id: this.saveslot - 1, deleting: true });
      else Modal.message.show("This Endgame Mastery list currently contains no Endgame Masteries.");
    },
    handleExport() {
      this.hideContextMenu();
      copyToClipboard(this.preset.masteries);
      const presetName = this.name ? `Mastery preset "${this.name}"` : "Mastery preset";
      GameUI.notify.endgame(`${presetName} exported from slot ${this.saveslot} to your clipboard`);
    },
    edit() {
      Modal.masteryString.show({ id: this.saveslot - 1 });
    }
  },
};
</script>

<template>
  <HoverMenu class="l-es-save-load-btn__wrapper">
    <template #object>
      <button
        class="l-es-save-load-btn c-es-buy-button c-es-buy-button--unlocked"
        @click.shift.exact="save"
        @click.exact="load"
      >
        {{ displayName }}
      </button>
    </template>
    <template #menu>
      <div class="l-es-save-load-btn__menu c-es-save-load-btn__menu">
        <span ach-tooltip="Set a custom name (up to 4 ASCII characters)">
          <input
            type="text"
            size="4"
            maxlength="4"
            class="l-es-save-load-btn__menu-rename c-es-save-load-btn__menu-rename"
            :value="name"
            @keyup.esc="hideContextMenu"
            @blur="nicknameBlur"
          >
        </span>
        <div
          class="l-es-save-load-btn__menu-item c-es-save-load-btn__menu-item"
          @click="edit"
        >
          Edit
        </div>
        <div
          class="l-es-save-load-btn__menu-item c-es-save-load-btn__menu-item"
          @click="handleExport"
        >
          Export
        </div>
        <div
          class="l-es-save-load-btn__menu-item c-es-save-load-btn__menu-item"
          @click="save"
        >
          Save
        </div>
        <div class="l-es-save-load-btn__menu-item">
          <div
            class="c-es-save-load-btn__menu-item"
            @click="load"
          >
            Load
          </div>
          <div class="c-es-save-load-btn__menu-item__hover-options">
            <div
              :class="{
                'c-es-save-load-btn__menu-item__hover-option': true,
                'c-es-save-load-btn__menu-item__hover-option--disabled': !canEndgame,
              }"
              @click="respecAndLoad"
            >
              Respec and Load
            </div>
          </div>
        </div>
        <div
          class="l-es-save-load-btn__menu-item c-es-save-load-btn__menu-item"
          @click="deletePreset"
        >
          Delete
        </div>
      </div>
    </template>
  </HoverMenu>
</template>

<style scoped>
.l-es-save-load-btn__wrapper {
  position: relative;
  margin: 0.3rem;
}

.l-es-save-load-btn {
  min-width: 2rem;
}

.l-es-save-load-btn__menu {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  padding: 0.5rem 0;
  transform: translate(-50%, -100%);
}

.c-es-save-load-btn__menu {
  text-align: left;
  font-family: Typewriter;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  background: black;
  border-radius: var(--var-border-radius, 0.5rem);
}

.l-es-save-load-btn__menu::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border-color: black transparent transparent;
  border-style: solid;
  border-width: var(--var-border-width, 0.5rem);
  margin-left: -0.5rem;
}

.l-es-save-load-btn__menu-rename {
  margin: 0.3rem 0.5rem 0.5rem 0.7rem;
}

.c-es-save-load-btn__menu-rename {
  text-align: left;
  font-family: Typewriter;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: var(--var-border-radius, 0.3rem);
  padding: 0.2rem;
}

.l-es-save-load-btn__menu-item {
  position: relative;
  cursor: pointer;
}

.c-es-save-load-btn__menu-item {
  text-align: left;
  padding: 0.25rem 1rem;
}

.c-es-save-load-btn__menu-item:hover {
  color: black;
  background: white;
}

.c-es-save-load-btn__menu-item__hover-options {
  visibility: hidden;
  width: fit-content;
  position: absolute;
  top: 0;
  left: 100%;
  opacity: 0;
  color: white;
  background: black;
  border: 0.1rem solid black;
  border-radius: var(--var-border-width, 0.5rem);
  transform: translateX(0.5rem);
  transition: visibility 0.2s, opacity 0.2s;
  transition-delay: 0.5s;
  cursor: pointer;
}

.c-es-save-load-btn__menu-item__hover-option {
  white-space: nowrap;
  padding: 0.25rem 1rem;
}

.c-es-save-load-btn__menu-item__hover-options::after {
  content: "";
  position: absolute;
  /* A single menu item is 26px tall, minus 5px from the border */
  top: 0.8rem;
  right: 100%;
  border-top: 0.5rem solid transparent;
  border-right: 0.5rem solid black;
  border-bottom: 0.5rem solid transparent;
}

.c-es-save-load-btn__menu-item:hover,
.c-es-save-load-btn__menu-item__hover-option:hover {
  color: black;
  background: white;
}

.l-es-save-load-btn__menu-item:hover .c-tt-save-load-btn__menu-item__hover-options {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.c-es-save-load-btn__menu-item__hover-option--disabled {
  opacity: 0.7;
  cursor: default;
}

.c-es-save-load-btn__menu-item__hover-option--disabled:hover {
  color: white;
  background: transparent;
}
</style>
