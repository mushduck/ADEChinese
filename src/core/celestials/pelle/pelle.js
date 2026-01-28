import { Currency } from "../../currency";
import { DC } from "../../constants";
import { RebuyableMechanicState } from "../../game-mechanics/rebuyable";
import { SetPurchasableMechanicState } from "../../utils";

import { Quotes } from "../quotes";

import wordShift from "../../word-shift";

import zalgo from "./zalgo";


const disabledMechanicUnlocks = {
  achievements: () => ({}),
  IPMults: () => ({}),
  EPMults: () => ({}),
  galaxies: () => ({}),
  InfinitiedMults: () => ({}),
  infinitiedGen: () => ({}),
  eternityGain: () => ({}),
  eternityMults: () => ({}),
  studies: () => ({}),
  EPgen: () => ({}),
  autoec: () => ({}),
  replicantiIntervalMult: () => ({}),
  tpMults: () => ({}),
  glyphs: () => !PelleRifts.vacuum.milestones[0].canBeApplied,
  V: () => ({}),
  singularity: () => ({}),
  alchemy: () => ({}),
  achievementMult: () => ({}),
  blackhole: () => ({}),
  effarig: () => ({}),
  imaginaryUpgrades: () => ({}),
  glyphsac: () => ({}),
  antimatterDimAutobuyer1: () => PelleUpgrade.antimatterDimAutobuyers1,
  antimatterDimAutobuyer2: () => PelleUpgrade.antimatterDimAutobuyers1,
  antimatterDimAutobuyer3: () => PelleUpgrade.antimatterDimAutobuyers1,
  antimatterDimAutobuyer4: () => PelleUpgrade.antimatterDimAutobuyers1,
  antimatterDimAutobuyer5: () => PelleUpgrade.antimatterDimAutobuyers2,
  antimatterDimAutobuyer6: () => PelleUpgrade.antimatterDimAutobuyers2,
  antimatterDimAutobuyer7: () => PelleUpgrade.antimatterDimAutobuyers2,
  antimatterDimAutobuyer8: () => PelleUpgrade.antimatterDimAutobuyers2,
  tickspeedAutobuyer: () => PelleUpgrade.tickspeedAutobuyer,
  dimBoostAutobuyer: () => PelleUpgrade.dimBoostAutobuyer,
  galaxyAutobuyer: () => PelleUpgrade.galaxyAutobuyer,
  timeTheoremAutobuyer: () => ({}),
  rupg10: () => ({}),
  dtMults: () => ({}),
  chargedInfinityUpgrades: () => ({}),
  alteration: () => ({}),
  timeTheorems: () => ({})
};

