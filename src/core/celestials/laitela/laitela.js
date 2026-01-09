import { DC } from "../../constants";
import { Quotes } from "../quotes";

import { DarkMatterDimensions } from "./dark-matter-dimension";

export const Laitela = {
  displayName: "Lai'tela",
  possessiveName: "Lai'tela's",
  get celestial() {
    return player.celestials.laitela;
  },
  get isUnlocked() {
    if (EndgameMilestone.celestialEarlyUnlock.isReached) return true;
    return ImaginaryUpgrade(15).isBought;
  },
  initializeRun() {
    clearCelestialRuns();
    this.celestial.run = true;
  },
  get isRunning() {
    return this.celestial.run;
  },
  get difficultyTier() {
    return player.celestials.laitela.difficultyTier;
  },
  set difficultyTier(tier) {
    player.celestials.laitela.difficultyTier = tier;
  },
  get maxAllowedDimension() {
    return 8 - this.difficultyTier;
  },
  get isFullyDestabilized() {
    return Laitela.maxAllowedDimension === 0;
  },
  get continuumUnlocked() {
    if (EndgameMilestone.celestialEarlyUnlock.isReached) return true;
    return ImaginaryUpgrade(15).isBought;
  },
  get continuumActive() {
    return this.continuumUnlocked && !player.auto.disableContinuum;
  },
  setContinuum(x) {
    player.auto.disableContinuum = !x;
    // If continuum is now not disabled (i.e. is enabled) we update the relevant requirement check.
    if (!player.auto.disableContinuum) {
      player.requirementChecks.reality.noContinuum = false;
    }
  },
  get matterExtraPurchaseFactor() {
    if (Pelle.isDoomed && !PelleDestructionUpgrade.continuumBuff.isBought) return 1;
    return (Decimal.pow(new Decimal(Decimal.log10(Currency.darkMatter.max)).div(50), 0.4).times(0.5).add(1).times(
      SingularityMilestone.continuumMult.effectOrDefault(new Decimal(0)).add(1))).toNumber();
  },
  get hadronizes() {
    return this.celestial.hadronizes;
  },
  get realityReward() {
    const fullLaitelaCompletion = Decimal.clampMin(Decimal.pow(100, 8).times(Decimal.pow(new Decimal(360).div(300), 2)), 1);
    const currentLaitelaProgress = Decimal.clampMin(Decimal.pow(100, this.difficultyTier).times(
      Decimal.pow(new Decimal(360).div(player.celestials.laitela.fastestCompletion), 2)), 1);
    return Decimal.pow(currentLaitelaProgress, this.hadronizes + 1).times(Decimal.pow(
      fullLaitelaCompletion, (this.hadronizes * (this.hadronizes + 1)) / 2));
  },
  get realityRewardDE() {
    const fullDestabilization = this.isFullyDestabilized ? Math.pow(8, this.hadronizes + 1) : 1;
    return fullDestabilization * Math.pow(8, (this.hadronizes * (this.hadronizes + 1)) / 2);
  },
  // Note that entropy goes from 0 to 1, with 1 being completion
  get entropyGainPerSecond() {
    const maxSpeed = ExpansionPack.laitelaPack.isBought ? 1000 : 100;
    const hadronizeBump = this.hadronizes > 0 ? 1e12 : 1;
    const hadronizeAntimatter = Decimal.pow(1000, this.hadronizes).times(hadronizeBump).times(1e11);
    return Decimal.clamp(Decimal.pow(new Decimal(Currency.antimatter.value.add(1).log10()).div(hadronizeAntimatter), 2), 0, maxSpeed).div(200);
  },
  get darkMatterMultGain() {
    const extraPow = ExpansionPack.laitelaPack.isBought
      ? Decimal.pow((Math.log10(Decimal.log10(Currency.darkMatter.value) + 1) + 1) / 2, 2).add(1) : 1;
    return Decimal.pow(Decimal.pow(Currency.darkMatter.value.dividedBy(this.annihilationDMRequirement)
      .plus(1).log10(), 1.5).times(ImaginaryUpgrade(21).effectOrDefault(1)), extraPow);
  },
  get darkMatterMult() {
    return this.celestial.darkMatterMult;
  },
  get darkMatterMultRatio() {
    return (this.celestial.darkMatterMult.add(this.darkMatterMultGain)).div(this.celestial.darkMatterMult);
  },
  get darkMatterCap() {
    let baseCap = Decimal.NUMBER_MAX_VALUE;
    if (ImaginaryUpgrade(26).isBought) baseCap = DC.E1000;
    if (ImaginaryUpgrade(27).isBought) baseCap = DC.E4000;
    if (ImaginaryUpgrade(28).isBought) baseCap = DC.E20000;
    if (ImaginaryUpgrade(29).isBought) baseCap = DC.E100000;
    const realityReward = ExpansionPack.laitelaPack.isBought ? this.realityReward : 1;
    return baseCap.times(EndgameUpgrade(4).effectOrDefault(1)).times(realityReward);
  },
  get annihilationUnlocked() {
    return ImaginaryUpgrade(19).isBought;
  },
  get annihilationDMRequirement() {
    return 1e60;
  },
  get canAnnihilate() {
    return Laitela.annihilationUnlocked && Currency.darkMatter.gte(this.annihilationDMRequirement);
  },
  annihilate(force) {
    if (!force && !this.canAnnihilate) return false;
    this.celestial.darkMatterMult = this.celestial.darkMatterMult.add(this.darkMatterMultGain);
    DarkMatterDimensions.reset();
    Laitela.quotes.annihilation.show();
    Achievement(176).unlock();
    return true;
  },
  // Greedily buys the cheapest available upgrade until none are affordable
  maxAllDMDimensions(maxTier) {
    // Note that tier is 1-indexed
    const unlockedDimensions = DarkMatterDimensions.all
      .filter(d => d.isUnlocked && d.tier <= maxTier);
    const upgradeInfo = unlockedDimensions
      .map(d => [
        [d.rawIntervalCost, d.intervalCostIncrease, d.maxIntervalPurchases, x => d.buyManyInterval(x)],
        [d.rawPowerDMCost, d.powerDMCostIncrease, Decimal.MAX_VALUE, x => d.buyManyPowerDM(x)],
        [d.rawPowerDECost, d.powerDECostIncrease, Decimal.MAX_VALUE, x => d.buyManyPowerDE(x)]])
      .flat(1);
    const buy = function(upgrade, purchases) {
      upgrade[3](purchases);
      upgrade[0] = upgrade[0].times(Decimal.pow(upgrade[1], purchases));
      upgrade[2] = upgrade[2].sub(purchases);
    };
    // Buy everything costing less than 0.02 of initial matter.
    const darkMatter = Currency.darkMatter.value;
    for (const upgrade of upgradeInfo) {
      const purchases = Decimal.clamp(Decimal.floor(darkMatter.times(0.02).div(upgrade[0]).log(upgrade[1].toNumber())), 0, upgrade[2]);
      buy(upgrade, purchases);
    }
    while (upgradeInfo.some(upgrade => upgrade[0].lte(darkMatter) && upgrade[2].gt(0))) {
      const cheapestUpgrade = upgradeInfo.filter(upgrade => upgrade[2].gt(0)).sort((a, b) => new Decimal(Decimal.compare(a[0], b[0])).sign())[0];
      buy(cheapestUpgrade, DC.D1);
    }
  },
  hadronize() {
    if (!Laitela.isFullyDestabilized) return false;
    this.celestial.fastestCompletion = 3600;
    this.celestial.difficultyTier = 0;
    this.celestial.hadronizes += 1;
    return true;
  },
  reset() {
    this.annihilate(true);
    this.celestial.darkMatterMult = DC.D1;
    Currency.darkMatter.max = DC.D1;
    Currency.darkMatter.reset();
    Currency.unnerfedDarkMatter.reset();
    Currency.singularities.reset();
    this.celestial.fastestCompletion = 3600;
    this.celestial.difficultyTier = 0;
    this.celestial.singularityCapIncreases = DC.D0;
  },
  quotes: Quotes.laitela,
  symbol: "ᛝ"
};

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
  if (Tab.celestials.laitela.isOpen) Laitela.quotes.unlock.show();
});
