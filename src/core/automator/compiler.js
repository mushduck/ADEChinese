import { lexer, tokenMap as T } from "./lexer";
import { AutomatorCommands } from "./automator-commands";
import { parser } from "./parser";

const BaseVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

class Validator extends BaseVisitor {
  constructor(rawText) {
    super();
    this.validateVisitor();
    this.reset(rawText);
    // Commands can provide validation hooks; we might also have some here
    for (const cmd of AutomatorCommands) {
      if (!cmd.validate) continue;
      const ownMethod = this[cmd.id];
      this[cmd.id] = ctx => {
        if (!cmd.validate(ctx, this)) return;
        if (ownMethod) ownMethod.call(this, ctx);
      };
    }

    const lexResult = lexer.tokenize(rawText);
    const tokens = lexResult.tokens;
    parser.input = tokens;
    this.parseResult = parser.script();
    this.visit(this.parseResult);
    this.addLexerErrors(lexResult.errors);
    this.addParserErrors(parser.errors, tokens);
    this.modifyErrorMessages();
    this.errorCount = lexResult.errors.length + this.errors.length + parser.errors.length;
  }

  addLexerErrors(errors) {
    for (const err of errors) {
      this.errors.push({
        startLine: err.line,
        startOffset: err.offset,
        endOffset: err.offset + err.length,
        info: `意外字符：${this.rawText.substr(err.offset, err.length)}`,
        tip: `${this.rawText.substr(err.offset, err.length)} 不能作为指令的一部分，请移除它们`
      });
    }
  }

  static combinePositionRanges(r1, r2) {
    return {
      startLine: Math.min(r1.startLine, r2.startLine),
      startOffset: Math.min(r1.startOffset, r2.startOffset),
      endOffset: Math.max(r1.endOffset, r2.endOffset),
    };
  }

  addParserErrors(errors, tokens) {
    for (const parseError of errors) {
      let err = Validator.combinePositionRanges(
        Validator.getPositionRange(parseError.previousToken),
        Validator.getPositionRange(parseError.token));
      // In some cases, at the end of the script we don't get any useful tokens out of the parse error
      if (parseError.token.tokenType.name === "EOF" && parseError.previousToken.tokenType.name === "EOF") {
        err = Validator.combinePositionRanges(err, Validator.getPositionRange(tokens[tokens.length - 1]));
      }
      // Deal with literal EOL in error message:
      err.info = parseError.message.replace(/'\n\s*'/ui, "End of line");
      const isEndToken = parseError.token.tokenType.name === "EOF" || parseError.token.tokenType.name === "EOL";
      if (parseError.name === "NoViableAltException") {
        if (!isEndToken) {
          err.info = `意外输入 ${parseError.token.image}`;
          err.tip = `移除 ${parseError.token.image}`;
        }
      } else if (parseError.name === "EarlyExitException") {
        err.info = "意外的指令结尾";
        err.tip = "请补充其他参数以完成该指令";
      }
      this.errors.push(err);
    }
  }

  static getPositionRange(ctx) {
    let pos = {
      startLine: Number.MAX_VALUE,
      startOffset: Number.MAX_VALUE,
      endOffset: 0,
    };
    if (ctx === undefined || ctx === null) return pos;
    if (ctx.startOffset !== undefined) {
      return {
        startLine: ctx.startLine,
        startOffset: ctx.startOffset,
        endOffset: ctx.endOffset,
      };
    }
    if (ctx.location !== undefined && ctx.location.startOffset !== undefined) {
      return ctx.location;
    }
    if (ctx.children && !Array.isArray(ctx.children)) return Validator.getPositionRange(ctx.children);
    if (Array.isArray(ctx)) {
      return ctx.reduce((prev, el) => Validator.combinePositionRanges(prev, Validator.getPositionRange(el)), pos);
    }
    for (const k in ctx) {
      if (!Object.prototype.hasOwnProperty.call(ctx, k) || !Array.isArray(ctx[k])) continue;
      pos = Validator.combinePositionRanges(pos, Validator.getPositionRange(ctx[k]));
    }
    return pos;
  }

