import { DC } from "./constants";

/**
 * @abstract
 */
export class EndgameSkillPurchaseType {
  /**
  * @abstract
  */
  get amount() { throw new NotImplementedError(); }

  /**
  * @abstract
  */
  set amount(value) { throw new NotImplementedError(); }

  add(amount) { this.amount += amount; }

  /**
  * @abstract
  */
  get currency() { throw new NotImplementedError(); }

  get cost() { return this.costBase.times(this.costIncrement.pow(this.amount)); }

  /**
   * @abstract
   */
  get costBase() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get costIncrement() { throw new NotImplementedError(); }

  get bulkPossible() {
    return Decimal.affordGeometricSeries(this.currency.value, this.cost, this.costIncrement, 0).toNumber();
  }

  // Note: This is actually just the cost of the largest term of the geometric series. If buying CP/DP without the
  // perk that makes them free, this will be incorrect, but the CP/DP object already overrides this anyway
  bulkCost(amount) {
    return this.cost.times(this.costIncrement.pow(amount - 1));
  }

  purchase(bulk) {
    if (!this.canAfford) return false;
    let purchased = false;
    const amount = this.bulkPossible;
    const buyFn = cost => this.currency.purchase(cost);
    // This will sometimes buy one too few for CP/DP, so we just have to buy 1 after.
    if (bulk && buyFn(this.bulkCost(amount))) {
      Currency.endgameSkills.add(amount);
      this.add(amount);
      purchased = true;
    }
    if (buyFn(this.cost)) {
      Currency.endgameSkills.add(1);
      this.add(1);
      purchased = true;
    }
    return purchased;
  }

  get canAfford() {
    return this.currency.gte(this.cost) && player.endgames > 0;
  }

  reset() {
    this.amount = 0;
  }
}

EndgameSkillPurchaseType.am = new class extends EndgameSkillPurchaseType {
  get amount() { return player.endgameMasteries.amBought; }
  set amount(value) { player.endgameMasteries.amBought = value; }

  get currency() { return new Decimal(Currency.antimatter.exponent); }
  get costBase() { return DC.E15; }
  get costIncrement() { return DC.E1; }
}();

EndgameSkillPurchaseType.cp = new class extends EndgameSkillPurchaseType {
  get amount() { return player.endgameMasteries.cpBought; }
  set amount(value) { player.endgameMasteries.cpBought = value; }

  get currency() { return Currency.celestialPoints; }
  get costBase() { return DC.D1; }
  get costIncrement() { return DC.E1; }
}();

EndgameSkillPurchaseType.dp = new class extends EndgameSkillPurchaseType {
  get amount() { return player.endgameMasteries.dpBought; }
  set amount(value) { player.endgameMasteries.dpBought = value; }

  get currency() { return Currency.doomedParticles; }
  get costBase() { return DC.D1; }
  get costIncrement() { return DC.E1; }

  bulkCost(amount) {
    return this.costIncrement.pow(amount + this.amount).subtract(this.cost);
  }
}();

export const EndgameSkills = {
  checkForBuying(auto) {
    if CelestialDimension(1).bought return true;
    if (!auto) Modal.message.show(`You need to buy at least ${formatInt(1)} Celestial Dimension before you can purchase
      Endgame Skills.`, { closeEvent: GAME_EVENT.ENDGAME_RESET_AFTER });
    return false;
  },

  buyOne(auto = false, type) {
    if (!this.checkForBuying(auto)) return 0;
    if (!EndgameSkillPurchaseType[type].purchase(false)) return 0;
    return 1;
  },

  // This is only called via automation and there's no manual use-case, so we assume auto is true and simplify a bit
  buyOneOfEach() {
    if (!this.checkForBuying(true)) return 0;
    const esAM = this.buyOne(true, "am");
    const esCP = this.buyOne(true, "cp");
    const esDP = this.buyOne(true, "dp");
    return esAM + esCP + esDP;
  },

  buyMax(auto = false) {
    if (!this.checkForBuying(auto)) return 0;
    const esAM = EndgameSkillPurchaseType.am.purchase(true);
    const esCP = EndgameSkillPurchaseType.cp.purchase(true);
    const esDP = EndgameSkillPurchaseType.dp.purchase(true);
    return esAM + esCP + esDP;
  },

  totalPurchased() {
    return EndgameSkillPurchaseType.am.amount +
          EndgameSkillPurchaseType.cp.amount +
          EndgameSkillPurchaseType.dp.amount;
  },

  calculateEndgameMasteriesCost() {
    let totalCost = EndgameMastery.boughtEM()
      .map(em => em.cost)
      .reduce(Number.sumReducer, 0);
    return totalCost;
  }
};
