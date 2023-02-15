import { Log } from '../render';
export async function getAllLogs(): Promise<Log[] | boolean> {
    const historyLength = 36000000;
    try {
        const logs = await window.electronAPI.logs.getAll(historyLength);
        return logs;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getLatest = async (battery: string): Promise<Log | boolean> => {
    try {
        const latest = await window.electronAPI.logs.getLatest(battery);
        return latest;
    } catch (error) {
        console.log(error);
        return false;
    }
}