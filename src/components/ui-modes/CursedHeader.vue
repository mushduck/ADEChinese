<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "CursedHeader",
  components: {
    PrimaryButton
  },
  data() {
    return {
      findChance: 0,
      findInterval: 0,
      now: Date.now(),
      lastFound: 0,
      canHunt: false,
      cores: 0
    };
  },
  computed: {
    classObj() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": !this.canHunt
      };
    },
    huntText() {
      if (this.canHunt) return "搜寻混沌核心";
      return `Wait ${TimeSpan.fromMilliseconds(new Decimal(this.findInterval).sub(this.now - this.lastFound)).toStringShort()}`;
    },
    intervalText() {
      return `${TimeSpan.fromMilliseconds(new Decimal(this.findInterval)).toStringShort()}`;
    }
  },
  methods: {
    update() {
      this.findChance = Slabdrill.huntChance;
      this.findInterval = Slabdrill.huntInterval;
      this.now = Date.now();
      this.lastFound = player.celestials.slabdrill.core.lastFound;
      this.canHunt = this.now - this.lastFound >= this.findInterval;
      this.cores = player.celestials.slabdrill.core.chaosCores;
    },
    hunt() {
      if (!this.canHunt) return;
      if (Math.random() <= this.findChance) player.celestials.slabdrill.core.chaosCores++;
      player.celestials.slabdrill.core.lastFound = Date.now();
    },
    changeTabs() {
      if (ui.view.subtab === "antimatter") Tab.celestials.slabdrill.show(true);
      else Tab.dimensions.antimatter.show(true);
    }
  }
};
</script>

<template>
  <span class="c-cursed-header">
    <span>
      你拥有 {{ quantifyInt("混沌核心", cores) }}。
      你每次搜寻时有 {{ formatPercents(findChance, 2, 2) }} 的概率猎得一个混沌核心。
      你已经搜寻了 {{ intervalText }} 次。
    </span>
    <br>
    <br>
    <span class="o-cursed-btn-row">
      <PrimaryButton
        class="o-cursed-btn"
        :class="classObj"
        @click="hunt"
      >
        {{ huntText }}
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn o-cursed-btn"
        @click="changeTabs"
      >
        切换界面
      </PrimaryButton>
    </span>
  </span>
</template>

<style scoped>
.c-cursed-header {
  font-weight: bold;
  color: red;
}

.o-cursed-btn-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.o-cursed-btn {
  width: 20rem;
  font-size: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
