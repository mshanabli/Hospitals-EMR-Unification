const { json, urlencoded } = require('express');
const cors = require('cors');
const hospital = require('../routes/hospital');
const column = require('../routes/column');
const relation = require('../routes/relation');
const patient = require('../routes/patient');
const error = require('../middleware/error');

require('express-async-errors');

module.exports = app => {
  app.use(json(), urlencoded({ extended: true }));
  app.use(cors());
  app.use('/api/hospitals', hospital);
  app.use('/api/columns', column);
  app.use('/api/relations', relation);
  app.use('/api/patients', patient);
  app.use(error);
};
