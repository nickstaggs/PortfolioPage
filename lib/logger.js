var path = require('path');
var winston = require("winston");

const logger = new winston.Logger({
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      }),
      new winston.transports.File({
        filename: path.join(__dirname, "..", 'logs', 'app.log'),
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ]
  });

  module.exports = logger;
