const { Column, validate } = require('../models/column');
const { Hospital } = require('../models/hospital');

const addColumn = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, table, hospitalId } = req.body;

  const hospital = await Hospital.findByPk(hospitalId);
  if (!hospital)
    return res.status(400).send('"hospitalId" contains an invalid value');

  const isUnique =
    (await Column.count({ where: { name, table, hospitalId } })) === 0
      ? true
      : false;
  if (!isUnique) return res.status(400).send('column already exists');

  const column = await Column.create(req.body);
  res.send(column);
};

const getColumnsByHospitalId = async (req, res) => {
  const { id: hospitalId } = req.params;
  const columns = await Column.findAll({ where: { hospitalId } });
  res.send(columns);
};

module.exports = { addColumn, getColumnsByHospitalId };