  addError(ctx, errInfo, errTip) {
    const pos = Validator.getPositionRange(ctx);
    pos.info = errInfo;
    pos.tip = errTip;
    this.errors.push(pos);
  }

  // There are a few errors generated internally in chevrotain.js which are scanned for and modified in here and
  // given appropriate fixing tips and minor formatting adjustments, or are alternatively marked as redundant and
  // filtered out in other parts of the code. This isn't necessarily comprehensive, but should hopefully cover the
  // most common cases.
  modifyErrorMessages() {
    // This function also gets called during loading the savefile, and if it somehow fails to execute properly then
    // the game cache is never invalidated. This only seems to happen on re-initialization after full completions,
    // but that means that in many cases a lot of endgame values are never cleared. Therefore we shortcut the whole
    // function if the automator isn't unlocked or it attempts to error-check an empty script
    if (!Player.automatorUnlocked || AutomatorData.currentScriptText() === undefined) return;

    const modifiedErrors = [];
    let lastLine = 0;
    for (const err of this.errors.sort((a, b) => a.startLine - b.startLine)) {
      // For some reason chevrotain occasionally gives NaN for error location but it seems like this only ever
      // happens on the last line of the script, so we can fill in that value to fix it
      if (isNaN(err.startLine)) {
        err.startLine = AutomatorData.currentScriptText().split("\n").length;
      }

      // Only take one error from each line. In many cases multiple errors will arise from the same line due to how
      // the parser works, and many of them will be useless or redundant. Also sometimes chevrotain fails to generate
      // a line for an error, in which case it's usually a redundant error which can be ignored.
      if (err.startLine === lastLine) {
        continue;
      }

      // Errors that already have tips are more reliable in terms of knowing what they're pointing out; if there's
      // already a tip, don't bother trying to parse and guess at its meaning.
      if (err.tip) {
        modifiedErrors.push(err);
        lastLine = err.startLine;
        continue;
      }

      if (err.info.match(/EOF but found.*\}/gu)) {
        err.info = err.info.replaceAll("--> ", "[").replaceAll(" <--", "]");
        err.tip = "删除 }。解析器在此行停止，后续脚本可能存在的错误将被忽略。";
      } else if (err.info.match(/found.*\}/gu)) {
        err.info = err.info.replaceAll("--> ", "[").replaceAll(" <--", "]");
        err.tip = "删除 }";
      } else if (err.info.match(/Expecting/gu)) {
        err.info = err.info.replaceAll("--> ", "[").replaceAll(" <--", "]");
        err.tip = "请按照指令帮助文档的要求，使用正确的数据类型";
      } else if (err.info.match(/End of line/gu)) {
        err.tip = "请提供剩余参数以补全这条不完整的指令";
      } else if (err.info.match(/EOF but found:/gu)) {
        err.tip = "请移除多余的指令参数";
      } else {
        err.tip = "此错误原因不明";
      }
      modifiedErrors.push(err);
      lastLine = err.startLine;
    }

    for (const err of modifiedErrors) {
      err.startLine = AutomatorBackend.translateLineNumber(err.startLine);
    }

    this.errors = modifiedErrors;
  }

  reset(rawText) {
    this.rawText = rawText;
    this.variables = {};
    this.errors = [];
  }

  checkTimeStudyNumber(token) {
    const tsNumber = parseFloat(token.image);
    if (!TimeStudy(tsNumber) || (TimeStudy(tsNumber).isTriad && !Ra.canBuyTriad)) {
      this.addError(token, `时间研究序号 [${tsNumber}] 无效`,
        `请确保你已复制或输入正确的时间研究序号`);
      return 0;
    }
    return tsNumber;
  }

  lookupVar(identifier, type) {
    const varName = identifier.image;
    const varInfo = {};
    const constants = player.reality.automator.constants;
    if (!Object.keys(constants).includes(varName)) {
      this.addError(identifier, `常量 ${varName} 的值尚未定义`,
        `在脚本常量页面中定义常量 ${varName} 的值，或者检查一下有没有打错`);
      return undefined;
    }
    const value = constants[varName];

    let tree;
    switch (type) {
      case AUTOMATOR_VAR_TYPES.NUMBER:
        varInfo.value = new Decimal(value);
        break;
      case AUTOMATOR_VAR_TYPES.STUDIES:
        tree = new TimeStudyTree(value);
        varInfo.value = {
          normal: tree.selectedStudies.map(ts => ts.id),
          ec: tree.ec,
          startEC: tree.startEC,
        };
        break;
      case AUTOMATOR_VAR_TYPES.DURATION:
        varInfo.value = parseInt(1000 * value, 10);
        break;
      default:
        throw new Error("Unrecognized variable format in automator constant lookup");
    }

    return varInfo;
  }

  isValidVarFormat(identifier, type) {
    const varName = identifier.image;
    const constants = player.reality.automator.constants;
    if (!Object.keys(constants).includes(varName)) return false;
    const value = constants[varName];

    switch (type) {
      case AUTOMATOR_VAR_TYPES.NUMBER:
        // We can't rely on native Decimal parsing here because it largely just discards input past invalid
        // characters and constructs something based on the start of the input string. Notably, this makes
        // things like new Decimal("11,21,31") return 11 instead of something indicating an error.
        return value.match(/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/u);
      case AUTOMATOR_VAR_TYPES.STUDIES:
        return TimeStudyTree.isValidImportString(value);
      case AUTOMATOR_VAR_TYPES.DURATION:
        return !Number.isNaN(parseInt(1000 * value, 10));
      default:
        throw new Error("Unrecognized variable format in automator constant lookup");
    }
  }

  duration(ctx) {
    if (ctx.$value) return ctx.$value;
    if (!ctx.TimeUnit || ctx.TimeUnit[0].isInsertedInRecovery) {
      this.addError(ctx, "缺少时间单位", "请提供时间单位（例如：秒或分钟）");
      return undefined;
    }
    const value = parseFloat(ctx.NumberLiteral[0].image) * ctx.TimeUnit[0].tokenType.$scale;
    if (isNaN(value)) {
      this.addError(ctx, "解析持续时间时出错", "请提供格式正确的时间数值");
      return undefined;
    }
    ctx.$value = value;
    return ctx.$value;
  }

  xHighest(ctx) {
    if (ctx.$value) return ctx.$value;
    if (!ctx.NumberLiteral || ctx.NumberLiteral[0].isInsertedInRecovery) {
      this.addError(ctx, "缺少倍数", "请提供自动购买器的倍数设置");
      return undefined;
    }
    ctx.$value = new Decimal(ctx.NumberLiteral[0].image);
    return ctx.$value;
  }

  currencyAmount(ctx) {
    if (ctx.$value) return ctx.$value;
    if (!ctx.NumberLiteral || ctx.NumberLiteral[0].isInsertedInRecovery) {
      this.addError(ctx, "缺少数量", "请提供自动购买器的数量设置");
      return undefined;
    }
    ctx.$value = new Decimal(ctx.NumberLiteral[0].image);
    return ctx.$value;
  }

  studyRange(ctx, studiesOut) {
    if (!ctx.firstStudy || ctx.firstStudy[0].isInsertedInRecovery ||
      !ctx.lastStudy || ctx.lastStudy[0].isInsertedInRecovery) {
      this.addError(ctx, "Missing Time Study number in range",
        "Provide starting and ending IDs for Time Study number ranges");
      return;
    }
    const first = this.checkTimeStudyNumber(ctx.firstStudy[0]);
    const last = this.checkTimeStudyNumber(ctx.lastStudy[0]);
    if (!first || !last || !studiesOut) return;
    for (let id = first; id <= last; ++id) {
      if (TimeStudy(id)) studiesOut.push(id);
    }
  }

  studyListEntry(ctx, studiesOut) {
    if (ctx.studyRange) {
      this.visit(ctx.studyRange, studiesOut);
      return;
    }
    if (ctx.NumberLiteral) {
      if (ctx.NumberLiteral[0].isInsertedInRecovery) {
        this.addError(ctx, "缺失时间研究编号", "输入时间研究的序号或字符串");
        return;
      }
      const id = this.checkTimeStudyNumber(ctx.NumberLiteral[0]);
      if (id) studiesOut.push(id);
      return;
    }
    if (ctx.StudyPath) {
      const pathId = ctx.StudyPath[0].tokenType.$studyPath;
      const pathStudies = NormalTimeStudies.paths[pathId];
      studiesOut.push(...pathStudies);
    }
  }

  studyList(ctx) {
    if (ctx.$cached !== undefined) return ctx.$cached;
    const studiesOut = [];
    for (const sle of ctx.studyListEntry) this.visit(sle, studiesOut);
    const positionRange = Validator.getPositionRange(ctx);
    ctx.$cached = {
      normal: studiesOut,
      image: this.rawText.substr(positionRange.startOffset, positionRange.endOffset - positionRange.startOffset + 1),
      ec: 0,
      startEC: false,
    };
    if (ctx.ECNumber) {
      if (ctx.ECNumber.isInsertedInRecovery) {
        this.addError(ctx.Pipe[0], "永恒挑战序号缺失",
          "准确说明你要进入的永恒挑战，例如 ec4");
      }
      const ecNumber = parseFloat(ctx.ECNumber[0].image);
      if (!Number.isInteger(ecNumber) || ecNumber < 0 || ecNumber > 12) {
        this.addError(ctx.ECNumber, `永恒挑战序号 [${ecNumber}] 无效`,
          `不存在永恒挑战 ${ecNumber}, 只能是 ${format(1)} 和 ${format(12)} 之间的整数`);
      }
      ctx.$cached.ec = ecNumber;
    }
    if (ctx.Exclamation) ctx.$cached.startEC = true;
    return ctx.$cached;
  }

  compareValue(ctx) {
    if (ctx.NumberLiteral) {
      ctx.$value = new Decimal(ctx.NumberLiteral[0].image);
    } else if (ctx.Identifier) {
      if (!this.isValidVarFormat(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.NUMBER)) {
        this.addError(ctx, `常量 ${ctx.Identifier[0].image} 不能用于比较`,
          `确认 ${ctx.Identifier[0].image} 的值是一个格式正确的数字，而不是时间研究字符串`);
      }
      const varLookup = this.lookupVar(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.NUMBER);
      if (varLookup) ctx.$value = ctx.Identifier[0].image;
    }
  }

  comparison(ctx) {
    super.comparison(ctx);
    if (!ctx.compareValue || ctx.compareValue[0].recoveredNode ||
      ctx.compareValue.length !== 2 || ctx.compareValue[1].recoveredNode) {
      this.addError(ctx, "缺少用于比较的数值", "确保有两个待比较的数值");
    }
    if (!ctx.ComparisonOperator || ctx.ComparisonOperator[0].isInsertedInRecovery) {
      this.addError(ctx, "缺少比较运算符（<、>、<=、>=）", "确保有比较运算符");
      return;
    }
    if (ctx.ComparisonOperator[0].tokenType === T.OpEQ || ctx.ComparisonOperator[0].tokenType === T.EqualSign) {
      this.addError(ctx, "请使用不等于符号进行比较（>、<、>=、<=）",
        "无法进行相等的比较，只能进行不等于的比较");
    }
  }

  badCommand(ctx) {
    const firstToken = ctx.badCommandToken[0].children;
    const firstTokenType = Object.keys(firstToken)[0];
    this.addError(firstToken[firstTokenType][0], `指令 [${firstToken[firstTokenType][0].image}] 无法识别`,
      "请确认你输入了正确的指令名称");
  }

  eternityChallenge(ctx) {
    let errToken, ecNumber;
    if (ctx.ECLiteral) {
      ecNumber = parseFloat(ctx.ECLiteral[0].image.substr(2));
      errToken = ctx.ECLiteral[0];
    } else if (ctx.NumberLiteral) {
      ecNumber = parseFloat(ctx.NumberLiteral[0].image);
      errToken = ctx.NumberLiteral[0];
    } else {
      this.addError(ctx, "永恒挑战序号缺失",
        "准确说明你要进入的永恒挑战，例如 ec4");
      return;
    }
    if (!Number.isInteger(ecNumber) || ecNumber < 1 || ecNumber > 12) {
      this.addError(errToken, `永恒挑战序号 [${ecNumber}] 无效`,
        `不存在永恒挑战 ${ecNumber}, 只能是 ${format(1)} 和 ${format(12)} 之间的整数`);
    }
    ctx.$ecNumber = ecNumber;
  }

  checkBlock(ctx, commandToken) {
    let hadError = false;
    if (!ctx.RCurly || ctx.RCurly[0].isInsertedInRecovery) {
      this.addError(commandToken[0], "缺少右括号 }",
        "This loop has mismatched brackets, add a corresponding } on another line to close the loop");
      hadError = true;
    }
    if (!ctx.LCurly || ctx.LCurly[0].isInsertedInRecovery) {
      this.addError(commandToken[0], "缺少左括号 {",
        "This line has an extra } closing a loop which does not exist, remove the }");
      hadError = true;
    }
    return !hadError;
  }

  script(ctx) {
    if (ctx.block) this.visit(ctx.block);
    ctx.variables = this.variables;
  }
}

