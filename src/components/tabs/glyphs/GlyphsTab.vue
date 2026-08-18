<script>
import CurrentGlyphEffects from "./CurrentGlyphEffects";
import EquippedGlyphs from "./EquippedGlyphs";
import ExpandingControlBox from "@/components/ExpandingControlBox";
import GlyphInventory from "./GlyphInventory";
import GlyphLevelsAndWeights from "./GlyphLevelsAndWeights";
import GlyphPeek from "./GlyphPeek";
import GlyphTabSidebar from "./sidebar/GlyphTabSidebar";
import RealityAmplifyButton from "./RealityAmplifyButton";
import RealityReminder from "./RealityReminder";
import ResetRealityButton from "./ResetRealityButton";
import SacrificedGlyphs from "./SacrificedGlyphs";
import SingleGlyphCustomzationPanel from "./SingleGlyphCustomzationPanel";

export default {
  name: "GlyphsTab",
  components: {
    ExpandingControlBox,
    GlyphTabSidebar,
    GlyphPeek,
    RealityAmplifyButton,
    GlyphInventory,
    SacrificedGlyphs,
    CurrentGlyphEffects,
    EquippedGlyphs,
    GlyphLevelsAndWeights,
    ResetRealityButton,
    RealityReminder,
    SingleGlyphCustomzationPanel
  },
  data() {
    return {
      enslavedHint: "",
      showInstability: false,
      showHigherInstability: false,
      showMoreHigherInstability: false,
      showEvenMoreHigherInstability: false,
      showStillEvenMoreHigherInstability: false,
      instabilityThreshold: new Decimal(),
      hyperInstabilityThreshold: new Decimal(),
      extremeInstabilityThreshold: new Decimal(),
      immenseInstabilityThreshold: new Decimal(),
      extensiveInstabilityThreshold: new Decimal(),
      prodigiousInstabilityThreshold: new Decimal(),
      isInCelestialReality: false,
      canAmplify: false,
      glyphTextColors: true,
      autoRestartCelestialRuns: false,
      sacrificeUnlocked: false,
      sacrificeDisplayed: false,
      resetRealityDisplayed: false,
    };
  },
  computed: {
    showEnslavedHint() {
      return this.enslavedHint !== "";
    },
    glyphColorState() {
      return {
        "o-glyph-color-checkbox": true,
        "o-glyph-color-checkbox--active": this.glyphTextColors,
        "o-glyph-color-checkbox--inactive": !this.glyphTextColors,
      };
    },
  },
  methods: {
    update() {
      this.resetRealityDisplayed = PlayerProgress.realityUnlocked();
      this.showInstability = player.records.bestReality.glyphLevel.gt(800) || player.records.bestEndgame.glyphLevel.gt(800);
      this.showHigherInstability = player.records.bestEndgame.glyphLevel.gt(60000);
      this.showMoreHigherInstability = player.records.bestEndgame.glyphLevel.gt(160000);
      this.showEvenMoreHigherInstability = player.records.bestEndgame.glyphLevel.gt(800000);
      this.showStillEvenMoreHigherInstability = player.records.bestEndgame.glyphLevel.gt(2000000);
      this.instabilityThreshold.copyFrom(Decimal.floor(Glyphs.instabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.hyperInstabilityThreshold.copyFrom(Decimal.floor(Glyphs.hyperInstabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.extremeInstabilityThreshold.copyFrom(Decimal.floor(Glyphs.extremeInstabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.immenseInstabilityThreshold.copyFrom(Decimal.floor(Glyphs.immenseInstabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.extensiveInstabilityThreshold.copyFrom(Decimal.floor(Glyphs.extensiveInstabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.prodigiousInstabilityThreshold.copyFrom(Decimal.floor(Glyphs.prodigiousInstabilityThreshold.times(Effects.product(EndgameUpgrade(25), Ra.unlocks.glyphLevelBuff))));
      this.isInCelestialReality = isInCelestialReality();
      this.canAmplify = Enslaved.isUnlocked && !this.isInCelestialReality;
      this.autoRestartCelestialRuns = player.options.retryCelestial;
      this.glyphTextColors = player.options.glyphTextColors;
      this.enslavedHint = "";
      this.sacrificeUnlocked = GlyphSacrificeHandler.canSacrifice;
      this.sacrificeDisplayed = player.reality.showGlyphSacrifice;
      if (!Enslaved.isRunning) return;
      const haveBoost = Glyphs.activeWithoutCompanion.find(e => e.level.lt(Enslaved.glyphLevelMin)) !== undefined;
      if (haveBoost) {
        this.enslavedHint = "完成...以符文...所能做的...微乎其微...";
      }
    },
    toggleAutoRestartCelestial() {
      player.options.retryCelestial = !player.options.retryCelestial;
    },
    toggleGlyphTextColors() {
      player.options.glyphTextColors = !player.options.glyphTextColors;
    },
    glyphInfoClass(isSacrificeOption) {
      return {
        "l-glyph-info-button": true,
        "c-glyph-info-button": true,
        "c-glyph-info-button--active": isSacrificeOption,
        "c-glyph-info-button--inactive": !isSacrificeOption
      };
    },
    setInfoState(state) {
      player.reality.showGlyphSacrifice = state;
    },
    glyphColorPosition() {
      return this.sacrificeUnlocked ? "l-glyph-color-position__low" : "l-glyph-color-position__top";
    },
    glyphInfoBorderClass() {
      return {
        "c-current-glyph-effects-with-top-border": !this.sacrificeUnlocked
      };
    },
    buttonGroupClass() {
      return {
        "l-half-width": this.canAmplify
      };
    }
  }
};
</script>

<template>
  <div>
    <div class="l-glyphs-tab">
      <div class="l-reality-button-column">
        <GlyphPeek />

        <div
          v-if="resetRealityDisplayed"
          class="l-reality-button-group"
        >
          <RealityAmplifyButton
            v-if="!isInCelestialReality"
            :class="buttonGroupClass()"
          />
          <ResetRealityButton :class="buttonGroupClass()" />
        </div>

        <div
          v-if="isInCelestialReality"
          class="l-celestial-auto-restart-checkbox"
        >
          <input
            id="autoRestart"
            v-model="autoRestartCelestialRuns"
            type="checkbox"
            :value="autoRestartCelestialRuns"
            class="o-clickable"
            @input="toggleAutoRestartCelestial()"
          >
          <label
            for="autoRestart"
            class="o-clickable"
          >
            进行现实后重新进入该天神的现实
          </label>
        </div>

        <br>

        <RealityReminder />

        <div v-if="showInstability">
          <br>
          符文变得不稳定。
          <br>
          <br>
          达到高于 {{ formatInt(instabilityThreshold) }} 级的更加困难。
          <br>
          在超过 {{ formatInt(hyperInstabilityThreshold) }} 级时，这种效果更为显著。
          <br>
          <div v-if="showHigherInstability">
            高于 {{ formatInt(extremeInstabilityThreshold) }} 级时, 更高符文等级几乎无法企及。
          </div>
          <div v-if="showMoreHigherInstability">
            跨越 {{ formatInt(immenseInstabilityThreshold) }} 级时，继续提升将举步维艰。
          </div>
          <div v-if="showEvenMoreHigherInstability">
            超越 {{ formatInt(extensiveInstabilityThreshold) }} 级时，升级减缓将急剧加剧。
          </div>
          <div v-if="showStillEvenMoreHigherInstability">
            一旦触及 {{ formatInt(prodigiousInstabilityThreshold) }} 级，增长便几乎宣告终结。
          </div>
        </div>
        <SingleGlyphCustomzationPanel />
        <ExpandingControlBox
          width-source="content"
          label="符文等级因子"
          container-class="c-glyph-level-factors-dropdown-header"
          class="l-glyph-level-factors"
        >
          <template #dropdown>
            <GlyphLevelsAndWeights />
          </template>
        </ExpandingControlBox>
        <GlyphTabSidebar />
      </div>
      <div class="l-player-glyphs-column">
        <div
          v-if="showEnslavedHint"
          class="o-teresa-quotes"
          v-html="enslavedHint"
        />
        <div class="l-equipped-glyphs-and-effects-container">
          <EquippedGlyphs />
          <div class="l-glyph-info-wrapper">
            <span
              class="l-glyph-color-box"
              @click="toggleGlyphTextColors"
            >
              <div :class="glyphColorPosition()">
                <label
                  :class="glyphColorState"
                >
                  <span class="fas fa-palette" />
                </label>
              </div>
            </span>
            <div
              v-if="sacrificeUnlocked"
              class="c-glyph-info-options"
            >
              <button
                :class="glyphInfoClass(!sacrificeDisplayed)"
                @click="setInfoState(false)"
              >
                当前符文效果
              </button>
              <button
                :class="glyphInfoClass(sacrificeDisplayed)"
                @click="setInfoState(true)"
              >
                符文献祭总述
              </button>
            </div>
            <SacrificedGlyphs v-if="sacrificeUnlocked && sacrificeDisplayed" />
            <CurrentGlyphEffects
              v-else
              :class="glyphInfoBorderClass()"
            />
          </div>
        </div>
        <GlyphInventory />
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-glyph-level-factors {
  margin: 2rem;
}

.o-clickable {
  cursor: pointer;
}

.l-celestial-auto-restart-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
}

.l-half-width {
  width: 50%;
}
</style>
