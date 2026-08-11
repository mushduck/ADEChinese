<script>
import EnterCelestialsRaPet from "@/components/modals/prestige/EnterCelestialsRaPet";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: new Decimal(0),
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
      alphaStage: 0,
      alphaReq: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.name}的现实`;
    },
    message() {
      return `进行一次现实重置，随后进入${this.name}。在祂的现实中，你将：`;
    },
    formatStageNum() {
      const a = this.alphaStage + 1;
      if (a % 10 === 1 && Math.floor(a / 10) !== 1) return `${a}st`;
      if (a % 10 === 2 && Math.floor(a / 10) !== 1) return `${a}nd`;
      if (a % 10 === 3 && Math.floor(a / 10) !== 1) return `${a}rd`;
      return `${a}th`;
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? `你还没有解锁特蕾莎的现实的奖励。 解锁该奖励需要购买解锁现实的时间研究，并完成一次现实。`
            : `你在特蕾莎的现实中最多获得了 ${format(this.teresaBestAM, 2, 2)} 反物质，符文献祭效果的指数 ${formatX(this.teresaRunMult, 2)}。`;
        case 1: return this.effarigDone
          ? "已完成鹿颈长的所有层级！"
          : `你现在在 ${this.effarigLayer} 层级。`;
        case 2: return this.enslavedDone
          ? "我们……的帮助……还不够……"
          : "我们……能帮一下……让我们……帮一下";
        case 3: return "";
        case 4: return `在太阳神的现实中，一些资源将基于它们的数量，生成记忆块，进而获得天神记忆。`;
        case 5: return this.laitelaFastest >= 300
          ? "你尚未完成莱特拉的该层级现实。"
          : `完成此层级的最快用时为 ${this.laitelaTime}.`;
        case 6: return "";
        case 7: return `你正在阿尔法的第 ${this.formatStageNum} 层现实，当前目标为达到 ${this.alphaReq}.`;
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult.copyFrom(Teresa.runRewardMultiplier);
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "无限", "永恒", "现实", "终局"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(new Decimal(this.laitelaFastest)).toStringShort();
      this.alphaStage = Alpha.currentStage;
      this.alphaReq = Alpha.currentStageName;
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        case 7: return Alpha.initializeRun();
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text" :class="{ 'l-alpha-text': number === 7 }">
      {{ message }}
      <br>
      <br>
      <div class="c-modal-celestial__run-effects">
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      进行挑战
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-celestial__run-effects {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}
.c-modal-celestial__run-effects__line {
  display: flex;
  margin-bottom: 0.5rem;
}

.reality-description {
  padding: 0 2rem;
}

.l-alpha-text {
  font-size: 1.2rem;
}
</style>
