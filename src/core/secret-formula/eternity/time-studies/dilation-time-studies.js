export const dilationTimeStudies = [
  {
    id: 1,
    description: "解锁时间膨胀",
    cost: () => Alpha.isRunning ? AlphaUnlocks.ec11Bulk.effects.nerfA.effectOrDefault(5000) : 5000,
    requirement: () => {
      const ttRequirement = Currency.timeTheorems.max.gte(TimeStudy.dilation.totalTimeTheoremRequirement);
      if ((Ra.unlocks.autoUnlockDilation.canBeApplied && !player.disablePostReality) &&
          ttRequirement &&
          !isInCelestialReality() && !Pelle.isDoomed
      ) {
        return true;
      }
      const tsRequirement = [231, 232, 233, 234].some(id => TimeStudy(id).isBought);
      if (Perk.bypassECDilation.canBeApplied && !player.disablePostReality) return tsRequirement;
      const ecRequirement = EternityChallenge(11).isFullyCompleted && EternityChallenge(12).isFullyCompleted;
      return tsRequirement && ecRequirement && ttRequirement;
    }
  },
  {
    id: 2,
    description: "解锁第五时间维度",
    cost: 1e6,
    requirement: () => PlayerProgress.dilationUnlocked()
  },
  {
    id: 3,
    description: "解锁第六时间维度",
    cost: 1e7,
    requirement: () => TimeStudy.timeDimension(5).isBought
  },
  {
    id: 4,
    description: "解锁第七时间维度",
    cost: 1e8,
    requirement: () => TimeStudy.timeDimension(6).isBought
  },
  {
    id: 5,
    description: "解锁第八时间维度",
    cost: 1e9,
    requirement: () => TimeStudy.timeDimension(7).isBought
  },
  {
    id: 6,
    description: () => {
      if (Pelle.isDoomed) {
        if (player.celestials.pelle.galaxyGenerator.unlocked) return "*";
        return "你无法逃离已被毁灭的现实！";
      }
      if (!Pelle.isDoomed) return "解锁现实";
    },
    scrambleText: ["你无法逃离已被毁灭的现实！", "逃离已被毁灭的现实(需要e9e15反物质）"],
    cost: 1,
    requirement: () => TimeStudy.timeDimension(8).isBought &&
      player.records.thisReality.maxEP.log10().gte(4000) &&
      (Perk.firstPerk.isBought || Achievements.preReality.every(a => a.isUnlocked)) &&
      !Pelle.isDoomed
  }
];
