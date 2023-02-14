import { Log } from '../render';
export async function getAllLogs(): Promise<Log[] | boolean> {
    const historyLength = 3600000;
    try {
        const logs = await window.electronAPI.logs.getAll(historyLength);
        return logs;
    } catch (error) {
        console.log(error);
        return false;
    }
}