export const endgameMilestones = {
  riftFill: {
    endgames: 1,
    reward: () => `Rift Fill is ${formatPercents(0.05)} faster per Endgame, capping at ${formatPercents(0.5)} at ${formatInt(9)} Endgames`
  },
  remnantGalaxy: {
    endgames: 2,
    reward: "You gain a multiplier to Galaxy strength based on Remnants"
  },
  galGenAntimation: {
    endgames: 5,
    reward: () => `Galaxy Generator Antimations are ${formatX(1.2, 0, 1)} faster every ${formatInt(5)} Endgames, capping after ${formatInt(100)} Endgames`
  },
  gameSpeedUncap: {
    endgames: 10,
    reward: () => `Remove the ${format(1e300, 2, 2)} Game Speed Hardcap`
  },
  fasterGalaxies: {
    endgames: 20,
    reward: "Unlock a new Galaxy Generator Upgrade"
  },
  remnantFormula: {
    endgames: 50,
    reward: "Improve the Remnant Formula"
  },
  celestialEarlyUnlock: {
    endgames: 100,
    reward: () => `Start Endgames with the first ${formatInt(6)} Celestials unlocked`
  },
  moreFasterGalaxies: {
    endgames: 200,
    reward: "Endgames boost Galaxy Production in Pelle"
  },
  realityShardDTBoost: {
    endgames: 500,
    reward: "Dilated Time gain is multiplied by your Reality Shard count"
  },
  autobuyerEndgame: {
    endgames: 1000,
    reward: "Unlock autobuyer for Endgames"
  },
  endgameAntimatter: {
    endgames: 10000,
    reward: "Gain a power to Antimatter Production based on Endgames, which is stronger in Pelle"
  },
  instabilityReduction: {
    endgames: 1000000,
    reward: "Endgames decrease the Galaxy Generator Instability Magnitude"
  }
};
