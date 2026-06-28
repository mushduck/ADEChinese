export const Penteracts = {
  get bought() {
    return player.endgame.hypercubes.penteracts;
  },

  get extra() {
    return 0;
  },

  get effectiveCount() {
    return this.bought + this.extra;
  },

  buyPenteract() {
    if (!this.canBuyPenteract) return;
    if (GameEnd.creditsEverClosed) return;
    player.endgame.hypercubes.penteracts++;
  },

  costs(index) {
    return Decimal.pow10(Decimal.pow10(new Decimal(105).add(Decimal.pow(index, 1.5).div(2))));
  },

  get nextCost() {
    return this.costs(this.bought);
  },

  get canBuyPenteract() {
    return DualityUpgrade(25).isBought && Currency.eternityPoints.gte(Penteracts.nextCost) && !player.disablePostReality && !Pelle.isDoomed;
  },

  softcapReduction(count = this.bought, extra = this.extra) {
    const totalCount = count + extra;
    const base = Decimal.pow(Decimal.pow(1.05, Octeracts.cubeBoost()), totalCount);
    return player.disablePostReality ? DC.D1 : DC.D1.div(base);
  },

  get eachPenteractReduction() {
    return Decimal.pow(1.05, Octeracts.cubeBoost());
  }
};

export const Hexeracts = {
  get bought() {
    return player.endgame.hypercubes.hexeracts;
  },

  get extra() {
    return 0;
  },

  get effectiveCount() {
    return this.bought + this.extra;
  },

  buyHexeract() {
    if (!this.canBuyHexeract) return;
    if (GameEnd.creditsEverClosed) return;
    player.endgame.hypercubes.hexeracts++;
  },

  costs(index) {
    return Decimal.pow10(new Decimal(1.6e5).times(Decimal.pow(1.05, Decimal.pow(index, 1.5))));
  },

  get nextCost() {
    return this.costs(this.bought);
  },

  get canBuyHexeract() {
    return DualityUpgrade(25).isBought && player.celestials.laitela.hadronizes >= 40 &&
      Currency.darkMatter.gte(Hexeracts.nextCost) && !player.disablePostReality && !Pelle.isDoomed;
  },

  softcapReduction(count = this.bought, extra = this.extra) {
    const totalCount = count + extra;
    const base = Decimal.pow(Decimal.pow(1.02, Octeracts.cubeBoost()), totalCount);
    return player.disablePostReality ? DC.D1 : DC.D1.div(base);
  },

  get eachHexeractReduction() {
    return Decimal.pow(1.02, Octeracts.cubeBoost());
  }
};

export const Hepteracts = {
  get bought() {
    return player.endgame.hypercubes.hepteracts;
  },

  get extra() {
    return 0;
  },

  get effectiveCount() {
    return this.bought + this.extra;
  },

  buyHepteract() {
    if (!this.canBuyHepteract) return;
    if (GameEnd.creditsEverClosed) return;
    player.endgame.hypercubes.hepteracts++;
  },

  costs(index) {
    return Decimal.pow10(new Decimal(2500).times(Decimal.pow(1.02, Decimal.pow(index, 1.5))));
  },

  get nextCost() {
    return this.costs(this.bought);
  },

  get canBuyHepteract() {
    return DualityUpgrade(25).isBought && PlayerProgress.celestialEternityUnlocked() &&
      Currency.celestialPoints.gte(Hepteracts.nextCost) && !player.disablePostReality && !Pelle.isDoomed;
  },

  softcapReduction(count = this.bought, extra = this.extra) {
    const totalCount = count + extra;
    const base = Decimal.pow(Decimal.pow(1.01, Octeracts.cubeBoost()), totalCount);
    return player.disablePostReality ? DC.D1 : DC.D1.div(base);
  },

  get eachHepteractReduction() {
    return Decimal.pow(1.01, Octeracts.cubeBoost());
  }
};

export const Octeracts = {
  get bought() {
    return player.endgame.hypercubes.octeracts;
  },

  get extra() {
    return 0;
  },

  get effectiveCount() {
    return this.bought + this.extra;
  },

  buyOcteracts() {
    if (!this.canBuyOcteract) return;
    if (GameEnd.creditsEverClosed) return;
    player.endgame.hypercubes.octeracts++;
  },

  costs(index) {
    return Decimal.ceil(Decimal.pow(2.5, Decimal.pow(index, 2)));
  },

  get nextCost() {
    return this.costs(this.bought);
  },

  get canBuyOcteract() {
    return DualityUpgrade(25).isBought && false &&
      DC.D0.gte(Octeracts.nextCost) && !player.disablePostReality && !Pelle.isDoomed;
  },

  cubeBoost(count = this.bought, extra = this.extra) {
    const totalCount = count + extra;
    const base = Decimal.pow(1.1, totalCount);
    return player.disablePostReality ? DC.D1 : base;
  },

  get eachOcteractBoost() {
    return 1.1;
  }
};
