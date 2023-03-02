import { defineStore } from "pinia";
import { iConfig, Colors } from "../render";
//create a store that houses the config data recieved from configIPC.ts
export const useConfigStore = defineStore({
  id: "config",
  state: () => ({
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
  }),
  actions: {
    async updateLocalConfig() {
      const config: iConfig = await window.electronAPI.config.get();
      this.api = config.api;
      this.dev = config.dev;
      this.logging = config.logging;
      this.colors = config.colors;
    },
    async updateConfig() {
      await window.electronAPI.config.set("api", this.api.toString());
      await window.electronAPI.config.set("dev", this.dev.toString());
      await window.electronAPI.config.set("logging", this.logging.toString());
      await window.electronAPI.config.set("colors", this.colors.toString());
    },
  },
  getters: {
    getColors(): Colors {
      return this.colors;
    },
    getAllConfig(): iConfig {
      return this;
    },
  },
});
