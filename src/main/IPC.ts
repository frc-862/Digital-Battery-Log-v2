import { config } from './store'
import { ipcMain } from 'electron';
import { logOut } from './db/logOut';
import { batteryData } from './types';
ipcMain.on('config-get', async (event, val) => {
    event.returnValue = config.get(val);
});
ipcMain.on('config-set', async (event, key, val) => {
    config.set(key, val);
});
ipcMain.on('log-out', async (event, data: batteryData) => {
    logOut(data);
})