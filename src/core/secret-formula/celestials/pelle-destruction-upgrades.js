import { DC } from "../constants";

export const REPEATABLE_UPGRADES = [
  {
    id: "achievements-reenable",
    name: "Reenable Achievements",
    type: "repeatable",
    maxPurchases: 17,
    nextCost(currentPurchases = 0) {
      const nextRow = Math.min(currentPurchases + 1, 17);
      if (currentPurchases >= 17) return null;     
      return Decimal.pow(10, nextRow);                
    },
  }
];


export const PELLE_DESTRUCTION_UPGRADES = [
  // Free
  { id: "ts192", name: "Reenable TS192", cost: new Decimal(0) },

  // 1 – 1e4
  { id: "passive-ip-gen",       name: "Reenable Passive IP Gen Upgrade",         cost: new Decimal(1) },
  { id: "ad-div10-nerf-off",    name: "Disable AD/10 nerf",                      cost: new Decimal(10) },
  { id: "passive-infinity-gen", name: "Reenable Passive Infinity Gen Upgrade",   cost: new Decimal(1000) },
  { id: "ts32",                 name: "Reenable TS32",                           cost: new Decimal(10000) },

  // 1e6 – 1e10
  { id: "ts41",               name: "Reenable TS41",                           cost: Decimal.pow(10, 6) },
  { id: "ts51",               name: "Reenable TS51",                           cost: Decimal.pow(10, 8) },
  { id: "ts62",               name: "Reenable TS62",                           cost: Decimal.pow(10, 9) },
  { id: "auto-ic-completion", name: "Reenable Auto IC completion",             cost: Decimal.pow(10, 9) },
  { id: "ts61",               name: "Reenable TS61",                           cost: Decimal.pow(10, 10) },

  // 1e12
  { id: "dt-div100k-nerf-off", name: "Disable the /100000 Dilated Time nerf",  cost: Decimal.pow(10, 12) },
  { id: "glyph-slots-t1",      name: "Reenable Glyph Slots (Tier 1)",          cost: Decimal.pow(10, 12) },

  // 1e15
  { id: "ts141",            name: "Reenable TS141",                          cost: Decimal.pow(10, 15) },
  { id: "ts142",            name: "Reenable TS142",                          cost: Decimal.pow(10, 15) },
  { id: "ts143",            name: "Reenable TS143",                          cost: Decimal.pow(10, 15) },
  { id: "ec2-req-nerf-off", name: "Disable EC2 requirement nerf",            cost: Decimal.pow(10, 15) },

  // 1e18
  { id: "ts121",            name: "Reenable TS121",                          cost: Decimal.pow(10, 18) },
  { id: "ts122",            name: "Reenable TS122",                          cost: Decimal.pow(10, 18) },
  { id: "ts123",            name: "Reenable TS123",                          cost: Decimal.pow(10, 18) },
  { id: "ts213",            name: "Reenable TS213",                          cost: Decimal.pow(10, 18) },
  { id: "ec3-req-nerf-off", name: "Disable EC3 requirement nerf",            cost: Decimal.pow(10, 18) },

  // 1e20 – 1e21
  { id: "ipx2",                    name: "Reenable 2x IP multiplier",               cost: Decimal.pow(10, 20) },
  { id: "ec5-req-nerf-off",        name: "Disable EC5 requirement nerf",            cost: Decimal.pow(10, 20) },
  { id: "dilation-upg-autobuyers", name: "Reenable Dilation Upgrade autobuyers",    cost: Decimal.pow(10, 21) },

  // 1e24 – 1e27
  { id: "tt-autobuyers",     name: "Reenable TT Autobuyers",                        cost: Decimal.pow(10, 24) },
  { id: "glyph-slots-t2",    name: "Reenable Glyph Slots (Tier 2)",                 cost: Decimal.pow(10, 24) },
  { id: "reality-row1-each", name: "Reenable Row 1 Reality Upgrades (each)",        cost: Decimal.pow(10, 25) },
  { id: "ec6-req-nerf-off",  name: "Disable EC6 requirement nerf",                  cost: Decimal.pow(10, 25) },
  { id: "ec7-req-nerf-off",  name: "Disable EC7 requirement nerf",                  cost: Decimal.pow(10, 27) },

  // 1e30 – 1e33
  { id: "galaxy-50pct-nerf-off", name: "Disable 50% Galaxy Effectiveness nerf",     cost: Decimal.pow(10, 30) },
  { id: "epx5",                  name: "Reenable 5x EP multiplier",                 cost: Decimal.pow(10, 30) },
  { id: "ec8-req-nerf-off",      name: "Disable EC8 requirement nerf",              cost: Decimal.pow(10, 30) },
  { id: "dt-2e12-upgrade",       name: "Reenable the 2e12 DT upgrade",              cost: Decimal.pow(10, 33) },

  // 1e35 – 1e36
  { id: "reality-row2-each", name: "Reenable Row 2 Reality Upgrades (each)",        cost: Decimal.pow(10, 35) },
  { id: "glyph-slots-t3",    name: "Reenable Glyph Slots (Tier 3)",                 cost: Decimal.pow(10, 36) },
  { id: "ec9-req-nerf-off",  name: "Disable EC9 requirement nerf",                  cost: Decimal.pow(10, 36) },

  // 1e40 – 1e42
  { id: "ec10-req-nerf-off",       name: "Disable EC10 requirement nerf",           cost: Decimal.pow(10, 40) },
  { id: "tp3x",                    name: "Reenable the 3x TP upgrade",              cost: Decimal.pow(10, 40) },
  { id: "glyph-sacrifice-rewards", name: "Reenable Glyph Sacrifice rewards",        cost: Decimal.pow(10, 40) },
  { id: "pelle-inf-glyph-ec9-12",  name: "Reenable the Pelle Infinity Glyph effect in EC9–12", cost: Decimal.pow(10, 42) },
  { id: "destroyed-glyph-effects", name: "Reenable the Destroyed Glyph Effects for normal Glyphs", cost: Decimal.pow(10, 42) },

  // 1e45 – 1e50
  { id: "ec12-req-nerf-off", name: "Disable EC12 requirement nerf",                 cost: Decimal.pow(10, 45) },
  { id: "glyph-slots-t4",    name: "Reenable Glyph Slots (Tier 4)",                 cost: Decimal.pow(10, 48) },
  { id: "ec11-req-nerf-off", name: "Disable EC11 requirement nerf",                 cost: Decimal.pow(10, 50) },
  { id: "glyph-rarity-100",  name: "Set Glyph Rarity back to 100%",                 cost: Decimal.pow(10, 50) },

  // 1e54 – 1e57
  { id: "imag-row3-each",    name: "Reenable Row 3 Imaginary Upgrades (each)",      cost: Decimal.pow(10, 54) },
  { id: "altered-glyph-effects", name: "Reenable Altered Glyph Effects",            cost: Decimal.pow(10, 55) },
  { id: "continuum-buff",    name: "Reenable Continuum Buff",                       cost: Decimal.pow(10, 56) },
  { id: "imag-row4-each",    name: "Reenable Row 4 Imaginary Upgrades (each)",      cost: Decimal.pow(10, 57) },

  // 1e60
  { id: "imag-row5-each",    name: "Reenable Row 5 Imaginary Upgrades (each)",      cost: Decimal.pow(10, 60) },
  { id: "singularities",     name: "Reenable Singularities and Singularity Milestones", cost: Decimal.pow(10, 60) },

  // strikes
  { id: "pelle-strike-1",    name: "Disable the 1st Pelle Strike",                  cost: Decimal.pow(10, 60) },
  { id: "pelle-strike-2",    name: "Disable the 2nd Pelle Strike",                  cost: Decimal.pow(10, 70) },
  { id: "pelle-strike-3",    name: "Disable the 3rd Pelle Strike",                  cost: Decimal.pow(10, 80) },
  { id: "pelle-strike-4",    name: "Disable the 4th Pelle Strike",                  cost: Decimal.pow(10, 90) },
  { id: "pelle-strike-5",    name: "Disable the 5th Pelle Strike",                  cost: Decimal.pow(10, 100) }
];


