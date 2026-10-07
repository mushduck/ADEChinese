import { PlayerProgress } from "../../player-progress";

import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const EP = {
  total: {
    name: "永恒后获得的永恒点数总量",
    displayOverride: () => (Player.canEternity
      ? format(gainedEternityPoints(), 2, 2)
      : "无法永恒"),
    // This effectively hides everything if the player can't actually gain any
    multValue: () => (Player.canEternity ? gainedEternityPoints() : 1),
    isActive: () => PlayerProgress.eternityUnlocked() || Player.canEternity,
    dilationEffect: () => (Laitela.isRunning ? 0.75 * Effects.product(DilationUpgrade.dilationPenalty) : 1),
    isDilated: true,
    overlay: ["Δ", "<i class='fa-solid fa-layer-group' />"],
  },
  base: {
    name: "基础永恒点数",
    isBase: true,
    fakeValue: DC.D5,
    multValue: () => DC.D5.pow(player.records.thisEternity.maxIP.plus(
      gainedInfinityPoints()).log10() / (308 - PelleRifts.recursion.effectValue.toNumber()) - 0.7),
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.CONVERT_FROM("IP"),
  },
  IP: {
    name: "来自无限点数的永恒点数",
    displayOverride: () => `${format(player.records.thisEternity.maxIP.plus(gainedInfinityPoints()), 2, 2)} IP`,
    // Just needs to match the value in base and be larger than 1
    multValue: DC.D5,
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("infinity"),
  },
  divisor: {
    name: "佩勒——改善永恒点数公式",
    displayOverride: () => {
      const div = 308 - PelleRifts.recursion.effectValue.toNumber();
      return `log(IP)/${formatInt(308)} ➜ log(IP)/${format(div, 2, 2)}`;
    },
    powValue: () => 308 / (308 - PelleRifts.recursion.effectValue.toNumber()),
    isActive: () => PelleRifts.recursion.canBeApplied,
    icon: MultiplierTabIcons.DIVISOR("EP"),
  },
  eternityUpgrade: {
    name: () => `永恒升级——可重复购买的 ${formatX(5)} 永恒点数倍增`,
    multValue: () => EternityUpgrade.epMult.effectOrDefault(1),
    isActive: () => PlayerProgress.eternityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },
  timeStudy: {
    name: "时间研究",
    multValue: () => DC.D1.timesEffectsOf(
      TimeStudy(61),
      TimeStudy(121),
      TimeStudy(122),
      TimeStudy(123),
    ),
    isActive: () => PlayerProgress.eternityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  glyph: {
    name: "已装备的符文",
    multValue: () => DC.D1
      .timesEffectsOf(Pelle.isDoomed ? null : GlyphEffect.epMult)
      .times(Pelle.specialGlyphEffect.time),
    powValue: () => (GlyphAlteration.isAdded("time") ? getSecondaryGlyphEffect("timeEP") : 1),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  realityUpgrade: {
    name: "现实升级——先验存在",
    multValue: () => RealityUpgrade(12).effectOrDefault(1),
    isActive: () => RealityUpgrade(12).canBeApplied && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  pelle: {
    name: "佩勒冲击——空洞裂痕",
    multValue: () => PelleRifts.vacuum.milestones[2].effectOrDefault(1),
    isActive: () => PelleRifts.vacuum.milestones[2].canBeApplied,
    icon: MultiplierTabIcons.PELLE,
  },
  iap: {
    name: "内购",
    multValue: () => ShopPurchase.EPPurchases.currentMult,
    isActive: () => ShopPurchaseData.totalSTD > 0,
    icon: MultiplierTabIcons.IAP,
  },

  nerfTeresa: {
    name: "特蕾莎的现实",
    powValue: () => 0.55,
    isActive: () => Teresa.isRunning,
    icon: MultiplierTabIcons.GENERIC_TERESA,
  },
  nerfV: {
    name: "薇的现实",
    powValue: () => 0.5,
    isActive: () => V.isRunning,
    icon: MultiplierTabIcons.GENERIC_V,
  },
};
