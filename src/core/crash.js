import { DEV } from "@/env";

window.NotImplementedError = class NotImplementedError extends Error {
  constructor() {
    super("The method is not implemented.");
    this.name = "NotImplementedError";
  }
};

window.GlobalErrorHandler = {
  handled: false,
  cleanStart: false,
  onerror(event) {
    if (this.handled) return;
    this.handled = true;
    if (!this.cleanStart) {
      document.getElementById("loading").style.display = "none";
      requestAnimationFrame(() => this.crash(event));
      return;
    }
    if (!player.DEV) this.stopGame();
    this.crash(event);
  },
  stopGame() {
    GameKeyboard.disable();
    GameIntervals.stop();
    function clearHandles(set, clear) {
      // eslint-disable-next-line no-empty-function
      let id = set(() => {}, 9999);
      while (id--) {
        clear(id);
      }
    }
    clearHandles(setInterval, clearInterval);
    clearHandles(setTimeout, clearTimeout);
    clearHandles(requestAnimationFrame, cancelAnimationFrame);
  },
  crash(message) {
    if (window.GameUI !== undefined && GameUI.initialized) {
      Modal.message.show(`阿巴阿巴，看来你刚才的操作导致游戏崩溃了。没关系，只要在Discord上把这条消息发给我——Supersonic Seven——并附上你当时触发这个问题的具体操作就行：
      "${message}".<br>感谢您游玩《反物质维度：终局》！我们会尽快为您解决这个问题！如果不会发Discord，也可以加QQ群611146621反物质维度交流群，有很多群友在线回答！——汉化者松茸不吃柯尔鸭`, {}, 3);
    }
    // eslint-disable-next-line no-debugger
    debugger;
  }
};

window.onerror = (event, source) => {
  if (!source.endsWith(".js")) return;
  GlobalErrorHandler.onerror(event);
};
