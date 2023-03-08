export interface iIPRequest {
  device: string;
  address: string;
}
export interface iBatteryRecord {
  number: string;
  soc: string;
  rint: string;
  time: Date;
  timeEpoch: number;
  out: boolean;
  updated?: boolean;
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
export interface iConfigPrivate extends iConfig {
  auth: iAuthConfig;
}
export interface iAuthConfig {
  credentials: {};
  token: {
    type: string;
    client_id: string;
    client_secret: string;
    refresh_token: string;
  };
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
