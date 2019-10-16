
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'users_db',
    username: 'root',
    password: '1234',
    dialect: 'mysql',
  });

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
});

User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = User;