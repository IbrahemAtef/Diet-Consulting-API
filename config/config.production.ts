// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
export default () => ({
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
  },
  PORT: process.env.NODE_ENV || 5000,
  jwtSecret: process.env.JWTKEY,
});
