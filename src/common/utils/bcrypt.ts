import * as bcrypt from "bcrypt";
import { SALT } from "../constants";

const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
