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
  }
];
