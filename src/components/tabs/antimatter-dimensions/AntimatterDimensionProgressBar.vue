<script>
export default {
  name: "AntimatterDimensionProgressBar",
  data() {
    return {
      fill: 0,
      tooltip: "",
      displayPercents: "",
    };
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${(this.fill * 100).toFixed(2)}%`
      };
    }
  },
  methods: {
    // eslint-disable-next-line complexity
    update() {
      this.displayPercents = formatPercents(this.fill, 2);
      const setProgress = (current, goal, tooltip) => {
        this.fill = Decimal.clampMax(current.pLog10().div(Decimal.log10(goal)), 1).toNumber();
        this.tooltip = tooltip;
      };
      const setLinearProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current / goal, 1);
        this.tooltip = tooltip;
      };

      // Goals for challenges and challenge-like runs should come first because numbers will always be much smaller
      // than normal and therefore default filling won't be meaningful. Since challenges get completed or abandoned from
      // the inside outwards, we show the goals in that priority as well. It only makes sense to check cel6 and not the
      // others because pre-cel3 completion it'll default to e4000 and cel4/5 don't have meaningful single goals
      const inSpecialRun = (Player.isInAntimatterChallenge || EternityChallenge.isRunning || player.dilation.active ||
        Laitela.isRunning) && !Pelle.isDoomed && !player.antimatter.gte(DC.E9E15);
      if (inSpecialRun) {
        if (Player.isInAntimatterChallenge) {
          setProgress(Currency.antimatter.value, Player.antimatterChallenge.goal, "挑战进度");
        } else if (EternityChallenge.isRunning) {
          if (Perk.studyECBulk.isBought) {
            // Note: If the EC is fully complete, this prop doesn't exist
            const goal = EternityChallenge.current.gainedCompletionStatus.nextGoalAt;
            if (goal) {
              setProgress(Currency.infinityPoints.value, goal, "完成下一次永恒挑战进度");
            } else {
              // In a fully completed EC, there's nothing useful we can show so we just pin it at 100% and say so
              setProgress(Currency.infinityPoints.value, 10, "这个挑战已全部完成");
            }
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "永恒挑战进度 ");
          }
        } else if (player.dilation.active && !Pelle.isDoomed) {
          if (player.dilation.lastEP.gt(0)) {
            setProgress(Currency.antimatter.value, getTachyonReq(), "获得超光速粒子进度");
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "时间膨胀中达成永恒的进度");
          }
        } else {
          // Lai'tela destabilization; since the progress bar is logarithmically-scaled, we need to pow10 the arguments
          setProgress(Decimal.pow10(player.celestials.laitela.entropy), 10, "现实不稳定进度");
        }
      } else if (Alpha.isRunning) {
        if (player.celestials.alpha.stage === 27) {
          setProgress(Currency.eternityPoints.value, DC.E4000, "解锁现实进度");
        } else if (player.celestials.alpha.stage === 26) {
          setLinearProgress(Math.min(DilationTimeStudyState.studies.filter(u => u.isBought).length / 12, 1/3) +
            player.timestudy.theorem.div(3e9).min(1/3).toNumber() +
            Currency.eternityPoints.value.add(1).log10().div(10050).min(1/3).toNumber(), 1, "购买第八时间维度进度");
        } else if (player.celestials.alpha.stage === 25) {
          setProgress(Currency.dilatedTime.value, DC.E15, "解锁自动生成时间之理进度");
        } else if (player.celestials.alpha.stage === 24) {
          setProgress(player.dilation.active ? Currency.infinityPoints.value : DC.D1, DC.NUMMAX,
          "在时间膨胀中达到永恒进度");
        } else if (player.celestials.alpha.stage === 23) {
          setLinearProgress(player.timestudy.maxTheorem.div(38700).min(1/3).toNumber() +
            player.timestudy.theorem.div(30000).min(1/3).toNumber() +
            Math.min((EternityChallenge(11).completions + EternityChallenge(12).completions) / 30, 1/3), 1,
            "解锁时间膨胀进度");
        } else if (player.celestials.alpha.stage === 22) {
          setLinearProgress((EternityChallenge(11).isRunning ? Currency.infinityPoints.value.add(1).log10().div(
            EternityChallenge(11).currentGoal.log10()).toNumber() : 0), 1, "完成永恒挑战11进度");
        } else if (player.celestials.alpha.stage === 21) {
          setLinearProgress(player.timestudy.maxTheorem.toNumber(), 2214, "解锁永恒挑战11进度");
        } else if (player.celestials.alpha.stage === 20) {
          setLinearProgress(((TimeStudy(181).isBought && EternityChallenge(10).completions >= 1) ?
            player.timestudy.theorem.toNumber() : 0), 730, "购买时间研究192进度");
        } else if (player.celestials.alpha.stage === 19) {
          setLinearProgress(Math.min(TimeStudy(181).isBought ? player.timestudy.theorem.toNumber() / 1100 : 0, 0.5) +
            (EternityChallenge(10).isRunning ? Currency.infinityPoints.value.add(1).log10().div(
            EternityChallenge(10).currentGoal.log10().times(2)).min(0.5).toNumber() : 0), 1,
            "完成第一次永恒挑战10进度");
        } else if (player.celestials.alpha.stage === 18) {
          setLinearProgress(TimeStudy(171).isBought ? player.timestudy.theorem.toNumber() : 0, 200, "购买时间研究181进度");
        } else if (player.celestials.alpha.stage === 17) {
          let ec = [];
          for (let c = 1; c < 13; c++) {
            ec.push(EternityChallenge(c).completions);
          }
          let maxC = ec.reduce(Decimal.maxReducer).toNumber();
          let maxEC = EternityChallenges.all.first(c => c.completions === maxC);
          setLinearProgress(Math.min(maxEC.completions / 8, 0.5) +
            (maxEC.isRunning ? Currency.infinityPoints.value.add(1).log10().div(
            maxEC.currentGoal.log10().times(2)).min(0.5).toNumber() : 0), 1, "完成任意永恒挑战五次进度");
        } else if (player.celestials.alpha.stage === 16) {
          setLinearProgress(EternityChallenge(player.challenge.eternity.current)
            ? Currency.eternityPoints.value.add(1).log10().div(
              EternityChallenge(player.challenge.eternity.current).currentGoal.log10()).toNumber()
            : 0, 1, "完成任意永恒挑战一次进度");
        } else if (player.celestials.alpha.stage === 15) {
          setLinearProgress(player.timestudy.maxTheorem.toNumber(), 115, "获得115时间之理进度");
        } else if (player.celestials.alpha.stage === 14) {
          setLinearProgress(Currency.eternityPoints.value.toNumber(), 50000, "购买永恒升级3进度");
        } else if (player.celestials.alpha.stage === 13) {
          setLinearProgress(Currency.eternityPoints.value.toNumber(), 1000, "购买第四时间维度进度");
        } else if (player.celestials.alpha.stage === 12) {
          setLinearProgress(player.timestudy.maxTheorem.toNumber(), 17, "购买时间研究61进度");
        } else if (player.celestials.alpha.stage === 11) {
          setProgress(Currency.infinityPoints.value, DC.NUMMAX, "永恒进度");
        } else if (player.celestials.alpha.stage === 10) {
          setProgress(Currency.antimatter.value, DC.E60000, "解锁第八无限维度进度");
        } else if (player.celestials.alpha.stage === 9) {
          setProgress(Currency.infinityPoints.value, DC.E140, "解锁复制器进度");
        } else if (player.celestials.alpha.stage === 8) {
          setLinearProgress(InfinityChallenges.all.countWhere(u => u.isCompleted), 8, "完成全部无限挑战进度");
        } else if (player.celestials.alpha.stage === 7) {
          setLinearProgress(BreakInfinityUpgrade.all.countWhere(u => u.isBought) +
            player.infinityRebuyables.sum(), 54, "购买所有打破无限升级进度");
        } else if (player.celestials.alpha.stage === 6) {
          setProgress(Currency.infinityPoints.value, new Decimal(5e14), "购买星系增强50%升级进度");
        } else if (player.celestials.alpha.stage === 5) {
          setLinearProgress(1 / Math.log10(player.auto.bigCrunch.interval / 10), 1, "打破无限进度");
        } else if (player.celestials.alpha.stage === 4) {
          setLinearProgress(Currency.infinities.value.div(32).min(0.5).toNumber() +
            (NormalChallenge(12).isRunning ? Currency.antimatter.value.add(1).log10().div(
            Decimal.log10(DC.NUMMAX).times(2)).min(0.5).toNumber() : 0), 1, "完成挑战12进度");
        } else if (player.celestials.alpha.stage === 3) {
          setProgress(Currency.antimatter.value, DC.NUMMAX, "无限进度");
        } else if (player.celestials.alpha.stage === 2) {
          setProgress(Currency.antimatter.value, DC.E130, "购买星系进度");
        } else if (player.celestials.alpha.stage === 1) {
          setProgress(Currency.antimatter.value, DC.E40, "获得五个维度提升进度");
        } else {
          setLinearProgress(Currency.antimatter.value.add(1).log10().div(60).min(0.5).toNumber() +
            player.dimensionBoosts.div(6).min(0.5).toNumber(), 1, "获得四个维度提升进度");
        }
      } else if (Pelle.isDoomed) {
        if (Alpha.isDestroyedForDisplay) {
          setProgress(Currency.antimatter.value.add(1).log10(), DC.NUMMAX, "神性进度");
        } else if (ExpansionPacks.areUnlocked && ExpansionPacks.nextPackUnlockAM === undefined) {
          setProgress(gainedCelestialPoints(), DC.NUMMAX, "天界点数达到无限进度");
        } else if (ExpansionPacks.areUnlocked) {
          setProgress(new Decimal(Currency.antimatter.value.add(1).log10()), new Decimal(Decimal.log10(ExpansionPacks.nextPackUnlockAM)),
            "下一个天神扩展包进度");
        } else if (GalaxyGenerator.galaxies.gt(1e15)) {
          setLinearProgress(GalaxyGenerator.galaxies.toNumber(), Math.pow(2, 64), "解锁天神扩展包进度");
        } else if (PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies.gt(0)) {
          setProgress(new Decimal(Currency.antimatter.value.add(1).log10()), new Decimal(9e15), "终局进度");
        } else if (PelleStrikes.dilation.hasStrike) {
          setProgress(Currency.eternityPoints.value, DC.E4000, "解锁星系生成器进度");
        } else if (PelleStrikes.ECs.hasStrike) {
          setLinearProgress(
            (Math.min(Currency.timeTheorems.max.toNumber() / 12900, 1) +
            Math.min(EternityChallenges.completions / 60, 1)) / 2,
            1, "解锁第五佩勒裂痕进度");
        } else if (PelleStrikes.eternity.hasStrike) {
          setLinearProgress(Currency.timeTheorems.max.toNumber(), 115, "解锁第四佩勒裂痕进度");
        } else if (PelleStrikes.powerGalaxies.hasStrike) {
          setProgress(Currency.infinityPoints.value, Player.eternityGoal, "解锁第三佩勒裂痕进度");
        } else if (PelleStrikes.infinity.hasStrike) {
          if (player.break) {
            setProgress(Currency.infinityPoints.value, 5e11, "解锁第二佩勒裂痕进度");
          } else {
            setProgress(Currency.antimatter.value, DC.NUMMAX, "无限进度");
          }
        } else {
          setProgress(Currency.antimatter.value, DC.NUMMAX, "解锁第一佩勒裂痕进度");
        }
      } else if (PlayerProgress.celestialEternityUnlocked()) {
        // Show all other goals from the top down, starting at features in the highest prestige layer
        setProgress(Currency.celestialEternityPoints.value, DC.E4000, false
          ? "进入被诅咒的现实进度" : "佩勒领域进度");
      } else if (player.endgame.celDimExpansion.isBroken) {
        setProgress(Currency.celestialInfinityPoints.value, DC.NUMMAX, "天界永恒进度");
      } else if (Alpha.isDestroyedForDisplay) {
        setLinearProgress(Currency.celestialInfinityPoints.value.toNumber(), 10000, "打破天界无限进度");
      } else if (MachineHandler.baseDMCap.gt(0)) {
        setLinearProgress(player.celestials.alpha.stage, 28, "击败阿尔法进度");
      } else if (Alpha.isUnlocked) {
        setProgress(Currency.imaginaryMachines.value, DC.E1000, "重构机器进度");
      } else if (GalacticPower.isUnlocked && GalacticPower.nextPowerUnlockGP === undefined) {
        setProgress(Currency.imaginaryMachines.value, DC.NUMMAX, "解锁阿尔法进度");
      } else if (GalacticPower.isUnlocked) {
        setProgress(Currency.galacticPower.value, GalacticPower.nextPowerUnlockGP, "下一个星系之力升级进度");
      } else if (Currency.antimatter.value.gte(DC.E9E15)) {
        setProgress(Currency.singularities.value, DC.E300, "解锁星系之力进度");
      } else if (Enslaved.isCompleted) {
        setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, "下一个超立方体进度");
      } else if (PlayerProgress.dilationUnlocked()) {
        setProgress(Currency.eternityPoints.value, DC.E4000, "现实进度");
      } else if (InfinityDimension(8).isUnlocked) {
        setProgress(Currency.infinityPoints.value, Player.eternityGoal, "永恒进度");
      } else if (player.break) {
        const text = `解锁新的 ${InfinityDimensions.next().hasIPUnlock
          ? "维度种类进度"
          : "无限维度进度"}`;
        const nextID = InfinityDimensions.next();
        if (nextID.ipRequirementReached) {
          setProgress(player.records.thisEternity.maxAM, nextID.amRequirement, text);
        } else {
          setProgress(player.infinityPoints, nextID.ipRequirement, text);
        }
      } else {
        setProgress(Currency.antimatter.value, DC.NUMMAX, "无限进度");
      }
    }
  }
};
</script>

<template>
  <div class="c-progress-bar">
    <div
      :style="progressBarStyle"
      class="c-progress-bar__fill"
    >
      <span
        v-tooltip="tooltip"
        class="c-progress-bar__percents"
      >
        {{ displayPercents }}
      </span>
    </div>
  </div>
</template>
