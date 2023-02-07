import Store from 'electron-store';

type config = {
  pitcartMode: boolean
  localPort: number
  database: {
    address: string
    port: number
  }
  externalAPIRoot: string
  sheetsAPIRoot: string
  kioskMode: boolean
}
const defaults = {
  pitcartMode: true,
    localPort: 8080,
    database: {
        address: "",
        port: 27017
    },
    externalAPIRoot: "",
    sheetsAPIRoot: "",
    kioskMode: true
}
export let config = new Store<config>({ defaults: defaults });