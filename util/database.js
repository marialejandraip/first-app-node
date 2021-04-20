const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const connectMongodb = (callback) => {
  MongoClient.connect(
    'mongodb+srv://marialejandraip:m7IK9ZPkmEJEujcY@cluster0.gwp3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(result => {
    console.log('connected');
    _db = result.db('myFirstDatabase')
    console.log(_db);
    callback()
  })
  .catch(err => {
    console.log(err)
    throw err; 
  });
}

const getDb = () => {
  if(_db) {
    return _db
  }
  throw 'No database to connect';
}

exports.connectMongodb = connectMongodb;
exports.getDb = getDb;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(SCHEMA_NAME, 'root', PASSWORD_SCHEMA, {dialect: 'mysql', host: 'localhost'});

// module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host:'localhost',
//   user: 'root',
//   database: SCHEMA_NAME,
//   password: PASSWORD_SCHEMA
// });

// module.exports = pool.promise();