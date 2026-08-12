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
      this.modeUnlocked = ExpansionPack.laitelaPack.isBought && !player.disablePostReality;
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
      需要 {{ format(matterRequirement, 2) }} 暗物质才能进行湮灭
    </button>
    <button
      v-else
      class="l-laitela-annihilation-button c-laitela-annihilation-button"
      @click="annihilate"
    >
      <b>进行暗物质湮灭</b>
    </button>
    <br>
    <br>
    <span v-if="darkMatterMult.gt(1)">
      当前为所有暗物质维度提供的加成：<b>{{ formatX(darkMatterMult, 2, 2) }}</b>
      <br>
      <br>
      湮灭将重置你的暗物质和暗物质维度，湮灭后暗物质的加成倍率
      <b>+{{ format(darkMatterMultGain, 2, 2) }}</b>。
      <br>
      （上次湮灭后的加成倍率 <b>{{ formatX(darkMatterMultRatio, 2, 2) }}</b>）
      <span v-if="autobuyerUnlocked">
        <br>
        <br>
        <span v-if="isBasic">
          当倍率增加
        </span>
        <span v-if="!isBasic">
          当待定倍率为当前倍率
        </span>
        <input
          v-model="autoAnnihilationInput"
          type="text"
          :style="annihilationInputStyle"
          class="c-small-autobuyer-input c-laitela-annihilation-input"
          @change="handleAutoAnnihilationInputChange()"
        >
        <span v-if="isBasic">
          时自动湮灭。
        </span>
        <span v-if="!isBasic">
          倍时自动湮灭。
        </span>
      </span>
    </span>
    <span v-else>
      湮灭将重置你的暗物质和暗物质维度，湮灭后暗物质维度获得 <b>{{ formatX(darkMatterMultGain.add(1), 2, 2) }}</b> 的倍率加成。
    </span>
    <br>
    <br>
    <button
      v-if="modeUnlocked"
      class="l-laitela-annihilation-button c-laitela-annihilation-button"
      @click="modeToggle"
    >
      <b>切换自动购买器模式</b>
    </button>
  </div>
</template>
