<script>
export default {
  name: "EnterCelestialsRaPet",
  props: {
    petId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      isUnlocked: false,
    };
  },
  computed: {
    pet() {
      return Ra.pets.all[this.petId];
    },
    name() {
      return this.pet.name;
    },
    color() {
      return `color: ${this.pet.color}`;
    },
    gainText() {
      return this.pet.level === 25
        ? `已重获${this.name}的所有记忆`
        : `基于${this.chunkGain}的数量获得${this.name}的记忆块`;
    },
    chunkGain() {
      return this.pet.chunkGain;
    },
  },
  methods: {
    update() {
      this.isUnlocked = this.pet.isUnlocked;
    }
  },
};
</script>

<template>
  <span
    v-if="isUnlocked"
    :style="color"
  >
    {{ name }} {{ gainText }}.
    <br>
  </span>
</template>
