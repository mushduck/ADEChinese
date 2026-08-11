<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "DeleteCompanionGlyphModal",
  components: {
    PrimaryButton
  },
  data() {
    return {
      messageIndex: 0,
    };
  },
  computed: {
    message() {
      switch (this.messageIndex) {
        case 0: return "你想移除你的同伴符文，确定吗？";
        case 1: return "这里可没有什么蛋糕。";
        case 2: return "你将永久移除你的同伴符文！这可没有第二个同伴符文！";
        case 3: return `恭喜，你移除同伴符文的速度超过了此前所有的测试者。`;
        default: return "Invalid message index";
      }
    }
  },
  methods: {
    handleLeftButtonClick() {
      if (this.messageIndex < 2) {
        this.handleYesClick();
      } else {
        this.handleNoClick();
      }
    },
    handleRightButtonClick() {
      if (this.messageIndex >= 2) {
        this.handleYesClick();
      } else {
        this.handleNoClick();
      }
    },
    handleYesClick() {
      this.messageIndex++;
      if (this.messageIndex === 3) this.deleteCompanion();
    },
    handleNoClick() {
      this.messageIndex = 0;
      this.emitClose();
    },
    deleteCompanion() {
      // Yes, this actually deletes a companion glyph at random, but the player can only ever legitimately have one.
      // Passing information into modals seems to require a bunch of refactoring that's not worth it for this one case.
      const toDelete = player.reality.glyphs.inventory.filter(g => g.type === "companion")[0];
      Glyphs.removeFromInventory(toDelete);
    }
  },
};
</script>

<template>
  <div class="c-modal-message l-modal-content--centered">
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <div v-if="messageIndex < 3">
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="handleLeftButtonClick"
      >
        {{ messageIndex < 2 ? "移除" : "关闭" }}
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="handleRightButtonClick"
      >
        {{ messageIndex >= 2 ? "移除" : "关闭" }}
      </PrimaryButton>
    </div>
    <div v-else>
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="handleNoClick"
      >
        谢谢
      </PrimaryButton>
    </div>
  </div>
</template>
