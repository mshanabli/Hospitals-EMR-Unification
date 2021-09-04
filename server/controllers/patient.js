const { Patient, Hospital } = require('../models');
const { validate } = require('../models/patient');

const addPatient = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { patientId, hospitalId } = req.body;

  const hospital = await Hospital.findByPk(hospitalId);
  if (!hospital)
    return res.status(400).send('"hospitalId" contains an invalid value');

  const isUnique =
    (await Patient.count({ where: { patientId, hospitalId } })) === 0;

  if (!isUnique) return res.status(400).send('patient already exists');

  const patient = await Patient.create(req.body);
  res.send(patient);
};

module.exports = { addPatient };
