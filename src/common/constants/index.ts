export { CONFIG } from "./config.constants";
export { PROVIDERS } from "./providers.constants";
export const PATTERN =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,32}$/;
export const SALT = 10;
