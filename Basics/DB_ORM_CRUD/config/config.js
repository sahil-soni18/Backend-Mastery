import "dotenv/config";

export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};
