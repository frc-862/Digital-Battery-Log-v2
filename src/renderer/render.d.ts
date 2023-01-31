export interface IElectron {
    sendMessage: (string) => Promise<void>;
}
export declare global {
    interface Window {
      electron: IElectron
    }
  }