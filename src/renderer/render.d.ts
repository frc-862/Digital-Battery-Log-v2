export interface IElectronAPI {
  sendMessage: (string) => Promise<void>;
  config: {
    get: () => Promise<iConfig>;
    set: (key: string, val: string) => Promise<void>;
  };
  logOut: (data: batteryData) => Promise<boolean>;
  logIn: (data: batteryData) => Promise<boolean>;
  logs: {
    getAll: (historyLength: number) => Promise<Log[]>;
    getLatest: (battery: string) => Promise<Log>;
  };
  getIP: () => Promise<iIPRequest[]>;
  killX: () => Promise<void>;
}
export declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
export interface iIPRequest {
  device: string;
  address: string;
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
export interface iConfig {
  colors: Colors;
  logging: iLoggingConfig;
  api: iAPIConfig;
  dev: iDevConfig;
}
export interface iLoggingConfig {
  historyLengthHours: number;
  batteryYearRangeLower: number;
  batteryYearRangeUpper: number;
  batteryNumberRangeLower: number;
  batteryNumberRangeUpper: number;
  batteryLength: number;
  socRangeLower: number;
  socRangeUpper: number;
  socLengthUpper: number;
  socLengthLower: number;
  rintRangeLower: number;
  rintRangeUpper: number;
  rintLength: number;
}
export interface iAPIConfig {
  sheetLink: string;
  syncTimeMinutes: number;
  centralServerMode: boolean;
  sheetsSync: boolean;
  centralServerAPIRoot: string;
  database: {
    address: string;
    port: number;
    databaseName: string;
  };
}
export interface iDevConfig {
  devServerPort: number;
}
