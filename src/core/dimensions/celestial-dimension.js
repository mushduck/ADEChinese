import { DC } from "../constants";

import { DimensionState } from "./dimension";

export function celestialDimensionCommonMultiplier() {
  let mult = new Decimal(1);

  return mult;
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
    ],
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
    return production.times(this.multiplier);
  }

  get multiplier() {
    const tier = this.tier;
    const mult = GameCache.celestialDimensionCommonMultiplier.value;
    mult = mult.times(Decimal.pow(this.powerMultiplier, Math.floor(this.baseAmount / 10)));
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
    return new Decimal(this._powerMultiplier);
  }

  get purchases() {
    return this.data.baseAmount;
  }

  get purchaseCap() {
    if (this.tier === 1) return 103;
    if (this.tier === 2) return 77;
    if (this.tier === 3) return 62;
    if (this.tier === 4) return 51;
    if (this.tier === 5) return 38;
    if (this.tier === 6) return 28;
    if (this.tier === 7) return 18;
    if (this.tier === 8) return 1;
  }

  get isCapped() {
    return this.purchases >= this.purchaseCap;
  }

  get hardcapCPAmount() {
    return this._baseCost.times(Decimal.pow(this.costMultiplier, this.purchaseCap));
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

  buyMax(auto) {
    if (!this.isAvailableForPurchase) return false;

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
  HARDCAP_PURCHASES: Number.MAX_VALUE,

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

  tick(diff) {
    for (let tier = 8; tier > 1; tier--) {
      CelestialDimension(tier).produceDimensions(CelestialDimension(tier - 1), diff / 10);
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
    if (Pelle.isDoomed) return 0.2;
    return 2;
  }
};
