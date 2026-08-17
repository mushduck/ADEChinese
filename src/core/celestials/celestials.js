import { Alpha } from "./alpha";
import { Effarig } from "./effarig";
import { Enslaved } from "./enslaved";
import { Laitela } from "./laitela/laitela";
import { Pelle } from "./pelle/pelle";
import { Ra } from "./ra/ra";
import { Teresa } from "./teresa";
import { V } from "./V";

export const Celestials = {
  teresa: Teresa,
  effarig: Effarig,
  enslaved: Enslaved,
  v: V,
  ra: Ra,
  laitela: Laitela,
  pelle: Pelle,
  alpha: Alpha
};

GameDatabase.celestials.descriptions = [
  {
    name: "特蕾莎",
    effects() {
      return `符文无法生产时间之理。
      获得更少的无限点数和永恒点数 (x^${format(0.55, 2, 2)}).`;
    },
  },
  {
    name: "鹿颈长",
    effects() {
      return `所有维度的倍率、游戏速度和计数频率都受到类似时间膨胀的削弱。
      无限之力可以降低产量和游戏速度的削弱程度，时间碎片可以减少计数频率的削弱程度。
      符文等级暂时限制为 ${formatInt(Effarig.glyphLevelCap)}，稀有度不受影响。`;
    },
    description() {
      return `当你第一次完成一个层级时，直接退出鹿颈长的现实。`;
    }
  },
  {
    name: "无名氏",
    effects() {
      return `符文等级提升到至少 ${formatInt(5000)}。
      无限、时间和第八反物质维度都只能购买 ${formatInt(1)} 个。
      反物质的倍数受到类似时间膨胀的削弱，膨胀符文的“提升时间膨胀中的反物质指数”效果依然在时间膨胀中生效。
      无法购买时间研究 192 （复制器的项目存在上限）
      禁用黑洞。
      大幅减少超光速粒子和膨胀时间的产量。
      膨胀符文无法生产时间之理。
      某些挑战目标有所增加。
      使用储存的游戏时间（释放黑洞）时，其指数变为原来的 ${format(0.55, 2, 2)} 次方。`;
    }
  },
  {
    name: "V",
    effects() {
      const vEffect = `所有的维度倍率、永恒点数、无限点数和膨胀时间的产量，都是原来的平方根。
      复制器的复制间隔是原来的平方。`;
      const vEffectAdditional = `
      禁用符文炼金中“指数”的效果。`;

      return Ra.unlocks.unlockGlyphAlchemy.canBeApplied
        ? vEffect + vEffectAdditional
        : vEffect;
    }
  },
  {
    name: "Ra",
    effects() {
      return `你最多只有 ${formatInt(4)} 个维度提升。
      计数频率倍率固定为 ${formatX(1.1245, 0, 3)}。`;
    },
  },
  {
    name: "Lai'tela",
    effects() {
      let disabledDims;
      const highestActive = 8 - Laitela.difficultyTier;
      switch (highestActive) {
        case 0:
          disabledDims = "所有维度";
          break;
        case 1:
          disabledDims = "第二维度及其以上的维度";
          break;
        case 2:
          disabledDims = "第三维度及其以上的维度";
          break;
        case 7:
          disabledDims = "第八维度";
          break;
        default:
          disabledDims = `${highestActive + 1}维度及其以上的维度`;
          break;
      }
      const disabledText = highestActive === 8
        ? ""
        : `禁用${disabledDims}的生产。`;

      return `无限点数和永恒点数受到类似时间膨胀的削弱。
      游戏速度降低至 ${formatInt(1)}, 在 ${formatInt(10)} 分钟内逐渐复原。
      禁用黑洞的充能、释放、脉冲、反转。
      ${disabledText}`;
    },
    description() {
      return `在这个现实中，反物质产生熵。熵达到 ${formatPercents(1)} 时，该现实将出现不稳定。你将基于达到 ${formatPercents(1)} 的用时，获得暗物质维度加成。如果你能在 ${formatInt(30)} 秒内令该现实出现不稳定，该现实的难度将大幅提升，不过你能获得更强大的加成。该现实出现不稳定 ${formatInt(8)} 次后，暗能量的产量 ${formatX(Math.pow(8, Laitela.hadronizes + 1))}。`;
    }
  },
  {
    name: "Pelle",
    effects() {
      return `你的现实将被毁灭，这会对游戏玩法产生各种影响。`;
    }
  },
  {
    name: "Alpha",
    effects() {
      return `ㅤㅤ极大削弱天界维度和宇宙扇区，除此之外禁用所有在首次达到现实后解锁或获得的所有奖励、效果、升级、增强、增益、削弱和特性。在阿尔法的现实中降低天界物质激发指数至 ${formatInt(0)}，每小时（真实时间）恢复 ${formatPercents(Alpha.alphaDecayByHour, 2)}，称之为阿尔法衰变。ㅤㅤㅤㅤㅤㅤㅤ阿尔法衰变的上限为 ${formatInt(24)} 小时，并基于阿尔法的现实层级降低。在外部获得例如宇宙扇区的资源将加速阿尔法衰变，等效于在阿尔法的现实中投入更多时间。你当前的阿尔法衰变速度因子为 ${formatX(Alpha.totalSpeedBoost, 2, 2)}。你开始阿尔法的现实层级时，已花费的总最大时间比例为 ${formatPercents(Alpha.cosmicSectorMinBoost, 2, 2)}。宇宙扇区将阿尔法衰变的起始值和上限值提高 ${format(Alpha.cosmicSectorExtraBoost, 2, 2)} 小时。这不会缩短阿尔法衰变达到上限所需的时间，而是使阿尔法衰变在前期速度更快、后期速度变慢。ㅤㅤㅤ基于当前的宇宙扇区数量指数削弱宇宙扇区奖励效力，这是一个半永久削弱，在摧毁阿尔法的现实前无法恢复。大多数基于游戏时间的加成更改为基于真实时间。禁用成就倍率和大部分成就奖励。基于反物质数量略微削弱反物质维度。`;
    },
    description() {
      return `ㅤㅤㅤㅤㅤ每个阿尔法的现实层级被击穿时，你将自动退出阿尔法的现实。每完成一层阿尔法的现实，你将获得一个在阿尔法的现实外部生效的增益，以及一个在阿尔法的现实内部生效的削弱。`;
    }
  }
];
