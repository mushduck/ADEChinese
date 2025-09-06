export const END_STATE_MARKERS = {
  // Tab zalgoification starts as soon as endState > 0
  get GAME_END() {
    if (player.endgames >= 1) return 1e300;
    return 1;
  },
  get TAB_START_HIDE() {
    if (player.endgames >= 1) return 1e300;
    return 1.5;
  },
  get INTERACTIVITY_DISABLED() {
    if (player.endgames >= 1) return 1e300;
    return 2.5;
  },
  get FADE_AWAY() {
    if (player.endgames >= 1) return 1e300;
    return 2.5;
  },
  get SAVE_DISABLED() {
    if (player.endgames >= 1) return 1e300;
    return 4;
  },
  get END_NUMBERS() {
    if (player.endgames >= 1) return 1e300;
    return 4.2;
  },
  get CREDITS_START() {
    if (player.endgames >= 1) return 1e300;
    return 4.5;
  },
  get SHOW_NEW_GAME() {
    if (player.endgames >= 1) return 1e300;
    return 15.5;
  },
  get SPECTATE_GAME() {
    if (player.endgames >= 1) return 1e300;
    return 15.9;
  },
  // The song is 4:27 and the credits increment by 1 every 20 seconds. Needs changing if the song is changed.
  get SONG_END() {
    if (player.endgames >= 1) return 1e300;
    return 17.9;
  },
  get CREDITS_END() {
    if (player.endgames >= 1) return 1e300;
    return 160;
  },
};

export const GameEnd = {
  get endState() {
    if (this.removeAdditionalEnd) return this.additionalEnd;
    return Math.max((Math.log10(player.celestials.pelle.records.totalEndgameAntimatter.plus(1).log10() + 1) - 8.7) /
      (Math.log10(9e15) - 8.7) + this.additionalEnd, 0);
  },
  _additionalEnd: 0,
  get additionalEnd() {
    return (player.isGameEnd || this.removeAdditionalEnd) ? this._additionalEnd : 0;
  },
  set additionalEnd(x) {
    this._additionalEnd = (player.isGameEnd || this.removeAdditionalEnd) ? x : 0;
  },

  removeAdditionalEnd: false,

  creditsClosed: false,
  creditsEverClosed: false,

  gameLoop(diff) {
    if (this.removeAdditionalEnd) {
      this.additionalEnd -= Math.min(diff / 200, 0.5);
      if (this.additionalEnd < 4) {
        this.additionalEnd = 0;
        this.removeAdditionalEnd = false;
      }
    }
    if (!this.removeAdditionalEnd && this.endState >= END_STATE_MARKERS.GAME_END &&
        ui.$viewModel.modal.progressBar === undefined) {
      player.isGameEnd = true;
      this.additionalEnd += Math.min(diff / 1000 / 20, 0.1);
    }
  }
};
