const mysql = require("mysql");

const hostname = process.env.DB_HOSTNAME;
const database = process.env.DATABASE;
const dbport = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connection = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port: dbport,
});

module.exports = connection;
