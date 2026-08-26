import { PlayerProgress } from "../../player-progress";

import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
// Note most of the isActive entries in here have redundant-looking DT/s != 0 checks because DT is treated as a
// special case due to not being a prestige currency but still needing to be treated like one in the UI. This
// is because it requires dilation to be unlocked, which isn't a given, and we want the tab continuously visible
// after the first ever dilation unlock on the 0th reality
export const DT = {
  total: {
    name: "膨胀时间获取量",
    displayOverride: () => `${format(getDilationGainPerSecond().times(getGameSpeedupForDisplay()), 2, 2)}/秒`,
    multValue: () => getDilationGainPerSecond().times(getGameSpeedupForDisplay()),
    isActive: () => PlayerProgress.realityUnlocked() ||
      (PlayerProgress.dilationUnlocked() && getDilationGainPerSecond().gt(0)),
    dilationEffect: () => (Enslaved.isRunning ? 0.85 : 1),
    isDilated: true,
    overlay: ["Ψ"],
  },
  achievement: {
    name: "成就",
    multValue: () => Achievement(132).effectOrDefault(1) * Achievement(137).effectOrDefault(1),
    isActive: () => (Achievement(132).canBeApplied || Achievement(137).canBeApplied) &&
      getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  dilation: {
    name: "可重复购买的膨胀升级",
    multValue: () => DC.D1.timesEffectsOf(
      DilationUpgrade.dtGain,
      DilationUpgrade.dtGainPelle,
      DilationUpgrade.flatDilationMult
    ),
    isActive: () => DC.D1.timesEffectsOf(
      DilationUpgrade.dtGain,
      DilationUpgrade.dtGainPelle,
      DilationUpgrade.flatDilationMult
    ).gt(1),
    icon: MultiplierTabIcons.UPGRADE("dilation"),
  },
  amplifierDT: {
    name: "现实升级——时间放大器",
    multValue: () => RealityUpgrade(1).effectOrDefault(1),
    isActive: () => RealityUpgrade(1).canBeApplied && getDilationGainPerSecond().neq(0) && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  glyph: {
    name: "符文效果",
    multValue: () => {
      const dtMult = getAdjustedGlyphEffect("dilationDT").times(Pelle.specialGlyphEffect.dilation);
      const repliDT = Replicanti.areUnlocked
        ? Math.clampMin(Decimal.log10(Replicanti.amount) * getAdjustedGlyphEffect("replicationdtgain"), 1)
        : DC.D1;
      return dtMult.times(repliDT);
    },
    isActive: () => PlayerProgress.realityUnlocked() && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.GENERIC_GLYPH
  },
  ra1: {
    name: "太阳神升级——基于时间之理的加成",
    multValue: () => DC.D1.timesEffectsOf(Ra.unlocks.continuousTTBoost.effects.dilatedTime),
    isActive: () => Ra.unlocks.autoTP.canBeApplied && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.GENERIC_RA,
  },
  ra2: {
    name: "太阳神升级——基于游戏速度峰值的加成",
    multValue: () => DC.D1.timesEffectsOf(Ra.unlocks.peakGamespeedDT),
    isActive: () => Ra.unlocks.autoTP.canBeApplied && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.GENERIC_RA,
  },
  alchemy: {
    name: "符文炼金",
    multValue: () => AlchemyResource.dilation.effectOrDefault(1),
    isActive: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.ALCHEMY,
  },
  iap: {
    name: "内购",
    multValue: () => new Decimal(ShopPurchase.dilatedTimePurchases.currentMult ** (Pelle.isDoomed ? 0.5 : 1)),
    isActive: () => ShopPurchaseData.totalSTD > 0 && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.IAP,
  },

  nerfV: {
    name: "薇的现实",
    powValue: () => 0.5,
    isActive: () => V.isRunning && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.GENERIC_V,
  },
  nerfPelle: {
    name: "被毁灭的现实",
    multValue: 1e-5,
    isActive: () => Pelle.isDoomed && getDilationGainPerSecond().neq(0),
    icon: MultiplierTabIcons.PELLE,
  },
  gamespeed: {
    name: "当前游戏速度",
    multValue: () => getGameSpeedupForDisplay(),
    isActive: () => getGameSpeedupForDisplay() > 1 && getDilationGainPerSecond().neq(0),
    ignoresNerfPowers: true,
    icon: MultiplierTabIcons.GAMESPEED,
  },
};
