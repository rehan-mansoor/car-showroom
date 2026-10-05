const mysql = require("mysql2");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA),
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Aiven MySQL database connected");
});

module.exports = db;
