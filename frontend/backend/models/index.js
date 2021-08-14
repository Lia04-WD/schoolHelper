const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Login = require('./login');
const Option = require('./option');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Login = Login;
db.Option = Option;

Login.init(sequelize);
Option.init(sequelize);

Login.associate(db);
Option.associate(db);

module.exports = db;
