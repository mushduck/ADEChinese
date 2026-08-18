export const expansionPacks = {
  teresaPack: {
    name: "特蕾莎扩展包",
    id: "teresaPack",
    symbol: "Ϟ",
    description: () =>
      `移除进贡现实机器上限；基于进贡的现实机器提高现实机器上限和现实机器获取量；在特蕾莎标签页解锁充能复兴商店升级；解锁自动进贡现实机器。`,
    cost: Decimal.pow(10, 1e30),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  effarigPack: {
    name: "鹿颈长扩展包",
    id: "effarigPack",
    symbol: "Ϙ",
    description: () =>
      `遗迹碎片获取量乘以当前反物质指数；太阳神中鹿颈长的记忆达到 ${formatInt(10)} 级时，鹿颈长符文总是拥有 ${formatInt(7)} 个词条；提升符文炼金资源的上限至最高符文等级的三分之一；终局后保留炼金资源，且创造现实符文不再消耗炼金资源；开始终局时解锁目前阶段鹿颈长商店全部内容；基于最快终局用时的十分之一自动完成鹿颈长的每一层现实。`,
    cost: Decimal.pow(10, 1e50),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  enslavedPack: {
    name: "无名氏扩展包",
    id: "enslavedPack",
    symbol: "\uf0c1",
    description: () =>
      `充能黑洞总是消耗 ${formatPercents(0.99)} 的游戏速度；解锁多样化黑洞充能，用于调整黑洞时间释放量以及释放间隔；有效超立方体的效力翻倍；基于超立方体数量提高终局次数获取量；基于超立方体数量略微降低无限维度的软上限强度；开始终局时自动完成无名氏的现实；解锁超立方体自动购买器。`,
    cost: Decimal.pow(10, 1e70),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  vPack: {
    name: "薇扩展包",
    id: "vPack",
    symbol: "⌬",
    description: () =>
      `开始终局时自动完成薇的现实；每 ${TimeSpan.fromSeconds(new Decimal(60))} 自动解锁一个薇成就（包括困难的薇成就），可花费天界点数减少间隔；空间之理获取量翻倍。`,
    cost: Decimal.pow(10, 1e90),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  raPack: {
    name: "太阳神扩展包",
    id: "raPack",
    symbol: "\uf185",
    description: () =>
      `在终局后保留太阳神记忆；基于反物质第二指数的最高值提升所有天神的记忆等级上限；每位天神解锁另外 ${formatInt(7)} 个记忆等级奖励。记忆和记忆块的获取量 ${formatX(10)}。`,
    cost: Decimal.pow(10, 1e110),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  laitelaPack: {
    name: "莱特拉扩展包",
    id: "laitelaPack",
    symbol: "ᛝ",
    description: () =>
      `解锁自动调整凝聚奇点用时；莱特拉的现实中游戏时间恢复速度翻倍；湮灭乘数对第八暗物质维度的效果是原来的平方（若湮灭乘数影响第八暗物质维度）；暗物质维度飞升时增长的生产时间间隔除以 ${formatInt(200)}；暗物质获取量乘以 当前反物质的第二指数 和 当前虚幻机器数量指数 的最大值；终局后自动获得 ${formatInt(10)} 奇点；暗能量获取量乘以奇点指数的平方；基于暗物质数量提升暗物质湮灭的指数；解锁多样化自动湮灭；解锁强子化莱特拉的现实；使莱特拉的现实失稳后提升暗物质的上限；熵的最大获取速度 × ${formatInt(10)}。`,
    cost: Decimal.pow(10, 1e130),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  pellePack: {
    name: "佩勒扩展包",
    id: "pellePack",
    symbol: "♅",
    description: () =>
      `星系生成器不稳定性减少 ${formatInt(1)}；基于星系数量最大值为前三种维度提供指数加成；解锁可重复购买的星系生成器升级的自动购买器。`,
    cost: Decimal.pow(10, 1e150),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  alphaPack: {
    name: "阿尔法扩展包",
    id: "alphaPack",
    symbol: "α",
    description: () =>
      `解锁强子加速器，可以加速你的强子以提高反物质指数；同时解锁虚无，类似时间膨胀但可以提升加速器的产量。`,
    cost: Decimal.pow(10, 1e200),
    formatCost: value => formatPostBreak(value, 2, 0)
  }
};
