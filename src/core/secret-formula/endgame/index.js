import { breakEternityUpgrades } from "./break-eternity-upgrades";
import { endgameMasteries } from "./endgame-masteries";
import { permanentEndgameMasteries } from "./permanent-endgame-masteries";
import { endgameMilestones } from "./endgame-milestones";
import { endgameUpgrades } from "./endgame-upgrades";
import { galacticPowerRewards } from "./galactic-power";
import { expansionPacks } from "./expansion-packs";

export const endgame = {
  breakUpgrades: breakEternityUpgrades,
  masteries: endgameMasteries,
  permanentMasteries: permanentEndgameMasteries,
  milestones: endgameMilestones,
  upgrades: endgameUpgrades,
  galacticPowers: galacticPowerRewards,
  packs: expansionPacks
};
