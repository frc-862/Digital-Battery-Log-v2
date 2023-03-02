import Store from "electron-store";
import { iConfig } from "./types";
const defaults = {
  api: {
    sheetLink: "",
    syncTimeMinutes: 1,
    centralServerMode: false,
    sheetsSync: true,
    centralServerAPIRoot: "",
    database: {
      address: "",
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
    socRangeLower: 0,
    socRangeUpper: 130,
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
};
export let config = new Store<iConfig>({ defaults: defaults });
