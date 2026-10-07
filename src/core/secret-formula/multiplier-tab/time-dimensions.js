import { PlayerProgress } from "../../player-progress";

import { MultiplierTabHelper } from "./helper-functions";
import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const TD = {
  total: {
    name: dim => {
      if (dim) return `第 ${dim} 时间维度加成`;
      if (EternityChallenge(7).isRunning) return "第八无限维度产量";
      return "时间碎片产量";
    },
    displayOverride: dim => (dim
      ? formatX(TimeDimension(dim).multiplier, 2)
      : `${format(TimeDimension(1).productionPerSecond, 2)}/秒`
    ),
    multValue: dim => (dim
      ? TimeDimension(dim).multiplier
      : TimeDimensions.all
        .filter(td => td.isProducing)
        .map(td => td.multiplier)
        .reduce((x, y) => x.times(y), DC.D1)),
    isActive: dim => (dim
      ? TimeDimension(dim).isProducing
      : (PlayerProgress.realityUnlocked() || TimeDimension(1).isProducing)),
    dilationEffect: () => {
      const baseEff = player.dilation.active
        ? 0.75 * Effects.product(DilationUpgrade.dilationPenalty)
        : 1;
      return baseEff * (Effarig.isRunning ? Effarig.multDilation : 1);
    },
    isDilated: true,
    overlay: ["Δ", "<i class='fa-solid fa-cube' />"],
    icon: dim => MultiplierTabIcons.DIMENSION("TD", dim),
  },
  purchase: {
    name: dim => (dim ? `第 ${dim} 时间维度的购买加成` : "购买加成"),
    multValue: dim => {
      const getMult = td => {
        const d = TimeDimension(td);
        const bought = td === 8 ? Math.clampMax(d.bought, 1e8) : d.bought;
        return Decimal.pow(d.powerMultiplier, bought);
      };
      if (dim) return getMult(dim);
      return TimeDimensions.all
        .filter(td => td.isProducing)
        .map(td => getMult(td.tier))
        .reduce((x, y) => x.times(y), DC.D1);
    },
    isActive: () => !EternityChallenge(2).isRunning && !EternityChallenge(10).isRunning,
    icon: dim => MultiplierTabIcons.PURCHASE("TD", dim),
  },
  highestDim: {
    name: () => `最高维度的数量`,
    displayOverride: () => {
      const dim = MultiplierTabHelper.activeDimCount("TD");
      return `TD ${dim}, ${formatInt(TimeDimension(dim).amount)}`;
    },
    multValue: () => TimeDimension(MultiplierTabHelper.activeDimCount("TD")).amount,
    isActive: () => TimeDimension(1).isProducing,
    icon: MultiplierTabIcons.DIMENSION("TD"),
  },

  basePurchase: {
    name: "基础购买加成",
    multValue: dim => {
      const getMult = td => Decimal.pow(4,
        td === 8 ? Math.clampMax(TimeDimension(td).bought, 1e8) : TimeDimension(td).bought);
      if (dim) return getMult(dim);
      return TimeDimensions.all
        .filter(td => td.isProducing)
        .map(td => getMult(td.tier))
        .reduce((x, y) => x.times(y), DC.D1);
    },
    isActive: dim => (dim
      ? ImaginaryUpgrade(14).canBeApplied || (dim === 8 && GlyphSacrifice.time.effectValue > 1)
      : TimeDimension(1).isProducing),
    icon: dim => MultiplierTabIcons.PURCHASE("TD", dim),
  },
  timeGlyphSacrifice: {
    name: "时间符文献祭",
    multValue: () => (TimeDimension(8).isProducing
      ? Decimal.pow(GlyphSacrifice.time.effectValue, Math.clampMax(TimeDimension(8).bought, 1e8))
      : DC.D1),
    isActive: () => GlyphSacrifice.time.effectValue > 1,
    icon: MultiplierTabIcons.SACRIFICE("time"),
  },
  powPurchase: {
    name: "虚幻升级——入侵之忆",
    powValue: () => ImaginaryUpgrade(14).effectOrDefault(1),
    isActive: () => ImaginaryUpgrade(14).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("imaginary"),
  },

  achievementMult: {
    name: "永恒升级——成就加成",
    multValue: dim => Decimal.pow(EternityUpgrade.tdMultAchs.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => EternityUpgrade.tdMultAchs.canBeApplied && !Pelle.isDoomed,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  achievement: {
    name: "成就奖励",
    multValue: dim => {
      const baseMult = DC.D1.timesEffectsOf(Achievement(105), Achievement(128));
      return Decimal.pow(baseMult, dim ? 1 : MultiplierTabHelper.activeDimCount("TD"));
    },
    isActive: () => Achievement(105).canBeApplied || Achievement(128).canBeApplied,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  timeStudy: {
    name: dim => (dim ? `时间研究（第 ${dim} 维）` : "时间研究"),
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        TimeStudy(93),
        TimeStudy(103),
        TimeStudy(151),
        TimeStudy(221),
        TimeStudy(301),
      );

      const dimMults = Array.repeat(DC.D1, 9);
      for (let tier = 1; tier <= 8; tier++) {
        dimMults[tier] = dimMults[tier].timesEffectsOf(
          tier === 1 ? TimeStudy(11) : null,
          tier === 3 ? TimeStudy(73) : null,
          tier === 4 ? TimeStudy(227) : null
        );
      }

      if (dim) return allMult.times(dimMults[dim]);
      let totalMult = DC.D1;
      for (let tier = 1; tier <= MultiplierTabHelper.activeDimCount("TD"); tier++) {
        totalMult = totalMult.times(dimMults[tier]).times(allMult);
      }
      return totalMult;
    },
    isActive: () => TimeDimension(1).isProducing,
    icon: MultiplierTabIcons.TIME_STUDY
  },
  eternityUpgrade: {
    name: dim => (dim ? `其他永恒升级（第 ${dim} 维）` : "其他永恒升级"),
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        EternityUpgrade.tdMultTheorems,
        EternityUpgrade.tdMultRealTime,
      );
      return Decimal.pow(allMult, dim ? 1 : MultiplierTabHelper.activeDimCount("TD"));
    },
    isActive: () => TimeDimension(1).isProducing,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },

  eu1: {
    name: () => "未花费的时间之理",
    multValue: dim => Decimal.pow(EternityUpgrade.tdMultTheorems.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => EternityUpgrade.tdMultTheorems.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },
  eu2: {
    name: () => "游玩的天数",
    multValue: dim => Decimal.pow(EternityUpgrade.tdMultRealTime.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => EternityUpgrade.tdMultRealTime.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },

  eternityChallenge: {
    name: dim => (dim ? `永恒挑战（第 ${dim} 维）` : "Eternity Challenges"),
    multValue: dim => {
      let allMult = DC.D1.timesEffectsOf(
        EternityChallenge(1).reward,
        EternityChallenge(10).reward,
      ).times(EternityChallenge(7).isRunning ? Tickspeed.perSecond : DC.D1);
      if (EternityChallenge(9).isRunning) {
        allMult = allMult.times(
          Decimal.pow(Math.clampMin(Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate / 7)
            .log2(), 1), 4).clampMin(1));
      }
      return Decimal.pow(allMult, dim ? 1 : MultiplierTabHelper.activeDimCount("TD"));
    },
    isActive: () => EternityChallenge(1).completions > 0,
    icon: MultiplierTabIcons.CHALLENGE("eternity")
  },
  tickspeed: {
    name: () => "计数频率（永恒挑战 7）",
    displayOverride: () => {
      const tickRate = Tickspeed.perSecond;
      const activeDims = MultiplierTabHelper.activeDimCount("TD");
      const dimString = MultiplierTabHelper.pluralizeDimensions(activeDims);
      return `${format(tickRate, 2, 2)}/秒 作用在 ${formatInt(activeDims)} ${dimString}
        ➜ ${formatX(tickRate.pow(activeDims), 2, 2)}`;
    },
    multValue: () => Tickspeed.perSecond.pow(MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => EternityChallenge(7).isRunning,
    icon: MultiplierTabIcons.TICKSPEED,
  },
  dilationUpgrade: {
    name: "膨胀升级——复制器加成",
    multValue: dim => {
      const mult = Replicanti.areUnlocked && Replicanti.amount.gt(1)
        ? DilationUpgrade.tdMultReplicanti.effectValue
        : DC.D1;
      return Decimal.pow(mult, dim ? 1 : MultiplierTabHelper.activeDimCount("TD"));
    },
    isActive: () => DilationUpgrade.tdMultReplicanti.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("dilation"),
  },
  realityUpgrade: {
    name: "现实升级——超越时光",
    multValue: dim => Decimal.pow(RealityUpgrade(22).effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => !Pelle.isDoomed && RealityUpgrade(22).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  glyph: {
    name: "符文效果",
    powValue: () => getAdjustedGlyphEffect("timepow") * getAdjustedGlyphEffect("effarigdimensions"),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH
  },
  alchemy: {
    name: "符文炼金",
    multValue: dim => Decimal.pow(AlchemyResource.dimensionality.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    powValue: () => AlchemyResource.time.effectOrDefault(1) * Ra.momentumValue,
    isActive: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
    icon: MultiplierTabIcons.ALCHEMY,
  },
  imaginaryUpgrade: {
    name: "虚幻升级——干涉之嫌",
    powValue: () => ImaginaryUpgrade(11).effectOrDefault(1),
    isActive: () => ImaginaryUpgrade(11).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("imaginary"),
  },
  pelle: {
    name: "佩勒裂痕效果",
    multValue: dim => Decimal.pow(PelleRifts.chaos.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    powValue: () => PelleRifts.paradox.effectOrDefault(DC.D1).toNumber(),
    isActive: () => Pelle.isDoomed,
    icon: MultiplierTabIcons.PELLE,
  },
  iap: {
    name: "内购",
    multValue: dim => Decimal.pow(ShopPurchase.allDimPurchases.currentMult,
      dim ? 1 : MultiplierTabHelper.activeDimCount("TD")),
    isActive: () => ShopPurchaseData.totalSTD > 0,
    icon: MultiplierTabIcons.IAP,
  },

  nerfV: {
    name: "薇的现实",
    powValue: () => 0.5,
    isActive: () => V.isRunning,
    icon: MultiplierTabIcons.GENERIC_V,
  },
  nerfCursed: {
    name: "诅咒符文",
    powValue: () => getAdjustedGlyphEffect("curseddimensions"),
    isActive: () => getAdjustedGlyphEffect("curseddimensions") !== 1,
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("cursed"),
  },
};
