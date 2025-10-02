import { EndgameMasteriesState } from "./endgame-masteries";

export const EndgameMasteries = {};

EndgameMasteries.pathList = [
  { path: ENDGAME_MASTERY_PATH.ANTIMATTER_DIM_COMPRESSION, masteries: [81, 91, 101], name: "AD Compression" },
  { path: ENDGAME_MASTERY_PATH.INFINITY_DIM_COMPRESSION, masteries: [82, 92, 102], name: "ID Compression" },
  { path: ENDGAME_MASTERY_PATH.TIME_DIM_COMPRESSION, masteries: [83, 93, 103], name: "TD Compression" },
  { path: ENDGAME_MASTERY_PATH.CELESTIAL_DIM_COMPRESSION, masteries: [84, 94, 104], name: "CD Compression" },
  { path: ENDGAME_MASTERY_PATH.INFINITY_POINTS, masteries: [141, 151], name: "IP" },
  { path: ENDGAME_MASTERY_PATH.ETERNITY_POINTS, masteries: [142, 152], name: "EP" },
  { path: ENDGAME_MASTERY_PATH.REALITY_MACHINES, masteries: [143, 153], name: "RM" },
  { path: ENDGAME_MASTERY_PATH.IMAGINARY_MACHINES, masteries: [144, 154], name: "iM" },
];

EndgameMasteries.paths = EndgameMasteries.pathList.mapToObject(e => e.path, e => e.masteries);

export class EndgameMasteryState extends EndgameMasteriesState {
  constructor(config) {
    const type = ENDGAME_MASTERY_TYPE.NORMAL;
    super(config, type);
    const path = EndgameMasteries.pathList.find(p => p.masteries.includes(this.id));
    this._path = path?.path ?? ENDGAME_MASTERY_PATH.NONE;
  }

  get isUnlocked() {
    return this.config.unlocked?.() ?? true;
  }

  get isBought() {
    return GameCache.endgameMasteries.value[this.id];
  }

  checkRequirement() {
    const check = req => (typeof req === "number"
      ? EndgameMastery(req).isBought
      : req());
    const currTree = GameCache.currentMasteryTree.value;
    switch (this.config.reqType) {
      case EM_REQUIREMENT_TYPE.AT_LEAST_ONE:
        return this.config.requirement.some(r => check(r));
      case EM_REQUIREMENT_TYPE.ALL:
        return this.config.requirement.every(r => check(r));
      case EM_REQUIREMENT_TYPE.COMPRESSION_PATH:
        return this.config.requirement.every(r => check(r)) && currTree &&
          currTree.currCompPathCount < currTree.allowedCompPathCount;
      case EM_REQUIREMENT_TYPE.CURRENCY_PATH:
        return this.config.requirement.every(r => check(r)) && currTree &&
          currTree.currCurrPathCount < currTree.allowedCurrPathCount;
      default:
        throw Error(`Unrecognized EM requirement type: ${this.reqType}`);
    }
  }

  checkSetRequirement() {
    return true;
  }

  get canBeBought() {
    return this.checkRequirement() && this.checkSetRequirement();
  }

  get isEffectActive() {
    return this.isBought;
  }

  purchase() {
    if (this.isBought || !this.isAffordable || !this.canBeBought) return false;
    if (GameEnd.creditsEverClosed) return false;
    player.endgameMasteries.masteries.push(this.id);
    Currency.endgameSkills.subtract(this.cost);
    GameCache.endgameMasteries.invalidate();
    EndgameMasteryTree.commitToGameState([EndgameMastery(this.id)]);
    return true;
  }

  purchaseUntil() {
    EndgameMasteryTree.commitToGameState(buyMasteriesUntil(this.id));
  }

  get path() {
    return this._path;
  }
}

EndgameMasteryState.masteries = mapGameData(
  GameDatabase.endgame.masteries,
  config => new EndgameMasteryState(config)
);

EndgameMasteryState.all = EndgameMasteryState.masteries.filter(e => e !== undefined);

/**
 * @returns {EndgameMasteryState}
 */
export function EndgameMastery(id) {
  return EndgameMasteryState.masteries[id];
}

/**
 * @returns {EndgameMasteryState[]}
 */
EndgameMastery.boughtEM = function() {
  return player.endgameMasteries.masteries.map(id => EndgameMastery(id));
};

EndgameMastery.preferredPaths = {
  compression: {
    get path() {
      return player.endgameMasteries.preferredPaths[0];
    },
    set path(value) {
      const options = [1, 2, 3, 4];
      player.endgameMasteries.preferredPaths[0] = value.filter(id => options.includes(id));
    },
    get masteries() {
      return player.endgameMasteries.preferredPaths[0].flatMap(path => EndgameMasteries.paths[path]);
    },
    get usePriority() {
      return this.path.length > 1;
    }
  },
  currency: {
    get path() {
      return player.endgameMasteries.preferredPaths[1];
    },
    set path(value) {
      const options = [5, 6, 7, 8];
      player.endgameMasteries.preferredPaths[1] = value.filter(id => options.includes(id));
    },
    get masteries() {
      return player.endgameMasteries.preferredPaths[1].flatMap(path => EndgameMasteries.paths[path]);
    },
    get usePriority() {
      return this.path.length > 1;
    }
  }
};
