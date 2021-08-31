const express = require('express');
const config = require('config');

require('./startup/logger');

const app = express();
const port = config.get('port');
const database = require('./startup/database');

(async () => {
  await database.authenticate();
  console.log('DATABASE: Connection has been established successfully...');
  await database.sync();
  console.log('DATABASE: Tables have been created successfully...');
  app.listen(port, () => console.log(`SERVER: Listening on port ${port}...`));
})();
