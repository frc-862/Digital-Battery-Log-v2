import { Schema, model } from "mongoose";
import { BatteryRecord } from "../../types";

const batteryRecordSchema = new Schema<BatteryRecord>({
  number: String,
  soc: String,
  rint: String,
  time: String,
  timeEpoch: Number,
  out: Boolean, //out or
  updated: Boolean,
});
export const batteryRecord = model<BatteryRecord>(
  "batteryRecord",
  batteryRecordSchema,
);
