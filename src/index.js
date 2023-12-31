const { app, BrowserWindow } = require("electron");
const path = require("path");
const { autoUpdater } = require('electron-updater');

// تكوين التحديث التلقائي
autoUpdater.checkForUpdatesAndNotify();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideCursor: true,
    titleBarStyle: "hiddenInset",
    hasShadow: true,
    skipTaskbar: false,
    fullscreen: false,
    autoHideMenuBar: false,
    icon: "./images/logo.png",
    zoomToPageWidth: 1000,
    width: 800,
    height: 600,
    closable: true,
    disableAutoHideCursor: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // التقاط محاولة إغلاق النافذة
  mainWindow.on("close", (event) => {
    event.preventDefault(); // إلغاء السلوك الافتراضي لزر الإغلاق (X)
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.setMenu(null);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.insertCSS(`
    .title-bar {
      background-color: black;
      color: white;
    }
  `);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
