import { networkInterfaces, NetworkInterfaceInfo } from "os";
import { iIPRequest } from "./types";
import { app } from "electron";

export const getIP = async (): Promise<any[]> => {
  const nets = networkInterfaces();
  delete nets.lo;

  return Object.entries(nets).map((net): iIPRequest => {
    if (net[1] == undefined) {
      return { device: "none", address: "no connection" };
    }
    const obj: NetworkInterfaceInfo = net[1][0];
    return { device: net[0], address: obj.address };
  });
};
export const killX = (): void => {
  app.exit();
};
