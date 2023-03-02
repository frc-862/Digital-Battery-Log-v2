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
  },
  isDev(): Promise<boolean> {
    return ipcRenderer.invoke("is-dev");
  },
});
