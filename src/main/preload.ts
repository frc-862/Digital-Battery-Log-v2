import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
  /*
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  */
})