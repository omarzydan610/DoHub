require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST, // Use environment variable for host
    user: process.env.DB_USER, // Use environment variable for user
    password: process.env.DB_PASSWORD, // Use environment variable for password
    database: process.env.DB_NAME, // Use environment variable for database name
  })
  .promise();

module.exports = pool;
