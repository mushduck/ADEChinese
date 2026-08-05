import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const eternities = {
  total: {
    name: "每次永恒获得的永恒点数",
    isBase: true,
    multValue: () => gainedEternities(),
    isActive: () => (PlayerProgress.realityUnlocked() || Achievement(113).isUnlocked) && !Pelle.isDoomed,
    overlay: ["Δ", "<i class='fa-solid fa-arrows-rotate' />"],
  },
  achievement: {
    name: "成就 113",
    multValue: () => Achievement(113).effectOrDefault(1),
    isActive: () => Achievement(113).canBeApplied,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  amplifierEter: {
    name: "现实升级 - 永恒放大器",
    multValue: () => RealityUpgrade(3).effectOrDefault(1),
    isActive: () => RealityUpgrade(3).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  glyph: {
    name: "已装备的符文",
    multValue: () => getAdjustedGlyphEffect("timeetermult"),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  ra: {
    name: "太阳神升级——基于时间之理的加成",
    multValue: () => Ra.unlocks.continuousTTBoost.effects.eternity.effectOrDefault(1),
    isActive: () => Ra.unlocks.continuousTTBoost.isUnlocked,
    icon: MultiplierTabIcons.GENERIC_RA,
  },
  alchemy: {
    name: "炼金资源——永恒",
    powValue: () => AlchemyResource.eternity.effectOrDefault(1),
    isActive: () => AlchemyResource.eternity.canBeApplied,
    icon: MultiplierTabIcons.ALCHEMY,
  },
};
