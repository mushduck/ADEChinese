export const endgameMasteries = [
  {
    id: 11,
    cost: 1,
    requirement: [],
    reqType: EM_REQUIREMENT_TYPE.ALL,
    description: () => `每分钟生成等同于终局次数的复兴点数`,
    effect: () => player.disablePostReality ? 0 : player.endgames,
    formatEffect: value => `${formatHybridSmall(value, 3)}/分钟`
  },
  {
    id: 21,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `自动机速度
                        从每次现实提高${formatPercents(0.006, 1, 1)}加速至${formatPercents(0.06)}`
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `开始时解锁自动永恒，且其速度提高${formatInt(60)}倍`,
    effect: () => player.disablePostReality ? 1 : 60
  },
  {
    id: 31,
    cost: 2,
    requirement: [21],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `开始终局时拥有 ${formatInt(100)} 现实次数`,
    effect: () => player.disablePostReality ? 0 : 100
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `开始终局时拥有 ${formatInt(1000000)} 现实机器`,
    effect: () => player.disablePostReality ? 0 : 1000000
  },
  {
    id: 41,
    cost: 3,
    requirement: [31],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `成就154“多快才叫快”的触发概率提升至${formatPercents(1)}`,
    effect: () => player.disablePostReality ? 0.1 : 1
  },
  {
    id: 42,
    cost: 3,
    requirement: [32],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "开始终局时自动拥有所有现实升级"
  },
  {
    id: 51,
    cost: 4,
    requirement: [41],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `解锁薇的现实的现实次数要求降低至${formatInt(100)}`,
    effect: () => player.disablePostReality ? 1250 : 100
  },
  {
    id: 52,
    cost: 6,
    requirement: [41, 42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `星系增强${formatPercents(0.1)}`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 53,
    cost: 4,
    requirement: [42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `开始终局时自动拥有所有太阳神天神记忆${formatInt(1)}级奖励`
  },
  {
    id: 61,
    cost: 4,
    requirement: [52],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "开始终局时保留成就并获得一个免费超立方体",
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 71,
    cost: 7,
    requirement: [61],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `开始终局时获得${formatInt(5)}种拥有${formatInt(4)}个词条、${formatPercents(1)}稀有度的基础符文，其等级基于终局次数和历史最高等级符文而提高`,
    effect: () => player.disablePostReality ? DC.D1 : (EffarigUnlock.endgame.canBeApplied ? player.records.bestEndgame.glyphLevel : new Decimal(1 - ((1 / Math.max(player.endgames, 1)) ** 0.1)).times(player.records.bestEndgame.glyphLevel)),
    formatEffect: value => formatHybridSmall(value, 3)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `无限升级${formatInt(23)}的软上限效果降低${formatPercents(0.5)}`
  },
  {
    id: 82,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `无限维度压缩因子降低${formatPercents(0.05)}`,
    effect: () => player.disablePostReality ? 1 : 0.95
  },
  {
    id: 83,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `时间维度压缩因子降低${formatPercents(0.05)}`,
    effect: () => player.disablePostReality? 1 : 0.95
  },
  {
    id: 84,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `天界物质压缩因子降低${formatPercents(0.1)}`,
    effect: () => player.disablePostReality ? 1 : 0.9
  },
  {
    id: 91,
    cost: 7,
    requirement: [81],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `基于终局次数提高无限挑战${formatInt(8)}奖励上限`,
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 92,
    cost: 7,
    requirement: [82],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于终局次数推迟无限维度压缩因子出现",
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于终局次数推迟时间维度压缩因子出现",
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 94,
    cost: 7,
    requirement: [84],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于终局次数推迟天界物质软上限",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Decimal.pow(player.endgames, 0.25)),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 101,
    cost: 6,
    requirement: [91],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `反物质指数 ^ ${format(1.01, 2, 2)}`,
    effect: () => player.disablePostReality ? 1 : 1.01
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `无限之力转换指数 ^ ${format(1.01, 2, 2)}`,
    effect: () => player.disablePostReality ? 1 : 1.01
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "下一个免费计数频率升级成本增长倍率 ^ 0.5",
    effect: () => player.disablePostReality ? 1 : 0.5
  },
  {
    id: 104,
    cost: 6,
    requirement: [94],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `天界物质激发指数提高 ${formatPercents(0.1)}`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 111,
    cost: 5,
    requirement: [101, 102, 103, 104],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "当前虚幻机器数量永远填充至上限"
  },
  {
    id: 112,
    cost: 4,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "终局后保留复兴树"
  },
  {
    id: 121,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "在被毁灭的现实中增加 1 个符文槽",
    effect: 1
  },
  {
    id: 122,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `星系生成器不稳定性减少${formatInt(1)}`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 131,
    cost: 8,
    requirement: [121, 122],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `提升虚幻升级“凝聚之熵”效力`,
  },
  {
    id: 141,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `无限点数获取量 ^ ${format(1.2, 2, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 142,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `永恒点数获取量 ^ ${format(1.3, 2, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.3
  },
  {
    id: 143,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `现实机器获取量 ^ ${format(1.4, 2, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.4
  },
  {
    id: 144,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `虚幻机器获取量 ^ ${format(1.1, 2, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 151,
    cost: 3,
    requirement: [141],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `优化无限点数获取公式`,
    effect: () => player.disablePostReality ? Effects.min(308, Achievement(103), TimeStudy(111)) : Effects.min(308, Achievement(103), TimeStudy(111)) / ((Decimal.log10(Decimal.log10(Currency.celestialPoints.value.plus(1)).add(1)).div(20)).add(1)).toNumber(),
    formatEffect: value => `log(x)/${format(Effects.min(308, Achievement(103), TimeStudy(111)), 2, 2)} ➜ log(x)/${format(value, 2, 2)}`
  },
  {
    id: 152,
    cost: 3,
    requirement: [142],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `移除永恒点数倍增升级的指数级成本增长`
  },
  {
    id: 153,
    cost: 3,
    requirement: [143],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `虚幻升级“椭圆物质”效果额外提升${formatPercents(0.5)}`,
    effect: () => player.disablePostReality ? 1 : 1.5
  },
  {
    id: 154,
    cost: 3,
    requirement: [144],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `虚幻升级“信息之瞬”效果提升至 ^ ${formatInt(10)}`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 161,
    cost: 5,
    requirement: [151, 152, 153, 154],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于当前奇点提高批量凝聚奇点的增长倍率",
    effect: () => player.disablePostReality ? DC.D0 : Decimal.floor((new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(1e50), 1, 1e120))).div(5)).add(
      new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(1e170), 1, 1e250))).div(10)).add(
      new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(new Decimal("1e420")), 1, new Decimal("1e2500")))).div(100)).add(
      Decimal.pow(new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(new Decimal("1e2920")), 1, new Decimal("1e390625")))), 0.25)).add(1)),
    cap: DC.E2,
    formatEffect: value => `+${format(value, 2)}`
  },
  {
    id: 171,
    cost: 7,
    requirement: [161],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `炼金资源“动量”增速加快${formatInt(10)}倍`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 181,
    cost: 175000,
    reqType: EM_REQUIREMENT_TYPE.EXPANDED,
    description: () => `星系生成器不稳定性再减少${formatInt(1)}`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 191,
    cost: 50000,
    requirement: [181],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "成就倍率现在也作用于天界维度",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(Decimal.pow(Achievements.power.max(1).log10(), 0.5))
  },
  {
    id: 192,
    cost: 50000,
    requirement: [181],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "成就倍率现在以快速衰减的倍率作用于神性维度",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(Decimal.pow(Achievements.power.max(1).log10(), 0.25))
  },
  {
    id: 201,
    cost: 75000,
    requirement: [191, 192],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "成就倍率现在以极小的倍率作用于熵",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Achievements.power.max(1).log10(), 2)
  },
  {
    id: 211,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `神性维度倍率 ^ ${formatPow(1.3, 1, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.3
  },
  {
    id: 212,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `天界点数获取量 ^ ${formatPow(1.2, 1, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 213,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `重构机器获取量 ^ ${formatPow(1.1, 1, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 221,
    cost: 150000,
    requirement: [211],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于强子数量提高神性能量获取量",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(new Decimal(player.celestials.laitela.hadrons.total).pow(1.25))
  },
  {
    id: 222,
    cost: 150000,
    requirement: [212],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `在被毁灭的现实中反物质指数提高 ${formatPow(1.2, 1, 1)}`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 223,
    cost: 150000,
    requirement: [213],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于星辰之力提高重构机器获取量",
    effect: () => player.disablePostReality ? 1 : Ethereal.starPower.add(1).log10().pow(10)
  },
  {
    id: 231,
    cost: 200000,
    requirement: [221],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "略微优化神性之星公式",
    effect: () => player.disablePostReality ? 308 : 280
  },
  {
    id: 232,
    cost: 200000,
    requirement: [222],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "略微提升成就207奖励效力",
    effect: () => player.disablePostReality ? 1 : 1.05
  },
  {
    id: 233,
    cost: 200000,
    requirement: [223],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `重构机器增速${formatX(5)}`,
    effect: () => player.disablePostReality ? 1 : 5
  },
  {
    id: 241,
    cost: 300000,
    requirement: [231, 232, 233],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "基于终局能力总数提高缥缈之力获取量",
    effect: () => player.disablePostReality ? 1 : player.endgameMasteries.maxSkills.pow(2)
  },
  {
    id: 251,
    cost: 500000,
    requirement: [241],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `强子效果上限提高${formatPercents(1)}`,
    effect: () => player.disablePostReality ? 0 : 100
  },
  {
    id: 261,
    cost: 750000,
    requirement: [251],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `天界物质激发指数 ${formatPow(1.25, 2, 2)}`,
    effect: () => player.disablePostReality ? 1 : 1.25
  },
  {
    id: 262,
    cost: 750000,
    requirement: [251],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `所有暗物质上限推迟 ${formatPow(2)}`,
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    id: 271,
    cost: 1000000,
    requirement: [261],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "移除膨胀时间软上限"
  },
  {
    id: 272,
    cost: 1000000,
    requirement: [261],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `降低复制器的强软上限强度`,
    effect: () => player.disablePostReality ? 10 : 2
  },
  {
    id: 273,
    cost: 1000000,
    requirement: [262],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `永恒挑战12奖励增强${formatX(10)}`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 274,
    cost: 1000000,
    requirement: [262],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `所有符文等级软上限推迟${formatX(2)}`,
    effect: () => player.disablePostReality ? 1 : 2
  }
];
