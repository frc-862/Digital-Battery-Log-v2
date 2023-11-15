import { networkInterfaces, NetworkInterfaceInfo } from "os";
import { iIPRequest } from "./types";
import { app } from "electron";

// This function returns an array of objects containing device and address information for each network interface
export const getIP = async (): Promise<any[]> => {
  const nets = networkInterfaces();
  delete nets.lo; // Remove the loopback interface from the list

  // Map each network interface to an object containing device and address information
  return Object.entries(nets).map((net): iIPRequest => {
    if (net[1] == undefined) {
      return { device: "none", address: "no connection" };
    }
    const obj: NetworkInterfaceInfo = net[1][0];
    return { device: net[0], address: obj.address };
  });
};

// This function exits the Electron app
export const killX = (): void => {
  app.exit();
};