const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const makeConnection = async () => connection;

module.exports = makeConnection;
