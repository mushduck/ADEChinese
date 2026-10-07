<script>
import CompressionButton from "./CompressionButton";
import CompressionUpgradeButton from "./CompressionUpgradeButton";

export default {
  name: "TimeCompressionTab",
  components: {
    CompressionButton,
    CompressionUpgradeButton
  },
  data() {
    return {
      hawkingRadiation: new Decimal(),
      thermalRadiation: new Decimal(),
      thermalRadiationIncome: new Decimal(),
      waveThreshold: new Decimal(),
      baseWaves: new Decimal(),
      totalWaves: new Decimal(),
      electromagneticWaveGain: 1,
      waveTimeEstimate: "",
      toMaxTooltip: "",
      isHovering: false
    };
  },
  computed: {
    rebuyables() {
      return [
        CompressionUpgrade.trGain,
        CompressionUpgrade.waveThreshold,
        CompressionUpgrade.hrGain
      ];
    },
    upgrades() {
      return [
        [
          CompressionUpgrade.doubleWaves,
          CompressionUpgrade.stMultReplicanti,
          CompressionUpgrade.adMultTR
        ],
        [
          CompressionUpgrade.adBigMultTR,
          CompressionUpgrade.entanglementSplit,
          CompressionUpgrade.compressionPenalty
        ],
      ];
    },
    // This might be negative due to rift drain, so we need to add "+" iff the value is positive. The actual
    // addition of a negative sign (or not) is assumed to be handled in a notation-specific way
    thermalRadiationGainText() {
      const sign = this.thermalRadiationIncome.gte(0) ? "+" : "";
      return `${sign}${format(this.thermalRadiationIncome, 2, this.numSpaces(this.thermalRadiationIncome))}`;
    },
    esGenerator() {
      return CompressionUpgrade.esGenerator;
    },
    baseWaveText() {
      return `${formatHybridLarge(this.baseWaves, 3)} Base`;
    },
    allRebuyables() {
      const upgradeRows = [];
      upgradeRows.push(this.rebuyables);
      return upgradeRows;
    },
    allSingleUpgrades() {
      const upgradeRows = [];
      upgradeRows.push(...this.upgrades);
      upgradeRows.push([this.esGenerator]);
      return upgradeRows;
    },
  },
  methods: {
    update() {
      this.hawkingRadiation.copyFrom(Currency.hawkingRadiation);
      this.thermalRadiation.copyFrom(Currency.thermalRadiation);
      const rawTRGain = getThermalRadiationGainPerSecond();
      this.waveTimeEstimate = getThermalRadiationTimeEstimate(this.waveThreshold);
      this.thermalRadiationIncome = rawTRGain;
      this.waveThreshold.copyFrom(player.compression.nextThreshold);
      this.baseWaves.copyFrom(player.compression.baseElectromagneticWaves);
      this.totalWaves.copyFrom(player.compression.totalElectromagneticWaves);
      if (CompressionUpgrade.doubleWaves.isBought) {
        this.electromagneticWaveGain = CompressionUpgrade.doubleWaves.effectValue;
      } else {
        this.electromagneticWaveGain = 1;
      }
    },
    numSpaces(curr) {
      return new Decimal(curr).lt(10) ? 3 : (new Decimal(curr).lt(100) ? 2 : 1);
    }
  }
};
</script>

<template>
  <div class="l-compression-tab">
    <span>
      你拥有
      <span class="c-compression-tab__hawking-radiation">{{ format(hawkingRadiation, 2, numSpaces(hawkingRadiation)) }}</span>
      {{ pluralize("霍金辐射", hawkingRadiation) }}。
    </span>
    <div
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <CompressionButton />
    </div>
    <span>
      你拥有
      <span class="c-compression-tab__thermal-radiation">{{ format(thermalRadiation, 2, numSpaces(thermalRadiation)) }}</span>
      热能辐射。
      <span class="c-compression-tab__thermal-radiation-income">{{ thermalRadiationGainText }}/秒</span>
    </span>
    <span>
      下<span v-if="electromagneticWaveGain > 1">{{ formatHybridLarge(electromagneticWaveGain, 3) }}</span>个{{ pluralize("电磁波场", electromagneticWaveGain) }}将于
      <span
        class="c-compression-tab__wave-threshold"
        :ach-tooltip="waveTimeEstimate"
      >{{ format(waveThreshold, 2, numSpaces(waveThreshold)) }}</span>
      热能辐射时获得，你已获得
      <span
        class="c-compression-tab__waves"
        :ach-tooltip="baseWaveText"
      >{{ formatHybridLarge(totalWaves, 3) }}</span>
      {{ pluralize("电磁波场", totalWaves) }}。
    </span>
    <span>
      电磁波场等效于任意类型的强子。
    </span>
    <div class="l-compression-upgrades-grid">
      <div
        v-for="(upgradeRow, row) in allRebuyables"
        :key="'rebuyable' + row"
        class="l-compression-upgrades-grid__row"
      >
        <CompressionUpgradeButton
          v-for="upgrade in upgradeRow"
          :key="upgrade.id"
          :upgrade="upgrade"
          :is-rebuyable="true"
          class="l-compression-upgrades-grid__cell"
          :show-tooltip="isHovering"
        />
      </div>
      <div
        v-for="(upgradeRow, row) in allSingleUpgrades"
        :key="'single' + row"
        class="l-compression-upgrades-grid__row"
      >
        <CompressionUpgradeButton
          v-for="upgrade in upgradeRow"
          :key="upgrade.id"
          :upgrade="upgrade"
          :is-rebuyable="false"
          class="l-compression-upgrades-grid__cell"
          :show-tooltip="isHovering"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-compression-upgrades-grid {
  display: flex;
  flex-direction: column;
}

.l-compression-upgrades-grid__row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.l-compression-upgrades-grid__cell {
  margin: 1.2rem 1.5rem;
}
</style>
