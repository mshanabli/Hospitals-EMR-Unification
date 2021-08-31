const { createLogger, transports, format } = require('winston');

module.exports = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/uncaught.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/uncaught.log' })],
  exitOnError: false,
});
