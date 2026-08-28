import { credits } from "@/core/secret-formula/credits";

export const h2p = {
  /**
   * @template
   * {
   *  @property {String} name   Internal name for the tab entry
   *  @property {String} alias  Display name for the tab; if not present, will use the internal name
   *  @property {Number} id     Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info         Text body of information for the entry
   *  @property {function: @return Boolean} isUnlocked  Condition for when the entry is visible and searchable
   *  @property {Array: String} tags  List of keywords which are linked to this tab in the search function
   *  @property {String} tab    Key of a tab+subtab combination which will default the h2p to this entry if opened
   * }
   */
  tabs: [
    {
      name: "本弹窗",
      info: () => `欢迎使用游戏帮助！
<br>
本弹窗包含你在游戏进程中遇到的所有内容的详细说明与补充信息。随着解锁新功能和机制，此处将开放更多页面。若在游戏中感到困惑，可在相关条目中找到有用解释。
<br>
首次打开游戏帮助时始终显示本页。获得首次维度提升后，再次打开本窗口将智能定位至当前标签页/子标签页内容最相关的游戏帮助条目（若存在相关条目）。
`,
      isUnlocked: () => true,
      tags: ["h2p", "how", "to", "play", "modal"],
      tab: ""
    },
    {
      name: "你的存档",
      info: () => `
你的游戏存档存储位置取决于平台：网页版存档在浏览器数据中，Steam版在安装目录。清除浏览器缓存/Steam完全卸载将删除存档。在无痕窗口游玩时，下次打开浏览器存档将消失。存档与浏览器绑定（如Chrome存档无法在Firefox读取），且网页版与Steam版存档相互独立。<br><br>
可通过导出功能转移存档：生成<i>极长</i>随机字符串并复制到剪贴板。完整粘贴至导入窗口即可恢复存档（部分通讯软件可能截断文本导致失败）。<br><br>
现实版本的标准存档格式：起始符为<b>${GameSaveSerializer.startingString.savefile}</b>，结束符为<b>${GameSaveSerializer.endingString.savefile}</b>。旧版存档起始符为<b>eyJ</b>，结束符为<b>In19</b>、<b>fX0=</b>或<b>fQ==</b>。除剪贴板操作外也支持文本文件导入导出。<br>
"选择存档"按钮可管理三个独立存档槽位。导入导出仅影响当前槽位。<b>注意：清除浏览器/Steam数据将重置全部存档。</b><br><br>
游戏默认每 ${formatInt(30)} 秒自动保存。关闭游戏前请留意：若未等到自动保存或手动保存，操作可能丢失。自动保存间隔可在左下角调整。<br><br>
点击"打开自动备份菜单"可查看存档备份，支持回滚至特定时间点（如数分钟前）。<br><br>
关联Google账户可实现跨设备云同步（仅限网页版与Steam版）。Android版存档不兼容云同步。云同步时将自动覆盖旧存档，若云端存档较新或进度显著领先，则会弹出选择窗口。（因技术问题，汉化版已移除云同步。若有需要，请游玩原版游戏）<br><br>
点击重置按钮可清除当前存档（需确认）。<b>注意：此操作不可逆且不会获得任何永久性收益或隐藏奖励，其他槽位不受影响。</b>
`,
      isUnlocked: () => true,
      tags: ["choose", "cloud", "google", "save", "import", "export", "reset"],
      tab: "options/saving"
    },
    {
      name: "个性化",
      info: () => `
游戏提供两种UI布局：经典UI保留现实版本更新前的反物质维度风格，现代UI则采用现代深色主题重设计。另有多种主题可全局修改游戏外观，部分隐藏主题需通过导入特定短语解锁，两种UI布局均支持全部主题。<br><br>
数字显示格式默认为混合科学计数法，可通过下拉菜单切换多种选项。部分格式为趣味设计，可能导致文本溢出屏幕（非程序错误）。此外可在“指数显示格式选项”菜单配置极大数字的呈现方式（某些场景下可能显示异常）。<br><br>
游戏事件常触发全屏动画或需确认的弹窗。多数动画和确认提示可在选项中单独禁用，但禁用选项需在首次触发后才会显示。
`,
      isUnlocked: () => true,
      tags: ["UI", "update", "news", "theme", "notation", "comma", "exponent", "animation", "retry", "confirmation",
        "offline", "hotkey", "classic", "modern"],
      tab: "options/visual"
    },
    {
      name: "离线进度",
      info: () => `
反物质维度采用追赶机制模拟长时间关闭游戏后的行为。由于游戏数学模型复杂，模拟精度有限，最终将汇总离线期间关键资源的变化量。<br><br>
若游戏处于开启状态但被切至后台挂机，恢复时将尝试按离线进度处理。此行为可能因设备差异不可靠，可在选项中关闭——关闭后所有后台挂机时间将压缩至单一时刻处理。<br><br>
游戏以时刻为单位运行：每个时刻触发维度生产 → 自动购买器执行 → 数值更新。默认每秒 ${formatInt(20)} 时刻（可通过“刷新率”选项调整）。当前设置下平均每秒运行 ${format(1000 / player.options.updateRate, 2, 1)} 时刻，实际时刻长度可能存在数个百分点波动。<br><br>
离线模拟时，时刻长度被拉伸以匹配离线时间（例如 ${formatInt(1000)} 个间隔离线 1 小时 → 每时刻 ${format(3.6, 1, 1)} 秒）。多数资源增量与在线近似，但自动购买器仅每 ${format(3.6, 1, 1)} 秒触发一次，可能显著影响游戏进程。<br><br>
${player.blackHole[0].unlocked
    ? `<b>黑洞离线行为：</b>解锁黑洞后，离线模拟将保持每个时刻的<i>游戏</i>时间量近似。这会使黑洞在模拟期间看似活跃时间远超常态——实际是游戏放慢活跃期执行速度并跳过非活跃期（因其单位时间产量低）。相比固定实时长的时刻，此机制通常对你更有利。<br><br>`
    : ""
}
离线时刻数可在 ${formatInt(500)} 至 ${formatInt(DC.E6)} 间调整。值越小模拟越快但精度越低，值越大精度越高但耗时越长。单时刻最长模拟 1 天，极端情况（如离线超 1 年）可能无法完整计算所有离线时间。<br><br>
可完全禁用离线进度（如用于调试或纯在线玩法）。禁用时，游戏总时长统计将在关闭期间暂停。
`,
      isUnlocked: () => true,
      tags: ["offline", "away", "progress"],
      tab: "options/gameplay"
    }, {
      name: "效果作用",
      info: () => `
反物质维度中的效果与升级主要分为三类：<br>
- <b>加法类：</b> 通常以 + 号（或"增加"一词）后跟数字表示，将数值累加到基础量。多个加法效果相加计算。有时也表现为减法效果（如降低资源价格）。<br>
- <b>乘法类：</b> 通常以 × 号（或"乘"一词）后跟数字表示，少数情况下为"➜"连接的两个数字。不同乘法来源始终相乘计算。某些场景下可能表现为除法形式的负面效果或价格削减。<br>
- <b>幂类：</b> 较为罕见，以 ^ 后跟数字表示。多个幂效果按顺序应用（等效于将幂值相乘后作为单一指数应用）。极少数情况下可能表现为小于 ${formatInt(1)} 的指数形式负面效果。<br><br>
除非特别注明升级或奖励<i>替换</i>旧值，否则所有效果均可叠加。若发生替换，新值将在上述效果应用前生效。最终效果的计算顺序为：加法 → 乘法 → 幂运算。<br><br>
${PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked()
    ? "时间膨胀及类似效果将在所有其他效果叠加完成后应用。"
    : ""}<br><br>
${PlayerProgress.realityUnlocked()
    ? `符文效果具有双重叠加属性：其内部叠加方式与游戏全局效果的叠加方式。两者可能不同——例如"反物质维度指数"效果在<i>自身内部加法叠加</i>后，会与基础值 ${formatInt(1)} 相加，最终作为<i>幂类效果</i>应用于反物质维度。`
    : ""}
`,
      isUnlocked: () => true,
      tags: ["effect", "stack", "combine", "add", "reduce", "multiply", "divide", "power", "dilation", "glyph"],
      tab: "options/gameplay"
    }, {
      name: "常用缩写",
      info: () => `
游戏中许多资源采用缩写格式显示以节省空间。本帮助条目将在你首次遇到新资源时自动更新对应条目。<br>
- <b>AM</b>：反物质<br>
- <b>AD</b>：反物质维度<br>
- <b>AG</b>：反物质星系<br>
${PlayerProgress.infinityUnlocked() ? "- <b>IP</b>：无限点数<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>NC</b>：普通挑战<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>IC</b>：无限挑战<br>" : ""}
${InfinityDimension(1).isUnlocked || PlayerProgress.eternityUnlocked() ? "- <b>ID</b>：无限维度<br>" : ""}
${PlayerProgress.replicantiUnlocked() ? "- <b>RG</b>：复制器星系<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EP</b>：永恒点数<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TT</b>：时间之理<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TD</b>：时间维度<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EC</b>：永恒挑战<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TP</b>：超光速粒子<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>DT</b>：膨胀时间<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TG</b>：超光速粒子星系<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>RM</b>：现实机器<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>AP</b>：自动机点数<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>BH</b>：黑洞<br>" : ""}
${MachineHandler.isIMUnlocked ? "- <b>iM</b>：虚幻机器<br>" : ""}
${Laitela.isUnlocked ? "- <b>DM</b>：暗物质<br>" : ""}
${Laitela.isUnlocked ? "- <b>DE</b>：暗能量<br>" : ""}
`,
      isUnlocked: () => true,
      tags: ["abbreviation", "shorten", "am", "ad", "ag", "ip", "nc", "ic", "id", "rg", "ep", "tt", "td", "ec", "tp",
        "dt", "tg", "rm", "ap", "bh", "im", "dm", "de"],
      tab: ""
    }, {
      name: "反物质维度",
      info: () => `
反物质是贯穿游戏进程的核心资源，用于购买各类升级。首次打开游戏时，你将拥有 ${formatInt(10)} 个反物质，可消耗其购买第一反物质维度以启动游戏。<br><br>
反物质维度是游戏中的生产单位：第一反物质维度生产反物质，高阶维度生产低阶维度，形成稳定增长链。总计八个反物质维度。<br><br>
<b>维度倍数：</b> 维度旁显示倍数（如：第一维度 ${formatX(1, 1, 1)}）。每购买 ${formatInt(10)} 个该维度，基础倍数增加 ${formatX(2)}，同时维度价格上涨。<br><br>
<b>累计维度数量：</b> 显示当前拥有量（含反物质购买及高阶维度生产）。<br><br>
<b>已购买维度数量：</b> 在累计数量旁的括号内显示（如：${formatInt(4)}），表示距离下次倍数升级还需购买 ${formatInt(6)} 个该维度。<br><br>
<b>维度增长率：</b> 显示每秒增长百分比。${formatPercents(1)} 表示每秒数量翻倍，用于评估整体增速。<br><br>
<b>购买方式：</b> “购买单个”按钮可购买单个维度；高亮“买到 ${formatInt(10)} 个”按钮可购买至下次倍数升级所需数量。<br><br>
<b>全部最大化：</b> 依次为第 1-8 反物质维度购买至下次倍数升级所需数量，最后购买最大化的计数频率提升。<br><br>
<b>维度基础价格：</b> ${Array.range(1, 8).map(tier => format(AntimatterDimension(tier)._baseCost, 2, 2)).join("、")}<br>
<b>每 ${formatInt(10)} 个的价格增长倍数：</b> ${Array.range(1, 8).map(tier => format(AntimatterDimension(tier)._baseCostMultiplier, 2, 2)).join("、")}<br><br>
<b>快捷键：</b> 1-8 键购买对应维度至 ${formatInt(10)} 个（按住 Shift 时仅买 ${formatInt(1)} 个），M 键执行全部最大化。
`,
      isUnlocked: () => true,
      tags: ["dims", "normal", "antimatter", "ad"],
      tab: "dimensions/antimatter"
    }, {
      name: "计数频率",
      info: () => `
游戏中的生产发生在每个“时刻”上，初始每秒发生一次。购买计数频率提升可使反物质维度生产加速，如同每秒发生多个时刻。
<br>
<b>计数频率：</b>表示每秒发生的游戏时刻数。部分时刻也被计算在内，提升生产效果如同已过去部分时刻。注意实际时刻时间是模拟的，游戏始终按选项标签页中选择的更新速率运行计算。
<br>
<b>价格：</b>消耗反物质将每秒时刻数乘以显示倍率（无星系时，每次购买为 ${formatX(1.1245, 0, 3)} 倍）
<br>
<b>最大化购买：</b>购买当前反物质可承担的最大数量计数频率提升。  
<br>
<b>快捷键：</b><b>T</b>键购买尽量多的升级，<b>Shift+T</b>购买单次升级。<b>M</b>键执行全部最大化。
`,
      isUnlocked: () => Tickspeed.isUnlocked,
      tags: ["dimension", "earlygame", "time"],
      tab: "dimensions/antimatter"
    }, {
      name: "维度提升",
      info: () => `
<b>维度提升：</b>重置反物质及所有反物质维度，但解锁新维度并提升维度倍率。首次提升需 ${formatInt(20)} 个第四维度，第二次需 ${formatInt(20)} 个第五维度，依此类推。解锁全部 ${formatInt(8)} 个维度后，每次额外提升需比前次多 ${formatInt(15)} 个第八维度（不再解锁新维度），但继续提升维度倍率。  
<br>  
每次维度提升使第一维度倍率 ${formatX(2)}，随着维度倍率递减（最低 ${formatInt(1)}）。例如 ${formatInt(3)} 次提升后：第一维度 ${formatX(8)}，第二维度 ${formatX(4)}，第三维度 ${formatX(2)}，其余维度不受影响。  
<br>  
<b>快捷键：D</b>键尝试执行维度提升。  
`,
      isUnlocked: () => true,
      tags: ["dimboost", "reset", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "反物质星系",
      info: () => `
购买反物质星系将重置游戏至仅剩 ${formatInt(4)} 个维度的状态，但前两个星系可使计数频率提升效果提升 +${format(0.02, 0, 2)}。随着星系增多，倍率增幅将持续增强。  
<br>  
尽管最初几次计数频率购买影响甚微，但倍数增长效应将快速显现。  
<br>  
首个反物质星系需 ${formatInt(80)} 个第八维度，后续每个增加 ${formatInt(60)} 个需求。  
<br>  
<b>遥远星系增长：</b>超过 ${formatInt(100)} 个星系后，每个星系的增量需求增加 ${formatInt(2)}（下一个星系的需求在家${formatInt(62)}，再下一个增加${formatInt(64)}，依此类推）
<br>  
<b>极远星系增长：</b>超过 ${formatInt(Galaxy.remoteStart)} 个星系后，<i>总</i>价格额外增加 ${formatPercents(0.002, 1)}/星系（在遥远星系基础上叠加）  
<br>  
<b>快捷键：G</b>键尝试购买反物质星系。
`,
      isUnlocked: () => true,
      tags: ["8th", "reset", "galaxy", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "维度献祭",
      info: () => `
<b>第五次维度提升后解锁维度献祭。</b>  
<br>  
献祭将立即重置所有非第八维度的数量至零（不降低倍率或当前价格），同时倍增第八维度倍率（数值显示于按钮）。虽需时间恢复生产水平，但最终将获得净增长。  
<br>  
献祭倍率基于献祭时第一维度的数量，可通过完成特定成就和挑战提升倍率增幅。倍率在多次献祭间累积（例：${formatX(10)} 后 ${formatX(4)} 献祭 ≈ ${formatX(8)} 后 ${formatX(5)} 献祭，最终总倍率均为 ${formatX(40)}）。  
<br>  
<b>快捷键：S</b>键尝试献祭。  
`,
      isUnlocked: () => Sacrifice.isVisible,
      tags: ["8th", "reset", "earlygame", "gods", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "成就",
      info: () => `
      每个成就都有特定的解锁条件。解锁后，部分成就将给予奖励。
解锁难度与奖励效果各不相同，差异显著。
<br>
<br>
除各成就的专属奖励外，每完成一个成就，所有反物质维度将获得 ${formatX(1.03, 2, 2)} 倍加成；
每完整完成一行成就，还将额外获得 ${formatX(1.25, 2, 2)} 倍加成。所有成就带来的总加成倍数显示在成就图标上方。
<br>
<br>
隐藏成就不会提供游戏性优势，仅为趣味而设。将鼠标悬停在隐藏成就上可查看解锁提示。
      `,
      isUnlocked: () => true,
      tags: ["earlygame", "awards"],
      tab: "achievements"
    }, {
      name: "无限",
      info: () => `
当你的反物质数量超出世界承载极限（${formatInt(2)}<sup>${formatInt(1024)}</sup>，约等于 ${formatPostBreak(Number.MAX_VALUE, 6)}，也称为"无限"）时，你将被迫执行“大坍缩”。这将重置你的反物质、反物质维度、维度提升和反物质星系。执行大坍缩有时也被称为“无限”。

<br>
<br>
最终你将能够突破 ${formatPostBreak(Number.MAX_VALUE, 6)} 的限制，但在此之前，任何更大的数值都将显示为 ${format(Infinity)}。

<br>
<br>
每次完成大坍缩都会获得一个无限点数，可用于在新的无限标签页中购买升级。你必须从上到下依次购买这些升级。同时你将获得一次无限次数，这实际上就是你执行大坍缩的次数。

<br>
<br>
“使所有来源的无限点数乘以 ${formatInt(2)}”的升级可以多次购买，但每次购买需要花费 ${formatInt(10)} 倍于前一次的无限点数。你必须先完成成就“无需DLC”才能开始购买这个特定升级。

<br>
<br>
<b>快捷键：C</b> 可尝试执行大坍缩。
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ["crunch", "big", "upgrades", "ip", "reset", "prestige", "earlygame"],
      tab: "infinity/upgrades"
    }, {
      name: "普通挑战",
      info: () => `
普通挑战将在首次完成无限后解锁。这些挑战会以不同方式改变游戏机制，创造更具挑战性的无限环境。要完成挑战，你必须再次达到 ${formatPostBreak(Number.MAX_VALUE, 2)} 反物质。
<br>
<br>
每完成一个普通挑战，你将获得一个自动购买器或升级现有自动购买器的能力。你可以重复进行挑战（但只有首次完成会给予奖励），并随时通过“退出挑战”按钮离开挑战。
<br>
<br>
你的第一次无限被视为第一个普通挑战，因此在解锁挑战系统时它已被视为完成。
<br>
<br>
无限升级界面最右侧一列的升级在挑战中不会生效。
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ["infinity", "autobuyer", "earlygame"],
      tab: "challenges/normal"
    }, {
      name: "自动购买器",
      info: () => `
自动购买器可让你自动购买维度、升级或重置。所有自动购买器的控制选项都位于“自动化”标签页下的“自动购买器”子标签中，包括游戏后期解锁的任何额外自动购买器。

<br><br>
反物质维度自动购买器和计数频率提升自动购买器会根据你的总反物质数量解锁，但大多数其他自动购买器需要购买升级或完成挑战才能解锁。

<br><br>
大多数自动购买器具有相似的属性：

<br><br>
<b>自动购买间隔：</b> 自动购买器尝试再次购买前的冷却时间。反物质维度自动购买器和计数频率提升自动购买器需要先完成各自的挑战才能升级其间隔时间。

<br><br>
<b>反物质维度批量购买：</b> 当自动购买器的间隔达到最小值（${formatInt(100)} 毫秒）后，所有后续升级都会使自动购买器每次可购买的最大数量翻倍。此功能可以禁用。

<br><br>
<b>反物质维度购买数量：</b> 维度自动购买器可以设置为购买单个维度，或最多 ${formatInt(10)} 个。当设置为单次购买时，批量购买功能将被禁用。

<br><br>
<b>计数频率购买数量：</b> 计数频率自动购买器可以设置为每次激活购买单个升级，或在完成计数频率挑战（挑战 9）后一次性购买最大可能数量。

<br><br>
<b>自动维度提升自定义：</b> 通过维度提升自动购买器，你可以设置最大尝试购买次数、自动购买前要求的最小反物质星系数量，以及（解锁后）批量购买指定数量维度提升的能力。如果达到你设定的星系阈值，自动购买器将忽略最大提升限制。

<br><br>
<b>最大星系数：</b> 星系自动购买器将购买的最大星系数量。

<br><br>
<b>坍缩时无限点数：</b> 打破无限后，你可以设置获得多少无限点数后才执行坍缩。

<br><br>
<b>献祭自动购买器：</b> 此自动购买器初始具有最短间隔，可能每个时刻都触发。

<br><br>
<b>动态数量：</b> 升级后的转生自动购买器具有在达到指定阈值时触发重置的模式。开启“动态数量”将在解锁某些升级或成就时自动提高此阈值。

<br><br>
<b>暂停/恢复自动购买器：</b> 此按钮将暂停或恢复已开启的自动购买器。它不会改变单个自动购买器的设置，相当于总开关。

<br><br>
<b>启用/禁用所有自动购买器：</b> 此按钮将单独切换所有自动购买器的开关状态。

<br><br>
<b>快捷键：A</b>（用于暂停/恢复自动购买器）。此外，按住 <b>Alt</b> 同时按下与升级、维度或重置相关的快捷键将切换对应的自动购买器。
`,
      isUnlocked: () => true,
      tags: ["infinity", "automation", "challenges", "rewards", "interval", "earlygame"],
      tab: "automation/autobuyers"
    }, {
      name: "打破无限",
      info: () => `
      打破无限后，你将不再受限于 ${formatPostBreak(Number.MAX_VALUE, 2)} 反物质，并且根据坍缩时的反物质数量，每次可获得超过 ${formatInt(1)} 个无限点数。

<br><br>
现在，当你拥有 ${formatPostBreak(Number.MAX_VALUE, 2)} 反物质时进行坍缩可获得约 ${format(1.78, 2, 2)} 个无限点数。每额外获得 ${formatPostBreak(Number.MAX_VALUE, 2)} 倍反物质（连续计算），获得的无限点数量将乘以 ${formatInt(10)}。最终结果会在应用所有乘数后向下取整至最接近的整数。

<br><br>
所有维度的反物质价格在超过 ${formatPostBreak(Number.MAX_VALUE, 2)} 后会加速增长。升级间的价格将会以每级 ${formatX(10)} 的倍率增长（超过 ${formatPostBreak(Number.MAX_VALUE, 2)} 后），计数频率提升价格也会有类似的增长机制。
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["limit", "crunch", "upgrades", "midgame"],
      tab: "infinity/break"
    }, {
      name: "无限维度",
      info: () => `
      <b>解锁无限维度：</b> 当你的反物质达到特定数量时，就能解锁无限维度。

<br><br>
<b>购买无限维度：</b> 无限维度只能以 ${formatInt(10)} 个为一组购买，需要花费无限点数。和其他维度一样，每次购买都会获得永久加成，具体加成效果取决于你购买的无限维度类型。

<br><br>
<b>无限维度生产：</b> 和反物质维度类似，每个无限维度都会生产更低一级的无限维度。

<br><br>
每次坍缩时，你生产的无限维度数量会重置为已购买数量。虽然生产量不会保留，但通过购买获得的所有加成都会保留。

<br><br>
<b>无限维度解锁条件（反物质）：</b> ${Array.range(1, 8)
    .map(tier => formatPostBreak(InfinityDimension(tier)._unlockRequirement))
    .join("、")}
<br>
<b>无限维度购买加成：</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._powerMultiplier))
    .join("、")}
<br>
<b>无限维度基础价格（IP）：</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._baseCost))
    .join("、")}
