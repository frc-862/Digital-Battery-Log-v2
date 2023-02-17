import { contextBridge, ipcRenderer } from "electron";
import { BatteryRecord } from "./types";
import { Config } from "./types";
contextBridge.exposeInMainWorld("electronAPI", {
  /*
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  */
  config: {
    get(): Promise<Config | boolean> {
      return ipcRenderer.invoke("config-get");
    },
    set(property: string, val: string): Promise<boolean> {
      return ipcRenderer.invoke("config-set", property, val);
    },
  },
  logOut(data: BatteryRecord): Promise<boolean> {
    return ipcRenderer.invoke("log-out", data);
  },
  logIn(data: BatteryRecord): Promise<boolean> {
    return ipcRenderer.invoke("log-in", data);
  },
  logs: {
    getAll(historyLength: number): Promise<BatteryRecord[] | boolean> {
      return ipcRenderer.invoke("logs-getAll", historyLength);
    },
    getLatest(battery: string): Promise<BatteryRecord | boolean> {
      return ipcRenderer.invoke("logs-getLatest", battery);
    },
  },
});
