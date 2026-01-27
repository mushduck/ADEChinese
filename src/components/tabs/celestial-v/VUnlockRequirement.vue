<script>
export default {
  name: "VUnlockRequirement",
  props: {
    dbEntry: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resource: new Decimal(0),
      progress: new Decimal(0),
    };
  },
  computed: {
    barProgressStyle() {
      const color = this.progress.eq(1)
        ? "var(--color-v--base)"
        : "#6b5f2e";
      return {
        background: color,
        width: `${this.progress.times(100).toNumber()}%`
      };
    },
    textStyle() {
      return {
        color: this.progress.eq(1)
          ? "black"
          : "var(--color-text)",
        "border-color": "var(--color-text)",
      };
    },
  },
  methods: {
    update() {
      this.resource.copyFrom(new Decimal(this.dbEntry.resource()));
      this.progress.copyFrom(Decimal.clampMax(this.dbEntry.progress(), 1));
    }
  }
};
</script>

<template>
  <div
    class="c-v-unlock-bar"
    :style="textStyle"
  >
    <div
      class="c-v-unlock-bar__progress"
      :style="barProgressStyle"
    />
    {{ dbEntry.format(resource) }} / {{ dbEntry.format(dbEntry.requirement) }} {{ dbEntry.name }}
  </div>
</template>
