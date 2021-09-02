const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');
const { Hospital } = require('./hospital');

const Column = database.define(
  'Column',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    table: {
      type: DataTypes.ENUM('Patient', 'Treatment'),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Number', 'Boolean', 'String', 'Date', 'Json'),
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name', 'table', 'hospitalId'],
      },
    ],
  }
);

Hospital.hasMany(Column, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  sourceKey: 'id',
});

Column.belongsTo(Hospital, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  targetKey: 'id',
});

const validate = column => {
  const schema = Joi.object({
    name: Joi.string().required(),
    table: Joi.string().valid('Patient', 'Treatment').required(),
    type: Joi.string()
      .valid('Number', 'Boolean', 'String', 'Date', 'Json')
      .required(),
    value: Joi.string().custom((value, helpers) => {
      try {
        JSON.parse(value);
      } catch (err) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    hospitalId: Joi.number().required(),
  });

  return schema.validate(column).error;
};

module.exports = { Column, validate };
