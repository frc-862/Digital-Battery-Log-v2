import Store from 'electron-store';
import { Config } from './types';
const defaults = {
  pitcartMode: true,
  localPort: 8080,
  database: {
    address: "",
    port: 27017
  },
  externalAPIRoot: "",
  sheetsAPIRoot: "",
  kioskMode: true,
  colors: {
    primary: "#000044",
    secondary: "#ffffff",
    tertiary: "#807878",
    warning: "#c26d22",
    primaryText: "#000000",
    secondaryText: "#ffffff"
  }
}
export let config = new Store<Config>({ defaults: defaults });