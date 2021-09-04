const { DataTypes } = require('sequelize');
const Joi = require('joi');
const database = require('../startup/database');
const { Hospital } = require('./hospital');

const Patient = database.define(
  'Patient',
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    isDeceased: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['patientId', 'hospitalId'],
      },
    ],
  }
);

Hospital.hasMany(Patient, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  sourceKey: 'id',
});

Patient.belongsTo(Hospital, {
  foreignKey: { name: 'hospitalId', allowNull: false },
  targetKey: 'id',
});

const validate = patient => {
  const schema = Joi.object({
    patientId: Joi.number().required(),
    firstName: Joi.string().required(),
    birthDate: Joi.date(),
    gender: Joi.string(),
    city: Joi.string(),
    isDeceased: Joi.boolean(),
    hospitalId: Joi.number().required(),
  });

  return schema.validate(patient).error;
};

module.exports = { Patient, validate };
