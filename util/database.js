const Sequelize = require('sequelize');

const sequelize = new Sequelize('SCHEMA_NAME', 'root', 'PASSWORD_SCHEMA', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host:'localhost',
//   user: 'root',
//   database: SCHEMA_NAME,
//   password: PASSWORD_SCHEMA
// });

// module.exports = pool.promise();