import mongoose from "mongoose";
export default async (address: string, port: string, name: string) => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`${address}:${port}/${name}`);
  } catch (error) {
    console.error(error);
  }
};
