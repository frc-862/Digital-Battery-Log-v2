import { config } from './store'
import { ipcMain } from 'electron';
import { getAllLogs, getLatestLog } from './db/getLogs';
import logOut from './db/logOut';
import logIn from './db/logIn';
import { BatteryRecord, Config } from './types';
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
            console.log(error)
            return false
        }
    });
    ipcMain.handle('log-out', async (event, data: BatteryRecord) => {
        const success: boolean = await logOut(data);
        return success;
    });
    ipcMain.handle('log-in', async (event, data: BatteryRecord) => {
        const success: boolean = await logIn(data);
        return success;
    });
    ipcMain.handle('logs-getAll', async (event, historyLength: number) => {
        const logs = await getAllLogs(historyLength);
        return logs;
    });
    ipcMain.handle('logs-getLatest', async (event, battery: string) => {
        const log = await getLatestLog(battery);
        return log;
    });
}