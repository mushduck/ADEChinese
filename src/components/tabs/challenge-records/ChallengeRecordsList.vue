<script>
export default {
  name: "ChallengeRecordsList",
  props: {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      return this.times.reduce(Decimal.sumReducer));
    },
    completedAllChallenges() {
      return this.timeSum.lt(Decimal.MAX_VALUE);
    }
  },
  methods: {
    timeDisplayShort,
    completionString(time) {
      return time.lt(Decimal.MAX_VALUE)
        ? `record time: ${timeDisplayShort(new Decimal(time))}`
        : "has not yet been completed";
    }
  }
};
</script>

<template>
  <div>
    <br>
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ name }} {{ start + i }} {{ completionString(time) }}</span>
    </div>
    <br>
    <div v-if="completedAllChallenges">
      Sum of {{ name }} record times: {{ timeDisplayShort(new Decimal(timeSum)) }}
    </div>
    <div v-else>
      You have not completed all {{ name }}s yet.
    </div>
  </div>
</template>
