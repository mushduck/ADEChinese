export const effarigQuotes = {
  initial: {
    id: 0,
    lines: [
      "Welcome to my humble abode.",
      "I am Effarig, and I govern Glyphs.",
      "I am different from Teresa; not as simplistic as you think.",
      "I use the shards of Glyphs to enforce my will.",
      "I collect them for the bounty of this realm.",
      "What are you waiting for? Get started.",
    ]
  },
  unlockWeights: {
    id: 1,
    lines: [
      "Do you like my little shop? It is not much, but it is mine."
    ]
  },
  unlockGlyphFilter: {
    id: 2,
    lines: [
      "This purchase will help you out."
    ]
  },
  unlockSetSaves: {
    id: 3,
    lines: [
      "Is that too much? I think it is too much."
    ]
  },
  unlockRun: {
    id: 4,
    lines: [
      "You bought out my entire stock... well, at least I am rich now.",
      "The heart of my Reality is suffering. Each Layer is harder than the last.",
      "I hope you never complete it.",
    ]
  },
  completeInfinity: {
    id: 5,
    lines: [
      { text: "You have completed Effarig's Infinity.", showCelestialName: false },
      "This is the first threshold. It only gets worse from here.",
      "None but me know enough about my domain to get further.",
    ]
  },
  completeEternity: {
    id: 6,
    lines: [
      { text: "You have completed Effarig's Eternity.", showCelestialName: false },
      "This is the limit. I do not want you to proceed past this point.",
      "You will not finish this in your lifetime.",
      "I will just wait here until you give up.",
    ]
  },
  completeReality: {
    id: 7,
    lines: [
      { text: "You have completed Effarig's Reality.", showCelestialName: false },
      "So this is the diabolical power... what frightened the others...",
      "Do you think this was worth it? Trampling on what I have done?",
      "And for what purpose? You could have joined, we could have cooperated.",
      "But no. It is over. Leave while I cling onto what is left.",
    ]
  },
  expansionPacks: {
    id: 8,
    lines: [
      "Oh, hey Teresa.",
      "Do you know where we are?",
      "Guess not.",
      "Hold on, that's the guy who keeps destroying my home!",
      "What does Pelle call him...",
      "Destroyer?",
      "Did you bring me here?",
      "Why are you glowing with power?",
      "Wait...",
      "How did the Nameless break out of their prison?"
    ]
  },
  effarigPack: {
    id: 9,
    requirement: () => ExpansionPack.effarigPack.isBought,
    lines: [
      "Found what you were looking for?",
      "I tried to hide it from those who might abuse it's potential.",
      "I shouldn't expect much from you after what you did...",
      "But I suppose you had a purpose in it.",
      "I'll save you the trouble by giving you the rewards automatically.",
      "You won't destroy my home any more now, will you?",
      "Sorry for getting mad, I should've known you were a chill guy on the inside.",
      "Maybe we can still be friends.",
      "Hey, don't let the power get to your head.",
      "Sure it's a lot, but I expect you can handle it.",
      "And if your Glyphs ever start to suck, well, you know who to call.",
      "See you around."
    ]
  },
  glyphLevel1: {
    id: 10,
    requirement: () => player.records.bestEndgame.glyphLevel >= 1e5,
    lines: [
      "Six-digit Glyph levels, huh?",
      "You're breaking more walls than I can build.",
      "I suppose this is having decent effects on your Alchemy resources.",
      "I helped Ra make those you know.",
      "I was most proud of the Reality Glyph.",
      "I even put Teresa's symbol on it...",
      "Don't ask. I won't answer.",
      "Anyway, enjoy the climb.",
      "And look out for yourself."
    ]
  },
  glyphLevel2: {
    id: 11,
    requirement: () => player.records.bestEndgame.glyphLevel >= 2e5,
    lines: [
      "Woah. Slow down there, buckaroo.",
      "One more power burst, and you'd have Glyph Levels in the millions.",
      "The Elemental and I didn't plan for that...",
      "He just told me to put another Glyph Level softcap here, so that's what I'm gonna have to do.",
      "Hey, don't feel too bad.",
      "You'd get those million-level Glyphs soon enough.",
      "Between you and me, it's really just the Alchemy boost that would get you.",
      "Anyway, I'll let you get back to your grind.",
      "See you around, mate."
    ]
  }
};
