const express = require('express');
const config = require('config');
const logger = require('./startup/logger');
const database = require('./startup/database');

const app = express();
const port = config.get('port');

require('./models');
require('./startup/directory')();
require('./startup/routes')(app);

(async () => {
  await database.authenticate();
  logger.info('DATABASE: Connection has been established successfully...');
  await database.sync();
  logger.info('DATABASE: Tables have been created successfully...');
  app.listen(port, () => logger.info(`SERVER: Listening on port ${port}...`));
})();
