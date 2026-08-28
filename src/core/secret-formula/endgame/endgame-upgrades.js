const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.endgame.rebuyables[props.id],
    1e100,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  if (props.isDecimal) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.endgame.rebuyables[props.id]);
  else props.effect = () => player.disablePostReality ? 1 : Math.pow(effect, player.endgame.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}", format(effect, 2, 2));
  props.formatEffect = value => formatX(value, 2, 2);
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const endgameUpgrades = [
  rebuyable({
    name: "反物质优化器",
    id: 1,
    initialCost: 1e40,
    costMult: 60,
    textTemplate: "将无限升级23软上限推迟{value}倍",
    effect: 1.2,
    isDecimal: true
  }),
  rebuyable({
    name: "无限优化器",
    id: 2,
    initialCost: 1e42,
    costMult: 300,
    textTemplate: "将无限维度压缩因子软上限减益乘以{value}",
    effect: 0.99
  }),
  rebuyable({
    name: "时间优化器",
    id: 3,
    initialCost: 1e44,
    costMult: 150,
    textTemplate: "将时间维度压缩因子软上限减益乘以{value}",
    effect: 0.99
  }),
  rebuyable({
    name: "黑暗优化器",
    id: 4,
    initialCost: 1e48,
    costMult: 480,
    textTemplate: "将暗物质数量硬上限推迟{value}倍",
    effect: 1e25,
    isDecimal: true
  }),
  rebuyable({
    name: "天界优化器",
    id: 5,
    initialCost: 1e56,
    costMult: 120,
    textTemplate: "将天界物质数量软上限推迟{value}倍",
    effect: 2,
    isDecimal: true
  }),
  {
    name: "策源新生",
    id: 6,
    cost: new Decimal(1e45),
    requirement: () => `在未购买星系生成器第六升级时到达 ${format(DC.E280)} 现实碎片`,
    hasFailed: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount > 0,
    checkRequirement: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount === 0 && Currency.realityShards.gte(DC.E280) && 
      player.endgames >= 10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "purchase the 6th Galaxy Generator Upgrade",
    description: () =>
      `开始终局时拥有 ${format(1e7)} 复兴点数，${formatInt(1000)} 现实次数，${format(1e12)} 遗迹碎片和所有无名氏升级，且两个黑洞永久启动`
  },
  {
    name: "灾厄之刻",
    id: 7,
    cost: new Decimal(1e52),
    requirement: () => `游戏时间达到 ${formatPostBreak("1e666")} 年`,
    checkRequirement: () => Time.totalTimePlayed.totalYears.gt(Decimal.pow(10, 666)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "在天神现实外激发天界物质时提升游戏速度至本次终局的最大游戏速度"
  },
  {
    name: "终局回馈",
    id: 8,
    cost: new Decimal(1e60),
    requirement: () => `在现实时间 ${formatInt(10)} 分钟内完成终局`,
    hasFailed: () => Time.thisEndgameRealTime.totalMinutes.gte(10),
    checkRequirement: () => Time.bestEndgameRealTime.totalMinutes.lt(10),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `以最快终局 ${formatInt(10)}% 的真实速度生成终局次数`,
    effect: () => player.disablePostReality ? DC.NUMMAX : new Decimal(player.records.bestEndgame.realTime * 10),
    formatEffect: value => {
      if (new Decimal(value).gte(9999999999)) return "无终局次数生成";
      let endgames = 1;
      endgames *= ((ExpansionPack.enslavedPack.isBought && !player.disablePostReality)
        ? Math.floor(1 + Math.pow(Math.log10(Math.min(Tesseracts.effectiveCount, 1000) * Math.max(Math.log10(Tesseracts.effectiveCount) - 2, 1) + 1), Math.log10(player.endgames + 1)))
        : 1);
      endgames *= Math.pow(1.33, Alpha.currentStage);
      if (DivinityMilestone.firstDivine.isReached && !player.disablePostReality) endgames *= 10;
      endgames *= DivineDimensions.conversionFormula1.toNumber();
      const timeStr = Time.bestEndgameRealTime.totalMilliseconds.lte(100) && !Alpha.isDestroyed
        ? `${TimeSpan.fromMilliseconds(new Decimal(1000)).toStringShort()} (已达到上限)`
        : (Time.bestEndgameRealTime.totalMilliseconds.lte(33)
           ? `${TimeSpan.fromMilliseconds(new Decimal(330)).toStringShort()} (已达到上限)`
           : `${TimeSpan.fromMilliseconds(new Decimal(value)).toStringShort()}`);
      return `每 ${timeStr} 生成 ${quantify("终局次数", endgames)}`;
    }
  },
  {
    name: "虚缈微光",
    id: 9,
    cost: new Decimal(1e70),
    requirement: "不购买虚幻升级“理想之构”时，完成前四行虚幻升级的条件",
    hasFailed: () => ImaginaryUpgrade(15).isBought,
    checkRequirement: () => !ImaginaryUpgrade(15).isBought && ImaginaryUpgrade(16).isBought && ImaginaryUpgrade(17).isBought &&
      ImaginaryUpgrade(18).isBought && ImaginaryUpgrade(19).isBought && ImaginaryUpgrade(20).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "purchase Fabrication of Ideals",
    description: "终局后保留虚幻升级"
  },
  {
    name: "天神纷扰",
    id: 10,
    cost: new Decimal(1e83),
    requirement: () => "灌注特蕾莎前完成所有鹿颈长、无名氏、薇和太阳神的挑战",
    hasFailed: () => player.celestials.teresa.pouredAmount.gt(0),
    checkRequirement: () => player.celestials.teresa.pouredAmount.eq(0) &&
      EffarigUnlock.reality.isUnlocked && Enslaved.isCompleted && V.spaceTheorems >= 36 && Ra.totalPetLevel >= 100,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "pour RM into Teresa",
    description: () => "终局后保留特蕾莎挑战记录"
  },
  {
    name: "九律归寂",
    id: 11,
    cost: new Decimal(1e50),
    requirement: () => `达到 ${format(1e50)} 天界物质`,
    checkRequirement: () => Currency.celestialMatter.value.add(1).log10().gte(50),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () =>
      `无限挑战8奖励硬上限推迟${formatPow(9)},
      所有天界维度倍率${formatX(9)}`,
    effect: () => player.disablePostReality ? 1 : 9
  },
  {
    name: "崩基之兆",
    id: 12,
    cost: new Decimal(1e68),
    requirement: "达到星系生成器的第二软上限",
    checkRequirement: () => GalaxyGenerator.galaxies.gte(1e60),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `星系生成器不稳定性进一步减少${formatInt(1)}`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    name: "障破之瞬",
    id: 13,
    cost: new Decimal(1e78),
    requirement: () => `达到${formatInt(76543)}符文等级`,
    checkRequirement: () => player.records.bestEndgame.glyphLevel.gte(76543),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "削弱符文等级第三软上限"
  },
  {
    name: "星辉灌注",
    id: 14,
    cost: new Decimal(1e84),
    requirement: () => `不购买星系生成器第六升级时达到 ${format(1e40)} 星系`,
    hasFailed: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount > 0,
    checkRequirement: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount === 0 && GalaxyGenerator.galaxies.gte(1e40) && 
      player.endgames >= 10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "purchase the 6th Galaxy Generator Upgrade",
    description: () => `星系生成器第二不稳定性降低${formatPercents(0.1)}`,
    effect: () => player.disablePostReality ? 1 : 0.9
  },
  {
    name: "逆质汇集",
    id: 15,
    cost: new Decimal(1e150),
    requirement: () => `在被毁灭的现实外达到 ${format(Decimal.pow(10, 1e33))} 反物质`,
    hasFailed: () => Pelle.isDoomed,
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(1e33) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `基于虚幻机器数量为反物质指数提供指数加成`,
    effect: () => player.disablePostReality ? 1 : 1 + (Decimal.pow(Decimal.log10(Decimal.log10(
      player.reality.imaginaryMachines.add(1)).add(1)), 2).min(10).add(Decimal.log10(Decimal.log10(
      player.reality.imaginaryMachines.add(1)).add(1)).sub(Math.sqrt(10)).max(0)).div(200)).toNumber(),
    formatEffect: value => formatPow(value, 2, 4)
  },
  {
    name: "星能储备",
    id: 16,
    cost: new Decimal(1e55),
    requirement: () => `达到 ${format(1e10)} 星系之力`,
    checkRequirement: () => Currency.galacticPower.gte(1e10),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁终局专精第二资源路径",
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    name: "演算凝缩",
    id: 17,
    cost: new Decimal(1e65),
    requirement: () => `达到 ${format(1e20)} 星系之力`,
    checkRequirement: () => Currency.galacticPower.gte(1e20),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁终局专精第二维度路径",
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    name: "星能扩增",
    id: 18,
    cost: new Decimal(1e75),
    requirement: () => `达到 ${format(1e30)} 星系之力`,
    hasFailed: () => !EndgameUpgrade(16).isBought,
    checkRequirement: () => Currency.galacticPower.gte(1e30) && EndgameUpgrade(16).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁终局专精第三资源路径",
    effect: () => player.disablePostReality ? 1 : 3
  },
  {
    name: "维度延展",
    id: 19,
    cost: new Decimal(1e85),
    requirement: () => `达到 ${format(1e40)} 星系之力`,
    hasFailed: () => !EndgameUpgrade(17).isBought,
    checkRequirement: () => Currency.galacticPower.gte(1e40) && EndgameUpgrade(17).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁终局专精第三维度路径",
    effect: () => player.disablePostReality ? 1 : 3
  },
  {
    name: "全能之盈",
    id: 20,
    cost: new Decimal(1e95),
    requirement: () => `达到 ${format(1e50)} 星系之力`,
    hasFailed: () => !(EndgameUpgrade(18).isBought && EndgameUpgrade(19).isBought),
    checkRequirement: () => Currency.galacticPower.gte(1e50) && EndgameUpgrade(18).isBought && EndgameUpgrade(19).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁终局专精第四维度和资源路径",
    effect: () => player.disablePostReality ? 1 : 4
  },
  {
    name: "无限精进",
    id: 21,
    cost: Decimal.pow(10, 120),
    requirement: "购买移除无限点数倍增升级购买硬上限的打破永恒升级",
    hasFailed: () => !BreakEternityUpgrade.doubleIPUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.doubleIPUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "移除无限点数倍增升级购买软上限"
  },
  {
    name: "超光擢升",
    id: 22,
    cost: Decimal.pow(10, 170),
    requirement: "购买去除超光速粒子星系阈值的打破永恒升级",
    hasFailed: () => !BreakEternityUpgrade.tgThresholdUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.tgThresholdUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `基于终局次数给超光速星系阈值升级提供指数加成`,
    effect: () => player.disablePostReality ? 1 : 1 / Math.log10(player.endgames + 1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  {
    name: "四维测度",
    id: 23,
    cost: Decimal.pow(10, 240),
    requirement: "购买翻倍有效超立方体数量的打破永恒升级",
    hasFailed: () => !BreakEternityUpgrade.tesseractMultiplier.isBought,
    checkRequirement: () => BreakEternityUpgrade.tesseractMultiplier.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于天界点数数量推迟免费超立方体获取的软上限",
    effect: () => player.disablePostReality ? 1 : Math.pow(1 + Decimal.log10(Decimal.max(Decimal.log10(player.endgame.celestialPoints.max(1)).div(200), 1)).toNumber(), 2),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "净化激能",
    id: 24,
    cost: Decimal.pow(10, 330),
    requirement: () => `购买去除符文献祭效果上限的打破永恒升级`,
    hasFailed: () => !BreakEternityUpgrade.glyphSacrificeUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.glyphSacrificeUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于天界物质数量提高符文献祭值",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.max(Decimal.log10(Decimal.log10(player.endgame.celestialMatter.add(1)).add(1)).div(2), 1), 1.5).toNumber(),
    formatEffect: value => formatPow(value, 2, 3)
  },
  {
    name: "统御激涌",
    id: 25,
    cost: Decimal.pow(10, 440),
    requirement: () => `购买增加3个符文槽的打破永恒升级`,
    hasFailed: () => !BreakEternityUpgrade.glyphSlotImprovement.isBought,
    checkRequirement: () => BreakEternityUpgrade.glyphSlotImprovement.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于反物质数量提高符文等级，该效果在符文不稳定性削弱后结算",
    effect: () => player.disablePostReality ? 1 : Decimal.min(Decimal.pow(Decimal.max(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(100), 1), 0.05), 1.2).toNumber(),
    formatEffect: value => formatX(value, 2, 4)
  },
];
