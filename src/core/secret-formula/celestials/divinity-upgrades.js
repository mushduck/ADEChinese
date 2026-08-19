function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, layer, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    layer,
    cost: () => new Decimal(config.initialCost).times(
      Decimal.pow(config.costIncrease, player.celestials.pelle.divinityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.celestials.pelle.divinityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect ||
      (value => {
        return (value === config.maxUpgrades
          ? `当前: ${formatX(10 - value)}`
          : `当前: ${formatX(10 - value)} | 下一级: ${formatX(10 - value - 1)}`);
      }),
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const divinityUpgrades = {
  divineL1U1: {
    name: "天界之藏",
    id: "divineL1U1",
    layer: 1,
    cost: new Decimal(10000),
    description: "宇宙扇区以衰减的倍率推迟天界物质二重软上限",
    effect: () => Decimal.pow(Ethereal.sectorBoost, 0.1),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U2: {
    name: "瞬速重构",
    id: "divineL1U2",
    layer: 1,
    cost: new Decimal(1e9),
    description: () => `阿尔法诅咒的消散速度提高 ${formatPercents(0.1)}`,
    effect: 0.9
  },
  divineL1U3: {
    name: "神性动量",
    id: "divineL1U3",
    layer: 1,
    cost: new Decimal(1e20),
    description: "基于天界点数数量为神性维度提供加成",
    effect: () => Decimal.pow(Decimal.log10(player.endgame.celestialPoints).div(Decimal.log10(DC.NUMMAX)).max(1), 3),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U4: {
    name: "寂灭造物",
    id: "divineL1U4",
    layer: 1,
    cost: new Decimal(1e50),
    description: () => `在被毁灭的现实内反物质第二指数 ^ ${format(DivinityUpgrade.divineL5U2.isBought ? 1.02 : 1.01, 2, 2)}`,
    effect: () => DivinityUpgrade.divineL5U2.isBought ? 1.02 : 1.01
  },
  divineL1U5: {
    name: "重铸纪元",
    id: "divineL1U5",
    layer: 1,
    cost: new Decimal(1e100),
    description: "解锁神性能量和复苏升级"
  },
  divineL1U6: {
    name: "湮暝谐鸣",
    id: "divineL1U6",
    layer: 1,
    cost: new Decimal(1e125),
    description: "基于神性能量为神性维度提供加成",
    effect: () => Decimal.pow(Currency.divineEnergy.value.min(DC.E20000), 0.5).pow(
      Currency.divineEnergy.value.max(1).log10().max(1).log10().sub(3.3).max(1)).max(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U7: {
    name: "幸运七字",
    id: "divineL1U7",
    layer: 1,
    cost: new Decimal(1e160),
    description: () => `神性能量产量 × ${formatInt(7)}`,
    effect: 7
  },
  divineL1U8: {
    name: "新生律动",
    id: "divineL1U8",
    layer: 1,
    cost: new Decimal(1e200),
    description: () => `生产神性物质时也以正常速度的 ${formatPercents(0.1)} 生产神性能量`,
    effect: 0.1
  },
  divineL1U9: {
    name: "永恒涌流",
    id: "divineL1U9",
    layer: 1,
    cost: new Decimal(1e250),
    description: "高维的神性维度生产神性能量时同时也生产下一维的神性维度"
  },
  divineL1U10: {
    name: "临界遮断",
    id: "divineL1U10",
    layer: 1,
    cost: new Decimal(1e300),
    description: () => `重构机器增速 + ${formatPercents(0.5)}`,
    effect: 0.5
  },
  divineL2U1: {
    name: "星构之聚",
    id: "divineL2U1",
    layer: 2,
    cost: new Decimal(1),
    description: "基于上次凝聚后经过的真实时间为神性维度提供倍率加成",
    effect: () => Decimal.pow(DivinityUpgrade.divineL5U1.isBought ? Time.thisSupernovaRealTime.totalSeconds.add(1) :
      Time.thisCondenseRealTime.totalSeconds.add(1), 3),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U2: {
    name: "焚日天启",
    id: "divineL2U2",
    layer: 2,
    cost: new Decimal(7),
    description: "基于神性之星数量为神性能量产量提供倍率加成",
    effect: () => player.celestials.pelle.divinity.divineStars.max(1),
    formatEffect: value => formatX(value, 2)
  },
  divineL2U3: {
    name: "来生半途",
    id: "divineL2U3",
    layer: 2,
    cost: new Decimal(17),
    description: "基于神性之星数量为缥缈之力产量提供倍率加成",
    effect: () => Decimal.pow(Decimal.log10(player.celestials.pelle.divinity.divineStars.add(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U4: {
    name: "极点电伏",
    id: "divineL2U4",
    layer: 2,
    cost: new Decimal(77),
    description: "基于最高神性物质数量为神性能量产量提供倍率加成"
  },
  divineL2U5: {
    name: "履冰临渊",
    id: "divineL2U5",
    layer: 2,
    cost: new Decimal(277),
    description: "凝聚后保留一阶神性升级"
  },
  divineL2U6: {
    name: "先制之机",
    id: "divineL2U6",
    layer: 2,
    cost: new Decimal(777),
    description: () => `凝聚后从 ${format(5e36, 2, 2)} 神性物质开始`,
    effect: 5e36
  },
  divineL2U7: {
    name: "神谕接引",
    id: "divineL2U7",
    layer: 2,
    cost: new Decimal(2777),
    description: () => `神性维度产量 ${formatPow(1.1, 2, 3)}`,
    effect: 1.1
  },
  divineL2U8: {
    name: "解脱终曲",
    id: "divineL2U8",
    layer: 2,
    cost: new Decimal(7777),
    description: () => `神性维度购买倍率 ${formatX(17)}`
  },
  divineL2U9: {
    name: "扬升破晓",
    id: "divineL2U9",
    layer: 2,
    cost: new Decimal(77777),
    description: "基于天界物质数量为神性维度提供倍率加成",
    effect: () => Decimal.pow(Decimal.log10(Currency.celestialMatter.value.max(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U10: {
    name: "归一至臻",
    id: "divineL2U10",
    layer: 2,
    cost: new Decimal(1777777),
    description: () => `所有基于当前神性物质的升级更改为基于最高神性物质；神性能量生产速度永远为100%`
  },
  divineL3U1: rebuyable({
    name: "熵增湮灭",
    id: 0,
    layer: 3,
    initialCost: 1e7,
    costIncrease: 200,
    maxUpgrades: 7,
    description: () => `神性维度在神性物质达到无限后价格增速降低 ${formatInt(1)}`,
    noLabel: true,
    onPurchased: () => GameCache.divineDimensionMultDecrease.invalidate()
  }),
  divineL3U2: rebuyable({
    name: "渎神擢升",
    id: 1,
    layer: 3,
    initialCost: 1e8,
    costIncrease: 1e4,
    maxUpgrades: 12,
    description: () => `提高神性维度购买倍率`,
    effect: value => player.disablePostReality ? 1 : Math.pow(1 + value/2, Math.log2(10)),
    formatEffect: value => formatX(value, 2, 2),
    noLabel: false
  }),
  divineL3U3: rebuyable({
    name: "星漩超荷",
    id: 2,
    layer: 3,
    initialCost: 1e10,
    costIncrease: 1e10,
    maxUpgrades: 6,
    description: "将神性之星提供的倍率加成转化为指数加成",
    effect: value => player.disablePostReality ? 1 : value + 1,
    formatEffect: value => formatPow(value, 2),
    noLabel: false
  }),
  divineL3U4: rebuyable({
    name: "星骸衍化",
    id: 3,
    layer: 3,
    initialCost: 1e12,
    costIncrease: 100,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? DC.D0 : Player.bestRunVSPM.times(value / 20),
    description: () => {
      let generation = `以过去 10 次凝聚中神性之星最快获取速度的 ${formatInt(5 * player.celestials.pelle.divinityRebuyables[3])}%`;
      if (!DivinityUpgrade.divineL3U4.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.celestials.pelle.divinityRebuyables[3]))}%`;
      }
      return `${generation} 生成神性之星`;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} 神性之星/分钟`,
    noLabel: false
  }),
  divineL3U5: {
    name: "不朽演进",
    id: "divineL3U5",
    layer: 3,
    cost: new Decimal(1e77),
    description: "基于凝聚次数为神性维度提供指数加成",
    effect: () => Decimal.log10(player.celestials.pelle.divinity.condenses.min(7000).div(777).add(1)).div(2).add(1).add(
      Decimal.log10(player.celestials.pelle.divinity.condenses.div(7000).max(1)).div(10)),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL4U1: {
    name: "权能攫取",
    id: "divineL4U1",
    layer: 4,
    cost: new Decimal(1),
    description: () => `基于总终结之星数量为神性能量和神性之星获取提供倍率加成，为神性维度提供指数加成`,
    effects: {
      energy: () => player.records.bestSupernova.totalNeb.div(DivinityUpgrade.divineL4U4.isBought ? 7 : 10).add(1).pow(777),
      matter: () => Decimal.log10(player.records.bestSupernova.totalNeb.add(1)).add(1).pow(
        DivinityUpgrade.divineL4U4.isBought ? 0.25 : 0.2),
      stars: () => player.records.bestSupernova.totalNeb.add(1).pow(DivinityUpgrade.divineL4U4.isBought ? 2 : 1)
    }
  },
  divineL4U2: {
    name: "再临之刻",
    id: "divineL4U2",
    layer: 4,
    cost: new Decimal(3),
    description: "超新星后保留前五个二阶神性升级，并解锁神性维度自动购买器"
  },
  divineL4U3: {
    name: "天工神艺",
    id: "divineL4U3",
    layer: 4,
    cost: new Decimal(10),
    description: "基于上次超新星以来耗费的真实时间为神性维度提供指数加成",
    effect: () => Time.thisSupernovaRealTime.totalMinutes.min(300).div(10).add(1).pow(0.1).add(
      Time.thisSupernovaRealTime.totalMinutes.div(300).max(1).log10().div(10)),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL4U4: {
    name: "基元擢升",
    id: "divineL4U4",
    layer: 4,
    cost: new Decimal(30),
    description: "超新星后保留后五个二阶神性升级，并提升神性升级“权能攫取”的效力"
  },
  divineL4U5: {
    name: "樊笼之终",
    id: "divineL4U5",
    layer: 4,
    cost: new Decimal(100),
    description: "移除神性物质上限"
  },
  divineL5U1: {
    name: "神之壁垒",
    id: "divineL5U1",
    layer: 5,
    cost: new Decimal(700),
    description: () => "神性升级“归一至臻”的效果现在对超新星也生效"
  },
  divineL5U2: {
    name: "携序天赐",
    id: "divineL5U2",
    layer: 5,
    cost: new Decimal(17000),
    description: "超新星后保留后三阶神性升级，并将神性升级“寂灭造物”的效力翻倍"
  },
  divineL5U3: {
    name: "皇天统御",
    id: "divineL5U3",
    layer: 5,
    cost: new Decimal(7e5),
    description: "基于当前终局之星数量为神性维度提供额外指数加成",
    effect: () => Decimal.log10(Decimal.log10(player.celestials.pelle.divinity.nebulae.add(10))).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL5U4: {
    name: "恒元天启",
    id: "divineL5U4",
    layer: 5,
    cost: new Decimal(7e7),
    description: () => `以最快凝聚速度的 ${formatPercents(0.1)} 生成凝聚次数`
  },
  divineL5U5: {
    name: "轮回终殇",
    id: "divineL5U5",
    layer: 5,
    cost: new Decimal(1e10),
    description: () => `每秒自动获得超新星时能获得的终结之星的 ${formatPercents(0.01)}`
  }
};
