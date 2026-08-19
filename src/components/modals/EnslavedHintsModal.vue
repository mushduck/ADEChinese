<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "EnslavedHintsModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      currentStored: new Decimal(0),
      nextHintCost: new Decimal(0),
      canGetHint: false,
      shownEntries: [],
      realityHintsLeft: 0,
      glyphHintsLeft: 0,
      hints: 0,
    };
  },
  computed: {
    hintCost() {
      return `${quantify("年", TimeSpan.fromMilliseconds(new Decimal(this.nextHintCost)).totalYears, 2)}`;
    },
    formattedStored() {
      return `${quantify("年", TimeSpan.fromMilliseconds(new Decimal(this.currentStored)).totalYears, 2)}`;
    },
    hasProgress(id) {
      return this.progressEntries.some(entry => entry.id === id);
    },
    // Note: This calculation seems to behave extremely poorly if the goal has been raised more than 12 hints worth
    // of cost bumps and I'm not entirely sure why. There's probably a numerical issue I can't quite figure out, but
    // considering that much cost raising can't happen in practice I think I'm just going to leave it be.
    timeEstimate() {
      if (this.currentStored.gte(new Decimal(this.nextHintCost))) return "";

      // Relevant values are stored as milliseconds, so multiply the rate by 1000 to get to seconds
      const storeRate = new Decimal(1000).times(Enslaved.isStoringGameTime
        ? Enslaved.currentBlackHoleStoreAmountPerMs
        : getGameSpeedupFactor());
      const alreadyWaited = this.currentStored.div(storeRate);
      const decaylessTime = new Decimal(this.nextHintCost).div(storeRate);

      // Check if decay is irrelevant and don't do the hard calculations if so
      const minCostEstimate = (TimeSpan.fromYears(new Decimal(1e40)).totalMilliseconds.sub(this.currentStored)).div(storeRate);
      if (TimeSpan.fromSeconds(minCostEstimate).totalDays.toNumber() > this.hints) {
        return `${TimeSpan.fromSeconds(minCostEstimate).toStringShort(true)}`;
      }

      // Decay is 3x per day, but the math needs decay per second
      const K = Decimal.pow(3, 1 / 86400);
      const x = decaylessTime.times(Decimal.ln(K)).times(Decimal.pow(K, alreadyWaited)).toNumber();
      const timeToGoal = new Decimal(productLog(x)).div(Decimal.ln(K)).sub(alreadyWaited);
      return `${TimeSpan.fromSeconds(timeToGoal).toStringShort(true)}`;
    }
  },
  methods: {
    update() {
      this.currentStored.copyFrom(player.celestials.enslaved.stored);
      this.nextHintCost.copyFrom(Enslaved.nextHintCost);
      this.canGetHint = this.currentStored.gte(new Decimal(this.nextHintCost));
      this.shownEntries = [];

      this.realityHintsLeft = EnslavedProgress.all.length;
      for (const prog of EnslavedProgress.all) {
        if (prog.hasHint) {
          this.shownEntries.push([false, prog]);
          this.realityHintsLeft--;
        }
      }

      const glyphHintCount = player.celestials.enslaved.glyphHintsGiven;
      for (let hintNum = 0; hintNum < glyphHintCount; hintNum++) {
        this.shownEntries.push([true, GameDatabase.celestials.enslaved.glyphHints[hintNum]]);
      }
      this.glyphHintsLeft = GameDatabase.celestials.enslaved.glyphHints.length - glyphHintCount;

      this.hints = Enslaved.hintCostIncreases;
    },
    giveRealityHint(available) {
      if (available <= 0 || !Enslaved.spendTimeForHint()) return;
      EnslavedProgress.all.filter(prog => !prog.hasHint).randomElement().unlock();
    },
    giveGlyphHint(available) {
      if (available <= 0 || !Enslaved.spendTimeForHint()) return;
      player.celestials.enslaved.glyphHintsGiven++;
    }
  },

};
</script>

<template>
  <ModalWrapper>
    <template #header>
      无名氏的现实中的裂缝
    </template>
    <div class="c-enslaved-hint-modal c-modal--short">
      <div>
        这个现实似乎在抵抗你为了能完成它所付出的努力。你已经完成了这些事情：
      </div>
      <br>
      <div
        v-for="(entry, index) in shownEntries"
        :key="index"
      >
        <div v-if="!entry[0]">
          <span v-if="entry[1].hasHint && !entry[1].hasProgress">
            <i class="c-icon-wrapper fas fa-question-circle" />
            <b>你还没搞明白这个提示意味着什么。</b>
          </span>
          <span v-else>
            <i class="c-icon-wrapper fa-solid fa-house-crack" />
            <b>无名氏的现实中出现了一个裂缝！</b>
          </span>
          <br>
          - {{ entry[1].hintInfo }}
          <br>
          - {{ entry[1].hasProgress ? entry[1].completedInfo : "?????" }}
        </div>
        <div v-else>
          <i class="fa-solid fa-shapes" /> <b>符文提示：</b>
          <br>
          {{ entry[1] }}
        </div>
        <br>
      </div>
      <div v-if="realityHintsLeft + glyphHintsLeft > 0">
        你可以花些时间寻找现实中的更多裂缝，但每个提示花费的存储时间将使下一次所需的存储时间增加{{ formatInt(3) }}倍。这个价格增加将在{{ formatInt(24) }}小时内逐渐消失，弄清提示的含义将立即将价格除以{{ formatInt(2) }}。价格不能降到低于{{ format(1e40) }}年。
        <br><br>
        下一个提示将花费{{ hintCost }}的存储时间。你目前有{{ formattedStored }}。
        <span v-if="currentStored < nextHintCost">
          如果你为黑洞充能{{ timeEstimate }}，将获得此提示。
        </span>
        <br><br>
        <PrimaryButton
          :enabled="realityHintsLeft > 0 && canGetHint"
          class="l-enslaved-hint-button"
          @click="giveRealityHint(realityHintsLeft)"
        >
          获得一个关于这个现实本身的提示（还有 {{ formatInt(realityHintsLeft) }} 个）
        </PrimaryButton>
        <br>
        <PrimaryButton
          :enabled="glyphHintsLeft > 0 && canGetHint"
          class="l-enslaved-hint-button"
          @click="giveGlyphHint(glyphHintsLeft)"
        >
          获得一个关于符文配置的提示（还有 {{ formatInt(glyphHintsLeft) }} 个）
        </PrimaryButton>
      </div>
      <div v-else>
        <b>没有更多的提示了。</b>
      </div>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.c-icon-wrapper {
  margin-right: 1rem;
}

.l-enslaved-hint-button {
  margin: 0.4rem 0;
}
</style>
