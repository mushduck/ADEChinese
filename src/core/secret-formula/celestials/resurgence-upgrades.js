export const resurgenceUpgrades = {
  ipSurge: {
    name: "无界潮涌",
    id: "ipSurge",
    cost: new Decimal(10000),
    description: "无限点数和反物质从此刻起等价，基于大坍缩后获得的无限点数为反物质获取量提供倍率加成"
  },
  epSurge: {
    name: "永恒潮涌",
    id: "epSurge",
    cost: new Decimal(1e6),
    description: "永恒点数和反物质从此刻起等价，基于永恒后获得的永恒点数为反物质获取量提供倍率加成"
  },
  realSurge: {
    name: "星流漩溢",
    id: "realSurge",
    cost: new Decimal(1e8),
    description: "终局次数生成现实次数"
  },
  rmSurge: {
    name: "星源潮涌",
    id: "rmSurge",
    cost: new Decimal(1e10),
    description: "基于现实次数为现实机器获取量和上限提供倍率加成，该效果在所有指数加成后结算"
  },
  imSurge: {
    name: "命定之终",
    id: "imSurge",
    cost: new Decimal(1e12),
    description: "基于终局次数为虚幻机器上限提供指数加成",
    effect: () => 1 + Math.log10(Math.log10(player.endgames + 1) + 1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  repSurge: {
    name: "复制潮涌",
    id: "repSurge",
    cost: new Decimal(1e20),
    description: "基于复制器数量为所有复制器效果提供指数加成"
  },
  achSurge: {
    name: "成就潮涌",
    id: "achSurge",
    cost: new Decimal(1e30),
    description: "为每个成就倍率加成效果额外添加指数加成词条"
  },
  curr1Surge: {
    name: "无限潮涌",
    id: "curr1Surge",
    cost: new Decimal(1e50),
    description: "无限次数、永恒次数和时间之理获取量 ^ (自身的第二指数)"
  },
  curr2Surge: {
    name: "膨胀潮涌",
    id: "curr2Surge",
    cost: new Decimal(1e80),
    description: "在被毁灭的现实外，膨胀时间和超光速粒子获取量 ^ (自身的第二指数)"
  },
  glyphSurge: {
    name: "献祭潮涌",
    id: "glyphSurge",
    cost: new Decimal(1e120),
    description: () => `生成的音乐符文等级提升至本次终局中符文的最高等级减 ${formatInt(1)}`
  },
  ethSurge: {
    name: "维源谐振",
    id: "ethSurge",
    cost: new Decimal(1e200),
    description: "为缥缈之力获取量提供等同于宇宙扇区数量 ^ 2 的倍率",
    effect: () => Decimal.pow(Ethereal.cosmicSector, 2),
    formatEffect: value => formatX(value, 2)
  },
  machineSurge: {
    name: "机器扩增",
    id: "machineSurge",
    cost: new Decimal("1e350"),
    description: "基于星辰产量为所有机器获取量提供指数加成",
    effect: () => Decimal.pow(Decimal.log10(Ethereal.stellarProduct).add(1), 0.1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  rsSurge: {
    name: "遗迹重耀",
    id: "rsSurge",
    cost: new Decimal("1e550"),
    description: "遗迹碎片公式中“已装备符文的词条数”更改为背包中符文的词条总数"
  },
  memSurge: {
    name: "回忆补时",
    id: "memSurge",
    cost: new Decimal("1e800"),
    description: "提高无名氏和薇记忆生产基数"
  },
  entropySurge: {
    name: "熵灭终章",
    id: "entropySurge",
    cost: new Decimal("1e1100"),
    description: "基于终局次数为熵产量提供倍率加成",
    effect: () => Math.pow(player.endgames, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy1: {
    name: "时轴曲变 I",
    id: "synergy1",
    cost: new Decimal("1e2250"),
    description: "基于空间之理数量为时间之理产量提供指数加成",
    effect: () => V.spaceTheorems,
    formatEffect: value => formatPow(value, 2)
  },
  synergy2: {
    name: "时轴曲变 II",
    id: "synergy2",
    cost: new Decimal("1e2400"),
    description: "基于在被毁灭的现实外生产的总反物质薇天界维度提供指数加成",
    effect: () => Decimal.log10(Decimal.log10(Decimal.log10(player.records.totalAntimatterOutsideDoom).add(1)).add(1)).div(15).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  synergy3: {
    name: "时轴曲变 III",
    id: "synergy3",
    cost: new Decimal("1e2550"),
    description: "基于星辰产量为空间之理获取提供倍率加成",
    effect: () => Decimal.log10(Ethereal.stellarProduct).max(1).toNumber(),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy4: {
    name: "时轴曲变 IV",
    id: "synergy4",
    cost: new Decimal("1e2700"),
    description: "基于时间之理数量提高星系强度",
    effect: () => Decimal.pow(Decimal.log10(Decimal.log10(player.timestudy.theorem.max(1)).add(1)), 3).add(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  synergy5: {
    name: "时轴曲变 V",
    id: "synergy5",
    cost: new Decimal("1e2850"),
    description: "基于计数频率为反物质产量提供指数加成",
    effect: () => Decimal.log10(Decimal.log10(Tickspeed.perSecond).add(1)).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  synergy6: {
    name: "失迹闭环",
    id: "synergy6",
    cost: new Decimal("1e4000"),
    description: "基于天界物质数量为缥缈之力产量提供倍率加成",
    effect: () => Decimal.pow(Decimal.log10(Decimal.log10(Currency.celestialMatter.value.max(1)).add(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  unl1: {
    name: "跃迁之终",
    id: "unl1",
    cost: new Decimal("1e7000"),
    description: "解锁更多终局专精"
  },
  unl2: {
    name: "归墟俱灭",
    id: "unl2",
    cost: new Decimal("1e12000"),
    description: "解锁更多奇点里程碑"
  },
  unl3: {
    name: "星河煌辉",
    id: "unl3",
    cost: new Decimal("1e20000"),
    description: "解锁更多星系之力升级"
  },
  unl4: {
    name: "归元复始",
    id: "unl4",
    cost: new Decimal("1e33000"),
    description: "解锁扬升"
  }
};
