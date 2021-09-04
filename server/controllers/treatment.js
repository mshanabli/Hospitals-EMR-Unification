const { Treatment, Patient } = require('../models');
const { validate } = require('../models/treatment');

const addTreatment = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { startDate, displayName, patientId } = req.body;

  const patient = await Patient.findByPk(patientId);
  if (!patient)
    return res.status(400).send('"patientId" contains an invalid value');

  const isUnique =
    (await Treatment.count({
      where: { startDate, displayName, patientId },
    })) === 0;

  if (!isUnique) return res.status(400).send('treatment already exists');

  const treatment = await Treatment.create(req.body);
  res.send(treatment);
};

module.exports = { addTreatment };
