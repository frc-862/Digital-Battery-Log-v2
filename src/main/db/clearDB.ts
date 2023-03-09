import { batteryRecord } from "../db/models/battery";

export const clearDB = async () => {
  try {
    const res = await batteryRecord.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};