class Compiler extends BaseVisitor {
  constructor() {
    super();
    // Commands provide compilation hooks; we might also have some here
    for (const cmd of AutomatorCommands) {
      if (!cmd.compile) continue;
      const ownMethod = this[cmd.id];
      // eslint-disable-next-line no-loop-func
      this[cmd.id] = (ctx, output) => {
        // For the compiler, we don't bother doing the default recursive visitation behavior
        if (ownMethod && ownMethod !== super[cmd.id]) ownMethod.call(this, ctx, output);
        let compiled = cmd.compile(ctx, this);
        if (typeof compiled === "function") compiled = { run: compiled };
        compiled.lineNumber = ctx.startLine;
        output.push(compiled);
      };
    }
    this.validateVisitor();
  }

  comparison(ctx) {
    const getters = ctx.compareValue.map(cv => {
      if (cv.children.AutomatorCurrency) return cv.children.AutomatorCurrency[0].tokenType.$getter;
      const val = cv.children.$value;
      if (typeof val === "string") return () => player.reality.automator.constants[val];
      return () => val;
    });
    // Some currencies are locked and should always evaluate to false if they're attempted to be used
    const canUseInComp = ctx.compareValue.map(cv => {
      if (cv.children.AutomatorCurrency) {
        const unlockedFn = cv.children.AutomatorCurrency[0].tokenType.$unlocked;
        return unlockedFn ? unlockedFn() : true;
      }
      // In this case, it's a constant (either automator-defined or literal)
      return true;
    });

    if (!canUseInComp[0] || !canUseInComp[1]) return () => false;
    const compareFun = ctx.ComparisonOperator[0].tokenType.$compare;
    return () => compareFun(getters[0](), getters[1]());
  }

