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
      fluxUnlocked: false,
      fluxLevel: 1,
      fluxTime: 0,
      maxFlux: 2,
      customTimeValue: 1,
      customTimeUnit: 'min'
    };
  },
  computed: {
    timeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.storedTime)).toStringShort();
    },
    fluxTimeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.fluxTime)).toStringShort();
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
    fluxUnlockDisp() {
      return `花费 ${TimeSpan.fromHours(5).toStringShort()} 存储时间以解锁时间通量`;
    },
    fluxIncrementDisp() {
      return `花费 ${TimeSpan.fromHours(5).toStringShort()} 存储时间将时间通量 最大等级提升至 ${format(Math.ceil(this.maxFlux * 1.1))}`;
    },
    oneMinuteFlux() {
      return `将 ${TimeSpan.fromMinutes(1).toStringShort()} 存储时间注入时间通量`;
    },
    tenMinutesFlux() {
      return `将 ${TimeSpan.fromMinutes(10).toStringShort()} 存储时间注入时间通量`;
    },
    oneHourFlux() {
      return `将 ${TimeSpan.fromHours(1).toStringShort()} 存储时间注入时间通量`;
    },
    fiveHoursFlux() {
      return `将 ${TimeSpan.fromHours(5).toStringShort()} 存储时间注入时间通量`;
    },
    allFlux() {
      return `将所有存储时间注入时间通量`;
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
    classObj6() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 1
      };
    },
    classObj7() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux
      };
    },
    classObj8() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 10
      };
    },
    classObj9() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux - 9
      };
    },
    classObj10() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 100
      };
    },
    classObj11() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux - 99
      };
    },
  },
  methods: {
    update() {
      this.storedTime = player.storedTime;
      this.fluxUnlocked = player.flux.isUnlocked;
      this.fluxLevel = player.flux.level;
      this.fluxTime = player.flux.fluxTime;
      this.maxFlux = player.flux.maxUnlockedFlux;
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
      if (player.records.bestEternity.time.eq(0e0)) {
        player.records.bestEternity.time = new Decimal(25);
        GameUI.notify.info(`已修复`);
      } else {
        GameUI.notify.info(`不要在没触发bug时使用我哦！`);
      }
    },
    fuckAlpha(){
      if(Alpha.isDestroyed) {
        GameUI.notify.info(`阿尔法已经死透了...`);
      } else {
        if (player.options.brightAlpha) {
          player.options.brightAlpha = false;
          GameUI.notify.info(`天暗了...`);
        } else {
          player.options.brightAlpha = true;
          GameUI.notify.info(`天亮了...`);
        }
      }
    },
    unlockFlux() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.isUnlocked = true;
      }
    },
    incrementMaxFlux() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.maxUnlockedFlux = Math.ceil(player.flux.maxUnlockedFlux * 1.1);
      }
    },
    decreaseFlux() {
      player.flux.level = Math.max(player.flux.level - 1, 1);
    },
    increaseFlux() {
      player.flux.level = Math.min(player.flux.level + 1, player.flux.maxUnlockedFlux);
    },
    decreaseFlux10() {
      player.flux.level = Math.max(player.flux.level - 10, 1);
    },
    increaseFlux10() {
      player.flux.level = Math.min(player.flux.level + 10, player.flux.maxUnlockedFlux);
    },
    decreaseFlux100() {
      player.flux.level = Math.max(player.flux.level - 100, 1);
    },
    increaseFlux100() {
      player.flux.level = Math.min(player.flux.level + 100, player.flux.maxUnlockedFlux);
    },
    minimizeFlux() {
      player.flux.level = 1;
    },
    maximizeFlux() {
      player.flux.level = player.flux.maxUnlockedFlux;
    },
    fluxOneMin() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 60) {
        player.storedTime -= 60;
        player.flux.fluxTime += 60;
      }
    },
    fluxTenMins() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 600) {
        player.storedTime -= 600;
        player.flux.fluxTime += 600;
      }
    },
    fluxOneHour() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 3600) {
        player.storedTime -= 3600;
        player.flux.fluxTime += 3600;
      }
    },
    fluxFiveHours() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.fluxTime += 18000;
      }
    },
    fluxAll() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 0) {
        player.flux.fluxTime += player.storedTime;
        player.storedTime = 0;
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- 旧版魔改：基础文本与特殊功能按钮 -->
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
        </PrimaryButton>
      </div>
      <div class="independent-btn-wrapper">
        <PrimaryButton
          class="o-primary-btn"
          @click="fuckAlpha"
        >
          点我在阿尔法内重见天日
        </PrimaryButton>
      </div>
      
      <!-- 旧版魔改：自定义时间 -->
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

      <!-- 基础时间消费按钮（包含白嫖按钮） -->
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

    <!-- 上游更新：Flux 系统 -->
    <br>
    <br>
    <div v-if="!fluxUnlocked">
      <PrimaryButton
        :class="classObj4"
        @click="unlockFlux"
      >
        {{ fluxUnlockDisp }}
      </PrimaryButton>
    </div>
    <div v-if="fluxUnlocked">
      <PrimaryButton
        :class="classObj4"
        @click="incrementMaxFlux"
      >
        {{ fluxIncrementDisp }}
      </PrimaryButton>
    </div>
    <br>
    <br>
    
    <div
      v-if="fluxUnlocked"
      class="normal-text"
    >
      <span>你当前的时间通量等级为 </span><span class="special-text">{{ fluxLevel }}</span><span>。</span>
      <br>
      <span>你拥有 </span><span class="special-text">{{ fluxTimeDisplay }}</span><span> 的时间通量。</span>
      <br>
      <span v-if="fluxLevel === 1">
        在时间通量等级为 {{ formatInt(1) }} 时，你无法消耗时间通量。
      </span>
      <span v-if="fluxLevel !== 1">
        激发时间通量每秒将消耗
        <span class="special-text">{{ format(fluxLevel - 1) }}</span>
        秒的时间通量，为你提供
        <span class="special-text">{{ formatX(fluxLevel) }}</span>
        的现实时间倍率。
      </span>
      <br>
      <br>
      
      <div class="c-subtab-option-container">
        <PrimaryButton
          :class="classObj6"
          @click="minimizeFlux"
        >
          最小化时间通量等级
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 200"
          :class="classObj10"
          @click="decreaseFlux100"
        >
          降低 {{ formatInt(100) }} 级时间通量
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 20"
          :class="classObj8"
          @click="decreaseFlux10"
        >
          降低 {{ formatInt(10) }} 级时间通量
        </PrimaryButton>
        <PrimaryButton
          :class="classObj6"
          @click="decreaseFlux"
        >
          降低时间通量等级
        </PrimaryButton>
        <PrimaryButton
          :class="classObj7"
          @click="increaseFlux"
        >
          提高时间通量等级
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 20"
          :class="classObj9"
          @click="increaseFlux10"
        >
          提高 {{ formatInt(10) }} 级时间通量等级
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 200"
          :class="classObj11"
          @click="increaseFlux100"
        >
          提高 {{ formatInt(100) }} 级时间通量等级
        </PrimaryButton>
        <PrimaryButton
          :class="classObj7"
          @click="maximizeFlux"
        >
          最大化时间通量等级
        </PrimaryButton>
      </div>
      <br>
      <br>
      
      <div class="c-subtab-option-container">
        <PrimaryButton
          :class="classObj1"
          @click="fluxOneMin"
        >
          {{ oneMinuteFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj2"
          @click="fluxTenMins"
        >
          {{ tenMinutesFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj3"
          @click="fluxOneHour"
        >
          {{ oneHourFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj4"
          @click="fluxFiveHours"
        >
          {{ fiveHoursFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj5"
          @click="fluxAll"
        >
          {{ allFlux }}
        </PrimaryButton>
      </div>
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