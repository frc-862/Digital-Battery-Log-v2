import { config } from './store'
import { ipcMain } from 'electron';
import { logOut } from './db/logOut';
import { BatteryData, Config } from './types';
export const ipc = () => {
    ipcMain.handle('config-get', async (event): Promise<Config | boolean> => {
        try {
            const conf: Config = config.store;
            return conf;
        } catch (error) {
            return false;
        }
    });
    ipcMain.handle('config-set', async (event, key, val) => {
        try {
            config.set(key, val);
            return true;
        } catch (error) {
            return false
        }
    });
    ipcMain.handle('log-out', async (event, data: BatteryData) => {
        const success: boolean = await logOut(data);
        return success;
    });
}