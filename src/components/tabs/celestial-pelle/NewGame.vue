<script>
export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 2;
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "None (will choose randomly)";
    },
    startNewGame() {
      Endgame.newEndgame();
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    }
  }
};
</script>

<template>
  <div
    class="c-new-game-container"
    :style="style"
  >
    <h2>
      你想进入新的终局吗？进行终局将重置整个游戏，但保留自动机脚本、研究预设、隐藏主题、隐藏成就、第19行及以后的普通成就、选项设置和同伴符文。
    </h2>
    <h3>你可以使用右上角的按钮，查看此时的游戏。</h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        @click="startNewGame"
      >
        进入终局？
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      通关游戏之后，你可以选择一组符文皮肤。当你再次进行现实之后，你可以用已解锁的符文皮肤，自由地改变符文的外观。符文皮肤不会为游戏提供加成。
      <br>
      <button
        class="c-new-game-button"
        @click="openSelectionModal"
      >
        选择一组符文皮肤
      </button>
      <br>
      <br>
      选中的皮肤：{{ selectedSetName }}
    </h3>
    <h3 v-else>
      你已解锁所有符文皮肤！
    </h3>
    <br>
    <h3>
      你也可以导入“speedrun”，以进入带有统计追踪信息的速通模式，重新开始游戏。
    </h3>
  </div>
</template>

<style scoped>
.c-new-game-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.t-s12 .c-new-game-container {
  color: white;
}

.c-new-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-new-game-button {
  font-family: Typewriter;
  background: grey;
  border: black;
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
