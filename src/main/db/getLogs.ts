import { BatteryRecord } from "../types";
import { batteryRecord } from "./models/battery";
import { HydratedDocument } from "mongoose";
export async function getAllLogs(
  historyLength: number,
): Promise<BatteryRecord[] | boolean | undefined> {
  try {
    const logs: HydratedDocument<BatteryRecord>[] = await batteryRecord.find({
      timeEpoch: { $gte: Date.now() - historyLength },
    });
    if (logs) {
      let logsData: BatteryRecord[] = [];
      logs.forEach((log: HydratedDocument<BatteryRecord>) => {
        logsData.push({
          number: log.number,
          soc: log.soc,
          rint: log.rint,
          time: log.time,
          timeEpoch: log.timeEpoch,
          out: log.out,
        });
      });
      //sort logs data so that the most recent is at the top
      logsData.sort((a: BatteryRecord, b: BatteryRecord) => {
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
export async function getLatestLog(
  battery: string,
): Promise<BatteryRecord | boolean | null> {
  try {
    const latest: HydratedDocument<BatteryRecord>[] | null = await batteryRecord
      .find({ number: battery })
      .sort({ timeEpoch: -1 })
      .limit(1);
    if (latest != null && latest.length > 0) {
      return {
        number: latest[0].number,
        soc: latest[0].soc,
        rint: latest[0].rint,
        time: latest[0].time,
        timeEpoch: latest[0].timeEpoch,
        out: latest[0].out,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
