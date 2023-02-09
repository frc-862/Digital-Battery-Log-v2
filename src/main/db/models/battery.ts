import { Schema, model } from 'mongoose';

const batterySchema = new Schema({
    number: String,
    soc: String,
    rint: String,
    time: String,
    out: Boolean,
});
const schema = new Schema({
    batteries: [batterySchema],
});
export const batteryModel = model("batteries", schema);