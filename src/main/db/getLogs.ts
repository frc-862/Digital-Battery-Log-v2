import { BatteryData, BatteryRecord, BatteryRecordDocument } from '../types';
import { batteryRecord } from './models/battery';
export async function getAllLogs(historyLength: number): Promise<BatteryData[] | boolean | undefined> {
    try {
        const logs: BatteryRecordDocument[] = await batteryRecord.find({ timeEpoch: { $gte: Date.now() - historyLength } });
        if (logs) {
            let logsData: BatteryData[] = [];
            logs.forEach((log: BatteryRecordDocument) => {
                logsData.push({
                    battery: log.number,
                    soc: log.soc,
                    rint: log.rint,
                    time: log.time,
                    timeEpoch: log.timeEpoch,
                    out: log.out,
                });
            });
            //sort logs data so that the most recent is at the top 
            logsData.sort((a: BatteryData, b: BatteryData) => {
                return b.timeEpoch - a.timeEpoch;
            });
            return logsData;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}