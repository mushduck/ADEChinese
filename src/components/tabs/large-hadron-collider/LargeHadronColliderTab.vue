<script>
import wordShift from "@/core/word-shift";

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
      unlockReq: new Decimal(),
      canSeeEntropy1: false,
      canSeeEntropy2: false,
      entropyCorrupted: false,
      textShift: [],
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
      nullParticlesPerSecond: new Decimal(),
      nullParticleEffect: new Decimal(),
      hasC: false,
      c: 0,
      milestonesReached: 0,
      nextAt: 0,
      tessEqual: 0,
      antiEqual: new Decimal(),
      tickEqual: new Decimal(),
      bh1Improve: new Decimal(),
      bh2Improve: new Decimal(),
      potencyImprove: new Decimal(),
      isFlipped: false
    };
  },
  computed: {
    hadronSpeedText() {
      if (this.hadronSpeed === 0) return `你的强子处于静止状态`;
      if (this.hadronSpeed >= 149896229) return `你的强子被加速到了 ${formatHybridLarge(this.hadronSpeed, 3)} 米每秒（${format(this.c, 5, 5)} 倍光速）`;
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
    nextDisplay() {
      return this.milestonesReached >= 5 ? "已解锁所有光速里程碑" :
        `下一个光速里程碑在 ${format(this.nextAt, 2, 2)} 倍光速时解锁`;
    }
  },
  methods: {
    update() {
      this.hasAccelerator = Accelerators.all.some(a => a.isUnlocked);
      this.unlockReq.copyFrom(Decimal.pow10(1e200));
      this.canSeeEntropy1 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e200)) && !Slabdrill.isCursed;
      this.canSeeEntropy2 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e260)) && !Pelle.isDoomed && !Slabdrill.isCursed;
      this.entropyCorrupted = Slabdrill.isCursed;
      this.textShift = ["Glitched", "Corrupted", "Disrupted"];
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
      this.nullParticleEffect.copyFrom(Currency.nullParticles.value.max(1).log10().div(5).add(1).pow(5));
      this.hasC = LHC.hadronC >= 0.5;
      this.c = LHC.hadronC;
      this.milestonesReached = CMilestones.reachedMilestones;
      this.nextAt = CMilestones.nextMilestoneAt;
      this.tessEqual = CMilestones.tesseractEqualizer(Tesseracts.bought, Tesseracts.extra);
      this.antiEqual.copyFrom(CMilestones.antimatterEqualizer(
        (Laitela.continuumActive ? AntimatterDimension(1).continuumAmount : AntimatterDimension(1).amount).times(
        AntimatterDimension(1).multiplier), Tickspeed.perSecond));
      this.tickEqual.copyFrom(CMilestones.tickspeedEqualizer(
        Laitela.continuumActive ? Tickspeed.continuumValue : player.totalTickBought, player.totalTickGained));
      this.bh1Improve.copyFrom(CMilestones.bhImprovement(BlackHole(1).power));
      this.bh2Improve.copyFrom(CMilestones.bhImprovement(BlackHole(2).power));
      this.potencyImprove.copyFrom(CMilestones.potencyImprovement(Accelerators.potency.effectValue3));
      this.isFlipped = player.universes.current === 2;
    },
    formatNullAmount(amount) {
      return amount.gte(DC.NUMMAX) && !DualityUpgrade(26).isBought ? "无限" : format(amount, 2, 2);
    },
    glitchAnim() {
      let flux = Math.random() / (this.voidMode === 1 ? 2 : 4);
      let negFlux = -flux;
      return {
        "text-shadow": `${negFlux}rem 0 red, ${flux}rem 0 blue`,
      };
    },
    corruptionText() {
      return `WARNING: The ${player.universes.current === 2 ? "Matter" : "Antimatter"} Hardcap has become ${wordShift.wordCycle(this.textShift)}.`;
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
        <div
          v-if="hasC"
          class="c-large-hadron-collider-text"
        >
          <br>
          <div v-if="milestonesReached >= 1">
            光速里程碑 {{ formatInt(1) }}：超立方体均衡器
            使有效超立方体数量（已购买 + 免费）缓慢转变为（已购买 × 免费）。
            此转变已完成 {{ formatPercents(Math.clamp((c - 0.5) * 2, 0, 1), 3, 3) }}，使当前有效超立方体数量等于 {{ format(tessEqual, 2, 2) }}。
          </div>
          <div v-if="milestonesReached >= 2">
            <br>
            光速里程碑 {{ formatInt(2) }}：{{ isFlipped ? "正物质" : "反物质" }}均衡器
            使{{ isFlipped ? "正物质" : "反物质" }}产量缓慢从（{{ isFlipped ? "正物质" : "反物质" }}维度倍率 × 计数频率）转变为（{{ isFlipped ? "正物质维度倍率" : "反物质维度倍率" }} ^ log₁₀(max(计数频率, 1))）。
            此转变已完成 {{ formatPercents(Math.clamp((c - 0.7) * 10/3, 0, 1), 3, 3) }}，使当前{{ isFlipped ? "正物质" : "反物质" }}产量等于 {{ format(antiEqual, 2, 2) }}。
          </div>
          <div v-if="milestonesReached >= 3">
            <br>
            光速里程碑 {{ formatInt(3) }}：计数频率均衡器
            使有效计数频率升级数量缓慢从（已购买 + 免费）转变为（已购买 × 免费）。
            此转变已完成 {{ formatPercents(Math.clamp((c - 0.85) * 20/3, 0, 1), 3, 3) }}，使当前有效计数频率升级数量等于 {{ format(tickEqual, 2, 2) }}。
          </div>
          <div v-if="milestonesReached >= 4">
            <br>
            光速里程碑 {{ formatInt(4) }}: 黑洞和能量加速器增强
            黑洞现在同时为游戏速度提供指数加成，该效果将从 1 逐渐增加至 log₁₀(log₁₀(max(黑洞倍率, 10))) + 1。
            此外，能量加速器也为神性物质和神性能量提供指数加成
            该效果将从 1 逐渐增加至 max(log₁₀(max(威能倍率, 1)) - 18.5, 0) ÷ 3 + 1。
            此效果已完成 {{ formatPercents(Math.clamp((c - 0.95) * 20, 0, 1), 3, 3) }}，使当前
            黑洞 {{ formatInt(1) }} 为游戏速度提供 {{ formatPow(bh1Improve, 2, 3) }} 的加成；
            黑洞 {{ formatInt(2) }} 为游戏速度提供 {{ formatPow(bh2Improve, 2, 3) }} 的加成；
            能量加速器为神性物质和神性能量提供 {{ formatPow(potencyImprove, 2, 3) }}的加成。
          </div>
          <div v-if="milestonesReached >= 5">
            <br>
            光速里程碑 {{ formatInt(5) }}：Light unlock.
            你已达到 {{ formatInt(1) }} 倍光速，and can now generate Light (coming soon).
          </div>
          <br>
          <div>
            {{ nextDisplay }}
          </div>
        </div>
      </div>
      <AcceleratorsPanel v-if="hasAccelerator" />
      <div
        v-if="!hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        达到 {{ format(unlockReq, 2, 2) }} {{ isFlipped ? "正物质" : "反物质" }}
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy1"
      >
        宇宙中的过剩熵增令你的反物质产生了衰变。{{this.isFlipped ? "正物质" : "反物质"}}数量在 {{ format(amSoftcap, 2, 2) }} 后达到软上限，
        在 {{ format(amHardcap, 2, 2) }} 时达到硬上限。
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy2"
      >
        {{this.isFlipped ? "正物质" : "反物质"}}衰变在达到 {{ format(amSoftcap2, 2, 2) }} {{this.isFlipped ? "正物质" : "反物质"}}后进一步增强。
      </div>
    </div>
    <br>
    <br>
    <div v-if="highestAntimatter.gt(10)">
      <span class="c-void-antimatter-amount">[你在虚无中达到的最高{{this.isFlipped ? "正物质" : "反物质"}}数量为 {{ format(highestAntimatter, 2, 1) }}。]</span>
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
      在稳态虚无中{{this.isFlipped ? "正物质" : "反物质"}}将缓慢衰变为虚物质。
      <span v-if="nullified">
        <br>
        <!-- Since you Nullified the Multiverse, !-->在虚无中重获复兴树 ANR 节点和每秒自动获得永恒时所能获得永恒点数的 1%。
      </span>
    </div>
    <div v-if="voidMode === 1">
      进入归零虚无将强制进行一次终局，并将{{this.isFlipped ? "正物质" : "反物质"}}第二指数稀释至 × {{ format(0.01, 2, 2) }}。
      <br>
      在归零虚无中{{this.isFlipped ? "正物质" : "反物质"}}将缓慢转变为虚粒子，为稳态虚无中的{{this.isFlipped ? "正物质" : "反物质"}}维度提供指数加成。（当前：{{ formatPow(nullParticleEffect, 2, 3) }}）
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

.c-large-hadron-collider-text {
  margin-left: 5rem;
  margin-right: 5rem;
  position: relative;
  font-size: 1.2rem;
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
