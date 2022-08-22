import * as jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: number) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });

const generateToken = (id: number, SECRET_KEY: number) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "8h",
  });
};

export { generateToken, verifyToken };
