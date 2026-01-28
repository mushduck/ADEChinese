//Time for spaghetti code
export function endgameMigration(player) {
  player.dimensionBoosts = new Decimal(player.dimensionBoosts);
  player.galaxies = new Decimal(player.galaxies);
  player.celestials.laitela.darkEnergy = new Decimal(player.celestials.laitela.darkEnergy);
  player.celestials.laitela.singularities = new Decimal(player.celestials.laitela.singularities);
  player.celestials.effarig.relicShards = new Decimal(player.celestials.effarig.relicShards);
  player.reality.glyphs.sac.power = new Decimal(player.reality.glyphs.sac.power);
  player.reality.glyphs.sac.infinity = new Decimal(player.reality.glyphs.sac.infinity);
  player.reality.glyphs.sac.time = new Decimal(player.reality.glyphs.sac.time);
  player.reality.glyphs.sac.replication = new Decimal(player.reality.glyphs.sac.replication);
  player.reality.glyphs.sac.dilation = new Decimal(player.reality.glyphs.sac.dilation);
  player.reality.glyphs.sac.effarig = new Decimal(player.reality.glyphs.sac.effarig);
  player.reality.glyphs.sac.reality = new Decimal(player.reality.glyphs.sac.reality);
  player.reality.imaginaryMachines = new Decimal(player.reality.imaginaryMachines);
  player.reality.iMCap = new Decimal(player.reality.iMCap);
  player.celestials.laitela.dimensions = Array.range(0, 8).map(() =>
    ({
      amount: new Decimal(0),
      intervalUpgrades: new Decimal(0),
      powerDMUpgrades: new Decimal(0),
      powerDEUpgrades: new Decimal(0),
      timeSinceLastUpdate: 0,
      ascensionCount: new Decimal(0)
    }));
  if (ImaginaryUpgrade(15).isBought) DarkMatterDimension(1).amount = new Decimal(1);
  if (ImaginaryUpgrade(16).isBought) DarkMatterDimension(2).amount = new Decimal(1);
  if (ImaginaryUpgrade(17).isBought) DarkMatterDimension(3).amount = new Decimal(1);
  if (ImaginaryUpgrade(18).isBought) DarkMatterDimension(4).amount = new Decimal(1);
  if (ImaginaryUpgrade(26).isBought) {
    ImaginaryUpgrade(26).isBought = false;
    Currency.imaginaryMachines.add(1e50);
  }
  if (ImaginaryUpgrade(27).isBought) {
    ImaginaryUpgrade(27).isBought = false;
    Currency.imaginaryMachines.add(1e100);
  }
  if (ImaginaryUpgrade(28).isBought) {
    ImaginaryUpgrade(28).isBought = false;
    Currency.imaginaryMachines.add(1e150);
  }
  if (ImaginaryUpgrade(29).isBought) {
    ImaginaryUpgrade(29).isBought = false;
    Currency.imaginaryMachines.add(1e200);
  }
  player.records.bestEndgame.time = new Decimal(player.records.bestEndgame.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestEndgame.time);
  player.records.bestEndgame.realTime = player.records.bestEndgame.realTime === 0
        ? 999999999999
        : player.records.bestEndgame.realTime;
  if (!GalacticPower.isUnlocked && player.endgame.galacticPower.gt(0)) player.endgame.galacticPower = new Decimal(0);
  player.celestials.teresa.perkShop = Array.repeat(0, 7);
  if (player.endgame.celestialPoints.lt(0)) player.endgame.celestialPoints = new Decimal(0);
  if (player.endgame.doomedParticles.lt(0)) player.endgame.doomedParticles = new Decimal(0);
  player.celestials.v.runRecords = [DC.E1.neg(), DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0];
  player.endgameMasteries.preferredPaths = [[], []];
}
