import { DimensionState } from "./dimension";

export function buySingleTimeDimension(tier, auto = false) {
  if (tier === 4 && Alpha.isRunning && Alpha.currentStage < 13) return;
  if (Laitela.continuumActive && Alpha.currentStage >= 17 && !player.disablePostReality) return;
  const dim = TimeDimension(tier);
  if (tier > 4) {
    if (!TimeStudy.timeDimension(tier).isBought) return false;
    if (RealityUpgrade(13).isLockingMechanics && Currency.eternityPoints.gte(dim.cost)) {
      if (!auto) RealityUpgrade(13).tryShowWarningModal();
      return false;
    }
  }
  if (Currency.eternityPoints.lt(dim.cost)) return false;
  if (Enslaved.isRunning && dim.bought.gt(0)) return false;
  if (ImaginaryUpgrade(15).isLockingMechanics && EternityChallenge(7).completions > 0) {
    if (!auto) {
      ImaginaryUpgrade(15).tryShowWarningModal(`purchase a Time Dimension,
        which will produce Infinity Dimensions through EC7`);
    }
    return false;
  }
  if (DualityUpgrade(15).isLockingMechanics) {
    const lockString = "purchase a Time Dimension";
    DualityUpgrade(15).tryShowWarningModal(lockString);
    return false;
  }

  Currency.eternityPoints.subtract(dim.cost);
  dim.amount = dim.amount.plus(1);
  dim.bought = dim.bought.plus(1);
  dim.cost = dim.nextCost(dim.bought);
  if (TimeDimension(4).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 13) {
    Alpha.advanceLayer();
    Alpha.quotes.fourthTimeDimension.show();
  }
  if (TimeDimension(8).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 26) {
    Alpha.advanceLayer();
    Alpha.quotes.eighthTimeDimension.show();
  }
  return true;
}

export function resetTimeDimensions() {
  for (const dim of TimeDimensions.all) dim.amount = new Decimal(dim.bought);
  updateTimeDimensionCosts();
}

export function fullResetTimeDimensions() {
  for (const dim of TimeDimensions.all) {
    dim.cost = new Decimal(dim.baseCost);
    dim.amount = DC.D0;
    dim.bought = DC.D0;
  }
}

export function toggleAllTimeDims() {
  const areEnabled = Autobuyer.timeDimension(1).isActive;
  for (let i = 1; i < 9; i++) {
    Autobuyer.timeDimension(i).isActive = !areEnabled;
  }
}

export function calcHighestPurchaseableTD(tier, currency) {
  const logC = currency.max(1).log10();
  const logBase = (TimeDimension(tier)._baseCost.max(1).log10().sub(
    PelleRifts.paradox.milestones[0].canBeApplied && tier > 4 ? 2250 : 0)).div(
    PelleRifts.paradox.milestones[0].canBeApplied && tier > 4 ? 2 : 1);
  let logMult = Math.log10(TimeDimension(tier)._costMultiplier);

  if (tier > 4 && currency.lt(DC.E6000)) {
    return Decimal.ceil(Decimal.max(0, (logC.sub(logBase)).div(logMult)));
  }

  if (currency.gte(DC.E6000)) {
    logMult = Math.log10(Math.max(TimeDimension(tier)._costMultiplier * (tier <= 4 ? 2.2 : 1), 1));
    const preInc = (Decimal.log10(DC.E6000).sub(logBase)).div(logMult);
    const postInc = Decimal.clampMin(((logC.sub(6000)).div(logMult)).div(TimeDimensions.scalingPast1e6000), 0);
    return Decimal.ceil(postInc.add(preInc));
  }

  if (currency.lt(DC.NUMMAX)) {
    return Decimal.ceil(Decimal.max(0, ((logC.sub(logBase)).div(logMult)).add(1)));
  }

  if (currency.lt(DC.E1300)) {
    const preInc = Decimal.floor((Decimal.log10(DC.NUMMAX).sub(logBase)).div(logMult));
    logMult = Math.log10(Math.max(TimeDimension(tier)._costMultiplier * 1.5, 1));
    const decCur = logC.sub(preInc.times(logMult));
    const postInc = Decimal.ceil(Decimal.clampMin(decCur.div(logMult), 0));
    return preInc.add(postInc);
  }

  if (currency.lt(DC.E6000)) {
    logMult = Math.log10(Math.max(TimeDimension(tier)._costMultiplier * 1.5, 1));
    const preInc = Decimal.floor((Decimal.log10(DC.E1300).sub(logBase)).div(logMult));
    logMult = Math.log10(Math.max(TimeDimension(tier)._costMultiplier * 2.2, 1));
    const decCur = logC.sub(preInc.times(logMult));
    const postInc = Decimal.ceil(Decimal.clampMin(decCur.div(logMult), 0));
    return preInc.add(postInc);
  }
  throw new Error("calcHighestPurchasableTD reached too far in code");
}

