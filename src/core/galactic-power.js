export class GalacticPowerState {
  constructor(config) {
    this.config = config;
  }

  get id() {
    return this.config.id;
  }

  get reward() {
    return this.config.effect();
  }

  get unlockGP() {
    return this.config.galacticPower;
  }

  get isUnlocked() {
    return Currency.galacticPower.gte(this.unlockGP);
  }
}

export const GalacticPowers = mapGameDataToObject(
  GameDatabase.endgame.galacticPowers,
  config => (config.isBaseResource
    ? new GalacticPowerState(config)
    : new GalacticPowerState(config))
);

export const GalacticPower = {
  get isUnlocked() {
    return SingularityMilestone.galacticPower.isUnlocked || Currency.galacticPower.gt(0);
  },
  get nextPower() {
    return GalacticPowers.all.find(x => !x.isUnlocked);
  },
  get nextPowerUnlockGP() {
    return this.nextPower?.unlockGP;
  }
};

export function getGalacticPowerGainPerSecond() {
  const allGalaxies = Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies);
  const galaxyFactor = Decimal.max(allGalaxies.div(100000), 1).toNumber();
  const celMatterFactor = Math.max(Math.pow(Decimal.log10(player.endgame.celestialMatter.add(1)) / 10, 4), 1);
  const imaginaryFactor = Math.max(Math.pow(Decimal.log10(player.reality.imaginaryMachines.add(1)), 2.5), 1);
  const staticDivisor = 1e7;
  const base = galaxyFactor * celMatterFactor * imaginaryFactor / staticDivisor;
  const galaxyExponent1 = Decimal.max(Decimal.min(Decimal.pow(allGalaxies.div(1680000), 6.4), 4), 1).toNumber();
  const galaxyExponent2 = Decimal.max(Decimal.min(Decimal.pow(allGalaxies.div(1960000), 15), 5), 1).toNumber();
  const galaxyExponent3 = Decimal.max(Decimal.min(Decimal.pow(allGalaxies.div(2160000), 5), 1.6), 1).toNumber();
  const galaxyExponent4 = Decimal.max(Decimal.min(Decimal.pow(allGalaxies.div(4500000), 0.75), 1.25), 1).toNumber();
  const galaxyExponent5 = Decimal.max(Decimal.min(Decimal.pow(allGalaxies.div(6000000), 0.5), 2.5), 1).toNumber();
  const exponent = galaxyExponent1 * galaxyExponent2 * galaxyExponent3 * galaxyExponent4 * galaxyExponent5;
  return Pelle.isDoomed ? new Decimal(0) : Decimal.pow(base, exponent);
}
