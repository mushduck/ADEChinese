export const END_STATE_MARKERS = {
  // Tab zalgoification starts as soon as endState > 0
  GAME_END: player.endgames >= 1 ? 1e300 : 1,
  TAB_START_HIDE: player.endgames >= 1 ? 1e300 : 1.5,
  INTERACTIVITY_DISABLED: player.endgames >= 1 ? 1e300 : 2.5,
  FADE_AWAY: player.endgames >= 1 ? 1e300 : 2.5,
  SAVE_DISABLED: player.endgames >= 1 ? 1e300 : 4,
  END_NUMBERS: player.endgames >= 1 ? 1e300 : 4.2,
  CREDITS_START: player.endgames >= 1 ? 1e300 : 4.5,
  SHOW_NEW_GAME: player.endgames >= 1 ? 1e300 : 15.5,
  SPECTATE_GAME: player.endgames >= 1 ? 1e300 : 15.9,
  // The song is 4:27 and the credits increment by 1 every 20 seconds. Needs changing if the song is changed.
  SONG_END: player.endgames >= 1 ? 1e300 : 17.9,
  CREDITS_END: player.endgames >= 1 ? 1e300 : 160,
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