export const Pelle = {
  symbol: "♅",
  // Suppress the randomness for this form
  possessiveName: "Pelle's",

  // This is called upon initial Dooming and after every Armageddon when using the modal
  initializeRun() {
    if (this.isDoomed) {
      Pelle.armageddon(true);
      return;
    }

    Glyphs.harshAutoClean();
    if (!Glyphs.unequipAll()) {
      Modal.hideAll();
      Modal.message.show(`Dooming your Reality will unequip your Glyphs. Some of your
        Glyphs could not be unequipped due to lack of inventory space.`, 1);
      return;
    }
    Glyphs.harshAutoClean();
    if (Glyphs.freeInventorySpace < 5) {
      Modal.hideAll();
      Modal.message.show(`You must have enough empty unprotected Glyph slots for
        ${formatInt(5)} additional Glyphs in order to Doom your Reality.`, 1);
      return;
    }
    for (const type of BASIC_GLYPH_TYPES) Glyphs.addToInventory(GlyphGenerator.doomedGlyph(type));
    Glyphs.refreshActive();
    player.options.confirmations.glyphReplace = true;
    player.reality.automator.state.repeat = false;
    player.reality.automator.state.forceRestart = false;
    if (BlackHoles.arePaused) BlackHoles.togglePause();
    player.celestials.pelle.doomed = true;
    Pelle.armageddon(false);
    respecTimeStudies(true);
    Currency.infinityPoints.reset();
    player.IPMultPurchases = 0;
    Autobuyer.bigCrunch.mode = AUTO_CRUNCH_MODE.AMOUNT;
    disChargeAll();
    clearCelestialRuns();
    CelestialDimensions.resetAmount();
    player.records.thisEndgame.peakGameSpeed = DC.D1;
    player.requirementChecks.endgame.noGlyphsDoomed = true;
    player.celestials.enslaved.stored = DC.D0;

    // Force-enable the group toggle for AD autobuyers to be active; whether or not they can actually tick
    // is still handled through if the autobuyers are unlocked at all. This fixes an odd edge case where the player
    // enters cel7 with AD autobuyers disabled - AD autobuyers need to be reupgraded, but the UI component
    // for the group toggle is hidden until they're all re-upgraded to the max again.
    player.auto.antimatterDims.isActive = true;

    player.records.realTimeDoomed = 0;
    if (!PelleAlchemyUpgrade.alchemyPower.isBought) player.celestials.ra.alchemy[0].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyInfinity.isBought) player.celestials.ra.alchemy[1].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyTime.isBought) player.celestials.ra.alchemy[2].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyReplication.isBought) player.celestials.ra.alchemy[3].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyDilation.isBought) player.celestials.ra.alchemy[4].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyEffarig.isBought) player.celestials.ra.alchemy[5].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyCardinality.isBought) player.celestials.ra.alchemy[6].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyEternity.isBought) player.celestials.ra.alchemy[7].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyDimensionality.isBought) player.celestials.ra.alchemy[8].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyInflation.isBought) player.celestials.ra.alchemy[9].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyAlternation.isBought) player.celestials.ra.alchemy[10].amount = 0;
    if (!PelleAlchemyUpgrade.alchemySynergism.isBought) player.celestials.ra.alchemy[11].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyDecoherence.isBought) player.celestials.ra.alchemy[12].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyMomentum.isBought) player.celestials.ra.alchemy[13].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyMultiversal.isBought) player.celestials.ra.alchemy[14].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyForce.isBought) player.celestials.ra.alchemy[15].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyExponential.isBought) player.celestials.ra.alchemy[16].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyUncountability.isBought) player.celestials.ra.alchemy[17].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyBoundless.isBought) player.celestials.ra.alchemy[18].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyUnpredictability.isBought) player.celestials.ra.alchemy[19].amount = 0;
    if (!PelleAlchemyUpgrade.alchemyReality.isBought) player.celestials.ra.alchemy[20].amount = 0;
    AutomatorBackend.stop();

    // Force-unhide all tabs except for the shop tab, for which we retain the hide state instead
    const shopTab = ~1 & (1 << GameDatabase.tabs.find(t => t.key === "shop").id);
    player.options.hiddenTabBits &= shopTab;

    // Force unhide MOST subtabs, although some of the tabs get ignored since they don't contain any
    // meaningful interactable gameplay elements in Doomed
    const tabsToIgnore = ["statistics", "achievements", "reality", "celestials"];
    const ignoredIDs = GameDatabase.tabs.filter(t => tabsToIgnore.includes(t.key)).map(t => t.id);
    for (let tabIndex = 0; tabIndex < GameDatabase.tabs.length; tabIndex++) {
      player.options.hiddenSubtabBits[tabIndex] &= ignoredIDs.includes(tabIndex) ? -1 : 0;
    }
    Pelle.quotes.initial.show();
    if (player.endgames >= 1) {
      Pelle.quotes.doom2.show();
    }
    if (player.endgames >= 2) {
      Pelle.quotes.doom3.show();
    }
    if (player.endgame.doomedParticles.gte(1e10)) {
      Pelle.quotes.doomE10DP.show();
    }
    if (player.endgame.doomedParticles.gte(1e55)) {
      Pelle.quotes.doomE55DP.show();
    }
    GameStorage.save(true);
  },

  get displayName() {
    return Date.now() % 4000 > 500 ? "Pelle" : wordShift.randomCrossWords("Pelle");
  },

  get isUnlocked() {
    return ImaginaryUpgrade(25).isBought;
  },
  // This will check if a specific mechanic is disabled, like old PelleFlag(x).isActive,
  // Initially it will only have isDoomed check but we will have upgrades that let you get stuff back
  isDisabled(mechanic) {
    if (!this.isDoomed) return false;

    if (!mechanic) return true;
    if (!disabledMechanicUnlocks[mechanic]) {
      // eslint-disable-next-line
      console.error(`Mechanic ${mechanic} isn't present in the disabledMechanicUnlocks!`);
      return true;
    }

    const upgrade = disabledMechanicUnlocks[mechanic]();

    if (typeof upgrade === "boolean") {
      return upgrade;
    }

    return Boolean(!upgrade.canBeApplied);
  },

  get canArmageddon() {
    return this.remnantsGain >= 1;
  },

  armageddon(gainStuff) {
    if (!this.canArmageddon && gainStuff) return;
    EventHub.dispatch(GAME_EVENT.ARMAGEDDON_BEFORE, gainStuff);
    if (gainStuff) {
      this.cel.remnants += this.remnantsGain;
    }
    finishProcessReality({ reset: true, armageddon: true });
    disChargeAll();
    player.celestials.enslaved.isStoringReal = false;
    player.celestials.enslaved.autoStoreReal = false;
    if (PelleStrikes.dilation.hasStrike && !PelleStrikes.dilation.isDestroyed()) player.dilation.active = true;
    EventHub.dispatch(GAME_EVENT.ARMAGEDDON_AFTER, gainStuff);
  },

  gameLoop(diff) {
    if (this.isDoomed) {
      Currency.realityShards.add(this.realityShardGainPerSecond.times(diff).div(1000));
      PelleRifts.all.forEach(r => r.fill(diff));
    }
  },

  get cel() {
    return player.celestials.pelle;
  },

  get isDoomed() {
    return this.cel.doomed;
  },

  get disabledAchievements() {
    let remainingAchs = [];
    if (!PelleAchievementUpgrade.achievement37.isBought) remainingAchs.push(37);
    if (!PelleAchievementUpgrade.achievement54.isBought) remainingAchs.push(54);
    if (!PelleAchievementUpgrade.achievement55.isBought) remainingAchs.push(55);
    if (!PelleAchievementUpgrade.achievement65.isBought) remainingAchs.push(65);
    if (!PelleAchievementUpgrade.achievement74.isBought) remainingAchs.push(74);
    if (!PelleAchievementUpgrade.achievement76.isBought) remainingAchs.push(76);
    if (!PelleAchievementUpgrade.achievement78.isBought) remainingAchs.push(78);
    if (!PelleAchievementUpgrade.achievement81.isBought) remainingAchs.push(81);
    if (!PelleAchievementUpgrade.achievement85.isBought) remainingAchs.push(85);
    if (!PelleAchievementUpgrade.achievement87.isBought) remainingAchs.push(87);
    if (!PelleAchievementUpgrade.achievement91.isBought) remainingAchs.push(91);
    if (!PelleAchievementUpgrade.achievement92.isBought) remainingAchs.push(92);
    if (!PelleAchievementUpgrade.achievement93.isBought) remainingAchs.push(93);
    if (!PelleAchievementUpgrade.achievement95.isBought) remainingAchs.push(95);
    if (!PelleAchievementUpgrade.achievement102.isBought) remainingAchs.push(102);
    if (!PelleAchievementUpgrade.achievement103.isBought) remainingAchs.push(103);
    if (!PelleAchievementUpgrade.achievement104.isBought) remainingAchs.push(104);
    if (!PelleAchievementUpgrade.achievement111.isBought) remainingAchs.push(111);
    if (!PelleAchievementUpgrade.achievement113.isBought) remainingAchs.push(113);
    if (!PelleAchievementUpgrade.achievement116.isBought) remainingAchs.push(116);
    if (!PelleAchievementUpgrade.achievement117.isBought) remainingAchs.push(117);
    if (!PelleAchievementUpgrade.achievement118.isBought) remainingAchs.push(118);
    if (!PelleAchievementUpgrade.achievement125.isBought) remainingAchs.push(125);
    if (!PelleAchievementUpgrade.achievement131.isBought) remainingAchs.push(131);
    if (!PelleAchievementUpgrade.achievement132.isBought) remainingAchs.push(132);
    if (!PelleAchievementUpgrade.achievement133.isBought) remainingAchs.push(133);
    if (!PelleAchievementUpgrade.achievement134.isBought) remainingAchs.push(134);
    if (!PelleAchievementUpgrade.achievement137.isBought) remainingAchs.push(137);
    if (!PelleAchievementUpgrade.achievement141.isBought) remainingAchs.push(141);
    if (!PelleAchievementUpgrade.achievement142.isBought) remainingAchs.push(142);
    if (!PelleAchievementUpgrade.achievement143.isBought) remainingAchs.push(143);
    if (!PelleAchievementUpgrade.achievement156.isBought) remainingAchs.push(156);
    if (!PelleAchievementUpgrade.achievement164.isBought) remainingAchs.push(164);
    return remainingAchs;
  },

  get uselessInfinityUpgrades() {
    let remainingInfUpgs = [];
    if (!PelleDestructionUpgrade.passiveIPGen.isBought) remainingInfUpgs.push("passiveGen");
    if (!PelleDestructionUpgrade.passiveInfGen.isBought) remainingInfUpgs.push("infinitiedGeneration");
    if (!PelleDestructionUpgrade.x2IPUpgrade.isBought) remainingInfUpgs.push("ipMult");
    return remainingInfUpgs;
  },

  get uselessTimeStudies() {
    let remainingTSs = [];
    if (!PelleDestructionUpgrade.timestudy32.isBought) remainingTSs.push(32);
    if (!PelleDestructionUpgrade.timestudy33.isBought) remainingTSs.push(33);
    if (!PelleDestructionUpgrade.timestudy41.isBought) remainingTSs.push(41);
    if (!PelleDestructionUpgrade.timestudy51.isBought) remainingTSs.push(51);
    if (!PelleDestructionUpgrade.timestudy61.isBought) remainingTSs.push(61);
    if (!PelleDestructionUpgrade.timestudy62.isBought) remainingTSs.push(62);
    if (!PelleDestructionUpgrade.timestudy121.isBought) remainingTSs.push(121);
    if (!PelleDestructionUpgrade.timestudy122.isBought) remainingTSs.push(122);
    if (!PelleDestructionUpgrade.timestudy123.isBought) remainingTSs.push(123);
    if (!PelleDestructionUpgrade.timestudy141.isBought) remainingTSs.push(141);
    if (!PelleDestructionUpgrade.timestudy142.isBought) remainingTSs.push(142);
    if (!PelleDestructionUpgrade.timestudy143.isBought) remainingTSs.push(143);
    if (!PelleDestructionUpgrade.timestudy192.isBought) remainingTSs.push(192);
    if (!PelleDestructionUpgrade.timestudy213.isBought) remainingTSs.push(213);
    return remainingTSs;
  },

  get disabledRUPGs() {
    let remainingRUs = [];
    if (!PelleRealityUpgrade.temporalAmplifier.isBought) remainingRUs.push(1);
    if (!PelleRealityUpgrade.replicativeAmplifier.isBought) remainingRUs.push(2);
    if (!PelleRealityUpgrade.eternalAmplifier.isBought) remainingRUs.push(3);
    if (!PelleRealityUpgrade.superluminalAmplifier.isBought) remainingRUs.push(4);
    if (!PelleRealityUpgrade.boundlessAmplifier.isBought) remainingRUs.push(5);
    if (!PelleRealityUpgrade.cosmicallyDuplicate.isBought) remainingRUs.push(6);
    if (!PelleRealityUpgrade.innumerablyConstruct.isBought) remainingRUs.push(7);
    if (!PelleRealityUpgrade.paradoxicallyAttain.isBought) remainingRUs.push(8);
    if (!PelleRealityUpgrade.linguisticallyExpand.isBought) remainingRUs.push(9);
    if (!PelleRealityUpgrade.existentiallyProlong.isBought) remainingRUs.push(10);
    if (!PelleRealityUpgrade.boundlessFlow.isBought) remainingRUs.push(11);
    if (!PelleRealityUpgrade.knowingExistence.isBought) remainingRUs.push(12);
    if (!PelleRealityUpgrade.telemechanicalProcess.isBought) remainingRUs.push(13);
    if (!PelleRealityUpgrade.eternalFlow.isBought) remainingRUs.push(14);
    if (!PelleRealityUpgrade.paradoxicalForever.isBought) remainingRUs.push(15);
    if (!PelleRealityUpgrade.scourToEmpower.isBought) remainingRUs.push(19);
    if (!PelleRealityUpgrade.parityOfSingularity.isBought) remainingRUs.push(20);
    if (!PelleRealityUpgrade.temporalTranscendence.isBought) remainingRUs.push(22);
    if (!PelleRealityUpgrade.replicativeRapidity.isBought) remainingRUs.push(23);
    if (!PelleRealityUpgrade.syntheticSymbolism.isBought) remainingRUs.push(24);
    return remainingRUs;
  },

  get uselessPerks() {
    let remainingPerks = [];
    if (!PellePerkUpgrade.perkSAM.isBought) remainingPerks.push(10);
    if (!PellePerkUpgrade.perkSIP1.isBought) remainingPerks.push(12);
    if (!PellePerkUpgrade.perkSIP2.isBought) remainingPerks.push(13);
    if (!PellePerkUpgrade.perkSEP1.isBought) remainingPerks.push(14);
    if (!PellePerkUpgrade.perkSEP2.isBought) remainingPerks.push(15);
    if (!PellePerkUpgrade.perkSEP3.isBought) remainingPerks.push(16);
    if (!PellePerkUpgrade.perkSTP.isBought) remainingPerks.push(17);
    if (!PellePerkUpgrade.perkANR.isBought) remainingPerks.push(30);
    if (!PellePerkUpgrade.perkEU1.isBought) remainingPerks.push(40);
    if (!PellePerkUpgrade.perkEU2.isBought) remainingPerks.push(41);
    if (!PellePerkUpgrade.perkDU1.isBought) remainingPerks.push(42);
    if (!PellePerkUpgrade.perkDU2.isBought) remainingPerks.push(43);
    if (!PellePerkUpgrade.perkATT.isBought) remainingPerks.push(44);
    if (!PellePerkUpgrade.perkATD.isBought) remainingPerks.push(45);
    if (!PellePerkUpgrade.perkATD.isBought) remainingPerks.push(46);
    if (!PellePerkUpgrade.perkIDR.isBought) remainingPerks.push(51);
    if (!PellePerkUpgrade.perkTGR.isBought) remainingPerks.push(52);
    if (!PellePerkUpgrade.perkDILR.isBought) remainingPerks.push(53);
    if (!PellePerkUpgrade.perkPEC1.isBought) remainingPerks.push(60);
    if (!PellePerkUpgrade.perkPEC2.isBought) remainingPerks.push(61);
    if (!PellePerkUpgrade.perkPEC3.isBought) remainingPerks.push(62);
    if (!PellePerkUpgrade.perkTP1.isBought) remainingPerks.push(80);
    if (!PellePerkUpgrade.perkTP2.isBought) remainingPerks.push(81);
    if (!PellePerkUpgrade.perkTP3.isBought) remainingPerks.push(82);
    if (!PellePerkUpgrade.perkTP4.isBought) remainingPerks.push(83);
    if (!PellePerkUpgrade.perkDAU.isBought) remainingPerks.push(100);
    if (!PellePerkUpgrade.perkDAS.isBought) remainingPerks.push(103);
    if (!PellePerkUpgrade.perkTTS.isBought) remainingPerks.push(104);
    if (!PellePerkUpgrade.perkTTF.isBought) remainingPerks.push(105);
    if (!PellePerkUpgrade.perkTTM.isBought) remainingPerks.push(106);
    if (!PellePerkUpgrade.perkDILR.isBought) remainingPerks.push(201);
    if (!PellePerkUpgrade.perkDILR.isBought) remainingPerks.push(202);
    if (!PellePerkUpgrade.perkDILR.isBought) remainingPerks.push(203);
    if (!PellePerkUpgrade.perkDILR.isBought) remainingPerks.push(204);
    return remainingPerks;
  },

  get specialGlyphEffect() {
    const isUnlocked = this.isDoomed && PelleRifts.chaos.milestones[1].canBeApplied;
    const description = this.getSpecialGlyphEffectDescription(this.activeGlyphType);
    const isActive = type => isUnlocked && this.activeGlyphType === type;
    return {
      isUnlocked,
      description,
      infinity: (isActive("infinity") && (player.challenge.eternity.current <= 8 || PelleDestructionUpgrade.pelleGlyphEffects.isBought))
        ? Currency.infinityPoints.value.plus(1).pow(0.2)
        : DC.D1,
      time: isActive("time")
        ? Currency.eternityPoints.value.plus(1).pow(0.3)
        : DC.D1,
      replication: isActive("replication")
        ? Math.min(10 ** 60 ** (PelleRifts.vacuum.percentage), 1e300)
        : 1,
      dilation: isActive("dilation")
        ? Decimal.pow(player.dilation.totalTachyonGalaxies, 1.5).max(1)
        : DC.D1,
      power: isActive("power")
        ? 1.02
        : 1,
      companion: isActive("companion")
        ? 1.34
        : 1,
      isScaling: () => ["infinity", "time", "replication", "dilation"].includes(this.activeGlyphType),
    };
  },
  getSpecialGlyphEffectDescription(type) {
    switch (type) {
      case "infinity":
        return `Infinity Point gain ${(player.challenge.eternity.current <= 8 || PelleDestructionUpgrade.pelleGlyphEffects.isBought)
          ? formatX(Currency.infinityPoints.value.plus(1).pow(0.2), 2)
          : formatX(DC.D1, 2)} (based on current IP)`;
      case "time":
        return `Eternity Point gain ${formatX(Currency.eternityPoints.value.plus(1).pow(0.3), 2)}
          (based on current EP)`;
      case "replication":
        return `Replication speed ${formatX(Math.min(10 ** 60 ** (PelleRifts.vacuum.percentage), 1e300), 2)} \
        (based on ${wordShift.wordCycle(PelleRifts.vacuum.name)})`;
      case "dilation":
        return `Dilated Time gain ${formatX(Decimal.pow(player.dilation.totalTachyonGalaxies, 1.5).max(1), 2)}
          (based on Tachyon Galaxies)`;
      case "power":
        return `Galaxies are ${formatPercents(0.02)} stronger`;
      case "companion":
        return `You feel ${formatPercents(0.34)} better`;
      // Undefined means that there is no glyph equipped, needs to be here since this function is used in
      // both Current Glyph Effects and Glyph Tooltip
      case undefined:
        return "No Glyph equipped!";
      default:
        return PelleDestructionUpgrade.specialGlyphEffects.isBought
          ? "This Glyph has no Pelle-exclusive effect! That sucks."
          : "You cannot equip this Glyph while Doomed!";
    }
  },

  get remnantRequirementForDilation() {
    return 3.8e7;
  },

  get canDilateInPelle() {
    return this.cel.remnants >= this.remnantRequirementForDilation;
  },

  resetResourcesForDilation() {
    this.cel.records.totalEndgameAntimatter = new Decimal("1e180000");
    this.cel.records.totalInfinityPoints = new Decimal("1e60000");
    Currency.eternityPoints.reset();
    // Oddly specific number? Yes, it's roughly the amount of EP you have
    // when starting dilation for the first time
    // Since 5th strike previously did not reset your current EP the previous reset value was kind of useless which
    // lead to some balancing problems, this hopefully prevents people starting dilation too early and getting
    // softlocked, or starting it too late and getting not-softlocked.
    this.cel.records.totalEternityPoints = new Decimal("1e1050");
  },

  get remnantsGain() {
    let am = this.cel.records.totalEndgameAntimatter.plus(1).log10();
    let ip = this.cel.records.totalInfinityPoints.plus(1).log10();
    let ep = this.cel.records.totalEternityPoints.plus(1).log10();

    if (PelleStrikes.dilation.hasStrike) {
      am *= 500;
      ip *= 10;
      ep *= 5;
    }

    if (EndgameMilestone.remnantFormula.isReached) {
      am *= 10000;
      ip *= 500;
      ep *= 25;
    }

    const gainOld = (
      (Math.log10(am + 2) + Math.log10(ip + 2) + Math.log10(ep + 2)) / 1.7
    ) ** 8;

    const gainNew = (
      (Math.log10(am + 2) + Math.log10(ip + 2) + Math.log10(ep + 2)) / 1.6
    ) ** 8.2;

    const gain = EndgameMilestone.remnantFormula.isReached ? gainNew : gainOld;
    
    return gain < 1 ? gain : Math.floor(gain - this.cel.remnants);
  },

  realityShardGain(remnants) {
    return Decimal.pow(10, remnants ** (1 / 8) * 4).minus(1).div(1e3);
  },

  get realityShardGainPerSecond() {
    return this.realityShardGain(this.cel.remnants);
  },

  get nextRealityShardGain() {
    return this.realityShardGain(this.remnantsGain + this.cel.remnants);
  },

  // Calculations assume this is in units of proportion per second (eg. 0.03 is 3% drain per second)
  get riftDrainPercent() {
    const extraDrain = Math.min(0.45, player.endgames * 0.05);
    if (EndgameMilestone.riftFill.isReached) return 0.05 + extraDrain;
    return 0.05;
  },

  get glyphMaxLevel() {
    return PelleUpgrade.glyphLevels.effectValue;
  },

  get glyphStrength() {
    return 1;
  },

  antimatterDimensionMult(x) {
    return Decimal.pow(10, Math.log10(x + 1) + x ** 5 / 1e3 + 4 ** x / 1e18);
  },

  get activeGlyphType() {
    return Glyphs.active.filter(Boolean)[0]?.type;
  },

  get hasGalaxyGenerator() {
    return player.celestials.pelle.galaxyGenerator.unlocked;
  },

  // Transition text from "from" to "to", stage is 0-1, 0 is fully "from" and 1 is fully "to"
  // Also adds more zalgo the bigger the stage
  transitionText(from, to, stage = 0) {
    const len = Math.round((from.length * (1 - stage) + to.length * stage) * 1e8) / 1e8;
    const toInterval = len * (1 - stage);
    let req = toInterval;
    let str = "";
    for (let i = 0; i < len; i++) {
      if (i >= req) {
        const idx = Math.floor(i * (to.length / len));
        str += to[idx];
        req += toInterval;
      } else {
        const idx = Math.floor(i * (from.length / len));
        str += from[idx];
      }
    }
    return zalgo(str, Math.floor(stage ** 2 * 7));
  },
  
  get endTabNames() {
    if (Achievement(191).isUnlocked) {
      return "Destruction Has Come A New Beginning Has Arrived We'll Meet Again".split(" ");
    } else {
      return "It's Not Over We Will Return We'll Ω Soon Meet Again".split(" ");
    }
  },
  
  quotes: Quotes.pelle,
};

