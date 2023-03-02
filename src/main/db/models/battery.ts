import { Schema, model } from "mongoose";
import { iBatteryRecord } from "../../types";

const batteryRecordSchema = new Schema<iBatteryRecord>({
  number: String,
  soc: String,
  rint: String,
  time: String,
  timeEpoch: Number,
  out: Boolean, //out or
  updated: Boolean,
});
export const batteryRecord = model<iBatteryRecord>(
  "batteryRecord",
  batteryRecordSchema,
);
