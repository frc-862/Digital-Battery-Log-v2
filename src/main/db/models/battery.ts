import { Schema, model } from 'mongoose';

const batteryRecordSchema = new Schema({
    number: String,
    soc: String,
    rint: String,
    time: String,
    out: Boolean, //out or in
});
const batterySchema = new Schema({
    battery: String,
    records: [batteryRecordSchema],
})

export const battery = model("battery", batterySchema);
export const batteryRecord = model("batteryRecord", batteryRecordSchema);