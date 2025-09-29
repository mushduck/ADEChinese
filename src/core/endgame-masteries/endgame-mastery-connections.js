import { EndgameMastery } from "./endgame-mastery";

export class EndgameMasteryConnection {
  constructor(from, to, override) {
    this._from = from;
    this._to = to;
    this._override = override;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get isOverridden() {
    return this._override !== undefined && this._override();
  }

  get isSatisfied() {
    return this.isOverridden || this._from.isBought;
  }
}

/**
 * @type {EndgameMasteryConnection[]}
 */
EndgameMastery.allConnections = (function() {
  const EM = id => EndgameMastery(id);
  const connections = [
    [EM(11), EM(21)],
    [EM(11), EM(22)],

    [EM(21), EM(31)],
    [EM(22), EM(32)],

    [EM(31), EM(41)],
    [EM(32), EM(42)],

    [EM(41), EM(51)],
    [EM(41), EM(52)],
    [EM(42), EM(52)],
    [EM(42), EM(53)],

    [EM(52), EM(61)],

    [EM(61), EM(71)],

    [EM(71), EM(81)],
    [EM(71), EM(82)],
    [EM(71), EM(83)],
    [EM(71), EM(84)],

    [EM(81), EM(91)],
    [EM(82), EM(92)],
    [EM(83), EM(93)],
    [EM(84), EM(94)],

    [EM(91), EM(101)],
    [EM(92), EM(102)],
    [EM(93), EM(103)],
    [EM(94), EM(104)],

    [EM(101), EM(111)],
    [EM(102), EM(111)],
    [EM(103), EM(111)],
    [EM(104), EM(111)],

    [EM(111), EM(112)],

    [EM(111), EM(121)],
    [EM(111), EM(122)],

    [EM(121), EM(131)],
    [EM(122), EM(131)],

    [EM(131), EM(141)],
    [EM(131), EM(142)],
    [EM(131), EM(143)],
    [EM(131), EM(144)],

    [EM(141), EM(151)],
    [EM(142), EM(152)],
    [EM(143), EM(153)],
    [EM(144), EM(154)],

    [EM(151), EM(161)],
    [EM(152), EM(161)],
    [EM(153), EM(161)],
    [EM(154), EM(161)],

    [EM(161), EM(171)],

    [EM(171), EM(181)]
  ].map(props => new EndgameMasteryConnection(props[0], props[1], props[2]));

  return connections;
}());