<br>
<b>无限维度价格增长：</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._costMultiplier))
    .join("、")}

<br><br>
第一无限维度不生产反物质，而是生产无限之力，能给所有反物质维度带来 (无限之力<sup>${formatInt(7)}</sup>) 的加成。无限维度不受计数频率提升影响。
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["id", "power", "new", "dims", "unlock", "break", "midgame"],
      tab: "dimensions/infinity"
    }, {
      name: "无限挑战",
      // This one could use some work!
      info: () => `
无限挑战和普通挑战很像，但目标更高，难度也更大。它们不会只解锁自动购买器，而是会用更独特的方式提升你的各种生产效率。和普通挑战一样，无限升级界面最右侧的升级在无限挑战中也会失效。

<br><br>
和一次性解锁所有普通挑战不同，无限挑战需要你达到特定的反物质数量才能尝试。

<br><br>
<b>无限挑战解锁条件：</b> ${GameDatabase.challenges.infinity
    .map(ic => formatPostBreak(ic.unlockAM)).join("、")}
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["rewards", "break", "ic", "midgame"],
      tab: "challenges/infinity"
    }, {
      name: "复制器",
      info: () => `
复制器是你在获得 ${format(DC.E140)} 无限点数后解锁的另一种资源。它不会生产其他东西，而是会<i>自我复制</i>，最高可达 ${formatPostBreak(Number.MAX_VALUE, 2)}。复制器有自己的生产节奏，不受计数频率提升影响。每个复制器都有一定概率（初始 ${formatPercents(0.01)}）在每个复制周期（初始每秒一次）产生另一个复制器，这两个参数都可以通过花费无限点数来升级。

<br><br>
如果你购买了复制器星系升级，就可以用重置复制器数量（回到 ${formatInt(1)}）来换取一个“免费”的复制器星系。这个星系和反物质星系效果相同，但不会增加你下一个反物质星系的价格。不过它仍然会像普通反物质星系一样重置其他内容。

<br><br>
<b>快捷键：R</b> 可以尝试购买复制器星系。
<br>
复制器能为所有无限维度提供加成，在达到 ${formatPostBreak(Number.MAX_VALUE, 2)} 复制器时最高可获得 ${formatX(Math.pow(2, 20), 2, 2)} 倍加成。

<br><br>
<b>复制概率升级价格：</b> 基础 ${format(DC.E150)} 无限点数，每次升级增加 ${formatX(DC.E15)} 倍
<br>
<b>复制间隔升级价格：</b> 基础 ${format(DC.E140)} 无限点数，每次升级增加 ${formatX(DC.E10)} 倍
<br>
<b>星系升级价格：</b> 基础 ${format(DC.E170)} 无限点数，每次升级增加 ${formatX(DC.E25)} 倍，并额外增加 ${formatX(1e5)} 倍（和遥远星系类似）。超过 ${formatInt(100)} 个复制器星系后，每次升级增加的 ${formatX(1e5)} 倍会变为 ${formatX(DC.E55)} 倍。超过 ${formatInt(1000)} 个后，增长模式会从二次方变为三次方，且 ${formatX(DC.E55)} 倍本身每次升级还会增加 ${formatX(DC.E5)} 倍。
`,
      isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
      tags: ["interval", "chance", "infinity", "galaxy", "galaxies", "midgame"],
      tab: "infinity/replicanti"
    }, {
      name: "永恒",
      info: () => `
当你的无限点数达到 ${formatPostBreak(Number.MAX_VALUE, 2)} 时，就可以进行永恒重置。永恒会重置这之前的所有进度，但会保留挑战时间、成就和统计标签页中"概况"栏目的数据。完成第一次永恒后，你将解锁更多内容。

<br><br>
和第一次达到 ${formatPostBreak(Number.MAX_VALUE, 2)} 反物质时不同，你可以自由选择何时进行永恒重置，即使已经超过 ${formatPostBreak(Number.MAX_VALUE, 2)} 无限点数。永恒时拥有的无限点数越多，获得的永恒点数就越多。每次完成永恒还会获得1次“永恒”计数。

<br><br>
永恒点数的获取方式和无限点数类似，但是基于无限点数量而非反物质。在 ${formatPostBreak(Number.MAX_VALUE, 2)} 无限点数时基础获得约 ${format(1.62, 2, 2)} 永恒点数，每多 ${formatPostBreak(Number.MAX_VALUE, 2)} 倍无限点数就乘以 ${formatInt(5)}。结果总是向下取整，这意味着你在 ${formatPostBreak(Number.MAX_VALUE, 2)} 无限点数时只能获得 ${formatInt(1)} 永恒点数，要到 ${formatPostBreak(DC.E349)} 才能获得 ${formatInt(2)} 永恒点数。

<br><br>
<b>快捷键：E</b> 可以尝试进行永恒重置。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternal", "ep", "reset", "prestige", "midgame"],
      tab: "eternity/upgrades"
    }, {
      name: "永恒里程碑",
      info: () => `
为了让永恒重置更快捷方便，随着永恒次数增加，你会解锁各种增益效果。这些增益能让你在永恒后保留原本会消失的升级、获得新的自动购买器来提升自动化程度，或是以较低效率离线获取资源。

<br><br>
提供升级的里程碑会在永恒开始时自动帮你购买并升到最高级，相当于永久拥有这些升级。

<br><br>
所有新自动购买器除了在自动购买器标签页显示外，还会在对应的手动按钮旁出现开关（比如无限维度自动购买器开关就在无限维度标签页）。维度提升、反物质星系和大坍缩自动购买器的升级会直接更新原有条目。

<br><br>
被动生成类里程碑默认只在离线时生效，可能需要调整自动购买器设置才能正常工作，具体说明见里程碑页面。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternities", "rewards", "automation", "midgame"],
      tab: "eternity/milestones"
    }, {
      name: "时间维度",
      info: () => `
第一次永恒后，你将解锁时间维度。用永恒点数购买时间维度可以产生时间碎片，用于提供计数频率提升。这些升级和普通计数频率提升效果相同但不会增加价格。时间维度、时间碎片及其提供的升级会在无限时保留，但每次永恒都会重置。

<br><br>
和其他维度类似，第二时间维度会生产第一时间维度，以此类推。和无限维度类似，每次永恒后你的生产量会重置为购买数量，但购买的倍率加成会永久保留。

<br><br>
每次购买会使该时间维度的倍率增加 ${formatX(4)} 倍。升级价格的基础倍率会在达到 ${format(TimeDimension(1)._costIncreaseThresholds[0], 2)} 永恒点数时提升 ${formatX(1.5, 1, 1)} 倍，在 ${format(TimeDimension(1)._costIncreaseThresholds[1])} 永恒点数时再提升 ${formatX(2.2, 1, 1)} 倍（基于基础值）。这些提升会追溯生效，导致达到阈值时价格突然上涨，且仅适用于前四个维度。超过 ${format(TimeDimension(1)._costIncreaseThresholds[2])} 永恒点数后，每次购买会按四次计算价格增长，使价格上涨更加剧烈。

<br><br>
<b>时间维度基础价格（永恒点数）：</b> ${Array.range(1, 8).map(tier => format(TimeDimension(tier)._baseCost)).join("、")}
<br>
<b>时间维度基础价格增长：</b> ${Array.range(1, 8).map(tier => format(TimeDimension(tier)._costMultiplier)).join("、")}

<br><br>
每次获得新计数频率提升所需的时间碎片比前一次多 ${formatPercents(0.33)}（若有对应时间研究则为 ${formatPercents(0.25)}）。超过 ${formatInt(FreeTickspeed.softcap)} 次升级后，后续免费升级的倍率会以每 ${formatInt(50000)} 次升级约 ${formatX(1.35, 0, 2)} 倍的速度增长（每次升级 ${formatX(1.000006, 0, 6)} 倍）。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["dims", "td", "shards", "eternity", "midgame"],
      tab: "dimensions/time"
    }, {
      name: "时间研究",
      info: () => `
时间研究是永恒后解锁的强大升级，需要消耗新资源"时间之理"。它能提升游戏中所有已有内容的生产效率，甚至改变某些计算公式的运作方式。

<br><br>
时间之理是有限资源，每次购买价格都会增加。可以用反物质、无限点数或永恒点数购买，永恒时不会重置。购买价格按固定倍数递增。

<br><br>
研究以树状结构排列，必须购买前置研究才能继续。初始只能购买最顶端的研究，之后可以购买其下方任意可负担的研究。但有三种例外情况：
<br>
当研究连线有颜色时，每次只能选择三条路径中的一条
<br>
遇到永恒挑战相关研究时，需要先完成所有关联挑战才能解锁（无需购买该研究）
<br>
在底部汇合处，每组只能选择一项研究

<br><br>
按住Shift点击研究可一键购买到该研究的所有前置（在分叉路径会优先横向购买）。若遇到必须选择的路径或资源不足，可能无法完整购买。

<br><br>
<b>预设方案：</b> 1-6号按钮可保存当前研究配置，点击快速加载/Shift点击保存。预设可重命名但不能重复。

<br><br>
<b>导入配置/编辑预设：</b> 编辑时会显示将要购买的研究及错误提示。分叉路径可用名称缩写（如用"antimatter"代表71,81,91,101）。配置末尾加"!"可自动解锁并进入永恒挑战。

<br><br>
<b>偏好设置：</b> 齿轮图标可设置三叉路径的默认选择，影响Shift点击的购买逻辑。购买特定研究后可为维度分叉设置两条默认路径。

<br><br>
<b>重置：</b> 可免费重置回收所有已花费时间之理，但只能在完成永恒时进行。

<br><br>
<b>时间之理消耗：</b>
<br>
<b>反物质：</b> 初始 ${format(DC.E20000)}，每次 ${formatX(DC.E20000)} 倍
<br>
<b>无限点数：</b> 初始 ${formatInt(1)}，每次 ${formatX(DC.E100)} 倍
<br>
<b>永恒点数：</b> 初始 ${formatInt(1)}，每次 ${formatX(2)} 倍
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternity", "ts", "theorems", "tree", "study", "midgame"],
      tab: "eternity/studies"
    }, {
      name: "永恒挑战",
      info: () => `
永恒挑战是通过时间研究树解锁的另一组挑战。解锁每个永恒挑战需要消耗一定数量的时间之理，并满足特定的解锁条件。

<br><br>
进入永恒挑战后，你的目标将变为达成特定的无限点数目标。完成挑战后，即使未解锁对应的挑战研究，奖励也会立即生效。这些挑战奖励与时间研究类似，但效果通常更强且永久有效，因为不需要持续消耗时间之理来维持效果。

<br><br>
你每次只能解锁一个永恒挑战。

<br><br>
每个永恒挑战最多可以完成5次。每次完成后，奖励效果会增强，但下次完成的目标要求也会提高。此外，再次解锁该挑战的附加条件也会提升（时间之理的消耗不会增加）。

<br><br>
完成永恒挑战的附加条件后，该条件将从研究要求中移除（只需完成<i>一次</i>）。这意味着你可以用一组研究配置解锁挑战，然后重置研究树改用其他配置来完成挑战。但永恒挑战11和永恒挑战12例外 - 即使重置研究树，维度路径的限制仍然有效。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["ec", "study", "time", "rewards", "completions", "midgame"],
      tab: "challenges/eternity"
    }, {
      name: "时间膨胀",
      info: () => `
时间膨胀功能将在购买永恒挑战11和永恒挑战12研究下方的对应时间研究后解锁。购买该研究需要 ${formatInt(5000)} 未使用的时间之理，且研究树路径可抵达该研究，<i>累计</i>获得 ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)} 时间之理，并且必须完成永恒挑战11和永恒挑战12各 ${formatInt(5)} 次。
<br>
<br>
启动时间膨胀将进入特殊的“时间膨胀”状态，其中所有反物质/无限/时间维度的倍率<i>指数</i>以及计数频率倍率的<i>指数</i>都将降低为 ${formatPow(0.75, 2, 2)}，使其效果大幅减弱。如果你能达到 ${formatPostBreak(Number.MAX_VALUE, 2)} 无限点数来完成这次膨胀永恒，你将获得名为“超光速粒子”的新资源。
<br>
<br>
你可以进行任意次数的膨胀，但超光速粒子不能像其他资源那样“刷取”。超光速粒子数量只增不减，其上限取决于你当前的超光速粒子倍增和本次膨胀中获得的反物质总量。因此，除非你获得了新的超光速粒子倍增或能在膨胀中显著提升反物质产量，否则通常无法增加超光速粒子。
<br>
<br>
超光速粒子会生成另一种货币“膨胀时间”。膨胀时间通过达到阈值可转换为超光速粒子星系，其机制类似于从时间维度获得的计数频率提升。这些超光速粒子星系类似于复制器星系，它们像反物质星系一样影响计数频率，但不会增加你下一个反物质星系的价格。
<br>
<br>
解锁时间膨胀还会解锁可用膨胀时间购买的升级。第一行升级中的第1和第3项可以重复购买任意次数（只要你有足够资源），第2项升级也可以重复购买，但最终会达到上限。
`,
      isUnlocked: () => DilationTimeStudyState.studies[1].isBought || PlayerProgress.realityUnlocked(),
      tags: ["dial", "dt", "dilated", "tachyon", "particle", "study", "free", "galaxy", "galaxies", "midgame"],
      tab: "eternity/dilation"
    }, {
      name: "现实",
      info: () => `
      当你达到 ${formatPostBreak(DC.E4000)} 永恒点数并完成前 ${formatInt(13)} 行成就时，你将能够购买解锁“现实”的时间研究。解锁后会开启新标签页，在那里你可以找到开始新现实的按钮。开始新现实将重置目前为止几乎所有游戏进度，但作为回报，你将获得新货币“现实机器”、一个符文和一个复兴点数。

<br><br>
与其他重置不同，这次你还会失去前 ${formatInt(13)} 行成就——即所有现实前的成就及其相关奖励。不过，你仍会保留统计标签页“概况”分类下的所有数据，以及所有最佳挑战时间。

<br><br>
完成第一次现实后，符文标签页会出现一个按钮，让你可以重新开始当前现实，而不会改变即将获得的符文选择。<b>注意：这样做不会获得任何奖励，即使你本可以正常完成现实。</b>

<br><br>
你需要重新满足每个成就的要求才能再次获得奖励，但每 ${timeDisplayNoDecimals(30 * 60000)} 你也会被动解锁下一个未完成的成就，即使你并未满足要求。这个自动完成功能可以关闭，此时计时器会倒数至零并暂停，在取消暂停时立即完成另一个成就。离线时计时器仍会以相同速度推进。

<br><br>
现实机器可以花费于现实标签页的不同升级上，从此成为你的主要货币。符文是可装备的物品，必须装备才能获得加成。复兴点数是另一种货币，可在复兴子标签页用于购买不同复兴节点。

<br><br>
现实机器的数量完全取决于永恒点数，现实按钮会告诉你需要多少永恒点数才能获得下一个现实机器。前 ${formatInt(10)} 个现实机器在 ${formatPostBreak(DC.E4000)} 到 ${formatPostBreak(DC.C10P16000D3)} 永恒点数之间呈指数线性增长，超过后计算公式为：现实机器 = ${formatInt(1000)}<sup>log<sub>${formatInt(10)}</sub>(永恒点数)/${formatInt(4000)}-${formatInt(1)}</sup>。这个公式在超过 ${formatPostBreak(DC.C10P16000D3)} 永恒点数后比线性增长获得更多现实机器。

<br><br>
符文等级取决于永恒点数、复制器和膨胀时间的组合，最低为 ${formatInt(1)} 级。符文的类型、效果和稀有度是随机的。

<br><br>
每次现实获得 ${formatInt(1)} 个复兴点数。

<br><br>
<b>快捷键：Y</b> 可尝试进行现实重置。
      `,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["rm", "machines", "glyph", "perk", "reset", "prestige", "endgame", "lategame"],
      tab: "reality/upgrades"
    }, {
      name: "符文",
      info: () => `
符文是一种可装备物品，包含四个属性：
<br>
<b>类型</b>——根据其强化的游戏内容命名（如"XX符文"），决定可能具有的效果类型。
<br>
<b>等级</b>——影响符文强度，基于获得该符文时在现实中的进度计算。
<br>
<b>稀有度</b>——${formatPercents(0)}到${formatPercents(1)}的百分比值，同样影响符文强度。该值随机生成但可通过升级影响，数值越高品质越好，具体区间有普通/稀有等名称。
<br>
<b>词条</b>——装备后提供的加成，最多包含四个词条。等级或稀有度更高的符文通常具有更多词条。
<br>
<b>注意：首个符文具有固定词条和稀有度，但等级会根据现实内容前的进度计算。符文属性一旦获得就无法更改。</b>
<br>
<br>
装备方式：双击或将符文从库存拖至屏幕中央的激活槽位。装备后符文图标变为圆形，词条显示在右侧列表。
<br>
<br>
多个同类符文词条可以叠加："+"词条数值相加，"×"词条数值相乘。
<br>
<br>
现实过程中可随时装备符文至<i>空</i>槽位立即生效。拖动替换已装备符文会重启当前现实。
<br>
<br>
库存首行为“保护”槽位：新符文不会占用这些位置（即使库存已满），且不受整理/自动清理功能影响。库存满载时新符文将自动销毁（或解锁后转化为献祭）。
<br>
<br>
Shift+点击符文可删除（需确认），Ctrl+Shift+点击可跳过确认。<b>但在解锁符文献祭前，删除仅能释放库存空间。</b>
<br>
<br>
解锁符文献祭后可禁用选择界面。Shift+点击现实按钮可强制显示界面。禁用状态下完成现实将随机选择符文。
<br>
<br>
点击符文组（非弹窗内）可查看详细属性汇总，适合分享。此功能适用于统计页记录、已装备符文和本次现实的待选符文。
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["reality", "sacrifice", "level", "endgame", "lategame"],
      tab: "reality/glyphs"
    }, {
      name: "复兴树",
      info: () => `
复兴是现实解锁后的一种升级类型。每个复兴效果各不相同，但大多数都是你可以自行选择路径的游戏体验(QoL)改进。所有复兴都只需要花费 ${formatInt(1)} 个复兴点数即可购买。

<br><br>
每次现实重置后，你将获得 ${formatInt(1)} 个复兴点数，可用于在复兴树上购买升级，初始选项为“现实时你可以在 ${formatInt(4)} 个不同的符文中选择一个符文”。你只能解锁与你已拥有复兴直接相邻的节点，不过树状图中存在可以双向通过的循环路径。

<br><br>
复兴节点有两种不同形状——圆形和菱形。两者唯一的区别在于菱形节点除了常规效果外还会提供自动点数。不同节点还具有不同颜色，大致表示它们最影响游戏的哪个部分。
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["pp", "reality", "tree", "endgame", "lategame"],
      tab: "reality/perks"
    }, {
      name: "自动机总览",
      info: () => `
自动机将在获得总计 ${formatInt(AutomatorPoints.pointsForAutomator)} 自动机点数后解锁。自动机点数可以通过解锁各种复兴或现实升级、解锁黑洞，或者简单地完成更多现实来获得。
<br>
<br>
自动机使用一种脚本语言，允许你自动化几乎整个游戏。界面有两个面板，左侧是输入自动化命令的脚本面板，右侧是具有多个功能面板的区域，具体功能如自动机介绍页面所述。
<br>
<br>
如果你需要更大的工作空间，可以点击自动机文档面板右上角的按钮将其全屏展开。你也可以水平拖动面板之间的边界来调整面板大小，以便获得更多编写脚本或阅读文档的空间。
<br>
<br>
通过点击脚本面板右上角的按钮，你可以在自动机的积木块模式和文本编辑器模式之间切换；如果你不熟悉编程，积木块模式可能更容易上手。在积木块模式下输入命令时，选择右侧的命令块面板，将相关命令的方框拖到脚本面板中并放置在你想要的位置。如果需要，可以通过拖动积木块来自由重新排列命令。在积木块和文本模式之间切换会尝试自动转换你的脚本，但如果脚本包含错误，可能会丢失部分转换内容。
<br>
<br>
就像整个存档文件一样，单个自动机脚本可以从游戏中导入和导出。格式正确的脚本字符串将以<b>${GameSaveSerializer.startingString["automator script"]}</b>开头，以<b>${GameSaveSerializer.endingString["automator script"]}</b>结尾。如果不是这种情况，那么你的部分脚本在复制粘贴过程中丢失了。导入功能会将脚本加载到一个新槽位；你当前的脚本不会丢失或被覆盖。
<br>
<br>
<b>快捷键：U</b> 将暂停/取消暂停自动机。
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "自动机技术细节",
      info: () => `
<b>技术限制</b>
<br>
<br>
为了减少延迟并防止存档文件过大，脚本有以下限制：
<br>
- 单个脚本最多 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS)} 个字符
- 所有脚本总字符数不超过 ${formatInt(AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS)}
<br>
- 脚本名称不超过 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH)} 个字符
<br>
- 定义的常量名称不超过 ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH)} 个字符
- 常量值不超过 ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH)} 个字符
<br>
- 脚本总数不超过 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_COUNT)} 个
- 定义的常量总数不超过 ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_COUNT)} 个
<br>
<br>
<b>脚本保存</b>
<br>
<br>
编辑时会自动保存脚本，但只有在全局自动保存（即“上次保存时间”）触发完整游戏保存时才会存入存档。关闭游戏前修改脚本后，应等待游戏完成保存以免丢失更改。超出长度限制的脚本编辑将不会被保存，直到缩短至限制范围内。
<br>
<br>
<b>自动机时钟</b>
<br>
<br>
自动机的“执行计时器”基于现实时间，因此不受黑洞、时间符文效果和永恒挑战12负面影响等因素影响。但该计时器完全独立于游戏主循环运行，意味着在高速运行时，自动机每个生产周期可执行多个命令。
<br>
<br>
某些命令对游戏内部代码负担较重，在较慢的电脑上可能需要超过一个自动机时钟周期来处理。此时自动机会先执行该命令，然后尽可能快地“追赶”执行后续命令，直到达到恒定执行速度应有的命令数量。
<br>
<br>
<b>与离线进度的交互</b>
<br>
<br>
离线进度模拟中较长的生产周期意味着所有资源实际上是分大块而非连续获得的。根据脚本对游戏状态的依赖方式，这可能会对离线时的脚本行为产生不利影响。此外，基于现实时间的PAUSE命令也可能出现异常行为。
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "黑洞",
      info: () => `
黑洞是一种周期性加速游戏运行的功能。游戏会以正常速度运行一段时间，随后短暂进入极速运行状态，之后恢复常速并循环往复。  
<br>  
黑洞加速效果远强于计数频率，因为它能<i>完全均等地影响一切</i>：包括仅部分受计数频率影响的内容（如无限/时间维度）、通常完全不受影响的内容（如膨胀时间/时间之理生成）、以及纯时间累积的增益（如挂机路径的无限点数/永恒点数倍率）。  
<br>  
虽然游戏多数功能受此加速影响，但部分机制保持原速。此类情况会特别注明使用<i>现实时间</i>而非<i>游戏时间</i>。例如随时间自动完成永恒挑战的复兴节点。此后若无特别说明，所有时间均指<i>游戏时间</i>。需注意：当涉及需<i>减少</i>耗时的机制（如现实升级“快速复现”）时同样适用此规则。  
<br>  
可使用现实机器购买黑洞升级：  
<br>  
<b>间隔</b> - 黑洞爆发间的休眠时长，每次升级减少 ${formatPercents(0.2)}  
<br>  
<b>强度</b> - 极速爆发期间的加速倍率，每次升级提升 ${formatPercents(0.35)}  
<br>  
<b>持续时间</b> - 每次极速爆发的时长，每次升级增加 ${formatPercents(0.3)}  
<br>  
<br>  
解锁黑洞 ${formatInt(100)} 天<i>游戏时间</i>后，可购买现实升级开启第二黑洞。第二黑洞的计时器仅在第一黑洞激活时推进。例如：若第一黑洞持续 ${formatInt(4)} 分钟且第二黑洞间隔 ${formatInt(8)} 分钟，则无论第一黑洞间隔多短，第二黑洞每两周期激活一次。游戏顶栏计时器会显示第二黑洞实际激活倒计时；黑洞标签页可查看其激活所需的第一黑洞有效时间。  
<br>  
<br>  
当黑洞活跃时间占比 ≥ ${formatPercents(0.9999, 2)} 时，将转为永久激活。两个黑洞独立计算此阈值。  
<br>  
<br>  
离线时黑洞周期正常推进，加速效果完全生效（如同在线）。离线模拟会分段处理休眠/活跃状态，通过调整时间间隔长度减轻活跃期小间隔计数的负面影响；详见“离线进度”条目技术说明。  
<br>  
<br>  
黑洞可暂停（完全停止周期循环）。但取消暂停需 ${BlackHoles.ACCELERATION_TIME} 秒现实时间从静止加速至最高速。加速期间周期按全速推进——暂停虽提供控制力，但会造成加速时间损耗。  
<br>  
<br>  
暂停/取消操作同时影响双黑洞（不可独立控制）。通过在黑洞标签页启用设置，可在激活前 ${BlackHoles.ACCELERATION_TIME} 秒现实时间自动暂停。  
<br>  
<br>  
<b>升级消耗信息：</b>  
<br>  
<b>间隔</b> - 基础 ${formatInt(15)} 现实机器，每次升级消耗倍增 ${formatX(3.5, 0, 1)}  
<br>  
<b>强度</b> - 基础 ${formatInt(20)} 现实机器，每次升级消耗倍增 ${formatX(2)}  
<br>  
<b>持续时间</b> - 基础 ${formatInt(10)} 现实机器，每次升级消耗倍增 ${formatX(4)}  
<br>  
<b>消耗增长：</b> 超过 ${format(1e30)} 现实机器后，每次升级消耗增幅额外 +${format(0.2, 0, 1)}。超过 ${format(Number.MAX_VALUE, 1)} 现实机器后采用新规则：所有升级基础消耗重置为 ${format(DC.E310)}，后续升级消耗依次增加 ${format(1e6)}、${format(1e7)}（每次 ${formatX(10)} 倍增）。  
<br>  
<b>黑洞 2：</b> 所有升级基础消耗为第一黑洞的 ${formatX(1000)} 倍，但倍增系数相同。  
<br>  
<br>  
<b>快捷键：B</b> 暂停/取消暂停黑洞。  
`,
      isUnlocked: () => player.blackHole[0].unlocked,
      tags: ["reality", "time", "speed", "duration", "interval", "rm", "endgame", "lategame"],
      tab: "reality/hole"
    }, {
      name: "天神",
      info: () => `
当你获得全部现实升级后，首位天神即会解锁。此时现实标签页旁将新增天神标签页。天神标签页的首个子页显示名为"天神导航"的地图，该地图随游戏进度动态更新。初次解锁时仅部分地图可见，但当你接近新内容时会逐步显现，通常配有向下个目标推进的视觉进度指示。  
<br>  
每位天神拥有独特机制与升级体系，需击败全部七位天神方可通关游戏。解锁或击败天神的条件因天神机制而异。  
<br>  
所有天神均有专属天神现实，但该现实与天神及游戏其他内容的关联方式取决于具体天神。  
<br>  
天神乃永久存在。除非特别说明，天神引入的新机制均不受游戏速度倍率影响，且特指现实时间（非游戏时间）。
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["reality", "challenges", "endgame", "lategame"],
      tab: "celestials/celestial-navigation"
    }, {
      name: "现实之神特蕾莎",
      alias: "特蕾莎",
      info: () => `
      特蕾莎是首位天神。祂通过成就147解锁，该成就要求获得全部现实升级。  
<br>  
主界面上方进度条配有“进贡现实机器”按钮，可将现实机器注入容器获取倍率加成。注入容器的现实机器不可撤回。当容器内达到 ${format(TeresaUnlocks.run.price)} 现实机器时，你将解锁特蕾莎的现实。  
<br>  
完成特蕾莎的现实时，  
${Teresa.runCompleted  
    ? "你的符文献祭将根据本轮现实中获得的反物质量获得倍数加成"  
    : "<div style='color: var(--color-bad);'>（完成特蕾莎的现实以查看奖励）</div>"}。  
完成特蕾莎的现实仅是开始；你需要继续注入现实机器以推进进度。当容器内达到 ${format(TeresaUnlocks.effarig.price)} 现实机器时，你将解锁下一位天神。  
<br>  
${Teresa.runCompleted  
    ? "完成特蕾莎的现实后，你可以再次进入。若在重复挑战中达到更高的反物质数量，其奖励将变得更强。"  
    : "（更多信息待解锁——完成特蕾莎的现实）"}
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["rm", "endgame", "lategame", "perks", "sacrifice", "boo", "ghost", "celestial"],
      tab: "celestials/teresa"
    }, {
      name: "古代遗迹之神鹿颈长",
      alias: "鹿颈长",
      info: () => `
鹿颈长是你遇到的第二位天神。  
通过向特蕾莎的容器注入至少 ${format(TeresaUnlocks.effarig.price)} 现实机器即可解锁。  
<br>  
鹿颈长引入了一种名为“遗迹碎片”的货币，通过在现实中使用不同类型的符文词条获得。现实期间激活的不同词条数量会极大影响遗迹碎片获取量，永恒点数对其影响较小。遗迹碎片是鹿颈长解锁的货币，从现在起每次现实都会获得。  
<br>  
使用遗迹碎片可购买多项升级（参见“高级符文机制”），这些升级能强化你的符文，并让你在执行全自动现实时根据词条和稀有度筛选符文。  
<br>  
鹿颈长的最终解锁是其专属现实，需要 ${format(GameDatabase.celestials.effarig.unlocks.run.cost)} 遗迹碎片。  
${EffarigUnlock.run.isUnlocked  
    ? "该现实分为三层：无限、永恒和现实。必须完成每一层才能进入下一层。完成鹿颈长的永恒层将解锁下一位天神。"
    : "<div style='color: var(--color-effarig--base);'>(解锁鹿颈长的现实以查看详情)</div>"
}  
<br>  
完成鹿颈长的现实将解锁  
${EffarigUnlock.reality.isUnlocked  
    ? `新符文类型：<span style='color: var(--color-effarig--base);'>鹿颈长符文</span>。这类符文拥有  
      ${formatInt(7)} 种可能词条，可在符文筛选设置中查看。你每次只能装备一个鹿颈长符文。  
${Ra.unlocks.glyphEffectCount.canBeApplied  
    ? `因太阳神内鹿颈长达到10级，其符文词条不再受限。单个鹿颈长符文现在可同时拥有全部 ${formatInt(7)} 种词条。`  
    : `鹿颈长符文最多拥有 ${formatInt(4)} 种词条，且现实机器倍率和符文不稳定性词条不会同时出现。`}`  
    : "<span style='color: var(--color-effarig--base);'>(完成鹿颈长的现实以查看奖励详情)</span>" }  
<br>
`,
      isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
      tags: ["glyph", "sacrifice", "shards", "reality", "spectralflame", "lategame", "endgame", "celestial"],
      tab: "celestials/effarig"
    }, {
      name: "高级符文机制",
      info: () => `
符文等级调整功能可用 ${format(GameDatabase.celestials.effarig.unlocks.adjuster.cost)} 遗迹碎片购买。该功能允许你为每种资源（永恒点数、膨胀时间、复制器、永恒次数）设置权重，这些权重将影响现实后获得符文的等级。
<br>
<br>
自动符文筛选功能可用 ${format(GameDatabase.celestials.effarig.unlocks.glyphFilter.cost)} 遗迹碎片购买。该系统采用多种方法之一为符文选择评分，然后选取分数最高的选项。选定符文后，系统会将该分数与阈值比较，高于阈值则保留，否则献祭。共有三种基础模式：
<br>
<b>最低总献祭值：</b>根据该类型符文的累计献祭值评分，献祭值最低的类型得分最高。此模式无阈值且总会献祭符文。
<br>
<b>词条数量：</b>分数等于符文词条数量，词条数相同时稀有度更高者优先。阈值由文本框输入指定。
<br>
<b>稀有度阈值模式：</b>分数等于符文稀有度百分比。可为每种符文类型单独设置比较阈值。
<br>
<br>
另有两种更灵活的高级模式：
<br>
<b>指定词条模式：</b>基于稀有度评分并对比阈值，但会根据词条选择调整分数。每缺少一个指定词条扣 ${formatInt(200)} 分，确保不符合要求的符文必低于阈值。可通过设置不可能条件（如要求能量符文具有 ${formatInt(6)} 个词条）禁用特定符文<i>类型</i>。
<br>
<b>词条评分模式：</b>分数由稀有度与各词条得分总和构成，可单独设置阈值和词条分值。应用场景包括：
<br>
- 将弱势词条设为 ${formatInt(5)} 分，允许保留不含该词条但稀有度更高的符文
<br>
- 为不需要的词条设置大幅负分，禁止选择含该词条的符文
<br>
- 设置不可能条件（如阈值 ${formatInt(999)} 分且所有词条 ${formatInt(0)} 分）可禁用整类符文
<br>
<br>
符文筛选为全局设置，所有符文类型适用同一模式。每种模式需配置全部符文类型的筛选参数，切换模式时会保留各自配置。
<br>
<br>
解锁符文筛选后，还可在自动机中使用候选符文最高分作为比较值。若筛选器将放弃所有候选符文且现实自动购买器开启，可强制立即进行现实。
<br>
<br>
符文预设功能可用 ${format(GameDatabase.celestials.effarig.unlocks.setSaves.cost)} 遗迹碎片购买，解锁 ${formatInt(7)} 个装备方案存储槽。存储方案不可覆盖必须先删除。加载方案时会尝试装备全部符文，缺失符文会显示警告但仍装备其余符文。加载时可启用等级/稀有度敏感匹配，系统会自动选择最佳可用符文。与其他圆形符文组一样，点击任意符文可查看整套方案摘要。
`,
      isUnlocked: () => EffarigUnlock.adjuster.isUnlocked,
      tags: ["glyph", "weight", "adjustment", "sacrifice", "filter", "threshold", "set", "save", "reality", "lategame",
        "endgame"],
      tab: "celestials/glyphfilter"
    }, {
      name: "时间之神无名氏",
      alias: "无名氏",
      info: () => `
无名氏是第三位天神，完成鹿颈长的永恒层后解锁。  
<br>  
解锁无名氏时，你将立即获得两项与时间相关的新机制：通过充能黑洞存储“游戏时间”，以及通过暂停生产存储“现实时间”。存储的游戏时间还可用于购买无名氏的解锁项。  
<br>  
黑洞充能将游戏速度降至 ${formatInt(1)} 为代价存储游戏时间，实质是将加速效果转化为可存储的时间资源。其主要用途是释放黑洞——消耗存储的游戏时间直接跳过等量时长。与常规加速不同，放电时不受任何游戏速度修正影响（仅存储时受影响）。  
<br>  
存储现实时间会完全停止生产（相当于暂停游戏）。每经过1秒现实时间，按效率系数转化为存储值。可在符文页使用存储的现实时间强化现实——完成时将一次性消耗所有存储时间，重复执行完全相同的现实并累积所有奖励。例如：存储 ${formatInt(50)} 分钟且强化耗时 ${formatInt(10)} 分钟的现实（原奖励 ${format(DC.E30)} 现实机器与 ${format(DC.E12)} 遗迹碎片），将获得 ${format(5e30)} 现实机器、${format(5e12)} 遗迹碎片、${formatInt(5)} 个符文（依筛选设置）及 ${formatInt(5)} 复兴点。  
<br>  
若现实耗时不足 ${formatInt(1)} 秒，则强化倍数受存储秒数限制。例如存储 ${formatInt(1000)} 秒时强化耗时 ${format(0.2, 2, 2)} 秒的现实，将消耗 ${formatInt(200)} 秒模拟 ${formatInt(1000)} 次现实。  
<br>  
可设置将离线时间自动转为存储的现实时间。  
<br>  
首个解锁项需消耗 ${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.FREE_TICKSPEED_SOFTCAP.price).totalYears)} 年存储游戏时间，将时间维度提供的计数频率升级软上限（价格开始激增的临界点）提高 ${format(1e5)} 级。  
<br>  
当存储 ${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.RUN.price).totalYears)} 年游戏时间后，可解锁祂的现实。完成无名氏现实的奖励是  
${Enslaved.isCompleted  
    ? "解锁超立方体（详见游戏帮助条目）"  
    : "<span style='color: var(--color-bad);'>(完成无名氏的现实以查看奖励详情)</span>"}  
<br>  
无名氏不会直接解锁下一位天神。
`,
      isUnlocked: () => EffarigUnlock.eternity.isUnlocked,
      tags: ["reality", "time", "blackhole", "lategame", "endgame", "testers", "celestial",
        ...credits.people.map(p => p.name)
      ],
      tab: "celestials/enslaved"
    }, {
      name: "超立方体",
      info: () => `
超立方体是完成无名氏现实后解锁的新资源。  
<br>  
无限维度通常有 ${format(InfinityDimensions.HARDCAP_PURCHASES)} 次购买上限，这会限制其倍率增长。超立方体可通过消耗无限点数来提升该上限。  
<br>  
超立方体价格呈超指数增长，但每个后续超立方体的效果会显著增强以作补偿。超立方体数量永不重置，意味着购买后无需在未来现实中重复支付相同无限点数即可永久享受上限提升。  
<br>  
你可在无限维度标签页查看当前超立方体数量及下一个价格详情。此外，无限点数显示将新增“距下一个超立方体”的百分比进度。若可购买，无限按钮会变色并在点击时跳转至无限维度标签页。  
`,
      isUnlocked: () => Enslaved.isCompleted,
      tags: ["reality", "lategame", "endgame", "tesseract", "id", "celestial"],
      tab: "celestials/tesseract"
    }, {
      name: "成就之神薇",
      alias: "薇",
      info: () => `
薇是一位特殊天神，其解锁方式并非通过其他天神，而是需要完成成就ID 151（第 ${formatInt(15)} 行第 ${formatInt(1)} 列“你真的 8 需要”），该成就要求你在当前无限中不购买第八反物质维度的前提下获得 ${formatInt(800)} 个反物质星系。
<br>
<br>
解锁子标签页后，还需满足以下条件才能完全解锁薇：
<br>
必须完成 ${formatInt(GameDatabase.celestials.v.mainUnlock.realities.requirement)} 次现实并拥有 ${format(GameDatabase.celestials.v.mainUnlock.realityMachines.requirement)} 未消耗现实机器。此外你需要在同一次现实中达到 ${format(GameDatabase.celestials.v.mainUnlock.eternities.requirement)} 次永恒、${format(GameDatabase.celestials.v.mainUnlock.infinities.requirement)} 次无限、${format(GameDatabase.celestials.v.mainUnlock.dilatedTime.requirement)} 膨胀时间和 ${format(GameDatabase.celestials.v.mainUnlock.replicanti.requirement)} 复制器。
<br>
<br>
满足所有条件后即可进入薇的现实。
${VUnlocks.vAchievementUnlock.isUnlocked
    ? `然而完成现实本身只是开始。薇有六项不同要求，每项都要求你在薇的现实内达成特定进度。完成要求将获得薇成就。薇成就是永久性的，退出薇的现实后仍然保留，且无需同时完成所有成就。
<br>
<br>
完成要求后，薇成就的阈值会提高，如果能够达到新目标可以再次完成。每类薇成就最多可以完成六次。已完成的薇成就具有两种效果：
<br>
- 当达到特定数量的薇成就总数时，会自动解锁薇标签页上的升级而无需消耗任何资源。
<br>
- 每个薇成就还会给予你一个空间之理。
<br>
<br>
通过获得 ${formatInt(2)} 个薇成就解锁的目标降低功能，允许你通过消耗复兴点来使某些薇成就要求更容易完成，最低可降至最简单层级的要求。降低目标的价格不会随着使用而增加，并且也会降低未来层级的要求。
<br>
<br>
空间之理允许你购买通常被禁止的时间研究，比如改进无限点公式后的多路径分支，或者底部成对黑暗/光明研究中的两项。和时间理数一样，每次重置研究时都会全额返还。拥有足够的空间之理后，你最终可以一次性购买所有时间研究！
<br>
<br>
达到 ${formatInt(36)} 个薇成就（即完成所有薇成就）将解锁下一位天神。`
    : "<span style='color: var(--color-bad);'>(解锁薇的现实以查看详情)</span>"}
`,
      isUnlocked: () => Achievement(151).isUnlocked,
      tags: ["reality", "lategame", "endgame", "girlfriend", "challenges", "achievement", "space", "theorems",
        "study", "triad", "celestial"],
      tab: "celestials/v"
    }, {
      name: "遗忘之神太阳神",
      alias: "太阳神",
      info: () => `
太阳神是第五位天神，通过完全完成薇的全部成就解锁。太阳神利用记忆以更强大的方式重现前几位天神的正面效果。随时间推移，你将在太阳神内部逐步解锁前四位天神，每位天神都提供与其原始主题相关的额外升级。
<br>
<br>
太阳神内部的每位前天神通过消耗记忆来提升等级，记忆由记忆碎片随时间被动生成。记忆碎片只能通过进入太阳神的现实获得，而在该现实中，碎片会根据特定资源总量被动生成。如果你正在存储现实时间，则不会在太阳神现实中获得任何碎片，但记忆仍会正常生成。所有天神等级总和达到 ${formatInt(Ra.remembrance.requiredLevels)} 级可解锁“追忆”，允许你选择一位特定天神，使其在太阳神现实内获得更多碎片。
<br>
<br>
记忆可用于三方面：提升记忆碎片获取量、提升记忆获取量以及提升天神等级。开始时太阳神仅解锁特蕾莎，后续每位天神需要前一位达到 ${formatInt(8)} 级才可解锁。等级上限为 ${formatInt(25)} 级。
<br>
<br>
特蕾莎解锁为无限升级充能的能力，使其大幅增强。同时，当符文献祭值达到特定阈值后，特蕾莎还会提升你的符文效果。
<br>
<br>
达到 ${formatInt(2)} 级时，鹿颈长解锁
${Ra.unlocks.effarigUnlock.canBeApplied
    ? "名为符文炼金的新机制，后续还会使鹿颈长符文变得更强，并逐步移除符文生成中几乎所有的随机因素。符文炼金亦有独立的游戏帮助条目。"
    : "<span style='color: var(--color-bad);'>(在太阳神中解锁鹿颈长以查看详情)</span>"}
<br>
<br>
无名氏解锁
${Ra.unlocks.enslavedUnlock.canBeApplied
    ? "与黑洞充能相关的额外机制，并使其显著增强。"
    : "<span style='color: var(--color-bad);'>(在太阳神中解锁无名氏以查看详情)</span>"}
<br>
<br>
薇解锁
${Ra.unlocks.vUnlock.canBeApplied
    ? "三体研究，即时间研究树底部附近的新研究，需消耗空间之理。每个三体研究还要求你同时拥有其邻近的三个研究才能购买。此外，三体研究还会解锁一组更少但更难的薇成就，完成后可获得额外的空间之理。"
    : "<span style='color: var(--color-bad);'>(在太阳神中解锁薇以查看详情)</span>"}
<br>
<br>
太阳神不会直接解锁下一位天神。
`,
      isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
      tags: ["reality", "memories", "razenpok", "levels", "glyphs", "lategame", "endgame",
        "effarig", "teresa", "nameless", "v", "celestial"],
      tab: "celestials/ra"
    }, {
      name: "符文炼金资源",
      info: () => `
符文炼金是在太阳神中将鹿颈长升至 ${formatInt(2)} 级后解锁的机制。它允许你将符文精炼为与其类型对应的炼金资源来消耗符文。你可以在符文标签页中将献祭类型设置为“始终献祭”以外的选项，并按正常献祭流程操作来进行精炼。  
每种炼金资源都有独特效果，可在炼金标签页查看。  
<br>  
除了所有其他属性外，符文现在还具有<i>精炼值</i>，该值决定其转化为对应炼金资源的价值量。精炼值基于符文等级的立方计算，并经过标定使 ${formatInt(10000)} 级符文对应 ${formatInt(10000)} 点炼金资源。但每个符文实际只能提供该数值的 ${formatPercents(GlyphSacrificeHandler.glyphRefinementEfficiency)} 进行精炼。以上数值针对稀有度为 ${formatPercents(1)} 的符文；低稀有度符文的精炼值上限相同，但提供的资源等比减少。例如稀有度 ${formatPercents(0.5)} 的符文仅能提供一半资源。  
<br>  
炼金资源不能无限获得；每种资源均有上限，该上限取决于你精炼过的同类型符文中最高的精炼值。例如，若你精炼过的最高等级时间符文为 ${formatInt(8000)} 级（精炼值：${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))}），那么在该项资源上，你最多只能持有 ${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))} 点，直到精炼出更高精炼值的时间符文为止。
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      // Oh god I'm so sorry this is so many words
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "符文炼金反应",
      info: () => `
炼金资源可以按特定配方组合，生成新的复合资源。复合资源在鹿颈长的特定等级解锁。资源组合每轮现实发生一次，不受现实时间扩增影响。反应产率随试剂数量的增加而提高，因此试剂越多反应越快。复合资源的上限等于其所有试剂中最低的上限。要使反应发生，所有试剂的当前数量必须大于产物的当前数量。  
<br>  
反应速度与可用于反应的试剂数量成正比，但只有超过产物数量的那部分试剂才会计入。例如，若所有试剂均为 ${formatInt(10000)}，产物为 ${formatInt(7500)}，则只有 ${formatInt(2500)} 的试剂用于计算反应速度。若产物为 ${formatInt(0)}，则<i>全部</i>试剂均可参与反应，反应速度将加快 ${formatX(4)}。反之，若产物为 ${formatInt(10000)}，则无试剂可用，反应完全停止。  
<br>  
要激活或停用某个反应，请点击该反应产物对应的圆圈。当反应可以进行时，从所有试剂指向产物的连接线会呈动态移动状态。若连接线为实线，则表示因该试剂数量不足（受限于其上限）而无法继续增加产物。
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "虚幻机器",
      info: () => `
当你能够在单次现实中获得至少 ${format(MachineHandler.baseRMCap)} 现实机器时，便可以获取名为“虚幻机器”的新资源。现实机器也将被硬上限锁定在 ${format(MachineHandler.baseRMCap)}；你将无法获得超过此上限的现实机器。  
<br>  
此外，你还将解锁“虚幻升级”标签页，其中包含一组类似于现实升级的升级项目——每项升级都有必须满足的解锁条件，以及实际购买所需的虚幻机器消耗。前两行升级可重复购买，其余三行为一次性升级。  
<br>  
你的虚幻机器数量受两个因素影响：  
<br>  
<b>虚幻机器上限</b> — 你所能拥有的虚幻机器最大数量，取决于若无上限时你本可获得的最高现实机器数量。该值会持续更新，一旦你超过之前无上限时的最高现实机器量，上限便会立即提升。  
<br>  
<b>当前虚幻机器</b> — 随时间推移，你的当前虚幻机器会被动向上限增长，且越接近上限增速越慢（呈指数级减缓）。默认情况下，虚幻机器的增长速度为：你<i>缺少</i>的部分（即上限减当前值）每减少一半。此增速不受任何游戏速度的影响。  
<br>  
虚幻升级将解锁最后两位天神。
`,
      isUnlocked: () => MachineHandler.isIMUnlocked,
      tags: ["imaginary", "machines", "reality", "lategame", "endgame"],
      tab: "reality/imag_upgrades"
    }, {
      name: "维度之神莱特拉",
      alias: "莱特拉",
      info: () => `
      莱特拉是第六位天神，通过购买对应的虚幻升级（消耗 ${format(ImaginaryUpgrade(15).cost)} 虚幻机器）解锁。
<br>
<br>
莱特拉引入了一种名为“暗物质”的新货币，其效果根据你曾拥有的最高暗物质数量为连续统提供倍数加成。暗物质由暗物质维度以类似于游戏中其他维度的方式产生。与其他维度不同，暗物质维度只有四个而非八个。你一开始即可解锁第一个暗物质维度，更高的维度通过虚幻升级解锁。解锁维度时你会获得 ${formatInt(1)} 个该维度，且在没有更高层级维度生产的情况下无法获得更多数量。
<br>
<br>
每个暗物质维度经过一定时间间隔后会产生两种东西：暗物质或上一级暗物质维度，以及另一种名为“暗能量”的资源。暗物质和暗物质维度的单次间隔产量等于暗物质倍数与当前维度数量的乘积，而暗能量产量与维度数量无关。暗能量用于产生奇点，相关机制有独立的游戏帮助条目。
<br>
<br>
暗物质维度的时间间隔可升级，最低可降至 ${formatInt(10)} 毫秒，此后无法继续缩减间隔。达到该极限后，你可以选择“飞升”该暗物质维度，每次飞升会使暗物质获取量初始提升 ${formatInt(POWER_DM_PER_ASCENSION)} 倍，暗能量获取量初始提升 ${formatInt(POWER_DE_PER_ASCENSION)} 倍。飞升后时间间隔会乘以 ${formatInt(1200)}，但可以再次进行升级。当间隔再次达到 ${formatInt(10)} 毫秒时，你即可再次选择飞升。
<br>
<br>
一项虚幻升级允许你解锁名为“湮灭”的重置机制。湮灭会重置暗物质和暗物质维度，但会为暗物质增加一个永久性倍数加成，该加成适用于所有暗物质维度。你可以多次进行湮灭，每次叠加的倍数为加法累加，无需每次都追求更高的加成增量。进行湮灭需要至少拥有 ${format(Laitela.annihilationDMRequirement)} 暗物质。
<br>
<br>
莱特拉拥有一个专属现实，会根据你在其中的表现给予暗物质维度暗物质力量的倍数加成。若你在 ${formatInt(30)} 秒内完成该现实，则在后续挑战中你当前最高等级的维度将被永久禁用。若连续八次在 ${formatInt(30)} 秒内完成现实使所有维度被禁用，你还会获得暗能量获取量 ${formatX(8)} 的倍数加成。
<br>
<br>
莱特拉不会直接解锁下一位天神。
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["omsi", "reality", "dark", "matter", "dimensions", "lategame", "endgame", "ascend", "celestial"],
      tab: "celestials/laitela"
    }, {
      name: "连续统",
      info: () => `
当你解锁莱特拉后，反物质维度和计数频率升级将切换至一种名为“连续统”的新生产模式。该模式效果与先前相同，但允许购买小数个维度或计数频率升级。这些部分购买是免费的，无需消耗反物质，并会提供相应比例的倍数加成。
<br>
<br>
反物质维度和计数频率升级的购买按钮会有所变化，显示为连续统未激活时你可购买的升级数量，且购买数量会随反物质数量平滑缩放。例如，拥有 ${format(2e7)} 反物质时，计数频率的连续统值为 ${format(5.3, 0, 1)}（初始价格 ${format(1e3)}，增幅 ${formatX(10)}），因为你可以购买 ${formatInt(5)} 次，并大致处于下一次购买的 ${formatPercents(0.3)} 进度。此时计数频率连续统将提供相当于（升级倍数）<sup>${format(5.3, 0, 1)}</sup> 的生产加成。
<br>
<br>
部分升级会直接乘以连续统值，从而在不影响价格缩放的情况下提供生产加成。但若在自动购买器页面中禁用连续统，则这些升级将失效，可能导致产量损失。连续统会使反物质维度和计数频率的自动购买器变得多余，因此在连续统激活期间，这些自动购买器的相关设置将在该标签页中被隐藏。
`,
      // Apparently continuumUnlocked is really important in a lot of places and if we keep it unlocked
      // Things break, so we check for the iMU instead.
      isUnlocked: () => ImaginaryUpgrade(15).isBought,
      tags: ["continuum", "purchase", "reality", "lategame", "endgame"],
      tab: ""
    }, {
      name: "奇点",
      info: () => `
奇点是在莱特拉中通过特定功能获得的新资源。
<br>
<br>
要获得奇点，你需要达到 ${format(200)} 暗能量。达到后，你可以选择将所有暗能量凝聚成一个奇点，暗能量数量将重置为零。超过该数量的多余暗能量不会保留，因此会被浪费。注意，只有暗能量会被重置，暗物质及暗物质维度的状态在凝聚奇点时保持不变。
<br>
<br>
一旦你达到 ${formatInt(10)} 个奇点，即可自由将凝聚奇点所需的暗能量需求增加或减少 ${formatInt(10)} 倍（最低为 ${format(200)}）。这会使从上限重置时获得的奇点数量变化<i>超过</i> ${formatInt(10)} 倍，因此若你愿意等待，更高上限将更具价值。
<br>
<br>
奇点的用途是解锁奇点里程碑，其机制类似于永恒里程碑。这些里程碑仅需达到指定的奇点总数即可解锁，奇点不会被消耗。里程碑分为三种类型：一次性里程碑、可重复有限次数的里程碑以及可无限次重复的里程碑。
<br>
<br>
独立于里程碑类型，里程碑还会附带图标，用以指示其通常提供的升级类型：
<br>
<b>ᛝ</b> 这些里程碑有助于莱特拉专属机制
<br>
<i class="fas fa-arrows-alt"></i> 这些里程碑使莱特拉中的某项资源影响游戏其他部分
<br>
<i class="fas fa-compress-arrows-alt"></i> 这些里程碑基于莱特拉以外的因素来强化莱特拉
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["reality", "lategame", "endgame", "laitela", "dark"],
      tab: ""
    }, {
      name: "反物质之神佩勒",
      alias: "佩勒",
      info: () => `
当你购买最后一项虚幻升级并解锁佩勒后，你将解锁其标签页，其中包含一个“毁灭你的现实”按钮。要毁灭现实，你必须已完成先前的全部 ${formatInt(17)} 行成就，并拥有每种炼金资源 ${formatInt(25000)} 点。
<br>
<br>
${Pelle.isDoomed
    ? `毁灭现实将开启一个新的<b>毁灭现实</b>，重置现实之前几乎所有游戏进度，且不会因当前现实的进度获得任何奖励。
      <br>
      <br>
      进入毁灭现实后，你将保留统计标签页中“常规”和“现实”标题下的所有数值，以及所有最佳挑战时间。在毁灭现实中，多项升级、时间研究、挑战和天神奖励、复兴以及其他游戏机制会被禁用或不再提供奖励。你可在佩勒标签页中点击“显示被毁灭的现实中的效果”按钮以获取更多信息。
      <br>
      <br>
      遗物是末日重置中获得的新货币。遗物获取量基于你在所有毁灭现实中的最佳反物质、无限点和永恒点。遗物可产生现实碎片，用于购买佩勒升级。
      <br>
      <br>
      佩勒升级可分为两类。第一行的五项升级可重复购买，但最终会达到上限。它们为游戏的不同方面提供加成，使毁灭现实中的进程更加容易。
      <br>
      <br>
      底部几行的其他升级提供自动化和便利性改进。从这些升级中解锁的所有内容无法通过游戏中的常规方法解锁；例如，普通挑战完成时不会解锁自动购买器，因为它们被佩勒升级替代。你可以切换按钮隐藏已购买的升级，或点击 <i class="fas fa-compress-arrows-alt"></i> 图标折叠隐藏整个面板。
      <br>
      <br>
      <b>快捷键：Z</b> 将尝试执行末日重置。`
    : "<span style='color: var(--color-bad);'><b>你必须毁灭现实才能阅读本条目剩余部分。</b></span>"}
`,
      isUnlocked: () => Pelle.isUnlocked,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "hevipelle", "celestial", "doom"],
      tab: "celestials/pelle"
    }, {
      name: "佩勒冲击",
      info: () => `
      佩勒冲击会在毁灭现实中的不同事件中遇到。你在毁灭现实中首次达到无限时，即会遇到第一次佩勒冲击。随着进一步推进，更多冲击将陆续发生。每次佩勒冲击都会对游戏的特定方面施加一项削弱，点击冲击名称可查看详情。每次佩勒冲击还会解锁一道裂痕条。
<br>
<br>
裂痕条可通过点击在“闲置”和“填充”之间切换，但同一时间最多只能有两道裂痕处于“填充”状态。激活时，裂痕每秒消耗 ${formatInt(3)}% 的特定资源。每道裂痕提供其专属效果，效果强度基于已填充的总量。
${PelleStrikes.eternity.hasStrike
    ? `唯一例外是枯朽/腐败/凋零，其效果在你消耗总计 ${formatPostBreak(DC.E2000)} 复制器后达到上限。`
    : ""}
此外，每道裂痕在填充至特定百分比时，还会提供三个里程碑奖励。
`,
      isUnlocked: () => PelleStrikes.infinity.hasStrike,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "pelle", "strike", "rift", "celestial"],
      tab: "celestials/pelle"
    }, {
      name: "星系生成器",
      info: () => `
      当你达到 ${formatInt(100)}% 轮回/分裂/终结进度时，将解锁<b>星系生成器</b>，它可以被动生成星系。生成星系与复制器星系和超光速粒子星系类似，它们会像反物质星系一样影响计数频率，但不会增加下一个反物质星系的价格。同时，你还会解锁五项新升级。第一项升级增加星系的基础生成数量，其余四项升级则为该基础数量提供倍数加成。前两项升级可通过消耗反物质和生成星系购买。复制器星系和超光速粒子星系不能用于购买这些升级。
<br>
<br>
<b>星系生成器</b>存在一个可生成星系的上限，达到当前上限后，只能通过消耗裂痕来提升该上限。
`,
      isUnlocked: () => Pelle.hasGalaxyGenerator,
      tags: ["reality", "antimatter", "lategame", "final", "pelle", "galaxy",
        "galaxies", "generator", "celestial"],
      tab: "celestials/pelle"
    }, {
      name: "终局",
      info: () => `
      当你在被毁灭的现实中达到 ${format(DC.E9E15)} 反物质后，将能够进行一次 <b>终局</b>。
      这将重置除统计标签页中“常规”下的所有内容、前 ${formatInt(19)} 行成就，以及挑战时间之外的所有内容。进行终局将给予 1 终局次数，用于达到终局里程碑，为游戏提供各种增益。
      <br>
      <br>
      进行一次 <b>终局</b> 后，你将获得两种不同的资源：天界点数和毁灭粒子。
      天界点数用于购买天界维度，毁灭粒子用于削弱被毁灭的现实中的减益并重获被佩勒剥夺的能力。你最终将能够突破 ${format(DC.E9E15)} 反物质，但目前似乎不太行。
`,
      isUnlocked: () => PlayerProgress.endgameUnlocked(),
      tags: ["endgame", "cp", "celp", "dp", "points", "particles", "end", "reset", "prestige", "enter",
        "simulation", "supersonic", "seven"],
      tab: "endgame/endgame"
    }
  ]
};

