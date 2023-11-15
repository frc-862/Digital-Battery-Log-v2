import cron from "node-cron";
import { sync } from "./sheetsService";
import axios from "axios";
const url = "https://www.google.com";
import { config } from "../store";
const minutes = config.store.api.syncTimeMinutes;
export const startSync = () => {
  // create a cron task to sync the sheets every x minutes
  cron.schedule(
    `*/${minutes % 60} *${
      Math.floor(minutes / 60) != 0 ? "/" + Math.floor(minutes / 60) : ""
    } * * *`,
    () => {
      if (!checkInternet()) return;
      sync().catch();
    },
  );
};

// check if the internet is connected
const checkInternet = async () => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
