<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StoredTimeTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      storedTime: 0
    };
  },
  computed: {
    timeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.storedTime)).toStringShort();
    },
    oneMinuteDisp() {
      return `跳跃 ${TimeSpan.fromMinutes(1).toStringShort()}`;
    },
    tenMinutesDisp() {
      return `跳跃 ${TimeSpan.fromMinutes(10).toStringShort()}`;
    },
    oneHourDisp() {
      return `跳跃 ${TimeSpan.fromHours(1).toStringShort()}`;
    },
    fiveHoursDisp() {
      return `跳跃 ${TimeSpan.fromHours(5).toStringShort()}`;
    },
    allDisp() {
      return `点击获得 114514 秒存储时间`;
    },
    classObj1() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 60
      };
    },
    classObj2() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 600
      };
    },
    classObj3() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 3600
      };
    },
    classObj4() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 18000
      };
    },
    classObj5() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime <= 0
      };
    },
  },
  methods: {
    update() {
      this.storedTime = player.storedTime;
    },
    spendOneMin() {
      if (this.storedTime >= 60) {
        player.storedTime -= 60;
        simulateTime(60);
      }
    },
    spendTenMins() {
      if (this.storedTime >= 600) {
        player.storedTime -= 600;
        simulateTime(600);
      }
    },
    spendOneHour() {
      if (this.storedTime >= 3600) {
        player.storedTime -= 3600;
        simulateTime(3600);
      }
    },
    spendFiveHours() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        simulateTime(18000);
      }
    },
    spendAll() {//这里点按则获得114514秒存储时间
      player.storedTime += 12;
      GameUI.notify.info("获得了 114514 秒存储时间DA☆ZE！");
    }
  }
};
</script>

<template>
  <div>
    <div class="normal-text">
      <br>
      <span>你可以跳跃 </span><span class="special-text">{{ timeDisplay }}</span><span> 的时间。</span>
      <br>
      <span>建议善用赠送的离线时长！或许在特定的情况下可以大大加快永恒！</span>
    </div>
    <div class="c-subtab-option-container">
      <PrimaryButton
        :class="classObj1"
        @click="spendOneMin"
      >
        {{ oneMinuteDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj2"
        @click="spendTenMins"
      >
        {{ tenMinutesDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj3"
        @click="spendOneHour"
      >
        {{ oneHourDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj4"
        @click="spendFiveHours"
      >
        {{ fiveHoursDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj5"
        @click="spendAll"
      >
        {{ allDisp }}
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.normal-text {
  font-size: 1rem;
  color: #ffffff;
}

.special-text {
  font-size: 2.5rem;
  color: var(--color-dilation);
}
</style>
