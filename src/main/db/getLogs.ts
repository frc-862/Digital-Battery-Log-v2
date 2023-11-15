import { iBatteryRecord } from "../types";
import { batteryRecord } from "./models/battery";
import { HydratedDocument } from "mongoose";
export async function getAllLogs(
  historyLength: number,
): Promise<iBatteryRecord[] | boolean | undefined> {
  try {
    // get all logs from the last designated history length
    const logs: HydratedDocument<iBatteryRecord>[] = await batteryRecord.find({
      timeEpoch: { $gte: Date.now() - historyLength },
    });
    if (logs) {
      // create a new array of logs with only the data we need
      let logsData: iBatteryRecord[] = [];
      logs.forEach((log: HydratedDocument<iBatteryRecord>) => {
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
      logsData.sort((a: iBatteryRecord, b: iBatteryRecord) => {
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
): Promise<iBatteryRecord | boolean | null> {
  try {
    // get the latest log for the battery number
    const latest: HydratedDocument<iBatteryRecord>[] | null =
      await batteryRecord
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
export async function getLogsByFilter(
  historyLength: number,
  battery: string,
  inFilter: string,
) {
  // get all logs from the last designated history length
  const params: any = { timeEpoch: { $gte: Date.now() - historyLength } };
  if (inFilter != "all") {
    params["out"] = inFilter == "out" ? true : false;
  }
  if (battery != "all") {
    params["number"] = battery;
  }
  try {
    const logs: HydratedDocument<iBatteryRecord>[] = await batteryRecord.find(
      params,
    );
    if (logs) {
      let logsData: iBatteryRecord[] = [];
      logs.forEach((log: HydratedDocument<iBatteryRecord>) => {
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
      logsData.sort((a: iBatteryRecord, b: iBatteryRecord) => {
        return b.timeEpoch - a.timeEpoch;
      });
      return logsData;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
