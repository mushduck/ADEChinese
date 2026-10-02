export const permanentEndgameMasteries = [
  {
    id: 1,
    description: "解锁终局升级",
    cost: 20,
    requirement: () => {
      const esRequirement = Currency.endgameSkills.max.gte(EndgameMastery.endgameUpgrades.totalEndgameSkillRequirement);
      const emRequirement = [171].some(id => EndgameMastery(id).isBought);
      return emRequirement && esRequirement;
    }
  },
  {
    id: 2,
    description: "使上述所有可以在终局后重置的终局专精无需任何资源即可购买",
    cost: 100,
    requirement: () => {
      const esRequirement = Currency.endgameSkills.max.gte(EndgameMastery.permaMasteries.totalEndgameSkillRequirement);
      const emRequirement = EndgameMastery.endgameUpgrades.isBought;
      return emRequirement && esRequirement;
    }
  },
  {
    id: 3,
    description: "Unlock Time Compression",
    cost: 7000000,
    requirement: () => {
      const esRequirement = Currency.endgameSkills.max.gte(EndgameMastery.timeCompression.totalEndgameSkillRequirement);
      const emRequirement = [271, 272, 273, 274].every(id => EndgameMastery(id).isBought);
      return emRequirement && esRequirement;
    }
  }
];
