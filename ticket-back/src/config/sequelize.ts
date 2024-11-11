import { Sequelize } from "sequelize";
process.loadEnvFile();

const DB_NAME = process.env.DATABASE_NAME || "none";
const DB_PORT = process.env.DATABASE_PORT || "none";
const DB_USER = process.env.DATABASE_USER || "none";
const DB_PASSWORD = process.env.DATABASE_PASSWORD || "none";
const DB_HOST = process.env.DATABASE_HOST || "none";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export { sequelize };
