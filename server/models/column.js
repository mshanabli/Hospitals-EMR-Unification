const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');

const Column = database.define(
  'Column',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('number', 'boolean', 'string', 'date', 'json'),
      allowNull: false,
    },
    table: {
      type: DataTypes.ENUM('Patient', 'Treatment'),
      allowNull: false,
    },
    isTarget: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    value: {
      type: DataTypes.JSON,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name', 'type', 'table', 'isTarget'],
      },
    ],
  }
);

const validate = column => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.valid('number', 'boolean', 'string', 'date', 'json').required(),
    table: Joi.valid('Patient', 'Treatment').required(),
    isTarget: Joi.boolean(),
    value: Joi.string().custom((value, helpers) => {
      try {
        JSON.parse(value);
      } catch (err) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  });
  return schema.validate(column).error;
};

module.exports = { Column, validate };