export function buyMaxTimeDimension(tier, portionToSpend = 1, isMaxAll = false) {
  if (tier === 4 && Alpha.isRunning && Alpha.currentStage < 13) return;
  if (Laitela.continuumActive && Alpha.currentStage >= 17 && !player.disablePostReality) return;
  const canSpend = Currency.eternityPoints.value.times(portionToSpend);
  const dim = TimeDimension(tier);
  if (canSpend.lt(dim.cost)) return false;
  if (tier > 4) {
    if (!TimeStudy.timeDimension(tier).isBought) return false;
    if (RealityUpgrade(13).isLockingMechanics) {
      if (!isMaxAll) RealityUpgrade(13).tryShowWarningModal();
      return false;
    }
  }
  if (ImaginaryUpgrade(15).isLockingMechanics && EternityChallenge(7).completions > 0) {
    if (!isMaxAll) {
      ImaginaryUpgrade(15).tryShowWarningModal(`purchase a Time Dimension,
        which will produce Infinity Dimensions through EC7`);
    }
    return false;
  }
  if (DualityUpgrade(15).isLockingMechanics) {
    const lockString = "purchase a Time Dimension";
    DualityUpgrade(15).tryShowWarningModal(lockString);
    return false;
  }
  if (Enslaved.isRunning) return buySingleTimeDimension(tier);
  const pur = Decimal.clampMin(calcHighestPurchaseableTD(tier, canSpend).sub(dim.bought), 0);
  const cost = dim.nextCost(pur.add(dim.bought).sub(1));
  if (pur.lte(0)) return false;
  Currency.eternityPoints.subtract(cost);
  dim.amount = dim.amount.plus(pur);
  dim.bought = dim.bought.plus(pur);
  dim.cost = dim.nextCost(dim.bought);
  if (TimeDimension(4).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 13) {
    Alpha.advanceLayer();
    Alpha.quotes.fourthTimeDimension.show();
  }
  if (TimeDimension(8).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 26) {
    Alpha.advanceLayer();
    Alpha.quotes.eighthTimeDimension.show();
  }
  return true;
}

export function maxAllTimeDimensions() {
  if (Laitela.continuumActive && Alpha.currentStage >= 17 && !player.disablePostReality) return;
  // Try to buy single from the highest affordable new dimensions
  for (let i = 8; i > 0 && TimeDimension(i).bought.eq(0); i--) {
    buySingleTimeDimension(i, true);
  }

  // Buy everything costing less than 1% of initial EP
  for (let i = 8; i > 0; i--) {
    buyMaxTimeDimension(i, 0.01, true);
  }

  // Loop buying the cheapest dimension possible; explicit infinite loops make me nervous
  const tierCheck = tier => ((Alpha.isRunning && Alpha.currentStage < 13) ? tier < 4 : (RealityUpgrade(13).isLockingMechanics ? tier < 5 : true));
  const purchasableDimensions = TimeDimensions.all.filter(d => d.isUnlocked && tierCheck(d.tier));
  for (let stop = 0; stop < 1000; stop++) {
    const cheapestDim = purchasableDimensions.reduce((a, b) => (b.cost.gte(a.cost) ? a : b));
    if (!buySingleTimeDimension(cheapestDim.tier, true)) break;
  }
  if (TimeDimension(4).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 13) {
    Alpha.advanceLayer();
    Alpha.quotes.fourthTimeDimension.show();
  }
  if (TimeDimension(8).amount.gte(1) && Alpha.isRunning && Alpha.currentStage === 26) {
    Alpha.advanceLayer();
    Alpha.quotes.eighthTimeDimension.show();
  }
}

