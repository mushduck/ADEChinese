const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.dualityRebuyables[props.id],
    1e20,
    props.initialCost,
    props.costMult,
    props.costMult,
    DC.E309,
    1e3,
    props.costMult
  );
  const { effect } = props;
  if (props.isDecimal) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.reality.dualityRebuyables[props.id]);
  else if (props.isQuadratic) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, (player.reality.dualityRebuyables[props.id] + 1) * (player.reality.dualityRebuyables[props.id] / 2));
  else props.effect = () => player.disablePostReality ? 1 : effect * player.reality.dualityRebuyables[props.id];
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};
export const dualityUpgrades = [
  rebuyable({
    name: "时间飞升器",
    id: 1,
    initialCost: 1,
    costMult: 50,
    description: () => `时间强化器的倍率+${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "复制飞升器",
    id: 2,
    initialCost: 3,
    costMult: 60,
    description: () => `复制强化器的倍率+${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "永恒飞升器",
    id: 3,
    initialCost: 8,
    costMult: 45,
    description: () => `永恒强化器的倍率+${format(0.02, 2, 2)}`,
    effect: 0.02
  }),
  rebuyable({
    name: "超光速飞升器",
    id: 4,
    initialCost: 18,
    costMult: 75,
    description: () => `超光速强化器的倍率+${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "无界飞升器",
    id: 5,
    initialCost: 30,
    costMult: 36,
    description: () => `无界强化器的倍率+${format(0.03, 2, 2)}`,
    effect: 0.03
  }),
  rebuyable({
    name: "虚构双曲",
    id: 6,
    initialCost: 1e4,
    costMult: 360,
    description: () => `虚幻机器的上限提高${formatX(1e100)}`,
    effect: 1e100,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "符文赋能",
    id: 7,
    initialCost: 2e5,
    costMult: 750,
    description: () => `将符文等级的前${formatInt(4)}层软上限推迟${formatInt(2000)}级`,
    effect: 2000,
    formatEffect: value => `+${formatInt(value)} 级`
  }),
  rebuyable({
    name: "极构四方",
    id: 8,
    initialCost: 1.5e6,
    costMult: 1500,
    description: () => `将无限维度指数提升至${formatPow(1.25, 2, 3)}`,
    effect: 1.25,
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "星云纤丛",
    id: 9,
    initialCost: 1.2e7,
    costMult: 2400,
    description: () => `提升星系强度`,
    effect: 1.15,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "锢解之序",
    id: 10,
    initialCost: 2e8,
    costMult: 4000,
    description: () => `提高奇点获取`,
    effect: 1e100,
    formatEffect: value => `${formatX(value, 2)}`,
    isQuadratic: true
  }),
  {
    name: "恒律干涉",
    id: 11,
    cost: new Decimal(1e9),
    requirement: () => `获得${format("1e1640")}遗迹碎片
      (当前：${format(player.celestials.effarig.relicShards, 2)})`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards.gte(DC.E1640),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "基于强子化次数提升连续统购买加成",
    effect: () => player.disablePostReality ? 1 : Math.sqrt(Laitela.hadronizes),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "幻象之澜",
    id: 12,
    cost: new Decimal(6e9),
    requirement: () => `在所有符文等级因子均为${formatInt(0)}时获得一个等级至少为${formatInt(102500)}的符文`,
    hasFailed: () => !Object.values(player.celestials.effarig.glyphWeights).every(w => w === 0),
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).every(w => w === 0) &&
      gainedGlyphLevel().actualLevel.gte(102500),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "基于可重复购买的重构升级数量，提高免费维度提升获取",
    effect: () => player.disablePostReality ? 1 : 1 + Math.log10(DualityUpgrades.totalRebuyables) * 1.5,
    formatEffect: value => `${formatPow(value, 2, 3)}`
  },
  {
    name: "重构之瞬",
    id: 13,
    cost: new Decimal(2e10),
    requirement: () => `强子化莱特拉的现实${formatInt(12)}次`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.hadronizes >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于重构升级购买提高重构机器数量上限",
    effect: () => player.disablePostReality ? 1 : 1 + DualityUpgrades.totalRebuyables / 20 + DualityUpgrades.totalSinglePurchase / 2,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "腐化之忆",
    id: 14,
    cost: new Decimal(3e11),
    requirement: () => `达到${format("e1e666")}计数频率`,
    hasFailed: () => false,
    checkRequirement: () => Tickspeed.perSecond.log10().gte("1e666"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `连续统购买倍率${formatPow(1.2, 0, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    name: "创生之构",
    id: 15,
    cost: new Decimal(1e12),
    requirement: () => `本次终局全程不拥有无限、时间和第八反物质维度且不毁灭现实，在时间膨胀中达到${format("e5e55")}反物质`,
    hasFailed: () => !player.requirementChecks.endgame.onlyLowDims || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.onlyLowDims && player.dilation.active &&
      player.antimatter.add(1).log10().gte(5e55) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    description: "解锁强子",
  },
  {
    name: "临界动势",
    id: 16,
    cost: new Decimal(4e12),
    requirement: () => "让强子的效果达到上限",
    hasFailed: () => false,
    checkRequirement: () => Hadrons.timeFactor.times(4).gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁强子第二效果",
  },
  {
    name: "极旋振荡",
    id: 17,
    cost: new Decimal(9e12),
    requirement: () => `获得${format("1e44875")}奇点`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.laitela.singularities.gte("1e44875"),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: "解锁强子第三效果",
  },
  {
    name: "维度平衡",
    id: 18,
    cost: new Decimal(1.6e13),
    formatCost: x => format(x, 1),
    requirement: () => `在被毁灭的现实外星系总数达到${format(2.4e9, 1)}`,
    hasFailed: () => Pelle.isDoomed,
    checkRequirement: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
    player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)).gte(2.4e9) : Replicanti.galaxies.total.add(player.galaxies).add(
      player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies).gte(2.4e9) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁强子第四效果",
  },
  {
    name: "命定辐射",
    id: 19,
    cost: new Decimal(4.2e13),
    formatCost: x => format(x, 1),
    requirement: () => `在本次终局中，全程不购买时间研究，计数频率连续统达到${format(1e45)}`,
    hasFailed: () => player.requirementChecks.endgame.maxStudies > 0 || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.maxStudies <= 0 &&
      Tickspeed.continuumValue.gte(1e45) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `purchase more than ${formatInt(0)} Time Studies`,
    description: "解锁暗强子"
  },
  {
    name: "双极加速",
    id: 20,
    cost: new Decimal(1e16),
    requirement: () => `连续统加成达到${formatX(4444444, 2, 2)}`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor >= 4444444,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `解锁可重复购买的重构机器升级自动购买器，重构机器增速提高${formatInt(10)}倍`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    name: "消解天穹",
    id: 21,
    cost: new Decimal(3e17),
    requirement: () => `禁用连续统，在被毁灭的现实外达到${format("e1e88")}反物质`,
    hasFailed: () => !player.requirementChecks.endgame.noContinuum || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.noContinuum &&
      Currency.antimatter.value.add(1).log10().gte(1e88) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "enable Continuum",
    description: "基于重构机器增强暗强子",
    effect: () => player.disablePostReality ? 0 : Decimal.log10(Currency.dualMachines.value.add(1)).div(100).toNumber(),
    formatEffect: value => `+${formatPercents(value, 2, 2)}`
  },
  {
    name: "表象归墟",
    id: 22,
    cost: new Decimal(2e18),
    requirement: () => `本次终局中，全程不装备符文且不毁灭现实，达到${format("e1e85")}反物质`,
    hasFailed: () => !player.requirementChecks.endgame.noGlyphs || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.noGlyphs &&
      Currency.antimatter.value.add(1).log10().gte(1e85) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "equip Glyphs",
    description: () => `符文献祭值${formatPow(1.2, 2, 3)}`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    name: "超体浊化",
    id: 23,
    cost: new Decimal(6e18),
    requirement: () => `至多装备-15个符文，在太阳神的现实中达到${formatInt(385000)}符文等级`,
    hasFailed: () => !Ra.isRunning ||
      player.requirementChecks.reality.maxGlyphs > -15,
    checkRequirement: () => Ra.isRunning &&
      player.requirementChecks.reality.maxGlyphs <= -15 && gainedGlyphLevel().actualLevel.gte(385000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于超立方体数量提高星系强度",
    effect: () => player.disablePostReality ? 1 : Tesseracts.effectiveCount / 100,
    formatEffect: value => `${formatX(value)}`
  },
  {
    name: "归一破灭",
    id: 24,
    cost: new Decimal(1.5e19),
    formatCost: x => format(x, 1),
    requirement: () => `不激发天界物质，在太阳神的现实中获得${format(106e6, 2, 2)}反物质星系`,
    hasFailed: () => !Ra.isRunning || !player.requirementChecks.reality.noCelMatter,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.noCelMatter &&
      player.galaxies.gte(106e6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "turn on Celestial Matter",
    description: "基于奇点数量提高星系强度",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.log10(player.celestials.laitela.singularities.add(1)).div(10000),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "全维创构",
    id: 25,
    cost: new Decimal(1e20),
    requirement: () => `${formatInt(32)}颗暗强子效果达到上限`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.laitela.hadrons.dark >= 32 && Hadrons.timeFactor.div(5).gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁超多方体",
  },
];
