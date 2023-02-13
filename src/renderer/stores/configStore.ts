import { defineStore } from "pinia";
import { Config, Colors } from "../render";
//create a store that houses the config data recieved from configIPC.ts
export const useConfigStore = defineStore({
    id: "config",
    state: () => ({
        pitcartMode: false,
        localPort: 3000,
        database: {
            address: "localhost",
            port: 27017,
        },
        externalAPIRoot: "",
        sheetsAPIRoot: "",
        kioskMode: false,
        colors: {
            primary: "",
            secondary: "",
            tertiary: "",
            warning: "",
            primaryText: "",
            secondaryText: "",
        },
    }),
    actions: {
        async updateLocalConfig() {
            const config: Config = await window.electronAPI.config.get();
            this.pitcartMode = config.pitcartMode;
            this.localPort = config.localPort;
            this.database.address = config.database.address;
            this.database.port = config.database.port;
            this.externalAPIRoot = config.externalAPIRoot;
            this.sheetsAPIRoot = config.sheetsAPIRoot;
            this.kioskMode = config.kioskMode;
            this.colors.primary = config.colors.primary;
            this.colors.secondary = config.colors.secondary;
            this.colors.tertiary = config.colors.tertiary;
            this.colors.warning = config.colors.warning;
            this.colors.primaryText = config.colors.primaryText;
            this.colors.secondaryText = config.colors.secondaryText;
        },
        async updateConfig() {
            await window.electronAPI.config.set("pitcartMode", this.pitcartMode.toString());
            await window.electronAPI.config.set("localPort", this.localPort.toString());
            await window.electronAPI.config.set("database.address", this.database.address);
            await window.electronAPI.config.set("database.port", this.database.port.toString());
            await window.electronAPI.config.set("externalAPIRoot", this.externalAPIRoot);
            await window.electronAPI.config.set("sheetsAPIRoot", this.sheetsAPIRoot);
            await window.electronAPI.config.set("kioskMode", this.kioskMode.toString());
            await window.electronAPI.config.set("colors.primary", this.colors.primary);
            await window.electronAPI.config.set("colors.secondary", this.colors.secondary);
            await window.electronAPI.config.set("colors.tertiary", this.colors.tertiary);
            await window.electronAPI.config.set("colors.warning", this.colors.warning);
            await window.electronAPI.config.set("colors.primaryText", this.colors.primaryText);
            await window.electronAPI.config.set("colors.secondaryText", this.colors.secondaryText);
        }
    },
    getters: {
        getColors(): Colors {
            return this.colors;
        },
        getAllConfig(): Config {
            return this;
        }
    }
});