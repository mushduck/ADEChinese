const thisInfinityMult = thisInfinity => {
  // All "this inf time" or "best inf time" mults are * 10
  const scaledInfinity = thisInfinity.times(10).plus(1);
  const cappedInfinity = Decimal.min(Decimal.pow(scaledInfinity, 0.125), 500);
  return DC.D15.pow(cappedInfinity.times(Decimal.ln(scaledInfinity)));
};
const passiveIPMult = () => {
  const isEffarigLimited = Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ETERNITY;
  const normalValue = (Perk.studyPassive.isBought && !player.disablePostReality) ? 1e50 : 1e25;
  return isEffarigLimited
    ? Math.min(normalValue, Effarig.eternityCap.toNumber())
    : normalValue;
};
/**
List of time study specifications and attributes
{
@property {Number} id                   Numerical ID shown for each time study in code and in-game
@property {Number} cost                 Amount of available time theorems required to purchase
@property {Number} STcost               Amount of available space theorems required to purchase if needed
@property {Object[]} requirement   Array of Numbers or functions which are checked to determine purchasability
@property {Number} reqType              Number specified by enum in TS_REQUIREMENT_TYPE for requirement behavior
@property {Number[]} requiresST    Array of Numbers indicating which other studies will cause this particular
study to also cost space theorems - in all cases this applies if ANY in the array are bought
@property {function: @return String} description  Text to be shown in-game for the time study's effects
@property {function: @return Number} effect       Numerical value for the effects of a study
@property {String[]} cap     Hard-coded cap for studies which don't scale forever
@property {String} formatEffect   Formatting function for effects, if the default formatting isn't appropriate
}
*/
export const normalTimeStudies = [
  {
    id: 11,
    cost: 1,
    // All requirements of an empty array will always evaluate to true, so this study is always purchasable
    requirement: [],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "基于计数频率为第一时间维度提供倍率加成",
    effect: () => {
      const tickspeed = Tickspeed.current.dividedBy(1000);
      const firstPart = tickspeed.pow(0.008).times(0.95);
      const secondPart = tickspeed.pow(0.00048).times(0.05);
      return firstPart.plus(secondPart).reciprocate();
    },
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E4000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 21,
    cost: 3,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `优化复制器加成无限维度的倍率计算公式 (log2(x)${formatPow(2)})+x${formatPow(0.04, 3, 3)}`,
    effect: () => Replicanti.amount.pow(0.04),
    // This is a special case because the study itself is added to the existing formula, but it makes more sense
    // to display a multiplicative increase just like every other study. We need to do the calculation in here in order
    // to properly show only the effect of this study and nothing else
    formatEffect: value => {
      const oldVal = Decimal.pow(Decimal.log2(Replicanti.amount.clampMin(1)), 2);
      const newVal = oldVal.plus(value);
      return formatX(newVal.div(oldVal.clampMin(1)), 2, 2);
    }
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `复制间隔最小值 ${formatInt(50)} 毫秒减少到 ${formatInt(1)} 毫秒`,
    effect: 1
  },
  {
    id: 31,
    cost: 3,
    requirement: [21],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `基于无限次数的奖励效力 ${formatPow(100)}`,
    effect: 100
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: `基于维度提升为无限次数获取量提供倍率加成`,
    effect: () => Decimal.max(DimBoost.totalBoosts.times(10), 1),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 33,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "在无限时保留一半的复制器星系"
  },
  {
    id: 41,
    cost: 4,
    requirement: [31],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `每个星系提供 ${formatX(DC.D1_2, 1, 1)} 倍无限点数加成`,
    effect: () => DC.D1_2.pow(GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(
      player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) :
      Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies)),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 42,
    cost: 6,
    requirement: [32],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `反物质星系增长需求的第八维度数量从 ${formatInt(60)} 个降至 ${formatInt(52)} 个`,
    effect: 52
  },
  {
    id: 51,
    cost: 3,
    requirement: [41, 42],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `无限点数获取量 ${formatX(1e15)}`,
    effect: 1e15
  },
  {
    id: 61,
    cost: 3,
    requirement: [51],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `永恒点数数获取量 ${formatX(25)}`,
    effect: 25
  },
  {
    id: 62,
    cost: 3,
    requirement: [42, () => (Perk.bypassEC5Lock.isBought && !player.disablePostReality) || EternityChallenge(5).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `复制速度 ${formatX(3)}`,
    effect: 3
  },
  {
    id: 71,
    cost: 4,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(12).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "维度献祭以较低的效果为其他所有反物质维度提供加成",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(4).add(1) : Sacrifice.totalBoost.pow(0.25).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E210000),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 72,
    cost: 6,
    requirement: [61,
      () => Perk.studyECRequirement.isBought ||
        (!EternityChallenge(11).isUnlocked && !EternityChallenge(12).isUnlocked)],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "维度献祭以极低的效果加成第四无限维度",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(25).add(1) : Sacrifice.totalBoost.pow(0.04).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E30000),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 73,
    cost: 5,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(11).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "维度献祭以极低的效果加成第三时间维度",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(200).add(1) : Sacrifice.totalBoost.pow(0.005).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E1300),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `维度提升的效果更改为 ${formatX(10)}`,
    effect: 10
  },
  {
    id: 82,
    cost: 6,
    requirement: [72],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "维度提升作用于无限维度",
    effect: () => DC.D1_0000109.pow(Decimal.pow(DimBoost.totalBoosts, 2)).min(Decimal.pow10(1e50)).times(
      DC.D1_0000109.pow(DimBoost.totalBoosts.sub(1e25).max(0).times(1e25))),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E1E7,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 83,
    cost: 5,
    requirement: [73],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于时间维度获得的计数频率升级，加成维度提升倍数",
    effect: () => DC.D1_0004.pow(player.totalTickGained).min(1e30).times(
      Decimal.pow(Decimal.max(player.totalTickGained.sub(172728), 1), 1000)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 91,
    cost: 4,
    requirement: [81],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于本次永恒中花费的时间，加成所有反物质维度",
    effect: () => Decimal.pow10(Decimal.min(Time.thisEternity.totalMinutes, 20).times(15).toNumber()).times(
      Time.thisEternity.totalMinutes.sub(20).times(15).max(1)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E300,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 92,
    cost: 5,
    requirement: [82],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于最快的永恒时间，加成所有无限维度",
    effect: () => DC.D2.pow(new Decimal(60).div(Time.bestEternity.totalSeconds)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.C2P30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于计数频率升级数量，给予所有时间维度倍数加成",
    effect: () => Decimal.pow(player.totalTickGained, 0.25).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 101,
    cost: 4,
    requirement: [91],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "所有反物质维度获得等于复制器数量的倍数加成",
    effect: () => Decimal.max(Replicanti.amount, 1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于复制器星系数量提升复制器的加成",
    effect: () => DC.D5.pow(player.replicanti.galaxies),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "时间维度获得等于复制器星系数量的加成",
    effect: () => Decimal.max(player.replicanti.galaxies, 1),
    formatEffect: value => formatX(value, 2, 0)
  },
  {
    id: 111,
    cost: 12,
    requirement: [101, 102, 103],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => (Achievement(103).canBeApplied
      ? `优化无限点数公式 log(x)/${formatFloat(307.8, 1)} ➜ log(x)/${formatInt(280)}`
      : `优化无限点数公式 log(x)/${formatInt(308)} ➜ log(x)/${formatInt(280)}`),
    effect: 280
  },
  {
    id: 121,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [122, 123],
    description: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? `永恒点数获取量 ${formatX(50)}`
      : `前 ${formatInt(10)} 次永恒越快，永恒点数加成越多${PlayerProgress.realityUnlocked() ? "（用真实时间计算）" : ""}`),
    effect: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? 50
      : Math.clamp(250 / Player.averageRealTimePerEternity, 1, 50)),
    formatEffect: value => ((Perk.studyActiveEP.isBought && !player.disablePostReality) ? undefined : formatX(value, 1, 1)),
    cap: 50
  },
  {
    id: 122,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 123],
    description: () => ((Perk.studyPassive.isBought && !player.disablePostReality)
      ? `永恒点数获取量 ${formatX(50)}`
      : `永恒点数获取量 ${formatX(35)}`),
    effect: () => ((Perk.studyPassive.isBought && !player.disablePostReality) ? 50 : 35)
  },
  {
    id: 123,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 122],
    description: "基于花费在当前永恒上的时间为永恒点数获取量提供倍率加成",
    effect: () => {
      const perkEffect = (player.disablePostReality
        ? TimeSpan.fromMinutes(DC.D0)
        : TimeSpan.fromMinutes(new Decimal(Perk.studyIdleEP.effectOrDefault(0))));
      const totalSeconds = Alpha.isRunning ? Time.thisEternityRealTime.totalSeconds : Time.thisEternity.plus(perkEffect).totalSeconds;
      return Decimal.pow(new Decimal(1.39).times(totalSeconds), 0.5);
    },
    formatEffect: value => formatX(value, 1, 1)
  },
  {
    id: 131,
    cost: 5,
    STCost: 8,
    requirement: [121],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [132, 133],
    description: () => (Achievement(138).isUnlocked
      ? `复制器星系获取量提高 ${formatPercents(0.5)}`
      : `禁用自动购买复制器星系，但复制器星系获取量提高 ${formatPercents(0.5)}`),
    effect: () => Decimal.floor(player.replicanti.boughtGalaxyCap.div(2))
  },
  {
    id: 132,
    cost: 5,
    STCost: 8,
    requirement: [122],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 133],
    description: () => ((Pelle.isDoomed && !PelleDestructionUpgrade.timestudy132.canBeApplied)
      ? `复制器星系的效果提高 ${formatPercents(0.4)}`
      : `复制器星系的效果提高 ${formatPercents(0.4)}，且复制速度 ${(Perk.studyPassive.isBought && !player.disablePostReality) ? formatX(3) : formatX(1.5, 1, 1)}`),
    effect: 0.4
  },
  {
    id: 133,
    cost: 5,
    STCost: 8,
    requirement: [123],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 132],
    description: () => (Achievement(138).isUnlocked
      ? `复制器星系的效果提高 ${formatPercents(0.5)}`
      : `复制速度在复制器达到 ${format(Number.MAX_VALUE, 2)} 之前 ÷ ${formatInt(10)}，但复制器星系的效果提高 ${formatPercents(0.5)}`),
    effect: 0.5
  },
  {
    id: 141,
    cost: 4,
    STCost: 2,
    requirement: [131],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [142, 143],
    description: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? `无限点数获取量 ${formatX(DC.E45)}`
      : "为无限点数提供在本次无限中逐渐衰减的倍率加成"),
    effect: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? DC.E45
      : DC.E45.divide(thisInfinityMult(Alpha.isRunning
        ? Time.thisInfinityRealTime.totalSeconds
        : Time.thisInfinity.totalSeconds)).clampMin(1)),
    formatEffect: value => ((Perk.studyActiveEP.isBought && !player.disablePostReality) ? undefined : formatX(value, 2, 1))
  },
  {
    id: 142,
    cost: 4,
    STCost: 2,
    requirement: [132],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 143],
    description: () => `无限点数获取量 ${formatX(passiveIPMult())}`,
    effect: passiveIPMult,
    cap: () => (Effarig.eternityCap === undefined ? undefined : Effarig.eternityCap.toNumber())
  },
  {
    id: 143,
    cost: 4,
    STCost: 2,
    requirement: [133],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 142],
    description: "为无限点数提供在本次无限中逐渐增加的倍率加成",
    effect: () => {
      const perkEffect = (player.disablePostReality
        ? TimeSpan.fromMinutes(DC.D0)
        : TimeSpan.fromMinutes(new Decimal(Perk.studyIdleEP.effectOrDefault(0))));
      const totalSeconds = Alpha.isRunning ? Time.thisInfinityRealTime.totalSeconds : Time.thisInfinity.plus(perkEffect).totalSeconds;
      return thisInfinityMult(totalSeconds);
    },
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  {
    id: 151,
    cost: 8,
    requirement: [141, 142, 143],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `所有时间维度倍率 ${formatX(1e6)}`,
    effect: 1e6
  },
  {
    id: 161,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `所有反物质维度倍率 ${formatX(DC.E616)}`,
    effect: () => DC.E616
  },
  {
    id: 162,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `所有无限维度倍率 ${formatX(1e11)}`,
    effect: 1e11
  },
  {
    id: 171,
    cost: 15,
    requirement: [161, 162],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `下一个免费计数频率升级所需的时间碎片增速减缓 ${formatX(1.33, 0, 2)} ➜ ${formatX(1.25, 0, 2)}`,
    effect: () => TS171_MULTIPLIER
  },
  {
    id: 181,
    cost: 200,
    requirement: [171,
      () => EternityChallenge(1).completions > 0 || (Perk.bypassEC1Lock.isBought && !player.disablePostReality),
      () => EternityChallenge(2).completions > 0 || (Perk.bypassEC2Lock.isBought && !player.disablePostReality),
      () => EternityChallenge(3).completions > 0 || (Perk.bypassEC3Lock.isBought && !player.disablePostReality)],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `每秒钟自动获得大坍缩时能获得的无限点数的 ${formatPercents(0.01)}`,
    effect: () => gainedInfinityPoints().times(Time.deltaTime.div(100))
      .timesEffectOf(Ra.unlocks.continuousTTBoost.effects.autoPrestige)
  },
  {
    id: 191,
    cost: 400,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `永恒时，永久保留 ${formatPercents(0.05)} 的无限次数并得到双倍的无限次数`,
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }
  },
  {
    id: 192,
    cost: 730,
    requirement: [181, () => EternityChallenge(10).completions > 0, () => !Enslaved.isRunning],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => (Enslaved.isRunning
      ? "这个现实中没有足够的空间"
      : `复制器数量可以超过 ${format(replicantiCap(), 2, 1)}，但是增长速度将会变慢`)
  },
  {
    id: 193,
    cost: 300,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "基于永恒次数为反物质维度提供倍率加成",
    effect: () => DC.E2000.pow(Currency.eternities.value.div(1e5).clampMax(15)).times(
      DC.E2000.pow(Decimal.log10(Currency.eternities.value.sub(1.4e6).div(1e5).max(1)))),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E30000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 201,
    cost: 900,
    requirement: [192],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "在时间研究树的维度分叉上额外选择多一个路径"
  },
  {
    id: 211,
    cost: 120,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `维度提升的价格增速减少 ${formatInt(5)}`,
    effect: 5
  },
  {
    id: 212,
    cost: 150,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于时间碎片数量提升星系效力",
    effect: () => Decimal.pow(Currency.timeShards.value.clampMin(2).log2(), 0.008).min(1.2).times(
      Currency.timeShards.value.clampMin(2).log2().add(1).log2().add(1).log2().sub(2.1).div(3).max(1)).toNumber(),
    cap: () => Alpha.isDestroyed ? Infinity : 1.2,
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 213,
    cost: 200,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `复制速度 ${formatX(50)}`,
    effect: 50
  },
  {
    id: 214,
    cost: 120,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "维度献祭进一步增强第八维度",
    effect: () => {
      if (Ascensions.sacA.isUnlocked) return Sacrifice.totalPower.sub(1).times(21.5).add(1);
      const totalBoost = Sacrifice.totalBoost;
      const firstPart = totalBoost.pow(18).clampMaxExponent(Alpha.isDestroyed ? Infinity : 300000);
      const secondPart = totalBoost.pow(3.5).clampMaxExponent(Alpha.isDestroyed ? Infinity : 700000);
      return firstPart.times(secondPart);
    },
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E1E6),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 221,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [222],
    description: "基于维度提升为时间维度提供倍率加成。",
    effect: () => DC.D1_0025.pow(DimBoost.totalBoosts),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 222,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [221],
    description: () => `维度提升的价格增速进一步减少 ${formatInt(2)}`,
    effect: 2
  },
  {
    id: 223,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [224],
    description: () => `遥远星系的价格增长推迟 ${formatInt(7)} 星系`,
    effect: 7
  },
  {
    id: 224,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [223],
    description() {
      const effect = TimeStudy(224).effectValue;
      return `遥远星系的价格增长推迟 ${formatInt(effect)} 星系（每 ${formatInt(2000)} 次维度提升后多推迟 ${formatInt(1)} 星系）`;
    },
    effect: () => Decimal.floor(DimBoost.totalBoosts.div(2000)).toNumber()
  },
  {
    id: 225,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [226],
    description: "基于复制器数量获得额外的复制器星系",
    effect: () => Decimal.floor(Replicanti.amount.add(1).log10().div(1000).min(1e10).times(Replicanti.amount.add(1).log10().add(1).log10().sub(3).div(10).max(1))),
    formatEffect: value => `+${formatHybridLarge(value, 3)} 复制器星系`
  },
  {
    id: 226,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [225],
    description: "基于最大复制器星系数量，获得额外的复制器星系",
    effect: () => Decimal.floor(player.replicanti.boughtGalaxyCap.div(12)),
    formatEffect: value => `+${formatHybridLarge(value, 3)} 复制器星系`
  },
  {
    id: 227,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [228],
    description: "维度献祭以较低的程度影响第四时间维度",
    effect: () => Decimal.max(Decimal.pow(Sacrifice.totalBoost.add(1).pLog10(), 20), 1),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E300,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 228,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [227],
    description: () => `优化维度献祭的加成公式 ${Sacrifice.getSacrificeDescription({ "TimeStudy228": false })} ➜ ${Sacrifice.getSacrificeDescription({ "TimeStudy228": true })}`,
    effect: 0.2
  },
  {
    id: 231,
    cost: 500,
    STCost: 5,
    requirement: [221, 222],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [232],
    description: "维度提升越多，效果越强大",
    effect: () => Decimal.pow(DimBoost.totalBoosts, 0.375).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 232,
    cost: 500,
    STCost: 5,
    requirement: [223, 224],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [231],
    description: "基于反物质星系数量提升星系效力",
    effect: () => Decimal.pow(player.galaxies.div(500).add(1), 0.25).toNumber(),
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 233,
    cost: 500,
    STCost: 5,
    requirement: [225, 226],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [234],
    description: "基于当前复制器数量降低复制器星系上限升级价格",
    effect: () => Replicanti.amount.pow(0.625),
    formatEffect: value => `/ ${format(value, 1, 2)}`
  },
  {
    id: 234,
    cost: 500,
    STCost: 5,
    requirement: [227, 228],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [233],
    description: "维度献祭提速第一维度",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower : Sacrifice.totalBoost,
  },
  // Note: These last 4 entries are the triad studies
  {
    id: 301,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1, 221, 222, 231],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [221, 222, 231],
    description: "时间研究231提升时间研究221的效果",
    effect: () => Decimal.pow(TimeStudy(221).effectValue.pow(TimeStudy(231).effectValue.minus(1)),
      Ra.unlocks.triadBuff.effectOrDefault(1)).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1
  },
  {
    id: 302,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2, 223, 224, 232],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [223, 224, 232],
    description: () => `遥远星系的价格增长再推迟 ${formatInt(Math.pow(3000, Ra.unlocks.triadBuff.effectOrDefault(1)))} 星系`,
    effect: () => Math.pow(3000, Ra.unlocks.triadBuff.effectOrDefault(1)),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2
  },
  {
    id: 303,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3, 225, 226, 233],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [225, 226, 233],
    description: () => `从时间研究225、226以及鹿颈长的无限奖励中多获得${formatPercents(0.5 * Ra.unlocks.triadBuff.effectOrDefault(1))}复制器星系`,
    effect: () => 1 + 0.5 * Ra.unlocks.triadBuff.effectOrDefault(1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3
  },
  {
    id: 304,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4, 227, 228, 234],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [227, 228, 234],
    description: () => (Ra.unlocks.triadBuff.canBeApplied
      ? `维度献祭的倍数 ^ ${format(2 * Ra.unlocks.triadBuff.effectOrDefault(1), 2, 2)}`
      : `维度献祭的倍数 ^ ${formatInt(2)}`),
    effect: () => 2 * Ra.unlocks.triadBuff.effectOrDefault(1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4
  }
];