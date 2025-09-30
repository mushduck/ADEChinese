import { breakEternityUpgrades } from "./break-eternity-upgrades";
import { endgameMasteries } from "./endgame-masteries";
import { permanentEndgameMasteries } from "./permanent-endgame-masteries";

export const endgame = {
  upgrades: breakEternityUpgrades,
  masteries: endgameMasteries,
  permanentMasteries: permanentEndgameMasteries
};
