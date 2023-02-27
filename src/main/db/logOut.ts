import { BatteryRecord } from "../types";
import { batteryRecord } from "./models/battery";
export default async (data: BatteryRecord): Promise<boolean> => {
  try {
    const newBattery = new batteryRecord({
      number: data.number,
      soc: data.soc,
      rint: data.rint,
      time: data.time,
      timeEpoch: data.timeEpoch,
      out: true,
      updated: false,
    });
    await newBattery.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
