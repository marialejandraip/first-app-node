const mysql = require('mysql2');

//Createpool creara varias conexiones
//Se pasa como argumento un objeto js
const pool = mysql.createPool({
  host:'localhost',
  user: 'root',
  database: 'SCHEMA_NAME',
  password: 'PASSWORD_SCHEMA'
});

module.exports = pool.promise();