EventHub.logic.on(GAME_EVENT.ARMAGEDDON_AFTER, () => {
  if (Currency.remnants.gte(1)) {
    Pelle.quotes.arm.show();
  }
});
EventHub.logic.on(GAME_EVENT.PELLE_STRIKE_UNLOCKED, () => {
  if (PelleStrikes.infinity.hasStrike) {
    Pelle.quotes.strike1.show();
  }
  if (PelleStrikes.powerGalaxies.hasStrike) {
    Pelle.quotes.strike2.show();
  }
  if (PelleStrikes.eternity.hasStrike) {
    Pelle.quotes.strike3.show();
  }
  if (PelleStrikes.ECs.hasStrike) {
    Pelle.quotes.strike4.show();
  }
  if (PelleStrikes.dilation.hasStrike) {
    Pelle.quotes.strike5.show();
  }
});
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  if (GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd) Pelle.quotes.endgame.show();
});
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  if (player.celestials.pelle.records.totalEndgameAntimatter.gte(DC.E9E15) && player.endgames >= 1) Pelle.quotes.end2.show();
});
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  if (Pelle.isDoomed && (PelleAchievementUpgrade.all.filter(u => u.isBought).length >= 1 || PelleDestructionUpgrade.all.filter(u => u.isBought).length >= 1)) {
    Pelle.quotes.disable.show();
  }
  if (Pelle.isDoomed && PelleDestructionUpgrade.disableGalaxyNerf.isBought) {
    Pelle.quotes.galaxyDebuffDisable.show();
  }
  if (Pelle.isDoomed && Achievement(194).isUnlocked) {
    Pelle.quotes.allPelleAchs.show();
  }
  if (Pelle.isDoomed && Achievement(195).isUnlocked) {
    Pelle.quotes.allPelleNerfs.show();
  }
});
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  if (PelleStrikeUpgrade.all.filter(u => u.isBought).length >= 1) Pelle.quotes.strikeDisable1.show();
  if (PelleStrikeUpgrade.all.filter(u => u.isBought).length >= 2) Pelle.quotes.strikeDisable2.show();
  if (PelleStrikeUpgrade.all.filter(u => u.isBought).length >= 3) Pelle.quotes.strikeDisable3.show();
  if (PelleStrikeUpgrade.all.filter(u => u.isBought).length >= 4) Pelle.quotes.strikeDisable4.show();
  if (PelleStrikeUpgrade.all.filter(u => u.isBought).length >= 5) Pelle.quotes.strikeDisable5.show();
});
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => {
  if (Glyphs.activeWithoutCompanion.length > 0) player.requirementChecks.endgame.noGlyphsDoomed = false;
});

