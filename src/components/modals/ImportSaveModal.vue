<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

const OFFLINE_PROGRESS_TYPE = {
  IMPORTED: 0,
  LOCAL: 1,
  IGNORED: 2,
};

export default {
  name: "ImportSaveModal",
  components: {
    ModalWrapperChoice,
    PrimaryButton
  },
  data() {
    return {
      input: "",
      offlineImport: OFFLINE_PROGRESS_TYPE.IMPORTED,
    };
  },
  computed: {
    saveCheckString() {
      const save = GameSaveSerializer.deserialize(this.input);
      const rawString = GameStorage.checkPlayerObject(save);
      // Keep the length bounded; we don't want the modal to be too big for the screen for particularly bad errors
      return rawString.length > 300 ? `${rawString.slice(0, 297)}...` : rawString;
    },
    player() {
      return this.saveCheckString === "" ? GameSaveSerializer.deserialize(this.input) : undefined;
    },
    progress() {
      return PlayerProgress.of(this.player);
    },
    fileName() {
      return this.player.options.saveFileName;
    },
    antimatter() {
      return this.player.antimatter || this.player.money;
    },
    infinities() {
      // Infinity count data is stored in either player.infinitied or player.infinities based on if the save is before
      // or after the reality update, and this explicit check is needed as it runs before any migration code.
      const infinityData = this.player.infinitied ? this.player.infinitied : this.player.infinities;
      return new Decimal(infinityData);
    },
    hasInput() {
      return this.input !== "";
    },
    inputIsEnd() {
      return this.input === "END";
    },
    inputIsValid() {
      return this.inputIsValidSave || this.inputIsSecret || this.inputIsEnd;
    },
    inputIsValidSave() {
      return this.player !== undefined;
    },
    inputIsSecret() {
      return isSecretImport(this.input) || Theme.isSecretTheme(this.input);
    },
    isFromFuture() {
      return this.player.lastUpdate > Date.now();
    },
    if (inputIsEnd) {
      return this.input === "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";
    },
    lastOpened() {
      const ms = Date.now() - this.player.lastUpdate;
      return this.isFromFuture
        ? `This save is from ${TimeSpan.fromMilliseconds(-ms).toString()} in the future.`
        : `This save was last opened ${TimeSpan.fromMilliseconds(ms).toString()} ago.`;
    },
    offlineType() {
      // We update here in the computed method instead of elsewhere because otherwise it initializes the text
      // to a wrong or undefined setting
      this.updateOfflineSettings();

      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          return "Using imported save settings";
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          return "Using existing save settings";
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          return "Will not simulate offline time";
        default:
          throw new Error("Unrecognized offline progress setting for importing");
      }
    },
    offlineDetails() {
      if (this.offlineImport === OFFLINE_PROGRESS_TYPE.IGNORED) {
        return `Save will be imported without offline progress.`;
      }
      if (!GameStorage.offlineEnabled) return "This setting will not apply any offline progress after importing.";
      if (this.isFromFuture) return "Offline progress cannot be simulated due to an inconsistent system clock time.";

      const durationInMs = Date.now() - this.player.lastUpdate;
      const ticks = GameStorage.maxOfflineTicks(durationInMs);
      return `After importing, will simulate ${formatInt(ticks)} ticks of duration
        ${TimeSpan.fromMilliseconds(durationInMs / ticks).toStringShort()} each.`;
    },
    willLoseCosmetics() {
      const currSets = player.reality.glyphs.cosmetics.unlockedFromNG;
      const importedSets = this.player.reality?.glyphs.cosmetics?.unlockedFromNG ?? [];
      return currSets.filter(set => !importedSets.includes(set)).length > 0;
    },
    willLoseSpeedrun() {
      return player.speedrun.isUnlocked && !this.player.speedrun?.isUnlocked;
    }
  },
  mounted() {
    this.$refs.input.select();
  },
  destroyed() {
    // Explicitly setting this to undefined after closing forces the game to fall-back to the stored settings within
    // the player object if this modal is closed - ie. it makes sure actions in the modal don't persist
    GameStorage.offlineEnabled = undefined;
    GameStorage.offlineTicks = undefined;
  },
  methods: {
    changeOfflineSetting() {
      this.offlineImport = (this.offlineImport + 1) % 3;
    },
    updateOfflineSettings() {
      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          // These are default values from a new save, used if importing from pre-reality where these props don't exist
          GameStorage.offlineEnabled = this.player.options.offlineProgress ?? true;
          GameStorage.offlineTicks = this.player.options.offlineTicks ?? 1e5;
          break;
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          GameStorage.offlineEnabled = player.options.offlineProgress;
          GameStorage.offlineTicks = player.options.offlineTicks;
          break;
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          GameStorage.offlineEnabled = false;
          break;
      }
    },
    importSave() {
      if (!this.inputIsValid) return;
      this.emitClose();
      GameStorage.import(this.input);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="false"
  >
    <template #header>
      Input your save
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup.enter="importSave"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-import__save-info">
      <div v-if="inputIsSecret">
        ???
      </div>
      <template v-else-if="inputIsValidSave">
        <div v-if="fileName">
          File name: {{ fileName }}
        </div>
        <div>Antimatter: {{ formatPostBreak(antimatter, 2, 1) }}</div>
        <div v-if="progress.isInfinityUnlocked">
          Infinities: {{ formatPostBreak(infinities, 2) }}
        </div>
        <div v-if="progress.isEternityUnlocked">
          Eternities: {{ formatPostBreak(player.eternities, 2) }}
        </div>
        <div v-if="progress.isRealityUnlocked">
          Realities: {{ formatPostBreak(player.realities, 2) }}
        </div>
        <div v-if="progress.hasFullCompletion">
          Full game completions: {{ formatInt(player.records.fullGameCompletions) }}
        </div>
        <div class="c-modal-import__warning">
          (Your current save file will be overwritten!)
        </div>
        <br>
        <div>
          {{ lastOpened }}
          <div
            class="o-primary-btn"
            @click="changeOfflineSetting"
          >
            Offline Progress: {{ offlineType }}
          </div>
          <span v-html="offlineDetails" />
        </div>
      </template>
      <div v-else-if="hasInput">
        Not a valid save:
        <br>
        {{ saveCheckString }}
      </div>
      <div
        v-if="player"
        class="c-modal-hard-reset-danger"
      >
        <div v-if="willLoseCosmetics">
          <br>
          Glyph cosmetic sets from completing the game are tied to your save.
          <br>
          Importing this save will cause you to lose some sets.
        </div>
        <div v-if="willLoseSpeedrun">
          <br>
          You will lose the ability to do a Speedrun, as this save does not have it unlocked.
        </div>
      </div>
    </div>

    <PrimaryButton
      v-if="inputIsValid"
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="importSave"
    >
      Import
    </PrimaryButton>
  </ModalWrapperChoice>
</template>
