import { config } from "./store";
import { ipcMain } from "electron";
import { getAllLogs, getLatestLog, getLogsByFilter } from "./db/getLogs";
import logOut from "./db/logOut";
import logIn from "./db/logIn";
import { iBatteryRecord, iConfig } from "./types";
import { getIP, killX } from "./helper";
import { clearDB } from "./db/clearDB";

// ipc function to handle all ipc calls from renderer process
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
  ipcMain.handle(
    "logs-getByFilter",
    async (event, historyLength: number, battery: string, inFilter: string) => {
      const logs = await getLogsByFilter(historyLength, battery, inFilter);
      return logs;
    },
  );
  ipcMain.handle("getIP", async (event): Promise<string[]> => {
    const ip = await getIP();
    return ip;
  });
  ipcMain.handle("killX", (event) => {
    killX();
  });
  ipcMain.handle("clearDB", async (event): Promise<void> => {
    await clearDB();
  });
};
