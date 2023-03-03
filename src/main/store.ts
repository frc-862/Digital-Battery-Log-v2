import Store from "electron-store";
import { iConfigPrivate } from "./types";
const defaults = {
  api: {
    sheetLink: "",
    syncTimeMinutes: 1,
    centralServerMode: false,
    sheetsSync: true,
    centralServerAPIRoot: "",
    database: {
      address: "mongodb://localhost",
      port: 27017,
      databaseName: "logs",
    },
  },
  dev: {
    devServerPort: 3000,
  },
  logging: {
    historyLengthHours: 24,
    batteryYearRangeLower: 20,
    batteryYearRangeUpper: 23,
    batteryNumberRangeLower: 1,
    batteryNumberRangeUpper: 8,
    batteryLength: 4,
    socRangeLower: 0,
    socRangeUpper: 130,
    socLengthUpper: 3,
    socLengthLower: 1,
    rintRangeLower: 0,
    rintRangeUpper: 999,
    rintLength: 3,
  },
  colors: {
    primary: "#000044",
    secondary: "#ffffff",
    tertiary: "#807878",
    warning: "#c26d22",
    primaryText: "#000000",
    secondaryText: "#ffffff",
  },
  auth: {
    credentials: {},
    token: {
      type: "",
      client_id: "",
      client_secret: "",
      refresh_token: "",
    },
  },
};
export let config = new Store<iConfigPrivate>({ defaults: defaults });
