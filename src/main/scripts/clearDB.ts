import "../db/db";
import { BatteryRecord } from "../types";
import { batteryRecord } from "../db/models/battery";
import { HydratedDocument } from "mongoose";

const clearDB = async () => {
  try {
    const logs: HydratedDocument<BatteryRecord>[] = await batteryRecord.find();
    logs.forEach((log: HydratedDocument<BatteryRecord>) => {
      log.remove();
    });
    console.log("DB cleared");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
clearDB();
