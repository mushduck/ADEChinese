const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(startUrl);
  win.removeMenu();

  win.on('ready-to-show', () => {
    win.show();

    win.webContents.on('before-input-event', (event, input) => {
      if (input.type !== 'keyDown') return;

      const isCtrlOrCmd = input.control || input.meta;
      if (!isCtrlOrCmd) return;

      try {
        let currentZoom = win.webContents.getZoomLevel();
        let newZoom = null;

        switch (input.key) {
          case '=':
          case '+':
            event.preventDefault();
            newZoom = Math.min(5, currentZoom + 0.5);
            break;
          case '-':
            event.preventDefault();
            newZoom = Math.max(-2, currentZoom - 0.5);
            break;
          case '0':
            event.preventDefault();
            newZoom = 0;
            break;
          default:
            return;
        }

        if (newZoom !== null) {
          win.webContents.setZoomLevel(newZoom);
        }
      } catch (error) {
        console.error('缩放操作出错:', error);
      }
    });
  });
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