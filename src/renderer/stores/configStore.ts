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
      console.log(this.dev, this.api, this.logging, this.colors);

      await window.electronAPI.config.set(
        "dev.devServerPort",
        this.dev.devServerPort.toString(),
      );

      await window.electronAPI.config.set(
        "colors.primary",
        this.colors.primary,
      );
      await window.electronAPI.config.set(
        "colors.secondary",
        this.colors.secondary,
      );
      await window.electronAPI.config.set(
        "colors.tertiary",
        this.colors.tertiary,
      );
      await window.electronAPI.config.set(
        "colors.warning",
        this.colors.warning,
      );
      await window.electronAPI.config.set(
        "colors.primaryText",
        this.colors.primaryText,
      );
      await window.electronAPI.config.set(
        "colors.secondaryText",
        this.colors.secondaryText,
      );

      await window.electronAPI.config.set("api.sheetLink", this.api.sheetLink);
      await window.electronAPI.config.set(
        "api.syncTimeMinutes",
        this.api.syncTimeMinutes.toString(),
      );
      await window.electronAPI.config.set(
        "api.centralServerMode",
        this.api.centralServerMode.toString(),
      );
      await window.electronAPI.config.set(
        "api.sheetsSync",
        this.api.sheetsSync.toString(),
      );
      await window.electronAPI.config.set(
        "api.centralServerAPIRoot",
        this.api.centralServerAPIRoot,
      );
      await window.electronAPI.config.set(
        "api.database.address",
        this.api.database.address,
      );
      await window.electronAPI.config.set(
        "api.database.port",
        this.api.database.port.toString(),
      );
      await window.electronAPI.config.set(
        "api.database.databaseName",
        this.api.database.databaseName,
      );

      await window.electronAPI.config.set(
        "logging.historyLengthHours",
        this.logging.historyLengthHours.toString(),
      );
      await window.electronAPI.config.set(
        "logging.batteryYearRangeLower",
        this.logging.batteryYearRangeLower.toString(),
      );
      await window.electronAPI.config.set(
        "logging.batteryYearRangeUpper",
        this.logging.batteryYearRangeUpper.toString(),
      );
      await window.electronAPI.config.set(
        "logging.batteryNumberRangeLower",
        this.logging.batteryNumberRangeLower.toString(),
      );
      await window.electronAPI.config.set(
        "logging.batteryNumberRangeUpper",
        this.logging.batteryNumberRangeUpper.toString(),
      );
      await window.electronAPI.config.set(
        "logging.batteryLength",
        this.logging.batteryLength.toString(),
      );
      await window.electronAPI.config.set(
        "logging.socRangeLower",
        this.logging.socRangeLower.toString(),
      );
      await window.electronAPI.config.set(
        "logging.socRangeUpper",
        this.logging.socRangeUpper.toString(),
      );
      await window.electronAPI.config.set(
        "logging.socLengthUpper",
        this.logging.socLengthUpper.toString(),
      );
      await window.electronAPI.config.set(
        "logging.socLengthLower",
        this.logging.socLengthLower.toString(),
      );
      await window.electronAPI.config.set(
        "logging.rintLength",
        this.logging.rintLength.toString(),
      );
      await window.electronAPI.config.set(
        "logging.rintRangeLower",
        this.logging.rintRangeLower.toString(),
      );
      await window.electronAPI.config.set(
        "logging.rintRangeUpper",
        this.logging.rintRangeUpper.toString(),
      );
    },
  },
  getters: {
    getColors(): Colors {
      return this.colors;
    },
    getAllConfig(): iConfig {
      return {
        colors: this.colors,
        api: this.api,
        dev: this.dev,
        logging: this.logging,
      };
    },
    getLogging(): iConfig["logging"] {
      return this.logging;
    },
  },
});