export function timeDimensionCommonMultiplier() {
  let mult = new Decimal(ShopPurchase.allDimPurchases.currentMult)
    .timesEffectsOf(
      Achievement(105),
      Achievement(128),
      TimeStudy(93),
      TimeStudy(103),
      TimeStudy(151),
      TimeStudy(221),
      TimeStudy(301),
      EternityChallenge(1).reward,
      EternityChallenge(10).reward,
      EternityUpgrade.tdMultAchs,
      EternityUpgrade.tdMultTheorems,
      EternityUpgrade.tdMultRealTime,
      Pelle.isDoomed && !PelleRealityUpgrade.temporalTranscendence.canBeApplied ? null : RealityUpgrade(22),
      AlchemyResource.dimensionality,
      PelleRifts.chaos
    );

  mult = mult.times(ReplicantiMultipliers.tdMult);

  if (EternityChallenge(9).isRunning) {
    mult = mult.times(
      Decimal.pow(
        Decimal.clampMin(Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate / 7).add(1).log2(), 1),
        4)
        .clampMin(1));
  }

  if (LHC.voidRunning) mult = mult.timesEffectOf(NullUpgrade.timeDimensionMult);
  
  return mult;
}

export function updateTimeDimensionCosts() {
  for (let i = 1; i <= 8; i++) {
    const dim = TimeDimension(i);
    dim.cost = dim.nextCost(dim.bought);
  }
}

class TimeDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.time, tier);
    const BASE_COSTS = [null, DC.D1, DC.D5, DC.E2, DC.E3, DC.E2350, DC.E2650, DC.E3000, DC.E3350];
    this._baseCost = BASE_COSTS[tier];
    const COST_MULTS = [null, 3, 9, 27, 81, 24300, 72900, 218700, 656100];
    this._costMultiplier = COST_MULTS[tier];
    const E6000_SCALING_AMOUNTS = [null, 7322, 4627, 3382, 2665, 833, 689, 562, 456];
    this._e6000ScalingAmount = E6000_SCALING_AMOUNTS[tier];
    const COST_THRESHOLDS = [DC.NUMMAX, DC.E1300, DC.E6000];
    this._costIncreaseThresholds = COST_THRESHOLDS;
  }

  /** @returns {Decimal} */
  get cost() {
    return this.data.cost;
  }

  /** @param {Decimal} value */
  set cost(value) { this.data.cost = value; }

  nextCost(bought) {
    if (this._tier > 4 && bought.lt(this.e6000ScalingAmount)) {
      const cost = Decimal.pow(this.costMultiplier, bought).times(this.baseCost);
      if (PelleRifts.paradox.milestones[0].canBeApplied) {
        return cost.div("1e2250").pow(0.5);
      }
      return cost;
    }

    const costMultIncreases = [1, 1.5, 2.2];
    for (let i = 0; i < this._costIncreaseThresholds.length; i++) {
      const cost = Decimal.pow(this.costMultiplier * costMultIncreases[i], bought).times(this.baseCost);
      if (cost.lt(this._costIncreaseThresholds[i])) return cost;
    }

    let base = this.costMultiplier;
    if (this._tier <= 4) base *= 2.2;
    const exponent = new Decimal(bought.sub(this.e6000ScalingAmount)).mul(TimeDimensions.scalingPast1e6000).add(this.e6000ScalingAmount);
    const cost = Decimal.pow(base, exponent).times(this.baseCost);

    if (PelleRifts.paradox.milestones[0].canBeApplied && this._tier > 4) {
      return cost.div("1e2250").pow(0.5);
    }
    return cost;
  }

  get isUnlocked() {
    return this._tier < 5 || TimeStudy.timeDimension(this._tier).isBought;
  }

  get isAvailableForPurchase() {
    return this.isAffordable;
  }

  get isAffordable() {
    return Currency.eternityPoints.gte(this.cost);
  }

  get multiplier() {
    const tier = this._tier;

    if (EternityChallenge(11).isRunning) return DC.D1;
    let mult = GameCache.timeDimensionCommonMultiplier.value
      .timesEffectsOf(
        tier === 1 ? TimeStudy(11) : null,
        tier === 3 ? TimeStudy(73) : null,
        tier === 4 ? TimeStudy(227) : null
      );

    let bought;
    const dim = TimeDimension(tier);
    if (Laitela.continuumActive && Alpha.currentStage >= 17 && !player.disablePostReality) {
      bought = TimeDimension(tier).continuumValue;
    } else {
      bought = new Decimal(dim.bought);
    }

    bought = (tier === 8 && (player.disablePostReality || Alpha.currentStage < 12)) ? Decimal.clampMax(bought, 1e8).times(Laitela.matterExtraPurchaseFactor) : bought;
    mult = mult.times(Decimal.pow(dim.powerMultiplier, bought));

    mult = mult.pow(getAdjustedGlyphEffect("timepow"));
    mult = mult.pow(getAdjustedGlyphEffect("effarigdimensions"));
    mult = mult.pow(getAdjustedGlyphEffect("curseddimensions"));
    mult = mult.powEffectOf(AlchemyResource.time);
    mult = mult.pow(Ra.momentumValue);
    mult = mult.pow(ImaginaryUpgrade(11).effectOrDefault(1));
    mult = mult.powEffectOf(PelleRifts.paradox);
    mult = mult.powEffectOf(SingularityMilestone.dimensionPow);
    mult = mult.powEffectOf(Ra.unlocks.allDimPowTT);

    if (ExpansionPack.pellePack.isBought && !player.disablePostReality) mult = mult.pow(Decimal.pow(Decimal.log10(player.records.bestEndgame.galaxies).div(100), 1.5).add(1));

    if (player.dilation.active || (PelleStrikes.dilation.hasStrike && !PelleStrikes.dilation.isDestroyed())) {
      mult = dilatedValueOf(mult);
    }

    if (Effarig.isRunning) {
      mult = Effarig.multiplier(mult);
    } else if (V.isRunning) {
      mult = mult.pow(0.5);
    }

    mult = mult.powEffectsOf(
      BreakEternityUpgrade.infinityDimensionPow
    );

    if (!player.disablePostReality) mult = mult.pow(AlphaUnlocks.ecCompletion5.effects.buff.effectOrDefault(1));

    if (tier === 8 && !player.disablePostReality) {
      mult = mult.pow(AlphaUnlocks.timeDimension8.effects.buff.effectOrDefault(1));
    }

    if (DilationUpgrade.tdMultReplicanti.isBought && ResurgenceUpgrade.repSurge.isBought && !player.disablePostReality) mult = mult.pow(ReplicantiMultipliers.tdPow);

    if (ResurgenceUpgrade.achSurge.isBought && !player.disablePostReality) mult = mult.pow(Achievements.powerConv(EternityUpgrade.tdMultAchs.effectOrDefault(1)));

    mult = dilateMultiplier(mult, EtherealStars.purple.reward);

    if (mult.gte(TimeDimensions.OVERFLOW)) mult = Decimal.pow(10, Decimal.pow(mult.log10().div(Decimal.log10(TimeDimensions.OVERFLOW)), 1 / TimeDimensions.compressionMagnitude).times(Decimal.log10(TimeDimensions.OVERFLOW)));

    if (mult.gte(TimeDimensions.OVERFLOW_SQUARED)) mult = Decimal.pow(10, Decimal.pow(mult.log10().div(Decimal.log10(TimeDimensions.OVERFLOW_SQUARED)), 1 / TimeDimensions.compressionMag2).times(Decimal.log10(TimeDimensions.OVERFLOW_SQUARED)));

    return mult;
  }

  get productionPerSecond() {
    if (EternityChallenge(1).isRunning || EternityChallenge(10).isRunning ||
    (Laitela.isRunning && this.tier > Laitela.maxAllowedDimension)) {
      return DC.D0;
    }
    if (EternityChallenge(11).isRunning) {
      return this.totalAmount;
    }
    if (this.tier === this.highestProducingDimension && Alpha.isRunning && Alpha.currentStage >= 14 && Alpha.currentStage < 23) {
      return this.totalAmount;
    }
    let production = this.totalAmount.times(this.multiplier);
    if (EternityChallenge(7).isRunning) {
      production = production.times(Tickspeed.perSecond);
    }
    if (this._tier === 1 && !EternityChallenge(7).isRunning) {
      production = production.pow(getAdjustedGlyphEffect("timeshardpow"));
    }
    return production;
  }

  get rateOfChange() {
    const tier = this._tier;
    if (tier === 8) {
      return DC.D0;
    }
    const toGain = TimeDimension(tier + 1).productionPerSecond;
    const current = Decimal.max(this.totalAmount, 1);
    return toGain.times(10).dividedBy(current).times(getGameSpeedupForDisplay());
  }

  get isProducing() {
    const tier = this.tier;
    if (EternityChallenge(1).isRunning ||
      EternityChallenge(10).isRunning ||
      (Laitela.isRunning && tier > Laitela.maxAllowedDimension)) {
      return false;
    }
    return this.totalAmount.gt(0);
  }

  get highestProducingDimension() {
    if (TimeDimension(8).isProducing) return 8;
    if (TimeDimension(7).isProducing) return 7;
    if (TimeDimension(6).isProducing) return 6;
    if (TimeDimension(5).isProducing) return 5;
    if (TimeDimension(4).isProducing) return 4;
    if (TimeDimension(3).isProducing) return 3;
    if (TimeDimension(2).isProducing) return 2;
    if (TimeDimension(1).isProducing) return 1;
    return 1;
  }

  get continuumValue() {
    if (!this.isAvailableForPurchase) return DC.D0;
    // Nameless limits dim purchases to 1 only
    // Continuum should be no different
    if (Enslaved.isRunning) return DC.D1;
    // It's safe to use dimension.currencyAmount because this is
    // a dimension-only method (so don't just copy it over to tickspeed).
    // We need to use dimension.currencyAmount here because of different costs in NC6.
    return this.getContinuumValue.times(Laitela.matterExtraPurchaseFactor);
  }

  get getContinuumValue() {
    return new Decimal(calcHighestPurchaseableTD(this.tier, Currency.eternityPoints.value));
  }

  /**
   * @returns {number}
   */
  get continuumAmount() {
    if (!Laitela.continuumActive || Alpha.currentStage < 17 || player.disablePostReality) return DC.D0;
    return Decimal.floor(this.continuumValue);
  }

  get totalAmount() {
    return this.amount.max(this.continuumAmount);
  }

  get baseCost() {
    return this._baseCost;
  }

  get costMultiplier() {
    return this._costMultiplier;
  }

  get basePowerMultiplier() {
    if (Alpha.isRunning) return new Decimal(AlphaUnlocks.eternity.effects.nerf.effectOrDefault(4));
    if (!player.disablePostReality) return new Decimal(AlphaUnlocks.timeDimension4.effects.buff.effectOrDefault(4));
    return DC.D4;
  }

  get powerMultiplier() {
    return this.basePowerMultiplier
      .timesEffectsOf(this._tier === 8 ? GlyphSacrifice.time : null)
      .powEffectsOf(ImaginaryUpgrade(14), SingularityMilestone.perPurchaseDimMult);
  }

  get e6000ScalingAmount() {
    return this._e6000ScalingAmount;
  }

  get costIncreaseThresholds() {
    return this._costIncreaseThresholds;
  }

  get requirementReached() {
    return this._tier < 5 ||
      (TimeStudy.timeDimension(this._tier).isAffordable && TimeStudy.timeDimension(this._tier - 1).isBought);
  }

  tryUnlock() {
    if (this.isUnlocked) return;
    TimeStudy.timeDimension(this._tier).purchase();
  }
}

