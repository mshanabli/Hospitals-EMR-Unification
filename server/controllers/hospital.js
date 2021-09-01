const { Hospital, validate } = require('../models/hospital');

const addHospital = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const isUnique =
    (await Hospital.count({ where: { name } })) === 0 ? true : false;
  if (!isUnique) return res.status(400).send('"name" must be unique');

  const hospital = await Hospital.create(req.body);
  res.send(hospital);
};

const getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.findAll();
  res.send(hospitals);
};

module.exports = { addHospital, getAllHospitals };
