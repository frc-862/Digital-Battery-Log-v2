import cron from "node-cron";
import { sync } from "./sheetsService";
import axios from "axios";
const url = "https://www.google.com";
export const startSync = () => {
  cron.schedule("* * * * *", () => {
    if (!checkInternet()) return;
    sync().catch();
  });
};

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
