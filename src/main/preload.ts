import { contextBridge, ipcRenderer } from 'electron';
import { BatteryData } from './types';
import { Config } from './types';
contextBridge.exposeInMainWorld('electronAPI', {
  /*
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  */
  config: {
    get(): Promise<Config | boolean> {
      return ipcRenderer.invoke('config-get');
    },
    set(property: string, val: string): Promise<boolean> {
      return ipcRenderer.invoke('config-set', property, val);
    },
  },
  logOut(data: BatteryData): Promise<boolean> {
    return ipcRenderer.invoke('log-out', data);
  },
});
