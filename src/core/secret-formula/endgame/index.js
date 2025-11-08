import { breakEternityUpgrades } from "./break-eternity-upgrades";
import { endgameMasteries } from "./endgame-masteries";
import { permanentEndgameMasteries } from "./permanent-endgame-masteries";
import { endgameMilestones } from "./endgame-milestones";

export const endgame = {
  upgrades: breakEternityUpgrades,
  masteries: endgameMasteries,
  permanentMasteries: permanentEndgameMasteries,
  milestones: endgameMilestones
};
