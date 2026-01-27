export const Ethereal = {
  get isUnlocked() {
    return GalacticPowers.etherealUnlock.isUnlocked;
  },
  get cosmicSector() {
    return player.endgame.ethereal.sector;
  },
  get sectorThreshold() {
    return Decimal.pow(this.cosmicSector, this.cosmicSector);
  },
  get sectorBoost() {
    //if (Alpha.isRunning) return Decimal.pow(2, this.cosmicSector - 1);
    return Decimal.pow(2, Math.pow(this.cosmicSector - 1, 2));
  }
};

export function getEtherealPowerGainPerSecond() {
  const cpFactor = Decimal.pow(Decimal.log10(player.endgame.celestialPoints.add(1)).div(100), 10);
  const singFactor = Decimal.pow(Decimal.log10(player.celestials.laitela.singularities.add(1)).div(20000), 3);
  const rmFactor = Decimal.pow(Decimal.log10(Decimal.log10(player.reality.realityMachines.add(1)).add(1)).div(5), 75);
  const gpFactor = Decimal.pow(Decimal.log10(Decimal.max(player.endgame.galacticPower, DC.NUMMAX)).div(308.25), 5);
  return cpFactor.times(singFactor).times(rmFactor).times(gpFactor).div(1000);
}

export function tryAdvanceSector() {
  if (Currency.etherealPower.lt(Ethereal.sectorThreshold)) return;
  player.endgame.ethereal.sector++;
}
