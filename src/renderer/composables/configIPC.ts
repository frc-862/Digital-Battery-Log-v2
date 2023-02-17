import { Config } from "../render";
export const getConfig = async (): Promise<Config | boolean> => {
  try {
    const config = await window.electronAPI.config.get();
    if (typeof config != "object") return false;
    return config;
  } catch (error) {
    console.log(error);
    return false;
  }
};
