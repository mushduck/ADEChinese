import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const infinities = {
  total: {
    name: "每次无限获得的无限次数",
    isBase: true,
    multValue: () => gainedInfinities(),
    // The earliest sources of infinity multipliers are ach87 and TS32, which may happen in either order
    isActive: () => (Achievement(87).isUnlocked || PlayerProgress.eternityUnlocked()) &&
      !EternityChallenge(4).isRunning && !Pelle.isDoomed,
    overlay: ["∞", "<i class='fa-solid fa-arrows-rotate' />"],
  },
  achievement: {
    name: "成就",
    multValue: () => DC.D1.timesEffectsOf(
      Achievement(87),
      Achievement(131).effects.infinitiesGain,
      Achievement(164)
    ),
    isActive: () => Achievement(87).isUnlocked,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  timeStudy: {
    name: "时间研究 32",
    multValue: () => TimeStudy(32).effectOrDefault(1),
    isActive: () => TimeStudy(32).isBought,
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  timeStudy2: {
    name: "时间研究 191",
    multValue: 2,
    isActive: () => TimeStudy(191).isBought,
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  amplifierInf: {
    name: "现实升级——无界放大器",
    multValue: () => DC.D1.timesEffectsOf(RealityUpgrade(5)),
    isActive: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  realityUpgrades: {
    name: "现实升级——无尽造物",
    multValue: () => DC.D1.timesEffectsOf(RealityUpgrade(7)),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  glyph: {
    name: "已装备的符文",
    multValue: () => getAdjustedGlyphEffect("infinityinfmult"),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  ra: {
    name: "太阳神升级——基于时间之理的加成",
    multValue: () => Ra.unlocks.continuousTTBoost.effects.infinity.effectOrDefault(1),
    isActive: () => Ra.unlocks.continuousTTBoost.isUnlocked,
    icon: MultiplierTabIcons.GENERIC_RA,
  },
  singularity: {
    name: "奇点里程碑——来自奇点的指数",
    powValue: () => SingularityMilestone.infinitiedPow.effectOrDefault(1),
    isActive: () => SingularityMilestone.infinitiedPow.canBeApplied,
    icon: MultiplierTabIcons.SINGULARITY,
  },
};
