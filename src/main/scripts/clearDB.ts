import "../db/db";
import { BatteryRecord } from "../types";
import { batteryRecord } from "../db/models/battery";
import { HydratedDocument } from "mongoose";

const clearDB = async () => {
  try {
    console.log("Clearing DB");
    const res = await batteryRecord.deleteMany({});
    console.log(`Deleted ${res.deletedCount} documents`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
clearDB();
