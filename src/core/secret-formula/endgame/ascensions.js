export const ascensions = {
  ipA: {
    id: 0,
    name: "扬升-无限点数",
    zeroIndex: new Decimal("1e30000"),
    description: () => `将可重复购买的无限点数倍增升级重构为无限点数指数升级`,
    onUnlock: () => {
      player.IPMultPurchases = DC.D0;
    }
  },
  epA: {
    id: 1,
    name: "扬升-永恒点数",
    zeroIndex: new Decimal("1e40000"),
    description: () => `将可重复购买的永恒点数倍增升级重构为永恒点数指数升级`,
    onUnlock: () => {
      player.epmultUpgrades = DC.D0;
    }
  },
  dbA: {
    id: 2,
    name: "扬升-维度提升",
    zeroIndex: new Decimal("1e60000"),
    description: () => `将维度提升重构为维度擢升，为反物质维度提供指数加成`,
    onUnlock: () => {
      player.dimensionBoosts = DC.D0;
    }
  },
  b10mA: {
    id: 3,
    name: "扬升-购买维度倍率",
    zeroIndex: new Decimal("1e100000"),
    description: () => `将购买 10 个反物质维度的倍率重构为购买 1 个数量级反物质维度的指数`
  },
  sacA: {
    id: 4,
    name: "扬升-维度献祭",
    zeroIndex: new Decimal("1e200000"),
    description: () => `将维度献祭的倍率加成重构为指数加成`
  },
  ocA: {
    id: 5,
    name: "扬升-激能 I",
    zeroIndex: new Decimal("1e400000"),
    description: () => `解锁激能`
  },
  oc2A: {
    id: 6,
    name: "扬升-激能 II",
    zeroIndex: new Decimal("1e2000000"),
    description: () => `解锁二阶激能`
  },
  oc3A: {
    id: 7,
    name: "扬升-激能 III",
    zeroIndex: new Decimal("1e12500000"),
    description: () => `解锁三阶激能`
  },
  oc4A: {
    id: 8,
    name: "扬升-激能 IV",
    zeroIndex: new Decimal("1e100000000"),
    description: () => `解锁四阶激能`
  }
};
