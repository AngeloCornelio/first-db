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

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
