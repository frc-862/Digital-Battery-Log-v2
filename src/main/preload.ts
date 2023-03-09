import { contextBridge, ipcRenderer } from "electron";
import { iBatteryRecord } from "./types";
import { iConfig } from "./types";
contextBridge.exposeInMainWorld("electronAPI", {
  /*
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  */
  config: {
    get(): Promise<iConfig | boolean> {
      return ipcRenderer.invoke("config-get");
    },
    set(property: string, val: string): Promise<boolean> {
      return ipcRenderer.invoke("config-set", property, val);
    },
  },
  logOut(data: iBatteryRecord): Promise<boolean> {
    return ipcRenderer.invoke("log-out", data);
  },
  logIn(data: iBatteryRecord): Promise<boolean> {
    return ipcRenderer.invoke("log-in", data);
  },
  logs: {
    getAll(historyLength: number): Promise<iBatteryRecord[] | boolean> {
      return ipcRenderer.invoke("logs-getAll", historyLength);
    },
    getLatest(battery: string): Promise<iBatteryRecord | boolean> {
      return ipcRenderer.invoke("logs-getLatest", battery);
    },
    getByFilter(
      historyLength: number,
      battery: string,
      inFilter: string,
    ): Promise<iBatteryRecord[] | boolean> {
      return ipcRenderer.invoke(
        "logs-getByFilter",
        historyLength,
        battery,
        inFilter,
      );
    },
  },
  getIP(): Promise<string[]> {
    return ipcRenderer.invoke("getIP");
  },
  killX(): Promise<void> {
    return ipcRenderer.invoke("killX");
  },
  clearDB(): Promise<void> {
    return ipcRenderer.invoke("clearDB");
  },
});