(function() {
  for (let i = 0; i < h2p.tabs.length; i++) {
    const tab = h2p.tabs[i];
    tab.id = i;
    if (tab.alias === undefined) tab.alias = tab.name;

    tab.searchTermsRelevance = {};
  }

  const searchIndex = {};

  const addTerm = (term, tab) => {
    let entry = searchIndex[term];
    if (entry === undefined) {
      entry = [];
      searchIndex[term] = entry;
    }
    if (entry.includes(tab)) return;
    entry.push(tab);
  };

  const addWord = (word, tab) => {
    const lowerCase = word.toLowerCase();
    for (let i = 0; i < lowerCase.length; i++) {
      const term = lowerCase.slice(0, i + 1);
      addTerm(term, tab);
      if (tab.searchTermsRelevance[term] === undefined) {
        tab.searchTermsRelevance[term] = ((i + 1) / lowerCase.length) ** 0.65;
      } else {
        tab.searchTermsRelevance[term] = Math.max(tab.searchTermsRelevance[term], ((i + 1) / lowerCase.length) ** 0.65);
      }
    }
  };

  const addPhrase = (phrase, tab) => {
    addWord(phrase, tab);
    for (const part of phrase.split(" ")) {
      addWord(part, tab);
    }
  };

  for (const tab of h2p.tabs) {
    addPhrase(tab.name, tab);
  }
  for (const tab of h2p.tabs) {
    for (const tag of tab.tags) {
      addPhrase(tag, tab);
    }
  }
  for (const tab of h2p.tabs) {
    addPhrase(tab.alias, tab);
  }

  const map2dToObject = function(arr, keyFun, valueFun) {
    const out = {};
    for (let idx1 = 0; idx1 < arr.length; idx1++) {
      for (let idx2 = 0; idx2 < arr[idx1].length; idx2++) {
        out[keyFun(arr[idx1][idx2], idx1, idx2)] = valueFun(arr[idx1][idx2], idx1, idx2);
      }
    }
    return out;
  };

  // Very suboptimal code coming up. If anybody has a better solution, PLEASE, implement it.
  const keyboardify = keybrd => map2dToObject(keybrd.split(",").map(str => str.split("")),
    key => key, (_key, x, y) => ({ x, y }));

  const qwerty = keyboardify(`1234567890,qwertyuiop,asdfghjkl,zxcvbnm`);
  const qwertz = keyboardify(`1234567890,qwertzuiop,asdfghjkl,yxcvbnm`);
  const azerty = keyboardify(`1234567890,azertyuiop,qsdfghjklm,wxcvbn`);
  const dvorak = keyboardify(`1234567890,'<>pyfgcrl,aoeuidhtns,;qjkxbmwvz`);
  const colemak = keyboardify(`1234567890,qwfpgjluy,arstdhneio,zxcvbkm`);
  const workman = keyboardify(`1234567890,qdrwbjfup,ashtgyneoi,zxmcvkl`);
  const qwprf = keyboardify(`1234567890,qwprfyukl,asdtghnioe,zxcvbjm`);

  const keyboards = [qwerty, qwertz, azerty, dvorak, colemak, workman, qwprf];

  const keyboardDist = function(a, b, keyboard) {
    const aPos = keyboard[a], bPos = keyboard[b];
    if (!aPos || !bPos) return 100;
    return Math.max(Math.abs(aPos.x - bPos.x), Math.abs(aPos.y - bPos.y));
  };

  // I copied this code based on OSA distance off wikipedia, with a few added changes.
  // The cost for "substitution" (third item of the first Math.min) is replaced from a static value
  // to a function which roughly estimates how likely the user is to mispress the key based on its
  // minimum distance from several common keyboard layouts.
  // I have no idea how the actual "distance" calculation works but as long as it does don't touch it.
  const howBadlyTypoedWithKeyboard = function(a, b, keyboard) {
    // If they're the same, skip all calculations
    if (a === b) return 0;
    const aLen = a.length;
    const bLen = b.length;
    // If they're way too different, don't bother
    if (Math.abs(aLen - bLen) > 3) return 100;
    // 2d Array with dimensions aLen + 1 x bLen + 1
    const d = new Array(aLen + 1).fill(0).map(() => new Array(bLen + 1).fill(0));

    for (let i = 0; i <= aLen; i++) {
      d[i][0] = i;
    }
    for (let i = 0; i <= bLen; i++) {
      d[0][i] = i;
    }

    for (let i = 1; i <= aLen; i++) {
      for (let j = 1; j <= bLen; j++) {
        const distance = keyboardDist(a[i - 1], b[j - 1], keyboard);
        const cost = distance === 0 ? 0 : 0.3 + distance * distance * 0.25;
        d[i][j] = Math.min(
          d[i - 1][j] + 0.55,
          d[i][j - 1] + 0.7,
          d[i - 1][j - 1] + cost
        );
      }
    }
    return d[aLen][bLen];
  };

  const howBadlyTypoed = function(a, b) {
    // Arbitrarily large number
    let minTypoed = 1e10;
    for (const keyboard of keyboards) {
      minTypoed = Math.min(minTypoed, howBadlyTypoedWithKeyboard(a, b, keyboard));
    }
    return minTypoed;
  };

  const specialChars = ["'", "\"", ",", "-", ".", "_"];

  const replaceSpecialChars = function(str) {
    let result = str;
    for (const i of specialChars) {
      result = result.replaceAll(i, "");
    }
    return result;
  };

  // There are a LOT of magic numbers in this code, mostly from arbitrary choices for "What number is large enough to
  // act as a placeholder for 'basically not found'?"
  // This will need some cleanup if possible.
  h2p.search = query => {
    const truncatedQuery = replaceSpecialChars(query);
    if (truncatedQuery === "") return h2p.tabs.map(x => ({ tab: x, relevance: 1.5 }));
    const searchTerms = truncatedQuery.toLowerCase().split(" ").filter(str => str !== "");

    // A higher "Relevance" value actually means it's further away from the search, important to keep in mind
    const relevances = Array.repeat(1e4, h2p.tabs.length);
    for (const searchWord of searchTerms) {
      const minimumRequirement = Math.min(searchWord.length - 0.9, 3) * 0.5;
      for (const searchIndexStr in searchIndex) {
        const typoThreshold = howBadlyTypoed(replaceSpecialChars(searchIndexStr), searchWord);
        if (typoThreshold < minimumRequirement) {
          for (const tab of searchIndex[searchIndexStr]) {
            const maxRelevance = tab.searchTermsRelevance[searchIndexStr];
            const decrease = Math.max(maxRelevance * 1.6 - 0.9, 0);
            relevances[tab.id] = Math.min(relevances[tab.id], Math.max(typoThreshold, 1 - maxRelevance) - decrease);
          }
        }
      }
    }
    const results = h2p.tabs.filter(x => relevances[x.id] < 0.9)
      .map(x => ({ tab: x, relevance: relevances[x.id] }));
    // Provide both the relevance and the tab itself

    // Sort by id first, then push more relevant results to top.
    results.sort((a, b) => a.tab.id - b.tab.id).sort((a, b) => a.relevance - b.relevance);
    // Provide both the relevance and the tab itself
    return results;
  };
}());
