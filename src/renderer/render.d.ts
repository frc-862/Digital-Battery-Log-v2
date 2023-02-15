export interface IElectronAPI {
  sendMessage: (string) => Promise<void>;
  config: {
    get: () => Promise<Config>;
    set: (key: string, val: string) => Promise<void>;
  }
  logOut: (data: batteryData) => Promise<boolean>;
  logIn: (data: batteryData) => Promise<boolean>;
  logs: {
    getAll: (historyLength: number) => Promise<Log[]>;
    getLatest: (battery: string) => Promise<Log>;
  }
}
export declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
export interface Log {
  number: string;
  soc: string;
  rint: string;
  time: string;
  timeEpoch: number;
  out: boolean;
}
export interface batteryData {
  number: string;
  soc: string;
  rint: string;
  time: Date;
  timeEpoch: number;
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