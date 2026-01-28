export const endgameMilestones = {
  riftFill: {
    endgames: 1,
    reward: () => {
      return `Rift Fill is ${formatPercents(0.05)} faster per Endgame, capping at ${formatPercents(0.45)} after ${formatInt(9)} Endgames ` + 
        (player.endgames >= 1
         ? (player.endgames >= 9 ? "(Capped: " : "(Currently: ") + `+${formatPercents(Math.min(0.45, player.endgames * 0.05))})`
         : "(You have not yet reached this milestone)");
    }
  },
  remnantGalaxy: {
    endgames: 2,
    reward: () => {
      return "You gain a multiplier to Galaxy strength based on Remnants " +
        (player.endgames >= 2 && Pelle.isDoomed
         ? `(Currently: +${formatPercents(Math.pow(1 + Math.log10(Currency.remnants.value + 1), 0.5) - 1, 2, 2)})`
         : (player.endgames < 2 ? "(You have not yet reached this milestone)" : "(Currently has no effect)"));
    }
  },
  galGenAnimation: {
    endgames: 5,
    reward: () => {
      return `Galaxy Generator Animations are ${formatX(1.2, 0, 1)} faster every ${formatInt(5)} Endgames, capping after ${formatInt(100)} Endgames ` + 
        (player.endgames >= 5
         ? (player.endgames >= 100 ? "(Capped: " : "(Currently: ") + `${formatX(Math.pow(1.2, Math.floor(Math.min(Currency.endgames.value, 100) / 5)), 2, 2)})`
         : "(You have not yet reached this milestone)");
    }
  },
  fasterGalaxies: {
    endgames: 10,
    reward: "Unlock a new Galaxy Generator Upgrade"
  },
  remnantFormula: {
    endgames: 15,
    reward: "Improve the Remnant Formula (see Remnant Gain Factors in the Pelle subtab)"
  },
  gameSpeedUncap: {
    endgames: 25,
    reward: () => {
      return `Remove the ${format(1e300, 2, 2)} Game Speed Hardcap`;
    }
  },
  celestialEarlyUnlock: {
    endgames: 50,
    reward: () => {
      return `Start Endgames with the first ${formatInt(6)} Celestials unlocked`;
    }
  },
  realityShardDTBoost: {
    endgames: 100,
    reward: () => {
      return "Dilated Time gain is multiplied by your Reality Shard count " + 
        (player.endgames >= 100
         ? `(Currently: ${formatX(Currency.realityShards.value.plus(1), 2, 2)})`
         : "(You have not yet reached this milestone)");
    }
  },
  moreFasterGalaxies: {
    endgames: 250,
    reward: () => {
      return "Endgames boost Galaxy Production in Pelle " + 
        (player.endgames >= 250
         ? `(Currently: ${formatX(Decimal.pow(10, Math.min(Currency.endgames.value / 200, 50)).times(Decimal.pow(10, Math.max((Math.log10(Currency.endgames.value + 1) - 4) * 50, 0))), 2, 2)})`
         : "(You have not yet reached this milestone)");
    }
  },
  autobuyerEndgame: {
    endgames: 1000,
    reward: "Unlock autobuyer for Endgames"
  },
  endgameAntimatter: {
    endgames: 10000,
    reward: () => {
      return "Gain a power to Antimatter Production based on Endgames, which is stronger in Pelle " + 
        (player.endgames >= 10000
         ? `(Currently: ${formatPow(Pelle.isDoomed ? 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 80) : 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 200), 2, 3)})`
         : "(You have not yet reached this milestone)");
    }
  },
  instabilityReduction: {
    endgames: 1000000,
    reward: () => {
      return "Endgames decrease the Galaxy Generator Instability Magnitude " + 
        (player.endgames >= 1000000
         ? `(Currently: ${formatPow(Math.pow(1 / Math.log10(Currency.endgames.value + 1), 0.1), 2, 3)})`
         : "(You have not yet reached this milestone)");
    }
  }
};
