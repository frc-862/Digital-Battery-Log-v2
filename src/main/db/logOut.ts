import { BatteryData, BatteryDocument } from "../types";
import { battery } from "./models/battery";
export const logOut = async (data: BatteryData): Promise<boolean> => {
    try {
       const batteryDoc = await battery.findOne({ battery: data.battery });
       console.log(batteryDoc);
       if (batteryDoc) {
           batteryDoc.records.push({
               number: data.battery,
               soc: data.soc,
               rint: data.rint,
               time: data.time,
               out: true,
           });
           batteryDoc.save();
           return true;
        } else {
            const newBattery = new battery({
                battery: data.battery,
                records: [{
                    number: data.battery,
                    soc: data.soc,
                    rint: data.rint,
                    time: data.time,
                    out: true,
                }]
            });
            newBattery.save();
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}