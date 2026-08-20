<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StoredTimeTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      storedTime: 0,
      customTimeValue: 1,
      customTimeUnit: 'min'
    };
  },
  computed: {
    timeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.storedTime)).toStringShort();
    },
    customTimeInSeconds() {
      const val = Number(this.customTimeValue) || 0;
      if (this.customTimeUnit === 'sec') return val;
      if (this.customTimeUnit === 'min') return val * 60;
      if (this.customTimeUnit === 'hour') return val * 3600;
      return 0;
    },
    customClassObj() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < this.customTimeInSeconds || this.customTimeInSeconds <= 0
      };
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
      return `114514 秒存储时间点击即送`;
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
        "o-primary-btn--disabled": this.storedTime > 3600
      };
    },
  },
  methods: {
    update() {
      this.storedTime = player.storedTime;
    },
    spendCustomTime() {
      const seconds = this.customTimeInSeconds;
      if (seconds <= 0) {
        GameUI.notify.error("请输入大于 0 的时间！");
        return;
      }
      if (this.storedTime >= seconds) {
        player.storedTime -= seconds;
        simulateTime(seconds);
      } else {
        GameUI.notify.error("存储时间不足！");
      }
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
    getFreeTime() {
      if (this.storedTime <= 3600) {
        player.storedTime += 114514;
        GameUI.notify.info("获得了 114514 秒存储时间DA☆ZE！");
      } else {
        GameUI.notify.info(`先把存储时间用得差不多了再续杯哦！`);
      }
    },
    fixEternityBug() {
      player.records.bestEternity.realTime = 25;
      player.records.bestEternity.time.mag = 15;
      player.records.bestEternity.time.layer = 1;
      GameUI.notify.info(`已修复`);
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
      <div class="independent-btn-wrapper">
        <PrimaryButton
          class="o-primary-btn"
          @click="fixEternityBug"
        >
          点我修复最快永恒时间为0的问题（无限维度失效）
          不要在正常情况使用我
        </PrimaryButton>
      </div>
      <div class="custom-time-container">
        <input 
          type="number" 
          v-model.number="customTimeValue" 
          min="0" 
          step="any"
          class="custom-time-input" 
          placeholder="数值"
        />
        <select v-model="customTimeUnit" class="custom-time-select">
          <option value="sec">秒</option>
          <option value="min">分钟</option>
          <option value="hour">小时</option>
        </select>
        <PrimaryButton
          :class="customClassObj"
          @click="spendCustomTime"
        >
          自定义跳跃
        </PrimaryButton>
      </div>

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
        @click="getFreeTime"
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

.custom-time-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
}

.custom-time-input, 
.custom-time-select {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--color-primary, #555);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  text-align: center;
  outline: none;
}

.custom-time-input {
  width: 80px;
}

.custom-time-select {
  width: 80px;
  cursor: pointer;
}

.custom-time-input::-webkit-inner-spin-button, 
.custom-time-input::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  appearance: none; 
  margin: 0; 
}

.custom-time-input {
  -moz-appearance: textfield;
  appearance: textfield;
}

.independent-btn-wrapper {
  width: 100%;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>