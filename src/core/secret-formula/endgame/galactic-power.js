export const galacticPowerRewards = {
  galaxyStrength: {
    id: 1,
    galacticPower: 0,
    reward: "增强星系效力",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(10), 3).add(1).min(30000).times(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `星系增强${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
  },
  remoteGalaxyScale: {
    id: 2,
    galacticPower: 1e10,
    reward: "推迟极远星系出现",
    effect: () => player.disablePostReality ? 0 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).times(5), 2).min(2.5e6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 2)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `极远星系推迟 ${formatHybridLarge(value, 3)} 星系出现`
  },
  remoteGalaxyPower: {
    id: 3,
    galacticPower: 1e20,
    reward: "降低极远星系价格增长",
    effect: () => player.disablePostReality ? 1 : DC.D1.sub(((Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)), 0.5).times(5)).div(100))).max(0.1).div(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? 1 / GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? 1 / GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `极远星系价格增长降低 ${formatPercents(1 - value, 2, 2)}`
  },
  galGenInstability1: {
    id: 4,
    galacticPower: 1e50,
    reward: "推迟星系生成器不稳定性第一软上限",
    effect: () => player.disablePostReality ? DC.D0 : Decimal.pow(10, Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).times(50)).min(1e50).pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).max(1)),
    formatEffect: value => `星系生成器不稳定性第一软上限推迟 ${formatX(value, 2, 2)} 倍`
  },
  replicantiGalaxies: {
    id: 5,
    galacticPower: 1e100,
    reward: "提高复制器星系获取量",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.25).add(1).min(6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.5)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `获得多 ${formatX(value, 2, 2)} 倍复制器星系`
  },
  tachyonGalaxies: {
    id: 6,
    galacticPower: 1e150,
    reward: "降低超光速粒子星系阈值",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(200), 3).add(1).min(5).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.5)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `超光速粒子星系阈值开 ${format(value, 2, 2)} 次方根`
  },
  galGenInstability2: {
    id: 7,
    galacticPower: 1e200,
    reward: "削弱星系生成器不稳定性第二软上限强度",
    effect: () => player.disablePostReality ? 1 : (Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.5).div(10)).add(1).min(1.6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.25)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `第二星系生成器不稳定性开 ${format(value, 2, 2)} 次方根`
  },
  etherealUnlock: {
    id: 8,
    galacticPower: Number.MAX_VALUE,
    reward: "解锁缥缈之力"
  },
  galacticAscension: {
    id: 9,
    galacticPower: new Decimal("1e7800"),
    reward: "各种类型的星系最后总数现在是相乘哦（不会乘零）"
  },
  galaxyEmpowerment1: {
    id: 10,
    galacticPower: new Decimal("1e10000"),
    reward: "为上面的星系之力升级提供指数增益",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).add(1)).div(4).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `提高以上星系之力升级效力增强 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
  },
  celestialGalaxyEmpowerment: {
    id: 11,
    galacticPower: new Decimal("1e15000"),
    reward: "提高天界星系强度",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(15000), 5).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `天界星系增强 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
  },
  freeGalaxies: {
    id: 12,
    galacticPower: new Decimal("1e25000"),
    reward: "自动生成免费星系",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Currency.galacticPower.value.div("1e25000"), 0.001).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1),
    formatEffect: value => `当前已生成 ${formatHybridLarge(value, 3)} 免费星系`
  },
  galaxyScaling: {
    id: 13,
    galacticPower: new Decimal("1e40000"),
    reward: "降低反物质星系的第八维度需求增长",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(0.9, Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(40000)).add(1).pow(2).sub(1)).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `反物质星系的第八维度需求降低 ${formatPercents(1 - value, 2, 2)}`
  },
  galaxyGenerationEmpowerment: {
    id: 14,
    galacticPower: new Decimal("1e66000"),
    reward: "为星系产量提供指数加成",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(66000)).add(1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `星系产量 ${formatPow(value, 2, 3)}`
  },
  galaxyEmpowerment2: {
    id: 15,
    galacticPower: new Decimal("1e100000"),
    reward: "为上面的星系之力升级提供指数增益",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(100000)).add(1).toNumber(),
    formatEffect: value => `提高以上星系之力升级效力 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
  },
  stelliferousUniverse: {
    id: 16,
    galacticPower: new Decimal("1e250000"),
    reward: "解锁 Stelliferous Universe（未实装）"
  }
};
