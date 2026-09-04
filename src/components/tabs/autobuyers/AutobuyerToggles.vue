<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "AutobuyerToggles",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isDoomed: false,
      autobuyersOn: false,
      showContinuum: false,
      disableContinuum: false,
      allAutobuyersDisabled: false,
      antimatterAutobuyersBuyMax: false,
    };
  },
  watch: {
    autobuyersOn(newValue) {
      player.auto.autobuyersOn = newValue;
    },
    disableContinuum(newValue) {
      if (ImaginaryUpgrade(21).isLockingMechanics && !newValue) {
        ImaginaryUpgrade(21).tryShowWarningModal();
        return;
      }
      if (DualityUpgrade(21).isLockingMechanics && !newValue) {
        DualityUpgrade(21).tryShowWarningModal();
        return;
      }
      Laitela.setContinuum(!newValue);
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.autobuyersOn = player.auto.autobuyersOn;
      this.showContinuum = Laitela.isUnlocked;
      this.disableContinuum = player.auto.disableContinuum;
      this.allAutobuyersDisabled = Autobuyers.unlocked.every(autobuyer => !autobuyer.isActive);
      this.antimatterAutobuyersBuyMax = Autobuyer.antimatterDimension.zeroIndexed.every(
        autobuyer => autobuyer.mode === AUTOBUYER_MODE.BUY_10
      );
    },
    toggleAllAutobuyers() {
      for (const autobuyer of Autobuyers.unlocked) {
        autobuyer.isActive = this.allAutobuyersDisabled;
      }
    },
    toggleAntimatterSingles() {
      for (const autobuyer of Autobuyer.antimatterDimension.zeroIndexed) {
        autobuyer.mode = this.antimatterAutobuyersBuyMax ? AUTOBUYER_MODE.BUY_SINGLE : AUTOBUYER_MODE.BUY_10;
      }
    }
  },
};
</script>

<template>
  <div class="c-subtab-option-container">
    <PrimaryToggleButton
      v-model="autobuyersOn"
      on="暂停自动购买器"
      off="恢复自动购买器"
      class="o-primary-btn--subtab-option"
    />
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAllAutobuyers()"
    >
      {{ allAutobuyersDisabled ? "启用" : "禁用" }}所有自动购买器
    </PrimaryButton>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAntimatterSingles()"
    >
      设置反物质维度自动购买器购买 {{ antimatterAutobuyersBuyMax ? "单个" : "最大" }}
    </PrimaryButton>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAntimatterSingles()"
    >
      设置反物质维度自动购买器购买 {{ antimatterAutobuyersBuyMax ? "单个" : "最大" }}
    </PrimaryButton>
    <span v-if="false">
      <PrimaryButton
        v-if="showContinuum"
        class="o-primary-btn--subtab-option"
      >
        已禁用连续统
      </PrimaryButton>
    </span>
    <span v-else>
      <PrimaryToggleButton
        v-if="showContinuum"
        v-model="disableContinuum"
        on="启用连续统"
        off="禁用连续统"
        class="o-primary-btn--subtab-option"
      />
    </span>
  </div>
</template>

<style scoped>

</style>
