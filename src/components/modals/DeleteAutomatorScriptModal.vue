<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DeleteAutomatorScriptModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    scriptID: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    handleYesClick() {
      const script = this.scriptID;
      const runningScriptID = AutomatorBackend.state.topLevelScript;

      AutomatorBackend.deleteScript(script);

      const scriptList = Object.values(player.reality.automator.scripts).map(sc => ({
        id: sc.id,
        name: sc.name,
      }));
      if (AutomatorBackend.isOn && runningScriptID !== script) {
        player.reality.automator.state.editorScript = runningScriptID;
      } else {
        // AutomatorBackend.deleteScript will create an empty script if necessary
        player.reality.automator.state.editorScript = scriptList[0].id;
      }
      AutomatorData.clearUndoData();
      EventHub.dispatch(GAME_EVENT.AUTOMATOR_SAVE_CHANGED);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      删除该脚本
    </template>
    <div class="c-modal-message__text">
      请确认你是真的要删除这个自动机脚本。
    </div>
    <template #confirm-text>
      删除
    </template>
  </ModalWrapperChoice>
</template>
