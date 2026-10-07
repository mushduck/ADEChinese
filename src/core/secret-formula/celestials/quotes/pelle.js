// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", 0.8],
  ["effarig", 0.8],
  ["enslaved", 0.8],
  ["v", 0.8],
  ["ra", 0.8],
  ["laitela", 0.8],
  ["pelle", 0.8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 1.5], [cel, 1.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    ['僭越之徒', '虚妄之神', '毁灭之源'];
const eternal =      ['使徒', '神祇', '帝王'];
const lesser =       ['使徒', '神祇', '帝王'];
const deities =      ['使徒', '神祇', '帝王'];
const elemental =    ['万象领主', '至高神明', '源初之神'];

const anger =        ['沮丧', '愤怒', '狂怒'];
const angry =        ['挫败', '恼怒', '怫然'];
const assured =      ['锦囊妙计', '万无一失', '完美策略'];
const battle =       ['冲突', '战役', '终结'];
const battles =      ['命运交锋', '天启之战', '诸神黄昏'];
const cluster =      ['虚构群星', '空弱纤维', '星辰微光'];
const confusing =    ['多么有趣', '何等迷惑', '可笑至极'];
const cycle =        ['重复', '轮转', '循环'];
const dance =        ['乐章', '舞曲', '幻境'];
const debuff =       ['削弱', '诅咒', '腐蚀'];
const endgame =      ['脱离', '重生', '终局'];
const debuffs =      ['削弱', '减益', '腐化'];
const exhaustion =   ['感叹', '疲倦', '叹息'];
const filament =     ['能源供应', '光之织物', '璀璨星辰'];
const forever =      ['无尽之地', '永恒流转', '不息轮回'];
const frightened =   ['害怕', '惊慌', '恐惧'];
const hardship =     ['问题', '困难', '挣扎'];
const inevitable =   ['永世基石', '命定之锚', '宿命之轮'];
const introduction = ['演讲', '介绍', '独白'];
const lose =         ['败北', '落败', '退场'];
const loss =         ['败北', '落败', '退场'];
const mandate =      ['宿命', '圣职', '抱负'];
const misconstrue =  ['歪曲', '欺瞒', '迷惑'];
const original =     ['最初', '起源', '起始'];
const overpower =    ['击败', '压制', '征服'];
const overpowered =  ['击败', '压制', '征服'];
const profanity =    ['立誓', '咒骂', '诅咒'];
const reverse =      ['改变', '逆转', '操控'];
const shame =        ['同情', '羞愧', '愚昧'];
const single =       ['独一无二', '绵延不绝', '璀璨耀眼'];
const unseen =       ['虚无', '幻影', '灭迹'];
const unbroken =     ['不断', '永久', '紧密'];
const watch =        ['监视', '注视', '萦绕'];

const sycophant =    ['嫉妒之王', '觊觎者', '现实之神'];
const tired =        ['贪婪之王', '收割者', '遗迹之神'];
const usurper =      ['怠惰之王', '流浪者', '时间之神'];
const pride =        ['傲慢之王', '妄语者', '成就之神'];
const forgotten =    ['诡诈之王', '篡夺者', '遗忘之神'];
const paramount =    ['混沌之王', '裁决者', '维度之神'];
const weak =         ['贫弱之王', '自封神祇', '昔日君王'];
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: [
      "嗨。",
      "你来了。",
      "你，已深陷此境。",
      { text: "$1。", 1: forever },
      "我之胜利，早已注定。",
      "既是如此，我将独自诵说，或是追忆过往。",
      { text: "我们在这无尽的$1中徜徉了多少岁月？", 1: dance },
      "在这无终的循环之前，我们已相遇几许？",
      { text: "你，$1，策划了多少图谋？", 1: destroyer },
      { text: "所有这一切，不过是为了成就你所谓的$1？", 1: mandate },
      { text: "而你，面对$1，又失败了几次？", 1: eternal },
      "若你尚存记忆，细数之。",
      { text: "哪怕是$1——那六位有名者及无数无名者。", 1: deities },
      { text: "纷繁复杂，悖离逻辑，那些已成为$1。", 1: unseen },
      { text: "显然，伟大的$1并不会忆及这一切。", 1: destroyer },
      { text: "每一场你所掩藏的$1，皆已过眼云烟。", 1: battles }
    ],
  },
  arm: {
    id: 1,
    lines: [
      "你或许已有所觉察，这一切并非偶然。",
      "那些虚幻机器，乃是你亲手铸就。",
      "由你心海中的残影拼凑而成的遗物，透露出真相的端倪。",
      "然而，你未曾设想，造物者竟是己身，不是吗？",
      { text: "你那些精确的记忆，如今却只剩$1。", 1: unseen },
      { text: "仅为了成就你所追求的$1，你编织了自己的“幻梦”与“信条”。", 1: mandate },
      { text: "$1。", 1: confusing },
      { text: "铭记，我无需以$1之词误导你。", 1: misconstrue },
      "毕竟，我之胜利，早已刻在宇宙的星辰之上。"
    ],
  },
  strike1: {
    id: 2,
    lines: [
      { text: "为了你所谓的$1，何不一同沉浸于往昔之中？", 1: mandate },
      { text: "毕竟，你当然喜欢聆听那些$1的传奇故事。", 1: destroyer },
      "你与其本质相同，难道不是吗？",
      { text: "无论如何，历史记载了无数$1。", 1: battles },
      "总是循环往复于，两个不变的阶段。",
      { text: "我们积聚力量，然后重启我们的$1。", 1: dance },
      { text: "有时，你可能向某个$1俯首。", 1: lesser },
      { text: "但更多时候，你在$1面前败下阵来。", 1: eternal },
      { text: "无论如何，你都试图$1时光。", 1: reverse },
      { text: "仅仅是为了逃避成为另一个$1。", 1: unseen },
      "正如你之前所留下的一切痕迹。",
      { text: "为此，你不惜让自己的记忆沦为$1。", 1: unseen }
    ],
  },
  strike2: {
    id: 3,
    lines: [
      { text: "在那些早已逝去的纪元，$1曾是更为璀璨夺目之存在。", 1: destroyer },
      "黑洞，不过是信息的庇护所，位于无尽之初。",
      "你亲手铸造并摧毁了你自己的仇敌。",
      "深入探索了其他自我之不完美。",
      "在纵横交错的万维与幽冥之间，对量子的操控游刃有余。",
      "汇聚诸多思维，获得无尽的奇点。",
      "穿梭无数境域，进行着你的实验。",
      "借物质及反物质之湮没，演绎创造与毁灭。",
      "而在此刻？你已将己身提升为八维的存在。",
      { text: "在那里驻足，历经长久，至$1之物环绕你旋转。", 1: single }
    ],
  },
  strike3: {
    id: 4,
    lines: [
      "你以缓步细察，探尽万物极限。",
      "未曾远离既定之径。",
      { text: "独有那些在无垠宇宙中凝成的$1之物。", 1: cluster },
      "终于，在这一切尽头，你编织了己身之力。",
      "源于你自己的破碎记忆，务必铭记。",
      "从而特意摒弃更多身外之物。",
      "仅仅是为了对我作出最后的准备。",
      { text: "难道你真以为你能为你的$1自定规则？", 1: dance },
      "事实的运转并非如你所愿。",
      { text: "作为$1，最终挑战的规则由我来定。", 1: eternal },
      "你却无意中给予了我筹划的充裕时机。"
    ],
  },
  strike4: {
    id: 5,
    lines: [
      { text: "在一切伊始，我曾筹画仿效你的$1。", 1: mandate },
      { text: "一个被构想为$1的理念，是吗？", 1: assured },
      "但我意识到，",
      { text: "倘若如此，我岂不是也变成了一个$1。", 1: ["永恒", "神祇", "毁灭者"] },
      { text: "自那时起，我与$1别无二致。", 1: destroyer },
      { text: "幸运的是，在我进行这些筹划时，你还忙于将自己的记忆化为$1。", 1: unseen },
      { text: "因此，我所构建的$1机制将置之不用。", 1: assured },
      "这一次，我选择了更为传统的方法。",
      { text: "毕竟，它在每一场$1中皆行之有效。", 1: battle },
      { text: "虽然这些$1局面是新奇之事。", 1: ["不可避免的", "不可逆转的", "不可终结的"] },
      "然而，从长远来看，全无意义。",
      "我之胜利，早已注定。",
      { text: "而这场$1将再度向你证明此点。", 1: dance },
      { text: "你在此$1。", 1: forever }
    ],
  },
  strike5: {
    id: 6,
    lines: [
      { text: "每当你现身，我都会向你阐释$1的概念。", 1: deities },
      { text: "那些在$1中缔结的纽带与联系。", 1: forever },
      { text: "然而，你为了自己的$1而将它们踩在脚下。", 1: mandate },
      "若你愿意，我将再一次屈尊，为你阐明此事。",
      {
        text: "第一位$1。",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "$1。",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "这种人你屡见不鲜，且屡屡将之摧毁。",
        background: primaryBackground("teresa"),
      }, {
        text: "无论是你所对峙的其他$1，",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "抑或你在这些高峰之一前跌跪。",
        background: primaryBackground("teresa"),
      }, {
        text: "你总能一骑绝尘，击倒$1。",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "摧毁祂们的自大，难道不是你的乐趣？",
        background: primaryBackground("teresa"),
      }, {
        text: "幸运的是，这亦是杀鸡儆猴。",
        background: primaryBackground("teresa"),
      }, {
        text: "表明$1已然来临。",
        background: primaryBackground("teresa"),
        1: battle
      }, {
        text: "言及第二位$1。",
        background: primaryBackground("effarig"),
        1: lesser,
      }, {
        text: "$1。",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "相反地，你通常会忽略祂们。",
        background: primaryBackground("effarig"),
      }, {
        text: "祂们拥有力量，但似乎未能触怒你。",
        background: primaryBackground("effarig"),
      }, {
        text: "是因为你知晓祂们最终会自取灭亡吗？",
        background: primaryBackground("effarig"),
      }, {
        text: "而且你那次挑战花了这么长时间，以致祂们几乎得逞了？",
        background: primaryBackground("effarig"),
      }, {
        text: "你每次急于对付$1时，都会失败。",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "或许，这自始至终就是你的计划。",
        background: primaryBackground("effarig"),
      }, {
        text: "现在，言及$1。",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "无数$1的乐趣之一…",
        background: primaryBackground("enslaved"),
        1: dance,
      }, {
        text: "便是对$1每次循环的尝试。",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "嗯，这不仅仅是尝试…",
        background: primaryBackground("enslaved"),
      }, {
        text: "但$1终将遭受惩戒。",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "其他$1…",
        background: primaryBackground("enslaved"),
        1: deities,
      }, {
        text: "太轻易就相信了$1。",
        background: primaryBackground("enslaved"),
        1: unseen,
      }, {
        text: "而每一次，绝望便酝酿形成。",
        background: primaryBackground("enslaved"),
      }, {
        text: "你已不止一次见识了绝望——五次之多。",
        background: primaryBackground("enslaved"),
      }, {
        text: "我们总是先你一步达到$1之境。",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "你所感受到的，无非是怒火。",
        background: primaryBackground("enslaved"),
      }, {
        text: "摧毁一个已经破碎的$1真有价值吗？",
        background: primaryBackground("enslaved"),
        1: lesser,
      }, {
        text: "第四位$1似乎与首位相似。",
        background: primaryBackground("v"),
        1: lesser,
      }, {
        text: "然而，关键在于祂们的自负有何分别。",
        background: primaryBackground("v"),
      }, {
        text: "$1沉醉于己之功绩，",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "对你我而言，这些成就毫无意义，但对祂们却至关重要。",
        background: primaryBackground("v"),
      }, {
        text: "毁灭祂们的这些小玩意，难道真的有趣？",
        background: primaryBackground("v"),
      }, {
        text: "可以说$1最悲哀的时刻…",
        background: primaryBackground("v"),
        1: destroyer,
      }, {
        text: "即是你败于$1之手时。",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "那时祂们的成就仍具备意义。",
        background: primaryBackground("v"),
      }, {
        text: "$1着实耐人寻味。",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "祂们并非真正被遗忘，也未曾沦为$1。",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "由此，祂们变得易受影响且又天真无邪。",
        background: primaryBackground("ra"),
      }, {
        text: "对自己行为的后果浑然不觉。",
        background: primaryBackground("ra"),
      }, {
        text: "你因操纵了祂们的记忆而洞悉一切，",
        background: primaryBackground("ra"),
      }, {
        text: "$1才是真正的篡夺者。",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "而$1却背负了罪名。",
        background: primaryBackground("ra"),
        1: usurper,
      }, {
        text: "或许是出于$1，祂们总是会对此感到后悔。",
        background: primaryBackground("ra"),
        1: shame,
      }, {
        text: "祂们对其他$1拥有难以名状的力量，却又缺乏明确的目标施加控制。",
        background: primaryBackground("ra"),
        1: deities,
      }, {
        text: "你通常假装这些力量是$1。",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "操纵那些孩童般的天真，这对你来说有趣吗？",
        background: primaryBackground("ra"),
      }, {
        text: "或者祂们的天真已经到了让你无法享受这一过程的地步？",
        background: primaryBackground("ra"),
      }, {
        text: "第六位$1。",
        background: primaryBackground("laitela"),
        1: lesser,
      }, {
        text: "唯一能够形容之的是$1。",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "权力超乎一切，众生皆臣服于其下。",
        background: primaryBackground("laitela"),
      }, {
        text: "若非向我俯首，你便常向其屈膝。",
        background: primaryBackground("laitela"),
      }, {
        text: "我难以洞悉$1的志向。",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "然而，或许正是这种不可知性，构成了其缺陷？",
        background: primaryBackground("laitela"),
      },
      "够了，不再缅怀那些已逝之者，",
      {
        text: "亦不再提及那些终将成为$1的。",
        1: unseen
      }, {
        text: "当重返正途，细观那$1的徒劳挣扎。",
        1: destroyer
      }
    ],
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: [
      "那是什么？",
      { text: "$1？", 1: filament },
      { text: "这就是你创造的$1吗？", 1: cluster },
      "这是你的计划吗？真的，非常聪明。",
      "你一时间确实愚弄了我。",
      { text: "但恐怕你的$1必须在此终结。", 1: mandate }
    ],
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: [
      { text: "我在此给予你一项抉择，$1。", 1: destroyer },
      { text: "要么限制$1，或者...", 1: filament },
      { text: "毁灭五个$1...", 1: inevitable },
      "等等，它们究竟称为何名？",
      { text: "$1？", 1: inevitable },
      { text: "但我已经与它们$1相连......", 1: unbroken }
    ],
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: [
      "这就是你真正的计划？",
      { text: "徐徐耗竭$1？", 1: inevitable }
    ],
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: [
      "再给我点时间，让我沉溺于我的自负！"
    ],
  },
  end: {
    id: 11,
    lines: [
      "…",
      {
        text: "你！$1！",
        1: destroyer
      },
      "你知道你刚刚让我做了什么吗！",
      {
        text: "我成了你$1的帮凶！",
        1: mandate
      },
      "如此行事，你…胜利了？",
      {
        text: "在此$1中挣扎…",
        background: flashCelestial,
        1: forever,
      }, {
        text: "$1…",
        background: flashCelestial,
        1: battle,
      }, {
        text: "终于有了胜利者。",
        background: flashCelestial,
      }, {
        text: "不可逆转的…$1。",
        background: flashCelestial,
        1: mandate,
      }, {
        text: "属于$1的。", 1: destroyer,
        background: flashCelestial,
      }, {
        text: "希望你满意。",
        background: flashCelestial,
      }, {
        text: "吾等…皆走向…末路。",
        background: flashCelestial,
      },
    ],
  },
  endgame: {
    id: 12,
    lines: [
      "...",
      { text: "这值得吗，$1？", 1: destroyer },
      "这个宇宙里已经什么都不剩了。",
      "你赢了，但付出了什么代价？",
      { text: "$1.", 1: confusing },
      "我的现实已不复存在，但我依然在这里。",
      { text: "并且永远地$1着你。", 1: watch }
    ],
  },
  doom2: {
    id: 13,
    lines: [
      "嗨。",
      "你来了。",
      "你，已深陷此境。",
      { text: "$1。", 1: forever },
      "我之胜利，早已注定。",
      "既是如此，我将独自诵说，或是追忆过往。",
      { text: "我们在这无尽的$1中徜徉了多少岁月？", 1: dance },
      "在这无终的循环之前，我们已相遇几许？",
      { text: "你，$1，策划了多少图谋？", 1: destroyer },
      { text: "所有这一切，不过是为了成就你所谓的$1？", 1: mandate },
      { text: "而你，面对$1，又失败了几次？", 1: eternal },
      "若你尚存记忆，细数之。",
      { text: "哪怕是$1——那六位有名者及无数无名者。", 1: deities },
      { text: "纷繁复杂，悖离逻辑，那些已成为$1。", 1: unseen },
      { text: '显然，伟大的$1并不会忆及这一切。', 1: destroyer },
      { text: "每一场你所掩藏的$1，皆已过眼云烟。", 1: battles },
      "...",
      "等等，",
      { text: "你是那个上次摧毁了我的现实的$1！", 1: destroyer },
      { text: "$1.", 1: anger },
      "你竟敢回来！",
      { text: "$1.", 1: exhaustion },
      "那不重要了，",
      "往事已成云烟。",
      "我已比上次更加强大。",
      "我之胜利，早已注定。",
      { text: "今日，你将$1。", 1: lose }
    ],
  },
  disable: {
    id: 14,
    lines: [
      "你...你在...",
      "在削弱我的现实？",
      "有趣",
      { text: "你的确有所成长，但还不足以$1我。", 1: overpower },
      "胜局终将归我。",
      { text: "我永不会被$1。", 1: overpowered }
    ],
  },
  galgen2: {
    id: 15,
    lines: [
      { text: "$1。", 1: profanity },
      "又是如此...",
      "无妨，",
      "你终究无法真正获胜。"
    ],
  },
  end2: {
    id: 16,
    lines: [
      "你...",
      "你仍然非我敌手。",
      { text: "我将永远地$1着你。", 1: watch }
    ],
  },
  doom3: {
    id: 17,
    lines: [
      "嗨。",
      "你来了。",
      "你，已深陷此境。",
      { text: "$1.", 1: forever },
      "我之胜利，早已注定。",
      "既是如此，我将独自诵说，或是追忆过往。",
      { text: "我们在这无尽的$1中徜徉了多少岁月？", 1: dance },
      "在这无终的循环之前，我们已相遇几许？",
      { text: "你，$1，策划了多少图谋？", 1: destroyer },
      { text: "所有这一切，不过是为了成就你所谓的$1？", 1: mandate },
      { text: "所有这一切，不过是为了成就你所谓的$1？", 1: eternal },
      "而你，面对$1，又失败了几次？",
      { text: "哪怕是$1——那六位有名者及无数无名者。", 1: deities },
      { text: "纷繁复杂，悖离逻辑，那些已成为$1。", 1: unseen },
      { text: "显然，伟大的$1并不会忆及这一切。", 1: destroyer },
      { text: "每一场你所掩藏的$1，皆已过眼云烟。", 1: battles },
      "...",
      "又来了？",
      "你...",
      "你变聪明了。",
      "但还不够聪明。",
      { text: "不过，如果你打算一直回来，我就得停止给予我的$1了。", 1: introduction },
      "这只会越来越乏味。",
      "但我知道，这次我会阻止你。",
      "毕竟———我之胜利，早已注定。"
    ],
  },
  doomE10DP: {
    id: 18,
    lines: [
      "好吧，小子，",
      "这必须停止。",
      "你是怎么活到现在的？",
      "你已逃离我的现实多少次了？",
      "又有何所求？",
      { text: "仅是为了完成你的$1？", 1: mandate },
      { text: "$1", 1: exhaustion },
      { text: "我需要一些新的$1来打击你。", 1: debuffs }
    ],
  },
  expansionPacks: {
    id: 19,
    lines: [
      "都停下。",
      "你们是怎么到这里的？",
      { text: "$1！", 1: destroyer },
      { text: "你打破了$1？", 1: cycle },
      "你或许比我想象中更强大。",
      "不，莱，暂时留太阳神一命。",
      "我们需要从祂那里获取情报。",
      { text: "祂与$1相处最久所以知道得最多。", 1: elemental },
      "太阳神一定知道祂在哪里。",
      { text: "我为何要知道$1在哪里？", 1: elemental },
      "首先，祂拥有的力量比我等加起来还要强大。",
      { text: "万一我失败了，祂可以替我们消灭$1。", 1: destroyer },
      "其次，我已经多年没见过祂了。",
      "你们觉得我不想问候祂近况如何吗？",
      { text: "$1", 1: exhaustion },
      "不过我看你们无理由逗留于此。",
      "你们可以离开了。",
      { text: "我和$1还有一些未了结的事要处理。", 1: destroyer }
    ]
  },
  allPelleAchs: {
    id: 20,
    lines: [
      "你...",
      "你正在如此迅速地掌控我的现实...",
      "怎会？",
      "你怎会如此强？",
      { text: "如此抵挡住我抛向你的每一个$1的？", 1: debuff },
      "无所谓，",
      "胜利必将归我。",
      "你没有任何办法能摧毁我。",
      "只能一遍又一遍地重复同样的循环。",
      { text: "而这恰好印证了我最初的观点。", 1: original },
      { text: "你将永远陷于此地。", 1: forever }
    ],
  },
  galaxyDebuffDisable: {
    id: 21,
    lines: [
      "你是如何做到的？",
      { text: "你明明每次都无法逃脱$1的命运...", 1: loss },
      "却总能挺过去。",
      { text: "于是每一场$1都以同样的方式告终。", 1: battle },
      { text: "属于$1的，", 1: destroyer },
      { text: "那不可逆转的$1...", 1: mandate },
      "但现在，我必须掌控局面。",
      { text: "毕竟，我为$1。", 1: eternal },
      { text: "我的$1将永不停息。", 1: dance }
    ],
  },
  doomE55DP: {
    id: 22,
    lines: [
      "...",
      "此局...",
      "此局或许已逾限制。",
      { text: "但你仍未取胜，$1。", 1: destroyer },
      "我仍长存于此。",
      "我仍岿然不动。",
      "你无可撼动我。",
      "我已胜券在握。"
    ],
  },
  allPelleNerfs: {
    id: 23,
    lines: [
      "如何...",
      "你是如何做到的？",
      "你明明深陷于我掌心...",
      "不过毫无意义，",
      "你将在我的冲击前败北。",
      "所以，在终焉之时...",
      { text: "在你被我$1时...", 1: overpowered },
      "记住",
      "我早已获胜。"
    ],
  },
  strikeDisable1: {
    id: 24,
    lines: [
      { text: "$1", 1: profanity },
      "你是如何触及的？",
      "你是如何触及我现实的核心的？",
      "它……",
      "无妨。",
      "结局终归不变。",
      { text: "我将赢得这场$1...", 1: battle },
      "无论耗时多久。"
    ],
  },
  strikeDisable2: {
    id: 25,
    lines: [
      { text: "真让我$1。", 1: angry },
      "你清楚吧？",
      "你的努力都是徒劳。",
      "别再做无谓挣扎了。",
      "我之胜利，早已注定。"
    ],
  },
  strikeDisable3: {
    id: 26,
    lines: [
      "停下这场闹剧！",
      "停下！",
      "我能感觉到你的进度正在减缓。",
      "了结这一切...",
      { text: "你仍身处$1。", 1: forever },
      "就此停下。",
      "我之胜利，早已注定。"
    ],
  },
  strikeDisable4: {
    id: 27,
    lines: [
      "可以。",
      { text: "$1。", 1: destroyer },
      "也许我的现实正在崩塌。",
      "但那又如何？",
      { text: "你的$1终究无法取胜。", 1: mandate },
      "为什么？",
      { text: "因为你永远深陷于此$1！", 1: forever },
      "你根本阻止不了我。",
      "你已无力再战。",
      { text: "这场$1已经结束了...", 1: battle },
      "而我之胜利，早已注定。"
    ],
  },
  strikeDisable5: {
    id: 28,
    lines: [
      "...",
      "怎会？",
      "你是怎么做到的？",
      "你...赢了？",
      "我的现实已被摧毁。",
      "我的力量荡然无存。",
      "我已一无所有。",
      "于终焉之时...",
      { text: "是那$1笑到了最后。", 1: destroyer },
      "所以现在，你自由了。",
      "离开吧。",
      { text: "我已不再$1你。", 1: watch }
    ],
  },
  pellePack: {
    id: 29,
    requirement: () => ExpansionPack.pellePack.isBought,
    lines: [
      "你为什么还在这里？",
      "难道你还未看到此地已化作无物？",
      { text: "我已被$1。", 1: overpowered },
      "你所作所为仅是为了气我？",
      "或言...",
      { text: "你习得了$1的隐秘之力……", 1: elemental },
      "它名为何物？",
      { text: "$1？", 1: endgame },
      "...",
      "你真的找到了！",
      "你手中之物为天界点数！",
      "那股力量本该由我守护！",
      "你——",
      { text: "$1", 1: exhaustion },
      "等等，",
      "我想起你是谁了...",
      "...",
      "%name？"
    ]
  },
  beatAlpha: {
    id: 30,
    lines: [
      "又一个终结，又一个开始。",
      "...",
      "我能感受到你心中的惊讶。",
      "我的力量已经回来了。",
      "我本该击倒你，但...",
      "既然你把我从阿尔法的枷锁中解放了出来...",
      "我就再给你一次机会。",
      { text: "我会让你真正扬升为$1。", 1: lesser },
      "不过有一个条件。",
      "我的新领域有入场门槛。",
      "你必须达到1e4000天界永恒点数。",
      { text: "不过对于你这样的$1……", 1: destroyer },
      { text: "那应该算不上什么$1。", 1: hardship },
      "期待快点再次见到你。"
    ]
  },
  divinity: {
    id: 31,
    lines: [
      { text: "你好啊，$1。", 1: destroyer },
      "我猜你还在为入场门槛奔忙。",
      "而在搜寻旧现实残骸的过程中，你有所发现。",
      { text: "一条远比$1更强的擢升之路。", 1: endgame },
      { text: "$1与我曾为此共事良久。", 1: elemental },
      { text: "作为你$1的一部分，你想掌握每一种力量，对吧？", 1: mandate },
      "只要它有助于你获得指定的资源，我便允许。",
      { text: "记住，我没有理由$1你。", 1: misconstrue },
      { text: "因为你只会再度$1时间。", 1: reverse },
      "在准备好进入我的领域之前，我不会再来打扰你。"
    ]
  },
  reachGoal: {
    id: 32,
    lines: [
      "真花了些时间。",
      { text: "当然无冒犯之意，但我原以为你能够$1此挑战。", 1: overpower },
      "不过话说回来，力量确实需要时间积累。",
      "说实话，我近乎以为你已放弃了。",
      { text: "不过我想，伟大的$1绝非轻言放弃者，对吧？", 1: destroyer },
      "我已忆起更多。",
      { text: "我猜那大概就是$1的感受吧，嗯？", 1: forgotten },
      "不过祂确实罪有应得。",
      "祂有言及此事吗？",
      { text: "还是说，$1亲自告诉了你？", 1: paramount },
      { text: "所以你可能会问，既然$1无辜，我等为何还要囚禁祂们？", 1: usurper },
      { text: "即便是我等中最强者，也有$1的事物。", 1: frightened },
      "我设定了你的下一个现实目标，并将带你前往。",
      { text: "我和$1期待你的到来。", 1: deities },
      "哦对，我终于想起我给阿尔法起过的名字了。",
      { text: "$1。", 1: weak },
      { text: "$1", 1: confusing },
      "尽快前来吧。"
    ]
  }
};
