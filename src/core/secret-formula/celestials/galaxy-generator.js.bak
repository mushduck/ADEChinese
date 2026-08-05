const formatCost = c => format(c, 2);

const rebuyable = config => {
  const { id, description, cost, effect, formatEffect, currency, currencyLabel } = config;
  return {
    id,
    description,
    cost: () => cost(player.celestials.pelle.rebuyables[id]),
    formatCost,
    effect: (x = player.celestials.pelle.rebuyables[id]) => effect(x),
    formatEffect,
    currency,
    currencyLabel
  };
};

export const pelleGalaxyGeneratorUpgrades = {
  additive: rebuyable({
    id: "galaxyGeneratorAdditive",
    description: "Increase base Galaxy generation by 2",
    cost: x => Decimal.pow(3, x),
    effect: x => Decimal.pow(x * 2, DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1),
    formatEffect: x => `${format(x, 2, 2)}/s`,
    currency: () => Currency.galaxyGeneratorGalaxies,
    currencyLabel: "Galaxy"
  }),
  multiplicative: rebuyable({
    id: "galaxyGeneratorMultiplicative",
    description: "Multiply Galaxy generation",
    //The command "x > 10000 ? 10 : 1" is to prevent rounding error after the superscaling starts
    cost: x => Decimal.pow(10, Decimal.min(x, 10000)).times(x > 10000 ? 10 : 1).times(
      Decimal.pow(10, (Math.max(x-10001, 0)*(Math.max(x-10001, 0)+1)/2)+Math.max(x-10001, 0))),
    effect: x => Decimal.pow(2.5 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2, 1),
    currency: () => Currency.galaxyGeneratorGalaxies,
    currencyLabel: "Galaxy"
  }),
  antimatterMult: rebuyable({
    id: "galaxyGeneratorAntimatterMult",
    description: "Multiply Galaxy generation",
    cost: x => Decimal.pow("1e100000000", Decimal.pow(10, x)),
    effect: x => Decimal.pow(2 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2),
    currency: () => Currency.antimatter,
    currencyLabel: "Antimatter"
  }),
  IPMult: rebuyable({
    id: "galaxyGeneratorIPMult",
    description: "Multiply Galaxy generation",
    cost: x => Decimal.pow("1e2000000", Decimal.pow(100, x)),
    effect: x => Decimal.pow(2 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2),
    currency: () => Currency.infinityPoints,
    currencyLabel: "Infinity Point"
  }),
  EPMult: rebuyable({
    id: "galaxyGeneratorEPMult",
    description: "Multiply Galaxy generation",
    cost: x => Decimal.pow("1e10000", Decimal.pow(1000, x)),
    effect: x => Decimal.pow(2 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2),
    currency: () => Currency.eternityPoints,
    currencyLabel: "Eternity Point"
  }),
  RSMult: rebuyable({
    id: "galaxyGeneratorRSMult",
    description: "Multiply Galaxy generation",
    cost: x => new Decimal(1e100).times(Decimal.pow(1e10, x)),
    effect: x => Decimal.pow(2 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2),
    currency: () => Currency.realityShards,
    currencyLabel: "Reality Shard"
  }),
  DTMult: rebuyable({
    id: "galaxyGeneratorDTMult",
    description: "Multiply Galaxy generation",
    cost: x => {
      let c = DC.D1;
      if (x <= 20000) c = new Decimal(1e100).times(Decimal.pow(1e100, (Math.min(x, 20000)*(Math.min(x, 20000)+1)/2)+Math.min(x, 20000)));
      if (x > 20000) c = Decimal.pow10(2e10 * Math.pow(1.001, Math.max(x - 20000, 0)));
      return c;
    },
    effect: x => Decimal.pow(2 ** (DivinityMilestone.firstDivine.isReached && !player.disablePostReality ? 2 : 1), x),
    formatEffect: x => formatX(x, 2),
    currency: () => Currency.dilatedTime,
    currencyLabel: "Dilated Time"
  }),
  remnantPow: rebuyable({
    id: "galaxyGeneratorRemnantPow",
    description: "Empower Galaxy generation",
    cost: x => new Decimal(10).times(Decimal.pow10(x)),
    effect: x => 1 + x / (DivinityMilestone.hadronEmpowerment.isReached ? 240 : 400),
    formatEffect: x => formatPow(x, 2, 3),
    currency: () => Currency.remnants,
    currencyLabel: "Remnant"
  }),
  exponential: rebuyable({
    id: "galaxyGeneratorExponential",
    description: "Empower Galaxy generation",
    cost: x => new Decimal(1e100).times(Decimal.pow(1e100, (x*(x+1)/2)+x)),
    effect: x => 1 + x / 200,
    formatEffect: x => formatPow(x, 2, 3),
    currency: () => Currency.galaxyGeneratorGalaxies,
    currencyLabel: "Galaxy"
  }),
  superExponential: rebuyable({
    id: "galaxyGeneratorSuperExponential",
    description: "Dilate Galaxy generation",
    cost: x => Decimal.pow(1e100, Decimal.pow(2, x)),
    effect: x => 1 + x / 1000,
    formatEffect: x => formatPow(x, 2, 3),
    currency: () => Currency.galaxyGeneratorGalaxies,
    currencyLabel: "Galaxy"
  })
};
