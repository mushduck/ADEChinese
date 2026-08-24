export const divinityMilestones = {
  firstDivine: {
    divinities: 1,
    get reward() {
      return ` 移除 ${format(Decimal.pow10(1e150))} 和 ${format(Decimal.pow10(1e225))} 的反物质软上限。新增一个于 ${format(DC.E9E15)} 反物质开始的新软上限，该软上限强度会基于神性次数而提高。
        解锁一个新的星系生成器升级；所有星系生成器升级效力 ^ 2。
        基于神性次数优化成就 207的奖励公式；每进行一次神性，天界点数和毁灭粒子获取量 ^ 2。
        毁灭现实后自动解锁所有佩勒升级。
        将天界物质软上限指数降低 ${formatPercents(0.05)}。
        将强子和暗强子效果到达上限所需的时间降低 ${formatPercents(0.2)}。
        终局次数获取量 ${formatX(10)}；重构机器获取量 ^ ${format(1.1, 1, 1)}；熵获得等同于 lg(历史最高星系数量) 的倍率加成。`;
    }
  },
  divineDimensions: {
    divinities: 2,
    get reward() {
      return ` 解锁神性维度。
        解锁神性升级。
        解锁一个新的星系生成器升级。
        不需要进行末日即可自动获得遗物。
        将强子和暗强子效果到达上限所需的时间降低 ${formatPercents(0.2)}。
        将阿尔法诅咒到达上限所需的时间降低 ${formatPercents(0.2)}。
        解锁星系生成器升级自动购买器购买最大数量。`;
    }
  },
  hadronEmpowerment: {
    divinities: 3,
    get reward() {
      return ` 解锁批量完成莱特拉的现实；解锁在莱特拉的现实完全不稳定时自动强子化。
        强子和暗强子现在完全相同，可以将其合并为奇迹强子，奇迹强子会缩短强子效果到达上限所需的时间。
        增强第 ${formatInt(8)} 个星系生成器升级。
        神性维度和神性能量产量 ${formatX(77)}。
        暗物质湮灭不再重置任何东西。
        缥缈之力产量 × ${formatInt(10)}。
        解锁阿尔法扩展包。`;
    }
  },
  pelleQoL: {
    divinities: 4,
    get reward() {
      return ` 毁灭现实后自动充能无限升级和打破无限升级。
        毁灭现实后裂痕自动达到 ${formatPercents(1)} 填充度。
        献祭所有裂痕后，裂痕填充速度 ${formatX(10)}。
        神性维度产量 ${formatPow(1.05, 2, 2)}。
        将阿尔法诅咒到达上限所需的时间降低 ${formatPercents(0.5)}。
        将天界物质软上限指数降低 ${formatPercents(0.2)}。
        提升奇迹强子效力。`;
    }
  },
  celestialSurge: {
    divinities: 5,
    get reward() {
      return ` 超七方体现在同时作用于天界物质三重软上限。
        虚无时反物质维度倍率 ^ 2。
        献祭所有裂痕后，裂痕填充速度 ${formatX(10)}。
        解锁一个新的星系生成器升级。
        将所有类型的强子效果到达上限所需的时间降低 ${formatPercents(0.75)}。
        缥缈之力产量 × ${formatInt(1000)}。
        鹿颈长等级 ${formatInt(40)} 的奖励现在作用于符文不稳定性的前 ${formatInt(5)} 重软上限。`;
    }
  },
  finalRebirth: {
    divinities: 7,
    get reward() {
      return ` 推迟符文不稳定性第六软上限出现。
        虚无时基于本次终局中经过的真实时间增强反物质维度；神性维度产量 ${formatPow(1.05, 2, 2)}。
        献祭所有裂痕后，裂痕填充速度 ${formatX(100)}。
        将所有类型的强子效果到达上限所需的时间降低 ${formatPercents(0.5)}。
        将阿尔法诅咒到达上限所需的时间降低 ${formatPercents(0.25)}。
        基于本次终局中经过的真实时间提高熵产量倍率。
        略微提升奇迹强子效力。`;
    }
  },
  ascendedSurge: {
    divinities: 10,
    get reward() {
      return ` 符文不稳定性第六软上限出现额外推迟 ${formatPercents(0.1)}。
        献祭所有裂痕后，裂痕填充速度 ${formatX(1000)}。
        将所有类型的强子效果到达上限所需的时间降低 ${formatPercents(0.75)}。
        将阿尔法诅咒到达上限所需的时间降低 ${formatPercents(0.5)}。
        游戏速度以快速衰减的倍率提高缥缈之力产量。
        解锁批量获得宇宙扇区。`;
    }
  }
};
