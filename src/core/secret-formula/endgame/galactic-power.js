export const galacticPowerRewards = {
  galaxyStrength: {
    id: 1,
    galacticPower: 0,
    reward: "Increase Galaxy Strength",
    effect: () => 1 + Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)) / 10, 3),
    formatEffect: value => `Galaxies are ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} stronger`
  },
  remoteGalaxyScale: {
    id: 2,
    galacticPower: 1e10,
    reward: "Delay Remote Galaxy Scaling",
    effect: () => Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)) * 5, 2),
    formatEffect: value => `Remote Galaxy Scaling is delayed by ${formatInt(value)} Galaxies`
  },
  remoteGalaxyPower: {
    id: 3,
    galacticPower: 1e20,
    reward: "Weaken Remote Galaxy Scaling",
    effect: () => 1 - ((Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)), 0.5) * 5) / 100),
    formatEffect: value => `Remote Galaxy Scaling is ${formatPercents(1 - value, 2, 2)} weaker`
  },
  galGenInstability1: {
    id: 4,
    galacticPower: 1e50,
    reward: "Delay the first Galaxy Generator Instability Threshold",
    effect: () => Math.pow(10, Decimal.log10(Currency.galacticPower.value.add(1)) / Decimal.log10(Decimal.NUMBER_MAX_VALUE) * 50),
    formatEffect: value => `The first Galaxy Generator Instability Threshold is delayed by ${formatX(value, 2, 2)} Galaxies`
  },
  replicantiGalaxies: {
    id: 5,
    galacticPower: 1e100,
    reward: "Multiply Replicanti Galaxy gain",
    effect: () => 1 + Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)) / 100, 1.25),
    formatEffect: value => `Gain ${formatX(value, 2, 2)} more Replicanti Galaxies`
  },
  tachyonGalaxies: {
    id: 6,
    galacticPower: 1e150,
    reward: "Decrease the Tachyon Galaxy Threshold Multiplier",
    effect: () => 1 + Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)) / 200, 3),
    formatEffect: value => `Apply a ${format(value, 2, 2)}th root to the Tachyon Galaxy Threshold Multiplier`
  },
  galGenInstability2: {
    id: 7,
    galacticPower: 1e200,
    reward: "Decrease the power of the second Galaxy Generator Instability Magnitude",
    effect: () => 1 + (Math.pow(Decimal.log10(Currency.galacticPower.value.add(1)) / 100, 1.5) / 10),
    formatEffect: value => `Apply a ${format(value, 2, 2)}th root to the second Galaxy Generator Instability Magnitude`
  },
  ethrealUnlock: {
    id: 8,
    galacticPower: Number.MAX_VALUE,
    reward: "Unlock the Ethreal"
  },
};
