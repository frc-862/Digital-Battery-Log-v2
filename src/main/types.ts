import { Document } from "mongoose";
export interface BatteryData {
    battery: string;
    soc: string;
    rint: string;
    time: Date;
    timeEpoch: number;
    out: boolean;
  }
export interface BatteryRecord {
    number: string;
    soc: string;
    rint: string;
    time: Date;
    timeEpoch: number;
    out: boolean;
  }
export interface BatteryRecordDocument extends BatteryRecord, Document {};

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
export interface Colors {
    primary: string;
    secondary: string;
    tertiary: string;
    warning: string;
    primaryText: string;
    secondaryText: string;
  }