  block(ctx) {
    const output = [];
    if (ctx.command) for (const cmd of ctx.command) this.visit(cmd, output);
    return output;
  }

  script(ctx) {
    if (ctx.variables === undefined) {
      throw new Error("Compiler called before Validator");
    }
    return ctx.block ? this.visit(ctx.block) : [];
  }
}

class Blockifier extends BaseVisitor {
  constructor() {
    super();
    for (const cmd of AutomatorCommands) {
      const blockify = cmd.blockify;
      if (!blockify) continue;
      const ownMethod = this[cmd.id];
      // eslint-disable-next-line no-loop-func
      this[cmd.id] = (ctx, output) => {
        if (ownMethod && ownMethod !== super[cmd.id]) ownMethod.call(this, ctx, output);
        try {
          const block = blockify(ctx, this);
          output.push({
            ...block,
            id: UIID.next()
          });
        } catch {
          // If a command is invalid, it will throw an exception in blockify and fail to assign a value to block
          // We can't, generally, make good guesses to fill in any missing values in order to avoid the exception,
          // so we instead just ignore that block
        }
      };
    }
    this.validateVisitor();
  }

  comparison(ctx) {
    const parseInput = index => {
      const comp = ctx.compareValue[index];
      const isCurrency = Boolean(comp.children.AutomatorCurrency);
      if (isCurrency) return comp.children.AutomatorCurrency[0].image;
      return comp.children.$value;
    };

    return {
      compOperator: ctx.ComparisonOperator[0].image,
      genericInput1: parseInput(0),
      genericInput2: parseInput(1),
    };
  }

