function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => Decimal.pow(10, config.initialCost * Math.pow(config.costIncrease, player.breakEternityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.breakEternityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakEternityUpgrades = {
  antimatterDimensionPow: rebuyable({
    name: "Exponentiation of Antimatter",
    id: 0,
    initialCost: 1e15,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Square All Antimatter Dimension Multipliers",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  infinityDimensionPow: rebuyable({
    name: "Exponentiation of Infinity",
    id: 1,
    initialCost: 1e16,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Square All Infinity Dimension Multipliers",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  timeDimensionPow: rebuyable({
    name: "Exponentiation of Time",
    id: 2,
    initialCost: 1e17,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Square All Time Dimension Multipliers",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiIntervalPow: rebuyable({
    name: "Exponentiation of Replication",
    id: 3,
    initialCost: 1e18,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(0.5, value),
    description: () => "Square-root the Replicanti Interval",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${format(value, 2, 3)}`,
    noLabel: false
  }),
  tachyonParticlePow: rebuyable({
    name: "Exponentiation of Dilation",
    id: 4,
    initialCost: 1e19,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Square Tachyon Particle Gain",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  galaxyScaleDelay: rebuyable({
    name: "Potency of Galaxies",
    id: 5,
    initialCost: 1e20,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => value * 10000,
    description: () => "Delay Distant/Remote Galaxy Scaling",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatInt(value)} Galaxies`,
    noLabel: false
  }),
  infinityPowerConversion: rebuyable({
    name: "Accumulation of Power",
    id: 6,
    initialCost: 1e21,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Double the Infinity Power Conversion Rate",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  epMultiplierDelay: rebuyable({
    name: "Obstruction of Softcaps",
    id: 7,
    initialCost: 1e22,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(10, value),
    description: () => `Raise the start of the 5x EP Multiplier Cost Scalings to ${formatPow(10)}`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiGalaxyPower: rebuyable({
    name: "Suspension of Scalings",
    id: 8,
    initialCost: 1e23,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Double the start of the Replicanti Galaxy Cost Scalings",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  dilatedTimeMultiplier: rebuyable({
    name: "Amplification of Multiplication",
    id: 9,
    initialCost: 1e24,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "Double the Per-Purchase Multiplier of the 2x Dilated Time Upgrade",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  doubleIPUncap: {
    name: "Increased Infinity",
    id: "doubleIPUncap",
    cost: Decimal.pow(10, 1e30),
    description: "Uncap the 2x IP Multiplier Upgrade"
  },
  tgThresholdUncap: {
    name: "Galactic Growth",
    id: "tgThresholdUncap",
    cost: Decimal.pow(10, 1e40),
    description: "Uncap the TG Threshold Upgrade and improve the formula"
  },
  tesseractMultiplier: {
    name: "Tesseract Traversement",
    id: "tesseractMultiplier",
    cost: Decimal.pow(10, 1e50),
    description: "Double all Effective Tesseracts",
    effect: 2
  },
  glyphSacrificeUncap: {
    name: "Sacrifice Supplementation",
    id: "glyphSacrificeUncap",
    cost: Decimal.pow(10, 1e70),
    description: "Uncap Glyph Sacrifice Values for all Glyphs"
  },
  glyphSlotImprovement: {
    name: "Potency Proliferation",
    id: "glyphSlotImprovement",
    cost: Decimal.pow(10, 1e100),
    description: "Add 3 more Glyph Slots outside Pelle",
    effect: 3
  },
};
