export interface IElectronAPI {
    sendMessage: (string) => Promise<void>;
}
export declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }