import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
// import { SYSTEM } from "../constants/general";

// export const verifyToken = (token, secret) =>
//   jwt.verify(token, secret, (err, decode) => {
//     if (err) {
//       return false;
//     }
//     return decode;
//   });

const generateToken = (id: number, SECRET_KEY) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "8h",
  });
};

export { generateToken };
