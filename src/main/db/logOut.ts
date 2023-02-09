import { batteryData } from "../types";
import { batteryModel } from "./models/battery";
export const logOut = (data: batteryData) => {
    try {
        batteryModel.findOne()
        console.log(data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}