// Modules to control application life and create native browser window
import { app, BrowserWindow, session } from "electron";
import { config } from "./store";
import { startSync } from "./api/periodicSync";
import { ipc } from "./IPC";
import path from "path";
import db from "./db/db";
const createWindow = () => {
  // Create the browser window.
  console.log(app.getPath("userData"));
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    resizable: false,
    movable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: false,
  });

  if (app.commandLine.hasSwitch("dev")) {
    mainWindow.loadURL(`http://localhost:${config.store.dev.devServerPort}`);
    //mainWindow.webContents.openDevTools()
  } else {
    // and load the index.html of the app.
    // mainWindow.loadFile("../../.output/public/index.html");
    mainWindow.loadURL(`file://${__dirname}/../../.output/public/index.html`);
    // Open the DevTools.
  }
  mainWindow.webContents.on("did-fail-load", () => {
    console.log("did-fail-load");
    // mainWindow.loadFile("../../.output/public/index.html");
    mainWindow.loadURL(`file://${__dirname}/../../.output/public/index.html`);
    // REDIRECT TO FIRST WEBPAGE AGAIN
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipc();
  db(
    config.store.api.database.address,
    config.store.api.database.port.toString(),
    config.store.api.database.databaseName,
  );
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [""],
      },
    });
  });

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  if (config.store.api.sheetsSync == true) startSync();
  app.getPath("userData");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
