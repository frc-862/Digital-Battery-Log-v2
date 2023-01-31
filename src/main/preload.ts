import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (message: string) => ipcRenderer.send('sendMessage', message),
})