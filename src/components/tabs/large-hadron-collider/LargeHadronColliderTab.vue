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
      canSeeEntropy1: false,
      canSeeEntropy2: false,
      hadronSpeed: 0,
      accelPower: 1,
      amSoftcap: new Decimal(),
      amSoftcap2: new Decimal(),
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
      if (this.hadronSpeed === 0) return `你的强子处于静止状态`;
      if (this.hadronSpeed >= 1000) return `你的强子被加速到了 ${formatHybridLarge(this.hadronSpeed, 3)} 米每秒`;
      return `你的强子被加速到了 ${format(this.hadronSpeed, 3, 3)} 米每秒`;
    },
    modeDisplay() {
      return this.voidMode === 0
        ? "[虚无状态：稳态]"
        : "[虚无状态：归零]";
    },
    voidText() {
      return this.isRunning ? "离开虚无" : "进入虚无";
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
      this.canSeeEntropy1 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e200));
      this.canSeeEntropy2 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e260)) && !Pelle.isDoomed;
      this.hadronSpeed = LHC.hadronSpeed;
      this.accelPower = LHC.acceleratorSpeed * 100000;
      this.amSoftcap.copyFrom(Pelle.isDoomed ? DC.E9E15 : Decimal.pow10(1e200));
      this.amSoftcap2.copyFrom(Decimal.pow10(1e260));
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
      return amount.gte(DC.NUMMAX) ? "无限" : format(amount, 2, 2);
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
        当前强子加速器功率为 {{ formatInt(accelPower) }} GWh
      </div>
      <AcceleratorsPanel v-if="hasAccelerator" />
      <div
        v-if="!hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        达到 {{ format(Decimal.pow10(1e200), 2, 2) }} 反物质
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy1"
      >
        宇宙中的过剩熵增令你的反物质产生了衰变。反物质数量在 {{ format(amSoftcap, 2, 2) }} 后达到软上限，
        在 {{ format(amHardcap, 2, 2) }} 时达到硬上限。
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy2"
      >
        反物质衰变在达到 {{ format(amSoftcap2, 2, 2) }} 反物质后进一步增强。
      </div>
    </div>
    <br>
    <br>
    <div v-if="highestAntimatter.gt(10)">
      <span class="c-void-antimatter-amount">[你在虚无中达到的最高反物质数量为 {{ format(highestAntimatter, 2, 1) }}。]</span>
      <br>
      <span class="c-null">[你拥有 {{ formatNullAmount(nullMatter) }} 虚物质，+{{ formatNullAmount(nullPerSecond) }}/秒]</span>
    </div>
    <div v-if="nullified">
      <span class="c-null">[你拥有 {{ format(nullParticles, 2, 2) }} 虚粒子。+{{ format(nullParticlesPerSecond, 2, 2) }}/秒]</span>
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
      进入稳态虚无将强制进行一次终局，并禁用现实及所有上层机制。
      <br>
      在稳态虚无中反物质将缓慢衰变为虚物质。
      <span v-if="nullified">
        <br>
        <!-- Since you Nullified the Multiverse, !-->在虚无中重获复兴树 ANR 节点和每秒自动获得永恒时所能获得永恒点数的 1%。
      </span>
    </div>
    <div v-if="voidMode === 1">
      进入归零虚无将强制进行一次终局，并将反物质第二指数稀释至 × {{ format(0.01, 2, 2) }}。
      <br>
      在归零虚无中反物质将缓慢转变为虚粒子，为虚物质获取提供指数加成。
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
