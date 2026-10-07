<script>
import DivinityMilestoneButton from "./DivinityMilestoneButton";

export default {
  name: "DivinityMilestonesTab",
  components: {
    DivinityMilestoneButton
  },
  data() {
    return {
      divinityCount: 0,
      showNewFeature: false
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.celestials.divinityMilestones)
        .sort((a, b) => a.divinities - b.divinities)
        .map(config => new DivinityMilestoneState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length);
    }
  },
  methods: {
    update() {
      this.divinityCount = Math.floor(Currency.divinities.value);
      this.showNewFeature = this.divinityCount >= 10 && this.divinityCount < 13;
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-divinity-milestone-grid">
    <div class="o-divinity-amount">你进行了 {{ quantify("次神性", divinityCount, 3) }}。</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-divinity-milestone-grid__row"
    >
      <DivinityMilestoneButton
        v-for="column in 1"
        :key="row + column"
        :get-milestone="getMilestone(row, column)"
        class="l-divinity-milestone-grid__cell"
      />
    </div>
    <div v-if="showNewFeature">
      <span class="o-divinity-amount">达到 {{ formatInt(13) }} 次神性以解锁Universe。</span>
    </div>
  </div>
</template>

//我改的，神性部分鬼看的清字
<style scoped>
@property --milestone-cross {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}
.o-divinity-amount {
  color: var(--color-pelle--base);
}
.l-divinity-milestone-grid,
.l-divinity-milestone-grid__row {
  animation: none !important;
  background: transparent !important;
}
.l-divinity-milestone-grid__cell ::v-deep *:has(*) {
  background: transparent;
}
.l-divinity-milestone-grid__cell ::v-deep .o-divinity-milestone__goal {
  display: inline;
  background: transparent;
}
.l-divinity-milestone-grid__cell ::v-deep .o-divinity-milestone__reward {
  position: relative;
  overflow: hidden;
}
.l-divinity-milestone-grid__cell ::v-deep .o-divinity-milestone__reward::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -100%;
  height: 200%;
  --milestone-cross: 0;
  background:
    /* 横十字*/
    linear-gradient(90deg,
      rgb(150 0 38 / 0) 0%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 15%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 40%,
      rgb(70 0 18 / calc(var(--milestone-cross) * 1)) 50%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 60%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 85%,
      rgb(150 0 38 / 0) 100%) 50% 25% / 15% 0.3rem no-repeat,
    /* 竖十字*/
    linear-gradient(180deg,
      rgb(150 0 38 / 0) 0%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 15%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 40%,
      rgb(70 0 18 / calc(var(--milestone-cross) * 1)) 50%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 60%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 85%,
      rgb(150 0 38 / 0) 100%) 50% 24% / 0.3rem 6% no-repeat,
    /* 横十字*/
    linear-gradient(90deg,
      rgb(150 0 38 / 0) 0%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 15%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 40%,
      rgb(70 0 18 / calc(var(--milestone-cross) * 1)) 50%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 60%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 85%,
      rgb(150 0 38 / 0) 100%) 50% 75% / 15% 0.3rem no-repeat,
    /* 竖十字*/
    linear-gradient(180deg,
      rgb(150 0 38 / 0) 0%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 15%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 40%,
      rgb(70 0 18 / calc(var(--milestone-cross) * 1)) 50%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 1)) 60%,
      rgb(150 0 38 / calc(var(--milestone-cross) * 0.4)) 85%,
      rgb(150 0 38 / 0) 100%) 50% 76% / 0.3rem 6% no-repeat,
    linear-gradient(180deg,
      #000 0%,
      rgb(70, 0, 18) 4%,
      rgb(220, 20, 60) 25%,
      rgb(70, 0, 18) 46%,
      #000 50%,
      rgb(70, 0, 18) 54%,
      rgb(220, 20, 60) 75%,
      rgb(70, 0, 18) 96%,
      #000 100%);
  animation:
    a-milestone-roll 12s linear infinite,
    a-milestone-pulse 5s ease-out infinite;
  pointer-events: none;
}
.l-divinity-milestone-grid__cell ::v-deep .o-divinity-milestone__reward::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -100%;
  height: 200%;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0rem,
    rgba(0, 0, 0, 0) 1.15rem,
    rgba(220, 20, 60, 0.22) 1.25rem,
    rgba(220, 20, 60, 0.22) 1.35rem,
    rgba(0, 0, 0, 0) 1.45rem,
    rgba(0, 0, 0, 0) 1.9rem,
    rgba(160, 10, 40, 0.12) 2rem,
    rgba(160, 10, 40, 0.12) 2.05rem,
    rgba(0, 0, 0, 0) 2.15rem,
    rgba(0, 0, 0, 0) 2.4rem
  );
  -webkit-mask-image: linear-gradient(180deg,
    #000 0%, rgba(0,0,0,0) 6%, rgba(0,0,0,0) 44%,
    #000 50%,
    rgba(0,0,0,0) 56%, rgba(0,0,0,0) 94%, #000 100%);
  mask-image: linear-gradient(180deg,
    #000 0%, rgba(0,0,0,0) 6%, rgba(0,0,0,0) 44%,
    #000 50%,
    rgba(0,0,0,0) 56%, rgba(0,0,0,0) 94%, #000 100%);
  animation:
    a-milestone-roll 12s linear infinite,
    a-milestone-threads 5s linear infinite;
  pointer-events: none;
}

@keyframes a-milestone-roll {
  from { transform: translateY(0); }
  to   { transform: translateY(50%); }
}

@keyframes a-milestone-threads {
  from { background-position-y: 0rem; }
  to   { background-position-y: 2.4rem; }
}
@keyframes a-milestone-pulse {
  0% {
    --milestone-cross: 0;
    background-size:
      15% 0.3rem, 0.3rem 6%,
      15% 0.3rem, 0.3rem 6%,
      100% 100%;
    background-position:
      50% 25%, 50% 24%,
      50% 75%, 50% 76%,
      0% 0%;
  }
  15% {
    --milestone-cross: 1;
    background-size:
      35% 0.3rem, 0.3rem 12%,
      35% 0.3rem, 0.3rem 12%,
      100% 100%;
    background-position:
      50% 25%, 50% 22%,
      50% 75%, 50% 78%,
      0% 0%;
  }
  100% {
    --milestone-cross: 0;
    background-size:
      100% 0.35rem, 0.35rem 38%,
      100% 0.35rem, 0.35rem 38%,
      100% 100%;
    background-position:
      50% 25%, 50% 12%,
      50% 75%, 50% 88%,
      0% 0%;
  }
}
.l-divinity-milestone-grid__cell ::v-deep *:not(:has(*)):not(.o-divinity-milestone__goal) {
  background-image: linear-gradient(180deg, #ff9090 0%, #ff4040 55%, #d01515 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: bold;
  animation: a-milestone-text-breathe 2.4s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes a-milestone-text-breathe {
  0%, 100% {
    filter:
      drop-shadow(0.08rem 0 0 #000)
      drop-shadow(-0.08rem 0 0 #000)
      drop-shadow(0 0.08rem 0 #000)
      drop-shadow(0 -0.08rem 0 #000)
      drop-shadow(0 0 0.15rem #000);
  }
  50% {
    filter:
      drop-shadow(0.16rem 0 0 #000)
      drop-shadow(-0.16rem 0 0 #000)
      drop-shadow(0 0.16rem 0 #000)
      drop-shadow(0 -0.16rem 0 #000)
      drop-shadow(0 0 0.6rem #000);
  }
}

.l-divinity-milestone-grid__cell ::v-deep .o-divinity-milestone__goal {
  background-image: linear-gradient(180deg, #ff4d4d 0%, #c00000 45%, #000 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  -webkit-text-stroke: 0.06rem #4d0000;
  font-weight: bold;
}
</style>