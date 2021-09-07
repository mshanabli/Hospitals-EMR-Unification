const { Column, validate } = require('../models/column');

const addColumn = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, type } = req.body;
  const isTarget = req.body.isTarget || false;

  const isUnique =
    (await Column.count({ where: { name, type, isTarget } })) === 0;

  if (!isUnique) return res.status(400).send('column already exists');

  const column = await Column.create(req.body);
  res.send(column);
};

const getColumnsByIsTarget = async (req, res) => {
  const { isTarget } = req.query;
  const columns = await Column.findAll({ where: { isTarget } });
  res.send(columns);
};

module.exports = { addColumn, getColumnsByIsTarget };
