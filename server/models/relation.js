const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');
const { Hospital } = require('./hospital');
const { Column } = require('./column');

const Relation = database.define(
  'Relation',
  {
    type: {
      type: DataTypes.ENUM('Direct', 'Map', 'Calc'),
      allowNull: false,
    },
    details: {
      type: DataTypes.JSON,
      get() {
        const data = this.getDataValue('details');
        return data ? JSON.parse(data) : null;
      },
    },
    sourcesId: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('sourcesId'));
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['targetId', 'hospitalId'],
      },
    ],
  }
);

Column.hasMany(Relation, {
  foreignKey: { name: 'targetId', allowNull: false },
  sourceKey: 'id',
});

Relation.belongsTo(Column, {
  foreignKey: { name: 'targetId', allowNull: false },
  sourceKey: 'id',
});

Hospital.hasMany(Relation, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  sourceKey: 'id',
});

Relation.belongsTo(Hospital, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  sourceKey: 'id',
});

const validate = relation => {
  const schema = Joi.object({
    type: Joi.valid('Direct', 'Map', 'Calc').required(),
    details: Joi.string().custom((value, helpers) => {
      try {
        JSON.parse(value);
      } catch (err) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    sourcesId: Joi.string()
      .required()
      .custom((value, helpers) => {
        try {
          const sources = JSON.parse(value);
          if (sources.length < 1) throw new Error();

          const isNumber = sources.every(id => typeof id === 'number');
          if (!isNumber) throw new Error();
        } catch (err) {
          return helpers.error('any.invalid');
        }
        return value;
      }),
    targetId: Joi.number().required(),
    hospitalId: Joi.number().required(),
  });

  return schema.validate(relation).error;
};

module.exports = { Relation, validate };
