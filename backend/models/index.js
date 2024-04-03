const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const TodoModel = require('./todo');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});
sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Database synchronization error:', err);
});
const User = UserModel(sequelize, Sequelize);
const Todo = TodoModel(sequelize, Sequelize);
User.hasMany(Todo);
Todo.belongsTo(User);
module.exports = {
  User,
  Todo,
  sequelize,
};
