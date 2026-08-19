<script>
import StarContainer from "./StarContainer";

export default {
  name: "EtherealTab",
  components: {
    StarContainer
  },
  data() {
    return {
      etherealPower: new Decimal(),
      etherealPowerPerSecond: new Decimal(),
      cosmicSector: 0,
      nextSectorAt: new Decimal(),
      sectorBoost: new Decimal(),
      isExtended: false,
      canExtend: false,
      isBetter: false,
      nextStarReq: 0,
      stellarProd: new Decimal(),
      allStarsUnlocked: false,
      isStarPowerUnlocked: false,
      canUnlockStarPower: false,
      starPower: new Decimal(),
      starPowerPerSecond: new Decimal(),
      starBoost: new Decimal(),
      nextGeneration: new Decimal(),
      allGenerationsUnlocked: false,
      starGen: []
    };
  },
  computed: {
    etherealPowerDisplay() {
      if (this.etherealPower.lt(1)) return `${format(this.etherealPower, 3, 3)}`;
      if (this.etherealPower.lt(10)) return `${format(this.etherealPower, 2, 2)}`;
      if (this.etherealPower.lt(100)) return `${format(this.etherealPower, 1, 1)}`;
      return `${formatHybridLarge(this.etherealPower, 3)}`;
    },
    extraPowerDisplay() {
      return `和超出 ${format(DC.NUMMAX, 2, 2)} 的星系之力而提高。`;
    },
    etherealClassObject() {
      return {
        "o-ethereal-button": true,
        "c-ethereal-btn": true,
        "o-ethereal-button--available": true
      };
    },
    etherealCoolClassObject() {
      return {
        "o-cool-ethereal-button": true,
        "c-cool-ethereal-btn": true,
        "o-cool-ethereal-button--available": true
      };
    },
    stars() {
      return Object.values(GameDatabase.endgame.stars)
        .sort((a, b) => a.dmReq - b.dmReq)
        .map(config => new EtherealStarState(config));
    },
    rows() {
      return Math.ceil(this.stars.length / 3);
    },
    nextStarText() {
      if (this.allStarsUnlocked) return `已解锁所有类型的星辰`;
      return `下一种星辰需要达到 ${format(this.nextStarReq, 2, 2)} 重构机器`;
    },
    etherealPowerTimeEstimate() {
      return TimeSpan.fromSeconds(Decimal.sub(this.nextSectorAt, this.etherealPower)
        .div(this.etherealPowerPerSecond)).toTimeEstimate();
    },
    starPowerReqText() {
      return `所有星辰数量的乘积达到 ${format(DC.NUMMAX, 2, 2)} 以解锁星流之力`;
    },
    starPowerDisplay() {
      if (this.starPower.lt(1000)) return `${format(this.starPower, 2, 2)}`;
      return `${formatHybridLarge(this.starPower, 3)}`;
    },
    nextGenerationText() {
      if (this.allGenerationsUnlocked) return `已解锁所有星流之力效果`;
      return `达到 ${format(this.nextGeneration, 2, 2)} 星流之力以解锁下一个效果`;
    },
    starTexts() {
      let arr = [];
      let starName = ["绯红", "橘焰", "缃黄", "苍绿", "蔚蓝", "绛紫", "皎白", "漆黑", "湮灰"];
      for (let t = 0; t < 9; t++) {
        if (Ethereal.starGeneration(t).neq(0)) {
          arr.push(`星流之力现每秒生成凝聚时所能得到的${starName[t]}之星的 ${formatDecimalPercents(this.starGen[t], 2)}。`);
        }
      }
      return arr;
    }
  },
  methods: {
    update() {
      this.etherealPower.copyFrom(Currency.etherealPower.value);
      this.etherealPowerPerSecond.copyFrom(getEtherealPowerGainPerSecond());
      this.cosmicSector = Ethereal.cosmicSector;
      this.nextSectorAt.copyFrom(Ethereal.sectorThreshold);
      this.sectorBoost.copyFrom(Ethereal.sectorBoost);
      this.isExtended = player.endgame.ethereal.isExtended;
      this.canExtend = this.etherealPower.gte(1e25);
      this.isBetter = Alpha.isDestroyed;
      this.nextStarReq = Ethereal.nextStarDMReq;
      this.stellarProd.copyFrom(Ethereal.stellarProduct);
      this.allStarsUnlocked = !this.nextStarReq;
      this.isStarPowerUnlocked = Ethereal.isStarPowerUnlocked;
      this.canUnlockStarPower = this.stellarProd.gte(DC.NUMMAX);
      this.starPower.copyFrom(Ethereal.starPower);
      this.starPowerPerSecond.copyFrom(getStarPowerGainPerSecond());
      this.starBoost.copyFrom(Ethereal.allStarBoost);
      this.nextGeneration.copyFrom(!Ethereal.nextGeneration ? new Decimal(Infinity) : Ethereal.nextGeneration);
      this.allGenerationsUnlocked = !this.nextGeneration;
      this.starGen = [];
      for (let t = 0; t < 9; t++) {
        this.starGen.push(Ethereal.starGeneration(t));
      }
    },
    extendEthereal() {
      return player.endgame.ethereal.isExtended = true;
    },
    getStar(row, column) {
      return () => this.stars[(row - 1) * 3 + column - 1];
    },
    unlockStarPower() {
      return player.endgame.ethereal.isStarPowerUnlocked = true;
    }
  }
};
</script>

