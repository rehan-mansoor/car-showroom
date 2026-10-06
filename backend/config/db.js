const mysql = require("mysql2");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const sslCA = process.env.DB_SSL_CA;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca:
      sslCA && sslCA.includes("BEGIN CERTIFICATE")
        ? sslCA.replace(/\\n/g, "\n")
        : fs.readFileSync(sslCA),
  },

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = db;
