import { BatteryData } from "../types";
import { batteryRecord } from "./models/battery";
export async function logOut(data: BatteryData): Promise<boolean> {
    try {
        const newBattery = new batteryRecord({
            number: data.battery,
            soc: data.soc,
            rint: data.rint,
            time: data.time,
            timeEpoch: data.timeEpoch,
            out: true,
        });
        await newBattery.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};