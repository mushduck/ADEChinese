// This is supposed to be in ./navigation.js but importing doesn't work for some stupid reason
// progress should always return number, even if it will return infinity
function emphasizeEnd(fraction) {
return Decimal.pow(fraction, 10).toNumber();
}
function rebuyableCost(initialCost, increment, id) {
return initialCost * Math.pow(increment, player.celestials.v.upgrades[id]);
}
function rebuyable(config) {
const { id, cap, costCap, description, formatEffect, formatCost } = config;
return {
id,
cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
cap,
costCap,
description,
effect: () => config.effect(player.celestials.v.upgrades[config.id]),
formatEffect,
formatCost,
rebuyable: true
};
}
export const V_REDUCTION_MODE = {
SUBTRACTION: 1,
DIVISION: 2
};
export const v = {
// Note: mainUnlock IDs here are one-indexed to match with navigation indices
mainUnlock: {
realities: {
id: 1,
name: "现实次数",
resource: () => Currency.realities.value,
requirement: 1250,
format: x => formatInt(x),
progress: () => new Decimal(Currency.realities.value).div(EndgameMastery(51).effectOrDefault(1250)).toNumber(),
},
eternities: {
id: 2,
name: "永恒次数",
resource: () => Currency.eternities.value,
requirement: 1e70,
format: x => format(x, 2),
progress: () => emphasizeEnd(Currency.eternities.value.add(1).pLog10().div(70)),
},
infinities: {
id: 3,
name: "无限次数",
resource: () => Currency.infinitiesTotal.value,
requirement: 1e160,
format: x => format(x, 2),
progress: () => emphasizeEnd(Currency.infinitiesTotal.value.add(1).pLog10().div(160)),
},
dilatedTime: {
id: 4,
name: "膨胀时间",
resource: () => player.records.thisReality.maxDT,
requirement: DC.E320,
format: x => format(x, 2),
progress: () => emphasizeEnd(player.records.thisReality.maxDT.add(1).pLog10().div(320)),
},
replicanti: {
id: 5,
name: "复制器",
resource: () => player.records.thisReality.maxReplicanti,
requirement: DC.E320000,
format: x => format(x, 2),
progress: () => emphasizeEnd(player.records.thisReality.maxReplicanti.add(1).pLog10().div(320000)),
},
realityMachines: {
id: 6,
name: "现实机器",
resource: () => Currency.realityMachines.value,
requirement: 1e60,
format: x => format(x, 2),
progress: () => emphasizeEnd(Currency.realityMachines.value.add(1).pLog10().div(60)),
},
},
runUnlocks: [
{
id: 0,
name: "符文骑士",
description: value => `装备至多 ${formatInt(-value)} 个符文时，达成现实。`,
// This achievement has internally negated values since the check is always greater than
values: [-5, -4, -3, -2, -1, 0],
condition: () => V.isRunning && TimeStudy.reality.isBought,
currentValue: () => new Decimal(-Glyphs.activeWithoutCompanion.length),
formatRecord: x => (x.gte(-5) ? formatInt(x.neg()) : "未完成"),
shardReduction: () => 0,
maxShardReduction: () => 0,
mode: V_REDUCTION_MODE.SUBTRACTION
},
{
id: 1,
name: "反星穿越",
description: value => `所有种类的星系总数达到 ${formatInt(value)}`,
values: [4000, 4300, 4600, 4900, 5200, 5500],
condition: () => V.isRunning,
currentValue: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) : Replicanti.galaxies.total.add(player.galaxies).add(
player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies),
formatRecord: x => formatHybridLarge(x, 3),
shardReduction: tiers => Math.floor(300 * tiers),
maxShardReduction: goal => goal - 4000,
perReductionStep: 3,
mode: V_REDUCTION_MODE.SUBTRACTION
},
{
id: 2,
name: "7 质罪",
description: value => `在永恒挑战7 中获得 ${format(Decimal.pow10(value))} 无限点数`,
values: [6e5, 7.2e5, 8.4e5, 9.6e5, 1.08e6, 1.2e6],
condition: () => V.isRunning && EternityChallenge(7).isRunning,
currentValue: () => Currency.infinityPoints.value.add(1).log10(),
formatRecord: x => format(Decimal.pow10(x), 2),
shardReduction: tiers => 1.2e5 * tiers,
maxShardReduction: goal => goal - 6e5,
perReductionStep: DC.E1200,
mode: V_REDUCTION_MODE.DIVISION
},
{
id: 3,
name: "少年郎",
description: value => `不解锁时间膨胀的前提下，在永恒挑战 12 中获得 ${format(Decimal.pow10(value))} 反物质。`,
values: [400e6, 450e6, 500e6, 600e6, 700e6, 800e6],
condition: () => V.isRunning && EternityChallenge(12).isRunning && !PlayerProgress.dilationUnlocked(),
currentValue: () => Currency.antimatter.value.add(1).log10(),
formatRecord: x => format(Decimal.pow10(x)),
shardReduction: tiers => 50e6 * tiers,
maxShardReduction: goal => goal - 400e6,
perReductionStep: DC.E500000,
mode: V_REDUCTION_MODE.DIVISION
},
{
id: 4,
name: "永恒阳光",
description: value => `获得 ${format(Decimal.pow10(value))} 永恒点数。`,
values: [7000, 7600, 8200, 8800, 9400, 10000],
condition: () => V.isRunning,
currentValue: () => Currency.eternityPoints.value.add(1).log10(),
formatRecord: x => format(Decimal.pow10(x), 2),
shardReduction: tiers => 600 * tiers,
maxShardReduction: goal => goal - 7000,
perReductionStep: 1e6,
mode: V_REDUCTION_MODE.DIVISION
},
{
id: 5,
name: "盗物空间",
description: value => `在时间膨胀之中，进入永恒挑战5, 并获得 ${formatInt(value)} 个维度提升。`,
values: [51, 52, 53, 54, 55, 56],
condition: () => V.isRunning && player.dilation.active && EternityChallenge(5).isRunning,
currentValue: () => DimBoost.purchasedBoosts,
formatRecord: x => formatHybridLarge(x, 3),
shardReduction: tiers => Math.floor(tiers),
maxShardReduction: () => 5,
reductionStepSize: 100,
perReductionStep: 1,
mode: V_REDUCTION_MODE.SUBTRACTION
},
{
id: 6,
name: "符文安魂曲",
description: value => `现实全程装备至多 ${formatInt(-value)} 个符文，达成现实。`,
// This achievement has internally negated values since the check is always greater than
values: [1, 4, 7, 10, 13],
condition: () => V.isRunning && TimeStudy.reality.isBought,
currentValue: () => new Decimal(-player.requirementChecks.reality.maxGlyphs),
formatRecord: x => formatInt(x.neg()),
shardReduction: () => 0,
maxShardReduction: () => 0,
mode: V_REDUCTION_MODE.SUBTRACTION,
isHard: true
},
{
id: 7,
name: "后目的地",
description: value => `不释放黑洞，且不进入永恒挑战12, 以 /${format(Decimal.pow10(value), 2, 2)}黑洞或更慢的速度获得 ${formatInt(400000)} 时间之理。`,
values: [100, 150, 200, 250, 300],
condition: () => V.isRunning,
currentValue: () => new Decimal(
// Dirty hack I know lmao
Currency.timeTheorems.gte(400000)
? -Math.log10(player.requirementChecks.reality.slowestBH)
: 0),
formatRecord: x => `${formatInt(1)} / ${format(Decimal.pow(10, x))}`,
shardReduction: tiers => 50 * tiers,
maxShardReduction: goal => goal - 50,
reductionStepSize: 2,
perReductionStep: 10,
mode: V_REDUCTION_MODE.DIVISION,
isHard: true
},
{
id: 8,
name: "符文禁闭",
description: value => `符文等级达到 ${formatInt(value)}.`,
values: [6500, 7000, 8000, 9000, 10000],
condition: () => V.isRunning,
currentValue: () => new Decimal(gainedGlyphLevel().actualLevel),
formatRecord: x => formatHybridLarge(x, 3),
shardReduction: tiers => Math.floor(500 * tiers),
maxShardReduction: () => 500,
perReductionStep: 5,
mode: V_REDUCTION_MODE.SUBTRACTION,
isHard: true
}
],
unlocks: {
vAchievementUnlock: {
id: 0,
reward: "解锁成就之神薇",
description: "在一次现实中，同时满足以上所有要求",
requirement: () => Object.values(GameDatabase.celestials.v.mainUnlock).every(e => e.progress() >= 1)
},
shardReduction: {
id: 1,
reward: `你可以花费复兴点来减少每个薇成就的所有层级的目标要求。`,
description: () => `拥有 ${formatInt(2)} 个薇成就`,
requirement: () => V.spaceTheorems >= 2,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones1.canBeApplied
},
adPow: {
id: 2,
reward: "基于总空间之理加成反物质维度指数。",
description: () => `拥有 ${formatInt(5)} 个薇成就`,
effect: () => player.disablePostReality ? 1 : 1 + Math.sqrt(V.spaceTheorems) / 80,
format: x => formatPow(x, 3, 3),
requirement: () => V.spaceTheorems >= 5,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones1.canBeApplied
},
fastAutoEC: {
id: 3,
reward: "成就倍率减少自动永恒挑战完成时间。",
description: () => `拥有 ${formatInt(10)} 个薇成就`,
effect: () => player.disablePostReality ? 1 : Achievements.power,
// Base rate is 60 ECs at 20 minutes each
format: x => ((Ra.unlocks.instantECAndRealityUpgradeAutobuyers.canBeApplied || EndgameMastery(53).isBought) && !player.disablePostReality
? "即时（已拥有太阳神升级）"
: `全部完成时为 ${TimeSpan.fromMinutes(new Decimal(60).times(20).div(x)).toStringShort()}`),
requirement: () => V.spaceTheorems >= 10,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones2.canBeApplied
},
autoAutoClean: {
id: 4,
reward: "解锁在现实时自动净化符文仓库的功能。",
description: () => `拥有 ${formatInt(16)} 个薇成就`,
requirement: () => V.spaceTheorems >= 16,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones2.canBeApplied
},
achievementBH: {
id: 5,
reward: "成就倍率加成黑洞强度。",
description: () => `拥有 ${formatInt(30)} 个薇成就`,
effect: () => player.disablePostReality ? 1 : Achievements.power,
format: x => formatX(x, 2, 0),
requirement: () => V.spaceTheorems >= 30,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones3.canBeApplied
},
raUnlock: {
id: 6,
reward() {
return `时间研究的空间之理价格减少 ${formatInt(2)}。解锁遗忘之神太阳神。`;
},
description: () => `拥有 ${formatInt(36)} 个薇成就`,
effect: 2,
requirement: () => V.spaceTheorems >= 36,
pelleDisabled: () => !PelleCelestialUpgrade.vMilestones3.canBeApplied
}
}
};
export const vUpgrades = {
auto: rebuyable({
id: 0,
initialCost: 1e80,
increment: 1e5,
description: () => `缩短自动完成薇成就间隔`,
effect: bought => 60 / Math.pow(2, bought),
formatEffect: value => value <= 0.03 ? "立即" : TimeSpan.fromMilliseconds(new Decimal(value * 1000)).toStringShort(),
formatCost: value => format(value, 2),
costCap: 1e135,
cap: Number.MAX_VALUE
}),
};