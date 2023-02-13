export interface IElectronAPI {
  sendMessage: (string) => Promise<void>;
  config: {
    get: () => Promise<Config>;
    set: (key: string, val: string) => Promise<void>;
  }
  logOut: (data: batteryData) => Promise<boolean>;
}
export declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
export interface batteryData {
  battery: string;
  soc: string;
  rint: string;
  time: string;
}
export interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  warning: string;
  primaryText: string;
  secondaryText: string;
}
export interface Config {
  pitcartMode: boolean;
  localPort: number;
  database: {
    address: string;
    port: number;
  };
  externalAPIRoot: string;
  sheetsAPIRoot: string;
  kioskMode: boolean;
  colors: Colors;
}