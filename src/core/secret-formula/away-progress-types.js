export const awayProgressTypes = [
  {
    name: "antimatter",
    forcedName: "反物质",
    isUnlocked: () => true,
  }, {
    name: "dimensionBoosts",
    forcedName: "维度提升",
    isUnlocked: () => true,
  }, {
    name: "antimatterGalaxies",
    forcedName: "反物质星系",
    reference: ["galaxies"],
    isUnlocked: () => true,
  }, {
    name: "infinities",
    forcedName: "无限次数",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "infinityPoints",
    forcedName: "无限点数",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "replicanti",
    forcedName: "复制器",
    reference: ["replicanti", "amount"],
    isUnlocked: () => PlayerProgress.replicantiUnlocked() || PlayerProgress.eternityUnlocked(),
  }, {
    name: "replicantiGalaxies",
    forcedName: "复制器星系",
    reference: ["replicanti", "galaxies"],
    isUnlocked: () => PlayerProgress.replicantiUnlocked() || PlayerProgress.eternityUnlocked(),
  }, {
    name: "eternities",
    forcedName: "永恒次数",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "eternityPoints",
    forcedName: "永恒点数",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "tachyonParticles",
    forcedName: "超光速粒子",
    reference: ["dilation", "tachyonParticles"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "dilatedTime",
    forcedName: "膨胀时间",
    reference: ["dilation", "dilatedTime"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "timeTheorems",
    forcedName: "时间之理",
    reference: ["timestudy", "theorem"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "tachyonGalaxies",
    forcedName: "超光速粒子星系",
    reference: ["dilation", "totalTachyonGalaxies"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "achievementAmount",
    forcedName: "成就数量",
    reference: ["achievementBits"],
    applyFn: x => x.map(b => countValuesFromBitmask(b)).sum(),
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "realities",
    forcedName: "现实次数",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "realityMachines",
    forcedName: "现实机器",
    reference: ["reality", "realityMachines"],
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "blackHole",
    forcedName: "黑洞",
    isUnlocked: () => BlackHole(1).isUnlocked,
    // Functions as the visible option for both first & second BHs, never appears due to having no reference.
    appearsInAwayModal: false,
  }, {
    name: "firstBlackHole",
    awayOption: "blackHole",
    forcedName: "第一黑洞",
    reference: ["blackHole", "0", "activations"],
    isUnlocked: () => BlackHole(1).isUnlocked,
    classObjectReference: "black-hole",
    showOption: false,
  }, {
    name: "secondBlackHole",
    awayOption: "blackHole",
    forcedName: "第二黑洞",
    reference: ["blackHole", "1", "activations"],
    isUnlocked: () => BlackHole(2).isUnlocked,
    classObjectReference: "black-hole",
    showOption: false,
  }, {
    name: "relicShards",
    forcedName: "遗迹碎片",
    reference: ["celestials", "effarig", "relicShards"],
    isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
  }, {
    name: "celestialMemories",
    forcedName: "天神记忆",
    isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
    // Functions as the visible option for all Memories, never appears due to having no reference.
    appearsInAwayModal: false,
  }, {
    name: "teresaMemories",
    awayOption: "celestialMemories",
    forcedName: "特蕾莎记忆",
    reference: ["celestials", "ra", "pets", "teresa", "memories"],
    isUnlocked: () => Ra.pets.teresa.isUnlocked && !Ra.pets.teresa.isCapped,
    showOption: false,
  }, {
    name: "effarigMemories",
    awayOption: "celestialMemories",
    forcedName: "鹿颈长记忆",
    reference: ["celestials", "ra", "pets", "effarig", "memories"],
    isUnlocked: () => Ra.pets.effarig.isUnlocked && !Ra.pets.effarig.isCapped,
    showOption: false,
  }, {
    name: "enslavedMemories",
    forcedName: "无名氏记忆",
    awayOption: "celestialMemories",
    reference: ["celestials", "ra", "pets", "enslaved", "memories"],
    isUnlocked: () => Ra.pets.enslaved.isUnlocked && !Ra.pets.enslaved.isCapped,
    showOption: false,
  }, {
    name: "vMemories",
    awayOption: "celestialMemories",
    forcedName: "薇记忆",
    reference: ["celestials", "ra", "pets", "v", "memories"],
    isUnlocked: () => Ra.pets.v.isUnlocked && !Ra.pets.v.isCapped,
    showOption: false,
  }, {
    name: "imaginaryMachines",
    forcedName: "虚幻机器",
    reference: ["reality", "imaginaryMachines"],
    isUnlocked: () => MachineHandler.isIMUnlocked,
  }, {
    name: "darkMatter",
    forcedName: "暗物质",
    reference: ["celestials", "laitela", "darkMatter"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "darkEnergy",
    forcedName: "暗能量",
    reference: ["celestials", "laitela", "darkEnergy"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "singularities",
    forcedName: "奇点",
    reference: ["celestials", "laitela", "singularities"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "realityShards",
    forcedName: "现实碎片",
    reference: ["celestials", "pelle", "realityShards"],
    isUnlocked: () => Pelle.isDoomed,
  },
];
