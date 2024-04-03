require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT } = process.env;
const sequelizeOptions = {
  logging: false,
};
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  ...sequelizeOptions,
});
module.exports = sequelize;
