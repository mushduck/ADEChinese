<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "Prologue",
  components: {
    PrimaryButton
  },
  data() {
    return {
      hasSeenIntro: false,
      introTick: 0,
      introFrozen: true,
      opac1: 0,
      opac2: 0,
      opac3: 0,
      opac4: 0
    };
  },
  methods: {
    update() {
      this.hasSeenIntro = player.hasSeenIntro;
      this.introTick = player.introTick;
      this.introFrozen = player.introFrozen;
      this.opac1 = Math.clamp((player.introTick - 3000) / 1000, 0, 1);
      this.opac2 = Math.clamp((player.introTick - 23000) / 1000, 0, 1);
      this.opac3 = Math.clamp((player.introTick - 25000) / 1000, 0, 1);
      this.opac4 = Math.clamp((player.introTick - 54000) / 1000, 0, 1);
    },
    startGame() {
      Modal.username.show();
    },
    importSave() {
      Modal.import.show();
    }
  }
};
</script>

<template>
  <div
    v-if="!hasSeenIntro"
    class="l-prologue-container"
  >
    <div
      class="l-intro-options"
      v-if="introFrozen && introTick === 0"
    >
      <div class="l-intro-options-spacing">
        <span class="l-intro-options-text">你是刚来到存在之境的新人吗？</span>
        <br>
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="startGame"
        >
          开始新的游戏
        </PrimaryButton>
      </div>
      <div class="l-intro-options-spacing">
        <span class="l-intro-options-text">还是说你只是迷了路？</span>
        <br>
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="importSave"
        >
          导入存档
        </PrimaryButton>
      </div>
    </div>
    <div
      v-if="!introFrozen && introTick > 0 && introTick < 10000"
      class="l-prologue-text"
    >
      <span class="l-intro-text">2113 年 5 月 2 日</span>
      <br>
      <span class="l-intro-text" :style="{ opacity: opac1 }">LOCATION: ANTI-709B</span>
    </div>
    <div
      v-if="!introFrozen && introTick > 20000 && introTick < 30000"
      class="l-prologue-text--alternate"
    >
      <span class="l-intro-text--alternate">五</span>
      <span class="l-intro-text--alternate" :style="{ opacity: opac2 }">年</span>
      <span class="l-intro-text--alternate" :style="{ opacity: opac3 }">后</span>
    </div>
    <div
      v-if="!introFrozen && introTick > 50000 && introTick < 60000"
      class="l-prologue-text--alternate"
    >
      <div>
        <span class="l-logo-color-one">反</span><span class="l-logo-color-two">物质</span><span class="l-intro-text">维度</span>
        <br>
        <span class="l-logo-color-three" :style="{ opacity: opac4 }">终局</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-intro-options-text {
  font-size: 2rem;
  color: white;
  font-weight: bold;
}

.l-intro-text {
  font-size: 10rem;
  color: white;
  font-weight: bold;
}

.l-intro-text--alternate {
  font-size: 10rem;
  color: white;
  font-weight: bold;
  margin: 2rem;
}

.l-intro-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 11;
}

.l-intro-options-spacing {
  margin: 10rem;
}

.l-prologue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.l-prologue-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

.l-prologue-text--alternate {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

.l-logo-color-one {
  font-size: 10rem;
  color: #1afdfd;
  font-weight: bold;
}

.l-logo-color-two {
  font-size: 10rem;
  color: #ffff0c;
  font-weight: bold;
}

.l-logo-color-three {
  font-size: 10rem;
  color: var(--color-endgame);
  font-weight: bold;
}
</style>
