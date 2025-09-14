// backend/config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Load DB credentials from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // DB username
  process.env.DB_PASSWORD,  // DB password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres", // change to "mysql" if using MySQL
    logging: false, // set true if you want to see SQL queries in console
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

module.exports = sequelize;
