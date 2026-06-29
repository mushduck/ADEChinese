<script>
import AcceleratorsPanel from "./AcceleratorsPanel";
import NullUpgradesTabComponent from "./NullUpgradesTabComponent";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "LargeHadronColliderTab",
  components: {
    AcceleratorsPanel,
    NullUpgradesTabComponent,
    PrimaryButton
  },
  data() {
    return {
      hasAccelerator: false,
      hadronSpeed: 0,
      accelPower: 1,
      amSoftcap: new Decimal(),
      amHardcap: new Decimal(),
      isRunning: false,
      highestAntimatter: new Decimal(),
      nullMatter: new Decimal(),
      nullPerSecond: new Decimal(),
      nullified: false,
      voidMode: 0,
      nullParticles: new Decimal(),
      nullParticlesPerSecond: new Decimal()
    };
  },
  computed: {
    hadronSpeedText() {
      if (this.hadronSpeed === 0) return `Your Hadrons are stationary`;
      if (this.hadronSpeed >= 1000) return `Your Hadrons are moving at ${formatHybridLarge(this.hadronSpeed, 3)} m/s`;
      return `Your Hadrons are moving at ${format(this.hadronSpeed, 3, 3)} m/s`;
    },
    modeDisplay() {
      return this.voidMode === 0
        ? "Void Mode: Normal"
        : "Void Mode: Nullified";
    },
    voidText() {
      return this.isRunning ? "[Exit the Void.]" : "[Enter the Void.]";
    },
    runButtonOuterClass() {
      return {
        "l-void-run-button": true,
        "c-void-run-button": true,
        "c-void-run-button--running": this.isRunning,
        "c-void-run-button--not-running": !this.isRunning,
      };
    },
  },
  methods: {
    update() {
      this.hasAccelerator = Accelerators.all.some(a => a.isUnlocked);
      this.hadronSpeed = LHC.hadronSpeed;
      this.accelPower = LHC.acceleratorSpeed * 100000;
      this.amSoftcap.copyFrom(Pelle.isDoomed ? DC.E9E15 : Decimal.pow10(1e200));
      this.amHardcap.copyFrom(Pelle.isDoomed ? DC.ENUMMAX : LHC.breakingPoint);
      this.isRunning = LHC.voidRunning || LHC.nullifiedVoidRunning;
      this.highestAntimatter.copyFrom(player.endgame.largeHadronCollider.void.highestAntimatter);
      this.nullMatter.copyFrom(player.endgame.largeHadronCollider.void.nullMatter);
      this.nullPerSecond.copyFrom(!LHC.voidRunning ? DC.D0 :
        Decimal.log10(Decimal.pow(AntimatterDimension(1).productionPerSecond, 0.01).max(1)).pow(
        Decimal.log10(Decimal.log10(Decimal.pow(AntimatterDimension(1).productionPerSecond, 0.01).max(1)).max(1))));
      this.nullified = player.endgame.largeHadronCollider.void.nullified;
      this.voidMode = player.endgame.largeHadronCollider.void.mode;
      this.nullParticles.copyFrom(player.endgame.largeHadronCollider.void.nullParticles);
      this.nullParticlesPerSecond.copyFrom(!LHC.nullifiedVoidRunning ? DC.D0 : getNullParticleGainPerSecond());
    },
    formatNullAmount(amount) {
      return amount.gte(DC.NUMMAX) ? Notations.current.infinite : format(amount, 2, 2);
    },
    glitchAnim() {
      let flux = Math.random() / (this.voidMode === 1 ? 2 : 4);
      let negFlux = -flux;
      return {
        "text-shadow": `${negFlux}rem 0 red, ${flux}rem 0 blue`,
      };
    },
    startRun() {
      if (this.voidMode === 1) {
        if (this.isRunning) exitNullifiedVoid();
        else enterNullifiedVoid();
      }
      else {
        if (this.isRunning) exitTheVoid();
        else enterTheVoid();
      }
    },
    changeMode() {
      if (this.isRunning) return;
      player.endgame.largeHadronCollider.void.mode = (player.endgame.largeHadronCollider.void.mode + 1) % 2;
    }
  }
};
</script>

<template>
  <div class="l-large-hadron-collider-tab">
    <div class="l-large-hadron-collider-all-content-container">
      <div
        v-if="hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        {{ hadronSpeedText }}
        <br>
        The Large Hadron Collider is currently consuming {{ formatInt(accelPower) }} GWh of power
      </div>
      <AcceleratorsPanel v-if="hasAccelerator" />
      <div
        v-if="!hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        Reach {{ format(Decimal.pow10(1e200), 2, 2) }} Antimatter
      </div>
      <div class="c-large-hadron-collider-entropy">
        Excess Entropy in the universe has caused your Antimatter to decay past {{ format(amSoftcap, 2, 2) }},
        and has restricted it from exceeding {{ format(amHardcap, 2, 2) }}.
      </div>
    </div>
    <br>
    <br>
    <div v-if="highestAntimatter.gt(10)">
      <span class="c-void-antimatter-amount">[Your highest Antimatter inside The Void is {{ format(highestAntimatter, 2, 1) }}.]</span>
      <br>
      <span class="c-null">[You have {{ formatNullAmount(nullMatter) }} Null Matter. +{{ formatNullAmount(nullPerSecond) }}/s]</span>
    </div>
    <div v-if="nullified">
      <span class="c-null">[You have {{ format(nullParticles, 2, 2) }} Null Particles. +{{ format(nullParticlesPerSecond, 2, 2) }}/s]</span>
    </div>
    <div class="l-void-run">
      <div
        :class="runButtonOuterClass"
        @click="startRun"
      >
        <div
          :button-symbol="voidText"
          :style="glitchAnim()"
        >
          {{ voidText }}
        </div>
      </div>
    </div>
    <PrimaryButton
      v-if="nullified"
      class="o-primary-btn--subtab-option"
      @click="changeMode"
    >
      {{ modeDisplay }}
    </PrimaryButton>
    <div v-if="voidMode === 0">
      Entering The Void will force an Endgame reset and disable all Reality and beyond mechanics.
      <br>
      Your Antimatter will slowly decay and you will gain Null Matter from the decayed Antimatter.
      <span v-if="nullified">
        <br>
        Since you Nullified the Multiverse, the ANR Perk and Passive EP Generation are reenabled inside The Void.
      </span>
    </div>
    <div v-if="voidMode === 1">
      Entering The Void in Nullified Mode will force an Endgame reset and Dilate your Antimatter by {{ format(0.01, 2, 2) }}.
      <br>
      You will generate Null Particles based on your Antimatter, which empower Antimatter Dimensions while inside The Void in normal mode.
    </div>
    <NullUpgradesTabComponent />
  </div>
</template>

<style scoped>
.l-large-hadron-collider-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-large-hadron-collider-all-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.c-large-hadron-collider-description {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-alpha--base);
}

.c-large-hadron-collider-entropy {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: red;
}

.c-void-antimatter-amount {
  position: relative;
  font-size: 1rem;
  color: red;
}

.c-null {
  position: relative;
  font-size: 2rem;
  color: black;
  text-shadow: 0 0 0.2rem white;
}
</style>
