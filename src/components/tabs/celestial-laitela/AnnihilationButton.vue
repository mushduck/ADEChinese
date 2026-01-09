<script>
export default {
  name: "AnnihilationButton",
  data() {
    return {
      darkMatter: new Decimal(0),
      darkMatterMult: new Decimal(0),
      darkMatterMultGain: new Decimal(0),
      autobuyerUnlocked: false,
      annihilationButtonVisible: false,
      matterRequirement: 0,
      darkMatterMultRatio: new Decimal(0),
      autoAnnihilationInput: player.auto.annihilation.multiplier,
      isEnabled: true,
      modeUnlocked: false,
      annihilationMode: 0,
      isBasic: true,
    };
  },
  computed: {
    annihilationInputStyle() {
      return { "background-color": this.isEnabled ? "" : "var(--color-bad)" };
    }
  },
  methods: {
    update() {
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.darkMatterMult.copyFrom(Laitela.darkMatterMult);
      this.darkMatterMultGain.copyFrom(Laitela.darkMatterMultGain);
      this.autobuyerUnlocked = Autobuyer.annihilation.isUnlocked;
      this.annihilationButtonVisible = Laitela.canAnnihilate || this.autobuyerUnlocked;
      this.matterRequirement = Laitela.annihilationDMRequirement;
      this.darkMatterMultRatio.copyFrom(Laitela.darkMatterMultRatio);
      this.isEnabled = player.auto.annihilation.isActive;
      this.modeUnlocked = ExpansionPack.laitelaPack.isBought;
      this.annihilationMode = player.auto.annihilation.mode;
      this.isBasic = this.annihilationMode === 0;
    },
    annihilate() {
      Laitela.annihilate();
    },
    modeToggle() {
      player.auto.annihilation.mode = (player.auto.annihilation.mode + 1) % 2;
    },
    handleAutoAnnihilationInputChange() {
      const float = parseFloat(this.autoAnnihilationInput);
      if (isNaN(float)) {
        this.autoAnnihilationInput = player.auto.annihilation.multiplier;
      } else {
        player.auto.annihilation.multiplier = float;
      }
    },
    classObject() {
      return {
        "l-laitela-annihilation-container": true,
        "l-laitela-annihilation-container--large": this.modeUnlocked
      };
    }
  }
};
</script>

<template>
  <div :class="classObject()">
    <button
      v-if="darkMatter.lt(matterRequirement)"
      class="l-laitela-annihilation-button"
    >
      Annihilation requires {{ format(matterRequirement, 2) }} Dark Matter
    </button>
    <button
      v-else
      class="l-laitela-annihilation-button c-laitela-annihilation-button"
      @click="annihilate"
    >
      <b>Annihilate your Dark Matter Dimensions</b>
    </button>
    <br>
    <br>
    <span v-if="darkMatterMult.gt(1)">
      Current multiplier to all Dark Matter Dimensions: <b>{{ formatX(darkMatterMult, 2, 2) }}</b>
      <br>
      <br>
      Annihilation will reset your Dark Matter and Dark Matter Dimension amounts, but also add
      <b>+{{ format(darkMatterMultGain, 2, 2) }}</b> to your Annihilation multiplier.
      <br>
      (<b>{{ formatX(darkMatterMultRatio, 2, 2) }}</b> from previous multiplier)
      <span v-if="autobuyerUnlocked">
        <br>
        <br>
        <span v-if="isBasic">
          Auto-Annihilate when adding
        </span>
        <span v-if="!isBasic">
          Auto-Annihilate when the pending multiplier is
        </span>
        <input
          v-model="autoAnnihilationInput"
          type="text"
          :style="annihilationInputStyle"
          class="c-small-autobuyer-input c-laitela-annihilation-input"
          @change="handleAutoAnnihilationInputChange()"
        >
        <span v-if="isBasic">
          to the multiplier.
        </span>
        <span v-if="!isBasic">
          times higher than the current multiplier.
        </span>
      </span>
    </span>
    <span v-else>
      Annihilation will reset your Dark Matter and Dark Matter Dimension amounts, but will give a permanent
      multiplier of <b>{{ formatX(darkMatterMultGain.add(1), 2, 2) }}</b> to all Dark Matter Dimensions.
    </span>
    <br>
    <br>
    <button
      v-if="modeUnlocked"
      class="l-laitela-annihilation-button c-laitela-annihilation-button"
      @click="modeToggle"
    >
      <b>Toggle Autobuyer Mode</b>
    </button>
  </div>
</template>