export class RebuyablePelleUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.realityShards;
  }

  get boughtAmount() {
    return player.celestials.pelle.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.celestials.pelle.rebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount >= this.config.cap;
  }

  get isCustomEffect() { return true; }

  get effectValue() {
    return this.config.effect(this.boughtAmount);
  }

  onPurchased() {
    if (this.id === "glyphLevels") EventHub.dispatch(GAME_EVENT.GLYPHS_CHANGED);
  }
}

export class PelleUpgradeState extends SetPurchasableMechanicState {

  get set() {
    return player.celestials.pelle.upgrades;
  }

  get currency() {
    return Currency.realityShards;
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return this.config.cost;
  }

  get isAvailableForPurchase() {
    return Pelle.isDoomed;
  }

}

export const PelleUpgrade = mapGameDataToObject(
  GameDatabase.celestials.pelle.upgrades,
  config => (config.rebuyable
    ? new RebuyablePelleUpgradeState(config)
    : new PelleUpgradeState(config)
  )
);

PelleUpgrade.rebuyables = PelleUpgrade.all.filter(u => u.isRebuyable);
// An upgrade was added post-release; it's simpler to just sort them by cost rather than to migrate the internal data
PelleUpgrade.singles = PelleUpgrade.all.filter(u => !u.isRebuyable).sort((a, b) => a.cost - b.cost);
