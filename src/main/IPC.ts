import { config } from "./store";
import { ipcMain } from "electron";
import { getAllLogs, getLatestLog } from "./db/getLogs";
import logOut from "./db/logOut";
import logIn from "./db/logIn";
import { iBatteryRecord, iConfig } from "./types";
import { app } from "electron";
export const ipc = () => {
  ipcMain.handle("config-get", async (event): Promise<iConfig | boolean> => {
    try {
      const conf: iConfig = config.store;
      return conf;
    } catch (error) {
      return false;
    }
  });
  ipcMain.handle("config-set", async (event, key, val) => {
    try {
      config.set(key, val);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
  ipcMain.handle("log-out", async (event, data: iBatteryRecord) => {
    const success: boolean = await logOut(data);
    return success;
  });
  ipcMain.handle("log-in", async (event, data: iBatteryRecord) => {
    const success: boolean = await logIn(data);
    return success;
  });
  ipcMain.handle("logs-getAll", async (event, historyLength: number) => {
    const logs = await getAllLogs(historyLength);
    return logs;
  });
  ipcMain.handle("logs-getLatest", async (event, battery: string) => {
    const log = await getLatestLog(battery);
    return log;
  });
  ipcMain.handle("is-dev", (event) => {
    return app.commandLine.hasSwitch("dev");
  });
};
