const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const userRoutes = require('./routes/UserRoutes');
const todoRoutes = require('./routes/TodoRoutes');
app.use('/api/users', userRoutes);
app.use('/api/users/todos', todoRoutes);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = app;
