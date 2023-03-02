import { batteryRecord } from "./models/battery";
import { iBatteryRecord } from "../types";

export default async (data: iBatteryRecord): Promise<boolean> => {
  try {
    const newBattery = new batteryRecord({
      number: data.number,
      soc: data.soc,
      rint: data.rint,
      time: data.time,
      timeEpoch: data.timeEpoch,
      out: false,
      updated: false,
    });
    await newBattery.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
