<script>
export default {
  name: "RestartEndgameUpdateDisplay",
  data() {
    return {
      opacity: 0,
      visible: false,
      currentCompletions: 0,
      performingAction: false
    };
  },
  computed: {
    formattedCompletion() {
      if (Math.floor((this.currentCompletions % 100) / 10) === 1) return `${this.currentCompletions}th`;
      else if ((this.currentCompletions % 10) === 1) return `${this.currentCompletions}st`;
      else if ((this.currentCompletions % 10) === 2) return `${this.currentCompletions}nd`;
      else if ((this.currentCompletions % 10) === 3) return `${this.currentCompletions}rd`;
      else return `${this.currentCompletions}th`;
    },
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = player.endgame.creditsTick > 13005000 && player.endgame.creditsTick < 13017500;
      this.opacity = Math.min((player.endgame.creditsTick - 13005000) / 5000, (13017500 - player.endgame.creditsTick) / 2500);
      this.currentCompletions = player.endgame.fullCompletions + 1;
    },
    restartGame() {
      if (this.performingAction) return;
      this.performingAction = true;
      GameStorage.export();
      NewGame.restartGame();
    },
    keepGoing() {
      if (this.performingAction) return;
      this.performingAction = true;
      GameStorage.export();
      player.endgame.creditsTick = 13015000;
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
      恭喜！整个已平衡的游戏部分已经完成！接下来你有两个选择。
    </h2>
    <h3>
      选项 1：从头开始游戏。你已通关游戏 {{ formattedCompletion }} 次，
      因此你将获得对下次更新主要资源的永久倍率： {{ formatX(currentCompletions) }}。
      你可以多通关几次来提升该倍率。在重置整个游戏之前，你的存档文件
      将被导出到剪贴板。建议保留此存档，以防发生意外。
    </h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        :class="{ 'c-new-game-button--unclickable': performingAction }"
        @click="restartGame"
      >
        重置游戏
      </button>
    </div>
    <br>
    <h3>
      选项 2：继续游戏。目前，游戏没有太多可玩的新内容。如果你愿意，可以继续，
      但之后可推进的选项有限。此外，如果你从此刻继续，将不会获得对下次更新的
      任何额外加成。如果你选择此选项，你的存档文件同样会被导出，以便你在改变主意时
      可以回退。
    </h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        :class="{ 'c-new-game-button--unclickable': performingAction }"
        @click="keepGoing"
      >
        继续游戏
      </button>
    </div>
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

.c-new-game-button--unclickable {
  cursor: default;
}
</style>
