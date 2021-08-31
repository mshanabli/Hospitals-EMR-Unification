const Sequelize = require('sequelize');
const config = require('config');

const { name, username, password, host, dialect } = config.get('db');

module.exports = new Sequelize(name, username, password, {
  host,
  dialect,
});
