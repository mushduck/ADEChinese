const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {

    // 在 createWindow 函数里，win.loadURL(...) 之前或之后都可以
  win.webContents.on('before-input-event', (event, input) => {
    // 只处理按下事件，防止重复触发
    if (input.type !== 'keyDown') return;

    // 判断是否按下了 Ctrl (Windows) 或 Command (Mac)
    const isCtrlOrCmd = input.control || input.meta;

    if (isCtrlOrCmd) {
      let zoomLevel = win.webContents.getZoomLevel();
      let shouldUpdate = false;

      // 1. 放大：Ctrl + = 或 Ctrl + + (注意 + 键对应 input.key 为 '=')
      if (input.key === '=' || input.key === '+') {
        event.preventDefault();
        zoomLevel += 0.5; // 每次缩放步长 0.5，你可以改成 0.2 更细腻
        shouldUpdate = true;
      }
      // 2. 缩小：Ctrl + -
      else if (input.key === '-') {
        event.preventDefault();
        zoomLevel -= 0.5;
        shouldUpdate = true;
      }
      // 3. 重置为 100%：Ctrl + 0
      else if (input.key === '0') {
        event.preventDefault();
        zoomLevel = 0; // 0 代表默认 100%
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        // 限制缩放范围（防止放太大或缩太小，可选）
        // 范围 -2 约 25%， 5 约 300%
        zoomLevel = Math.max(-2, Math.min(5, zoomLevel));
        win.webContents.setZoomLevel(zoomLevel);
      }
    }
  });

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 关键：区分开发环境和生产环境
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(startUrl);
  win.removeMenu(); // 去掉默认菜单，看起来更干净
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});