<template>
  <div class="l-ethereal-tab">
    <div>
      <div>
        <span class="c-normal-ethereal-text">你拥有 </span>
        <span class="c-really-cool-ethereal-text">{{ etherealPowerDisplay }}</span>
        <span class="c-normal-ethereal-text"> 缥缈之力。</span>
        <span class="c-really-cool-ethereal-text">+{{ format(etherealPowerPerSecond, 3, 3) }}/秒</span>
      </div>
      <div>
        <span class="c-normal-ethereal-text">
          缥缈之力的获取量基于天界点数、奇点和现实机器的数量
        </span>
        <span
          v-if="isBetter"
          class="c-normal-ethereal-text"
        >
          {{ extraPowerDisplay }}
        </span>
      </div>
      <div>
        <span class="c-normal-ethereal-text">你拥有 </span>
        <span class="c-really-cool-ethereal-text">{{ formatInt(cosmicSector) }}</span>
        <span class="c-normal-ethereal-text"> 个宇宙扇区，为天界维度和天界物质软上限阈值提供</span>
        <span class="c-really-cool-ethereal-text">{{ formatX(sectorBoost, 3) }}</span><span class="c-normal-ethereal-text">的倍率。</span>
      </div>
      <div>
        <span class="c-normal-ethereal-text">下一个宇宙扇区需要 </span>
        <span
          class="c-really-cool-ethereal-text"
          :ach-tooltip="etherealPowerTimeEstimate"
        >{{ formatHybridLarge(nextSectorAt, 3) }}</span>
        <span class="c-normal-ethereal-text"> 缥缈之力。</span>
      </div>
    </div>
    <br>
    <div
      v-if="!isExtended"
      class="l-ethereal-extension-unlock"
    >
      <div v-if="!canExtend">
        <span class="c-normal-ethereal-text">达到 {{ format(1e25, 2, 2) }} 缥缈之力以超越缥缈。</span>
      </div>
      <div v-if="canExtend">
        <button
          :class="etherealClassObject"
          @click="extendEthereal"
        >
          超越缥缈
        </button>
      </div>
    </div>
    <div
      v-if="isExtended"
      class="l-star-grid"
    >
      <div>
        <span class="c-stellar-glow">你所有星辰数量的乘积为 </span>
        <span class="c-cooler-stellar-glow">{{ format(stellarProd, 2, 2) }}</span><span class="c-stellar-glow">。</span>
      </div>
      <br>
      <div
        v-for="row in rows"
        :key="row"
        class="l-star-grid__row"
      >
        <StarContainer
          v-for="column in 3"
          :key="row * 3 + column"
          :get-star="getStar(row, column)"
          class="l-star-grid__cell"
        />
      </div>
      <br>
      <span class="c-normal-ethereal-text">
        {{ nextStarText }}
      </span>
    </div>
    <br>
    <div
      v-if="!isStarPowerUnlocked && allStarsUnlocked"
      class="l-ethereal-extension-unlock"
    >
      <div v-if="!canUnlockStarPower">
        <span class="c-stellar-glow">{{ starPowerReqText }}</span>
      </div>
      <div v-if="canUnlockStarPower">
        <button
          :class="etherealCoolClassObject"
          @click="unlockStarPower"
        >
          解锁星流之力
        </button>
      </div>
    </div>
    <div
      v-if="isStarPowerUnlocked"
      class="l-star-grid"
    >
      <div>
        <span class="c-stellar-glow">你拥有 </span>
        <span class="c-cooler-stellar-glow">{{ starPowerDisplay }}</span>
        <span class="c-stellar-glow"> 星流之力。 </span>
        <span class="c-cooler-stellar-glow">+{{ format(starPowerPerSecond, 3, 3) }}/秒</span>
      </div>
      <div>
        <span class="c-stellar-glow">为所有类型的星辰产量提供 </span>
        <span class="c-cooler-stellar-glow">{{ formatX(starBoost, 3, 3) }}</span><span class="c-stellar-glow"> 的倍率。</span>
      </div>
      <br>
      <span
        class="c-stellar-glow"
        v-for="(line, index) in starTexts"
        :key="index"
      >
        {{ line }} <br>
      </span>
      <br>
      <span class="c-stellar-glow">
        {{ nextGenerationText }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.l-ethereal-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-ethereal-extension-unlock {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.c-normal-ethereal-text {
  font-size: 2rem;
  color: #0000ff;
}

.c-really-cool-ethereal-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(#000000, #0000ff);
  background-clip: text;
  text-shadow: 0 0 1.5rem #0000ff;

  -webkit-text-fill-color: transparent;
}

.c-really-cool-ethereal-text::before{
  text-shadow: 0 0 white;
}

.c-stellar-glow {
  font-size: 2rem;
  animation: a-galactic-power-amount-cycle 12s infinite;
}

.c-cooler-stellar-glow {
  font-size: 3rem;
  font-weight: bold;
  animation: a-galactic-power-amount-cycle 12s infinite;
}
</style>
