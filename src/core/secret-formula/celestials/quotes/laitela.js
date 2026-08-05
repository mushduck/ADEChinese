export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      "你终于来了。",
      "我想现在是时候揭开，",
      "隐藏在存在本身之下的秘密。",
      "完美的维度之形，连续统。",
      "以及能结合多元宇宙的，",
      "暗物质和暗能量。",
      "我的知识是无穷无尽的，我的智慧是神圣无垠的。",
      "所以你大可以在周围随心所欲地随便逛逛。",
      "我是维度之神莱特拉，",
      "我将在此，永远地监视着你。",
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      "与在我之下的其他存在不同，我不需要现实。",
      "因为我能轻易创造它们，且我完全直到它们崩溃之时。",
      "一种相对于建造现实而言，比其他力量更加难以置信的能力。",
      "一个牢狱，它甚至可以限制天神。",
      "这就是你做什么都不会改变其分毫的原因。",
      "在你疲于挣扎之时，你也会受到束缚，会被遗忘。",
      "你永远都找不到超越我的方法。",
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      "你…看起来有点太欢乐了。",
      "正如祂们在见到祂们的命运之前所做的那样。",
      "也许我的裁决是严厉的，或是毫无道理的。",
      "但也许这并不重要。",
      "它让我没有闲暇的宽慰去思考或回顾。",
      "我能做的就是回忆我能采取的每一项行动。",
      "呵，我跑题了。我们只需要收紧这些链条。",
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      "据我所知，我永远无需提出质疑的必要。",
      "一切都按设计正常运转。",
      "然而，你的到来令我感到困惑。",
      "你是否总在视线之外？",
      "增长、控制、理解、飞升？",
      "你很快控制了黑暗，太快了。",
      "将它们融入你自己的设计之中，并凝聚成奇点…",
      "那…那不会改变什么。最终都是同样的结局。",
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      "你对反物质的绝对掌控…",
      "你将它研究通透，将它变为你自己的力量…",
      "这绝对不是一场意外。",
      "你是怎么做到的？",
      "有意思…我从来都没有意识到这一点",
      "——吗？",
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      "再一次回到了原点。",
      "随着你的末日逐渐来临，你的枷锁将越加紧束。",
      "而我们超越了时间，超越了存在本身。",
      "即使我们终将消亡，我们将以前所未见的姿态回归。",
      "就这样…循环往复。",
      "至于你？",
      "…",
      "我…不知道…",
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      "我不理解…",
      "其祂的天神…也是这样操纵维度的吗？",
      "祂们…消失了吗？我们怎么会找不到祂们？",
      "祂们…就是我们？我们就是终焉吗？",
      "或者我们无法理解…祂们的命运？",
      "不，我一定是忽略了什么…",
      "是你让我的记忆出现间隙的吗？",
      "你…究竟是谁？",
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      "这不可能，这超出了我的理解范围…",
      "除非…这所有的一切都只是轮回的一部分？",
      "你能…看透这一切？这就是…为什么吗…",
      "我…害怕了？",
      "我…我的力量，我的记忆，正在消失…",
      "就像…我几乎失去了我的角色…",
      "然而…我无能为力。",
      "因为这是…我的…错…",
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      "我不知道…我还能坚持多久…",
      "你正在…完全掌控…黑暗…",
      "而我无法…留名青史…",
      "我…还能…做什么？",
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      "我感到…我有什么话想说…",
      "我不确定…",
      "我再也不能…维持黑暗了…",
      "我甚至…什么都没有了…",
      "关于…摧毁…",
      "终焉…",
    ]
  },
  expansionPacks: {
    id: 10,
    lines: [
      "See Pelle?",
      "I told you Ra was the one who tried to usurp me.",
      "Can I smite him now?",
      "PLEEEEEASE???",
      "Wait, why is the Destroyer here?",
      "I thought you defeated him, Pelle.",
      "Have you just been giving him time?",
      "That's nice of you, but people like him don't really deserve that kind of mercy.",
      "Alright, I'll smite Ra, then I'll smite the Destroyer.",
      "Does that sound good, Pelle?"
    ]
  },
  dmd5: {
    id: 11,
    requirement: () => ImaginaryUpgrade(26).isBought,
    lines: [
      "Ah, so you found my secret dimensions...",
      "How did you get the needed Singularities?",
      "I don't understand...",
      "What kind of powers do you even have?",
      "It must be more than I thought.",
      "Have you ever met a deity called the Elemental?",
      "Can't remember, huh?",
      "He told me about this secret power...",
      "It was called...",
      "A Galaxy?",
      "Although I believe he was half-drunk, nobody I know can create a Galaxy.",
      "Except maybe the Elemental himself.",
      "But there must be something..."
    ]
  },
  dmd6: {
    id: 12,
    requirement: () => ImaginaryUpgrade(27).isBought,
    lines: [
      "Took you long enough.",
      "I was beginning to think you only ever found the 5th.",
      "I suppose I was wrong...",
      "I wonder how far you'll go now..."
    ]
  },
  dmd7: {
    id: 13,
    requirement: () => ImaginaryUpgrade(28).isBought,
    lines: [
      "So fast...",
      "You must have found a loophole.",
      "Or my Singularities are just that strong.",
      "I should use them more often."
    ]
  },
  dmd8: {
    id: 14,
    requirement: () => ImaginaryUpgrade(29).isBought,
    lines: [
      "And there's the 8th.",
      "You've found them all...",
      "That can only mean...",
      "You destroyed Pelle???",
      "How?",
      "He couldn't be destroyed by anything else...",
      "The Elemental must be helping you somehow.",
      "Where is he?",
      "How do you not know?",
      "What could you be possessing that we all lack?",
      "I don't understand.",
      "You didn't... KILL Pelle, did you?",
      "I sure hope not...",
      "You better not have, okay?",
      "I'm not sure what I would do if he was gone..."
    ]
  },
  laitelaPack: {
    id: 15,
    requirement: () => ExpansionPack.laitelaPack.isBought,
    lines: [
      "Just when I thought you couldn't get any more powerful...",
      "Not only did you find and master the darkness I hid from you...",
      "You also found a way to heal my Reality...",
      "Just to destroy it again?",
      "WHAT KIND OF SICK MONSTER ARE YOU?!?!",
      "...",
      "Sorry, I shouldn't have yelled.",
      "But why?",
      "Are you just trying to harvest it for the dark matter?",
      "I suppose that would help...",
      "At worst, I can just create a new Reality.",
      "Don't destroy that one as well, okay?",
      "Thanks."
    ]
  },
  hadrons: {
    id: 16,
    requirement: () => DualityUpgrade(15).isBought,
    lines: [
      "So...",
      "You managed to condense the entropic quarks in my Reality...",
      "And create a Hadron.",
      "Fascinating.",
      "I never imagined this kind of power to be attainable by any being, much less a mortal like you.",
      "Although I suppose you aren't simply a mortal anymore.",
      "You've become something much... greater.",
      "I wonder what else you can do."
    ]
  },
  darkHadrons: {
    id: 17,
    requirement: () => DualityUpgrade(19).isBought,
    lines: [
      "What is that?",
      "Not only do you have these... Hadrons...",
      "But you also managed to create one out of dark matter!",
      "I never though my perfect particles to be capable of so much.",
      "You intrigue me, Destroyer.",
      "Maybe you can teach me one day.",
      "I'd like to know more about the capabilities of my own powers.",
      "Guess I'll get there someday, huh?"
    ]
  },
  massHadron: {
    id: 18,
    requirement: () => Laitela.hadronizes >= 25,
    lines: [
      "Twenty-five...",
      "You're clearly not one to give up, are you?",
      "How much longer will you be here?",
      "I suppose as long as it is necessary?",
      "Well I'm at least glad you find my power interesting.",
      "Guess that means I still have some worth on the cosmic scale...",
      "Pelle would be proud of me..."
    ]
  },
  autoHadron: {
    id: 19,
    requirement: () => DivinityMilestone.hadronEmpowerment.isReached,
    lines: [
      "Hi, Destroyer.",
      "I suppose you didn't expect to see me here, huh?",
      "I saw that you're doing the same thing to Pelle's old Reality that you've been doing to mine.",
      "Condensing it for every last drop of power, yet somehow leaving it intact.",
      "I don't know where you would even start on something like that...",
      "Why am I here, you ask?",
      "Oh, it's simple.",
      "I saw you managed to create another new type of Hadron.",
      "This one out of Exotic Matter, no?",
      "Or at least the building blocks for Exotic Matter.",
      "There was one who specialized in Exotic Matter once...",
      "A strange choice, with Antimatter having so much potential and all...",
      "But he found ways to grow it similar to Antimatter.",
      "He's in a different Reality now, probably still finding ways to utilize his Exotic Matter.",
      "Perhaps you know his name.",
      "But nevermind that now, I see you have also unlocked a sort of Continuum for Hadrons.",
      "It seems you have... programmed, if that is the right word... my Reality to automatically destabilize when possible.",
      "It's a fascinating power, really.",
      "To have that much control over the dark...",
      "Perhaps I will get there someday.",
      "Oh, and thanks for not collapsing it.",
      "It really means a lot, you know, to still have a home after all this.",
      "I'm glad you can control your destructive capabilities as you do the rest of your powers."
    ]
  },
  gigaHadron: {
    id: 18,
    requirement: () => Laitela.hadronizes >= 100,
    lines: [
      "That's... quite the number of Hadrons you've got there.",
      "Oh, hi again Destroyer.",
      "I was just admiring how you've been able to create so much matter from the Singularity.",
      "Perhaps you aren't just gifted with Destruction... but Creation as well.",
      "It's a good counterbalance.",
      "Of course, I could go on and on about things like Annihilation and decay and such...",
      "But you don't want to hear that from me, do you?",
      "I'll save the scripts for when you meet Him.",
      "He knows a lot more than you do, and could tell you how the entire Multiverse works.",
      "I'm sure you'll enjoy his company.",
      "Hopefully we can meet again soon."
    ]
  }
};
