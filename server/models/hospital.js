const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');

const Hospital = database.define('Hospital', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const validate = hospital => {
  const schema = Joi.object({ name: Joi.string().required() });
  return schema.validate(hospital).error;
};

module.exports = { Hospital, validate };
