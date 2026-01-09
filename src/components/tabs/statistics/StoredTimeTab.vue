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
      return `Spend ${TimeSpan.fromMinutes(1).toStringShort()} of Stored Time`;
    },
    tenMinutesDisp() {
      return `Spend ${TimeSpan.fromMinutes(10).toStringShort()} of Stored Time`;
    },
    oneHourDisp() {
      return `Spend ${TimeSpan.fromHours(1).toStringShort()} of Stored Time`;
    },
    fiveHoursDisp() {
      return `Spend ${TimeSpan.fromHours(5).toStringShort()} of Stored Time`;
    },
    allDisp() {
      return `Spend all Stored Time`;
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
    spendAll() {
      if (this.storedTime >= 0) {
        simulateTime(player.storedTime);
        player.storedTime = 0;
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="normal-text">
      <br>
      <span>You have </span><span class="special-text">{{ timeDisplay }}</span><span> Stored Time.</span>
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
