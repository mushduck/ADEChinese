<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModifySeedModal",
  components: {
    ModalWrapper,
    PrimaryButton,
  },
  data() {
    return {
      mode: 0,
      inputSeed: "",
      seedText: "",
      convertedInput: false,
      seedValue: 0,
    };
  },
  computed: {
    choiceEnum: () => SPEEDRUN_SEED_STATE,
    officialSeed: () => Speedrun.officialFixedSeed,
  },
  created() {
    this.seedValue = player.speedrun.initialSeed;
    this.inputSeed = `${player.speedrun.initialSeed}`;
    this.convertedInput = false;
  },
  methods: {
    update() {
      this.mode = player.speedrun.seedSelection;
      this.seedText = Speedrun.seedModeText();
    },
    handleSeedInput() {
      if (this.inputSeed.match(/^-?\d+$/gu)) {
        const num = Number(this.inputSeed);
        this.seedValue = Math.abs(num) > 9e15
          ? this.hashStringToSeed(this.inputSeed)
          : Number(this.inputSeed);
      } else {
        this.seedValue = this.hashStringToSeed(this.inputSeed);
      }
      this.convertedInput = this.seedValue !== Number(this.inputSeed);

      if (this.seedValue === 0) this.setMode(this.choiceEnum.FIXED);
      else this.setMode(this.choiceEnum.PLAYER, this.seedValue);
    },
    setMode(mode, seed) {
      if (mode === this.choiceEnum.PLAYER && this.seedValue === 0) return;
      Speedrun.modifySeed(mode, parseInt(seed, 10));
    },
    buttonClass(mode) {
      return {
        "o-primary-btn--subtab-option": true,
        "o-selected": mode === this.mode,
      };
    },
    // String-to-number hashing function, using a fixed numerical seed inspired by Number.MAX_VALUE
    // See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    hashStringToSeed(str) {
      const seed = 17977308;
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      修改符文随机种子
    </template>
    <div>
      除了第一个现实获得的固定符文之外，游戏将根据种子初始的数值，<i>确定</i>在每一轮现实后，你能获得的符文。也就是说，如果你或其他人在游戏中选择了相同的种子，每一轮现实后能获得的符文都将完全相同。
      <br>
      <br>
      在生成第一个符文之前，你可以在这三个选项之间随时切换。
      <br>
      当前设置：<b>{{ seedText }}</b>
      <br>
      <br>
      <PrimaryButton
        :class="buttonClass(choiceEnum.FIXED)"
        @click="setMode(choiceEnum.FIXED)"
        data-v-modify-seed-modal
      >
        游戏预设种子
      </PrimaryButton>
      <br>
      这是选择符文种子 <b>{{ officialSeed }}</b> 时的默认选项。 选择不修改符文种子的玩家将看到这些选项。
      <br>
      <br>
      <PrimaryButton
        :class="buttonClass(choiceEnum.RANDOM)"
        @click="setMode(choiceEnum.RANDOM)"
        data-v-modify-seed-modal
      >
        随机提供的种子
      </PrimaryButton>
      <br>
      游戏将随机提供一个符文种子，你获得的符文大概率会和其他玩家获得的符文完全不同，除非他们特意选择了相同的随机种子。
      <br>
      <PrimaryButton
        v-tooltip="seedValue === 0 ? '输入的种子不能为零！' : ''"
        :class="buttonClass(choiceEnum.PLAYER)"
        @click="setMode(choiceEnum.PLAYER, seedValue)"
      >
        玩家自定义种子：
      </PrimaryButton>
      <input
        ref="inputSeed"
        v-model="inputSeed"
        type="text"
        class="c-modal-input"
        @input="handleSeedInput()"
      >
      <br>
      你的符文种子将设置为文本框中的数字。
      <br>
      如果它不是一个有效的数字，此时它将被转换为一个随机的整数。
      <br>
      <span v-if="seedValue !== 0">
        文本框中内容对应的符文种子为 <b>{{ seedValue }}</b>。
      </span>
      <span v-else>
        文本框中内容对应的符文种子为 <b>0</b>，
        符文种子将默认设置为游戏预设种子。
      </span>
      <br>
      出于技术原因，此处只接受非零数值。
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-selected {
  color: var(--color-text-inverted);
  background-color: var(--color-good);
}
</style>
