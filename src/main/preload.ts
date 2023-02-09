import { contextBridge, ipcRenderer } from 'electron';
import { batteryData } from './types';
contextBridge.exposeInMainWorld('electronAPI', {
  /*
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  */
  config: {
    get(key: string) {
      return ipcRenderer.sendSync('config-get', key);
    },
    set(property: string, val: string) {
      return ipcRenderer.send('config-set', property, val);
    },
  },
  logOut(data: batteryData) {
    return ipcRenderer.send('log-out', data);
  },
});
