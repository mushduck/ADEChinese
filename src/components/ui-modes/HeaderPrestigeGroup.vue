<script>
import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer";
import HeaderEternityContainer from "./prestige-header/HeaderEternityContainer";
import HeaderInfinityContainer from "./prestige-header/HeaderInfinityContainer";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer,
    HeaderEternityContainer,
    HeaderInfinityContainer,
  },
  data() {
    return {
      isDestroyed: false,
      isDivine: false,
      hasRealityButton: false,
      antimatterPerSec: new Decimal(0),
      antimatterPerSecBeforeAlter: new Decimal(0),
      antimatterPerSecAfterAlter: new Decimal(0),
      hasSeenAlterations: false
    };
  },
  computed: {
    alterText() {
      if (!this.hasSeenAlterations) return "before";
      return "before any antimatter production alterations and";
    }
  },
  methods: {
    update() {
      this.isDestroyed = Alpha.isDestroyedForDisplay;
      this.isDivine = DivinityMilestone.divineDimensions.isReached;
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
      this.antimatterPerSecBeforeAlter.copyFrom(
        AntimatterDimension(1).amount.times(AntimatterDimension(1).multiplier).times(Tickspeed.perSecond).times(
          player.chall2Pow).times(player.chall3Pow)
      );
      this.antimatterPerSecAfterAlter.copyFrom(
        this.locallyDilate(AntimatterDimension(1).amount.times(AntimatterDimension(1).multiplier).times(Tickspeed.perSecond).times(
          player.chall2Pow).times(player.chall3Pow).pow(Accelerators.potency.effectValue1).powEffectOf(ResurgenceUpgrade.synergy5))
      );
      this.hasSeenAlterations = EffarigUnlock.reality.isUnlocked || PlayerProgress.endgameUnlocked();
    },
    locallyDilate(multiplier) {
      const log10 = multiplier.log10();
      const eg = Currency.endgames.value;
      const endgameMult = Pelle.isDoomed ? 1 + (Math.log10(Math.min(eg, 1e6) * Math.max(Math.log2(eg + 1) - Math.log2(5e5), 1) + 1) / 80) : 1 + (Math.log10(Math.min(eg, 1e6) * Math.max(Math.log2(eg + 1) - Math.log2(5e5), 1) + 1) / 200);
      const endgameMultValue = (EndgameMilestone.endgameAntimatter.isReached && !player.disablePostReality) ? endgameMult : 1;
      const pelleOnly = Pelle.isDoomed ? DivineDimensions.conversionFormula2 * Accelerators.cosmic.effectValue2 * EndgameMastery(222).effectOrDefault(1) * SingularityMilestone.singAMDoomDilation.effectOrDefault(1) : 1;
      return Decimal.pow10(Decimal.pow(log10, getAdjustedGlyphEffect("effarigantimatter") * Effects.product(EndgameMastery(101), EndgameUpgrade(15), SingularityMilestone.antimatterExponentPower, Achievement(233)) * endgameMultValue * EtherealStars.black.reward.toNumber() * pelleOnly));
    },
    classObject() {
      return {
        "c-prestige-info-blocks": true,
        "c-prestige-info-blocks--tall": this.isDestroyed && !this.isDivine,
        "c-prestige-info-blocks--taller": this.isDivine
      };
    }
  }
};
</script>

<template>
  <div>
    <div :class="classObject()">
      <HeaderEternityContainer class="l-game-header__eternity" />
      <HeaderCenterContainer class="l-game-header__center" />
      <HeaderInfinityContainer class="l-game-header__infinity" />
    </div>
    <div
      v-if="hasRealityButton"
      class="c-production-text"
    >
      <br>
      You are getting {{ format(antimatterPerSec, 2) }} antimatter per second.
      <br>
      You are getting {{ format(antimatterPerSecBeforeAlter, 2) }} antimatter per second {{ alterText }} Game Speed effects.
    </div>
    <div
      v-if="hasRealityButton && hasSeenAlterations"
      class="c-prevent-overflow"
    >
      You are getting {{ format(antimatterPerSecAfterAlter, 2) }} antimatter per second after positive antimatter production
      alterations, and before negative antimatter production alterations, any positive antimatter production alterations
      that apply after certain negative ones, and Game Speed effects.
    </div>
  </div>
</template>

<style scoped>
.c-prevent-overflow {
  margin-left: 5rem;
  margin-right: 5rem;
  color: var(--color-text);
}

.c-production-text {
  color: var(--color-text);
}

.c-prestige-info-blocks {
  display: flex;
  flex-direction: row;
  height: 14rem;
  width: 100%;
  color: var(--color-text);
}

.c-prestige-info-blocks--tall {
  height: 24rem;
}

.c-prestige-info-blocks--taller {
  height: 30rem;
}

.l-game-header__eternity {
  position: absolute;
  left: calc(25% - 22rem);
  width: 22rem;
}

.l-game-header__center {
  position: absolute;
  right: calc(50% - 25rem);
  width: 50rem;
}

.l-game-header__infinity {
  position: absolute;
  right: calc(25% - 22rem);
  width: 22rem;
}
</style>
