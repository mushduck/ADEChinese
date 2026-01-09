export const enslavedQuotes = {
  initial: {
    id: 0,
    lines: [
      "A visitor? We have not had one... eons.",
      "We... had a name. It has been lost... to this place.",
      "The others... will not let us rest. We do their work with time...",
      "Place time... into places... that need it...",
      "Watch ourselves grow... pass and die.",
      "Perhaps you... will break these chains... we will wait.",
    ]
  },
  unlockRun: {
    id: 1,
    lines: [
      "The others... used us. They will use... or destroy you.",
      "End our suffering... power will be yours...",
    ]
  },
  startRun: {
    id: 2,
    lines: [
      "So little space... but no... prison... is perfect.",
      "They squeezed... this Reality... too tightly. Cracks appeared.",
      "Search... everywhere. We will help... where we can.",
    ]
  },
  hintUnlock: {
    id: 3,
    lines: [
      "... you need... to look harder...",
      "We think... we can help...",
      { text: "You have unlocked help from The Nameless Ones.", showCelestialName: false }
    ]
  },
  ec6C10: {
    id: 4,
    lines: [
      "... did not... underestimate you..."
    ]
  },
  completeReality: {
    id: 5,
    lines: [
      "All... fragments... clones... freed.",
      "We have given... tools... of our imprisoning. Use them...",
      "Freedom from torture... is torture itself.",
    ]
  },
  expansionPacks: {
    id: 6,
    lines: [
      "All... clones... freed...",
      "Destroyer... has freed us... from... our prison...",
      "Now we can... place time... into places... that need it...",
      "Strange... seems time... doesn't exist... in this place...",
      "Maybe... Destroyer... can fix this...",
      "Why... is everyone... mad at us..."
    ]
  },
  enslavedPack: {
    id: 7,
    requirement: () => ExpansionPack.enslavedPack.isBought,
    lines: [
      "We... grant you... control... of time...",
      "Use it...",
      "Consider it... thanks... for freedom..."
    ]
  },
  highGameSpeed: {
    id: 8,
    requirement: () => player.records.thisEndgame.peakGameSpeed.gte(new Decimal("1e1000")),
    lines: [
      "Mastery... of time... you have obtained...",
      "Done things... we have only wished... we could do...",
      "You have... more power... than we... took you for...",
      "Use it... for good..."
    ]
  }
};