/**
 * @function
 * @param {number} tier
 * @return {TimeDimensionState}
 */
export const TimeDimension = TimeDimensionState.createAccessor();

export const TimeDimensions = {
  /**
   * @type {TimeDimensionState[]}
   */
  all: TimeDimension.index.compact(),
  get OVERFLOW() {
    return DC.E1E15.powEffectsOf(EndgameMastery(93));
  },

  get OVERFLOW_SQUARED() {
    return Pelle.isDoomed ?
      Decimal.pow10(Decimal.pow(DC.NUMMAX, Decimal.pow(2, Math.max(player.celestials.pelle.divinities - 1, 0)))) : DC.ENUMMAX;
  },

  get compressionMagnitude() {
    let reduction = Effects.product(EndgameMastery(83), EndgameUpgrade(3));
    if (!player.disablePostReality) reduction *= AlphaUnlocks.ecCompletion1.effects.buff.effectOrDefault(1);
    return Math.max(10 * reduction, 2) - Math.max((0.2 - reduction) * 5, 0);
  },

  get compressionMag2() {
    let reduction = 1;
    return Math.max(10 * reduction, 2) - Math.max((0.2 - reduction) * 5, 0);
  },

  get scalingPast1e6000() {
    return 4;
  },

  tick(diff) {
    for (let tier = 8; tier > 1; tier--) {
      TimeDimension(tier).produceDimensions(TimeDimension(tier - 1), new Decimal(diff).div(10));
    }

    if (EternityChallenge(7).isRunning) {
      TimeDimension(1).produceDimensions(InfinityDimension(8), diff);
    } else {
      TimeDimension(1).produceCurrency(Currency.timeShards, diff);
    }

    if (!TimeDimensions.all.every(d => d.amount.eq(0)) || !TimeDimensions.all.every(d => d.continuumAmount.eq(0))) {
      player.requirementChecks.endgame.onlyLowDims = false;
    }

    EternityChallenge(7).reward.applyEffect(production => {
      InfinityDimension(8).amount = InfinityDimension(8).amount.plus(production.times(diff).div(1000));
    });
  }
};

export function tryUnlockTimeDimensions() {
  if (TimeDimension(8).isUnlocked) return;
  for (let tier = 5; tier <= 8; ++tier) {
    if (TimeDimension(tier).isUnlocked) continue;
    TimeDimension(tier).tryUnlock();
  }
}
