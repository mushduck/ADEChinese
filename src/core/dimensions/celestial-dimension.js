import { DimensionState } from "./dimension";

export function celestialDimensionCommonMultiplier() {
  let mult = DC.D1;
  mult = mult.timesEffectsOf(EndgameUpgrade(11));
  mult = mult.times(Ethereal.sectorBoost);
  return mult;
}

export function toggleCelestialMatter() {
  const isEnabled = player.endgame.celestialMatterMultiplier.isActive;
  player.endgame.celestialMatterMultiplier.isActive = !isEnabled;
}

class CelestialDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.celestial, tier);
    const UNLOCK_REQUIREMENTS = [
      undefined,
      DC.D1,
      DC.E1,
      DC.E2,
      DC.E4,
      DC.E10,
      DC.E30,
      DC.E100,
      DC.E300
    ];
    this._unlockRequirement = UNLOCK_REQUIREMENTS[tier];
    const COST_MULTS = [null, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e12, 1e15];
    this._costMultiplier = COST_MULTS[tier];
    const POWER_MULTS = [null, 2, 2, 2, 2, 2, 2, 2, 2];
    this._powerMultiplier = POWER_MULTS[tier];
    const BASE_COSTS = [null, 1, 10, 100, 1e4, 1e10, 1e30, 1e100, 1e300];
    this._baseCost = new Decimal(BASE_COSTS[tier]);
  }

  /** @returns {Decimal} */
  get cost() { return this.data.cost; }
  /** @param {Decimal} value */
  set cost(value) { this.data.cost = value; }

  get baseAmount() {
    return this.data.baseAmount;
  }

  set baseAmount(value) {
    this.data.baseAmount = value;
  }

  get isUnlocked() {
    return this.data.isUnlocked;
  }

  set isUnlocked(value) {
    this.data.isUnlocked = value;
  }

  get cpRequirement() {
    return this._unlockRequirement;
  }

  get celestialPointRequirementReached() {
    return player.endgame.celestialPoints.gte(this.cpRequirement);
  }

  get canUnlock() {
    return this.celestialPointRequirementReached;
  }

  get isAvailableForPurchase() {
    return CelestialDimensions.canBuy() && this.isUnlocked && this.isAffordable && !this.isCapped;
  }

  get isAffordable() {
    return Currency.celestialPoints.gte(this.cost);
  }

  get rateOfChange() {
    const tier = this.tier;
    if (tier === 8) {
      return DC.D0;
    }
    const toGain = CelestialDimension(tier + 1).productionPerSecond;
    const current = Decimal.max(this.amount, 1);
    return toGain.times(10).dividedBy(current);
  }

  get productionPerSecond() {
    let production = this.amount;
    return production.times(this.multiplier);
  }

  get multiplier() {
    const tier = this.tier;
    let mult = GameCache.celestialDimensionCommonMultiplier.value;
    mult = mult.times(Decimal.pow(this.powerMultiplier, Math.floor(this.baseAmount)));
    mult = mult.powEffectsOf(SingularityMilestone.dimensionPow, Ra.unlocks.celestialDimensionPower);
    return mult;
  }

  get isProducing() {
    const tier = this.tier;
    return this.amount.gt(0);
  }

  get baseCost() {
    return this._baseCost;
  }

  get costMultiplier() {
    const costMult = this._costMultiplier;
    return costMult;
  }

  get powerMultiplier() {
    return new Decimal(this._powerMultiplier).pow(SingularityMilestone.perPurchaseDimMult.effectOrDefault(1));
  }

  get purchases() {
    return this.data.baseAmount;
  }

  get purchaseCap() {
    return DC.C2P1024;
  }

  get isCapped() {
    return this.cost.gte(this.purchaseCap);
  }

  get hardcapCPAmount() {
    return this.purchaseCap;
  }

  resetAmount() {
    this.amount = new Decimal(this.baseAmount);
  }

  fullReset() {
    this.cost = new Decimal(this.baseCost);
    this.amount = DC.D0;
    this.bought = 0;
    this.baseAmount = 0;
    this.isUnlocked = false;
  }

  unlock() {
    if (this.isUnlocked) return true;
    if (!this.canUnlock) return false;
    this.isUnlocked = true;
    EventHub.dispatch(GAME_EVENT.CELESTIAL_DIMENSION_UNLOCKED, this.tier);
    if (this.tier === 1) {
      Tab.dimensions.celestial.show();
    }
    return true;
  }

  // Only ever called from manual actions
  buySingle() {
    if (!this.isUnlocked) return this.unlock();
    if (!this.isAvailableForPurchase) return false;

    Currency.celestialPoints.purchase(this.cost);
    this.cost = Decimal.round(this.cost.times(this.costMultiplier));
    this.amount = this.amount.plus(1);
    this.baseAmount += 1;

    return true;
  }

  buyMax() {
    if (!this.isAvailableForPurchase) return false;

    let purchasesUntilHardcap = this.purchaseCap.toNumber() - this.purchases;
    
    const costScaling = new LinearCostScaling(
      Currency.celestialPoints.value,
      this.cost,
      this.costMultiplier,
      purchasesUntilHardcap
    );

    if (costScaling.purchases <= 0) return false;

    Currency.celestialPoints.purchase(costScaling.totalCost);
    this.cost = this.cost.times(costScaling.totalCostMultiplier);
    this.amount = this.amount.plus(costScaling.purchases);
    this.baseAmount += costScaling.purchases;

    return true;
  }
}

