import { Log } from "../render";
import { useConfigStore } from "../stores/configStore";
export async function getAllLogs(): Promise<Log[] | boolean> {
  const historyLength = 3600000 * useConfigStore().logging.historyLengthHours;

  try {
    const logs = await window.electronAPI.logs.getAll(historyLength);
    return logs;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function getLogsByFilter(
  battery: string,
  inFilter: string,
): Promise<Log[] | boolean> {
  const historyLength = 3600000 * useConfigStore().logging.historyLengthHours;

  try {
    const logs = await window.electronAPI.logs.getByFilter(
      historyLength,
      battery,
      inFilter,
    );
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
};
