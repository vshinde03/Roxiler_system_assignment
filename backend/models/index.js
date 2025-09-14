import { Sequelize } from "sequelize";
import dbConfig from "../config/db.js";

// Create Sequelize connection
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false, // disable SQL logs in console
  }
);

const db = {};

// Store Sequelize instance + library
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 👉 Import your models here
// Example:
// import User from "./user.model.js";
// db.User = User(sequelize, Sequelize);

export default db;         // default export (db object with all models)
export { sequelize };      // named export (raw sequelize instance)