/**
 * @function
 * @param {number} tier
 * @return {CelestialDimensionState}
 */
export const CelestialDimension = CelestialDimensionState.createAccessor();

export const CelestialDimensions = {
  /**
   * @type {CelestialDimensionState[]}
   */
  all: CelestialDimension.index.compact(),
  HARDCAP_PURCHASES: DC.C2P1024,
  get SOFTCAP() {
    return DC.E100.timesEffectsOf(EndgameMastery(94), EndgameUpgrade(5)).times(Ethereal.sectorBoost);
  },

  get softcapPow() {
    const reduction = Effects.product(EndgameMastery(84));
    return 10 * reduction;
  },

  unlockNext() {
    if (CelestialDimension(8).isUnlocked) return;
    this.next().unlock();
  },

  next() {
    if (CelestialDimension(8).isUnlocked)
      throw "All Celestial Dimensions are unlocked";
    return this.all.first(dim => !dim.isUnlocked);
  },

  resetAmount() {
    Currency.unnerfedCelestialMatter.reset();
    Currency.celestialMatter.reset();
    for (const dimension of CelestialDimensions.all) {
      dimension.resetAmount();
    }
  },

  fullReset() {
    for (const dimension of CelestialDimensions.all) {
      dimension.fullReset();
    }
  },

  get totalDimCap() {
    return this.HARDCAP_PURCHASES;
  },

  canBuy() {
    return true;
  },

  canAutobuy() {
    return this.canBuy();
  },

  tick(realDiff) {
    for (let tier = 8; tier > 1; tier--) {
      CelestialDimension(tier).produceDimensions(CelestialDimension(tier - 1), realDiff / 10);
      CelestialDimension(1).produceCurrency(Currency.unnerfedCelestialMatter, realDiff);
    }
  },

  // Called from "Max All" UI buttons and nowhere else
  buyMax() {
    // Try to unlock dimensions
    const unlockedDimensions = this.all.filter(dimension => dimension.unlock());

    // Try to buy single from the highest affordable new dimensions
    unlockedDimensions.slice().reverse().forEach(dimension => {
      if (dimension.purchases === 0) dimension.buySingle();
    });

    // Try to buy max from the lowest dimension (since lower dimensions have bigger multiplier per purchase)
    unlockedDimensions.forEach(dimension => dimension.buyMax(false));
  },

  get conversionExponent() {
    let base = 2;
    if (Pelle.isDoomed) base /= 10;
    let exponent = 1;
    if (base > 1) exponent *= Effects.product(EndgameMastery(104), Ra.unlocks.celestialDimensionConversionPower);
    base *= Effects.product(Achievement(198));
    return Math.pow(base, exponent);
  }
};
