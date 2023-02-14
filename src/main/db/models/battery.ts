import { Schema, model } from 'mongoose';

const batteryRecordSchema = new Schema({
    number: String,
    soc: String,
    rint: String,
    time: String,
    timeEpoch: Number,
    out: Boolean, //out or in
});
export const batteryRecord = model("batteryRecord", batteryRecordSchema);