const express = require('express');
const Sequelize = require('sequelize');
const cred = require('./credentials.json');

const app = express();
const port = 3000;
const sequelize = new Sequelize(
  `postgres://${cred.username}:${cred.password}@localhost:5432/${cred.db}`,
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
  });

const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
}, {
  // options
});

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }); /* Now the `users` table in the database
corresponds to the model definition */

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
