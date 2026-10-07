import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const AM = {
  total: {
    name: "反物质生产",
    displayOverride: () => `${format(Currency.antimatter.productionPerSecond, 2, 2)}/秒`,
    multValue: () => new Decimal(Currency.antimatter.productionPerSecond).clampMin(1),
    isActive: true,
    overlay: ["<i class='fas fa-atom' />"],
  },
  effarigAM: {
    name: "符文效果——反物质产量指数",
    powValue: () => {
      const ad1 = AntimatterDimension(1);
      const baseProd = ad1.totalAmount.times(ad1.multiplier).times(Tickspeed.perSecond);
      return Math.pow(baseProd.log10(), getAdjustedGlyphEffect("effarigantimatter") - 1);
    },
    isActive: () => getAdjustedGlyphEffect("effarigantimatter") > 1 && AntimatterDimension(1).isProducing,
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("effarig"),
  }
};