  script(ctx) {
    const output = [];
    if (ctx.block) this.visit(ctx.block, output);
    return output;
  }

  block(ctx, output) {
    if (ctx.command) {
      for (const cmd of ctx.command) {
        this.visit(cmd, output);
      }
    }
  }
}

export function compile(input, validateOnly = false) {
  // The lexer and codemirror choke on the last line of the script, so we pad it with an invisible newline
  const script = `${input}\n `;
  const validator = new Validator(script);
  let compiled;
  if (validator.errorCount === 0 && !validateOnly) {
    compiled = new Compiler().visit(validator.parseResult);
  }
  return {
    errors: validator.errors,
    compiled,
  };
}

export function hasCompilationErrors(input) {
  return compile(input, true).errors.length !== 0;
}

export function blockifyTextAutomator(input) {
  const validator = new Validator(input);
  const blockifier = new Blockifier();
  const blocks = blockifier.visit(validator.parseResult);

  // The Validator grabs all the lines from the visible script, but the Blockifier will fail to visit any lines
  // associated with unparsable commands. This results in a discrepancy in line count whenever a line can't be
  // parsed as a specific command, and in general this is a problem we can't try to guess a fix for, so we just
  // don't convert it at all. In both cases nested commands are stored recursively, but with different structure.
  const validatedCount = entry => {
    if (!entry) return 0;
    const commandDepth = entry.children;
    let foundChildren = 0;
    // Inner nested commands are found within a prop given the same name as the command itself - this should only
    // actually evaluate to nonzero for at most one key, and will be undefined for all others
    for (const key of Object.keys(commandDepth)) {
      const nestedBlock = commandDepth[key][0]?.children?.block;
      const nestedCommands = nestedBlock ? nestedBlock[0].children.command : [];
      foundChildren += nestedCommands
        ? nestedCommands.map(c => validatedCount(c) + 1).reduce((sum, val) => sum + val, 0)
        : 0;

      // Trailing newlines get turned into a command with a single EOF argument; we return -1 because one level up
      // on the recursion this looks like an otherwise valid command and would be counted as such
      if (key === "EOF") return -1;
    }
    return foundChildren;
  };
  const visitedCount = block => {
    if (!block.nest) return 1;
    return 1 + block.nest.map(b => visitedCount(b)).reduce((sum, val) => sum + val, 0);
  };
  // Note: top-level structure is slightly different than the nesting structure
  const validatedBlocks = validator.parseResult.children.block[0].children.command
    .map(c => validatedCount(c) + 1)
    .reduce((sum, val) => sum + val, 0);
  const visitedBlocks = blocks.map(b => visitedCount(b)).reduce((sum, val) => sum + val, 0);

  return { blocks, validatedBlocks, visitedBlocks };
}

export function validateLine(input) {
  const validator = new Validator(input);
  return validator;
}
