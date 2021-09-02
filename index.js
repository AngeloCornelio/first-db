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
    // allowNull defaults to true
    type: Sequelize.STRING,
  },
}, {
  // options
});

/* Note: using `force: true` will drop the table if it already exists
 *
 * Now the `users` table in the database corresponds to the model
 * definition
 */
User.sync({ force: true });

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.post('/user', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ user: newUser }); // Returns the newly created user
  } catch (error) {
    console.error(error);
  }
});

app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findAll({
      where: {
        id: userId,
      },
    });
    res.json({ user });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
