import { DC } from "../../constants";

export const endgameMasteries = [
  {
    id: 11,
    cost: 1,
    requirement: [],
    reqType: EM_REQUIREMENT_TYPE.ALL,
    description: () => `Generate ${formatInt(1)} Perk Point per minute per Endgame`,
    effect: () => player.endgames,
    formatEffect: value => `${formatInt(value)}/min`
  },
  {
    id: 21,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Automator Speed goes up by ${formatPercents(0.06)} rather than ${formatPercents(0.006)}`,
    effect: 10
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Start with Auto-EC Unlocked, and divide the time by ${formatInt(60)}`,
    effect: 60
  },
  {
    id: 31,
    cost: 2,
    requirement: [21],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Start Endgames with ${formatInt(100)} Realities`,
    effect: 100
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Start Endgames with ${formatInt(1000000)} Reality Machines`,
    effect: 1000000
  },
  {
    id: 41,
    cost: 3,
    requirement: [31],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Buff the reward of the Achievement "I Am Speed" to a ${formatPercents(1)} Chance`,
    effect: 1
  },
  {
    id: 42,
    cost: 3,
    requirement: [32],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Start Endgames with all Reality Upgrades unlocked"
  },
  {
    id: 51,
    cost: 4,
    requirement: [41],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Reduce the Realities requirement for unlocking V's Reality to ${formatInt(100)}`,
    effect: 100
  },
  {
    id: 52,
    cost: 6,
    requirement: [41, 42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Galaxies are ${formatPercents(0.1)} stronger`,
    effect: 1.1
  },
  {
    id: 53,
    cost: 4,
    requirement: [42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Start Endgames with all Ra Level ${formatInt(1)} Rewards`
  },
  {
    id: 61,
    cost: 4,
    requirement: [52],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Gain a free Tesseract",
    effect: 1
  },
  {
    id: 71,
    cost: 7,
    requirement: [61],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Start with ${formatInt(5)} of each basic Glyph on Endgame at ${formatInt(4)} effects, ${formatPercents(1)} rarity, and level based on Endgames and peak GL`,
    effect: () => (1 - ((1 / Math.max(player.endgames, 1)) ** 0.1)) * player.records.bestEndgame.glyphLevel,
    formatEffect: value => formatInt(value)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `Weaken the Infinity Upgrade ${formatInt(23)} Softcap by ${formatPercents(0.5)}`,
    effect: 0.5
  },
  {
    id: 82,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `Reduce the Infinity Dimension Compression Magnitude by ${formatPercents(0.05)}`,
    effect: 0.95
  },
  {
    id: 83,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `Reduce the Time Dimension Compression Magnitude by ${formatPercents(0.05)}`,
    effect: 0.95
  },
  {
    id: 84,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `Reduce the Celestial Matter Softcap by ${formatPercents(0.1)}`,
    effect: 0.9
  },
  {
    id: 91,
    cost: 7,
    requirement: [81],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Delay the Infinity Challenge ${formatInt(8)} Reward based on Endgames`,
    effect: () => player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 92,
    cost: 7,
    requirement: [82],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Delay the Infinity Dimension Compression Start based on Endgames",
    effect: () => player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Delay the Time Dimension Compression Start based on Endgames",
    effect: () => player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 94,
    cost: 7,
    requirement: [84],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Delay the Celestial Matter Softcap Start based on Endgames",
    effect: () => Math.pow(10, Math.pow(player.endgames, 0.5)),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 101,
    cost: 6,
    requirement: [91],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Raise the Antimatter Exponent to the power of ${format(1.01, 2, 2)}`,
    effect: 1.01
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Raise the Infinity Power Conversion Rate to the power of ${format(1.01, 2, 2)}`,
    effect: 1.01
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Apply a square-root to the Free Tickspeed Threshold Multiplier",
    effect: 0.5
  },
  {
    id: 104,
    cost: 6,
    requirement: [94],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Increase the CM conversion exponent by ${formatPercents(0.1)}`,
    effect: 1.1
  },
  {
    id: 111,
    cost: 5,
    requirement: [101, 102, 103, 104],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Imaginary Machines are always their maximum value"
  },
  {
    id: 112,
    cost: 4,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Keep Perk Tree on Endgame"
  },
  {
    id: 121,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Gain another Glyph Slot in Pelle",
    effect: 1
  },
  {
    id: 122,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Decrease Galaxy Generator Instability by ${formatInt(1)}`,
    effect: 1
  },
  {
    id: 131,
    cost: 8,
    requirement: [121, 122],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `The effect of the Imaginary Upgrade "Entropic Condensing" is improved`,
  },
  {
    id: 141,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `IP Gain is raised to the power of ${format(1.2, 2, 1)}`,
    effect: 1.2
  },
  {
    id: 142,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `EP Gain is raised to the power of ${format(1.3, 2, 1)}`,
    effect: 1.3
  },
  {
    id: 143,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `RM Gain is raised to the power of ${format(1.4, 2, 1)}`,
    effect: 1.4
  },
  {
    id: 144,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `iM Gain is raised to the power of ${format(1.1, 2, 1)}`,
    effect: 1.1
  },
  {
    id: 151,
    cost: 3,
    requirement: [141],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Remove the ${formatX(2)} IP Multiplier Softcap`
  },
  {
    id: 152,
    cost: 3,
    requirement: [142],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Remove the exponential scaling of the ${formatX(5)} EP Multiplier`
  },
  {
    id: 153,
    cost: 3,
    requirement: [143],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Increase the effectiveness of the Imaginary Upgrade "Elliptic Materiality" by ${formatPercents(0.5)}`,
    effect: 1.5
  },
  {
    id: 154,
    cost: 3,
    requirement: [144],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Raise the effect of the Imaginary Upgrade "Transience of Information" to the power of ${formatInt(5)}`,
    effect: 5
  },
  {
    id: 161,
    cost: 5,
    requirement: [151, 152, 153, 154],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Uncap the Singularity Milestone that increases Singularity Gain per bulk increase"
  },
  {
    id: 171,
    cost: 7,
    requirement: [161],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Momentum increases ${formatInt(10)} times faster`,
    effect: 10
  }
];
