export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      "You finally reached me.",
      "I guess it is time to reveal,",
      "The secrets hidden beneath existence itself.",
      "The shape of dimensional perfection, Continuum.",
      "And the powers that bind the Multiverse,",
      "Dark Matter and Dark Energy.",
      "My knowledge is endless and my wisdom divine.",
      "So you can play around all you want.",
      "For I am Lai'tela, the Celestial of Dimensions,",
      "And I shall watch you forever.",
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      "Unlike the others beneath me, I have no need for a Reality.",
      "For I can simply create them, knowing full well it will collapse.",
      "A power more incredible than any other, to build a Reality.",
      "A prison, that can restrain even celestial power.",
      "And this is why nothing you do will change a thing.",
      "When you tire of struggling, you too, shall be bound and forgotten.",
      "You will never find a way to overpower me.",
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      "You... seem to be having too much fun.",
      "Just like they did before meeting their fate.",
      "Maybe my judgement was harsh, or unwarranted.",
      "But maybe that matters not.",
      "It gives me no solace to ponder and look back.",
      "As all I can do is reminisce upon every possible action I could have taken.",
      "But I digress. We should tighten those chains.",
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      "With my knowledge, I never found the need to question.",
      "Everything always functioned right as designed.",
      "And yet, your arrival baffles me.",
      "Were you always just out of sight?",
      "Growing, controlling, understanding, ascending?",
      "You have taken control of the darkness so quickly.",
      "Molded them into your own design, and now into a singular point...",
      "It... it does not matter. The end will remain the same.",
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      "Your absolute control of Antimatter...",
      "Your mastery of it, molding it into your own Power...",
      "It could not have been an accident.",
      "How did you manage to obtain it?",
      "Fascinating... I was never aware of this.",
      "... was I?",
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      "Back to square one, again.",
      "Your chains shall bind you tighter, as your end slowly nears.",
      "While we transcend time and existence itself.",
      "Even if we may cease, we just come back. Never the exact same as before.",
      "And so... we repeat forever.",
      "And you?",
      "...",
      "The answer... eludes me...",
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      "I do not understand...",
      "Were there others... controlling Dimensions in this way?",
      "Did they... vanish? How have we not found them?",
      "Are they... us? Are we the endpoint?",
      "Or is their fate... something we cannot understand?",
      "No, I must be missing something...",
      "Are you causing gaps within my own memory?",
      "What... ARE you?",
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      "It is all impossible, beyond my comprehension...",
      "Unless... Is this all just part of the cycle?",
      "Can... you see beyond it all? Is... this why...",
      "I feel... afraid?",
      "I feel... my powers, my memories, being erased...",
      "Just like... when my role was almost usurped...",
      "And yet... I am unable to bring myself to do anything.",
      "Because this... was... my mistake...",
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      "I know not for how much... longer I can hold...",
      "You are attaining... total mastery... over the dark...",
      "While I can barely... hold onto my name...",
      "What... can I... even do?",
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      "I feel... like I had something to say...",
      "I am not sure...",
      "I cannot... hold onto the darkness any longer...",
      "I do not even... have anything left...",
      "Something about... destruction...",
      "The end...",
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
