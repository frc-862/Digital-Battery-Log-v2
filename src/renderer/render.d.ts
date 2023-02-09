export interface IElectronAPI {
  sendMessage: (string) => Promise<void>;
  config: {
    get: (key: string) => Promise<string>;
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