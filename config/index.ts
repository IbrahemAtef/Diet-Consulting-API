import * as dotenv from "dotenv";
import { CONFIG } from "../src/common/constants";
import defaultConfig from "./config.development";

dotenv.config();

const env = process.env.NODE_ENV || CONFIG.DEVELOPMENT;
const filePath = `config.${env}`;

let currentConfig = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { config } = require(`./${filePath}`);
  currentConfig = config;
} catch (error) {}

const current = currentConfig ?? defaultConfig;

export default current;
