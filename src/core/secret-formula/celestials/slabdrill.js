import wordShift from "../../word-shift";

export const slabdrillUnlocks = {
  dimboost: {
    id: 0,
    requirement: 1,
    name: "第一次维度提升",
    nerfDescription: () => `维度提升的基础倍率降低至 ${format(1.01, 2, 2)}，并调整所有影响维度提升的基础倍率的升级`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响维度提升倍率；并重获天界维度，但被严重削弱`
  },
  galaxy: {
    id: 1,
    requirement: 2,
    name: "第一个星系",
    nerfDescription: () => `遥远星系的价格增长从 ${formatInt(0)} 个星系开始`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响星系强度；并每过 ${formatInt(2)} 次渊蛇冲击重获一个符文献祭效果，但被严重削弱`
  },
  infinity: {
    id: 2,
    requirement: 3,
    name: "无限",
    nerfDescription: () => `计数频率倍率${formatPow(0.42, 2, 2)}`,
    buffDescription: () => `幽蛇之力现在以大幅衰减的效果增强反物质维度；并重获打破永恒升级，但其价格和效果将被重构`
  },
  breakInfinity: {
    id: 3,
    requirement: 4,
    name: "打破无限",
    nerfDescription: () => `打破无限后反物质维度和计数频率的价格增长从 ${formatX(25)} 开始，且不可重复购买的打破无限升级价格 ${formatX(1000)}`,
    buffDescription: () => `降低打破无限后反物质维度和计数频率的价格增长降低的无限升级的价格增长（计数频率 ${formatX(5)} ➜ ${formatX(2)}，反物质维度 ${formatX(5000)} ➜ ${formatX(5)}）；降低解锁前三个无限维度的反物质需求；幽蛇之力现在以衰减的效果影响无限点数；并重获一个符文槽，但符文效果更弱`
  },
  infinityChallengeFour: {
    id: 4,
    requirement: 5,
    name: "无限挑战 4",
    nerfDescription: () => `所有无限维度倍率${formatPow(0.75, 2, 2)}`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响无限维度；无限之力转换指数${formatPow(1.5, 1, 1)}；并重获连续统，但被严重削弱`
  },
  replicanti: {
    id: 5,
    requirement: 6,
    name: "解锁复制器",
    nerfDescription: () => `复制间隔 ${formatX(10)}；复制概率除以 ${formatInt(1000)}；超过 ${format(DC.NUMMAX, 2, 2)} 复制器后，每 ${format(DC.NUMMAX, 2, 2)} 复制器，复制间隔 ${formatX(1.2)} ➜ ${formatX(2)}；计数频率${formatPow(0.42, 2, 2)}`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响复制速度；并重获缥缈，但缥缈之力的产量和效果被削弱`
  },
  eternity: {
    id: 6,
    requirement: 7,
    name: "永恒",
    nerfDescription: () => `所有无限维度倍率${formatPow(0.75, 2, 2)}`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响时间维度；并重获第二个符文槽和终局专精 ${formatInt(101)} 至 ${formatInt(104)}`
  },
  timeStudy181: {
    id: 7,
    requirement: 8,
    name: "时间研究 181",
    nerfDescription: () => `所有来源的无限点数和永恒点数获取量 ${formatPow(0.9, 2, 2)}；时间维度倍率${formatPow(0.75, 2, 2)}；无限维度购买上限降低至 ${formatInt(5000)}；任何类型星系数量超过 ${formatInt(100)} 的部分强度除以 ${formatInt(10)}`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响永恒点数；重获第三个符文槽；并重获遗迹碎片，但只提供符文献祭指数，且获取量和效果被削弱`
  },
  eternityChallengeTen: {
    id: 8,
    requirement: 9,
    name: "永恒挑战 10",
    nerfDescription: () => `所有来源的无限次数除以 ${format(1e20)}；所有反物质维度和无限维度倍率${formatPow(0.75, 2, 2)}；时间碎片提供的免费计数频率软上限提前 ${formatX(10)} 倍开始，且软上限强度 ${formatX(10)}`,
    buffDescription: () => `幽蛇之力现在以衰减的效果影响无限次数；重获第四个符文槽；并重获所有被摧毁的前 ${formatInt(13)} 行成就`
  },
  dilation: {
    id: 9,
    requirement: 10,
    name: "时间膨胀",
    nerfDescription: () => `膨胀时间和超光速粒子获取量 ${formatPow(0.25, 2, 2)}；且膨胀时禁用幽蛇之力`,
    buffDescription: () => `幽蛇之力现在以大幅衰减的效果影响膨胀时间产量；混沌核心的获取概率 ${formatX(16)}；重获第五个符文槽；并重获前六种炼金资源，但降低炼金资源上限`
  },
  reality: {
    id: 10,
    requirement: 11,
    name: "现实",
    nerfDescription: () => Slabdrill.isCursed ? `你将在此 ${wordShift.wordCycle(['囚无尽期', '永恒流转', '不息轮回'])}` : "无",
    buffDescription: () => Slabdrill.isCursed ? `${wordShift.randomCrossWords("再见")}` : "解锁第九维度"
  }
};