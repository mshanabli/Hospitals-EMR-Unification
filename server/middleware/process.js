const fs = require('fs');
const { parse } = require('fast-csv');
const { Relation, Column, Patient } = require('../models');

module.exports = async (req, res, next) => {
  const { table, hospitalId } = req.body;
  const relations = await Relation.findAll({
    where: { table, hospitalId },
    raw: true,
  });

  fs.createReadStream(req.file.path)
    .pipe(parse({ headers: true }))
    .on('data', async row => {
      const record = {};

      for (const relation of relations) {
        const type = relation['type'];
        const sourcesId = JSON.parse(relation['sourcesId']);
        const targetId = relation['targetId'];
        const details = JSON.parse(relation['details']);

        const target = await Column.findOne({
          where: { id: targetId },
          raw: true,
        });

        const targetName = target['name'];

        if (type === 'Calc') {
          // TODO: add Calc operations...
        } else {
          const source = await Column.findOne({
            where: { id: sourcesId[0] },
            raw: true,
          });

          const srcName = source['name'];

          if (type === 'Direct') {
            record[targetName] = row[srcName];
          } else {
            record[targetName] = details[row[srcName]];
          }
        }
      }
      await Patient.create({ ...record, hospitalId });
    })
    .on('end', () => {
      fs.unlink(req.file.path, () => {
        console.log('cleaning up done...');
      });
    })
    .on('error', err => {
      next(err);
    });
};
