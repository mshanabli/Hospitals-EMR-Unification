const { Relation, Column, Hospital } = require('../models');
const { validate } = require('../models/relation');

const addRelation = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sourcesId = JSON.parse(req.body.sourcesId);
  const { table, targetId, hospitalId } = req.body;

  const { length } = await Column.findAll({
    where: { id: sourcesId },
  });
  if (length !== sourcesId.length)
    return res.status(400).send('"sourcesId" contains an invalid value');

  const target = await Column.findOne({
    where: { id: targetId, isTarget: true },
  });
  if (!target)
    return res.status(400).send('"targetId" contains an invalid value');

  const hospital = await Hospital.findByPk(hospitalId);
  if (!hospital)
    return res.status(400).send('"hospitalId" contains an invalid value');

  const isUnique =
    (await Relation.count({ where: { table, targetId, hospitalId } })) === 0;

  if (!isUnique) return res.status(400).send('relation already exists');

  const relation = await Relation.create(req.body);
  res.send(relation);
};

const getRelationsByTableByHospitalId = async (req, res) => {
  const { table, id: hospitalId } = req.params;
  const relations = await Relation.findAll({ where: { table, hospitalId } });
  res.send(relations);
};

module.exports = { addRelation, getRelationsByTableByHospitalId };
