<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "CelestialEternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      startingCIP: new Decimal(),
      gainedCelestialEternityPoints: new Decimal(),
      gainedCelestialEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.celestialEternityUnlocked()
        ? `进行天界永恒将重置目前为止所有与天界相关的内容。`
        : `进行天界永恒将重置目前为止所有与天界相关的内容，并给予 1 天界永恒点数，并解锁各种升级。`;
    },
    gainedCEPOnCelestialEternity() {
      return `天界永恒后你将获得 ${quantify("天界永恒次数", this.gainedCelestialEternities, 2)} 和 ${quantify("天界永恒点数。", this.gainedCelestialEternityPoints, 2)}`;
    },
    startWithCIP() {
      return this.startingCIP.gt(0)
        ? `下次天界永恒开始时你将拥有 ${quantify("Celestial Infinity Point", this.startingCIP, 2)} 个天界无限点数。`
        : ``;
    },
  },
  methods: {
    update() {
      this.startingCIP = Currency.celestialInfinityPoints.startingValue;
      this.gainedCelestialEternityPoints = gainedCelestialEternityPoints();
      this.gainedCelestialEternities = gainedCelestialEternities();
    },
    handleYesClick() {
      celestialEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="你将要进行一次天界永恒"
    :message="message"
    :gained-resources="gainedCEPOnCelestialEternity"
    :starting-resources="startWithCIP"
    :confirm-fn="handleYesClick"
    confirm-option="celestialEternity"
  />
</template>
