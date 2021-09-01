const { createLogger, transports, format } = require('winston');

const console = new transports.Console({
  format: format.combine(format.colorize(), format.simple()),
});
const error = new transports.File({
  filename: 'logs/error.log',
  level: 'error',
});
const uncaught = new transports.File({ filename: 'logs/uncaught.log' });

module.exports = createLogger({
  level: 'info',
  format: format.json(),
  transports: [console, error],
  exceptionHandlers: [uncaught],
  rejectionHandlers: [uncaught],
});
