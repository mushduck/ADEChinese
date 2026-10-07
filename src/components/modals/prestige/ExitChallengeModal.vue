<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitChallengeModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    challengeName: {
      type: String,
      required: true,
    },
    normalName: {
      type: String,
      required: true,
    },
    hasHigherLayers: {
      type: Boolean,
      required: true,
    },
    exitFn: {
      type: Function,
      required: true,
    }
  },
  computed: {
    isCelestial() {
      return this.challengeName.match("Reality");
    },
    isRestarting() {
      return this.isCelestial ? player.options.retryCelestial : player.options.retryChallenge;
    }
  },
  methods: {
    handleYesClick() {
      this.exitFn();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="exitChallenge"
    @confirm="handleYesClick"
  >
    <template #header>
      你将要{{ isRestarting ? "重试" : "退出" }}{{ challengeName }}
    </template>

    <div class="c-modal-message__text">
      <span v-if="isRestarting">
        你将在确认后立即重新进入{{ challengeName }}。
      </span>
      <span v-else>
        这将使你返回到没有然后限制的{{ normalName }}。
      </span>
      <span v-if="hasHigherLayers">
        来自更高层级的其他限制将继续生效。
      </span>
    </div>
    <template #confirm-text>
      {{ isRestarting ? "重试" : "退出" }}
    </template>
  </ModalWrapperChoice>
</template>
