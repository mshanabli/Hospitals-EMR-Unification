const logger = require('../startup/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Oops! Something went wrong');
};
