<script>
import FailableEcText from "./FailableEcText";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "HeaderChallengeDisplay",
  components: {
    FailableEcText,
    PrimaryButton
  },
  data() {
    return {
      activityTokens: [],
      infinityUnlocked: false,
      showExit: false,
      exitText: "",
      resetCelestial: false,
      inPelle: false,
      inEndgame: false,
    };
  },
  computed: {
    parts() {
      // We need activityToken for NC/IC/EC because plain check of WhateverChallenge.isRunning
      // won't trigger display update if we, say, switch from one challenge to another
      function celestialReality(celestial, name, tab) {
        return {
          name: () => `${name}的现实`,
          isActive: token => token,
          activityToken: () => celestial.isRunning && (!Effarig.isRunning || Effarig.currentStage !== EFFARIG_STAGES.ENDGAME),
          tabName: () => tab,
        };
      }
      return [
        celestialReality(Teresa, "特蕾莎", "teresa"),
        celestialReality(Effarig, "鹿颈长", "effarig"),
        celestialReality(Enslaved, "无名氏", "enslaved"),
        celestialReality(V, "薇", "v"),
        celestialReality(Ra, "太阳神", "ra"),
        celestialReality(Laitela, "莱特拉", "laitela"),
        {
          name: () => "被毁灭的现实",
          isActive: token => token,
          activityToken: () => Pelle.isDoomed,
          tabName: () => "pelle",
        },
        celestialReality(Alpha, "阿尔法", "alpha"),
        {
          name: () => "鹿颈长的终局",
          isActive: token => token,
          activityToken: () => Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ENDGAME,
          tabName: () => "effarig",
        },
        {
          name: () => `The Void${LHC.nullifiedVoidRunning ? " (Nullified)" : ""}`,
          isActive: token => token,
          activityToken: () => LHC.voidRunning || LHC.nullifiedVoidRunning
        },
        {
          name: () => "时间膨胀",
          isActive: token => token,
          activityToken: () => player.dilation.active
        },
        {
          name: token => `永恒挑战 ${token}`,
          isActive: token => token > 0,
          activityToken: () => player.challenge.eternity.current
        },
        {
          name: token => `无限挑战 ${token}`,
          isActive: token => token > 0,
          activityToken: () => player.challenge.infinity.current
        },
        {
          name: token => `${NormalChallenge(token).config.name}普通挑战中`,
          isActive: token => token > 0,
          activityToken: () => player.challenge.normal.current
        },
      ];
    },
    activeChallengeNames() {
      const names = [];
      for (let i = 0; i < this.activityTokens.length; i++) {
        const token = this.activityTokens[i];
        const part = this.parts[i];
        if (!part.isActive(token)) continue;
        if (part.name(token).includes("永恒挑战")) {
          const currEC = player.challenge.eternity.current;
          const nextCompletion = EternityChallenge(currEC).completions + 1;
          let completionText = "";
          if (Enslaved.isRunning && currEC === 1) {
            completionText = `(${formatInt(nextCompletion)}/???)`;
          } else if (nextCompletion === 6) {
            completionText = `（已完成）`;
          } else {
            completionText = `(${formatInt(nextCompletion)}/${formatInt(5)})`;
          }
          names.push(`${part.name(token)} ${completionText}`);
        } else {
          names.push(part.name(token));
        }
      }
      return names;
    },
    isVisible() {
      return this.infinityUnlocked || this.activeChallengeNames.length > 0;
    },
    isInFailableEC() {
      return this.activeChallengeNames.some(str => str.match(/永恒挑战 (4|12)/gu));
    },
    challengeDisplay() {
      if (this.inPelle) {
        return `${this.activeChallengeNames.join(" + ")}。祝你好运`;
      }
      if (this.activeChallengeNames.length === 0) {
        return "反物质宇宙中 (没有正在进行的挑战)";
      }
      return this.activeChallengeNames.join(" + ");
    },
  },
  methods: {
    update() {
      this.infinityUnlocked = PlayerProgress.infinityUnlocked();
      this.activityTokens = this.parts.map(part => part.activityToken());
      // Dilation in Pelle can't be left once entered, but we still want to allow leaving more nested challenges
      this.showExit = this.inPelle
        ? this.activeChallengeNames.length > 1
        : this.activeChallengeNames.length !== 0;
      this.exitText = this.exitDisplay();
      this.resetCelestial = player.options.retryCelestial;
      this.inPelle = Pelle.isDoomed;
      this.inEndgame = Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ENDGAME;
    },
    // Process exit requests from the inside out; Challenges first, then dilation, then Celestial Reality. If the
    // relevant option is toggled, we pass a bunch of information over to a modal - otherwise we immediately exit
    exitButtonClicked() {
      let names, clickFn;
      const isEC = Player.anyChallenge instanceof EternityChallengeState;

      // Dilation and ECs can't be exited independently and we have a special dilation-exit modal, so we have
      // to treat that particular case differently. The dilation modal itself will account for EC state
      if (player.dilation.active && (!Player.isInAnyChallenge || isEC)) {
        if (player.options.confirmations.dilation) Modal.exitDilation.show();
        else startDilatedEternityRequest();
        return;
      }

      if (Player.isInAnyChallenge) {
        // Regex replacement is used to remove the "(X/Y)" which appears after ECs. The ternary statement is there
        // because this path gets called for NCs, ICs, and ECs
        const toExit = this.activeChallengeNames[this.activeChallengeNames.length - 1].replace(/\W+\(.*\)/u, "");
        names = { chall: toExit, normal: isEC ? "永恒" : "无限" };
        clickFn = () => {
          const oldChall = Player.anyChallenge;
          Player.anyChallenge.exit(false);
          if (player.options.retryChallenge) oldChall.requestStart();
        };
      } else {
        names = { chall: this.activeChallengeNames[0], normal: this.inEndgame ? "终局" : "现实" };
        clickFn = () => LHC.nullifiedVoidRunning ? exitNullifiedVoid() :
          (LHC.voidRunning ? exitTheVoid() : (Alpha.isRunning ? Alpha.escapeTheMatrix() :
          ((Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ENDGAME) ? Endgame.resetNoReward() :
          beginProcessReality(getRealityProps(true)))));
      }

      if (player.options.confirmations.exitChallenge) {
        Modal.exitChallenge.show(
          {
            challengeName: names.chall,
            normalName: names.normal,
            hasHigherLayers: this.inPelle || this.activeChallengeNames.length > 1,
            exitFn: clickFn
          }
        );
      } else {
        clickFn();
      }
    },
    // Bring the player to the tab related to the innermost challenge
    textClicked() {
      if (this.activeChallengeNames.length === 0) return;

      // Iterating back-to-front and breaking ensures we get the innermost restriction
      let fullName = "", celestial = "";
      for (let i = this.activityTokens.length - 1; i >= 0; i--) {
        const token = this.activityTokens[i];
        const part = this.parts[i];
        if (!part.isActive(token)) continue;
        fullName = part.name(token);
        celestial = part.tabName?.();
        break;
      }

      // Normal challenges are matched with an end-of-string metacharacter
      if (fullName.match("普通挑战")) Tab.challenges.normal.show(true);
      else if (fullName.match("无限挑战")) Tab.challenges.infinity.show(true);
      else if (fullName.match("永恒挑战")) Tab.challenges.eternity.show(true);
      else if (player.dilation.active) Tab.eternity.dilation.show(true);
      else if (LHC.voidRunning || LHC.nullifiedVoidRunning) Tab.endgame.collider.show(true);
      else Tab.celestials[celestial].show(true);
    },
    exitDisplay() {
      if (Player.isInAnyChallenge) return player.options.retryChallenge ? "重试挑战" : "放弃挑战";
      if (player.dilation.active) return "退出膨胀";
      if (LHC.voidRunning || LHC.nullifiedVoidRunning) return "Exit The Void";
      if (this.resetCelestial && this.inEndgame) return "重启终局";
      if (this.inEndgame) return "退出终局";
      if (this.resetCelestial) return "重启现实";
      return "退出天神现实";
    },
    textClassObject() {
      return {
        "l-challenge-display": true,
        "l-challenge-display--clickable": this.activeChallengeNames.length !== 0,
      };
    }
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    class="l-game-header__challenge-text"
  >
    <span
      :class="textClassObject()"
      @click="textClicked"
    >
      你现在在{{ challengeDisplay }}。
    </span>
    <FailableEcText v-if="isInFailableEC" />
    <span class="l-padding-line" />
    <PrimaryButton
      v-if="showExit"
      @click="exitButtonClicked"
    >
      {{ exitText }}
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-game-header__challenge-text {
  display: flex;
  height: 2rem;
  top: 50%;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text);
  margin: 0.5rem;
}

.l-challenge-display {
  padding: 0.5rem;
  cursor: default;
}

.l-challenge-display--clickable {
  cursor: pointer;
  user-select: none;
}

.l-challenge-display--clickable:hover {
  text-decoration: underline;
}

.l-padding-line {
  padding: 0.3rem;
}
</style>
