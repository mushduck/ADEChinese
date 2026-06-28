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
  if (player.celestials.laitela.dimensions.length !== 8) {
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
  }
  player.records.bestEndgame.time = new Decimal(player.records.bestEndgame.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestEndgame.time);
  player.records.bestEndgame.realTime = player.records.bestEndgame.realTime === 0
        ? 999999999999
        : player.records.bestEndgame.realTime;
  if (!GalacticPower.isUnlocked && player.endgame.galacticPower.gt(0)) player.endgame.galacticPower = new Decimal(0);
  if (player.celestials.teresa.perkShop.length !== 7) player.celestials.teresa.perkShop = Array.repeat(0, 7);
  if (player.endgame.celestialPoints.lt(0)) player.endgame.celestialPoints = new Decimal(0);
  if (player.endgame.doomedParticles.lt(0)) player.endgame.doomedParticles = new Decimal(0);
  if (!(player.celestials.v.runRecords[0] instanceof Decimal)) {
    player.celestials.v.runRecords = [DC.E1.neg(), DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0];
  }
  if (player.endgameMasteries.preferredPaths[1] === 0) player.endgameMasteries.preferredPaths = [[], []];
  if (Achievement(201).isUnlocked) {
    Achievement(201).lock();
    Achievement(211).unlock();
  }
  if (Achievement(202).isUnlocked) {
    Achievement(202).lock();
    Achievement(212).unlock();
  }
  if (Achievement(203).isUnlocked) {
    Achievement(203).lock();
    Achievement(213).unlock();
  }
  if (Achievement(204).isUnlocked) {
    Achievement(204).lock();
    Achievement(221).unlock();
  }
  if (Achievement(205).isUnlocked) {
    Achievement(205).lock();
    Achievement(215).unlock();
  }
  if (Achievement(206).isUnlocked) {
    Achievement(206).lock();
    Achievement(216).unlock();
  }
  if (Achievement(207).isUnlocked) {
    Achievement(207).lock();
    Achievement(224).unlock();
  }
  if (Achievement(208).isUnlocked) {
    Achievement(208).lock();
  }
  if (Achievement(195).isUnlocked) {
    Achievement(195).lock();
    Achievement(204).unlock();
  }
  if (Achievement(196).isUnlocked) {
    Achievement(196).lock();
    Achievement(206).unlock();
  }
  if (Achievement(197).isUnlocked) {
    Achievement(197).lock();
    Achievement(207).unlock();
  }
  if (Achievement(198).isUnlocked) {
    Achievement(198).lock();
    Achievement(208).unlock();
  }
  if (Achievement(194).isUnlocked) {
    Achievement(194).lock();
    Achievement(196).unlock();
  }
  player.records.bestCelestialInfinity.time = new Decimal(player.records.bestCelestialInfinity.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestCelestialInfinity.time);
  player.records.bestCelestialInfinity.realTime = player.records.bestCelestialInfinity.realTime === 0
        ? 999999999999
        : player.records.bestCelestialInfinity.realTime;
  player.records.bestCelestialEternity.time = new Decimal(player.records.bestCelestialEternity.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestCelestialEternity.time);
  player.records.bestCelestialEternity.realTime = player.records.bestCelestialEternity.realTime === 0
        ? 999999999999
        : player.records.bestCelestialEternity.realTime;
  player.auto.galaxyGenerator = {
    all: Array.range(0, 10).map(() => ({
      isActive: false,
      lastTick: 0,
    })),
    isActive: true,
  }
}
