export const permanentEndgameMasteries = [
  {
    id: 1,
    description: "Unlock Endgame Upgrades",
    cost: 20,
    requirement: () => {
      const esRequirement = Currency.endgameSkills.max.gte(EndgameMastery.endgameUpgrades.totalEndgameSkillRequirement);
      const emRequirement = [171].some(id => EndgameMastery(id).isBought);
      return emRequirement && esRequirement;
    }
  },
  {
    id: 2,
    description: "Make all above non-permanent Endgame Masteries free",
    cost: 100,
    requirement: () => {
      const esRequirement = Currency.endgameSkills.max.gte(EndgameMastery.permaMasteries.totalEndgameSkillRequirement);
      const emRequirement = EndgameMastery.endgameUpgrades.isBought;
      return emRequirement && esRequirement;
    }
  }
];
