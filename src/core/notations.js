import * as ADLNotations from "adnot-beport-large";
import * as ADNotations from "adnot-beport-small";

export const Notation = (function() {
  const N = ADNotations;
  const notation = (type, chineseName) => {
    const n = new type();
    n.setAsCurrent = () => {
      player.options.notation = n.name;
      ui.notationName = n.name;
    };
    n.chineseName = chineseName;
    return n;
  };
  const painful = n => {
    n.isPainful = true;
    return n;
  };
  return {
    scientific: notation(N.ScientificNotation, "科学"),
    engineering: notation(N.EngineeringNotation, "工程"),
    letters: notation(N.LettersNotation, "字母"),
    standard: painful(notation(N.StandardNotation, "标准")),
    emoji: painful(notation(N.EmojiNotation, "Emoji")),
    mixedScientific: notation(N.MixedScientificNotation, "混合科学"),
    mixedEngineering: notation(N.MixedEngineeringNotation, "混合工程"),
    logarithm: notation(N.LogarithmNotation, "对数"),
    brackets: painful(notation(N.BracketsNotation, "括号")),
    infinity: notation(N.InfinityNotation, "无限"),
    roman: painful(notation(N.RomanNotation, "罗马")),
    dots: painful(notation(N.DotsNotation, "点阵")),
    zalgo: painful(notation(N.ZalgoNotation, "乱码")),
    hex: painful(notation(N.HexNotation, "十六进制")),
    imperial: painful(notation(N.ImperialNotation, "英制单位")),
    clock: painful(notation(N.ClockNotation, "时钟")),
    prime: painful(notation(N.PrimeNotation, "质数")),
    bar: painful(notation(N.BarNotation, "条形图")),
    shi: painful(notation(N.ShiNotation, "施氏食狮史")),
    blind: painful(notation(N.BlindNotation, "空白")),
    blobs: painful(notation(N.BlobsNotation, "Blobs")),
    all: painful(notation(N.AllNotation, "全部"))
  };
}());

export const LNotation = (function() {
  const N = ADLNotations;
  const notation = (type, chineseName) => {
    const n = new type();
    n.setAsCurrent = () => {
      player.options.lnotation = n.name;
      ui.lnotationName = n.name;
    };
    n.chineseName = chineseName;
    return n;
  };
  return {
    extendedScientific: notation(N.ExtendedScientificNotation, "扩展科学计数法"),
    stackedScientific: notation(N.StackedScientificNotation, "堆叠科学计数法"),
    semiStackedScientific: notation(N.SemiStackedScientificNotation, "半堆叠科学计数法"),
    extendedLogarithm: notation(N.ExtendedLogarithmNotation, "扩展对数计数法"),
    tetrational: notation(N.TetrationalNotation, "指数塔计数法"),
    trueTetrational: notation(N.TrueTetrationalNotation, "真·指数塔计数法"),
    hyperE: notation(N.HyperENotation, "超E记号计数法"),
    simpleExtendedScientific: notation(N.SimpleExtendedScientificNotation, "简单扩展科学计数法"),
    stackedMixedScientific: notation(N.StackedMixedScientificNotation, "堆叠混合科学计数法")
  };
}());

Notation.emoji.setAsCurrent = (silent = false) => {
  player.options.notation = Notation.emoji.name;
  ui.notationName = Notation.emoji.name;
  if (!silent) GameUI.notify.success("😂😂😂");
};

// Post e9e15
export const LNotations = {
  // Defined as a list here for exact order in options tab.
  all: [
    LNotation.extendedScientific,
    LNotation.stackedScientific,
    LNotation.semiStackedScientific,
    LNotation.extendedLogarithm,
    LNotation.tetrational,
    LNotation.trueTetrational,
    LNotation.hyperE,
    LNotation.simpleExtendedScientific,
    LNotation.stackedMixedScientific
  ],
  find: name => {
    const notation = LNotations.all.find(n => n.name === name);
    return notation === undefined ? LNotation.extendedScientific : notation;
  },
  get current() {
    return GameUI.initialized ? ui.lnotation : LNotation.extendedScientific;
  }
};

// Pre e9e15
export const Notations = {
  // Defined as a list here for exact order in options tab.
  all: [
    Notation.scientific,
    Notation.engineering,
    Notation.letters,
    Notation.standard,
    Notation.emoji,
    Notation.mixedScientific,
    Notation.mixedEngineering,
    Notation.logarithm,
    Notation.brackets,
    Notation.infinity,
    Notation.roman,
    Notation.dots,
    Notation.zalgo,
    Notation.hex,
    Notation.imperial,
    Notation.clock,
    Notation.prime,
    Notation.bar,
    Notation.shi,
    Notation.blind,
    Notation.blobs,
    Notation.all,
  ],
  find: name => {
    const notation = Notations.all.find(n => n.name === name);
    return notation === undefined ? Notation.mixedScientific : notation;
  },
  get current() {
    return GameUI.initialized ? ui.notation : Notation.mixedScientific;
  }
};

ADNotations.Settings.isInfinite = decimal => ui.formatPreBreak && decimal.gte(DC.NUMMAX);

EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  ui.formatPreBreak = !PlayerProgress.hasBroken() || (NormalChallenge.isRunning && !Enslaved.isRunning);
});
