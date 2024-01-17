
import { ExtendedClient } from "./struct/extendedClient"

import config from "./config.json";

export * from "colors";

const Client = new ExtendedClient();

Client.start();

export { Client, config }