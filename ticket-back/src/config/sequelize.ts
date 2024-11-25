import { Sequelize } from "sequelize";
process.loadEnvFile();

const DB_NAME = process.env.DATABASE_NAME || "tickets";
const DB_PORT = process.env.DATABASE_PORT || "3306";
const DB_USER = process.env.DATABASE_USER || "root";
const DB_PASSWORD = process.env.DATABASE_PASSWORD || "Avengers117";
const DB_HOST = process.env.DATABASE_HOST || "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export { sequelize };
