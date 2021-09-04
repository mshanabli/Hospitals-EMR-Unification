const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');
const { Patient } = require('./patient');

const Treatment = database.define(
  'Treatment',
  {
    treatmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cyclesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    daysCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['startDate', 'displayName', 'patientId'],
      },
    ],
  }
);

Patient.hasMany(Treatment, {
  foreignKey: { name: 'patientId', allowNull: false },
  sourceKey: 'id',
});

Treatment.belongsTo(Patient, {
  foreignKey: { name: 'patientId', allowNull: false },
  targetKey: 'id',
});

const validate = treatment => {
  const schema = Joi.object({
    treatmentId: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    displayName: Joi.string().required(),
    cyclesCount: Joi.number().required(),
    daysCount: Joi.number().required(),
    patientId: Joi.number().required(),
  });

  return schema.validate(treatment).error;
};

module.exports = { Treatment, validate };
