import { MultiplierTabHelper } from "./helper-functions";
import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const tickspeed = {
  total: {
    name: "总计数频率",
    displayOverride: () => {
      const tickRate = Tickspeed.perSecond;
      const activeDims = MultiplierTabHelper.activeDimCount("AD");
      const dimString = MultiplierTabHelper.pluralizeDimensions(activeDims);
      return `${format(tickRate, 2, 2)}/秒 作用在 ${formatInt(activeDims)} ${dimString}
        ➜ ${formatX(tickRate.pow(activeDims), 2, 2)}`;
    },
    // This is necessary to make multValue entries from the other props scale properly, which are also all pow10
    // due to the multiplier tab splitting up entries logarithmically
    fakeValue: DC.E100,
    multValue: () => Tickspeed.perSecond.pow(MultiplierTabHelper.activeDimCount("AD")),
    // No point in showing this breakdown at all unless both components are nonzero; however they will always be nonzero
    // due to the way the calculation works, so we have to manually hide it here
    isActive: () => Tickspeed.perSecond.gt(1) && effectiveBaseGalaxies() > 0,
    dilationEffect: () => (Effarig.isRunning ? Effarig.tickDilation : 1),
    overlay: ["<i class='fa-solid fa-clock' />"],
    icon: MultiplierTabIcons.TICKSPEED,
  },
  base: {
    name: "来自成就的基础计数频率",
    displayOverride: () => {
      const val = DC.D1.dividedByEffectsOf(
        Achievement(36),
        Achievement(45),
        Achievement(66),
        Achievement(83)
      );
      return `${format(val, 2, 2)}/秒`;
    },
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().base),
    isActive: () => [36, 45, 66, 83].some(a => Achievement(a).canBeApplied),
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  upgrades: {
    name: "计数频率提升",
    displayOverride: () => `共计 ${formatInt(Tickspeed.totalUpgrades)} 个`,
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().tickspeed),
    isActive: true,
    icon: MultiplierTabIcons.PURCHASE("AD"),
  },
  galaxies: {
    name: "星系",
    displayOverride: () => {
      const ag = player.galaxies + GalaxyGenerator.galaxies;
      const rg = Replicanti.galaxies.total;
      const tg = player.dilation.totalTachyonGalaxies;
      return `共计 ${formatInt(ag + rg + tg)} 个`;
    },
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().galaxies),
    isActive: true,
    icon: MultiplierTabIcons.GALAXY,
  },
  pelleTickspeedPow: {
    name: "计数频率膨胀升级",
    powValue: () => DilationUpgrade.tickspeedPower.effectValue,
    isActive: () => DilationUpgrade.tickspeedPower.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("dilation"),
  },
};

export const tickspeedUpgrades = {
  purchased: {
    name: "购买的计数频率提升",
    displayOverride: () => (Laitela.continuumActive
      ? formatFloat(Tickspeed.continuumValue, 2, 2)
      : formatInt(player.totalTickBought)),
    multValue: () => Decimal.pow10(Laitela.continuumActive ? Tickspeed.continuumValue : player.totalTickBought),
    isActive: () => true,
    icon: MultiplierTabIcons.PURCHASE("AD"),
  },
  free: {
    name: "来自时间维度的计数频率提升",
    displayOverride: () => formatInt(player.totalTickGained),
    multValue: () => Decimal.pow10(player.totalTickGained),
    isActive: () => Currency.timeShards.gt(0),
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("time"),
  }
};
