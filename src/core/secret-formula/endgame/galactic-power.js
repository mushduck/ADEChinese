export const galacticPowerRewards = {
  galaxyStrength: {
    id: 1,
    galacticPower: 0,
    reward: "Increase Galaxy Strength",
    effect: () => Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(10), 3).add(1).toNumber(),
    formatEffect: value => `Galaxies are ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} stronger`
  },
  remoteGalaxyScale: {
    id: 2,
    galacticPower: 1e10,
    reward: "Delay Remote Galaxy Scaling",
    effect: () => Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).times(5), 2).toNumber(),
    formatEffect: value => `Remote Galaxy Scaling is delayed by ${formatInt(value)} Galaxies`
  },
  remoteGalaxyPower: {
    id: 3,
    galacticPower: 1e20,
    reward: "Weaken Remote Galaxy Scaling",
    effect: () => DC.D1.sub(((Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)), 0.5).times(5)).div(100))).toNumber(),
    formatEffect: value => `Remote Galaxy Scaling is ${formatPercents(1 - value, 2, 2)} weaker`
  },
  galGenInstability1: {
    id: 4,
    galacticPower: 1e50,
    reward: "Delay the first Galaxy Generator Instability Threshold",
    effect: () => Decimal.pow(10, Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).times(50)).toNumber(),
    formatEffect: value => `The first Galaxy Generator Instability Threshold is delayed by ${formatX(value, 2, 2)} Galaxies`
  },
  replicantiGalaxies: {
    id: 5,
    galacticPower: 1e100,
    reward: "Multiply Replicanti Galaxy gain",
    effect: () => Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.25).add(1).toNumber(),
    formatEffect: value => `Gain ${formatX(value, 2, 2)} more Replicanti Galaxies`
  },
  tachyonGalaxies: {
    id: 6,
    galacticPower: 1e150,
    reward: "Decrease the Tachyon Galaxy Threshold Multiplier",
    effect: () => Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(200), 3).add(1).toNumber(),
    formatEffect: value => `Apply a ${format(value, 2, 2)}th root to the Tachyon Galaxy Threshold Multiplier`
  },
  galGenInstability2: {
    id: 7,
    galacticPower: 1e200,
    reward: "Decrease the power of the second Galaxy Generator Instability Magnitude",
    effect: () => (Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.5).div(10)).add(1).toNumber(),
    formatEffect: value => `Apply a ${format(value, 2, 2)}th root to the second Galaxy Generator Instability Magnitude`
  },
  etherealUnlock: {
    id: 8,
    galacticPower: Number.MAX_VALUE,
    reward: "Unlock the Ethereal"
  },
};
