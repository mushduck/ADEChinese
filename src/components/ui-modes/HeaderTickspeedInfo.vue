<script>
import GameSpeedDisplay from "@/components/GameSpeedDisplay";

export default {
  name: "HeaderTickspeedInfo",
  components: {
    GameSpeedDisplay
  },
  data() {
    return {
      mult: new Decimal(0),
      tickspeed: new Decimal(0),
      galaxyCount: new Decimal(0),
      purchasedTickspeed: new Decimal(0),
      freeTickspeed: new Decimal(0),
    };
  },
  computed: {
    tickspeedDisplay() {
      return `计数频率：${format(this.tickspeed, 2, 3)} / 秒`;
    },
    perUpgrade() {
      if (InfinityChallenge(3).isRunning) return `所有反物质维度获得乘 ${formatX(this.galaxyCount.times(0.005).add(1.05), 3, 3)} 加成`;
      return `每个计数频率使反物质维度的生产效率 ${formatX(this.mult.reciprocal(), 2, 3)}`;
    },
  },
  methods: {
    update() {
      this.mult.copyFrom(Tickspeed.multiplier);
      this.tickspeed.copyFrom(Tickspeed.perSecond);
      this.galaxyCount.copyFrom(player.galaxies);
      this.purchasedTickspeed.copyFrom(player.totalTickBought);
      this.freeTickspeed.copyFrom(FreeTickspeed.amount);
    },
  },
};
</script>

<template>
  <div>
    <br>
    {{ perUpgrade }}
    <br>
    {{ tickspeedDisplay }}
    <br>
    <GameSpeedDisplay />
  </div>
</template>

<style scoped>

</style>
