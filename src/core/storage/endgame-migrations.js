//Time for spaghetti code
export function endgameMigration(player) {
  if (player.celestials.laitela.dimensions.length === 4) {
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
    if (ImaginaryUpgrade(26).isBought) DarkMatterDimension(5).amount = new Decimal(1);
    if (ImaginaryUpgrade(27).isBought) DarkMatterDimension(6).amount = new Decimal(1);
    if (ImaginaryUpgrade(28).isBought) DarkMatterDimension(7).amount = new Decimal(1);
    if (ImaginaryUpgrade(29).isBought) DarkMatterDimension(8).amount = new Decimal(1);
  }
  player.records.bestEndgame.time = player.records.bestEndgame.time.eq(0)
        ? new Decimal(999999999999)
        : player.records.bestEndgame.time;
  player.records.bestEndgame.realTime = player.records.bestEndgame.realTime === 0
        ? 999999999999
        : player.records.bestEndgame.realTime;
  if (!GalacticPower.isUnlocked && player.endgame.galacticPower.gt(0)) player.endgame.galacticPower = new Decimal(0);
  if (player.celestials.teresa.perkShop.length === 5) {
    player.celestials.teresa.perkShop = Array.repeat(0, 7);
  }
}
