// TODO: remove before release
export function watchLatestCommit() {
  if (isLocalEnvironment()) {
    return;
  }

  const url = "commit.json";
  let current;

  function watch() {
    fetch(url, { method: "GET" })
      .then(response => response.json())
      .then(json => {
        if (json === undefined) {
          return;
        }
        current = current ?? json.sha;
        if (current === json.sha) {
          return;
        }

        Modal.message.show(
          "游戏更新咯，你的存档已经存好了，刷新界面以应用更新！" +
          `更新描述："${json.message}"，由松茸不吃柯尔鸭或意面提交`
          +"ps:不是你为什么要硬编码你自己" ,
          {
            callback: updateRefresh,
            closeButton: true
          },
          3
        );
      });
  }

  setInterval(watch, 60000);
}
